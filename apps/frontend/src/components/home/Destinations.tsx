import Link from "next/link";
import { CityCard } from "@/components/city-card/CityCard";
import { Icon } from "@/components/ui/Icon";
import { getCities } from "@/lib/api";
import styles from "./Destinations.module.scss";

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
    <section className={styles.section} aria-labelledby="destinations-title">
      <div className={`container ${styles.grid}`}>
        <h2 id="destinations-title" className={styles.title}>
          Pick a destination
        </h2>

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

        <Link href="/destinations" className={styles.more}>
          All destinations
          <Icon name="chevron-forward-outline" size={20} />
        </Link>
      </div>
    </section>
  );
}
