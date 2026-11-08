import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { OwnerActions } from "@/components/places/OwnerActions";
import { PlaceCard } from "@/components/places/PlaceCard";
import { PlaceLocationMap } from "@/components/places/PlaceLocationMap";
import { Rating } from "@/components/places/Rating";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Icon } from "@/components/ui/Icon";
import { getCities } from "@/lib/api";
import { formatDate } from "@/lib/guides";
import {
  addedBy,
  cityName,
  FOOD_OPTIONS,
  PLACE_TYPES,
  type Place,
  PRICE_RANGES,
  TRANSPORT_LEVELS,
} from "@/lib/places";
import { getCityPlaces, getNewestPlaces, getPlace } from "@/lib/places-server";
import styles from "./page.module.scss";

/** Other places of the same destination at the end of the page. */
const MORE = 3;

/** The newest places are built ahead of time; the others on their first visit. */
export async function generateStaticParams() {
  const places = await getNewestPlaces(24);
  // Cache Components needs at least one entry; "example" becomes a 404.
  return places.length > 0
    ? places.map((place) => ({ placeId: place.placeId }))
    : [{ placeId: "example" }];
}

export async function generateMetadata({
  params,
}: PageProps<"/places/[placeId]">): Promise<Metadata> {
  const { placeId } = await params;
  const place = await getPlace(placeId);
  if (!place) return {};
  return { title: place.name, description: place.subtitle };
}

/**
 * /places/{placeId}: the decision point (standard: Hızlı ve yavaş düşünme): photo first,
 * then what the student needs to decide: the ESNer's note, price, how to get there,
 * address with a map, food options. The ESNer and section who added it are always shown
 * (standard: Yerel sesi göster). Breadcrumb: Destinations › İstanbul › Kadıköy › Name.
 * No wireframe yet: built from the standard and wireframe 02's patterns.
 */
export default function PlacePage({ params }: PageProps<"/places/[placeId]">) {
  return (
    <Suspense fallback={<PlaceSkeleton />}>
      <PlaceContent params={params} />
    </Suspense>
  );
}

function PlaceSkeleton() {
  return (
    <output className={styles.skeleton}>
      <span className="visually-hidden">Loading place…</span>
      <span aria-hidden="true" className={styles.skeletonPhoto} />
      <span aria-hidden="true" className={`container ${styles.skeletonText}`}>
        <span />
        <span />
      </span>
    </output>
  );
}

async function PlaceContent({
  params,
}: {
  params: Promise<{ placeId: string }>;
}) {
  const { placeId } = await params;
  const place = await getPlace(placeId);
  if (!place) notFound();

  const [cities, cityPage] = await Promise.all([
    getCities(),
    getCityPlaces(place.cityId, MORE + 1),
  ]);
  const city = cityName(place.cityId, cities);
  const isDestination = cities.some((c) => c.cityId === place.cityId);
  const others = cityPage.places
    .filter((p) => p.placeId !== place.placeId)
    .slice(0, MORE);
  const [cover, ...morePhotos] = place.photos;
  const credit = `Photo: ${place.authorName}${place.authorSection ? `, ${place.authorSection}` : ""}`;

  const crumbs = [
    { label: "Destinations", href: "/destinations" },
    {
      label: city,
      href: isDestination ? `/destinations/${place.cityId}` : undefined,
    },
    ...(place.district ? [{ label: place.district }] : []),
    { label: place.name },
  ];

  return (
    <>
      <div className="container">
        <Breadcrumb items={crumbs} />
      </div>

      {cover && (
        <figure className={styles.cover}>
          <div className={styles.coverPhoto}>
            <Image src={cover.url} alt={cover.alt} fill preload sizes="100vw" />
          </div>
          <figcaption className={`container ${styles.credit}`}>
            {credit}
          </figcaption>
        </figure>
      )}

      <div className={`container ${styles.page}`}>
        <header className={styles.head}>
          <div className={styles.headText}>
            <span className={styles.chip}>{PLACE_TYPES[place.placeType]}</span>
            <h1>{place.name}</h1>
            <p className={styles.subtitle}>{place.subtitle}</p>
            <p className={styles.meta}>
              {[place.district, city, PRICE_RANGES[place.price]?.short]
                .filter(Boolean)
                .join(" · ")}
            </p>
          </div>
          <OwnerActions placeId={place.placeId} authorId={place.authorId} />
        </header>

        <div className={styles.layout}>
          <div className={styles.main}>
            <section aria-labelledby="note-title">
              <h2 id="note-title">Why ESNers recommend it</h2>
              <p className={styles.note}>{place.description}</p>
              <p className={styles.by}>
                <Icon name="checkmark-circle-outline" size={20} />
                <span>
                  Added by {addedBy(place)}
                  {" · "}
                  <time dateTime={place.createdAt}>
                    {formatDate(place.createdAt)}
                  </time>
                </span>
              </p>
            </section>

            <section aria-labelledby="ratings-title" className={styles.block}>
              <h2 id="ratings-title">The ESNer's rating</h2>
              <dl className={styles.ratings}>
                <div>
                  <dt>The place</dt>
                  <dd>
                    <Rating value={place.placeRating} label="The place" />
                  </dd>
                </div>
                <div>
                  <dt>The location</dt>
                  <dd>
                    <Rating value={place.locationRating} label="The location" />
                  </dd>
                </div>
              </dl>
            </section>

            {morePhotos.length > 0 && (
              <section aria-labelledby="photos-title" className={styles.block}>
                <h2 id="photos-title">More photos</h2>
                <ul className={styles.photos}>
                  {morePhotos.map((photo) => (
                    <li key={photo.key} className={styles.photo}>
                      <Image
                        src={photo.url}
                        alt={photo.alt}
                        fill
                        sizes="(min-width: 64rem) 400px, 50vw"
                      />
                    </li>
                  ))}
                </ul>
                <p className={styles.photosCredit}>{credit}</p>
              </section>
            )}
          </div>

          <aside aria-labelledby="facts-title" className={styles.aside}>
            <h2 id="facts-title" className={styles.asideTitle}>
              Good to know
            </h2>
            <Facts place={place} />
            <PlaceLocationMap place={place} />
            {place.address && (
              <p className={styles.address}>
                <Icon name="location-outline" size={20} />
                <span>{place.address}</span>
              </p>
            )}
            <a
              href={directionsUrl(place)}
              className={styles.directions}
              rel="noopener"
            >
              Get directions
              <Icon name="open-outline" size={20} label="(Google Maps)" />
            </a>
          </aside>
        </div>

        {others.length > 0 && (
          <section aria-labelledby="more-title" className={styles.more}>
            <div className={styles.moreHead}>
              <h2 id="more-title">More places in {city}</h2>
              {isDestination && (
                <Link
                  href={`/destinations/${place.cityId}#places`}
                  className={styles.moreLink}
                >
                  All places in {city}
                  <Icon name="chevron-forward-outline" size={20} />
                </Link>
              )}
            </div>
            <ul className={styles.moreList}>
              {others.map((other) => (
                <li key={other.placeId}>
                  <PlaceCard place={other} />
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className={styles.endCrumb}>
          <Breadcrumb items={crumbs} />
        </div>
      </div>
    </>
  );
}

/** Price, transport, food: the facts for the decision, in words (not only icons). */
function Facts({ place }: { place: Place }) {
  const food = place.food.map((f) => FOOD_OPTIONS[f]).filter(Boolean);
  return (
    <dl className={styles.facts}>
      <div>
        <dt>Price per person</dt>
        <dd>{PRICE_RANGES[place.price]?.long}</dd>
      </div>
      <div>
        <dt>Getting there</dt>
        <dd>{TRANSPORT_LEVELS[place.transport]}</dd>
      </div>
      {food.length > 0 && (
        <div>
          <dt>Food options</dt>
          <dd>{food.join(", ")}</dd>
        </div>
      )}
    </dl>
  );
}

/** Google Maps directions to the pin (opens the app on phones). */
function directionsUrl(place: Place) {
  const url = new URL("https://www.google.com/maps/dir/");
  url.searchParams.set("api", "1");
  url.searchParams.set("destination", `${place.lat},${place.lng}`);
  return url.toString();
}
