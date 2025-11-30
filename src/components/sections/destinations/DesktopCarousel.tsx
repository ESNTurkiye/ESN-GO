import { Destination } from './types';
import { DestinationCard } from './DestinationCard';
import { NavigationButton } from './NavigationButton';
import { StepIndicator } from './StepIndicator';
import { getDesktopTranslate, isPartialCard } from './utils';

interface DesktopCarouselProps {
    destinations: Destination[];
    currentStep: number;
    totalSteps: number;
    onPrev: () => void;
    onNext: () => void;
    onStepClick: (step: number) => void;
}

export const DesktopCarousel = ({
    destinations,
    currentStep,
    totalSteps,
    onPrev,
    onNext,
    onStepClick,
}: DesktopCarouselProps) => {
    return (
        <>
            {/* Header with Navigation Controls */}
            <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                <div>
                    <h2 className="text-4xl md:text-5xl font-oswald font-bold text-esn-dark-blue mb-4 uppercase">
                        Top Destinations
                    </h2>
                    <p className="text-xl text-gray-600 font-lato">
                        Discover Turkish cities loved by the Erasmus Generation
                    </p>
                </div>

                {/* Desktop Navigation Buttons - Top Right Position */}
                <div className="hidden md:flex gap-3 md:self-end">
                    <NavigationButton
                        direction="left"
                        onClick={onPrev}
                        disabled={currentStep === 0}
                    />
                    <NavigationButton
                        direction="right"
                        onClick={onNext}
                        disabled={currentStep === totalSteps - 1}
                    />
                </div>
            </div>

            {/* Desktop Carousel - 3-Step Pagination */}
            <div className="hidden md:block relative">
                <div className="overflow-hidden">
                    <div
                        className="flex gap-6 transition-transform duration-500 ease-in-out"
                        style={{ transform: getDesktopTranslate(currentStep) }}
                    >
                        {destinations.map((dest, index) => (
                            <DestinationCard
                                key={dest.id}
                                destination={dest}
                                isPartial={isPartialCard(currentStep, index)}
                                width="w-[26%]"
                                sizes="(max-width: 768px) 85vw, 26vw"
                                priority={index < 3}
                            />
                        ))}
                    </div>
                </div>

                {/* Desktop Step Indicators */}
                <StepIndicator
                    totalSteps={totalSteps}
                    currentStep={currentStep}
                    onStepClick={onStepClick}
                    className="mt-8"
                />
            </div>
        </>
    );
};