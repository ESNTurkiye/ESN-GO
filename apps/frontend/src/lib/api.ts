import { cacheLife } from "next/cache";

/**
 * Public API of the backend stack (apps/backend, ContentFunction).
 * Every read is cached for about an hour; while it refreshes, visitors get the previous answer.
 * Without NEXT_PUBLIC_API_URL (local setup not done yet) lists are empty and items missing,
 * so the sections that need them are not rendered.
 */

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

/** One item of GET /guides (Erasmus Hacks card fields). */
export type GuideSummary = {
    guideId: string;
    order?: number;
    /** Section on /erasmus-hacks: "paperwork", "daily-life" or "travel". */
    group?: string;
    title: string;
    question?: string;
    summary?: string;
    /** Ionicons name, e.g. "id-card-outline". */
    icon?: string;
    coverImage?: MediaRef;
    edition?: string;
    updatedAt?: string;
};

export type GuideSection = {
    heading: string;
    body?: string;
    tip?: string;
    items?: string[];
};

export type GuideOffer = {
    label: string;
    title: string;
    description?: string;
    url: string;
};

/** GET /guides/{guideId}: the whole guide. */
export type Guide = GuideSummary & {
    intro?: { heading: string; body?: string; tip?: string };
    sections?: GuideSection[];
    offers?: GuideOffer[];
};

/** null when NEXT_PUBLIC_API_URL is not set or the API answers 404. */
async function getJson<T>(path: string): Promise<T | null> {
    const base = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
    if (!base) return null;

    let res: Response;
    try {
        res = await fetch(`${base}${path}`);
    } catch (cause) {
        // Usually an old preview address in .env.local (previews are deleted when their PR closes).
        throw new Error(`Cannot reach the API at ${base}. Check NEXT_PUBLIC_API_URL.`, { cause });
    }
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`);
    return (await res.json()) as T;
}

/** All destinations, most ESN sections first (the API sorts them). */
export async function getCities(): Promise<City[]> {
    "use cache";
    cacheLife("hours");
    const body = await getJson<{ cities: City[] }>("/cities");
    return body?.cities ?? [];
}

/** All Erasmus Hacks guides, in their "order" (the API sorts them). */
export async function getGuides(): Promise<GuideSummary[]> {
    "use cache";
    cacheLife("hours");
    const body = await getJson<{ guides: GuideSummary[] }>("/guides");
    return body?.guides ?? [];
}

export async function getGuide(guideId: string): Promise<Guide | null> {
    "use cache";
    cacheLife("hours");
    return getJson<Guide>(`/guides/${encodeURIComponent(guideId)}`);
}
