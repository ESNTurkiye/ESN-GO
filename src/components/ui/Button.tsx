import Link from 'next/link';
import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'cyan' | 'magenta' | 'orange' | 'green' | 'ghost' | 'icon';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    href?: string;
    children: ReactNode;
    className?: string;
}

export default function Button({
    variant = 'cyan',
    size = 'md',
    fullWidth = false,
    href,
    children,
    className = '',
    ...props
}: ButtonProps) {
    const baseStyles = 'rounded-lg transition-all inline-flex items-center justify-center';
    const textStyles = variant !== 'icon' ? 'font-oswald font-bold uppercase tracking-wide' : '';

    const variantStyles = {
        cyan: 'bg-esn-cyan text-esn-white hover:-translate-y-1 hover:shadow-xl shadow-esn-cyan/20',
        magenta: 'bg-esn-magenta text-esn-white hover:-translate-y-1 hover:shadow-xl shadow-esn-magenta/20',
        orange: 'bg-esn-orange text-esn-white hover:-translate-y-1 hover:shadow-xl shadow-esn-orange/20',
        green: 'bg-esn-green text-esn-white hover:-translate-y-1 hover:shadow-xl shadow-esn-green/20',
        ghost: 'text-esn-dark-blue hover:text-esn-cyan hover:-translate-y-0.5',
        icon: 'hover:scale-110 duration-500',
    };

    const sizeStyles = {
        sm: variant === 'icon' ? 'p-2' : 'px-6 py-2.5 text-sm',
        md: variant === 'icon' ? 'p-2.5' : 'px-8 py-3 text-base',
        lg: variant === 'icon' ? 'p-3' : 'px-10 py-4 text-lg',
    };

    const combinedClassName = `
    ${baseStyles}
    ${textStyles}
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');

    if (href) {
        return (
            <Link href={href} className={combinedClassName}>
                {children}
            </Link>
        );
    }

    return (
        <button className={combinedClassName} {...props}>
            {children}
        </button>
    );
}