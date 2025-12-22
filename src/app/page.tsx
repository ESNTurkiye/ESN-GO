'use client';

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";

import DestinationsSectionSkeleton from "@/components/sections/skeletons/DestinationsSectionSkeleton";
import VibeSelectorSkeleton from "@/components/sections/skeletons/VibeSelectorSkeleton";
import FoodSectionSkeleton from "@/components/sections/skeletons/FoodSectionSkeleton";
import GenericSectionSkeleton from "@/components/sections/skeletons/GenericSectionSkeleton";

// Critical above-fold content - SSR enabled
const DestinationsSection = dynamic(() => import("@/components/sections/DestinationsSection"), {
    loading: () => <DestinationsSectionSkeleton />,
});

// Below-fold sections - SSR disabled for faster initial load
const VibeSelectorSection = dynamic(() => import("@/components/sections/VibeSelectorSection"), {
    loading: () => <VibeSelectorSkeleton />,
    ssr: false,
});
const FoodSection = dynamic(() => import("@/components/sections/FoodSection"), {
    loading: () => <FoodSectionSkeleton />,
    ssr: false,
});
const EventsSection = dynamic(() => import("@/components/sections/EventsSection"), {
    loading: () => <GenericSectionSkeleton backgroundColor="bg-white" />,
    ssr: false,
});
const TransportSection = dynamic(() => import("@/components/sections/TransportSection"), {
    loading: () => <GenericSectionSkeleton backgroundColor="bg-white" />,
    ssr: false,
});
const FAQSection = dynamic(() => import("@/components/sections/FAQSection"), {
    loading: () => <GenericSectionSkeleton backgroundColor="bg-gray-50" />,
    ssr: false,
});
const InstagramSection = dynamic(() => import("@/components/sections/InstagramSection"), {
    loading: () => <GenericSectionSkeleton backgroundColor="bg-white" />,
    ssr: false,
});
const CTASection = dynamic(() => import("@/components/sections/CTASection"), {
    loading: () => <GenericSectionSkeleton backgroundColor="bg-gradient-to-br from-[#00D1A7] via-[#EC008C] to-[#F47B20]" />,
    ssr: false,
});

// UI decorations - can be lazy loaded
const VibeToFoodWave = dynamic(() => import("@/components/ui/VibeToFoodWave"), {
    loading: () => <div className="h-24" />,
    ssr: false,
});
const FAQToCTAWave = dynamic(() => import("@/components/ui/FAQToCTAWave"), {
    loading: () => <div className="h-24" />,
    ssr: false,
});

export default function Home() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <Header scrolled={scrolled} />
            <main id="main-content" className="min-h-screen bg-white">
                <HeroSection />
                <DestinationsSection />
                <VibeSelectorSection />
                <VibeToFoodWave />
                <FoodSection />
                <EventsSection />
                <TransportSection />
                <FAQSection />
                <InstagramSection />
                <FAQToCTAWave />
                <CTASection />
            </main>
            <Footer />
        </>
    );
}
