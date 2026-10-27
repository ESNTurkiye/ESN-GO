import type { Metadata } from "next";
import { headers } from "next/headers";
import DestinationsCatalog, {
    type DestinationCatalogItem,
} from "@/components/sections/destinations/DestinationsCatalog";
import type { DestinationsApiResponse } from "@/app/_lib/api-types";

const REGION_MAP: Record<string, string> = {
    Istanbul: "Marmara",
    Bursa: "Marmara",
    Bilecik: "Marmara",
    Izmir: "Aegean",
    Denizli: "Aegean",
    Antalya: "Mediterranean",
    Ankara: "Central Anatolia",
    Cappadocia: "Central Anatolia",
    Bolu: "Black Sea",
    Ardahan: "Eastern Anatolia",
};

export const metadata: Metadata = {
    title: "Destinations Catalog | ESN GO",
    description:
        "Explore all ESN GO destinations with city-based search and region filters.",
};

function createSlug(cityName: string): string {
    return cityName
        .toLowerCase()
        .normalize("NFKD")
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .trim();
}

async function mapToCatalogDestinations(): Promise<DestinationCatalogItem[]> {
    const requestHeaders = await headers();
    const host =
        requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
    const protocol = requestHeaders.get("x-forwarded-proto") ?? "http";
    const baseUrl = host ? `${protocol}://${host}` : "http://localhost:3000";

    const response = await fetch(`${baseUrl}/api/v1/destinations`, {
        cache: "no-store",
    });
    if (!response.ok) {
        throw new Error("Failed to fetch destinations catalog");
    }
    const payload = (await response.json()) as DestinationsApiResponse;
    const destinations = payload?.data?.destinations ?? [];

    return destinations.map((destination) => ({
        id: createSlug(destination.name),
        name: destination.name,
        region: REGION_MAP[destination.name] ?? "Other",
        image_url: destination.image,
        description: destination.desc,
        featured:
            destination.name === "Istanbul" ||
            destination.name === "Ankara" ||
            destination.name === "Antalya",
    }));
}

export default async function DestinationsPage() {
    const catalogDestinations = await mapToCatalogDestinations();
    return <DestinationsCatalog destinations={catalogDestinations} />;
}
