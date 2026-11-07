import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { GuideCard } from "@/components/guides/GuideCard";
import { GuideIcon } from "@/components/guides/GuideIcon";
import { Icon } from "@/components/ui/Icon";
import { type GuideSummary, getGuide, getGuides } from "@/lib/api";
import { GUIDE_GROUPS, guideHref, OTHER_GROUP } from "@/lib/guides";
import { ESN_SECTIONS_URL, FEEDBACK_URL } from "@/lib/links";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "Erasmus Hacks",
  description:
    "Short, step-by-step guides for your first months in Türkiye, written by ESNers.",
};

/** Section headings shown on the "Start here" card. */
const POINTS = 3;

/** Groups in page order; guides with an unknown group go to "More guides". */
function groupGuides(guides: GuideSummary[]) {
  const known = new Set<string>(GUIDE_GROUPS.map((g) => g.id));
  return [...GUIDE_GROUPS, OTHER_GROUP]
    .map((group) => ({
      ...group,
      guides: guides.filter((guide) =>
        group.id === OTHER_GROUP.id
          ? !known.has(guide.group ?? "")
          : guide.group === group.id,
      ),
    }))
    .filter((group) => group.guides.length > 0);
}

/**
 * /erasmus-hacks (wireframe 03): page title without buttons, emergency line,
 * "Start here" (the first guide), the other guides in groups, help at the end.
 * No primary button on this page: the strongest signal is the "Start here" card.
 */
export default async function ErasmusHacksPage() {
  const guides = await getGuides();
  const [featured, ...rest] = guides;
  const detail = featured ? await getGuide(featured.guideId) : null;
  const points = (detail?.sections ?? [])
    .slice(0, POINTS)
    .map((s) => s.heading);
  const edition = featured?.edition;

  return (
    <div className={`container ${styles.page}`}>
      <header className={styles.head}>
        <h1>Erasmus Hacks</h1>
        <p className={styles.lead}>
          Short, step-by-step guides for your first months in Türkiye. Written
          by ESNers who did it themselves.
        </p>
        {edition && <p className={styles.edition}>Updated for {edition}</p>}
      </header>

      {/* Information, not an alarm: no red, no modal (wireframe E2). */}
      <p className={styles.emergency}>
        <Icon name="call-outline" className={styles.emergencyIcon} />
        <span>
          In an emergency, call <a href="tel:112">112</a> (ambulance, police,
          fire). It's free from any phone.
        </span>
      </p>

      {guides.length === 0 && (
        <p className={styles.empty}>
          The guides are on their way. Check back soon.
        </p>
      )}

      {featured && (
        <section aria-labelledby="start-title" className={styles.section}>
          <h2 id="start-title">Start here</h2>
          <article
            className={`${styles.start} ${featured.coverImage ? styles.withPhoto : ""}`}
          >
            {featured.coverImage && (
              <div className={styles.startPhoto}>
                <Image
                  src={featured.coverImage.url}
                  alt=""
                  fill
                  sizes="(min-width: 64rem) 600px, 100vw"
                />
              </div>
            )}
            <div className={styles.startBody}>
              <GuideIcon name={featured.icon} className={styles.startIcon} />
              <h3 className={styles.startTitle}>
                <Link href={guideHref(featured)} className={styles.startLink}>
                  {featured.title}
                </Link>
              </h3>
              {featured.question && (
                <p className={styles.startQuestion}>{featured.question}</p>
              )}
              {featured.summary && <p>{featured.summary}</p>}
              {points.length > 0 && (
                <ul className={styles.points}>
                  {points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              )}
              <span className={styles.read} aria-hidden="true">
                Read guide
                <Icon name="chevron-forward-outline" size={20} />
              </span>
            </div>
          </article>
        </section>
      )}

      {groupGuides(rest).map((group) => (
        <section
          key={group.id}
          aria-labelledby={`group-${group.id}`}
          className={styles.section}
        >
          <h2 id={`group-${group.id}`}>{group.title}</h2>
          <ul className={styles.grid}>
            {group.guides.map((guide) => (
              <li key={guide.guideId}>
                <GuideCard guide={guide} />
              </li>
            ))}
          </ul>
        </section>
      ))}

      <section aria-labelledby="help-title" className={styles.help}>
        <h2 id="help-title">Can't find what you need?</h2>
        <p className={styles.lead}>
          Your local ESN section can help. Its volunteers were exchange students
          too.
        </p>
        <p className={styles.helpLinks}>
          <a href={ESN_SECTIONS_URL}>
            Find your ESN section
            <Icon name="open-outline" size={20} label="(another site)" />
          </a>
          {FEEDBACK_URL && (
            <a href={FEEDBACK_URL}>
              Suggest a topic
              <Icon name="chevron-forward-outline" size={20} />
            </a>
          )}
        </p>
      </section>
    </div>
  );
}
