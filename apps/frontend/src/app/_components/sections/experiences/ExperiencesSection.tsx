"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import FilterTabs from "./FilterTabs";
import SubFilters from "./SubFilters";
import ExperienceList from "./ExperienceList";
import MapPlaceholder from "./MapPlaceholder";
import type { ExperienceCategory, ExperienceItem } from "./data";

const TAB_TO_CATEGORY: Record<string, ExperienceCategory> = {
    Vibes: "vibe",
    Food: "food",
    "Hidden Gems": "hidden",
};

const TURKEY_BOUNDS = {
    minLat: 35.5,
    maxLat: 42.5,
    minLng: 25,
    maxLng: 45.5,
};

function expandBounds(
    currentBounds: { minLat: number; maxLat: number; minLng: number; maxLng: number },
    factor = 1.35,
) {
    const latCenter = (currentBounds.minLat + currentBounds.maxLat) / 2;
    const lngCenter = (currentBounds.minLng + currentBounds.maxLng) / 2;
    const latHalf = (currentBounds.maxLat - currentBounds.minLat) / 2;
    const lngHalf = (currentBounds.maxLng - currentBounds.minLng) / 2;

    return {
        minLat: latCenter - latHalf * factor,
        maxLat: latCenter + latHalf * factor,
        minLng: lngCenter - lngHalf * factor,
        maxLng: lngCenter + lngHalf * factor,
    };
}

export default function ExperiencesSection() {
    const searchParams = useSearchParams();
    const initialVibe = searchParams.get("vibe")?.toLowerCase() ?? "";
    const initialCategory = searchParams.get("category")?.toLowerCase() ?? "";
    const defaultTab = initialCategory === "food" ? "Food" : "Vibes";

    const [activeTab, setActiveTab] = useState(defaultTab);
    const [selectedFilter, setSelectedFilter] = useState(
        initialVibe || "all",
    );
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [items, setItems] = useState<ExperienceItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [bounds, setBounds] = useState<{
        minLat: number;
        maxLat: number;
        minLng: number;
        maxLng: number;
    }>(TURKEY_BOUNDS);
    const [autoExpandAttempts, setAutoExpandAttempts] = useState(0);

    const filterOptions = useMemo(() => {
        const byTab = items.filter(
            (item) => item.category === TAB_TO_CATEGORY[activeTab],
        );
        return [
            "all",
            ...Array.from(new Set(byTab.map((item) => item.vibe.toLowerCase()))),
        ];
    }, [activeTab, items]);

    const visibleItems = useMemo(() => {
        if (selectedFilter === "all") {
            return items;
        }

        return items.filter(
            (item) => item.vibe.toLowerCase() === selectedFilter,
        );
    }, [items, selectedFilter]);

    useEffect(() => {
        if (!filterOptions.includes(selectedFilter)) {
            setSelectedFilter("all");
        }
    }, [filterOptions, selectedFilter]);

    useEffect(() => {
        setAutoExpandAttempts(0);
    }, [activeTab, selectedFilter]);

    useEffect(() => {
        if (!bounds) {
            setItems([]);
            setIsLoading(true);
            return;
        }

        const category = TAB_TO_CATEGORY[activeTab];
        const params = new URLSearchParams({
            minLat: String(bounds.minLat),
            maxLat: String(bounds.maxLat),
            minLng: String(bounds.minLng),
            maxLng: String(bounds.maxLng),
            category,
        });

        const controller = new AbortController();
        setIsLoading(true);

        void fetch(`/api/v1/experiences?${params.toString()}`, {
            signal: controller.signal,
        })
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch experiences");
                }
                return response.json() as Promise<{
                    data?: { experiences?: ExperienceItem[] };
                }>;
            })
            .then((payload) => {
                setItems(payload.data?.experiences ?? []);
                setIsLoading(false);
            })
            .catch((error: unknown) => {
                if (
                    error instanceof DOMException &&
                    error.name === "AbortError"
                ) {
                    return;
                }
                setItems([]);
                setIsLoading(false);
            });

        return () => controller.abort();
    }, [activeTab, bounds]);

    useEffect(() => {
        setHoveredId(null);
    }, [visibleItems]);

    const hasResults = items.length > 0;
    const isEmptySearch = !hasResults && (!isLoading || autoExpandAttempts > 0);
    const showInitialSkeleton = isLoading && !hasResults && autoExpandAttempts === 0;

    useEffect(() => {
        if (isLoading || hasResults) {
            return;
        }

        if (autoExpandAttempts >= 6) {
            return;
        }

        const timer = window.setTimeout(() => {
            setBounds((currentBounds) => expandBounds(currentBounds));
            setAutoExpandAttempts((value) => value + 1);
        }, 800);

        return () => window.clearTimeout(timer);
    }, [autoExpandAttempts, hasResults, isLoading]);

    const activeExperienceId = hoveredId ?? visibleItems[0]?.id ?? null;

    return (
        <section className="pt-20 md:pt-24 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-0 items-start">
                <div className="lg:col-span-3 min-w-0 px-4 lg:px-8">
                    <FilterTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                    <SubFilters
                        options={filterOptions}
                        selectedFilter={selectedFilter}
                        onSelect={setSelectedFilter}
                    />

                    {isEmptySearch && (
                        <div className="mt-8 flex min-h-[18rem] items-center justify-center rounded-3xl border border-dashed border-sky-200 bg-sky-50/60 px-6 py-10 text-center">
                            <div className="max-w-md space-y-4">
                                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
                                    Sonuç yok
                                </p>
                                <p className="text-sm leading-6 text-slate-600">
                                    Bu alanda kart bulunmuyor.
                                    {isLoading
                                        ? " Harita genişletiliyor..."
                                        : " Harita aramasını genişleterek daha fazla deneyim yükleyebilirsin."}
                                </p>
                                <button
                                    type="button"
                                    disabled={isLoading && autoExpandAttempts === 0}
                                    onClick={() => {
                                        setBounds((currentBounds) => expandBounds(currentBounds, 1.45));
                                        setAutoExpandAttempts((value) => value + 1);
                                    }}
                                    className="inline-flex items-center justify-center rounded-full bg-sky-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-800 disabled:cursor-not-allowed disabled:bg-sky-300"
                                >
                                    Haritayı genişlet
                                </button>
                            </div>
                        </div>
                    )}

                    <ExperienceList
                        items={visibleItems}
                        activeId={activeExperienceId}
                        onHover={setHoveredId}
                        isLoading={showInitialSkeleton}
                    />
                </div>

                <div className="lg:col-span-2 lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)] self-start">
                    <MapPlaceholder
                        items={visibleItems}
                        activeId={activeExperienceId}
                        onSelect={setHoveredId}
                        onBoundsChange={setBounds}
                    />
                </div>
            </div>
        </section>
    );
}