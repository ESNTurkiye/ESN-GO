"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { clearSession, type Session } from "@/lib/session";
import { Icon } from "../ui/Icon";
import styles from "./SiteHeader.module.scss";

/**
 * Logged-in ESNer (wireframe 00 note: "profile menu: avatar + My places, Log out"): an icon
 * button in the header; the name is inside the menu, not in the bar (8 Nov, Kayra).
 * Disclosure: closes on Esc (focus back to the button), on a click outside, on a link and
 * when the page changes.
 */
export function ProfileMenu({ session }: { session: Session }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuId = useId();
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: close whenever the route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    const onClick = (event: MouseEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  return (
    <div ref={root} className={styles.profile}>
      <button
        ref={button}
        type="button"
        className={styles.profileButton}
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={`Account: ${session.name}`}
        onClick={() => setOpen((value) => !value)}
      >
        <Icon name="person-circle-outline" size={32} />
      </button>
      <div id={menuId} className={styles.profilePanel} hidden={!open}>
        <ProfileLinks session={session} onDone={() => setOpen(false)} />
      </div>
    </div>
  );
}

/** Name and section, then My places and Log out. Also the mobile menu's account part. */
export function ProfileLinks({
  session,
  onDone,
}: {
  session: Session;
  onDone?: () => void;
}) {
  return (
    <>
      <div className={styles.profileWho}>
        <Icon name="person-circle-outline" size={32} />
        <div>
          <p className={styles.profileName}>{session.name}</p>
          {session.section && (
            <p className={styles.profileSection}>{session.section}</p>
          )}
        </div>
      </div>
      <ul className={styles.profileList}>
        <li>
          <Link
            href="/me/places"
            className={styles.profileLink}
            onClick={onDone}
          >
            <Icon name="list-outline" size={20} />
            My places
          </Link>
        </li>
        <li>
          <Link
            href="/places/new"
            className={styles.profileLink}
            onClick={onDone}
          >
            <Icon name="add-outline" size={20} />
            Add a place
          </Link>
        </li>
        <li>
          <button
            type="button"
            className={styles.profileLink}
            onClick={() => {
              onDone?.();
              clearSession();
            }}
          >
            <Icon name="log-out-outline" size={20} />
            Log out
          </button>
        </li>
      </ul>
    </>
  );
}

/** Pages where "Add a place" sits in the header: home, Destinations, Explore! (8 Nov). */
export function useShowAddPlace(): boolean {
  const pathname = usePathname();
  return (
    pathname === "/" ||
    pathname.startsWith("/destinations") ||
    pathname.startsWith("/explore")
  );
}
