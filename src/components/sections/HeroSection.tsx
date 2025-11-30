'use client';

import { motion } from 'framer-motion';
import Button from '../ui/Button';

export default function HeroSection() {
  return (
    <section className="relative h-dvh w-full overflow-hidden">
      {/* Video Background - Absolute positioning, z-0 */}
      <div className="absolute inset-0 z-0 bg-esn-dark-blue">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          className="absolute inset-0 w-full h-full object-cover object-center"
          aria-label="Background video showing Turkish cities and Erasmus student experiences"
        >
          <source src="/videos/ESN_GO_Turkey_Erasmus_Student_Platform.mp4" type="video/mp4" />
          <source src="/videos/ESN_GO_Turkey_Erasmus_Student_Platform.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Gradient Overlay - Absolute z-10 */}
      <div className="absolute inset-0 z-10 bg-linear-to-b from-black/60 via-black/40 to-black/70" />

      {/* Content Container - Relative z-20 */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full container-responsive text-center">
        <div className="max-w-7xl mx-auto w-full">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="font-oswald font-bold text-white mb-6 uppercase tracking-tight max-w-5xl mx-auto"
            style={{
              fontSize: 'clamp(2rem, 8vw, 4rem)',
              lineHeight: 'clamp(1.2, 1.1, 1.1)',
            }}
          >
            Explore Türkiye with ESN
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="text-white/90 font-lato mb-8 max-w-2xl mx-auto px-4"
            style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
              lineHeight: '1.6',
            }}
          >
            Students helping students discover the best of Turkish cities, culture, and adventures
          </motion.p>

          {/* CTA Group - Mobile-first stacking with proper touch targets */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8 w-full max-w-md sm:max-w-none mx-auto justify-center px-4"
          >
            <Button
              size="lg"
              variant="magenta"
              className="w-full sm:w-auto min-h-[48px]"
              aria-label="Find Erasmus events in Turkey"
            >
              Find Events
            </Button>
            <Button 
              size="lg" 
              variant="cyan" 
              className="w-full sm:w-auto min-h-[48px]"
              aria-label="Explore Turkish cities"
            >
              Explore Cities
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator - Inline SVG for infinite scaling */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        aria-label="Scroll down for more content"
        role="button"
        tabIndex={0}
        onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
        onKeyDown={(e) => e.key === 'Enter' && window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <motion.svg
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-8 h-8 text-white cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </motion.svg>
      </motion.div>
    </section>
  );
}

