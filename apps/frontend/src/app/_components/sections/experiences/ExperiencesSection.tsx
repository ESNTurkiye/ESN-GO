"use client";

import { useState } from "react";
import NearbyVibesBar from "./NearbyVibesBar";
import FilterTabs from "./FilterTabs";
import SubFilters from "./SubFilters";
import ExperienceList from "./ExperienceList";
import MapPlaceholder from "./MapPlaceholder";

export default function ExperiencesSection() {
  const [activeTab, setActiveTab] = useState("Vibes");

  return (
    <section className="pt-24 md:pt-28 px-6 max-w-7xl mx-auto">
      
      {/* TOP BAR */}
      <NearbyVibesBar />

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
        
        {/* LEFT SIDE */}
        <div>
          <h1 className="text-4xl font-oswald font-bold mb-2 text-esn-dark-blue">
            Ultimate Guide 2026
          </h1>
          <p className="text-lg text-gray-600 mb-6 font-lato">
            Savor the city, discover Türkiye
          </p>

          <FilterTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <SubFilters activeTab={activeTab} />

          <ExperienceList />
        </div>

        {/* RIGHT SIDE */}
        <MapPlaceholder />
      </div>
    </section>
  );
}