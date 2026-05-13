import type { Destination, DestinationsApiResponse } from "./api-types";

const STATIC_DESTINATIONS: Destination[] = [
    {
        id: 1,
        name: "Istanbul",
        image: "https://esnturkiye.github.io/esn-assets/apps/esn-go/destinations/istanbul.jpg",
        desc: "Where East meets West in vibrant culture",
    },
    {
        id: 2,
        name: "Antalya",
        image: "https://esnturkiye.github.io/esn-assets/apps/esn-go/destinations/antalya.jpg",
        desc: "Mediterranean beaches and endless summer nights",
    },
    {
        id: 3,
        name: "Cappadocia",
        image: "https://esnturkiye.github.io/esn-assets/apps/esn-go/destinations/kapadokya.jpg",
        desc: "Fairy chimneys and hot air balloon adventures",
    },
    {
        id: 4,
        name: "Izmir",
        image: "https://esnturkiye.github.io/esn-assets/apps/esn-go/destinations/izmir.jpg",
        desc: "Ancient ruins meet modern coastal vibes",
    },
    {
        id: 5,
        name: "Ankara",
        image: "https://esnturkiye.github.io/esn-assets/apps/esn-go/destinations/ankara.jpg",
        desc: "Discover the capital's museums and vibrant life",
    },
    {
        id: 6,
        name: "Bolu",
        image: "https://esnturkiye.github.io/esn-assets/apps/esn-go/destinations/bolu.jpg",
        desc: "Relax in thermal spas surrounded by nature",
    },
    {
        id: 7,
        name: "Denizli",
        image: "https://esnturkiye.github.io/esn-assets/apps/esn-go/destinations/denizli.jpg",
        desc: "Walk on clouds at the stunning white travertines",
    },
    {
        id: 8,
        name: "Ardahan",
        image: "https://esnturkiye.github.io/esn-assets/apps/esn-go/destinations/ardahan.jpg",
        desc: "Hit the slopes at Türkiye's hidden ski paradise",
    },
    {
        id: 9,
        name: "Bilecik",
        image: "https://esnturkiye.github.io/esn-assets/apps/esn-go/destinations/bilecik.jpg",
        desc: "Explore Ottoman heritage and historic architecture",
    },
];

export async function fetchDestinations(): Promise<DestinationsApiResponse> {
    return {
        status: "success",
        message: "Destinations fetched successfully (static)",
        data: {
            destinations: STATIC_DESTINATIONS,
        },
        error_code: null,
    };
}
