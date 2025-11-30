import Link from 'next/link';
import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button visual variant - ESN Brand Colors */
  variant?: 'cyan' | 'magenta' | 'orange' | 'green' | 'ghost' | 'icon';
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Make button full width */
  fullWidth?: boolean;
  /** Render as Link component */
  href?: string;
  /** Button content */
  children: ReactNode;
  /** Additional CSS classes */
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
  // Base styles - ESN Manual: High energy, rectangular or slightly rounded
  const baseStyles = 'rounded-lg transition-all inline-flex items-center justify-center';
  // ESN Manual Page 10: Kelson Sans (fallback: Oswald) - Uppercase, Bold for buttons
  const textStyles = variant !== 'icon' ? 'font-oswald font-bold uppercase tracking-wide' : '';
  
  // ESN Manual: Use ESN brand colors (magenta, cyan, orange, green) with White text
  // Hover: Slight translate movement, no color shifting outside official palette
  const variantStyles = {
    cyan: 'bg-esn-cyan text-esn-white hover:-translate-y-1 hover:shadow-xl shadow-esn-cyan/20',
    magenta: 'bg-esn-magenta text-esn-white hover:-translate-y-1 hover:shadow-xl shadow-esn-magenta/20',
    orange: 'bg-esn-orange text-esn-white hover:-translate-y-1 hover:shadow-xl shadow-esn-orange/20',
    green: 'bg-esn-green text-esn-white hover:-translate-y-1 hover:shadow-xl shadow-esn-green/20',
    ghost: 'text-esn-dark-blue hover:text-esn-cyan hover:-translate-y-0.5',
    icon: 'hover:scale-110 duration-500',
  };
  
  // Size styles
  const sizeStyles = {
    sm: variant === 'icon' ? 'p-2' : 'px-6 py-2.5 text-sm',
    md: variant === 'icon' ? 'p-2.5' : 'px-8 py-3 text-base',
    lg: variant === 'icon' ? 'p-3' : 'px-10 py-4 text-lg',
  };
  
  // Combine all styles
  const combinedClassName = `
    ${baseStyles}
    ${textStyles}
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');
  
  // Render as Link if href is provided
  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        {children}
      </Link>
    );
  }
  
  // Render as button
  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
}