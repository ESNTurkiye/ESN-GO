'use client';

import { useState } from "react";
import Image from "next/image";
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

  const destinations = [
    {
      id: 'istanbul-nightlife',
      image: 'https://images.unsplash.com/photo-1560089000-7433a4ebbd64',
      imageAlt: 'Istanbul nightlife scene with colorful lights',
      tag: '#ErasmusLife',
      title: 'Istanbul Nightlife',
      titleBreak: true,
      description: 'Discover the best student-friendly clubs and bars in Kadıköy and Taksim',
      overlayColor: 'from-esn-magenta/90',
      featured: true,
      hasButton: true
    },
    {
      id: 'black-sea-nature',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
      imageAlt: 'Black Sea mountain landscape',
      title: 'Black Sea Nature',
      description: 'Weekend trips to Ayder Plateau',
      overlayColor: 'from-esn-green/85',
      featured: false
    },
    {
      id: 'pamukkale-thermal',
      image: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b',
      imageAlt: 'Pamukkale thermal pools white terraces',
      badge: 'ESNcard -30%',
      badgeColor: 'bg-esn-cyan',
      title: 'Pamukkale Thermal',
      description: 'Special discount for students',
      overlayColor: 'from-esn-cyan/85',
      featured: false
    }
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
          {destinations.filter(d => d.featured).map((dest) => (
            <div 
              key={dest.id}
              className="lg:col-span-7 relative h-[400px] sm:h-[500px] rounded-2xl overflow-hidden shadow-xl group cursor-pointer"
            >
              <Image
                src={dest.image}
                alt={dest.imageAlt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 58vw"
                quality={75}
              />
              <div className={`absolute inset-0 bg-linear-to-t ${dest.overlayColor} via-black/40 to-transparent`}></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 z-10">
                {dest.tag && (
                  <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-white/20 backdrop-blur-sm text-white text-xs sm:text-sm font-oswald font-bold rounded-full mb-3 sm:mb-4">
                    {dest.tag}
                  </span>
                )}
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-oswald font-bold text-white mb-3 sm:mb-4 leading-tight">
                  {dest.titleBreak ? (
                    <>{dest.title.split(' ')[0]}<br className="sm:hidden" /> {dest.title.split(' ').slice(1).join(' ')}</>
                  ) : dest.title}
                </h3>
                <p className="text-base sm:text-xl text-white/90 font-lato mb-4 sm:mb-6">
                  {dest.description}
                </p>
                {dest.hasButton && (
                  <button 
                    className="touch-target px-5 sm:px-6 py-2.5 sm:py-3 bg-white text-esn-magenta rounded-lg font-oswald font-bold hover:-translate-y-0.5 transition-all flex items-center gap-2"
                    aria-label={`Explore ${dest.title} destinations`}
                  >
                    Explore
                    <ArrowIcon className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}

          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            {destinations.filter(d => !d.featured).map((dest) => (
              <div 
                key={dest.id}
                className="relative h-48 sm:h-60 rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
              >
                <Image
                  src={dest.image}
                  alt={dest.imageAlt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  quality={75}
                />
                <div className={`absolute inset-0 bg-linear-to-t ${dest.overlayColor} via-black/30 to-transparent`}></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-10">
                  {dest.badge && (
                    <span className={`inline-block px-2.5 sm:px-3 py-1 ${dest.badgeColor} text-white text-xs font-oswald font-bold rounded-full mb-1.5 sm:mb-2`}>
                      {dest.badge}
                    </span>
                  )}
                  <h3 className="text-xl sm:text-2xl font-oswald font-bold text-white mb-1 sm:mb-2">{dest.title}</h3>
                  <p className="text-white/90 font-lato text-sm">{dest.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}