import type { DestinationsApiResponse } from "./api-types";
import { getBackendUrl } from "./env";

export async function fetchDestinations(): Promise<DestinationsApiResponse | null> {
    try {
        const baseUrl = getBackendUrl();
        const response = await fetch(`${baseUrl}/api/v1/destinations`, {
            cache: "no-store",
        });

        if (!response.ok) {
            console.warn("Failed to fetch destinations:", response.statusText);
            return null;
        }

        const data: DestinationsApiResponse = await response.json();
        return data;
    } catch (error) {
        console.warn("Error fetching destinations, returning null:", error);
        return null;
    }
}