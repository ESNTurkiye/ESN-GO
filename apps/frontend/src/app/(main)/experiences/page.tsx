import { Suspense } from "react";
import ExperiencesSection from "@/components/sections/experiences/ExperiencesSection";

export default function ExperiencesPage() {
    return (
        <main className="min-h-screen relative bg-white">
            <div className="relative z-10 pb-10">
                <Suspense fallback={null}>
                    <ExperiencesSection />
                </Suspense>
            </div>
        </main>
    );
}
