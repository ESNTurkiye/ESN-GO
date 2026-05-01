"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import FilterTabs from "./FilterTabs";
import SubFilters from "./SubFilters";
import ExperienceList from "./ExperienceList";
import MapPlaceholder from "./MapPlaceholder";
import { EXPERIENCES, type ExperienceCategory } from "./data";

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

    const filterOptions = useMemo(() => {
        const byTab = EXPERIENCES.filter(
            (item) => item.category === TAB_TO_CATEGORY[activeTab],
        );
        return [
            "all",
            ...Array.from(new Set(byTab.map((item) => item.vibe.toLowerCase()))),
        ];
    }, [activeTab]);

    useEffect(() => {
        if (!filterOptions.includes(selectedFilter)) {
            setSelectedFilter("all");
        }
    }, [filterOptions, selectedFilter]);

    const filteredItems = useMemo(() => {
        return EXPERIENCES.filter((item) => {
            const sameTabCategory = item.category === TAB_TO_CATEGORY[activeTab];
            const sameFilter =
                selectedFilter === "all" ||
                item.vibe.toLowerCase() === selectedFilter.toLowerCase();
            return sameTabCategory && sameFilter;
        });
    }, [activeTab, selectedFilter]);

    const activeExperienceId = hoveredId ?? filteredItems[0]?.id ?? null;

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
                        items={filteredItems}
                        activeId={activeExperienceId}
                        onHover={setHoveredId}
                    />
                </div>

                <div className="lg:col-span-2 lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)] self-start">
                    <MapPlaceholder
                        items={filteredItems}
                        activeId={activeExperienceId}
                        onSelect={setHoveredId}
                    />
                </div>
            </div>
        </section>
    );
}