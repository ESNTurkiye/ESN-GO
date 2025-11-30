'use client';

import { useState } from "react";
import ArrowIcon from "../ui/ArrowIcon";

export default function VibeSelectorSection() {
  const [selectedVibe, setSelectedVibe] = useState('all');

  const vibes = [
    { id: 'all', label: 'All Vibes', color: '#2e3192' },
    { id: 'party', label: 'Party', color: '#ec008c' },
    { id: 'nature', label: 'Nature', color: '#7ac143' },
    { id: 'culture', label: 'Culture', color: '#f47b20' },
    { id: 'chill', label: 'Chill', color: '#00aeef' }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto container-responsive">
        <div className="text-center mb-12">
          <h2 className="fluid-heading-lg font-oswald font-bold text-esn-dark-blue mb-4 ">
            Start with a Vibe
          </h2>
          <p className="fluid-body-md text-gray-600 font-lato max-w-3xl mx-auto">
            What&apos;s your mood? Filter experiences by how you feel
          </p>
        </div>

        <div className="mb-16">
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {vibes.map((vibe) => (
              <button
                key={vibe.id}
                onClick={() => setSelectedVibe(vibe.id)}
                aria-label={`Filter destinations by vibe: ${vibe.label}`}
                aria-pressed={selectedVibe === vibe.id}
                className={`touch-target px-6 sm:px-8 py-3 rounded-full font-oswald font-bold  text-sm transition-all duration-300 ${
                  selectedVibe === vibe.id
                    ? 'text-white shadow-lg transform scale-105'
                    : 'bg-white text-esn-dark-blue border-2 hover:shadow-md'
                }`}
                style={{
                  backgroundColor: selectedVibe === vibe.id ? vibe.color : 'white',
                  borderColor: vibe.color
                }}
              >
                {vibe.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
          <div className="lg:col-span-7 relative h-[400px] sm:h-[500px] rounded-2xl overflow-hidden shadow-xl group cursor-pointer">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560089000-7433a4ebbd64?q=80&w=2070')" }}
              role="img"
              aria-label="Istanbul nightlife scene with colorful lights"
            ></div>
            <div className="absolute inset-0 bg-linear-to-t from-esn-magenta/90 via-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
              <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-white/20 backdrop-blur-sm text-white text-xs sm:text-sm font-oswald font-bold  rounded-full mb-3 sm:mb-4">
                #ErasmusLife
              </span>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-oswald font-bold text-white mb-3 sm:mb-4  leading-tight">
                Istanbul<br className="sm:hidden" /> Nightlife
              </h3>
              <p className="text-base sm:text-xl text-white/90 font-lato mb-4 sm:mb-6">
                Discover the best student-friendly clubs and bars in Kadıköy and Taksim
              </p>
              <button 
                className="touch-target px-5 sm:px-6 py-2.5 sm:py-3 bg-white text-esn-magenta rounded-lg font-oswald font-bold  hover:-translate-y-0.5 transition-all flex items-center gap-2"
                aria-label="Explore Istanbul nightlife destinations"
              >
                Explore
                <ArrowIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            <div className="relative h-48 sm:h-60 rounded-2xl overflow-hidden shadow-lg group cursor-pointer">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070')" }}
                role="img"
                aria-label="Black Sea mountain landscape"
              ></div>
              <div className="absolute inset-0 bg-linear-to-t from-esn-green/85 via-black/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                <h3 className="text-xl sm:text-2xl font-oswald font-bold text-white mb-1 sm:mb-2 ">Black Sea Nature</h3>
                <p className="text-white/90 font-lato text-sm">Weekend trips to Ayder Plateau</p>
              </div>
            </div>

            <div className="relative h-48 sm:h-60 rounded-2xl overflow-hidden shadow-lg group cursor-pointer">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1605640840605-14ac1855827b?q=80&w=2070')" }}
                role="img"
                aria-label="Pamukkale thermal pools white terraces"
              ></div>
              <div className="absolute inset-0 bg-linear-to-t from-esn-cyan/85 via-black/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                <span className="inline-block px-2.5 sm:px-3 py-1 bg-esn-cyan text-white text-xs font-oswald font-bold  rounded-full mb-1.5 sm:mb-2">
                  ESNcard -30%
                </span>
                <h3 className="text-xl sm:text-2xl font-oswald font-bold text-white mb-1 sm:mb-2 ">Pamukkale Thermal</h3>
                <p className="text-white/90 font-lato text-sm">Special discount for students</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}