import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import type { GuideSummary } from "@/lib/api";
import { guideHref } from "@/lib/guides";
import styles from "./GuideCard.module.scss";
import { GuideIcon } from "./GuideIcon";

/**
 * Guide card on /erasmus-hacks (wireframe E4): icon, title, the student's question, "Read guide ›".
 * The title is the link and covers the card, so screen readers hear only the title.
 */
export function GuideCard({ guide }: { guide: GuideSummary }) {
  return (
    <article className={styles.card}>
      <GuideIcon name={guide.icon} className={styles.icon} />
      <h3 className={styles.title}>
        <Link href={guideHref(guide)} className={styles.link}>
          {guide.title}
        </Link>
      </h3>
      {guide.question && <p className={styles.question}>{guide.question}</p>}
      <span className={styles.read} aria-hidden="true">
        <span className={styles.readLabel}>Read guide</span>
        <Icon name="chevron-forward-outline" size={20} />
      </span>
    </article>
  );
}
