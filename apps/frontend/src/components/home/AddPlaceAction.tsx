"use client";

import { useId } from "react";
import { ButtonLink, buttonClassName } from "@/components/ui/ButtonLink";
import { rememberReturnPath } from "@/lib/auth";
import { useSession } from "@/lib/session";
import { useLoginHref } from "@/lib/useLoginHref";
import styles from "./EsnerBand.module.scss";

type AddPlaceActionProps = {
    label: string;
    /** The place form. */
    href: string;
    loginHint: string;
};

/**
 * "Add a place": straight to the form when logged in; otherwise ESN login first,
 * then back to the form (not to the home page).
 */
export function AddPlaceAction({ label, href, loginHint }: AddPlaceActionProps) {
    const session = useSession();
    const loginHref = useLoginHref();
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
            {loginHref ? (
                <a href={loginHref} className={buttonClassName("secondary", false, styles.button)} aria-describedby={hintId} onClick={() => rememberReturnPath(href)}>
                    {label}
                </a>
            ) : (
                // API not configured (local setup): same look, not clickable.
                <span className={buttonClassName("secondary", false, styles.button)} aria-disabled="true">
                    {label}
                </span>
            )}
            <p id={hintId} className={styles.hint}>
                {loginHint}
            </p>
        </div>
    );
}
