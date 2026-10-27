export type EventCategory =
    | "party"
    | "cultural"
    | "adventure"
    | "academic"
    | "chill"
    | "food-social";

export const EVENT_CATEGORY_LABELS: Record<EventCategory, string> = {
    party: "Party",
    cultural: "Cultural",
    adventure: "Adventure",
    academic: "Academic",
    chill: "Chill",
    "food-social": "Food & Social",
};

/** Light UI (listing cards) */
export const EVENT_CATEGORY_ACCENTS: Record<EventCategory, string> = {
    party: "bg-esn-magenta text-white",
    cultural: "bg-esn-orange text-white",
    adventure: "bg-esn-cyan text-white",
    academic: "bg-esn-dark-blue text-white",
    chill: "bg-esn-green text-white",
    "food-social": "bg-esn-magenta/90 text-white ring-1 ring-white/30",
};

/** Neon Pulse hero badge (DESIGN.md) */
export const EVENT_CATEGORY_NEON_BADGE: Record<EventCategory, string> = {
    party: "bg-[#ffb1c6] text-[#650030]",
    cultural: "bg-[#ffb1c6] text-[#650030]",
    "food-social": "bg-[#ffb1c6] text-[#650030]",
    adventure: "bg-[#abc7ff] text-[#002f66]",
    academic: "bg-[#abc7ff] text-[#002f66]",
    chill: "bg-[#65df64] text-[#003908]",
};

export function inferEventCategory(event: {
    title: string;
    summary: string;
}): EventCategory {
    const text = `${event.title} ${event.summary}`.toLowerCase();
    if (
        text.includes("chill") ||
        text.includes("festival") ||
        text.includes("wave")
    ) {
        return "chill";
    }
    if (
        text.includes("ski") ||
        text.includes("uludağ") ||
        text.includes("uludag") ||
        text.includes("snow") ||
        text.includes("winter trip")
    ) {
        return "adventure";
    }
    if (
        text.includes("party") ||
        text.includes("welcome") ||
        text.includes("neon") ||
        text.includes("cruise")
    ) {
        return "party";
    }
    if (
        text.includes("food") ||
        text.includes("dinner") ||
        text.includes("social")
    ) {
        return "food-social";
    }
    if (
        text.includes("cultural") ||
        text.includes("museum") ||
        text.includes("tour")
    ) {
        return "cultural";
    }
    if (
        text.includes("academic") ||
        text.includes("seminar") ||
        text.includes("workshop")
    ) {
        return "academic";
    }
    return "party";
}

export function eventVibePartyHardPercent(category: EventCategory): number {
    const map: Record<EventCategory, number> = {
        chill: 30,
        academic: 38,
        cultural: 48,
        "food-social": 58,
        adventure: 72,
        party: 86,
    };
    return map[category];
}

export function eventWhatToExpectLines(category: EventCategory): string[] {
    const common =
        "Check the official announcement for the latest timetable and prices.";
    switch (category) {
        case "adventure":
            return [
                "Transfers, hotel or mountain access (per program)",
                "Guided social program with ESN volunteers",
                "Room for skiing, hiking, or outdoor blocks",
                common,
            ];
        case "chill":
            return [
                "Day & night music, sports, and workshops",
                "Coastal or venue-based community hangouts",
                "Partners and discounts where the section lists them",
                common,
            ];
        case "academic":
            return [
                "Structured sessions or talks from partners",
                "Networking with other international students",
                "Materials announced by the organizing section",
                common,
            ];
        case "cultural":
            return [
                "City or regional discovery with local context",
                "Mixed international groups and ESN leaders",
                "Cultural stops aligned with the published route",
                common,
            ];
        case "food-social":
            return [
                "Food-forward meetups and casual networking",
                "ESN community introductions",
                "Venue details in the official post",
                common,
            ];
        default:
            return [
                "Welcome moments with ESN volunteers and exchange students",
                "Music, dance floor, or program blocks per city edition",
                "Drink or partner deals when the section publishes them",
                common,
            ];
    }
}
