import { buttonClassName } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";
import type { GuideOffer } from "@/lib/api";
import styles from "./OfferCard.module.scss";

/** "esncard.org" from "https://www.esncard.org/…" */
function host(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

/**
 * Offer in a guide (wireframe E13): label (ESNcard, ESN Türkiye partner), title, text, link.
 * Never looks like an ad: the label is always visible.
 */
export function OfferCard({ offer }: { offer: GuideOffer }) {
  return (
    <section className={styles.offer} aria-label={offer.title}>
      <span className={styles.label}>{offer.label}</span>
      <h2 className={styles.title}>{offer.title}</h2>
      {offer.description && (
        <p className={styles.description}>{offer.description}</p>
      )}
      <a
        href={offer.url}
        className={buttonClassName("secondary", false, styles.link)}
      >
        Go to {host(offer.url)}
        <Icon name="open-outline" size={20} label="(another site)" />
      </a>
    </section>
  );
}
