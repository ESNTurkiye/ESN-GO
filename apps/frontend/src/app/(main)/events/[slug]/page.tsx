import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
    EVENT_CATEGORY_LABELS,
    EVENT_CATEGORY_NEON_BADGE,
    eventVibePartyHardPercent,
    inferEventCategory,
} from "@/app/_lib/eventCategory";
import {
    parseEventContentSections,
} from "@/app/_lib/eventSections";
import { cn } from "@/_lib/utils";
import EventContentRenderer from "@/components/events/EventContentRenderer";
import EventHeroActions from "@/components/events/EventHeroActions";
import ExternalLinkIcon from "@/components/ui/ExternalLinkIcon";
import {
    getAllEvents,
    getAllEventSlugs,
    getEventBySlug,
    type EventListItem,
} from "@/app/_lib/events";
import styles from "./eventNeon.module.css";

type EventDetailPageProps = {
    params: Promise<{ slug: string }>;
};

const displayFont = "font-oswald";
const bodyFont = "font-lato";

const TURKEY_PATH =
    "M263.6,108.8 L257.2,112.0 L252.6,107.2 L237.0,104.8 L231.3,107.7 L216.2,110.6 L209.0,110.3 L193.6,117.3 L182.6,117.4 L175.6,113.8 L160.9,119.0 L156.5,115.4 L155.8,125.8 L152.2,129.9 L148.7,134.0 L143.8,125.5 L148.8,118.5 L140.7,120.1 L129.5,115.8 L120.3,126.6 L100.1,128.7 L89.3,118.6 L74.9,118.0 L71.9,125.7 L62.6,128.0 L49.8,118.0 L35.2,118.4 L27.3,99.8 L17.6,89.4 L24.1,74.9 L15.6,66.0 L30.4,48.1 L50.9,47.4 L56.6,33.2 L81.9,35.7 L98.0,23.6 L113.5,18.3 L135.6,17.9 L158.8,31.1 L178.0,38.3 L193.5,35.4 L205.0,37.1 L220.7,27.3 L234.9,26.4 L247.8,35.6 L250.0,42.2 L248.7,51.3 L258.7,55.9 L263.9,61.4 L254.8,66.7 L259.0,88.1 L256.3,93.9 L263.6,108.8 Z M14.9,21.9 L28.5,16.0 L39.9,18.5 L41.5,25.7 L53.2,31.7 L50.7,36.3 L34.9,37.3 L29.2,43.1 L18.1,53.2 L13.9,44.5 L14.1,40.6 L17.2,38.5 L21.4,26.9 L14.9,21.9 Z";

function RelatedEventCard({ event }: { event: EventListItem }) {
    const cat = inferEventCategory(event);
    const tagLabel = EVENT_CATEGORY_LABELS[cat].toUpperCase();
    const tagColor =
        cat === "chill"
            ? "text-[#65df64]"
            : cat === "adventure"
              ? "text-[#abc7ff]"
              : "text-[#ffb1c6]";

    return (
        <article className="group relative h-[min(420px,70vh)] min-w-[280px] shrink-0 snap-center overflow-hidden rounded-2xl border border-white/10 bg-[#19090e] sm:min-w-[300px] md:h-[450px] md:min-h-0 md:w-full md:min-w-0">
            <Link
                href={`/events/${event.slug}`}
                className="absolute inset-0 z-10 rounded-2xl"
                aria-label={`Open ${event.title}`}
            />
            <div className="relative h-full w-full">
                {event.cardImage ? (
                    <Image
                        src={event.cardImage}
                        alt=""
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 280px, 33vw"
                        unoptimized={event.cardImage.startsWith("http")}
                    />
                ) : (
                    <div
                        className={`flex h-full w-full items-center justify-center bg-linear-to-br from-[#38252a] to-[#650030] ${displayFont} text-4xl font-bold text-white`}
                    >
                        {event.dateDay}
                    </div>
                )}
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 z-20 p-6">
                    <span
                        className={cn(
                            "mb-2 block text-[10px] font-bold uppercase tracking-widest",
                            tagColor,
                        )}
                    >
                        {tagLabel}
                    </span>
                    <h3
                        className={`${displayFont} text-xl font-bold leading-tight text-white`}
                    >
                        {event.title}
                    </h3>
                    <p className={`mt-2 text-sm text-white/60 ${bodyFont}`}>
                        {event.dateMonth} {event.dateDay}, 2026 · {event.time}
                    </p>
                </div>
            </div>
        </article>
    );
}

export async function generateStaticParams() {
    const slugs = await getAllEventSlugs();
    return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
    params,
}: EventDetailPageProps): Promise<Metadata> {
    const { slug } = await params;
    const doc = await getEventBySlug(slug);

    if (!doc) {
        return {
            title: "Event Not Found | ESN GO",
        };
    }

    return {
        title: `${doc.frontmatter.title} | ESN GO`,
        description: doc.frontmatter.summary,
    };
}

export default async function EventDetailPage({
    params,
}: EventDetailPageProps) {
    const { slug } = await params;
    const doc = await getEventBySlug(slug);

    if (!doc) {
        notFound();
    }

    const { frontmatter: fm, content } = doc;
    const category = inferEventCategory({
        title: fm.title,
        summary: fm.summary,
    });
    const badgeLabel = EVENT_CATEGORY_LABELS[category].toUpperCase();
    const badgeNeonClass = EVENT_CATEGORY_NEON_BADGE[category];
    const vibePct = eventVibePartyHardPercent(category);
    const parsedSections = parseEventContentSections(content);
    const whatToExpect = parsedSections.sections.whatToExpect;
    const whatToBring = parsedSections.sections.whatToBring;

    const heroSrc = fm.heroImage ?? fm.cardImage;
    const mapPin =
        typeof fm.mapCx === "number" && typeof fm.mapCy === "number"
            ? { cx: fm.mapCx, cy: fm.mapCy }
            : null;
    const activeLabel =
        fm.mapCity && fm.mapSpot
            ? `${fm.mapCity} | ${fm.mapSpot}`
            : fm.mapCity
              ? fm.mapCity
        : `Türkiye | ${fm.location}`;

    const allEvents = await getAllEvents();
    const related = allEvents.filter((e) => e.slug !== slug).slice(0, 3);

    const registerHref = fm.officialSiteUrl ?? "#event-register";
    const registerExternal = Boolean(fm.officialSiteUrl);

    const neonPrimaryBtn =
        "inline-flex touch-target items-center justify-center gap-2 rounded-full bg-[#ffb1c6] px-8 py-4 text-base font-bold text-[#650030] shadow-lg transition hover:scale-[1.02] hover:brightness-105";

    return (
        <main
            className={`min-h-screen bg-[#1f0f13] text-[#fadbe1] ${bodyFont}`}
        >
            <section
                className="relative min-h-[min(640px,85vh)] w-full overflow-hidden"
                aria-label="Event hero"
            >
                {heroSrc ? (
                    <Image
                        src={heroSrc}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="100vw"
                        unoptimized={heroSrc.startsWith("http")}
                        priority
                    />
                ) : (
                    <div className="absolute inset-0 bg-linear-to-br from-[#28171b] to-[#650030]" />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-[#1f0f13] via-[#1f0f13]/55 to-black/40" />

                <div className="relative z-10 mx-auto flex min-h-[min(640px,85vh)] max-w-7xl flex-col justify-end pb-12 pt-28 md:pb-16 md:pt-32 container-responsive">
                    <span
                        className={cn(
                            "mb-5 inline-flex w-fit rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-widest",
                            badgeNeonClass,
                        )}
                    >
                        {badgeLabel}
                    </span>

                    <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
                        <div className="min-w-0 max-w-4xl">
                            <h1
                                className={`${displayFont} text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl`}
                            >
                                {fm.title}
                            </h1>
                            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
                                {fm.summary}
                            </p>
                            <EventHeroActions
                                title={fm.title}
                                sharePath={`/events/${slug}`}
                                eventSlug={slug}
                                className="mt-8"
                            />
                        </div>

                        <div className="shrink-0 lg:pb-1">
                            {registerExternal ? (
                                <a
                                    href={registerHref}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={cn(neonPrimaryBtn, styles.pinkGlow)}
                                    aria-label="Register on the official event site"
                                >
                                    <svg
                                        className="h-5 w-5 shrink-0"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        aria-hidden
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                    Register now
                                </a>
                            ) : (
                                <Link
                                    href={registerHref}
                                    className={cn(neonPrimaryBtn, styles.pinkGlow)}
                                    aria-label="Scroll to registration"
                                >
                                    <svg
                                        className="h-5 w-5 shrink-0"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        aria-hidden
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                    Register now
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <div className="-mt-4 px-4 pb-2 md:-mt-6">
                <div
                    className={cn(
                        styles.glassPanel,
                        "mx-auto flex max-w-7xl flex-col flex-wrap gap-4 rounded-3xl px-3 py-4 shadow-2xl sm:flex-row sm:flex-nowrap sm:items-center sm:justify-around sm:gap-2 sm:py-3 md:rounded-full container-responsive",
                    )}
                    aria-label="Event details"
                >
                    <div className="px-2 text-center sm:px-3 sm:text-left">
                        <p
                            className={`text-[10px] font-bold uppercase tracking-wider text-white/50 ${displayFont}`}
                        >
                            Date
                        </p>
                        <p
                            className={`mt-0.5 font-semibold text-white ${displayFont}`}
                        >
                            {fm.time}
                        </p>
                    </div>
                    <div
                        className="hidden h-8 w-px bg-white/10 sm:block"
                        aria-hidden
                    />
                    <div className="min-w-0 px-2 text-center sm:px-3 sm:text-left">
                        <p
                            className={`text-[10px] font-bold uppercase tracking-wider text-white/50 ${displayFont}`}
                        >
                            Location
                        </p>
                        <p
                            className={`mt-0.5 font-semibold text-white ${displayFont}`}
                        >
                            {fm.location}
                        </p>
                    </div>
                    <div
                        className="hidden h-8 w-px bg-white/10 sm:block"
                        aria-hidden
                    />
                    <div className="px-2 text-center sm:px-3 sm:text-left">
                        <p
                            className={`text-[10px] font-bold uppercase tracking-wider text-white/50 ${displayFont}`}
                        >
                            Price
                        </p>
                        <p
                            className={`mt-0.5 font-semibold text-[#ffb1c6] ${displayFont}`}
                        >
                            {fm.price}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 pb-16 pt-6 md:pb-24 md:pt-10 container-responsive">
                <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
                    <div className="min-w-0 space-y-14 lg:col-span-8">
                        <section
                            className={cn(
                                styles.solidPanel,
                                styles.aboutProse,
                                "rounded-2xl p-6 sm:p-8 md:p-10",
                            )}
                        >
                            <h2
                                className={`${displayFont} text-2xl font-bold text-white md:text-3xl`}
                            >
                                About the event
                            </h2>
                            <div className="mt-8">
                                <EventContentRenderer
                                    content={parsedSections.aboutContent}
                                />
                            </div>
                        </section>

                        {whatToExpect ? (
                            <section>
                            <div className="grid gap-8 md:grid-cols-2 md:gap-10">
                                <div>
                                    <h2
                                        className={`${displayFont} mb-6 text-2xl font-bold text-white md:text-3xl`}
                                    >
                                        What to expect
                                    </h2>
                                    <EventContentRenderer
                                        content={whatToExpect}
                                    />
                                </div>
                                <div
                                    className={cn(
                                        styles.glassPanel,
                                        "rounded-2xl p-6 sm:p-8",
                                    )}
                                >
                                    <h3
                                        className={`${displayFont} mb-6 text-xl font-bold text-white`}
                                    >
                                        Vibe meter
                                    </h3>
                                    <div className="mb-4 flex items-end justify-between">
                                        <span className="text-sm font-bold text-[#65df64]">
                                            Chill
                                        </span>
                                        <span className="text-sm font-bold text-[#ffb1c6]">
                                            Party hard
                                        </span>
                                    </div>
                                    <div className="relative h-4 w-full overflow-hidden rounded-full bg-white/10">
                                        <div
                                            className={cn(
                                                "absolute inset-y-0 left-0 rounded-full",
                                                styles.vibeGradient,
                                            )}
                                            style={{ width: `${vibePct}%` }}
                                        />
                                    </div>
                                    <p className="mt-4 text-center text-sm text-white/45">
                                        A playful hint from the event type — check
                                        the official brief for the final program.
                                    </p>
                                </div>
                            </div>
                            </section>
                        ) : null}

                        {whatToBring ? (
                            <section>
                                <h2
                                    className={`${displayFont} mb-8 text-2xl font-bold text-white md:text-3xl`}
                                >
                                    What to bring
                                </h2>
                                <div
                                    className={cn(
                                        styles.glassPanel,
                                        "rounded-2xl p-6 sm:p-8",
                                    )}
                                >
                                    <EventContentRenderer content={whatToBring} />
                                </div>
                            </section>
                        ) : null}
                    </div>

                    <aside className="lg:col-span-4">
                        <div className="sticky top-32 space-y-6">
                            <div
                                className={cn(
                                    styles.glassPanel,
                                    "overflow-hidden rounded-2xl",
                                )}
                            >
                                <div className="relative h-52 overflow-hidden rounded-t-2xl bg-linear-to-br from-[#28171b] to-[#1f0f13] p-4">
                                    <div className={styles.mapLabel}>
                                        <span className={styles.mapLabelText}>
                                            {activeLabel}
                                        </span>
                                        <span
                                            className={styles.mapLabelArrow}
                                            aria-hidden="true"
                                        />
                                    </div>
                                    <svg
                                        viewBox="0 0 280 140"
                                        className="h-full w-full"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d={TURKEY_PATH}
                                            fill="none"
                                            stroke="#dbeafe"
                                            strokeWidth={3.2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        {mapPin ? (
                                            <g>
                                                <circle
                                                    cx={mapPin.cx}
                                                    cy={mapPin.cy}
                                                    r={6.5}
                                                    className={
                                                        styles.activePinRipple
                                                    }
                                                />
                                                <circle
                                                    cx={mapPin.cx}
                                                    cy={mapPin.cy}
                                                    r={6.5}
                                                    className={styles.activePin}
                                                />
                                            </g>
                                        ) : null}
                                    </svg>
                                </div>

                                <div className="space-y-6 p-6">
                                    <div>
                                        <p
                                            className={`text-xs font-bold uppercase tracking-wider text-white/50 ${displayFont}`}
                                        >
                                            Registration deadline
                                        </p>
                                        <p
                                            className={`mt-1 text-lg font-semibold text-[#ffb1c6] ${displayFont}`}
                                        >
                                            {fm.registrationDeadline}
                                        </p>
                                    </div>

                                    {fm.officialSiteUrl ? (
                                        <a
                                            href={fm.officialSiteUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex w-full touch-target items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                                        >
                                            <span>
                                                {fm.officialSiteLabel ??
                                                    "Official event site"}
                                            </span>
                                            <ExternalLinkIcon className="h-4 w-4 shrink-0" />
                                        </a>
                                    ) : null}

                                    <div className="border-t border-white/10 pt-6">
                                        <h3
                                            className={`${displayFont} text-lg font-bold text-white`}
                                        >
                                            Organizer
                                        </h3>
                                        <div className="mt-4 flex items-center gap-3">
                                            <div
                                                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#ff4a90] text-sm font-bold text-white ${displayFont}`}
                                            >
                                                ESN
                                            </div>
                                            <div>
                                                <p
                                                    className={`font-bold text-white ${displayFont}`}
                                                >
                                                    ESN Türkiye
                                                </p>
                                                <p className="text-sm text-white/50">
                                                    Official network partner
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            {related.length > 0 ? (
                <section
                    className="border-t border-white/5 bg-[#19090e] py-14 md:py-20"
                    aria-labelledby="related-events-heading"
                >
                    <div className="mx-auto max-w-7xl container-responsive">
                        <h2
                            id="related-events-heading"
                            className={`${displayFont} text-2xl font-bold text-white md:text-3xl`}
                        >
                            Other events you&apos;ll love
                        </h2>
                        <div className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
                            {related.map((event) => (
                                <RelatedEventCard
                                    key={event.slug}
                                    event={event}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            ) : null}

        </main>
    );
}
