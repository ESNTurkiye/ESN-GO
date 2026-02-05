'use client';

import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import DestinationsSection from "@/components/sections/DestinationsSection";
import VibeSelectorSection from "@/components/sections/VibeSelectorSection";
import FoodSection from "@/components/sections/FoodSection";
import EventsSection from "@/components/sections/EventsSection";
import TransportSection from "@/components/sections/TransportSection";
import FAQSection from "@/components/sections/FAQSection";
import InstagramSection from "@/components/sections/InstagramSection";
import CTASection from "@/components/sections/CTASection";
import VibeToFoodWave from "@/components/ui/VibeToFoodWave";
import FAQToCTAWave from "@/components/ui/FAQToCTAWave";

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
