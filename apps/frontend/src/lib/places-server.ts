import { cacheLife } from "next/cache";
import { getJson } from "./api";
import type { Place, PlacePage } from "./places";

/** Server reads of places, cached a few minutes so new places show up quickly. */

export async function getNewestPlaces(limit: number): Promise<Place[]> {
  "use cache";
  cacheLife("minutes");
  const body = await getJson<PlacePage>(`/places?limit=${limit}`);
  return body?.places ?? [];
}

export async function getCityPlaces(
  cityId: string,
  limit: number,
): Promise<PlacePage> {
  "use cache";
  cacheLife("minutes");
  const body = await getJson<PlacePage>(
    `/cities/${encodeURIComponent(cityId)}/places?limit=${limit}`,
  );
  return body ?? { places: [] };
}

export async function getPlace(placeId: string): Promise<Place | null> {
  "use cache";
  cacheLife("minutes");
  return getJson<Place>(`/places/${encodeURIComponent(placeId)}`);
}
