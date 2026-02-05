'use client';

import WaveTransition from './WaveTransition';

/**
 * Wave Transition: FAQ Section → CTA Section
 * 
 * UX Rationale: High-impact transition. Uses the ESN Magenta to draw attention 
 * downward. The rising wave shape psychologically pushes the user toward the 
 * 'Create Free Account' button.
 * 
 * Responsive Strategy:
 * - Mobile: Reduced height (clamp) prevents excessive space on small screens
 * - Desktop: Full dramatic effect with larger amplitude
 * - Uses asymmetric rise for psychological funneling effect
 */
export default function FAQToCTAWave() {
  return (
    <WaveTransition
      type="asymmetric_rise"
      position="top"
      fillColor="#EC008C"
      height="clamp(50px, 8vw, 80px)"
      amplitude="clamp(25px, 4vw, 40px)"
      complexity={1}
      negativeSpaceColor="#F9FAFB"
      lowerGradient="linear-gradient(135deg, #EC008C 0%, #AE2573 50%, #2E3192 100%)"
      animationSpeed="6s"
    />
  );
}