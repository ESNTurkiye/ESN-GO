import { GeoPlacesClient, GetPlaceCommand, SuggestCommand } from "@aws-sdk/client-geo-places";

const geo = new GeoPlacesClient({});

/** Türkiye'yi kabaca kapsayan kutu. */
const TURKEY = { minLat: 35.8, maxLat: 42.2, minLng: 25.5, maxLng: 45.0 };

export function isInTurkey(lat: number, lng: number): boolean {
    return Number.isFinite(lat) && Number.isFinite(lng) && lat >= TURKEY.minLat && lat <= TURKEY.maxLat && lng >= TURKEY.minLng && lng <= TURKEY.maxLng;
}

export interface PlaceSuggestion {
    locationPlaceId: string;
    name: string;
    address?: string;
}

export interface PlaceLocation extends PlaceSuggestion {
    lat: number;
    lng: number;
}

/**
 * Yazarken öneri ("moda ca" → "Moda Cafe").
 * Sadece Türkiye; verilen noktaya (şehir merkezi) yakın sonuçlar önde.
 * Suggest sonuçları kaydedilemez (SingleUse), bu yüzden koordinat döndürmüyoruz.
 */
export async function suggestPlaces(text: string, near: { lat: number; lng: number }): Promise<PlaceSuggestion[]> {
    const res = await geo.send(
        new SuggestCommand({
            QueryText: text,
            BiasPosition: [near.lng, near.lat], // Location [lng, lat] kullanır
            Filter: { IncludeCountries: ["TUR"] },
            MaxResults: 5,
            Language: "en",
            IntendedUse: "SingleUse",
        }),
    );

    return (res.ResultItems ?? []).flatMap((item) =>
        item.SuggestResultItemType === "Place" && item.Place?.PlaceId
            ? [
                  {
                      locationPlaceId: item.Place.PlaceId,
                      name: item.Title ?? "",
                      address: item.Place.Address?.Label,
                  },
              ]
            : [],
    );
}

/**
 * Seçilen önerinin konumu. IntendedUse: Storage, çünkü koordinatı DB'ye kaydediyoruz
 * (lisans kuralı, blueprint 07). Bulunamazsa veya Türkiye dışındaysa undefined.
 */
export async function getPlace(locationPlaceId: string): Promise<PlaceLocation | undefined> {
    try {
        const res = await geo.send(
            new GetPlaceCommand({
                PlaceId: locationPlaceId,
                Language: "en",
                IntendedUse: "Storage",
            }),
        );
        const [lng, lat] = res.Position ?? [];
        if (lat === undefined || lng === undefined || !isInTurkey(lat, lng)) {
            return undefined;
        }
        return {
            locationPlaceId: res.PlaceId ?? locationPlaceId,
            name: res.Title ?? "",
            address: res.Address?.Label,
            lat,
            lng,
        };
    } catch (err) {
        const name = err instanceof Error ? err.name : "";
        if (name === "ValidationException" || name === "ResourceNotFoundException") {
            return undefined;
        }
        throw err;
    }
}
