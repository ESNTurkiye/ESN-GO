import { NextResponse } from "next/server";
import { EXPERIENCES, type ExperienceCategory } from "@/components/sections/experiences/data";

type BoundsQuery = {
    minLat: number;
    maxLat: number;
    minLng: number;
    maxLng: number;
};

const MOCK_WAIT_MS = 700;

function parseBounds(searchParams: URLSearchParams): BoundsQuery | null {
    const minLat = Number(searchParams.get("minLat"));
    const maxLat = Number(searchParams.get("maxLat"));
    const minLng = Number(searchParams.get("minLng"));
    const maxLng = Number(searchParams.get("maxLng"));

    if (
        Number.isNaN(minLat) ||
        Number.isNaN(maxLat) ||
        Number.isNaN(minLng) ||
        Number.isNaN(maxLng)
    ) {
        return null;
    }

    return { minLat, maxLat, minLng, maxLng };
}

export async function GET(request: Request) {
    try {
        await new Promise((resolve) => setTimeout(resolve, MOCK_WAIT_MS));

        const { searchParams } = new URL(request.url);
        const bounds = parseBounds(searchParams);
        const category = searchParams.get("category") as ExperienceCategory | null;
        const vibe = searchParams.get("vibe");

        if (!bounds) {
            return NextResponse.json(
                {
                    status: "error",
                    message:
                        "Bounds are required. Provide minLat, maxLat, minLng, maxLng.",
                    data: { experiences: [] },
                    error_code: "EXPERIENCES_INVALID_BOUNDS",
                },
                { status: 400 },
            );
        }

        const filtered = EXPERIENCES.filter((item) => {
            const inBounds =
                item.lat >= bounds.minLat &&
                item.lat <= bounds.maxLat &&
                item.lng >= bounds.minLng &&
                item.lng <= bounds.maxLng;

            const inCategory = category ? item.category === category : true;
            const inVibe =
                vibe && vibe !== "all"
                    ? item.vibe.toLowerCase() === vibe.toLowerCase()
                    : true;

            return inBounds && inCategory && inVibe;
        });

        return NextResponse.json(
            {
                status: "success",
                message: "Experiences fetched successfully",
                data: { experiences: filtered },
            },
            { status: 200 },
        );
    } catch {
        return NextResponse.json(
            {
                status: "error",
                message: "Failed to fetch experiences",
                data: { experiences: [] },
                error_code: "EXPERIENCES_FETCH_ERROR",
            },
            { status: 500 },
        );
    }
}
