import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  ScanCommand,
  type ScanCommandInput,
} from "@aws-sdk/lib-dynamodb";
import { mediaUrl } from "./media";

const db = DynamoDBDocumentClient.from(new DynamoDBClient({}));

/**
 * Türkiye'nin 81 ili (plaka sırasıyla). id = slug: küçük harf, Türkçe karakter yok.
 *
 * GEÇİCİ: cities tablosu henüz boş (seed 3.1'de, bu task'tan sonra).
 * Seed yapılınca cityId doğrulaması cities tablosuna taşınacak; bu liste seed'in kaynağı olabilir.
 */
export const CITIES = [
  { id: "adana", name: "Adana" },
  { id: "adiyaman", name: "Adıyaman" },
  { id: "afyonkarahisar", name: "Afyonkarahisar" },
  { id: "agri", name: "Ağrı" },
  { id: "amasya", name: "Amasya" },
  { id: "ankara", name: "Ankara" },
  { id: "antalya", name: "Antalya" },
  { id: "artvin", name: "Artvin" },
  { id: "aydin", name: "Aydın" },
  { id: "balikesir", name: "Balıkesir" },
  { id: "bilecik", name: "Bilecik" },
  { id: "bingol", name: "Bingöl" },
  { id: "bitlis", name: "Bitlis" },
  { id: "bolu", name: "Bolu" },
  { id: "burdur", name: "Burdur" },
  { id: "bursa", name: "Bursa" },
  { id: "canakkale", name: "Çanakkale" },
  { id: "cankiri", name: "Çankırı" },
  { id: "corum", name: "Çorum" },
  { id: "denizli", name: "Denizli" },
  { id: "diyarbakir", name: "Diyarbakır" },
  { id: "edirne", name: "Edirne" },
  { id: "elazig", name: "Elazığ" },
  { id: "erzincan", name: "Erzincan" },
  { id: "erzurum", name: "Erzurum" },
  { id: "eskisehir", name: "Eskişehir" },
  { id: "gaziantep", name: "Gaziantep" },
  { id: "giresun", name: "Giresun" },
  { id: "gumushane", name: "Gümüşhane" },
  { id: "hakkari", name: "Hakkari" },
  { id: "hatay", name: "Hatay" },
  { id: "isparta", name: "Isparta" },
  { id: "mersin", name: "Mersin" },
  { id: "istanbul", name: "İstanbul" },
  { id: "izmir", name: "İzmir" },
  { id: "kars", name: "Kars" },
  { id: "kastamonu", name: "Kastamonu" },
  { id: "kayseri", name: "Kayseri" },
  { id: "kirklareli", name: "Kırklareli" },
  { id: "kirsehir", name: "Kırşehir" },
  { id: "kocaeli", name: "Kocaeli" },
  { id: "konya", name: "Konya" },
  { id: "kutahya", name: "Kütahya" },
  { id: "malatya", name: "Malatya" },
  { id: "manisa", name: "Manisa" },
  { id: "kahramanmaras", name: "Kahramanmaraş" },
  { id: "mardin", name: "Mardin" },
  { id: "mugla", name: "Muğla" },
  { id: "mus", name: "Muş" },
  { id: "nevsehir", name: "Nevşehir" },
  { id: "nigde", name: "Niğde" },
  { id: "ordu", name: "Ordu" },
  { id: "rize", name: "Rize" },
  { id: "sakarya", name: "Sakarya" },
  { id: "samsun", name: "Samsun" },
  { id: "siirt", name: "Siirt" },
  { id: "sinop", name: "Sinop" },
  { id: "sivas", name: "Sivas" },
  { id: "tekirdag", name: "Tekirdağ" },
  { id: "tokat", name: "Tokat" },
  { id: "trabzon", name: "Trabzon" },
  { id: "tunceli", name: "Tunceli" },
  { id: "sanliurfa", name: "Şanlıurfa" },
  { id: "usak", name: "Uşak" },
  { id: "van", name: "Van" },
  { id: "yozgat", name: "Yozgat" },
  { id: "zonguldak", name: "Zonguldak" },
  { id: "aksaray", name: "Aksaray" },
  { id: "bayburt", name: "Bayburt" },
  { id: "karaman", name: "Karaman" },
  { id: "kirikkale", name: "Kırıkkale" },
  { id: "batman", name: "Batman" },
  { id: "sirnak", name: "Şırnak" },
  { id: "bartin", name: "Bartın" },
  { id: "ardahan", name: "Ardahan" },
  { id: "igdir", name: "Iğdır" },
  { id: "yalova", name: "Yalova" },
  { id: "karabuk", name: "Karabük" },
  { id: "kilis", name: "Kilis" },
  { id: "osmaniye", name: "Osmaniye" },
  { id: "duzce", name: "Düzce" },
] as const;

const CITY_IDS = new Set<string>(CITIES.map((city) => city.id));

export function isCityId(value: unknown): value is string {
  return typeof value === "string" && CITY_IDS.has(value);
}

/**
 * cities tablosundaki kayıt: ESN GO'daki destinasyonlar (3.1 seed + admin içeriği 3.4).
 * Seed alanları: name, region, sectionCount, sectionIds, mapCenter (apps/backend/seed/cities.json).
 * Admin alanları (intro, coverImage…) seed tekrar çalışınca ezilmez.
 */
export interface City {
  cityId: string;
  name?: string;
  region?: string;
  sectionCount?: number;
  sectionIds?: string[];
  mapCenter?: { lat: number; lng: number };
  /** S3 anahtarı: cities/<cityId>/<ULID>.<uzantı> (admin seçer) */
  coverImage?: string;
  updatedAt?: string;
  [field: string]: unknown;
}

function withCover(city: City) {
  const { coverImage, ...rest } = city;
  return {
    ...rest,
    coverImage: coverImage
      ? { key: coverImage, url: mediaUrl(coverImage) }
      : undefined,
  };
}

/**
 * Destinasyon listesi (ana sayfa, /destinations): kart alanları, en çok şubesi olan önce.
 * Birkaç kayıt olduğu için Scan (guides ile aynı istisna).
 */
export async function listCities() {
  const items: City[] = [];
  let startKey: ScanCommandInput["ExclusiveStartKey"];
  do {
    const res = await db.send(
      new ScanCommand({
        TableName: process.env.CITIES_TABLE,
        ExclusiveStartKey: startKey,
      }),
    );
    items.push(...((res.Items ?? []) as City[]));
    startKey = res.LastEvaluatedKey;
  } while (startKey);

  return items
    .sort(
      (a, b) =>
        (b.sectionCount ?? 0) - (a.sectionCount ?? 0) ||
        (a.name ?? a.cityId).localeCompare(b.name ?? b.cityId, "tr"),
    )
    .map((city) =>
      withCover({
        cityId: city.cityId,
        name: city.name,
        region: city.region,
        sectionCount: city.sectionCount,
        mapCenter: city.mapCenter,
        coverImage: city.coverImage,
      }),
    );
}

/** Tek destinasyon, bütün alanlarıyla (destinasyon sayfası). */
export async function findCity(cityId: string) {
  const res = await db.send(
    new GetCommand({ TableName: process.env.CITIES_TABLE, Key: { cityId } }),
  );
  return res.Item ? withCover(res.Item as City) : undefined;
}
