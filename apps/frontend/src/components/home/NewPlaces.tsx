import { PlaceCard } from "@/components/places/PlaceCard";
import { getCities } from "@/lib/api";
import { getNewestPlaces } from "@/lib/places-server";
import { HomeSection } from "./HomeSection";
import styles from "./NewPlaces.module.scss";

/** How many new places the home page shows; the rest are on /explore. */
const LIMIT = 4;

/**
 * New from local ESNers (wireframe H4): the newest places from all cities, newest first,
 * as PlaceCards with district and city ("Kadıköy, İstanbul"). Desktop: four side by side.
 * Mobile: horizontal scroll, the next card peeks in (same as H3).
 * Data: GET /places?limit=4. Not rendered while there are no places.
 */
export async function NewPlaces() {
  const [places, cities] = await Promise.all([
    getNewestPlaces(LIMIT),
    getCities(),
  ]);
  if (places.length === 0) return null;

  return (
    <HomeSection
      id="new-places"
      title="New from local ESNers"
      lead="Newest first, from all cities."
      more={{ href: "/explore", label: "Explore all places" }}
    >
      <ul className={styles.list}>
        {places.map((place) => (
          <li key={place.placeId} className={styles.item}>
            <PlaceCard
              place={place}
              cities={cities}
              sizes="(min-width: 64rem) 300px, (min-width: 48rem) 45vw, 75vw"
            />
          </li>
        ))}
      </ul>
    </HomeSection>
  );
}
