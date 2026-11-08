import Link from "next/link";
import styles from "./Breadcrumb.module.scss";

type Crumb = { label: string; href?: string };

/**
 * "Destinations › İstanbul" (wireframe 02 note 7). The last item is the current page;
 * an item without href in the middle is plain text (e.g. a district without its own page).
 * Shown at the top and again at the end of long pages, so the way back is never lost.
 */
export function Breadcrumb({
  items,
  className,
}: {
  items: Crumb[];
  className?: string;
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={
        className ? `${styles.breadcrumb} ${className}` : styles.breadcrumb
      }
    >
      <ol>
        {items.map((item, i) => (
          <li key={item.label}>
            {item.href ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              <span aria-current={i === items.length - 1 ? "page" : undefined}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
