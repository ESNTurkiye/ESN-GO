import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import styles from "./HomeSection.module.scss";

type HomeSectionProps = {
  /** Used for the heading id (aria-labelledby). */
  id: string;
  title: string;
  lead?: string;
  /** "All … ›" link: next to the title from tablet up, below the content on mobile. */
  more?: { href: string; label: string };
  children: ReactNode;
};

/** One section of the home page: h2, optional lead, content, "All … ›" link. */
export function HomeSection({
  id,
  title,
  lead,
  more,
  children,
}: HomeSectionProps) {
  const titleId = `${id}-title`;

  return (
    <section className={styles.section} aria-labelledby={titleId}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.head}>
          <h2 id={titleId}>{title}</h2>
          {lead && <p className={styles.lead}>{lead}</p>}
        </div>

        <div className={styles.content}>{children}</div>

        {more && (
          <Link href={more.href} className={styles.more}>
            {more.label}
            <Icon name="chevron-forward-outline" size={20} />
          </Link>
        )}
      </div>
    </section>
  );
}
