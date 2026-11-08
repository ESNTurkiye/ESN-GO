"use client";

import { useId } from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { rememberReturnPath } from "@/lib/auth";
import { useSession } from "@/lib/session";
import styles from "./EsnerBand.module.scss";

type AddPlaceActionProps = {
  label: string;
  /** The place form. */
  href: string;
  loginHint: string;
};

/**
 * "Add a place": straight to the form when logged in; otherwise /login first (what ESN GO
 * receives from ESN Accounts), then ESN login, then back to the form (not the home page).
 */
export function AddPlaceAction({
  label,
  href,
  loginHint,
}: AddPlaceActionProps) {
  const session = useSession();
  const hintId = useId();

  if (session) {
    return (
      <div className={styles.action}>
        <ButtonLink href={href} variant="secondary" className={styles.button}>
          {label}
        </ButtonLink>
      </div>
    );
  }

  return (
    <div className={styles.action}>
      <ButtonLink
        href={`/login?next=${encodeURIComponent(href)}`}
        variant="secondary"
        className={styles.button}
        aria-describedby={hintId}
        onClick={() => rememberReturnPath(href)}
      >
        {label}
      </ButtonLink>
      <p id={hintId} className={styles.hint}>
        {loginHint}
      </p>
    </div>
  );
}
