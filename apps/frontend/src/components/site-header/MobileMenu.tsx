"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Icon } from "../ui/Icon";
import { LoginButton } from "./LoginButton";
import { MainNav } from "./MainNav";
import styles from "./SiteHeader.module.scss";

/**
 * Mobile menu: a disclosure under the header. Closes on Esc (focus back to the button),
 * on a link tap and when the page changes.
 */
export function MobileMenu({ loginHref }: { loginHref: string | null }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const buttonRef = useRef<HTMLButtonElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: close whenever the route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className={styles.mobile}>
      <button
        ref={buttonRef}
        type="button"
        className={styles.menuButton}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
      >
        <Icon name={open ? "close-outline" : "menu-outline"} />
      </button>

      <div id="mobile-menu" className={styles.panel} hidden={!open}>
        <div className="container">
          <MainNav
            linkClassName={styles.panelLink}
            onNavigate={() => setOpen(false)}
          />
          <LoginButton href={loginHref} block />
        </div>
      </div>
    </div>
  );
}
