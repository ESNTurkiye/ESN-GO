'use client';

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import DestinationsSection from "@/components/sections/DestinationsSection";

const VibeSelectorSection = dynamic(() => import("@/components/sections/VibeSelectorSection"), {
  loading: () => <div className="min-h-[400px] bg-white" />,
});
const FoodSection = dynamic(() => import("@/components/sections/FoodSection"), {
  loading: () => <div className="min-h-[400px] bg-[#00D1A7]" />,
});
const StudentTipsSection = dynamic(() => import("@/components/sections/StudentTipsSection"), {
  loading: () => <div className="min-h-[400px] bg-white" />,
});
const EventsSection = dynamic(() => import("@/components/sections/EventsSection"), {
  loading: () => <div className="min-h-[400px] bg-white" />,
});
const TransportSection = dynamic(() => import("@/components/sections/TransportSection"), {
  loading: () => <div className="min-h-[400px] bg-white" />,
});
const FAQSection = dynamic(() => import("@/components/sections/FAQSection"), {
  loading: () => <div className="min-h-[400px] bg-gray-50" />,
});
const InstagramSection = dynamic(() => import("@/components/sections/InstagramSection"), {
  loading: () => <div className="min-h-[400px] bg-white" />,
});
const CTASection = dynamic(() => import("@/components/sections/CTASection"), {
  loading: () => <div className="min-h-[400px] bg-linear-to-br from-[#00D1A7] via-[#EC008C] to-[#F47B20]" />,
});
const VibeToFoodWave = dynamic(() => import("@/components/ui/VibeToFoodWave"), {
  loading: () => <div className="h-24" />,
});
const FAQToCTAWave = dynamic(() => import("@/components/ui/FAQToCTAWave"), {
  loading: () => <div className="h-24" />,
});
const CTAToFooterWave = dynamic(() => import("@/components/ui/CTAToFooterWave"), {
  loading: () => <div className="h-24" />,
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
    <div className="min-h-screen bg-white">
      <Header scrolled={scrolled} />
      <HeroSection />
      <DestinationsSection />
      <VibeSelectorSection />
      <VibeToFoodWave />
      <FoodSection />
      <StudentTipsSection />
      <EventsSection />
      <TransportSection />
      <FAQSection />
      <InstagramSection />
      <FAQToCTAWave />
      <CTASection />
      {/* <CTAToFooterWave /> */}
      <Footer />
    </div>
  );
}
