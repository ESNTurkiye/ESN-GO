'use client';

import WaveTransition from './WaveTransition';

/**
 * Wave Transition: CTA Section → Footer
 * 
 * UX Rationale: The final grounding. Transitions from the high-energy 
 * call-to-action into the stable, informative footer containing 'Unity in 
 * Diversity' and data policies. Uses ESN Dark Blue.
 * 
 * Responsive Strategy:
 * - Ensures proper z-index layering (above Footer, below CTA content)
 * - Fluid sizing maintains visual impact on mobile devices
 */
export default function CTAToFooterWave() {
  return (
    <div className="relative -mt-1">
      <WaveTransition
        type="gentle_settle"
        position="bottom"
        fillColor="#2E2E2E"
        height="clamp(40px, 6vw, 60px)"
        amplitude="clamp(20px, 3vw, 30px)"
        complexity={4}
        negativeSpaceColor="transparent"
        upperGradient="linear-gradient(135deg, #EC008C 0%, #AE2573 50%, #2E3192 100%)"
        opacity={1.0}
        animationSpeed="6s"
      />
    </div>
  );
}