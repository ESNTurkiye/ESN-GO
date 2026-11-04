/**
 * Home page copy and photos. Content (not developers) owns this file.
 * Photos: real, taken by ESNers; no stock or AI images (standard: Fotoğraf ve ikonlar).
 */

export type Photo = {
  /** Path under public/, e.g. "/images/home/hero.webp". Longest side 2000 px, WebP. */
  src: string;
  /** What the photo shows, for screen readers. */
  alt: string;
  /** Shown as "Photo: <name>, <section>". */
  credit: { name: string; section: string };
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
  photo: null,
  // photo: {
  //   src: "/images/home/hero.webp",
  //   alt: "Exchange students on a ferry crossing the Bosphorus at sunset",
  //   credit: { name: "Name Surname", section: "ESN Marmara" },
  // },
};
