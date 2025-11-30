'use client';

interface WaveTransitionProps {
  type: 'sine_wave' | 'asymmetric_rise' | 'gentle_settle';
  position: 'top' | 'bottom';
  fillColor: string;
  height?: string;
  amplitude?: string;
  complexity?: number;
  upperGradient?: string;
  lowerGradient?: string;
  upperHex?: string;
  lowerHex?: string;
  negativeSpaceColor?: string;
  opacity?: number;
  animationSpeed?: string;
}

export default function WaveTransition({
  type,
  position,
  fillColor,
  height = '60px',
  amplitude = '30px',
  complexity = 3,
  upperGradient,
  lowerGradient,
  upperHex,
  lowerHex,
  negativeSpaceColor,
  opacity = 1,
  animationSpeed = '6s'
}: WaveTransitionProps) {
  
  const getWavePath = () => {
    const baseHeight = 100;
    const width = 1440;
    
    switch (type) {
      case 'sine_wave':
        // Smooth flowing sine wave - mimics Bosphorus waters
        const wavePoints = [];
        const segments = 50;
        for (let i = 0; i <= segments; i++) {
          const x = (width / segments) * i;
          const phase = (i / segments) * Math.PI * 2 * complexity;
          const y = baseHeight / 2 + Math.sin(phase) * (baseHeight / 3);
          wavePoints.push(`${i === 0 ? 'M' : 'L'} ${x},${y}`);
        }
        return `${wavePoints.join(' ')} L ${width},${baseHeight} L 0,${baseHeight} Z`;
        
      case 'asymmetric_rise':
        // Rising wave that pushes attention downward - dynamic energy
        return `M 0,${baseHeight * 0.7} 
                C ${width * 0.15},${baseHeight * 0.2} ${width * 0.3},${baseHeight * 0.5} ${width * 0.45},${baseHeight * 0.35}
                C ${width * 0.6},${baseHeight * 0.2} ${width * 0.75},${baseHeight * 0.6} ${width},${baseHeight * 0.4}
                L ${width},0 L 0,0 Z`;
        
      case 'gentle_settle':
        // Multi-layered gentle waves - calming descent
        return `M 0,${baseHeight * 0.4} 
                C ${width * 0.2},${baseHeight * 0.2} ${width * 0.3},${baseHeight * 0.6} ${width * 0.5},${baseHeight * 0.45}
                C ${width * 0.7},${baseHeight * 0.3} ${width * 0.8},${baseHeight * 0.55} ${width},${baseHeight * 0.35}
                L ${width},${baseHeight} L 0,${baseHeight} Z`;
        
      default:
        return '';
    }
  };

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    height,
    overflow: 'visible',
    pointerEvents: 'none',
  };

  return (
    <div 
      style={containerStyle}
      className={position === 'top' ? '-mb-px' : '-mt-px'}
    >
      {/* Background gradient layer */}
      {(upperGradient || upperHex) && position === 'top' && (
        <div 
          className="absolute inset-0 w-full" 
          style={{ 
            background: upperGradient || upperHex,
            zIndex: 0,
            height: '200%',
            top: '-100%'
          }}
        />
      )}
      {(lowerGradient || lowerHex) && position === 'bottom' && (
        <div 
          className="absolute inset-0 w-full" 
          style={{ 
            background: lowerGradient || lowerHex,
            zIndex: 0,
            height: '200%',
            bottom: '-100%'
          }}
        />
      )}
      
      {/* SVG Wave */}
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="relative block w-full"
        style={{ 
          height,
          zIndex: 1,
          transform: position === 'top' ? 'scaleY(-1)' : 'none',
          display: 'block'
        }}
      >
        <defs>
          <linearGradient id={`wave-gradient-${type}-${position}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={fillColor} stopOpacity={opacity} />
            <stop offset="50%" stopColor={fillColor} stopOpacity={opacity * 0.95} />
            <stop offset="100%" stopColor={fillColor} stopOpacity={opacity} />
          </linearGradient>
        </defs>
        
        <path
          d={getWavePath()}
          fill={`url(#wave-gradient-${type}-${position})`}
          className="wave-animate"
        />
        
        {/* Negative space color overlay if specified */}
        {negativeSpaceColor && (
          <path
            d={getWavePath()}
            fill="none"
            stroke={negativeSpaceColor}
            strokeWidth="1.5"
            strokeOpacity="0.4"
            className="wave-animate"
            style={{
              animationDelay: '1s'
            }}
          />
        )}
      </svg>
    </div>
  );
}