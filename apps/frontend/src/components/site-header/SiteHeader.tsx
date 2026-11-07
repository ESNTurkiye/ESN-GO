import Link from "next/link";
import { AccountControls } from "./AccountControls";
import { MainNav } from "./MainNav";
import { MobileMenu } from "./MobileMenu";
import styles from "./SiteHeader.module.scss";

/**
 * Header (wireframe H1): logo top left, the same three sections on every page,
 * "Log in" as a secondary action (after login: name + "Log out"). Mobile: logo + 44×44 menu button.
 */
export function SiteHeader() {
    return (
        <header className={styles.header}>
            <div className={`container ${styles.bar}`}>
                <Link href="/" className={styles.logo} aria-label="ESN GO, home">
                    <span aria-hidden="true">
                        ESN <span className={styles.logoAccent}>GO</span>
                    </span>
                </Link>

                <MainNav className={styles.desktopNav} linkClassName={styles.navLink} />

                <div className={styles.actions}>
                    <AccountControls />
                </div>

                <MobileMenu />
            </div>
        </header>
    );
}
