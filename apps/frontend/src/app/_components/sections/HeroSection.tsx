"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./HeroSection.module.css";

const CITY_DATA = [
    {
        slug: "istanbul",
        name: "Istanbul",
        spot: "Kiz Kulesi",
        altText: "Istanbul skyline with Kiz Kulesi",
        coordinates: { cx: 52.2, cy: 34.4 },
    },
    {
        slug: "ankara",
        name: "Ankara",
        spot: "Anitkabir",
        altText: "Ankara city view near Anitkabir",
        coordinates: { cx: 109.5, cy: 64.5 },
    },
    {
        slug: "kapadokya",
        name: "Kapadokya",
        spot: "Goreme",
        altText: "Hot air balloons over Goreme in Kapadokya",
        coordinates: { cx: 140, cy: 88.5 },
    },
    {
        slug: "izmir",
        name: "Izmir",
        spot: "Saat Kulesi",
        altText: "Izmir Konak Square with Saat Kulesi",
        coordinates: { cx: 21.6, cy: 83.6 },
    },
    {
        slug: "denizli",
        name: "Pamukkale",
        spot: "Travertenler",
        altText: "Pamukkale travertines in Denizli",
        coordinates: { cx: 70, cy: 96.3 },
    },
] as const;

const TURKEY_PATH =
    "M263.6,108.8 L257.2,112.0 L252.6,107.2 L237.0,104.8 L231.3,107.7 L216.2,110.6 L209.0,110.3 L193.6,117.3 L182.6,117.4 L175.6,113.8 L160.9,119.0 L156.5,115.4 L155.8,125.8 L152.2,129.9 L148.7,134.0 L143.8,125.5 L148.8,118.5 L140.7,120.1 L129.5,115.8 L120.3,126.6 L100.1,128.7 L89.3,118.6 L74.9,118.0 L71.9,125.7 L62.6,128.0 L49.8,118.0 L35.2,118.4 L27.3,99.8 L17.6,89.4 L24.1,74.9 L15.6,66.0 L30.4,48.1 L50.9,47.4 L56.6,33.2 L81.9,35.7 L98.0,23.6 L113.5,18.3 L135.6,17.9 L158.8,31.1 L178.0,38.3 L193.5,35.4 L205.0,37.1 L220.7,27.3 L234.9,26.4 L247.8,35.6 L250.0,42.2 L248.7,51.3 L258.7,55.9 L263.9,61.4 L254.8,66.7 L259.0,88.1 L256.3,93.9 L263.6,108.8 Z M14.9,21.9 L28.5,16.0 L39.9,18.5 L41.5,25.7 L53.2,31.7 L50.7,36.3 L34.9,37.3 L29.2,43.1 L18.1,53.2 L13.9,44.5 L14.1,40.6 L17.2,38.5 L21.4,26.9 L14.9,21.9 Z";

const BASE_URL = "https://esnturkiye.github.io/esn-assets/images/destinations";
const SLIDE_DURATION_MS = 7600;
const MOBILE_MAP_DELAY_MS = 420;

export default function HeroSection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [showMobileMap, setShowMobileMap] = useState(false);
    const [hasShownMobileIntro, setHasShownMobileIntro] = useState(false);
    const activeCity = CITY_DATA[currentIndex];
    const activeSlug = activeCity.slug;
    const activeLabel = `${activeCity.name} | ${activeCity.spot}`;
    const shouldShowHeroText = !isMobile || (!hasShownMobileIntro && currentIndex === 0);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 767px)");
        const syncViewport = () => setIsMobile(mediaQuery.matches);
        syncViewport();
        mediaQuery.addEventListener("change", syncViewport);
        return () => mediaQuery.removeEventListener("change", syncViewport);
    }, []);

    useEffect(() => {
        const id = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % CITY_DATA.length);
        }, SLIDE_DURATION_MS);
        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        if (!isMobile) {
            setShowMobileMap(false);
            return;
        }

        if (!hasShownMobileIntro && currentIndex === 0) {
            setShowMobileMap(false);
            return;
        }

        setShowMobileMap(false);
        const timeoutId = window.setTimeout(() => {
            setShowMobileMap(true);
        }, MOBILE_MAP_DELAY_MS);

        return () => window.clearTimeout(timeoutId);
    }, [isMobile, currentIndex, hasShownMobileIntro]);

    useEffect(() => {
        if (isMobile && !hasShownMobileIntro && currentIndex > 0) {
            setHasShownMobileIntro(true);
        }
    }, [isMobile, currentIndex, hasShownMobileIntro]);

    return (
        <section
            id="hero"
            className="relative min-h-svh w-full overflow-hidden pt-16 md:pt-20"
        >
            <div className="absolute inset-0 z-0 bg-esn-dark-blue">
                {CITY_DATA.map((city, index) => (
                    <Image
                        key={city.slug}
                        src={`${BASE_URL}/${city.slug}.jpg`}
                        alt={city.altText}
                        fill
                        priority={index === 0}
                        sizes="100vw"
                        className="absolute inset-0 object-cover object-center transition-opacity duration-700"
                        style={{
                            opacity: index === currentIndex ? 1 : 0,
                            zIndex: index === currentIndex ? 1 : 0,
                        }}
                    />
                ))}
            </div>

            <div className="absolute inset-0 z-10 bg-linear-to-b from-black/60 via-black/40 to-black/70" />

            <div className="relative z-20 flex flex-col items-center justify-center min-h-[calc(100svh-4rem)] md:min-h-[calc(100svh-5rem)] container-responsive text-center">
                <div
                    className={`max-w-7xl mx-auto w-full transition-opacity duration-500 ${shouldShowHeroText ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                    aria-hidden={!shouldShowHeroText}
                >
                    <h1
                        className="font-oswald font-bold text-white mb-6 tracking-tight max-w-5xl mx-auto"
                        style={{
                            fontSize: "clamp(2rem, 8vw, 4rem)",
                            lineHeight: "clamp(1.2, 1.1, 1.1)",
                        }}
                    >
                        Discover Türkiye with ESN GO
                    </h1>

                    <p
                        className="text-white/90 font-lato mb-8 max-w-2xl mx-auto px-4"
                        style={{
                            fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
                            lineHeight: "1.6",
                        }}
                    >
                        Plan your Erasmus journey across Türkiye with curated
                        destinations, events and student tips from ESN
                        volunteers.
                    </p>
                </div>
            </div>

            <div className="absolute bottom-6 left-0 right-0 z-20 px-4 flex flex-col items-start gap-3">
                <div className="flex gap-1.5">
                    {CITY_DATA.map((city, index) => (
                        <div
                            key={city.slug}
                            className="w-10 h-1.5 sm:w-12 sm:h-2 rounded-full bg-white/20 overflow-hidden shrink-0"
                        >
                            {index < currentIndex ? (
                                <div className="h-full w-full bg-white rounded-full" />
                            ) : index === currentIndex ? (
                                <div
                                    className={`h-full w-0 bg-white rounded-full origin-left ${styles.progressBarFill}`}
                                    style={{
                                        animationDuration: `${SLIDE_DURATION_MS}ms`,
                                    }}
                                />
                            ) : null}
                        </div>
                    ))}
                </div>
            </div>

            {isMobile && showMobileMap ? (
                <div
                    key={activeSlug}
                    className={`absolute inset-0 z-20 flex items-center justify-center px-6 ${styles.mobileMapFade}`}
                >
                    <div className="relative w-[48vw] min-w-[150px] max-w-[210px]">
                        <div className={styles.mapLabel}>
                            <span className={styles.mapLabelText}>{activeLabel}</span>
                            <span
                                className={styles.mapLabelArrow}
                                aria-hidden="true"
                            />
                        </div>
                        <svg
                            viewBox="0 0 280 140"
                            className="pointer-events-none w-full h-auto"
                            aria-hidden="true"
                        >
                            <path
                                d={TURKEY_PATH}
                                fill="none"
                                stroke="#dbeafe"
                                strokeWidth={3.5}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />

                            {CITY_DATA.map((city) => {
                                const isActive = city.slug === activeSlug;
                                if (!isActive) return null;
                                return (
                                    <g key={city.slug}>
                                        <circle
                                            cx={city.coordinates.cx}
                                            cy={city.coordinates.cy}
                                            r={6.5}
                                            className={styles.activePinRipple}
                                        />
                                        <circle
                                            cx={city.coordinates.cx}
                                            cy={city.coordinates.cy}
                                            r={6.5}
                                            className={styles.activePin}
                                        />
                                    </g>
                                );
                            })}
                        </svg>
                    </div>
                </div>
            ) : null}

            <div className="hidden md:block absolute bottom-16 right-6 z-20 w-[220px]">
                <div className="relative">
                    <div className={styles.mapLabel}>
                        <span className={styles.mapLabelText}>{activeLabel}</span>
                        <span className={styles.mapLabelArrow} aria-hidden="true" />
                    </div>
                    <svg
                        viewBox="0 0 280 140"
                        className="pointer-events-none w-full h-auto"
                        aria-hidden="true"
                    >
                        <path
                            d={TURKEY_PATH}
                            fill="none"
                            stroke="#dbeafe"
                            strokeWidth={3.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />

                        {CITY_DATA.map((city) => {
                            const isActive = city.slug === activeSlug;
                            if (!isActive) return null;
                            return (
                                <g key={city.slug}>
                                    {isActive && (
                                        <circle
                                            cx={city.coordinates.cx}
                                            cy={city.coordinates.cy}
                                            r={6.5}
                                            className={styles.activePinRipple}
                                        />
                                    )}
                                    <circle
                                        cx={city.coordinates.cx}
                                        cy={city.coordinates.cy}
                                        r={6.5}
                                        className={styles.activePin}
                                    />
                                </g>
                            );
                        })}

                    </svg>
                </div>
            </div>
        </section>
    );
}
