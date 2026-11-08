import Image from "next/image";
import Link from "next/link";
import type { City } from "@/lib/api";
import {
  addedBy,
  PLACE_TYPES,
  type Place,
  PRICE_RANGES,
  placeArea,
  placeHref,
} from "@/lib/places";
import styles from "./PlaceCard.module.scss";
import { PlaceTypeIcon } from "./PlaceTypeIcon";

type PlaceCardProps = {
  place: Place;
  /** Show the city next to the district ("Kadıköy, İstanbul"): lists with several cities. */
  cities?: City[];
  /** next/image sizes. */
  sizes?: string;
  /** Highlighted (its pin is selected or hovered on the map). */
  active?: boolean;
  onHover?: (placeId: string | null) => void;
  /** Extra line under the card (My places: status, buttons). */
  children?: React.ReactNode;
};

/**
 * PlaceCard (standard: Bileşenler; wireframes 02 note 13, 05 X6): 4:3 photo, name,
 * district (+ city), ₺ level, category chip, the ESNer and section who added it.
 * The whole card is one link to the place.
 */
export function PlaceCard({
  place,
  cities,
  sizes = "(min-width: 64rem) 320px, (min-width: 48rem) 45vw, 100vw",
  active,
  onHover,
  children,
}: PlaceCardProps) {
  const photo = place.photos[0];
  const area = placeArea(place, cities);

  return (
    <article
      className={`${styles.card} ${active ? styles.active : ""}`}
      onMouseEnter={onHover && (() => onHover(place.placeId))}
      onMouseLeave={onHover && (() => onHover(null))}
    >
      <div className={styles.media}>
        {photo ? (
          <Image src={photo.url} alt={photo.alt} fill sizes={sizes} />
        ) : (
          <div className={styles.noPhoto}>
            <PlaceTypeIcon type={place.placeType} />
          </div>
        )}
      </div>
      <div className={styles.body}>
        <h3 className={styles.name}>
          <Link href={placeHref(place)} className={styles.link}>
            {place.name}
          </Link>
        </h3>
        <p className={styles.meta}>
          {area && <span>{area}</span>}
          {area && <span aria-hidden="true"> · </span>}
          <span title={PRICE_RANGES[place.price]?.long}>
            {PRICE_RANGES[place.price]?.short}
            <span className="visually-hidden">
              {" "}
              ({PRICE_RANGES[place.price]?.long} per person)
            </span>
          </span>
          <span className={styles.chip}>{PLACE_TYPES[place.placeType]}</span>
        </p>
        <p className={styles.by}>Added by {addedBy(place)}</p>
        {children}
      </div>
    </article>
  );
}
