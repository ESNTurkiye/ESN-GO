import { HTMLAttributes } from 'react';

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  variant?: 'default' | 'text' | 'circular' | 'rectangular';
}

export default function Skeleton({ 
  className = '', 
  variant = 'default',
  ...props 
}: SkeletonProps) {
  const baseStyles = 'animate-pulse bg-gray-200';
  
  const variantStyles = {
    default: 'rounded',
    text: 'rounded h-4',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      aria-hidden="true"
      {...props}
    />
  );
}

