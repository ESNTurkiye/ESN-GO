'use client';

import WaveTransition from './WaveTransition';

/**
 * Wave Transition: Vibe Selector → Food Section
 * 
 * UX Rationale: Softens the transition from the vibrant 'Istanbul Nightlife' 
 * visuals into the organic 'Anatolian Cuisine' section. The wave mimics the 
 * Bosphorus waters implied by the 'Black Sea Nature' card.
 * 
 * Responsive Strategy:
 * - Desktop: Fixed height (60px) and amplitude (30px)
 * - Mobile: Fluid sizing with clamp() to maintain curvature at all viewports
 */
export default function VibeToFoodWave() {
  return (
    <WaveTransition
      type="sine_wave"
      position="bottom"
      fillColor="#FFF8F0"
      height="clamp(30px, 6vw, 60px)"
      amplitude="clamp(15px, 3vw, 30px)"
      complexity={3}
      upperGradient="linear-gradient(180deg, #FFFFFF 0%, #F5F5F5 100%)"
      lowerHex="#FFF8F0"
      animationSpeed="6s"
    />
  );
}