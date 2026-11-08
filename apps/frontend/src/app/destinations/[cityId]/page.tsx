import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CityCard } from "@/components/city-card/CityCard";
import { PlacesBrowser } from "@/components/places/PlacesBrowser";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon, type IconName } from "@/components/ui/Icon";
import {
  type City,
  type GuideSummary,
  getCities,
  getCity,
  getGuides,
} from "@/lib/api";
import { guideHref } from "@/lib/guides";
import { ESN_SECTIONS_URL } from "@/lib/links";
import { getCityPlaces } from "@/lib/places-server";
import styles from "./page.module.scss";

/** First page of places rendered on the server (same size as "Load more"). */
const FIRST_PAGE = 12;
/** Other destinations at the end of the page. */
const MORE = 3;

/** Every destination is built ahead of time; new ones are built on their first visit. */
export async function generateStaticParams() {
  const cities = await getCities();
  // Cache Components needs at least one entry; "istanbul" becomes a 404 if it doesn't exist.
  return cities.length > 0
    ? cities.map((city) => ({ cityId: city.cityId }))
    : [{ cityId: "istanbul" }];
}

export async function generateMetadata({
  params,
}: PageProps<"/destinations/[cityId]">): Promise<Metadata> {
  const { cityId } = await params;
  const city = await getCity(cityId);
  if (!city) return {};
  return {
    title: city.name,
    description:
      city.intro ?? `Places in ${city.name} recommended by local ESNers.`,
  };
}

/**
 * /destinations/{cityId} (wireframe 02, MySwitzerland Zürich): breadcrumb, full-width hero
 * with one primary action ("See places ↓"), quick facts, admin text, the places
 * (list / map, category chips, "Load more", link to Explore!), "Plan your stay",
 * other destinations, breadcrumb again.
 * Not yet: "Impressions" gallery (open question: admin-picked or newest place photos)
 * and the places count (the API has no count yet).
 */
export default function DestinationPage({
  params,
}: PageProps<"/destinations/[cityId]">) {
  return (
    <Suspense fallback={<CitySkeleton />}>
      <CityContent params={params} />
    </Suspense>
  );
}

/** Same shape as the page top (breadcrumb, hero), so nothing jumps.
 *  <output> is a status region: screen readers hear "Loading destination…". */
function CitySkeleton() {
  return (
    <output className={styles.skeleton}>
      <span className="visually-hidden">Loading destination…</span>
      <span aria-hidden="true" className={`container ${styles.skeletonCrumb}`}>
        <span />
      </span>
      <span aria-hidden="true" className={styles.skeletonHero} />
    </output>
  );
}

async function CityContent({
  params,
}: {
  params: Promise<{ cityId: string }>;
}) {
  const { cityId } = await params;
  const [city, cities, guides, firstPage] = await Promise.all([
    getCity(cityId),
    getCities(),
    getGuides(),
    getCityPlaces(cityId, FIRST_PAGE),
  ]);
  if (!city) notFound();

  const crumbs = [
    { label: "Destinations", href: "/destinations" },
    { label: city.name },
  ];
  const others = cities.filter((c) => c.cityId !== city.cityId).slice(0, MORE);

  return (
    <>
      <div className="container">
        <Breadcrumb items={crumbs} />
      </div>

      <Hero city={city} />
      <Facts city={city} />
      <Glance city={city} />

      <section
        id="places"
        aria-labelledby="places-title"
        className={`container ${styles.section} ${styles.places}`}
      >
        <h2 id="places-title">Places recommended by ESNers</h2>
        <PlacesBrowser
          cities={cities}
          cityId={city.cityId}
          layout="tabs"
          initial={firstPage}
        />
        <Link
          href={`/explore?city=${encodeURIComponent(city.cityId)}`}
          className={styles.more}
        >
          Open {city.name} in Explore!
          <Icon name="chevron-forward-outline" size={20} />
        </Link>
      </section>

      <PlanYourStay city={city} guides={guides} />

      {others.length > 0 && (
        <section
          aria-labelledby="more-title"
          className={`container ${styles.section}`}
        >
          <h2 id="more-title">More destinations</h2>
          <ul className={styles.others}>
            {others.map((other) => (
              <li key={other.cityId}>
                <CityCard
                  city={other}
                  className={styles.otherCard}
                  sizes="(min-width: 80rem) 400px, (min-width: 48rem) 33vw, 75vw"
                />
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className={`container ${styles.endCrumb}`}>
        <Breadcrumb items={crumbs} />
      </div>
    </>
  );
}

/** Full-width photo with a dark layer; without a photo the brand colour (note 8). */
function Hero({ city }: { city: City }) {
  const photo = city.coverImage;
  return (
    <section
      aria-labelledby="city-title"
      className={`${styles.hero} ${photo ? styles.withPhoto : ""}`}
    >
      {photo && (
        <Image
          className={styles.heroPhoto}
          src={photo.url}
          alt=""
          fill
          preload
          sizes="100vw"
        />
      )}
      <div className={`container ${styles.heroBody}`}>
        {/* Labels, not filters: not clickable. "City" is the kind of destination. */}
        <p className={styles.labels}>
          <span className={styles.label}>City</span>
          {city.region && (
            <span className={styles.label}>{city.region} region</span>
          )}
        </p>
        <h1 id="city-title" className={styles.title}>
          {city.name}
        </h1>
        {city.intro && <p className={styles.intro}>{city.intro}</p>}
        <ButtonLink href="#places" variant="inverse" className={styles.cta}>
          See places in {city.name}
          <Icon
            name="arrow-forward-outline"
            size={20}
            className={styles.down}
          />
        </ButtonLink>
      </div>
    </section>
  );
}

/** The most looked-up facts, number first (note 9). Only the ones we have. */
function Facts({ city }: { city: City }) {
  const facts = [
    city.sectionCount
      ? {
          value: String(city.sectionCount),
          label: city.sectionCount === 1 ? "ESN section" : "ESN sections",
        }
      : null,
    city.region ? { value: city.region, label: "region" } : null,
  ].filter((fact) => fact !== null);
  if (facts.length === 0) return null;

  return (
    <div className="container">
      <dl className={styles.facts}>
        {facts.map((fact) => (
          <div key={fact.label} className={styles.fact}>
            <dt>{fact.label}</dt>
            <dd>{fact.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/** "İstanbul at a glance": up to three short admin blocks (note 10). */
function Glance({ city }: { city: City }) {
  const blocks = (city.glance ?? []).slice(0, 3);
  if (blocks.length === 0) return null;
  return (
    <section
      aria-labelledby="glance-title"
      className={`container ${styles.section}`}
    >
      <h2 id="glance-title">{city.name} at a glance</h2>
      <div className={styles.glance}>
        {blocks.map((block) => (
          <div key={block.heading}>
            <h3>{block.heading}</h3>
            <p>{block.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

type PlanCard = {
  title: string;
  icon: IconName;
  line: string;
} & ({ guideId: string } | { external: string; linkLabel: string });

/**
 * "Plan your stay" (note 15, Zürich "Travel information"): Erasmus Hacks in the
 * context of this destination, plus the ESN sections on ESN Accounts (decision 2 Nov).
 * A guide card is left out while that guide doesn't exist.
 */
function PlanYourStay({
  city,
  guides,
}: {
  city: City;
  guides: GuideSummary[];
}) {
  const sections = city.sectionCount ?? 0;
  const cards: PlanCard[] = [
    {
      title: "Getting around",
      icon: "bus-outline",
      line: "Public transport, transport cards, taxis",
      guideId: "getting-around",
    },
    {
      title: "Arriving",
      icon: "airplane-outline",
      line: "Airports, intercity buses and trains",
      guideId: "travelling-around-turkiye",
    },
    {
      title: "Phone and internet",
      icon: "phone-portrait-outline",
      line: "Turkish SIM or eSIM",
      guideId: "phone-and-sim",
    },
    {
      title: "Residence permit",
      icon: "id-card-outline",
      line: "Apply in your first month",
      guideId: "residence-permit",
    },
    {
      title: `ESN sections in ${city.name}`,
      icon: "people-outline",
      line:
        sections > 0
          ? `${sections} ${sections === 1 ? "section" : "sections"}`
          : "Local volunteers who welcome you",
      external: ESN_SECTIONS_URL,
      linkLabel: "Find them on ESN Accounts",
    },
    {
      title: "Housing",
      icon: "home-outline",
      line: "Dorms, flats, shared rooms",
      guideId: "housing",
    },
  ];

  const shown = cards
    .map((card) => {
      if ("external" in card) return { card, guide: undefined };
      const guide = guides.find((g) => g.guideId === card.guideId);
      return guide ? { card, guide } : null;
    })
    .filter((item) => item !== null);

  return (
    <section
      aria-labelledby="plan-title"
      className={`container ${styles.section}`}
    >
      <h2 id="plan-title">Plan your stay in {city.name}</h2>
      <p className={styles.lead}>
        Erasmus Hacks and ESN contacts for your first weeks.
      </p>
      <ul className={styles.plan}>
        {shown.map(({ card, guide }) => (
          <li key={card.title} className={styles.planCard}>
            <Icon name={card.icon} className={styles.planIcon} />
            <h3 className={styles.planTitle}>{card.title}</h3>
            <p className={styles.planLine}>{card.line}</p>
            {"external" in card ? (
              <a href={card.external} className={styles.planLink}>
                {card.linkLabel}
                <Icon name="open-outline" size={20} label="(another site)" />
              </a>
            ) : (
              guide && (
                <Link href={guideHref(guide)} className={styles.planLink}>
                  {guide.title}
                  <Icon name="chevron-forward-outline" size={20} />
                </Link>
              )
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
