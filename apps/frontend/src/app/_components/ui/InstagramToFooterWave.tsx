'use client';

import WaveTransition from './WaveTransition';

const FOOTER_BG = '#2E2E2E';

export default function InstagramToFooterWave() {
  return (
    <div className="relative -mt-1">
      <WaveTransition
        type="gentle_settle"
        position="bottom"
        fillColor={FOOTER_BG}
        height="clamp(40px, 6vw, 60px)"
        amplitude="clamp(20px, 3vw, 30px)"
        complexity={4}
        opacity={1}
      />
    </div>
  );
}