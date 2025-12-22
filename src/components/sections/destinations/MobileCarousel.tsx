import { useRef } from 'react';
import { Destination } from './types';
import { DestinationCard } from './DestinationCard';
import { NavigationButton } from './NavigationButton';
import { StepIndicator } from './StepIndicator';
import { getMobileTranslate } from './utils';
import { useTouchGesture } from './hooks/useTouchGesture'; // Import the updated hook

interface MobileCarouselProps {
    destinations: Destination[];
    currentIndex: number;
    onPrev: () => void;
    onNext: () => void;
    onIndexClick: (index: number) => void;
}

export const MobileCarousel = ({
    destinations,
    currentIndex,
    onPrev,
    onNext,
    onIndexClick,
}: MobileCarouselProps) => {
    const totalCards = destinations.length;
    const containerRef = useRef<HTMLDivElement>(null);

    // Initialize the hook with the ref
    useTouchGesture({
        onSwipeLeft: onNext,
        onSwipeRight: onPrev,
        containerRef: containerRef, // Pass the ref
    });

    return (
        <div className="md:hidden relative">
            <div
                ref={containerRef}
                className="overflow-visible w-full touch-pan-y" 
            >
                {/* touch-pan-y is crucial: 
                   It tells the browser "You handle vertical, I'll handle horizontal".
                   Our JS hook then overrides this when strictly swiping X.
                */}
                <div
                    className="flex gap-4 transition-transform duration-500 ease-in-out will-change-transform"
                    style={{ transform: getMobileTranslate(currentIndex) }}
                >
                    {destinations.map((dest, index) => {
                        const isActive = index === currentIndex;
                        return (
                            <DestinationCard
                                key={dest.id}
                                destination={dest}
                                isActive={isActive}
                                width="w-[85vw]"
                                sizes="85vw"
                                priority={index < 3}
                            />
                        );
                    })}
                </div>
            </div>

            {/* Mobile Navigation Buttons - Below Carousel */}
            <div className="flex justify-center gap-3 mt-8">
                <NavigationButton
                    direction="left"
                    onClick={onPrev}
                    disabled={currentIndex === 0}
                    size="lg"
                />
                <NavigationButton
                    direction="right"
                    onClick={onNext}
                    disabled={currentIndex === totalCards - 1}
                    size="lg"
                />
            </div>

            {/* Mobile Dot Indicators */}
            <StepIndicator
                totalSteps={totalCards}
                currentStep={currentIndex}
                onStepClick={onIndexClick}
                className="mt-6"
            />
        </div>
    );
};