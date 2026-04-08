"use client";

import { useState } from "react";

export default function NearbyVibesBar() {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [isNearMeSelected, setIsNearMeSelected] = useState(false);

  const locations = ["Istanbul", "Ankara", "İzmir", "Antalya", "Bursa"];

  const handleLocationChange = (location: string) => {
    setSelectedLocation(location);
    if (location) {
      setIsNearMeSelected(true); // Şehir seçince otomatik near me seç
    } else {
      setIsNearMeSelected(false);
    }
  };

  return (
    <div className="mt-4 mb-8 w-full bg-gradient-to-r from-esn-cyan to-esn-magenta rounded-xl shadow-xl border border-white/20 p-4 flex flex-col md:flex-row justify-between items-center gap-3 hover:shadow-2xl transition-shadow duration-300">
      
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <input 
            type="checkbox" 
            checked={isNearMeSelected}
            onChange={(e) => setIsNearMeSelected(e.target.checked)}
            className="w-4 h-4 text-esn-dark-blue focus:ring-esn-cyan"
          />
          <span className="font-medium text-white text-sm">Nearby vibes</span>
        </div>
        
        <select 
          value={selectedLocation}
          onChange={(e) => handleLocationChange(e.target.value)}
          className="px-3 py-2 rounded-lg border border-white/30 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
        >
          <option value="" className="text-gray-800">Select a city</option>
          {locations.map(loc => (
            <option key={loc} value={loc} className="text-gray-800">{loc}</option>
          ))}
        </select>

        {isNearMeSelected && selectedLocation && (
          <span className="text-white text-xs bg-white/20 px-2 py-1 rounded">
            Within 50km
          </span>
        )}
      </div>

      <button className="px-4 py-2 rounded-lg bg-esn-dark-blue text-white font-medium hover:bg-esn-orange hover:scale-105 transition-all duration-200 shadow-md text-sm">
        Show me what's near
      </button>
    </div>
  );
}