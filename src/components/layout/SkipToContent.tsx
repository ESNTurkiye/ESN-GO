'use client';

export default function SkipToContent() {
  return (
    <a
      href="#main-content"
      style={{ zIndex: 9999 }}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:bg-esn-cyan focus:text-white focus:px-6 focus:py-3 focus:rounded-lg focus:font-oswald focus:font-bold focus:text-lg focus:shadow-xl focus:outline-none focus:ring-4 focus:ring-esn-cyan/50 transition-all"
      aria-label="Skip to main content"
    >
      Skip to main content
    </a>
  );
}

