"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
    const [focusBounds, setFocusBounds] = useState<{
        minLat: number;
        maxLat: number;
        minLng: number;
        maxLng: number;
    } | null>(null);
    const [isExpanding, setIsExpanding] = useState(false);
    const itemsRef = useRef<ExperienceItem[]>(items);
    const isLoadingRef = useRef<boolean>(isLoading);

    useEffect(() => {
        itemsRef.current = items;
    }, [items]);

    useEffect(() => {
        isLoadingRef.current = isLoading;
    }, [isLoading]);
    const [hasFetchedOnce, setHasFetchedOnce] = useState(false);

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
                setHasFetchedOnce(true);
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
                setHasFetchedOnce(true);
            });

        return () => controller.abort();
    }, [activeTab, bounds]);

    useEffect(() => {
        setHoveredId(null);
    }, [visibleItems]);

    const hasResults = items.length > 0;
    const isEmptySearch = !hasResults;
    const showInitialSkeleton = isLoading && !hasFetchedOnce;

    const handleExpandSearch = async () => {
        if (isExpanding) return;
        setIsExpanding(true);
        try {
            let current = bounds;
            const maxIter = 6;
            const expandFactor = 1.45;
            for (let i = 0; i < maxIter; i++) {
                const nextBounds = expandBounds(current, expandFactor);
                setFocusBounds(nextBounds);
                setBounds(nextBounds);

                // wait for results or timeout per iteration
                const initialCount = itemsRef.current.length;
                const found = await new Promise<boolean>((resolve) => {
                    const start = Date.now();
                    const check = () => {
                        if (itemsRef.current.length > initialCount) return resolve(true);
                        if (!isLoadingRef.current && itemsRef.current.length > 0) return resolve(true);
                        if (Date.now() - start > 3500) return resolve(false);
                        setTimeout(check, 150);
                    };
                    check();
                });

                if (found) {
                    // one final slight expand and stop
                    const finalBounds = expandBounds(nextBounds, 1.08);
                    setFocusBounds(finalBounds);
                    setBounds(finalBounds);
                    break;
                }

                current = nextBounds;
            }
        } finally {
            setIsExpanding(false);
        }
    };

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
                                    onClick={handleExpandSearch}
                                    disabled={isExpanding}
                                    className="inline-flex items-center justify-center rounded-full bg-sky-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-800 disabled:cursor-not-allowed disabled:bg-sky-300"
                                >
                                        {isExpanding ? "Genişletiliyor..." : "Haritayı genişlet"}
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
                        focusBounds={focusBounds}
                        suppressOnBoundsChange={isExpanding}
                    />
                </div>
            </div>
        </section>
    );
}