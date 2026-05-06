"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
    EVENT_CATEGORY_ACCENTS,
    EVENT_CATEGORY_LABELS,
    type EventCategory,
    inferEventCategory,
} from "@/app/_lib/eventCategory";
import { cn } from "@/_lib/utils";
import Button from "@/components/ui/Button";
import FilterTabs from "@/components/ui/FilterTabs";

export type EventsPageCatalogEvent = {
    slug: string;
    title: string;
    dateDay: string;
    dateMonth: string;
    location: string;
    time: string;
    price: string;
    registrationDeadline: string;
    summary: string;
    cardImage?: string;
};

type TimelineTab = "upcoming" | "past";

const CATEGORY_FILTERS: { id: EventCategory | "all"; label: string }[] = [
    { id: "all", label: "All" },
    { id: "party", label: "Party" },
    { id: "cultural", label: "Cultural" },
    { id: "adventure", label: "Adventure" },
    { id: "academic", label: "Academic" },
    { id: "chill", label: "Chill" },
    { id: "food-social", label: "Food & Social" },
];

function parseEventStart(event: EventsPageCatalogEvent): Date | null {
    const normalizedMonth = event.dateMonth.replace(/\./g, "").trim();
    const normalizedDay = event.dateDay.replace(/^0+/u, "").trim() || event.dateDay;
    const candidate = `${normalizedMonth} ${normalizedDay}, 2026`;
    const parsed = Date.parse(candidate);
    return Number.isNaN(parsed) ? null : new Date(parsed);
}

function startOfTodayLocal(): Date {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return now;
}

type EventsPageCatalogProps = {
    events: EventsPageCatalogEvent[];
};

const INITIAL_VISIBLE = 6;
const LOAD_INCREMENT = 6;

const EVENT_TIMELINE_TABS = [
    { value: "upcoming" as const, label: "Upcoming" },
    { value: "past" as const, label: "Past Events" },
] as const;

export default function EventsPageCatalog({ events }: EventsPageCatalogProps) {
    const [category, setCategory] = useState<EventCategory | "all">("all");
    const [timeline, setTimeline] = useState<TimelineTab>("upcoming");
    const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

    const todayStart = useMemo(() => startOfTodayLocal(), []);

    const filtered = useMemo(() => {
        return events.filter((event) => {
            const cat = inferEventCategory(event);
            const matchesCat = category === "all" || cat === category;
            if (!matchesCat) return false;

            const start = parseEventStart(event);
            if (!start) return timeline === "upcoming";

            const eventDay = new Date(
                start.getFullYear(),
                start.getMonth(),
                start.getDate(),
            );
            const todayDay = new Date(
                todayStart.getFullYear(),
                todayStart.getMonth(),
                todayStart.getDate(),
            );
            const isPast = eventDay < todayDay;
            return timeline === "past" ? isPast : !isPast;
        });
    }, [events, category, timeline, todayStart]);

    const visible = filtered.slice(0, visibleCount);
    const canLoadMore = visibleCount < filtered.length;

    return (
        <section
            id="events-grid"
            className="section-padding bg-gray-50 scroll-mt-28 md:scroll-mt-32"
            aria-labelledby="events-catalog-heading"
        >
            <div className="max-w-7xl mx-auto container-responsive">
                <h2 id="events-catalog-heading" className="sr-only">
                    Browse and filter ESN Türkiye events
                </h2>

                <div className="mb-10 rounded-3xl border border-esn-dark-blue/10 bg-white/75 px-4 py-3 shadow-sm backdrop-blur-md md:flex md:flex-wrap md:items-center md:justify-between md:gap-4">
                    <div className="flex flex-wrap gap-2 md:flex-1 md:min-w-0">
                        {CATEGORY_FILTERS.map(({ id, label }) => {
                            const active = category === id;
                            return (
                                <button
                                    key={id}
                                    type="button"
                                    onClick={() => {
                                        setCategory(id);
                                        setVisibleCount(INITIAL_VISIBLE);
                                    }}
                                    className={cn(
                                        "rounded-full px-3.5 py-2 text-xs font-oswald font-bold uppercase tracking-wide transition-all sm:px-4 sm:text-sm",
                                        active
                                            ? "border-2 border-esn-magenta bg-white text-esn-dark-blue"
                                            : "border border-transparent bg-esn-dark-blue/6 text-esn-dark-blue hover:bg-esn-dark-blue/10",
                                    )}
                                >
                                    {label}
                                </button>
                            );
                        })}
                    </div>

                    <div className="mt-3 w-full shrink-0 md:mt-0 md:ml-auto md:w-auto md:max-w-md">
                        <FilterTabs
                            tabs={EVENT_TIMELINE_TABS}
                            value={timeline}
                            onChange={(next) => {
                                setTimeline(next);
                                setVisibleCount(INITIAL_VISIBLE);
                            }}
                            ariaLabel="Event timeframe"
                            variant="inline"
                        />
                    </div>
                </div>

                {filtered.length === 0 ? (
                    <div className="px-6 py-14 text-center md:px-10">
                        <p className="font-lato text-2xl font-semibold text-esn-dark-blue md:text-3xl">
                            No events match these filters yet.
                        </p>
                        <p className="mx-auto mt-4 max-w-3xl font-lato text-lg text-gray-700 md:text-xl">
                            Try another category or switch between upcoming and past.
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {visible.map((event) => {
                                const cat = inferEventCategory(event);
                                const tagClass = EVENT_CATEGORY_ACCENTS[cat];
                                const tagLabel = EVENT_CATEGORY_LABELS[cat];

                                return (
                                    <article
                                        key={event.slug}
                                        className="relative flex flex-col overflow-hidden rounded-3xl border border-esn-dark-blue/10 bg-white"
                                    >
                                        <Link
                                            href={`/events/${event.slug}`}
                                            className="absolute inset-0 z-10 rounded-3xl cursor-pointer"
                                            aria-label={`Open ${event.title}`}
                                        />

                                        <div className="relative aspect-4/3 w-full overflow-hidden bg-gray-100">
                                            {event.cardImage ? (
                                                <Image
                                                    src={event.cardImage}
                                                    alt=""
                                                    fill
                                                    className="object-cover"
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                                                    unoptimized={event.cardImage.startsWith(
                                                        "http",
                                                    )}
                                                />
                                            ) : (
                                                <div className="flex h-full w-full flex-col items-center justify-center bg-linear-to-br from-esn-dark-blue/90 to-esn-magenta/80 text-white">
                                                    <span className="font-oswald text-5xl font-bold leading-none">
                                                        {event.dateDay}
                                                    </span>
                                                    <span className="font-oswald text-sm uppercase tracking-widest">
                                                        {event.dateMonth}
                                                    </span>
                                                </div>
                                            )}

                                            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-transparent" />

                                            <span
                                                className={cn(
                                                    "pointer-events-none absolute right-3 top-3 z-20 rounded-full px-3 py-1 text-[10px] font-oswald font-bold uppercase tracking-wider",
                                                    tagClass,
                                                )}
                                            >
                                                {tagLabel}
                                            </span>

                                            <div className="absolute inset-x-0 bottom-0 z-20 p-4 text-white">
                                                <h3 className="font-oswald text-xl font-bold leading-snug line-clamp-2">
                                                    {event.title}
                                                </h3>
                                                <div className="mt-2 flex flex-col gap-1 font-lato text-sm text-white/90">
                                                    <span className="flex items-center gap-2">
                                                        <svg
                                                            className="h-4 w-4 shrink-0 opacity-90"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                            aria-hidden="true"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                            />
                                                        </svg>
                                                        <time dateTime={event.time}>
                                                            {event.dateMonth} {event.dateDay}, 2026 ·{" "}
                                                            {event.time}
                                                        </time>
                                                    </span>
                                                    <span className="flex items-center gap-2">
                                                        <svg
                                                            className="h-4 w-4 shrink-0 opacity-90"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                            aria-hidden="true"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                            />
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                            />
                                                        </svg>
                                                        <span className="line-clamp-1">
                                                            {event.location}
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="relative z-20 flex flex-1 flex-col justify-between gap-4 p-4 pt-3">
                                            <p className="font-lato text-sm text-gray-600 line-clamp-2">
                                                {event.summary}
                                            </p>
                                            <div className="flex flex-wrap items-center justify-between gap-3">
                                                <span className="font-oswald text-sm font-bold text-esn-green">
                                                    {event.price}
                                                </span>
                                                <Button
                                                    variant="cyan"
                                                    size="sm"
                                                    href={`/events/${event.slug}`}
                                                    className="touch-target relative z-30 shrink-0 rounded-full px-5"
                                                    aria-label={`See details for ${event.title}`}
                                                >
                                                    See Details
                                                </Button>
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>

                        {canLoadMore ? (
                            <div className="mt-12 flex justify-center">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="lg"
                                    className="touch-target rounded-full border-2 border-esn-dark-blue/20 px-10 text-esn-dark-blue hover:border-esn-magenta hover:text-esn-magenta"
                                    onClick={() =>
                                        setVisibleCount((c) => c + LOAD_INCREMENT)
                                    }
                                >
                                    Load More Events
                                </Button>
                            </div>
                        ) : null}
                    </>
                )}
            </div>
        </section>
    );
}
