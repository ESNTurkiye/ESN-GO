import { cacheLife } from "next/cache";

/** Public API of the backend stack (apps/backend, ContentFunction). */

export type MediaRef = { key: string; url: string };

/** One item of GET /cities. Optional fields can be missing until an admin fills them. */
export type City = {
  cityId: string;
  name: string;
  region?: string;
  sectionCount?: number;
  mapCenter?: { lat: number; lng: number };
  coverImage?: MediaRef;
};

function apiUrl(path: string) {
  const base = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
  return base ? `${base}${path}` : undefined;
}

/**
 * All destinations, most ESN sections first (the API sorts them).
 * Cached for about an hour; while it refreshes, visitors get the previous list.
 * Without NEXT_PUBLIC_API_URL (local setup not done yet) the list is empty.
 */
export async function getCities(): Promise<City[]> {
  "use cache";
  cacheLife("hours");

  const url = apiUrl("/cities");
  if (!url) return [];

  const res = await fetch(url);
  if (!res.ok) throw new Error(`GET /cities failed: ${res.status}`);
  const body = (await res.json()) as { cities: City[] };
  return body.cities;
}
