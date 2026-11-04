import { CityCard } from "@/components/city-card/CityCard";
import { getCities } from "@/lib/api";
import styles from "./Destinations.module.scss";
import { HomeSection } from "./HomeSection";

/** How many destinations the home page shows; the rest are on /destinations. */
const LIMIT = 3;

/**
 * Pick a destination (wireframe H3, MySwitzerland "Top Destinations").
 * Desktop: cards side by side. Mobile: horizontal scroll, the next card always peeks in.
 * Data: GET /cities. Not rendered while there are no destinations.
 */
export async function Destinations() {
  const cities = (await getCities()).slice(0, LIMIT);
  if (cities.length === 0) return null;

  return (
    <HomeSection
      id="destinations"
      title="Pick a destination"
      more={{ href: "/destinations", label: "All destinations" }}
    >
      <ul className={styles.list}>
        {cities.map((city) => (
          <li key={city.cityId} className={styles.item}>
            <CityCard
              city={city}
              sizes="(min-width: 80rem) 400px, (min-width: 48rem) 33vw, 75vw"
            />
          </li>
        ))}
      </ul>
    </HomeSection>
  );
}
