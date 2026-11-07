import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { OfferCard } from "@/components/guides/OfferCard";
import { TableOfContents } from "@/components/guides/TableOfContents";
import { TipBox } from "@/components/guides/TipBox";
import { Icon } from "@/components/ui/Icon";
import { getGuide, getGuides } from "@/lib/api";
import { formatDate, guideHref, guideToc, readingMinutes } from "@/lib/guides";
import { FEEDBACK_URL } from "@/lib/links";
import styles from "./page.module.scss";

/** Every guide is built ahead of time; new ones are built on their first visit. */
export async function generateStaticParams() {
    const guides = await getGuides();
    // Cache Components needs at least one entry; "first-week" becomes a 404 if it doesn't exist.
    return guides.length > 0 ? guides.map((guide) => ({ guideId: guide.guideId })) : [{ guideId: "first-week" }];
}

export async function generateMetadata({ params }: PageProps<"/erasmus-hacks/[guideId]">): Promise<Metadata> {
    const { guideId } = await params;
    const guide = await getGuide(guideId);
    if (!guide) return {};
    return {
        title: `${guide.title} · Erasmus Hacks`,
        description: guide.summary,
    };
}

/**
 * /erasmus-hacks/{guideId} (wireframe 04): summary first, details below
 * (most readers only read the top of the page).
 * Desktop: text column + side column with "On this page" and the offers.
 * Mobile: one column; "On this page" closed under the summary, offers after the sections.
 *
 * The guide depends on the URL, so it sits in <Suspense>: on a link click the page
 * frame appears at once with a skeleton, then the guide streams in.
 */
export default function GuidePage({ params }: PageProps<"/erasmus-hacks/[guideId]">) {
    return (
        <div className={`container ${styles.page}`}>
            <Suspense fallback={<GuideSkeleton />}>
                <GuideContent params={params} />
            </Suspense>
        </div>
    );
}

/** Same shape as the guide (breadcrumb, title, summary, text), so nothing jumps.
 *  <output> is a status region: screen readers hear "Loading guide…". */
function GuideSkeleton() {
    return (
        <output className={styles.skeleton}>
            <span className="visually-hidden">Loading guide…</span>
            <span aria-hidden="true" className={styles.skeletonLine} style={{ width: "12rem" }} />
            <span aria-hidden="true" className={styles.skeletonTitle} />
            <span aria-hidden="true" className={styles.skeletonLine} style={{ width: "18rem" }} />
            <span aria-hidden="true" className={styles.skeletonBlock} />
            <span aria-hidden="true" className={styles.skeletonLine} />
            <span aria-hidden="true" className={styles.skeletonLine} />
            <span aria-hidden="true" className={styles.skeletonLine} style={{ width: "60%" }} />
        </output>
    );
}

async function GuideContent({ params }: { params: Promise<{ guideId: string }> }) {
    const { guideId } = await params;
    const [guide, guides] = await Promise.all([getGuide(guideId), getGuides()]);
    if (!guide) notFound();

    const toc = guideToc(guide);
    const [introAnchor, ...sectionAnchors] = guide.intro ? toc : [undefined, ...toc];
    const index = guides.findIndex((g) => g.guideId === guide.guideId);
    const next = index >= 0 ? guides[index + 1] : undefined;
    const offers = guide.offers ?? [];

    const meta = [
        guide.updatedAt && (
            <time key="updated" dateTime={guide.updatedAt}>
                Updated {formatDate(guide.updatedAt)}
            </time>
        ),
        guide.edition && (
            <span key="edition" className={styles.editionMeta}>
                {guide.edition} edition
            </span>
        ),
        <span key="read">{readingMinutes(guide)} min read</span>,
    ].filter(Boolean);

    return (
        <>
            <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
                <ol>
                    <li>
                        <Link href="/erasmus-hacks">Erasmus Hacks</Link>
                    </li>
                    <li>
                        <span aria-current="page">{guide.title}</span>
                    </li>
                </ol>
            </nav>

            <header className={styles.head}>
                <h1>{guide.title}</h1>
                {guide.question && <p className={styles.question}>{guide.question}</p>}
                <p className={styles.meta}>{meta}</p>
            </header>

            <div className={styles.layout}>
                <article className={styles.main}>
                    {guide.coverImage && (
                        <div className={styles.cover}>
                            <Image src={guide.coverImage.url} alt="" fill preload sizes="(min-width: 64rem) 800px, 100vw" />
                        </div>
                    )}

                    {guide.summary && (
                        <section aria-labelledby="in-short" className={styles.short}>
                            <h2 id="in-short" className={styles.shortTitle}>
                                In short
                            </h2>
                            <p>{guide.summary}</p>
                        </section>
                    )}

                    <TableOfContents items={toc} variant="disclosure" className={styles.tocMobile} />

                    {guide.intro && introAnchor && (
                        <section aria-labelledby={introAnchor.id} className={styles.block}>
                            <h2 id={introAnchor.id}>{guide.intro.heading}</h2>
                            {guide.intro.body && <p className={styles.body}>{guide.intro.body}</p>}
                            {guide.intro.tip && <TipBox>{guide.intro.tip}</TipBox>}
                        </section>
                    )}

                    {(guide.sections ?? []).map((section, i) => {
                        const anchor = sectionAnchors[i];
                        return (
                            <section key={anchor?.id ?? section.heading} aria-labelledby={anchor?.id} className={styles.block}>
                                <h2 id={anchor?.id}>{section.heading}</h2>
                                {section.body && <p className={styles.body}>{section.body}</p>}
                                {section.items && section.items.length > 0 && (
                                    <ul className={styles.items}>
                                        {section.items.map((item) => (
                                            <li key={item}>{item}</li>
                                        ))}
                                    </ul>
                                )}
                                {section.tip && <TipBox>{section.tip}</TipBox>}
                            </section>
                        );
                    })}

                    {offers.length > 0 && (
                        <div className={styles.offersMobile}>
                            {offers.map((offer) => (
                                <OfferCard key={offer.title} offer={offer} />
                            ))}
                        </div>
                    )}

                    <footer className={styles.end}>
                        {next && (
                            <Link href={guideHref(next)} className={styles.next}>
                                <span className={styles.nextLabel}>Next guide</span>
                                <span className={styles.nextTitle}>
                                    {next.title}
                                    <Icon name="chevron-forward-outline" size={24} />
                                </span>
                            </Link>
                        )}
                        {FEEDBACK_URL && (
                            <p>
                                <a href={FEEDBACK_URL} className={styles.feedback}>
                                    Something outdated? Tell us
                                    <Icon name="chevron-forward-outline" size={20} />
                                </a>
                            </p>
                        )}
                    </footer>
                </article>

                <aside className={styles.side} aria-label="About this guide">
                    <TableOfContents items={toc} variant="panel" />
                    {offers.map((offer) => (
                        <OfferCard key={offer.title} offer={offer} />
                    ))}
                </aside>
            </div>
        </>
    );
}
