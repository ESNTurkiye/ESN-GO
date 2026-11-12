"use client";

import Image from "next/image";
import Link from "next/link";
import esnStar from "@/assets/brand/esn-star.png";
import { ButtonLink, buttonClassName } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";
import { LOGIN } from "@/content/login";
import { rememberReturnPath } from "@/lib/auth";
import { clearSession, useSession } from "@/lib/session";
import { useLoginHref } from "@/lib/useLoginHref";
import styles from "./page.module.scss";

/**
 * Where to go after login: "?next=/places/new" (links that know it), otherwise the page
 * remembered when "Log in" was clicked. Only paths on this site.
 */
function rememberNext() {
  const next = new URLSearchParams(window.location.search).get("next");
  if (next?.startsWith("/") && !next.startsWith("//")) {
    rememberReturnPath(next);
  }
}

/** ESN star + "Erasmus Student Network" + the ESN GO wordmark: the top of the card. */
function Brand() {
  return (
    <>
      <Image src={esnStar} alt="" width={64} height={64} preload />
      <p className={styles.network}>{LOGIN.network}</p>
      <h1 className={styles.title}>
        ESN <span className={styles.titleAccent}>GO</span>
      </h1>
    </>
  );
}

export function LoginPanel() {
  const session = useSession();
  const loginHref = useLoginHref();

  if (session) {
    return (
      <div className={styles.panel}>
        <Brand />
        <p className={styles.lead}>
          {session.name}
          {session.section ? `, ${session.section}` : ""}
        </p>
        <div className={styles.actions}>
          <ButtonLink href="/places/new">Add a place</ButtonLink>
          <button
            type="button"
            className={buttonClassName("secondary")}
            onClick={clearSession}
          >
            Log out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.panel}>
      <Brand />

      <div className={styles.actions}>
        {loginHref ? (
          // ESN Accounts is another site: a plain <a>, not next/link.
          <a
            href={loginHref}
            className={buttonClassName("primary", true, styles.esnButton)}
            onClick={rememberNext}
          >
            <Image src={esnStar} alt="" width={24} height={24} />
            {LOGIN.action}
          </a>
        ) : (
          // API address missing (local dev without .env.local): not a broken link.
          <span
            className={buttonClassName(
              "primary",
              true,
              `${styles.esnButton} ${styles.disabled}`,
            )}
            aria-disabled="true"
            title="NEXT_PUBLIC_API_URL is not set"
          >
            <Image src={esnStar} alt="" width={24} height={24} />
            {LOGIN.action}
          </span>
        )}
        <Link href={LOGIN.browse.href} className={styles.browse}>
          {LOGIN.browse.label}
          <Icon name="chevron-forward-outline" size={20} />
        </Link>
      </div>

      <Link href={LOGIN.privacy.href} className={styles.privacy}>
        {LOGIN.privacy.label}
      </Link>
    </div>
  );
}
