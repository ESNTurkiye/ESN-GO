import Image from "next/image";
import type { EsnerContent } from "@/content/home";
import { AddPlaceAction } from "./AddPlaceAction";
import styles from "./EsnerBand.module.scss";

/**
 * Are you an ESNer? (wireframe H6): the one place on the home page for the second
 * audience, the ESNers who add places. "ESNer" is explained where it first appears,
 * and what is shown publicly is said next to the button (trust).
 * The button is secondary: the page's primary action is in the hero.
 */
export function EsnerBand({ title, body, privacy, action, loginHint, photo }: EsnerContent) {
    return (
        <section className={styles.band} aria-labelledby="esner-title">
            <div className={`container ${styles.inner}`}>
                <div className={styles.text}>
                    <h2 id="esner-title">{title}</h2>
                    <p className={styles.body}>{body}</p>
                    <ul className={styles.privacy}>
                        {privacy.map((line) => (
                            <li key={line}>{line}</li>
                        ))}
                    </ul>
                    <AddPlaceAction label={action.label} href={action.href} loginHint={loginHint} />
                </div>

                {photo && (
                    <figure className={styles.figure}>
                        <div className={styles.photo}>
                            <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 64rem) 600px, 100vw" style={photo.focus ? { objectPosition: photo.focus } : undefined} />
                        </div>
                        <figcaption className={styles.credit}>
                            Photo: {photo.credit.name}, {photo.credit.section}
                        </figcaption>
                    </figure>
                )}
            </div>
        </section>
    );
}
