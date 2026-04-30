import { NextResponse } from "next/server";
import { fetchDestinations } from "@/app/_lib/destinations";

export async function GET() {
    try {
        const response = await fetchDestinations();
        return NextResponse.json(response, { status: 200 });
    } catch {
        return NextResponse.json(
            {
                status: "error",
                message: "Failed to fetch destinations",
                data: { destinations: [] },
                error_code: "DESTINATIONS_FETCH_ERROR",
            },
            { status: 500 },
        );
    }
}
