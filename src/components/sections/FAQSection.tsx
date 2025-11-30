'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';

// --- CONFIGURATION ---
const CONFIG = {
  MOBILE_ACTIVE_HEIGHT: 440,    
  MOBILE_INACTIVE_HEIGHT: 84,    
  
  ACTIVE_FLEX: 3.5,
  INACTIVE_FLEX: 1,
    
  DESKTOP_ANIMATION: { 
    type: "spring", 
    stiffness: 200, 
    damping: 24,
    mass: 1
  },
  MOBILE_ANIMATION: {
    type: "tween",
    ease: "circOut",    
    duration: 0.4
  },
  
  COLORS: {
    DARK_BLUE: '#2e3192',
    CYAN: '#00aeef',
    MAGENTA: '#ec008c',
    GREEN: '#7ac143',
  }
};

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
}

export default function HorizontalFAQSection() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isMounted, setIsMounted] = useState(false);
  
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const faqs = [
    {
      id: 1,
      q: "Accommodation",
      fullQ: "How do I find accommodation?",
      a: "Check your university's housing office first! Join Facebook groups like 'Erasmus Istanbul' and check Sahibinden.com. Local ESN sections often have verified housing lists.",
      color: CONFIG.COLORS.DARK_BLUE,
      img: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=2069&auto=format&fit=crop"
    },
    {
      id: 2,
      q: "SIM Cards",
      fullQ: "Do I need a Turkish SIM?",
      a: "Yes! Register your phone at the airport or buy a prepaid 'Tourist SIM' from Turkcell or Vodafone. If you stay >120 days, you must register your IMEI to avoid blocking.",
      color: CONFIG.COLORS.CYAN,
      img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 3,
      q: "Banking",
      fullQ: "Can I open a bank account?",
      a: "Most banks require a Tax Number (Vergi No) and Residence Permit. Ziraat Bank and İş Bank are student-friendly. Apps like Wise or Revolut work great for transfers too.",
      color: CONFIG.COLORS.MAGENTA,
      img: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 4,
      q: "ESNcard",
      fullQ: "Why do I need an ESNcard?",
      a: "It's your magic pass! You get Ryanair discounts, Flixbus deals, and entry to ESN parties. Get it from your local ESN section office during Welcome Week.",
      color: CONFIG.COLORS.GREEN,
      img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveIndex(index);
    }
  };

  const getAnimationProps = (index: number) => {
    const isActive = activeIndex === index;
    if (!isMounted) return {};

    if (isDesktop) {
      return { flex: isActive ? CONFIG.ACTIVE_FLEX : CONFIG.INACTIVE_FLEX };
    } else {
      return { height: isActive ? CONFIG.MOBILE_ACTIVE_HEIGHT : CONFIG.MOBILE_INACTIVE_HEIGHT };
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-4xl md:text-5xl font-oswald font-bold text-esn-dark-blue mb-4 uppercase">
            Erasmus Hacks
          </h2>
          <p className="text-gray-600 font-lato">
            Everything you need to survive & thrive
          </p>
        </div>

        <LayoutGroup>
          <div className="flex flex-col lg:flex-row h-auto lg:h-[450px] gap-3 md:gap-4 w-full">
            {faqs.map((faq, index) => (
              <motion.button
                layout={isDesktop} // Only perform full layout calculations on Desktop
                key={faq.id}
                role="button"
                aria-expanded={activeIndex === index}
                aria-controls={`faq-panel-${index}`}
                aria-label={`${faq.q}: Click to ${activeIndex === index ? 'collapse' : 'expand'}`}
                tabIndex={0}
                onClick={() => setActiveIndex(index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                animate={getAnimationProps(index)}
                // Use Tween for Mobile (Stable), Spring for Desktop (Bouncy)
                transition={isDesktop ? CONFIG.DESKTOP_ANIMATION as any : CONFIG.MOBILE_ANIMATION as any}
                className={`
                  relative rounded-3xl overflow-hidden cursor-pointer shadow-lg transition-shadow hover:shadow-xl
                  focus:outline-none focus:ring-4 focus:ring-opacity-50 transform-gpu
                  will-change-[height,flex] /* GPU Optimization hint */
                `}
                style={{
                  '--tw-ring-color': faq.color 
                } as React.CSSProperties}
              >
                {/* Background Image - Reduced Motion scale for performance */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out"
                  style={{ 
                    backgroundImage: `url(${faq.img})`,
                    transform: activeIndex === index ? 'scale(1.0)' : 'scale(1.05)' 
                  }}
                />
                
                {/* Gradient Overlay */}
                <div 
                  className="absolute inset-0 transition-opacity duration-300"
                  style={{ 
                    background: `linear-gradient(to top, ${faq.color} 0%, ${faq.color}cc 60%, ${faq.color}66 100%)`,
                    opacity: activeIndex === index ? 0.9 : 0.85 
                  }}
                />

                {/* CONTENT CONTAINER */}
                <div 
                  id={`faq-panel-${index}`}
                  className="relative h-full w-full p-5 md:p-6 flex flex-col justify-end text-white"
                >
                  
                  {/* CLOSED STATE (Desktop) */}
                  {activeIndex !== index && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="hidden lg:flex absolute inset-0 items-center justify-center"
                    >
                      <h3 className="font-oswald font-bold text-3xl uppercase tracking-widest -rotate-90 whitespace-nowrap opacity-90 select-none">
                        {faq.q}
                      </h3>
                    </motion.div>
                  )}

                  {/* CLOSED STATE (Mobile) */}
                  {activeIndex !== index && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="lg:hidden flex items-center justify-between h-full w-full"
                    >
                      <h3 className="font-oswald font-bold text-xl md:text-2xl uppercase tracking-wide select-none">
                        {faq.q}
                      </h3>
                      <div className="bg-white/20 p-1.5 md:p-2 rounded-full backdrop-blur-sm">
                        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </motion.div>
                  )}

                  {/* OPEN STATE CONTENT */}
                  <AnimatePresence mode={isDesktop ? "wait" : undefined}> 
                  {/* Only wait on Desktop. On mobile, instant switch feels faster. */}
                    {activeIndex === index && (
                      <motion.div 
                        key="content"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="space-y-3 md:space-y-4 text-left w-full"
                      >
                        {/* Number Badge */}
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-1">
                          <span className="font-oswald text-xl md:text-2xl font-bold">0{index + 1}</span>
                        </div>

                        <h3 className="font-oswald font-bold text-2xl md:text-4xl leading-none uppercase">
                          {faq.fullQ}
                        </h3>
                        
                        <p className="font-lato text-white/90 text-sm md:text-lg leading-relaxed max-w-lg">
                          {faq.a}
                        </p>

                        <div className="pt-2">
                          <span className="inline-block px-5 py-2 bg-white text-black font-bold font-oswald rounded-full text-xs md:text-sm uppercase tracking-wide hover:bg-gray-100 transition-colors cursor-pointer shadow-md">
                            Read Guide
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.button>
            ))}
          </div>
        </LayoutGroup>
      </div>
    </section>
  );
}