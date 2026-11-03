/**
 * Mekan kategorileri (1.6). DB'ye etiket değil anahtar yazılır; geçerli değerler sadece burada.
 * Yeni bir değer eklemek için listeye eklemek yeterli, veri taşıma gerekmez.
 * Frontend'deki form ve filtreler aynı anahtarları kullanır.
 */
export const PLACE_TYPES = ["cafe", "restaurant", "bar", "pub", "nature", "viewpoint"] as const;

/** Çoklu seçim. */
export const FOOD_OPTIONS = ["vegan", "vegetarian", "halal"] as const;

/** Kişi başı fiyat aralığı (TL). */
export const PRICE_RANGES = ["0-200", "200-400", "400-1000"] as const;

/** Toplu taşımayla ulaşım: kolay, orta, zor, toplu taşıma yok. */
export const TRANSPORT_LEVELS = ["easy", "medium", "hard", "none"] as const;

export type PlaceType = (typeof PLACE_TYPES)[number];
export type FoodOption = (typeof FOOD_OPTIONS)[number];
export type PriceRange = (typeof PRICE_RANGES)[number];
export type TransportLevel = (typeof TRANSPORT_LEVELS)[number];

/** value listedeki değerlerden biri mi? */
export function isOneOf<T extends string>(list: readonly T[], value: unknown): value is T {
    return typeof value === "string" && (list as readonly string[]).includes(value);
}
