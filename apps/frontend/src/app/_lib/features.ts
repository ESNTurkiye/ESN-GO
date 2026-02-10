// Feature flag configuration for main sections.
// See CONTRIBUTING.md §4 "Feature Flags" for the contract.

export const features = {
  heroSection: process.env.NEXT_PUBLIC_FEATURE_HERO === "true",
  heroAnimation: process.env.NEXT_PUBLIC_FEATURE_HERO_ANIMATION === "true",
  destinations: process.env.NEXT_PUBLIC_FEATURE_DESTINATIONS === "true",
  destinationsCarousel: process.env.NEXT_PUBLIC_FEATURE_CAROUSEL === "true",
  vibeFood: process.env.NEXT_PUBLIC_FEATURE_VIBE_FOOD === "true",
  faq: process.env.NEXT_PUBLIC_FEATURE_FAQ === "true",
};

