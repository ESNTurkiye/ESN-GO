import type { Metadata } from "next";
import { Icon } from "@/components/ui/Icon";
import { PRIVACY } from "@/content/privacy";
import { ESN_TURKIYE_URL } from "@/lib/links";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "Privacy",
  description: "What ESN GO keeps about you and why.",
};

/** /privacy: linked from the footer and the login screen. */
export default function PrivacyPage() {
  return (
    <div className="container">
      <div className={styles.page}>
        <h1>{PRIVACY.title}</h1>
        <p className={styles.lead}>{PRIVACY.lead}</p>

        {PRIVACY.sections.map((section) => (
          <section key={section.title} className={styles.section}>
            <h2 className={styles.sectionTitle}>{section.title}</h2>
            <ul className={styles.list}>
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ))}

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{PRIVACY.contactTitle}</h2>
          <p className={styles.text}>{PRIVACY.contact}</p>
          <a href={ESN_TURKIYE_URL} className={styles.link}>
            {PRIVACY.contactLink}
            <Icon name="open-outline" size={20} label="(another site)" />
          </a>
        </section>
      </div>
    </div>
  );
}
