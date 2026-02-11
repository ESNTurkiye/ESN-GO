'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Button from '../ui/Button';
import styles from './HeroSection.module.css';

const HERO_IMAGES = [
    { slug: 'istanbul', label: 'Istanbul' },
    { slug: 'ankara', label: 'Ankara' },
    { slug: 'kapadokya', label: 'Kapadokya' },
    { slug: 'izmir', label: 'Izmir' },
    { slug: 'denizli', label: 'Denizli' },
] as const;

const BASE_URL = 'https://esnturkiye.github.io/esn-assets/images/destinations';
const SLIDE_DURATION_MS = 5000;

export default function HeroSection() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
        }, SLIDE_DURATION_MS);
        return () => clearInterval(id);
    }, []);

    const total = HERO_IMAGES.length;

    return (
        <section className="relative min-h-dvh w-full overflow-hidden pt-16 md:pt-20">
            <div className="absolute inset-0 z-0 bg-esn-dark-blue">
                {HERO_IMAGES.map((img, index) => (
                    <Image
                        key={img.slug}
                        src={`${BASE_URL}/${img.slug}.jpg`}
                        alt={img.label}
                        fill
                        priority={index === 0}
                        sizes="100vw"
                        className="absolute inset-0 object-cover object-center transition-opacity duration-700"
                        style={{ opacity: index === currentIndex ? 1 : 0, zIndex: index === currentIndex ? 1 : 0 }}
                    />
                ))}
            </div>

            <div className="absolute inset-0 z-10 bg-linear-to-b from-black/60 via-black/40 to-black/70" />

            <div className="relative z-20 flex flex-col items-center justify-center min-h-[calc(100dvh-4rem)] md:min-h-[calc(100dvh-5rem)] container-responsive text-center">
                <div className="max-w-7xl mx-auto w-full">
                    <h1
                        className="font-oswald font-bold text-white mb-6 tracking-tight max-w-5xl mx-auto"
                        style={{
                            fontSize: 'clamp(2rem, 8vw, 4rem)',
                            lineHeight: 'clamp(1.2, 1.1, 1.1)',
                        }}
                    >
                        Discover Türkiye with ESN GO
                    </h1>

                    <p
                        className="text-white/90 font-lato mb-8 max-w-2xl mx-auto px-4"
                        style={{
                            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                            lineHeight: '1.6',
                        }}
                    >
                        Plan your Erasmus journey across Türkiye with curated destinations, events, and student tips from ESN volunteers.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8 w-full max-w-md sm:max-w-none mx-auto justify-center px-4">
                        <Button
                            size="lg"
                            variant="magenta"
                            className="w-full sm:w-auto min-h-[48px]"
                            aria-label="Find Erasmus events in Türkiye"
                        >
                            Find events
                        </Button>
                        <Link href="/#" className="w-full sm:w-auto min-h-[48px]">
                            <Button size="lg" variant="cyan" aria-label="Explore Turkish cities">
                                Explore cities
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-6 left-0 right-0 z-20 px-4 flex flex-col items-start gap-3">
                <div className="flex gap-1.5" role="tablist" aria-label="Slideshow progress">
                    {HERO_IMAGES.map((_, index) => (
                        <div
                            key={index}
                            className="w-10 h-1.5 sm:w-12 sm:h-2 rounded-full bg-white/20 overflow-hidden shrink-0"
                            role="tab"
                            aria-selected={index === currentIndex}
                            aria-label={`Slide ${index + 1} of ${total}`}
                        >
                            {index < currentIndex ? (
                                <div className="h-full w-full bg-white rounded-full" />
                            ) : index === currentIndex ? (
                                <div key={currentIndex} className={`h-full w-0 bg-white rounded-full origin-left ${styles.progressBarFill}`} />
                            ) : null}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}