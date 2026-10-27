interface StepIndicatorProps {
    totalSteps: number;
    currentStep: number;
    onStepClick: (step: number) => void;
    className?: string;
}

export const StepIndicator = ({
    totalSteps,
    currentStep,
    onStepClick,
    className = "",
}: StepIndicatorProps) => {
    const steps = Array.from({ length: totalSteps }, (_, step) => step);

    return (
        <div className={`flex justify-center gap-2 ${className}`}>
            {steps.map((step) => (
                <button
                    key={`step-${step}`}
                    type="button"
                    onClick={() => onStepClick(step)}
                    aria-label={`Go to step ${step + 1}`}
                    className={`
                        h-2 rounded-full transition-all duration-300
                        ${
                            step === currentStep
                                ? "bg-[#00AEEF] w-8"
                                : "bg-gray-300 hover:bg-gray-400 w-2"
                        }
                    `}
                />
            ))}
        </div>
    );
};
