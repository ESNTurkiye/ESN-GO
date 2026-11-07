import { Destinations } from "@/components/home/Destinations";
import { ErasmusHacks } from "@/components/home/ErasmusHacks";
import { EsnerBand } from "@/components/home/EsnerBand";
import { Hero } from "@/components/home/Hero";
import { ESNER, HERO } from "@/content/home";

/** "/" (wireframe 00-home). Sections top to bottom: H2 hero, H3 destinations, H4 new places, H5 Erasmus Hacks, H6 ESNer. */
export default function Home() {
    return (
        <>
            <Hero {...HERO} />
            <Destinations />
            {/* H4 "New from local ESNers" comes here once places are added (GET /places?limit=4). */}
            <ErasmusHacks />
            <EsnerBand {...ESNER} />
        </>
    );
}
