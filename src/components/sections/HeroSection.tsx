'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Button from '../ui/Button';
import { useTranslations } from '@/hooks/useTranslations';

export default function HeroSection() {
    const { t } = useTranslations();
    const videoRef = useRef<HTMLVideoElement>(null);
    const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    useEffect(() => {
        // Delay video load by 3 seconds to prioritize LCP
        const timer = setTimeout(() => {
            setShouldLoadVideo(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!shouldLoadVideo) return;
        
        const video = videoRef.current;
        if (!video) return;

        // Play video when loaded
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
            playPromise
                .then(() => setIsVideoPlaying(true))
                .catch((error) => {
                    console.log('Video autoplay prevented:', error);
                });
        }

        // Pause video when out of viewport
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        video.play().catch(() => {});
                    } else {
                        video.pause();
                    }
                });
            },
            { threshold: 0.25 }
        );

        observer.observe(video);

        return () => {
            observer.disconnect();
        };
    }, [shouldLoadVideo]);

    return (
        <section className="relative min-h-dvh w-full overflow-hidden pt-16 md:pt-20">
            {/* Video Background - Absolute positioning, z-0 */}
            <div className="absolute inset-0 z-0 bg-esn-dark-blue">
                {/* Hero Poster Image - LCP Element */}
                <Image
                    src="https://babas-teknoloji.s3.eu-central-1.amazonaws.com/esn-go/images/hero-poster.jpg"
                    alt="Turkish cities and Erasmus student experiences"
                    fill
                    priority
                    quality={90}
                    sizes="100vw"
                    className={`object-cover object-center transition-opacity duration-1000 ${
                        isVideoPlaying ? 'opacity-0' : 'opacity-100'
                    }`}
                />
                
                {/* Video - Lazy loaded after 3s */}
                {shouldLoadVideo && (
                    <video
                        ref={videoRef}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="none"
                        className="absolute inset-0 w-full h-full object-cover object-center"
                        aria-label="Background video showing Turkish cities and Erasmus student experiences"
                    >
                        <source src="https://babas-teknoloji.s3.eu-central-1.amazonaws.com/esn-go/videos/ESN_GO_Turkey_Erasmus_Student_Platform.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                )}
            </div>

            {/* Gradient Overlay - Absolute z-10 */}
            <div className="absolute inset-0 z-10 bg-linear-to-b from-black/60 via-black/40 to-black/70" />

            {/* Content Container - Relative z-20 */}
            <div className="relative z-20 flex flex-col items-center justify-center min-h-[calc(100dvh-4rem)] md:min-h-[calc(100dvh-5rem)] container-responsive text-center">
                <div className="max-w-7xl mx-auto w-full">
                    <h1
                        className="font-oswald font-bold text-white mb-6 tracking-tight max-w-5xl mx-auto animate-fade-in-up"
                        style={{
                            fontSize: 'clamp(2rem, 8vw, 4rem)',
                            lineHeight: 'clamp(1.2, 1.1, 1.1)',
                        }}
                    >
                        {t('hero.title')}
                    </h1>

                    <p
                        className="text-white/90 font-lato mb-8 max-w-2xl mx-auto px-4 animate-fade-in-up-delay-1"
                        style={{
                            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                            lineHeight: '1.6',
                        }}
                    >
                        {t('hero.subtitle')}
                    </p>

                    {/* CTA Group - Mobile-first stacking with proper touch targets */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8 w-full max-w-md sm:max-w-none mx-auto justify-center px-4 animate-fade-in-up-delay-2">
                        <Button
                            size="lg"
                            variant="magenta"
                            className="w-full sm:w-auto min-h-[48px]"
                            aria-label="Find Erasmus events in Turkey"
                        >
                            {t('hero.findEvents')}
                        </Button>
                        <Link 
                            href="/#" 
                            className="w-full sm:w-auto min-h-[48px]" 
                        >
                            <Button
                                size="lg"
                                variant="cyan"           
                                aria-label="Explore Turkish cities" 
                            >
                                {t('hero.exploreCities')}
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator - Inline SVG for infinite scaling */}
            <div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-fade-in-slow"
                aria-label="Scroll down for more content"
                role="button"
                tabIndex={0}
                onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
                onKeyDown={(e) => e.key === 'Enter' && window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
            >
                <svg
                    className="w-8 h-8 text-white cursor-pointer animate-bounce-y"
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
                </svg>
            </div>
        </section>
    );
}
