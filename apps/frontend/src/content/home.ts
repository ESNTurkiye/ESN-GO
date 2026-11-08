/**
 * Home page copy and photos. Content (not developers) owns this file.
 * Photos: real, taken by ESNers; no stock or AI images (standard: Fotoğraf ve ikonlar).
 */

export type Photo = {
  /** Path under public/, e.g. "/images/home/hero.webp". Longest side 2000 px, WebP. */
  src: string;
  /** What the photo shows, for screen readers. */
  alt: string;
  /** Shown as "Photo: <name>, <section>"; left out while the photographer is unknown. */
  credit?: { name: string; section: string };
  /** CSS object-position when the subject is not in the centre, e.g. "50% 30%". */
  focus?: string;
};

export type HeroContent = {
  title: string;
  lead: string;
  action: { label: string; href: string };
  /** null until a real ESNer photo is added: the hero then uses the brand colour. */
  photo: Photo | null;
};

export const HERO: HeroContent = {
  title: "Explore Türkiye with local ESNers",
  lead: "Places to eat, drink and see, picked by ESN volunteers who live in each city.",
  action: { label: "Explore places", href: "/explore" },
  // From esn-assets (apps/esn-go/destinations/kapadokya.jpg), cropped 4:3. Photographer: ask Hakkı, then add credit.
  photo: {
    src: "/images/home/hero.webp",
    alt: "A hand held up to the sunrise as hot-air balloons float over Cappadocia",
    focus: "50% 60%",
  },
};

export type EsnerContent = {
  title: string;
  body: string;
  /** What is shown publicly about the ESNer (trust). */
  privacy: string[];
  action: { label: string; href: string };
  /** Under the button while logged out: login comes first. */
  loginHint: string;
  /** null until a real photo of ESNers is added: the band is text only. */
  photo: Photo | null;
};

/** "Are you an ESNer?" (wireframe H6). */
export const ESNER: EsnerContent = {
  title: "Are you an ESNer?",
  body: "ESNers are volunteers of the Erasmus Student Network. Share the places you love in your city and help the next exchange students find them.",
  privacy: [
    "Your name and section are shown on places you add.",
    "Your email is never public.",
  ],
  action: { label: "Add a place", href: "/places/new" },
  loginHint: "Log in with your ESN account first.",
  photo: null,
  // photo: {
  //   src: "/images/home/esners.webp",
  //   alt: "ESNers from ESN Marmara at a welcome event",
  //   credit: { name: "Name Surname", section: "ESN Marmara" },
  // },
};
