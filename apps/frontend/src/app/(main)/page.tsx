// apps/frontend/src/app/(main)/page.tsx

import DestinationsSection from "@/components/sections/DestinationsSection"; // team 2
import DestinationsSectionSkeleton from "@/components/sections/DestinationsSectionSkeleton"; // team 2
import FAQSection from "@/components/sections/FAQSection"; // team 4
import FoodSection from "@/components/sections/FoodSection"; // team 3
import HeroSection from "@/components/sections/HeroSection"; // team 1
import VibeSelectorSection from "@/components/sections/VibeSelectorSection"; // team 3

import EventsSection from "@/components/sections/EventsSection";
import InstagramSection from "@/components/sections/InstagramSection";
import InstagramToFooterWave from "@/components/ui/InstagramToFooterWave";
import { Suspense } from "react";
import { features } from "@/app/_lib/features";

export const dynamic = "force-dynamic";

export default function Home() {
    return (
        <div id="main-content" role="main" className="min-h-screen bg-white">
            {features.heroSection && <HeroSection />} {/* Team 1 */}
            <Suspense fallback={<DestinationsSectionSkeleton />}>
                {features.destinations && <DestinationsSection />}
            </Suspense>{" "}
            {/* Team 2 */}
            {features.vibeFood && (
                <>
                    <VibeSelectorSection /> {/* Team 3 */}
                    <FoodSection /> {/* Team 3 */}
                </>
            )}
            <EventsSection />
            {features.faq && <FAQSection />} {/* Team 4 */}
            <InstagramSection />
            <InstagramToFooterWave />
        </div>
    );
}
