import type { Destination } from "@/components/sections/destinations/types";

export async function fetchDestinations(): Promise<Destination[]> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/destinations`, {
            cache: "no-store",
        });

        if (!res.ok) {
            console.error("Failed to fetch destinations:", res.statusText);
            return [];
        }

        const data = (await res.json()) as { destinations?: Destination[] };
        return data.destinations ?? [];
    } catch (error) {
        console.error("Error fetching destinations:", error);
        return [];
    }
}

