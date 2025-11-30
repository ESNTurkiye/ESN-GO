// components/logos/ESNTurkiyeLogo.tsx
'use client';

import { cn } from "@/lib/utils";

interface ESNTurkiyeLogoProps {
  className?: string;
  isScrolled: boolean;
}

export default function ESNTurkiyeLogo({ className, isScrolled }: ESNTurkiyeLogoProps) {
  const textColor = isScrolled ? "#2e3192" : "#FFFFFF"; 
  
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
      className={cn("w-auto h-10 md:h-14 transition-all duration-500 overflow-visible", className)}
      aria-label="ESN GO"
    >
      {/* --- ESN STAR/FLOWER --- */}
      
      {/* 1. OUTER GROUP: Handles Placement Only */}
      {/* We move the 'zero point' to x=35, y=35 on the canvas */}
      <g transform="translate(35, 35)">
        
        {/* 2. INNER GROUP: Handles Rotation */}
        {/* We rotate this group. Since the content inside is drawn around 0,0, 
            it spins perfectly in place. */}
        <g 
          className="transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
          style={{ 
            transform: isScrolled ? 'rotate(45deg)' : 'rotate(0deg)',
            transformBox: 'fill-box',
            transformOrigin: 'center center'
          }}
        >
          {/* Petals are drawn relative to 0,0 (center) */}
          
          {/* North (0°) - Green */}
          <rect x="-4.5" y="-30" width="9" height="23" rx="1.5" fill={colors.green} />
          
          {/* North-East (45°) - Magenta */}
          <rect x="-4.5" y="-30" width="9" height="23" rx="1.5" fill={colors.magenta} transform="rotate(45)" />
          
          {/* East (90°) - Orange */}
          <rect x="-4.5" y="-30" width="9" height="23" rx="1.5" fill={colors.orange} transform="rotate(90)" />
          
          {/* South-East (135°) - Green */}
          <rect x="-4.5" y="-30" width="9" height="23" rx="1.5" fill={colors.green} transform="rotate(135)" />
          
          {/* South (180°) - Cyan */}
          <rect x="-4.5" y="-30" width="9" height="23" rx="1.5" fill={colors.cyan} transform="rotate(180)" />

          {/* South-West (225°) - Cyan */}
          <rect x="-4.5" y="-30" width="9" height="23" rx="1.5" fill={colors.cyan} transform="rotate(225)" />
          
          {/* West (270°) - Orange */}
          <rect x="-4.5" y="-30" width="9" height="23" rx="1.5" fill={colors.orange} transform="rotate(270)" />
          
          {/* North-West (315°) - Cyan */}
          <rect x="-4.5" y="-30" width="9" height="23" rx="1.5" fill={colors.cyan} transform="rotate(315)" />
          
          {/* Center Circle */}
          <circle 
            cx="0" 
            cy="0" 
            r="9" 
            className="transition-colors duration-500"
            fill={isScrolled ? "#FFFFFF" : "transparent"}
          />
        </g>
      </g>

      {/* --- ESN GO TEXT --- */}
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