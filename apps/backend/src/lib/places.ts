import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  QueryCommand,
  type QueryCommandInput,
} from "@aws-sdk/lib-dynamodb";
import { ulid } from "ulid";
import {
  FOOD_OPTIONS,
  type FoodOption,
  isOneOf,
  PLACE_TYPES,
  type PlaceType,
  PRICE_RANGES,
  type PriceRange,
  TRANSPORT_LEVELS,
  type TransportLevel,
} from "./categories";
import { isCityId } from "./cities";
import { isInTurkey } from "./geo";
import { type AuthContext, HttpError } from "./http";
import { mediaUrl } from "./media";

const db = DynamoDBDocumentClient.from(new DynamoDBClient({}), {
  // İsteğe bağlı alanlar (address, district…) boşsa DB'ye hiç yazılmaz.
  marshallOptions: { removeUndefinedValues: true },
});

/** Metin alanlarının en fazla uzunluğu (karakter). */
export const LIMITS = {
  name: 80,
  subtitle: 120,
  description: 1500,
  address: 200,
  district: 80,
  locationPlaceId: 500,
} as const;

/** Fotoğraf alt metni en fazla (karakter). Standart: alt metin olmadan fotoğraf kaydedilmez. */
export const MAX_PHOTO_ALT = 150;

/** Listelerde sayfa boyutu: varsayılan ve en fazla. */
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

export const MAX_PHOTOS = 5;

/** byPublished index'inin sabit anahtarı (1.6). */
const PUBLISHED_ALL = "PLACE";

/** ULID: 26 karakter, Crockford base32. */
const PLACE_ID = /^[0-9A-HJKMNP-TV-Z]{26}$/;
/** Fotoğraf dosya adı: <ULID>.<uzantı> (1.7'de sunucu üretir). */
const PHOTO_FILE = /^[0-9A-HJKMNP-TV-Z]{26}\.(jpg|png|webp)$/;

/** Mekan fotoğrafı: S3 anahtarı (uploads/<userId>/<ULID>.<uzantı>) + alt metin. */
export interface Photo {
  key: string;
  alt: string;
}

/** ESNer'ın gönderdiği, düzenleyebildiği alanlar. */
export interface PlaceInput {
  name: string;
  subtitle: string;
  description: string;
  cityId: string;
  lat: number;
  lng: number;
  address?: string;
  district?: string;
  locationPlaceId?: string;
  placeType: PlaceType;
  food: FoodOption[];
  price: PriceRange;
  transport: TransportLevel;
  placeRating: number;
  locationRating: number;
  photos: Photo[];
}

export type PlaceStatus = "published" | "hidden";

/** places tablosundaki kayıt. */
export interface Place extends PlaceInput {
  placeId: string;
  authorId: string;
  authorName: string;
  /** Ekleyenin ESN şubesi (3.3'ten önce eklenen mekanlarda yok). */
  authorSection?: string;
  status: PlaceStatus;
  createdAt: string;
  updatedAt: string;
  /** Sparse index anahtarları: sadece yayındaysa var. */
  publishedCityId?: string;
  publishedAll?: string;
}

export function isPlaceId(value: unknown): value is string {
  return typeof value === "string" && PLACE_ID.test(value);
}

// ---------------------------------------------------------------------------
// Doğrulama: hatada 400 fırlatır (withErrors yakalar), mesajda alan adı var.
// ---------------------------------------------------------------------------

function bad(message: string): never {
  throw new HttpError(400, "BAD_REQUEST", message);
}

function text(
  body: Record<string, unknown>,
  field: keyof typeof LIMITS,
  required: boolean,
): string | undefined {
  const value = body[field];
  const trimmed = typeof value === "string" ? value.trim() : value;
  if (trimmed === undefined || trimmed === null || trimmed === "") {
    return required ? bad(`${field} is required`) : undefined;
  }
  if (typeof trimmed !== "string") return bad(`${field} must be a string`);
  if (trimmed.length > LIMITS[field]) {
    return bad(`${field} must be at most ${LIMITS[field]} characters`);
  }
  return trimmed;
}

function rating(body: Record<string, unknown>, field: string): number {
  const value = body[field];
  if (typeof value !== "number" || !Number.isInteger(value)) {
    return bad(`${field} must be a whole number from 1 to 5`);
  }
  if (value < 1 || value > 5) {
    return bad(`${field} must be a whole number from 1 to 5`);
  }
  return value;
}

function choice<T extends string>(
  body: Record<string, unknown>,
  field: string,
  list: readonly T[],
): T {
  const value = body[field];
  return isOneOf(list, value)
    ? value
    : bad(`${field} must be one of: ${list.join(", ")}`);
}

function foodList(body: Record<string, unknown>): FoodOption[] {
  const value = body.food ?? [];
  if (!Array.isArray(value) || !value.every((v) => isOneOf(FOOD_OPTIONS, v))) {
    return bad(`food must be a list of: ${FOOD_OPTIONS.join(", ")}`);
  }
  return [...new Set(value as FoodOption[])];
}

/**
 * Fotoğraflar: [{ key, alt }]. Anahtar sadece mekan sahibinin kendi klasöründen olabilir
 * (kimse başkasının yüklediği dosyayı kendi mekanına bağlayamaz). Alt metin zorunlu.
 */
function photoList(body: Record<string, unknown>, ownerId: string): Photo[] {
  const value = body.photos ?? [];
  if (!Array.isArray(value)) return bad("photos must be a list");
  if (value.length > MAX_PHOTOS) {
    return bad(`photos can have at most ${MAX_PHOTOS} items`);
  }
  const prefix = `uploads/${encodeURIComponent(ownerId)}/`;
  const photos: Photo[] = [];
  for (const item of value) {
    const key = item?.key;
    if (
      typeof key !== "string" ||
      !key.startsWith(prefix) ||
      !PHOTO_FILE.test(key.slice(prefix.length))
    ) {
      return bad("photos[].key must be a key returned by POST /uploads");
    }
    const alt = typeof item.alt === "string" ? item.alt.trim() : "";
    if (!alt) return bad("photos[].alt is required (describe the photo)");
    if (alt.length > MAX_PHOTO_ALT) {
      return bad(`photos[].alt must be at most ${MAX_PHOTO_ALT} characters`);
    }
    if (photos.some((photo) => photo.key === key)) {
      return bad("photos must not repeat the same key");
    }
    photos.push({ key, alt });
  }
  return photos;
}

/**
 * İstek gövdesini doğrular ve sadece bilinen alanları alır.
 * Sunucunun doldurduğu alanlar (placeId, authorId, status…) gelirse yok sayılır.
 * photoOwnerId: fotoğrafların hangi kullanıcının klasöründen olacağı (mekanın sahibi).
 */
export function parsePlaceInput(
  body: Record<string, unknown> | undefined,
  photoOwnerId: string,
): PlaceInput {
  if (!body) return bad("Body must be a JSON object");

  const cityId = body.cityId;
  if (!isCityId(cityId)) return bad("cityId must be a city slug like istanbul");

  const { lat, lng } = body;
  if (
    typeof lat !== "number" ||
    typeof lng !== "number" ||
    !isInTurkey(lat, lng)
  ) {
    return bad("lat/lng must be a point in Türkiye");
  }

  return {
    name: text(body, "name", true) as string,
    subtitle: text(body, "subtitle", true) as string,
    description: text(body, "description", true) as string,
    cityId,
    lat,
    lng,
    address: text(body, "address", false),
    district: text(body, "district", false),
    locationPlaceId: text(body, "locationPlaceId", false),
    placeType: choice(body, "placeType", PLACE_TYPES),
    food: foodList(body),
    price: choice(body, "price", PRICE_RANGES),
    transport: choice(body, "transport", TRANSPORT_LEVELS),
    placeRating: rating(body, "placeRating"),
    locationRating: rating(body, "locationRating"),
    photos: photoList(body, photoOwnerId),
  };
}

/** Haritanın görünen alanı (bbox): minLng, minLat, maxLng, maxLat. */
export interface Bounds {
  minLng: number;
  minLat: number;
  maxLng: number;
  maxLat: number;
}

/** Bir liste isteğinin sayfası: kaç kayıt, nereden devam, hangi alan. */
export interface PageRequest {
  limit: number;
  /** Bir önceki cevabın nextCursor'ı (çözülmemiş hali). */
  cursor?: string;
  bounds?: Bounds;
}

function parseBounds(value: string): Bounds {
  const parts = value.split(",").map((part) => Number(part.trim()));
  const [minLng, minLat, maxLng, maxLat] = parts;
  const ok =
    parts.length === 4 &&
    parts.every(Number.isFinite) &&
    minLng >= -180 &&
    maxLng <= 180 &&
    minLat >= -90 &&
    maxLat <= 90 &&
    minLng <= maxLng &&
    minLat <= maxLat;
  return ok
    ? { minLng, minLat, maxLng, maxLat }
    : bad("bbox must be minLng,minLat,maxLng,maxLat");
}

/**
 * Sorgu parametreleri: limit (1–100, varsayılan 20), cursor, bbox (allowBounds ise).
 * Hatalıysa 400.
 */
export function parsePage(
  query: Record<string, string | undefined>,
  { allowBounds = true } = {},
): PageRequest {
  let limit = DEFAULT_PAGE_SIZE;
  if (query.limit !== undefined && query.limit !== "") {
    limit = Number(query.limit);
    if (!Number.isInteger(limit) || limit < 1 || limit > MAX_PAGE_SIZE) {
      return bad(`limit must be a whole number from 1 to ${MAX_PAGE_SIZE}`);
    }
  }
  return {
    limit,
    cursor: query.cursor || undefined,
    bounds: allowBounds && query.bbox ? parseBounds(query.bbox) : undefined,
  };
}

// ---------------------------------------------------------------------------
// Yetki ve dışarıya dönen şekil
// ---------------------------------------------------------------------------

/** ESNer sadece kendi mekanını, admin hepsini düzenleyip silebilir (bp 05). */
export function canEdit(user: AuthContext, place: Place): boolean {
  return user.role === "admin" || place.authorId === user.userId;
}

/** API yanıtı: iç index anahtarları çıkarılır, fotoğraflar CDN adresiyle döner. */
export function toPublicPlace(place: Place) {
  const { publishedCityId: _city, publishedAll: _all, photos, ...rest } = place;
  return {
    ...rest,
    photos: (photos ?? []).map((photo) => {
      // 3.3'ten önce eklenen kayıtlarda fotoğraf sadece anahtar (alt metin yok).
      const { key, alt } =
        typeof photo === "string" ? { key: photo, alt: "" } : photo;
      return { key, alt, url: mediaUrl(key) };
    }),
  };
}

// ---------------------------------------------------------------------------
// DynamoDB
// ---------------------------------------------------------------------------

function isConditionFailed(err: unknown): boolean {
  return err instanceof Error && err.name === "ConditionalCheckFailedException";
}

/** Yeni mekan: onaysız, hemen yayında. */
export async function createPlace(
  input: PlaceInput,
  author: AuthContext,
): Promise<Place> {
  const now = new Date().toISOString();
  const place: Place = {
    ...input,
    placeId: ulid(),
    authorId: author.userId,
    authorName: author.name,
    authorSection: author.section || undefined,
    status: "published",
    publishedCityId: input.cityId,
    publishedAll: PUBLISHED_ALL,
    createdAt: now,
    updatedAt: now,
  };
  await db.send(
    new PutCommand({
      TableName: process.env.PLACES_TABLE,
      Item: place,
      ConditionExpression: "attribute_not_exists(placeId)",
    }),
  );
  return place;
}

export async function findPlace(placeId: string): Promise<Place | undefined> {
  const res = await db.send(
    new GetCommand({ TableName: process.env.PLACES_TABLE, Key: { placeId } }),
  );
  return res.Item as Place | undefined;
}

/**
 * Düzenlenebilir alanların hepsini yenisiyle değiştirir (PUT).
 * Yazar, durum ve createdAt korunur; gizli mekan düzenlenince gizli kalır.
 * Okuduğumuzdan beri kayıt değiştiyse (ör. admin aynı anda gizledi) 409 döner.
 */
export async function updatePlace(
  existing: Place,
  input: PlaceInput,
): Promise<Place> {
  const published = existing.status === "published";
  const place: Place = {
    ...input,
    placeId: existing.placeId,
    authorId: existing.authorId,
    authorName: existing.authorName,
    authorSection: existing.authorSection,
    status: existing.status,
    createdAt: existing.createdAt,
    updatedAt: new Date().toISOString(),
    ...(published
      ? { publishedCityId: input.cityId, publishedAll: PUBLISHED_ALL }
      : {}),
  };
  try {
    await db.send(
      new PutCommand({
        TableName: process.env.PLACES_TABLE,
        Item: place,
        ConditionExpression:
          "authorId = :authorId AND #status = :status AND updatedAt = :updatedAt",
        ExpressionAttributeNames: { "#status": "status" },
        ExpressionAttributeValues: {
          ":authorId": existing.authorId,
          ":status": existing.status,
          ":updatedAt": existing.updatedAt,
        },
      }),
    );
  } catch (err) {
    if (isConditionFailed(err)) {
      throw new HttpError(
        409,
        "CONFLICT",
        "Place was changed meanwhile, reload and try again",
      );
    }
    throw err;
  }
  return place;
}

/** Siler. Kayıt yoksa false. Fotoğraflar S3'te kalır (temizlik sonra). */
export async function deletePlace(placeId: string): Promise<boolean> {
  try {
    await db.send(
      new DeleteCommand({
        TableName: process.env.PLACES_TABLE,
        Key: { placeId },
        ConditionExpression: "attribute_exists(placeId)",
      }),
    );
    return true;
  } catch (err) {
    if (isConditionFailed(err)) return false;
    throw err;
  }
}

// ---------------------------------------------------------------------------
// Listeler: en yeni önce, sayfalı (cursor), istenirse harita alanına göre (bbox)
// ---------------------------------------------------------------------------

/** Liste index'leri (1.6). Hepsinde sıralama anahtarı createdAt. */
const INDEXES = {
  byCity: "publishedCityId",
  byPublished: "publishedAll",
  byAuthor: "authorId",
} as const;

type IndexName = keyof typeof INDEXES;

export interface PlacePage {
  places: Place[];
  /** Sonraki sayfa için; yoksa liste bitti. */
  nextCursor?: string;
}

function encodeCursor(key: Record<string, string>): string {
  return Buffer.from(JSON.stringify(key)).toString("base64url");
}

/**
 * cursor'ı DynamoDB başlangıç anahtarına çevirir. Sadece bu index'in ve bu listenin
 * (aynı şehir / aynı yazar) anahtarını kabul eder; değilse 400.
 */
function decodeCursor(
  cursor: string,
  index: IndexName,
  partitionValue: string,
): Record<string, string> {
  const partitionKey = INDEXES[index];
  try {
    const key = JSON.parse(Buffer.from(cursor, "base64url").toString("utf8"));
    const names = Object.keys(key ?? {}).sort();
    const expected = ["createdAt", "placeId", partitionKey].sort();
    if (
      names.join() === expected.join() &&
      key[partitionKey] === partitionValue &&
      isPlaceId(key.placeId) &&
      typeof key.createdAt === "string" &&
      key.createdAt.length <= 40
    ) {
      return key;
    }
  } catch {
    // aşağıda 400
  }
  return bad("cursor is invalid, start the list again without it");
}

/**
 * Bir index'ten bir sayfa okur, en yeni önce.
 * limit + 1 kayıt arar: bir fazlası bulunursa nextCursor döner (boş "Load more" sayfası olmaz).
 * bbox varsa DynamoDB filtresiyle sadece o alandaki mekanlar sayılır; yeterince bulunana
 * kadar sonraki 1 MB'lık sayfalar okunur. MVP ölçeğinde (yüzlerce mekan) hızlı; çok
 * büyürse geohash index'e geçilir.
 */
async function queryPage(
  index: IndexName,
  partitionValue: string,
  page: PageRequest,
): Promise<PlacePage> {
  const partitionKey = INDEXES[index];
  const wanted = page.limit + 1;
  const items: Place[] = [];
  let startKey: QueryCommandInput["ExclusiveStartKey"] = page.cursor
    ? decodeCursor(page.cursor, index, partitionValue)
    : undefined;

  const box = page.bounds;
  const filter = box
    ? {
        FilterExpression:
          "lat BETWEEN :south AND :north AND lng BETWEEN :west AND :east",
        ExpressionAttributeValues: {
          ":pk": partitionValue,
          ":south": box.minLat,
          ":north": box.maxLat,
          ":west": box.minLng,
          ":east": box.maxLng,
        },
      }
    : { ExpressionAttributeValues: { ":pk": partitionValue } };

  do {
    const res = await db.send(
      new QueryCommand({
        TableName: process.env.PLACES_TABLE,
        IndexName: index,
        KeyConditionExpression: `${partitionKey} = :pk`,
        ScanIndexForward: false,
        ExclusiveStartKey: startKey,
        // Filtre yoksa tam gereken kadar oku; filtre varsa DynamoDB 1 MB'a kadar okur.
        Limit: box ? undefined : wanted - items.length,
        ...filter,
      }),
    );
    items.push(...((res.Items ?? []) as Place[]));
    startKey = res.LastEvaluatedKey;
  } while (startKey && items.length < wanted);

  const places = items.slice(0, page.limit);
  const last = places.at(-1);
  return {
    places,
    nextCursor:
      items.length > page.limit && last
        ? encodeCursor({
            placeId: last.placeId,
            createdAt: last.createdAt,
            [partitionKey]: String(last[partitionKey]),
          })
        : undefined,
  };
}

/** Bir şehrin yayındaki mekanları (byCity). */
export function listCityPlaces(cityId: string, page: PageRequest) {
  return queryPage("byCity", cityId, page);
}

/** Tüm şehirlerin yayındaki mekanları (byPublished): Explore "Tümü", ana sayfa "en yeniler". */
export function listPublishedPlaces(page: PageRequest) {
  return queryPage("byPublished", PUBLISHED_ALL, page);
}

/** Bir ESNer'ın bütün mekanları, gizliler dahil (byAuthor). */
export function listAuthorPlaces(authorId: string, page: PageRequest) {
  return queryPage("byAuthor", authorId, page);
}
