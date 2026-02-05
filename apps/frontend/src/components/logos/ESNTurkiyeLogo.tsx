// components/logos/ESNTurkiyeLogo.tsx
'use client';

import { cn } from "@/lib/utils";

interface ESNTurkiyeLogoProps {
  className?: string;
  isScrolled: boolean;
  isMobile?: boolean;
}

export default function ESNTurkiyeLogo({ className, isScrolled, isMobile = false }: ESNTurkiyeLogoProps) {
  const textColor = "#ffffff";
  
  const colors = {
    cyan: "#00AEEF",
    magenta: "#EC008C",
    green: "#7AC143",
    orange: "#F47B20",
  };

  return (
    <svg
      viewBox="0 0 240 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "w-auto overflow-visible",
        isMobile ? "h-8" : (isScrolled ? "h-12 transition-all duration-700" : "h-14 transition-all duration-700"),
        className
      )}
      aria-label="ESN GO"
    >
      <g transform="translate(35, 35)">
        <g 
          className={isMobile ? "" : "transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"}
          style={{ 
            transform: !isMobile && isScrolled ? 'rotate(45deg)' : 'rotate(0deg)',
            transformBox: 'fill-box',
            transformOrigin: 'center center'
          }}
        >
          <rect x="-4.5" y="-30" width="9" height="23" rx="1.5" fill={colors.green} />
          
          <rect x="-4.5" y="-30" width="9" height="23" rx="1.5" fill={colors.magenta} transform="rotate(45)" />
          
          <rect x="-4.5" y="-30" width="9" height="23" rx="1.5" fill={colors.orange} transform="rotate(90)" />
          
          <rect x="-4.5" y="-30" width="9" height="23" rx="1.5" fill={colors.green} transform="rotate(135)" />
          
          <rect x="-4.5" y="-30" width="9" height="23" rx="1.5" fill={colors.cyan} transform="rotate(180)" />

          <rect x="-4.5" y="-30" width="9" height="23" rx="1.5" fill={colors.cyan} transform="rotate(225)" />
          
          <rect x="-4.5" y="-30" width="9" height="23" rx="1.5" fill={colors.orange} transform="rotate(270)" />
          
          <rect x="-4.5" y="-30" width="9" height="23" rx="1.5" fill={colors.cyan} transform="rotate(315)" />
          
          <circle 
            cx="0" 
            cy="0" 
            r="9" 
            className="transition-colors duration-700"
            fill="#2e3192"
          />
        </g>
      </g>

      <text 
        x="78" 
        y="35" 
        fontFamily="'Lato', Oswald, 'Helvetica Neue', Helvetica, Arial, sans-serif" 
        fontSize="40" 
        fontWeight="900" 
        className="transition-colors duration-500"
        fill={textColor}
        letterSpacing="0"
        dominantBaseline="middle"
      >
        ESN GO
      </text>
    </svg>
  );
}