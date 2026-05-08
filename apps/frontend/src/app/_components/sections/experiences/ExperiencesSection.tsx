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
    } | null>(null);

    // Reset selectedFilter when activeTab changes
    useEffect(() => {
        setSelectedFilter("all");
    }, [activeTab]);

    const filterOptions = useMemo(() => {
        const byTab = items.filter(
            (item) => item.category === TAB_TO_CATEGORY[activeTab],
        );
        return [
            "all",
            ...Array.from(new Set(byTab.map((item) => item.vibe.toLowerCase()))),
        ];
    }, [activeTab, items]);

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

        if (selectedFilter !== "all") {
            params.set("vibe", selectedFilter);
        }

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
    }, [activeTab, bounds, selectedFilter]);

    useEffect(() => {
        setHoveredId(null);
    }, [activeTab, selectedFilter, bounds]);

    const activeExperienceId = hoveredId ?? items[0]?.id ?? null;

    const handleExpandMapSearch = () => {
        // Reset the bounds to expand search to larger area
        setBounds({
            minLat: 38.5,
            maxLat: 42.5,
            minLng: 26.0,
            maxLng: 32.0,
        });
    };

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

                    <ExperienceList
                        items={items}
                        activeId={activeExperienceId}
                        onHover={setHoveredId}
                        isLoading={isLoading}
                        showExpandButton={bounds !== null && items.length === 0}
                        onExpandMap={handleExpandMapSearch}
                    />
                </div>

                <div className="lg:col-span-2 lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)] self-start">
                    <MapPlaceholder
                        items={items}
                        activeId={activeExperienceId}
                        onSelect={setHoveredId}
                        onBoundsChange={setBounds}
                    />
                </div>
            </div>
        </section>
    );
}