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

export function LoginPanel() {
  const session = useSession();
  const loginHref = useLoginHref();

  if (session) {
    return (
      <div>
        <h1 className={styles.title}>You're logged in</h1>
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
    <div>
      <h1 className={styles.title}>{LOGIN.title}</h1>
      <p className={styles.lead}>{LOGIN.body}</p>

      <div className={styles.facts}>
        <section aria-labelledby="receive-title">
          <h2 id="receive-title" className={styles.factsTitle}>
            {LOGIN.receiveTitle}
          </h2>
          <ul className={styles.list}>
            {LOGIN.receive.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="use-title">
          <h2 id="use-title" className={styles.factsTitle}>
            {LOGIN.useTitle}
          </h2>
          <ul className={styles.list}>
            {LOGIN.use.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </section>
      </div>

      <p className={styles.note}>
        <Icon name="alert-circle-outline" size={20} />
        <span>{LOGIN.sso}</span>
      </p>

      <div className={styles.actions}>
        {loginHref ? (
          // ESN Accounts is another site: a plain <a>, not next/link.
          <a
            href={loginHref}
            className={buttonClassName("primary", false, styles.esnButton)}
            onClick={rememberNext}
          >
            {/* The ESN star from ESN Türkiye's logo (esn-assets); the text names it. */}
            <Image src={esnStar} alt="" width={24} height={24} />
            {LOGIN.action}
          </a>
        ) : (
          // API address missing (local dev without .env.local): not a broken link.
          <span
            className={buttonClassName(
              "primary",
              false,
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

      <p className={styles.session}>{LOGIN.session}</p>
    </div>
  );
}
