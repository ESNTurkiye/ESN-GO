'use client';

import WaveTransition from './WaveTransition';

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