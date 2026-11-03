import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DeleteCommand, DynamoDBDocumentClient, GetCommand, PutCommand, QueryCommand, type QueryCommandInput } from "@aws-sdk/lib-dynamodb";
import { ulid } from "ulid";
import { FOOD_OPTIONS, type FoodOption, isOneOf, PLACE_TYPES, type PlaceType, PRICE_RANGES, type PriceRange, TRANSPORT_LEVELS, type TransportLevel } from "./categories";
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

export const MAX_PHOTOS = 5;

/** byPublished index'inin sabit anahtarı (1.6). */
const PUBLISHED_ALL = "PLACE";

/** ULID: 26 karakter, Crockford base32. */
const PLACE_ID = /^[0-9A-HJKMNP-TV-Z]{26}$/;
/** Fotoğraf dosya adı: <ULID>.<uzantı> (1.7'de sunucu üretir). */
const PHOTO_FILE = /^[0-9A-HJKMNP-TV-Z]{26}\.(jpg|png|webp)$/;

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
    /** S3 anahtarları: uploads/<userId>/<ULID>.<uzantı> */
    photos: string[];
}

export type PlaceStatus = "published" | "hidden";

/** places tablosundaki kayıt. */
export interface Place extends PlaceInput {
    placeId: string;
    authorId: string;
    authorName: string;
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

function text(body: Record<string, unknown>, field: keyof typeof LIMITS, required: boolean): string | undefined {
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

function choice<T extends string>(body: Record<string, unknown>, field: string, list: readonly T[]): T {
    const value = body[field];
    return isOneOf(list, value) ? value : bad(`${field} must be one of: ${list.join(", ")}`);
}

function foodList(body: Record<string, unknown>): FoodOption[] {
    const value = body.food ?? [];
    if (!Array.isArray(value) || !value.every((v) => isOneOf(FOOD_OPTIONS, v))) {
        return bad(`food must be a list of: ${FOOD_OPTIONS.join(", ")}`);
    }
    return [...new Set(value as FoodOption[])];
}

/**
 * Fotoğraflar sadece mekan sahibinin kendi klasöründen olabilir.
 * Böylece kimse başkasının yüklediği dosyayı kendi mekanına bağlayamaz.
 */
function photoList(body: Record<string, unknown>, ownerId: string): string[] {
    const value = body.photos ?? [];
    if (!Array.isArray(value)) return bad("photos must be a list");
    if (value.length > MAX_PHOTOS) {
        return bad(`photos can have at most ${MAX_PHOTOS} items`);
    }
    const prefix = `uploads/${encodeURIComponent(ownerId)}/`;
    for (const key of value) {
        if (typeof key !== "string" || !key.startsWith(prefix) || !PHOTO_FILE.test(key.slice(prefix.length))) {
            return bad("photos must be keys returned by POST /uploads");
        }
    }
    return [...new Set(value as string[])];
}

/**
 * İstek gövdesini doğrular ve sadece bilinen alanları alır.
 * Sunucunun doldurduğu alanlar (placeId, authorId, status…) gelirse yok sayılır.
 * photoOwnerId: fotoğrafların hangi kullanıcının klasöründen olacağı (mekanın sahibi).
 */
export function parsePlaceInput(body: Record<string, unknown> | undefined, photoOwnerId: string): PlaceInput {
    if (!body) return bad("Body must be a JSON object");

    const cityId = body.cityId;
    if (!isCityId(cityId)) return bad("cityId must be a city slug like istanbul");

    const { lat, lng } = body;
    if (typeof lat !== "number" || typeof lng !== "number" || !isInTurkey(lat, lng)) {
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

/** limit sorgu parametresi: yoksa hepsi, varsa 1–100. */
export function parseLimit(value: string | undefined): number | undefined {
    if (value === undefined || value === "") return undefined;
    const limit = Number(value);
    if (!Number.isInteger(limit) || limit < 1 || limit > 100) {
        return bad("limit must be a whole number from 1 to 100");
    }
    return limit;
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
        photos: photos.map((key) => ({ key, url: mediaUrl(key) })),
    };
}

// ---------------------------------------------------------------------------
// DynamoDB
// ---------------------------------------------------------------------------

function isConditionFailed(err: unknown): boolean {
    return err instanceof Error && err.name === "ConditionalCheckFailedException";
}

/** Yeni mekan: onaysız, hemen yayında. */
export async function createPlace(input: PlaceInput, author: AuthContext): Promise<Place> {
    const now = new Date().toISOString();
    const place: Place = {
        ...input,
        placeId: ulid(),
        authorId: author.userId,
        authorName: author.name,
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
    const res = await db.send(new GetCommand({ TableName: process.env.PLACES_TABLE, Key: { placeId } }));
    return res.Item as Place | undefined;
}

/**
 * Düzenlenebilir alanların hepsini yenisiyle değiştirir (PUT).
 * Yazar, durum ve createdAt korunur; gizli mekan düzenlenince gizli kalır.
 * Okuduğumuzdan beri kayıt değiştiyse (ör. admin aynı anda gizledi) 409 döner.
 */
export async function updatePlace(existing: Place, input: PlaceInput): Promise<Place> {
    const published = existing.status === "published";
    const place: Place = {
        ...input,
        placeId: existing.placeId,
        authorId: existing.authorId,
        authorName: existing.authorName,
        status: existing.status,
        createdAt: existing.createdAt,
        updatedAt: new Date().toISOString(),
        ...(published ? { publishedCityId: input.cityId, publishedAll: PUBLISHED_ALL } : {}),
    };
    try {
        await db.send(
            new PutCommand({
                TableName: process.env.PLACES_TABLE,
                Item: place,
                ConditionExpression: "authorId = :authorId AND #status = :status AND updatedAt = :updatedAt",
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
            throw new HttpError(409, "CONFLICT", "Place was changed meanwhile, reload and try again");
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

/** Index sorgusu, en yeni önce. limit yoksa hepsi (1 MB sayfalarını döngüyle okur). */
async function queryIndex(input: Omit<QueryCommandInput, "TableName">, limit?: number): Promise<Place[]> {
    const items: Place[] = [];
    let startKey: QueryCommandInput["ExclusiveStartKey"];
    do {
        const res = await db.send(
            new QueryCommand({
                ...input,
                TableName: process.env.PLACES_TABLE,
                ScanIndexForward: false,
                ExclusiveStartKey: startKey,
                Limit: limit ? limit - items.length : undefined,
            }),
        );
        items.push(...((res.Items ?? []) as Place[]));
        startKey = res.LastEvaluatedKey;
    } while (startKey && (!limit || items.length < limit));
    return items;
}

/** Bir şehrin yayındaki mekanları (byCity). */
export function listCityPlaces(cityId: string, limit?: number) {
    return queryIndex(
        {
            IndexName: "byCity",
            KeyConditionExpression: "publishedCityId = :cityId",
            ExpressionAttributeValues: { ":cityId": cityId },
        },
        limit,
    );
}

/** Tüm şehirlerin yayındaki mekanları (byPublished): Explore "Tümü", ana sayfa "en yeniler". */
export function listPublishedPlaces(limit?: number) {
    return queryIndex(
        {
            IndexName: "byPublished",
            KeyConditionExpression: "publishedAll = :all",
            ExpressionAttributeValues: { ":all": PUBLISHED_ALL },
        },
        limit,
    );
}

/** Bir ESNer'ın bütün mekanları, gizliler dahil (byAuthor). */
export function listAuthorPlaces(authorId: string) {
    return queryIndex({
        IndexName: "byAuthor",
        KeyConditionExpression: "authorId = :authorId",
        ExpressionAttributeValues: { ":authorId": authorId },
    });
}
