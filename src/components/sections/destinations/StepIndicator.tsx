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
    className = '',
}: StepIndicatorProps) => {
    return (
        <div className={`flex justify-center gap-2 ${className}`}>
            {Array.from({ length: totalSteps }).map((_, index) => (
                <button
                    key={index}
                    onClick={() => onStepClick(index)}
                    aria-label={`Go to step ${index + 1}`}
                    className={`
                        h-2 rounded-full transition-all duration-300
                        ${index === currentStep
                            ? 'bg-[#00AEEF] w-8'
                            : 'bg-gray-300 hover:bg-gray-400 w-2'
                        }
                    `}
                />
            ))}
        </div>
    );
};