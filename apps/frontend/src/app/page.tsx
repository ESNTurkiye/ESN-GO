import { Destinations } from "@/components/home/Destinations";
import { Hero } from "@/components/home/Hero";
import { HERO } from "@/content/home";

/** "/" (wireframe 00-home). Sections top to bottom: H2 hero, H3 destinations, H4 new places, H5 Erasmus Hacks, H6 ESNer. */
export default function Home() {
  return (
    <>
      <Hero {...HERO} />
      <Destinations />
    </>
  );
}
