import type { DestinationsApiResponse } from "@/components/sections/destinations/types";

export async function fetchDestinations(): Promise<DestinationsApiResponse | null> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/destinations`, {
            cache: "no-store",
        });

        if (!response.ok) {
            console.error("Failed to fetch destinations:", response.statusText);
            return null;
        }

        const data: DestinationsApiResponse = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching destinations:", error);
        return null;
    }
}

