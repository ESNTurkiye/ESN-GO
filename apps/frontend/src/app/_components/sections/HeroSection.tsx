"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "../ui/Button";
import styles from "./HeroSection.module.css";

/** Anadolu (asya yakası + iç kesimleri) – saat yönünde */
const ANATOLIA_PATH =
    "M 186.0,94.3 L 209.7,76.6 L 238.1,76.6 L 280.8,69.5 " +
    "L 318.8,55.4 L 342.5,34.2 L 394.6,27.1 L 442.1,37.7 " +
    "L 494.2,30.6 L 532.2,30.6 L 565.4,55.4 L 603.3,108.5 " +
    "L 636.5,122.6 L 731.3,101.4 L 778.8,69.5 L 781.1,66.0 " +
    "L 842.8,94.3 L 876.0,129.7 L 906.8,168.6 L 932.9,196.9 " +
    "L 935.3,214.6 L 921.0,257.1 L 932.9,296.0 " +
    "L 911.5,370.3 L 854.6,380.9 L 821.4,377.4 L 790.6,363.2 " +
    "L 764.5,380.9 L 750.3,402.2 L 717.1,384.5 L 679.2,384.5 " +
    "L 650.7,377.4 L 624.6,384.5 L 600.9,395.1 L 570.1,405.7 " +
    "L 548.8,419.8 L 534.5,444.6 L 522.7,444.6 L 510.8,423.4 " +
    "L 496.6,409.2 L 470.5,412.8 L 442.1,423.4 L 408.9,437.5 " +
    "L 370.9,423.4 L 328.2,423.4 L 259.5,398.6 L 231.0,419.8 " +
    "L 216.8,416.3 L 164.6,359.7 L 131.4,388.0 L 105.4,388.0 " +
    "L 100.6,324.3 L 86.4,299.5 L 91.1,278.3 L 84.0,264.2 " +
    "L 76.9,242.9 L 72.2,221.7 L 60.3,207.5 L 50.8,193.4 " +
    "L 65.1,161.5 L 50.8,136.8 " +
    "L 62.7,119.1 L 91.1,101.4 L 117.2,97.8 L 136.2,97.8 " +
    "L 162.3,94.3 L 183.6,101.4 L 190.7,101.4 L 190.7,94.3 Z";

/** Trakya (Avrupa yakası) – saat yönünde */
const TRAKYA_PATH =
    "M 186.0,87.2 L 178.9,80.2 L 155.2,80.2 L 136.2,80.2 " +
    "L 117.2,37.7 L 103.0,30.6 L 86.4,30.6 L 72.2,37.7 " +
    "L 57.9,44.8 L 48.5,55.4 L 48.5,76.6 L 57.9,97.8 " +
    "L 76.9,112.0 L 91.1,108.5 L 117.2,97.8 L 138.6,97.8 " +
    "L 162.3,94.3 L 183.6,101.4 L 186.0,87.2 Z";

const HERO_IMAGES = [
    {
        slug: "istanbul",
        label: "Istanbul",
        location: { city: "Istanbul", x: 186, y: 105 },
    },
    {
        slug: "ankara",
        label: "Ankara",
        location: { city: "Ankara", x: 369, y: 183 },
    },
    {
        slug: "kapadokya",
        label: "Kapadokya",
        location: { city: "Kapadokya", x: 463, y: 268 },
    },
    {
        slug: "izmir",
        label: "Izmir",
        location: { city: "İzmir", x: 96, y: 289 },
    },
    {
        slug: "denizli",
        label: "Denizli",
        location: { city: "Denizli", x: 191, y: 334 },
    },
] as const;

const BASE_URL = "https://esnturkiye.github.io/esn-assets/images/destinations";
const SLIDE_DURATION_MS = 5000;

const MAP_FILL = "rgba(255,255,255,0.08)";
const MAP_STROKE = "rgba(255,255,255,0.55)";
const MAP_STROKE_WIDTH = 5;

export default function HeroSection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const activeImage = HERO_IMAGES[currentIndex];

    useEffect(() => {
        const id = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
        }, SLIDE_DURATION_MS);
        return () => clearInterval(id);
    }, []);

    return (
        <section
            id="hero"
            className="relative min-h-dvh w-full overflow-hidden pt-16 md:pt-20"
        >
            {/* ── Arka plan fotoğrafları ── */}
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
                        style={{
                            opacity: index === currentIndex ? 1 : 0,
                            zIndex: index === currentIndex ? 1 : 0,
                        }}
                    />
                ))}
            </div>

            {/* ── Gradient overlay ── */}
            <div className="absolute inset-0 z-10 bg-linear-to-b from-black/60 via-black/40 to-black/70" />

            {/* ── Ana içerik ── */}
            <div className="relative z-20 flex flex-col items-center justify-center min-h-[calc(100dvh-4rem)] md:min-h-[calc(100dvh-5rem)] container-responsive text-center">
                <div className="max-w-7xl mx-auto w-full">
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
                        destinations, events, and student tips from ESN
                        volunteers.
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
                        <Link
                            href="/#"
                            className="w-full sm:w-auto min-h-[48px]"
                        >
                            <Button
                                size="lg"
                                variant="cyan"
                                aria-label="Explore Turkish cities"
                            >
                                Explore cities
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* ── Türkiye haritası (kart yok, doğrudan overlay) ── */}
            <div className="absolute z-20 bottom-12 right-3 w-[230px] sm:bottom-10 sm:right-5 sm:w-[290px] md:bottom-10 md:right-8 md:w-[380px]">
                {/* Aktif şehir etiketi */}
                <p className="text-right font-oswald tracking-[0.18em] text-xs sm:text-sm uppercase text-white/90 drop-shadow mb-0.5 transition-all duration-300">
                    {activeImage.location.city}
                </p>

                <svg
                    viewBox="0 0 960 500"
                    className="w-full h-auto"
                    role="img"
                    aria-label="Aktif destinasyonun Türkiye haritasındaki konumu"
                >
                    {/* Anadolu */}
                    <path
                        d={ANATOLIA_PATH}
                        fill={MAP_FILL}
                        stroke={MAP_STROKE}
                        strokeWidth={MAP_STROKE_WIDTH}
                        strokeLinejoin="round"
                        strokeLinecap="round"
                    />
                    {/* Trakya */}
                    <path
                        d={TRAKYA_PATH}
                        fill={MAP_FILL}
                        stroke={MAP_STROKE}
                        strokeWidth={MAP_STROKE_WIDTH}
                        strokeLinejoin="round"
                        strokeLinecap="round"
                    />

                    {/* Pasif şehir noktaları */}
                    {HERO_IMAGES.map((image, index) =>
                        index !== currentIndex ? (
                            <circle
                                key={image.slug}
                                cx={image.location.x}
                                cy={image.location.y}
                                r={4}
                                fill="rgba(255,255,255,0.50)"
                            />
                        ) : null,
                    )}

                    {/* Aktif şehir pin + ping animasyonu */}
                    <g
                        transform={`translate(${activeImage.location.x} ${activeImage.location.y})`}
                    >
                        <circle
                            r={14}
                            className="fill-magenta-500/30 animate-ping"
                        />
                        <circle r={8} className="fill-magenta-500" />
                        <circle r={3} className="fill-white" />
                    </g>
                </svg>
            </div>

            {/* ── Slide progress indicator ── */}
            <div className="absolute bottom-5 left-0 right-0 z-20 px-4 flex items-start">
                <div className="flex gap-1.5">
                    {HERO_IMAGES.map((image, index) => (
                        <div
                            key={image.slug}
                            className="w-10 h-1.5 sm:w-12 sm:h-2 rounded-full bg-white/20 overflow-hidden shrink-0"
                        >
                            {index < currentIndex ? (
                                <div className="h-full w-full bg-white rounded-full" />
                            ) : index === currentIndex ? (
                                <div
                                    className={`h-full w-0 bg-white rounded-full origin-left ${styles.progressBarFill}`}
                                />
                            ) : null}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
