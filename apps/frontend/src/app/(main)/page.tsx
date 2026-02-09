// apps/frontend/src/app/(main)/page.tsx

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import DestinationsSection from "@/components/sections/DestinationsSection";                    // team 2
import DestinationsSectionSkeleton from "@/components/sections/DestinationsSectionSkeleton";    // team 2
import FAQSection from "@/components/sections/FAQSection";                                      // team 4
import FoodSection from "@/components/sections/FoodSection";                                    // team 3
import HeroSection from "@/components/sections/HeroSection";                                    // team 1
import VibeSelectorSection from "@/components/sections/VibeSelectorSection";                    // team 3

import EventsSection from "@/components/sections/EventsSection";
import InstagramSection from "@/components/sections/InstagramSection";
import InstagramToFooterWave from "@/components/ui/InstagramToFooterWave";
import { Suspense } from "react";

export default function Home() {
    return (
        <>
            <Header />
            <div id="main-content" role="main" className="min-h-screen bg-white">
                <HeroSection />                                         {/* Team 1 */}
                <Suspense fallback={<DestinationsSectionSkeleton />}>
                    <DestinationsSection />
                </Suspense>                                             {/* Team 2 */}
                <VibeSelectorSection />                                 {/* Team 3 */}
                <FoodSection />                                         {/* Team 3 */}
                <EventsSection />
                <FAQSection />                                          {/* Team 4 */}
                <InstagramSection />
                <InstagramToFooterWave />
            </div>
            <Footer />
        </>
    );
}
