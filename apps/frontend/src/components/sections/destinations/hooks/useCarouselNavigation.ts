import { useState, useCallback } from 'react';

interface UseCarouselNavigationProps {
    totalSteps: number;
}

interface UseCarouselNavigationReturn {
    currentStep: number;
    handlePrev: () => void;
    handleNext: () => void;
    goToStep: (step: number) => void;
}

export const useCarouselNavigation = ({ 
    totalSteps 
}: UseCarouselNavigationProps): UseCarouselNavigationReturn => {
    const [currentStep, setCurrentStep] = useState(0);

    const handlePrev = useCallback(() => {
        setCurrentStep((prev) => Math.max(0, prev - 1));
    }, []);

    const handleNext = useCallback(() => {
        setCurrentStep((prev) => Math.min(totalSteps - 1, prev + 1));
    }, [totalSteps]);

    const goToStep = useCallback((step: number) => {
        setCurrentStep(step);
    }, []);

    return {
        currentStep,
        handlePrev,
        handleNext,
        goToStep,
    };
};