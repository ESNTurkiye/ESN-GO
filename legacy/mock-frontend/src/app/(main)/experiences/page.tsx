import { Suspense } from "react";
import ExperiencesSection from "@/components/sections/experiences/ExperiencesSection";
import ExperiencesSectionFallback from "@/components/sections/experiences/ExperiencesSectionFallback";

export default function ExperiencesPage() {
    return (
        <main className="relative bg-white">
            <div className="relative z-10">
                <Suspense fallback={<ExperiencesSectionFallback />}>
                    <ExperiencesSection />
                </Suspense>
            </div>
        </main>
    );
}
