/**
 * Login screen: no site header or footer, as people expect from a login page.
 * One white card centred on a grey backdrop, on phones too (like ga.esn.org).
 */
import styles from "./layout.module.scss";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.shell}>
      <main id="main-content" tabIndex={-1} className={styles.card}>
        {children}
      </main>
    </div>
  );
}
