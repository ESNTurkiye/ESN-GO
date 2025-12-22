import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavigationButtonProps {
    direction: 'left' | 'right';
    onClick: () => void;
    disabled: boolean;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-14 h-14',
};

const iconSizes = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-7 h-7',
};

export const NavigationButton = ({
    direction,
    onClick,
    disabled,
    size = 'md',
    className = '',
}: NavigationButtonProps) => {
    const Icon = direction === 'left' ? ChevronLeft : ChevronRight;
    const ariaLabel = direction === 'left' ? 'Previous' : 'Next';

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            aria-label={ariaLabel}
            className={`
                ${sizeClasses[size]} rounded-full bg-white shadow-lg 
                flex items-center justify-center 
                transition-all duration-300 ease-out
                ${disabled
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-esn-dark-blue hover:bg-esn-cyan hover:text-white hover:shadow-xl active:scale-95'
                }
                ${className}
            `}
        >
            <Icon className={iconSizes[size]} />
        </button>
    );
};