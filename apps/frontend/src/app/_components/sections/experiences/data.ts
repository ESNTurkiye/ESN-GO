export type ExperienceCategory = "vibe" | "food" | "hidden";

export interface ExperienceItem {
    id: string;
    title: string;
    description: string;
    city: string;
    vibe: string;
    category: ExperienceCategory;
    budget: "low" | "medium";
    transit: "tram" | "metro" | "ferry" | "walk";
    lat: number;
    lng: number;
}

export const EXPERIENCES: ExperienceItem[] = [
    {
        id: "kadikoy-nightwalk",
        title: "Kadikoy Night Walk",
        description: "Live music stops and student-friendly cafes around Moda.",
        city: "Istanbul",
        vibe: "nightlife",
        category: "vibe",
        budget: "low",
        transit: "ferry",
        lat: 40.9865,
        lng: 29.0263,
    },
    {
        id: "balat-photo-route",
        title: "Balat Color Route",
        description: "Colorful streets, antiques, and coffee breaks in Balat.",
        city: "Istanbul",
        vibe: "culture",
        category: "vibe",
        budget: "low",
        transit: "tram",
        lat: 41.0291,
        lng: 28.9497,
    },
    {
        id: "ankara-museum-loop",
        title: "Ankara Museum Loop",
        description: "A compact museum day around Ulus and Hamamonu.",
        city: "Ankara",
        vibe: "culture",
        category: "hidden",
        budget: "medium",
        transit: "metro",
        lat: 39.9428,
        lng: 32.8597,
    },
    {
        id: "eminonu-street-food",
        title: "Eminonu Street Food",
        description: "Balik ekmek, kokorec, and tea with Bosphorus views.",
        city: "Istanbul",
        vibe: "food-drink",
        category: "food",
        budget: "low",
        transit: "tram",
        lat: 41.0164,
        lng: 28.9709,
    },
    {
        id: "izmir-kordon-bike",
        title: "Kordon Bike Sunset",
        description: "Relaxed coastal route with budget rental bikes.",
        city: "Izmir",
        vibe: "relaxation",
        category: "vibe",
        budget: "low",
        transit: "walk",
        lat: 38.437,
        lng: 27.1428,
    },
    {
        id: "antalya-waterfall",
        title: "Duden Waterfall Day",
        description: "Nature-focused half-day route reachable by tram.",
        city: "Antalya",
        vibe: "nature",
        category: "vibe",
        budget: "medium",
        transit: "tram",
        lat: 36.8871,
        lng: 30.7606,
    },
];
