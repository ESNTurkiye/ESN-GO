"use client";

import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useRef, useCallback } from 'react';

interface Destination {
  id: number;
  name: string;
  image: string;
  desc: string;
}

interface DestinationsCarouselProps {
  destinations: Destination[];
}

export default function DestinationsCarousel({ destinations }: DestinationsCarouselProps) {
  const [desktopStep, setDesktopStep] = useState(0);
  
  const [mobileIndex, setMobileIndex] = useState(0);
  
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  
  const totalSteps = 3;
  const totalCards = destinations.length;

  const handleDesktopPrev = () => {
    setDesktopStep((prev) => Math.max(0, prev - 1));
  };

  const handleDesktopNext = () => {
    setDesktopStep((prev) => Math.min(totalSteps - 1, prev + 1));
  };

  const handleMobilePrev = () => {
    setMobileIndex((prev) => Math.max(0, prev - 1));
  };

  const handleMobileNext = () => {
    setMobileIndex((prev) => Math.min(totalCards - 1, prev + 1));
  };

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    const swipeDistance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        setMobileIndex((prev) => Math.min(totalCards - 1, prev + 1));
      } else {
        setMobileIndex((prev) => Math.max(0, prev - 1));
      }
    }
  }, [totalCards]);

  const getDesktopTranslate = useCallback(() => {
    switch (desktopStep) {
      case 0:
        return 'translateX(0px)';
        
      case 1:
        return 'translateX(calc(-1 * ((26% * 3) + (1.5rem * 3)) + ((100% - (26% * 3) - (1.5rem * 2)) / 2)))';
        
      case 2:
        return 'translateX(calc(-1 * ((26% * 6) + (1.5rem * 6)) + (100% - (26% * 3) - (1.5rem * 2))))';
        
      default:
        return 'translateX(0px)';
    }
  }, [desktopStep]);

  const getMobileTranslate = useCallback(() => {
    return `translateX(calc(-1 * (${mobileIndex} * 85vw + ${mobileIndex} * 16px) + (50% - 42.5vw)))`;
  }, [mobileIndex]);

  return (
    <section id="destinations" className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header with Navigation Controls */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-oswald font-bold text-esn-dark-blue mb-4 uppercase">
              Top Destinations
            </h2>
            <p className="text-xl text-gray-600 font-lato">
              Discover Turkish cities loved by the Erasmus Generation
            </p>
          </div>

          {/* Desktop Navigation Buttons - Top Right Position */}
          <div className="hidden md:flex gap-3 md:self-end">
            <button
              onClick={handleDesktopPrev}
              disabled={desktopStep === 0}
              aria-label="Previous destinations"
              className={`
                w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center 
                transition-all duration-300 ease-out
                ${desktopStep === 0 
                  ? 'text-gray-300 cursor-not-allowed' 
                  : 'text-esn-dark-blue hover:bg-esn-cyan hover:text-white hover:shadow-xl active:scale-95'
                }
              `}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleDesktopNext}
              disabled={desktopStep === totalSteps - 1}
              aria-label="Next destinations"
              className={`
                w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center 
                transition-all duration-300 ease-out
                ${desktopStep === totalSteps - 1 
                  ? 'text-gray-300 cursor-not-allowed' 
                  : 'text-esn-dark-blue hover:bg-esn-cyan hover:text-white hover:shadow-xl active:scale-95'
                }
              `}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Desktop Carousel - 3-Step Pagination */}
        <div className="hidden md:block relative">
          <div className="overflow-hidden">
            <div 
              className="flex gap-6 transition-transform duration-500 ease-in-out"
              style={{ transform: getDesktopTranslate() }}
            >
              {destinations.map((dest, index) => {
                let isPartial = false;

                if (desktopStep === 0) {
                  isPartial = index === 3;
                } else if (desktopStep === 1) {
                  isPartial = index === 2 || index === 6;
                } else if (desktopStep === 2) {
                  isPartial = index === 5;
                }

                return (
                  <div
                    key={dest.id}
                    className={`
                      shrink-0 w-[26%] transition-opacity duration-500 ease-in-out
                      ${isPartial ? 'opacity-40' : 'opacity-100'}
                    `}
                  >
                    <div className="relative aspect-3/4 rounded-2xl overflow-hidden cursor-pointer shadow-xl transition-all duration-300 ease-out hover:shadow-2xl group">
                      {/* Image Layer */}
                      <Image
                        src={dest.image}
                        alt={dest.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 85vw, 26vw"
                        priority={index < 3}
                        quality={85}
                        unoptimized={true}
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

                      {/* Content Layer */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                        <h3 className="text-3xl font-oswald font-bold text-white mb-2 uppercase">
                          {dest.name}
                        </h3>
                        <p className="text-gray-200 text-sm font-lato line-clamp-2">
                          {dest.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Desktop Step Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <button
                key={index}
                onClick={() => setDesktopStep(index)}
                aria-label={`Go to step ${index + 1}`}
                className={`
                  h-2 rounded-full transition-all duration-300
                  ${index === desktopStep 
                    ? 'bg-[#00AEEF] w-8' 
                    : 'bg-gray-300 hover:bg-gray-400 w-2'
                  }
                `}
              />
            ))}
          </div>
        </div>

        {/* Mobile Carousel - Single Card with Peekaboo */}
        <div className="md:hidden relative">
          <div 
            className="overflow-visible w-full"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              className="flex gap-4 transition-transform duration-500 ease-in-out"
              style={{ transform: getMobileTranslate() }}
            >
              {destinations.map((dest, index) => {
                const isActive = index === mobileIndex;
                const isPeek = Math.abs(index - mobileIndex) === 1;

                return (
                  <div
                    key={dest.id}
                    className={`
                      shrink-0 w-[85vw] transition-opacity duration-500 ease-in-out
                      ${isActive ? 'opacity-100' : 'opacity-50'}
                    `}
                  >
                    <div className="relative aspect-3/4 rounded-2xl overflow-hidden cursor-pointer shadow-xl transition-all duration-300 ease-out group">
                      {/* Image Layer */}
                      <Image
                        src={dest.image}
                        alt={dest.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="85vw"
                        priority={index < 3}
                        quality={85}
                        unoptimized={true}
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

                      {/* Content Layer */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                        <h3 className="text-2xl font-oswald font-bold text-white mb-2 uppercase">
                          {dest.name}
                        </h3>
                        <p className="text-gray-200 text-sm font-lato line-clamp-2">
                          {dest.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile Navigation Buttons - Below Carousel */}
          <div className="flex justify-center gap-3 mt-8">
            <button
              onClick={handleMobilePrev}
              disabled={mobileIndex === 0}
              aria-label="Previous destination"
              className={`
                w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center 
                transition-all duration-300 ease-out
                ${mobileIndex === 0 
                  ? 'text-gray-300 cursor-not-allowed' 
                  : 'text-esn-dark-blue hover:bg-esn-cyan hover:text-white hover:shadow-xl active:scale-95'
                }
              `}
            >
              <ChevronLeft className="w-7 h-7" />
            </button>
            <button
              onClick={handleMobileNext}
              disabled={mobileIndex === totalCards - 1}
              aria-label="Next destination"
              className={`
                w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center 
                transition-all duration-300 ease-out
                ${mobileIndex === totalCards - 1 
                  ? 'text-gray-300 cursor-not-allowed' 
                  : 'text-esn-dark-blue hover:bg-esn-cyan hover:text-white hover:shadow-xl active:scale-95'
                }
              `}
            >
              <ChevronRight className="w-7 h-7" />
            </button>
          </div>

          {/* Mobile Dot Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {destinations.map((_, index) => (
              <button
                key={index}
                onClick={() => setMobileIndex(index)}
                aria-label={`Go to destination ${index + 1}`}
                className={`
                  h-2 rounded-full transition-all duration-300
                  ${index === mobileIndex 
                    ? 'bg-[#00AEEF] w-8' 
                    : 'bg-gray-300 hover:bg-gray-400 w-2'
                  }
                `}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
