import Image from "next/image";
import Link from "next/link";
import esnTurkiyeLogo from "@/assets/brand/esn-turkiye-colour.png";
import { Icon } from "@/components/ui/Icon";
import { ESN_TURKIYE_URL, FEEDBACK_URL, INSTAGRAM_URL } from "@/lib/links";
import styles from "./SiteFooter.module.scss";

/**
 * Footer on every page (standard: Güven; wireframe note "Footer: güven"):
 * the ESN Türkiye logo and "An ESN Türkiye WebTeam project", Privacy and Feedback links,
 * Instagram, "Back to top".
 * Logo: ESN Türkiye's official colour version (esnturkiye/esn-assets), used whole,
 * with the clear space of the original file.
 */
export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <a href={ESN_TURKIYE_URL} className={styles.logoLink}>
            <Image
              src={esnTurkiyeLogo}
              alt="ESN Türkiye"
              className={styles.logo}
              width={101}
            />
          </a>
          <p>An ESN Türkiye WebTeam project</p>
        </div>

        <nav aria-label="Footer" className={styles.nav}>
          <ul>
            <li>
              <Link href="/privacy">Privacy</Link>
            </li>
            {FEEDBACK_URL && (
              <li>
                <a href={FEEDBACK_URL}>Feedback</a>
              </li>
            )}
            <li>
              <a href={INSTAGRAM_URL}>
                Instagram
                <Icon name="open-outline" size={20} label="(another site)" />
              </a>
            </li>
          </ul>
        </nav>

        <a href="#top" className={styles.top}>
          Back to top
          <Icon name="arrow-up-outline" size={20} />
        </a>
      </div>
    </footer>
  );
}
