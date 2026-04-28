"use client";

import { useState, useEffect } from "react";

interface SubFiltersProps {
  activeTab: string;
}

const subFilters = {
  Vibes: ["Nightlife", "Historical", "Cafes", "Parks", "Markets"],
  Food: ["Restaurants", "Street Food", "Cafes", "Bakeries", "Markets"],
  Hidden: ["Secret Spots", "Local Gems", "Offbeat Places", "Hidden Trails"]
};

export default function SubFilters({ activeTab }: SubFiltersProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>("");

  useEffect(() => {
    // Tab değişince ilk filtreyi seçili yap
    const currentFilters = subFilters[activeTab as keyof typeof subFilters] || [];
    if (currentFilters.length > 0) {
      setSelectedFilter(currentFilters[0]);
    }
  }, [activeTab]);

  const toggleFilter = (filter: string) => {
    setSelectedFilter(filter);
  };

  const currentFilters = subFilters[activeTab as keyof typeof subFilters] || [];

  return (
    <div className="flex gap-2 mt-4 flex-wrap">
      {currentFilters.map((f) => (
        <button
          key={f}
          onClick={() => toggleFilter(f)}
          className={`px-4 py-2 text-sm rounded-full border transition-all duration-200 ${
            selectedFilter === f
              ? "bg-esn-magenta text-white border-esn-magenta shadow-md"
              : "border-gray-300 text-gray-600 hover:bg-esn-green hover:text-white hover:border-esn-green hover:shadow-sm"
          }`}
        >
          {f}
        </button>
      ))}
    </div>
  );
}