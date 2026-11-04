import Image from "next/image";
import { ButtonLink } from "@/components/ui/ButtonLink";
import type { HeroContent } from "@/content/home";
import styles from "./Hero.module.scss";

/**
 * Home hero (wireframe H2): one static, full-width photo, no video or carousel.
 * The page's only h1 and only primary action ("Explore places" -> /explore).
 */
export function Hero({ title, lead, action, photo }: HeroContent) {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      {photo && (
        <Image
          className={styles.photo}
          src={photo.src}
          alt={photo.alt}
          fill
          preload
          sizes="100vw"
          style={photo.focus ? { objectPosition: photo.focus } : undefined}
        />
      )}

      <div className={`container ${styles.content}`}>
        <h1 id="hero-title" className={styles.title}>
          {title}
        </h1>
        <p className={styles.lead}>{lead}</p>
        <ButtonLink
          href={action.href}
          variant="inverse"
          className={styles.action}
        >
          {action.label}
        </ButtonLink>
      </div>

      {photo && (
        <p className={styles.credit}>
          Photo: {photo.credit.name}, {photo.credit.section}
        </p>
      )}
    </section>
  );
}
