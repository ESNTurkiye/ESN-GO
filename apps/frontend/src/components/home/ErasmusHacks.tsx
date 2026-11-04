import Link from "next/link";
import { GuideIcon } from "@/components/guides/GuideIcon";
import { Icon } from "@/components/ui/Icon";
import { type GuideSummary, getGuide, getGuides } from "@/lib/api";
import { guideHref } from "@/lib/guides";
import styles from "./ErasmusHacks.module.scss";
import { HomeSection } from "./HomeSection";

/** Small cards next to the featured guide. */
const SMALL = 4;
/** Section headings shown on the featured card. */
const POINTS = 3;

/** Title is the link; its ::after covers the card, so the whole card is clickable
 *  while screen readers hear only the title. */
function GuideTitle({ guide }: { guide: GuideSummary }) {
  return (
    <h3 className={styles.title}>
      <Link href={guideHref(guide)} className={styles.link}>
        {guide.title}
      </Link>
    </h3>
  );
}

/**
 * Your first weeks in Türkiye (wireframe H5, MySwitzerland "Our tips").
 * Bento: the first guide large with its first section headings, the next four small.
 * Mobile: the large card, then one row per guide.
 * Data: GET /guides, GET /guides/{first guide}. Not rendered while there are no guides.
 */
export async function ErasmusHacks() {
  const guides = await getGuides();
  if (guides.length === 0) return null;

  const [featured, ...rest] = guides;
  const small = rest.slice(0, SMALL);
  const detail = await getGuide(featured.guideId);
  const points = (detail?.sections ?? [])
    .slice(0, POINTS)
    .map((s) => s.heading);

  return (
    <HomeSection
      id="erasmus-hacks"
      title="Your first weeks in Türkiye"
      lead="Erasmus Hacks: short, step-by-step guides. Summary first."
      more={{ href: "/erasmus-hacks", label: "All Erasmus Hacks" }}
    >
      <ul className={styles.bento}>
        <li className={`${styles.card} ${styles.featured}`}>
          <GuideIcon name={featured.icon} className={styles.icon} />
          <GuideTitle guide={featured} />
          {featured.summary && (
            <p className={styles.summary}>{featured.summary}</p>
          )}
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
        </li>

        {small.map((guide) => (
          <li key={guide.guideId} className={`${styles.card} ${styles.small}`}>
            <GuideIcon name={guide.icon} className={styles.icon} />
            <GuideTitle guide={guide} />
            <span className={styles.read} aria-hidden="true">
              <span className={styles.readLabel}>Read guide</span>
              <Icon name="chevron-forward-outline" size={20} />
            </span>
          </li>
        ))}
      </ul>
    </HomeSection>
  );
}
