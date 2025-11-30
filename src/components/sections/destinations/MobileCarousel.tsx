import { Destination } from './types';
import { DestinationCard } from './DestinationCard';
import { NavigationButton } from './NavigationButton';
import { StepIndicator } from './StepIndicator';
import { getMobileTranslate } from './utils';

interface MobileCarouselProps {
    destinations: Destination[];
    currentIndex: number;
    onPrev: () => void;
    onNext: () => void;
    onIndexClick: (index: number) => void;
    onTouchStart: (e: React.TouchEvent) => void;
    onTouchMove: (e: React.TouchEvent) => void;
    onTouchEnd: () => void;
}

export const MobileCarousel = ({
    destinations,
    currentIndex,
    onPrev,
    onNext,
    onIndexClick,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
}: MobileCarouselProps) => {
    const totalCards = destinations.length;

    return (
        <div className="md:hidden relative">
            <div
                className="overflow-visible w-full"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                <div
                    className="flex gap-4 transition-transform duration-500 ease-in-out"
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