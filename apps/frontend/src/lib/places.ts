import type { City, MediaRef } from "./api";

/**
 * Places recommended by ESNers (apps/backend, ContentFunction 3.2 / 3.3).
 * Lists are newest first and come in pages: { places, nextCursor }.
 * API reference: esngoclaude/api-docs (openapi.yaml).
 * Types and labels only; server reads are in places-server.ts, browser calls in client-api.ts.
 */

export type Photo = MediaRef & {
  /** What the photo shows; "" only for places added before 3.3. */
  alt: string;
};

export type Place = {
  placeId: string;
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
  authorId: string;
  authorName: string;
  authorSection?: string;
  /** "hidden" only shows up in /me/places. */
  status: "published" | "hidden";
  createdAt: string;
  updatedAt: string;
};

export type PlacePage = { places: Place[]; nextCursor?: string };

// ---- values (same keys as apps/backend/src/lib/categories.ts) -------------------

export const PLACE_TYPES = {
  cafe: "Café",
  restaurant: "Restaurant",
  bar: "Bar",
  pub: "Pub",
  nature: "Nature",
  viewpoint: "Viewpoint",
} as const;
export type PlaceType = keyof typeof PLACE_TYPES;

export const FOOD_OPTIONS = {
  vegan: "Vegan",
  vegetarian: "Vegetarian",
  halal: "Halal",
} as const;
export type FoodOption = keyof typeof FOOD_OPTIONS;

/** Per person, in Turkish lira. ₺ signs on cards, ranges on the detail page. */
export const PRICE_RANGES = {
  "0-200": { short: "₺", long: "Under ₺200" },
  "200-400": { short: "₺₺", long: "₺200–400" },
  "400-1000": { short: "₺₺₺", long: "₺400–1,000" },
} as const;
export type PriceRange = keyof typeof PRICE_RANGES;

export const TRANSPORT_LEVELS = {
  easy: "Easy by public transport",
  medium: "Some walking or a transfer",
  hard: "Hard by public transport",
  none: "No public transport",
} as const;
export type TransportLevel = keyof typeof TRANSPORT_LEVELS;

/** Text limits (same as the API). */
export const LIMITS = {
  name: 80,
  subtitle: 120,
  description: 1500,
  district: 80,
  photoAlt: 150,
  photos: 5,
} as const;

// ---- labels ----------------------------------------------------------------

/** "İstanbul" for a destination; cities that are not destinations yet get a readable slug. */
export function cityName(cityId: string, cities: City[]): string {
  const city = cities.find((c) => c.cityId === cityId);
  if (city) return city.name;
  return cityId.charAt(0).toLocaleUpperCase("tr") + cityId.slice(1);
}

/** "Kadıköy, İstanbul" (with the city) or "Kadıköy". */
export function placeArea(place: Place, cities?: City[]): string {
  const parts = [place.district, cities && cityName(place.cityId, cities)];
  return parts.filter(Boolean).join(", ");
}

/** "Added by Kayra Kalkan · ESN Marmara". */
export function addedBy(place: Place): string {
  return [place.authorName, place.authorSection].filter(Boolean).join(" · ");
}

export function placeHref(place: Pick<Place, "placeId">) {
  return `/places/${place.placeId}`;
}
