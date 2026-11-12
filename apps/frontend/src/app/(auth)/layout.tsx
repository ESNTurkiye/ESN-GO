import Link from "next/link";
import styles from "./layout.module.scss";

/**
 * Login screen: no site header or footer, as people expect from a login page.
 * The ESN GO wordmark (back to home) above one centred card, Privacy below it.
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.shell}>
      <Link href="/" className={styles.logo} aria-label="ESN GO, home">
        <span aria-hidden="true">
          ESN <span className={styles.logoAccent}>GO</span>
        </span>
      </Link>

      <main id="main-content" tabIndex={-1} className={styles.card}>
        {children}
      </main>

      <p className={styles.footer}>
        <Link href="/privacy">Privacy</Link>
        <span aria-hidden="true">·</span>
        <span>An ESN Türkiye WebTeam project</span>
      </p>
    </div>
  );
}
