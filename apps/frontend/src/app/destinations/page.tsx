import type { Metadata } from "next";
import Link from "next/link";
import { CityCard } from "@/components/city-card/CityCard";
import { GuideCard } from "@/components/guides/GuideCard";
import { Icon } from "@/components/ui/Icon";
import { getCities, getGuides } from "@/lib/api";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "Destinations",
  description:
    "Pick a destination in Türkiye to see places recommended by local ESNers.",
};

/** The guides for a student's most overwhelmed moment (wireframe 01 note 5). */
const START_GUIDES = ["first-week", "residence-permit", "phone-and-sim"];

/**
 * /destinations (wireframe 01, MySwitzerland destinations): the page's only job is
 * picking a destination, so there is no primary button; the CityCards are the strongest
 * signal. Then a secondary way in to Erasmus Hacks.
 * "ESN across Türkiye" (map of all sections) is post-MVP (decision 2 Nov).
 */
export default async function DestinationsPage() {
  const [cities, guides] = await Promise.all([getCities(), getGuides()]);
  const picked = START_GUIDES.map((id) =>
    guides.find((g) => g.guideId === id),
  ).filter((g) => g !== undefined);
  const startGuides = picked.length > 0 ? picked : guides.slice(0, 3);

  return (
    <div className={`container ${styles.page}`}>
      <header className={styles.head}>
        <h1>Destinations</h1>
        <p className={styles.lead}>
          Pick a destination to see places recommended by local ESNers.
        </p>
      </header>

      {cities.length > 0 ? (
        <ul className={styles.cities}>
          {cities.map((city) => (
            <li key={city.cityId}>
              <CityCard
                city={city}
                className={styles.cityCard}
                sizes="(min-width: 80rem) 400px, (min-width: 48rem) 33vw, 100vw"
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.empty}>
          Destinations are on their way. Check back soon.
        </p>
      )}

      {startGuides.length > 0 && (
        <section aria-labelledby="start-title" className={styles.section}>
          <div className={styles.sectionHead}>
            <div>
              <h2 id="start-title">Not sure where to start?</h2>
              <p className={styles.lead}>
                Short guides for your first weeks in Türkiye.
              </p>
            </div>
            <Link href="/erasmus-hacks" className={styles.more}>
              All Erasmus Hacks
              <Icon name="chevron-forward-outline" size={20} />
            </Link>
          </div>
          <ul className={styles.guides}>
            {startGuides.map((guide) => (
              <li key={guide.guideId}>
                <GuideCard guide={guide} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
