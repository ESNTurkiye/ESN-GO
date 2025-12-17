"use client";

import { DestinationsCarouselProps } from './destinations/types';
import { DesktopCarousel } from './destinations/DesktopCarousel';
import { MobileCarousel } from './destinations/MobileCarousel';
import { useCarouselNavigation } from './destinations/hooks/useCarouselNavigation';
// Removed useTouchGesture import from here

export default function DestinationsCarousel({ destinations }: DestinationsCarouselProps) {
    const totalSteps = 3;
    const totalCards = destinations.length;

    const {
        currentStep: desktopStep,
        handlePrev: handleDesktopPrev,
        handleNext: handleDesktopNext,
        goToStep: setDesktopStep,
    } = useCarouselNavigation({ totalSteps });

    const {
        currentStep: mobileIndex,
        handlePrev: handleMobilePrev,
        handleNext: handleMobileNext,
        goToStep: setMobileIndex,
    } = useCarouselNavigation({ totalSteps: totalCards });

    // Touch logic moved inside MobileCarousel component for direct ref access

    return (
        <section id="destinations" className="py-20 bg-gray-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Desktop Carousel */}
                <DesktopCarousel
                    destinations={destinations}
                    currentStep={desktopStep}
                    totalSteps={totalSteps}
                    onPrev={handleDesktopPrev}
                    onNext={handleDesktopNext}
                    onStepClick={setDesktopStep}
                />

                {/* Mobile Carousel */}
                <MobileCarousel
                    destinations={destinations}
                    currentIndex={mobileIndex}
                    onPrev={handleMobilePrev}
                    onNext={handleMobileNext}
                    onIndexClick={setMobileIndex}
                />
            </div>
        </section>
    );
}