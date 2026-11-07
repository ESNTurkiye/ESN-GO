"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AccountControls } from "@/components/site-header/AccountControls";
import { takeReturnPath } from "@/lib/auth";
import { readSession, saveSession, sessionFromToken } from "@/lib/session";
import styles from "./page.module.scss";

/** What happened and what to do (standard: Hata mesajları). Codes come from the API. */
const ERRORS: Record<string, string> = {
  login_failed:
    "We couldn't confirm your ESN account. Log in again; if it keeps failing, check that you can log in at accounts.esn.org.",
  esn_unavailable:
    "ESN Accounts didn't answer. Wait a few minutes, then log in again.",
};

/**
 * Reads the token from the address (#token=…), keeps it, removes it from the address bar
 * and history, and goes back to the page where "Log in" was clicked.
 */
export function AuthCallback() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  // The hash can be read only once: it is removed right after. In development React
  // runs effects twice (Strict Mode); without this the second run found no token and
  // showed "Login didn't work" although the login had worked.
  const handled = useRef(false);

  useEffect(() => {
    if (handled.current) return;
    handled.current = true;

    const hash = new URLSearchParams(window.location.hash.slice(1));
    // The token never stays in the address bar, history or a shared link.
    window.history.replaceState(null, "", window.location.pathname);

    const token = hash.get("token");
    const expiresAt = Number(hash.get("expiresAt"));
    const session =
      token && expiresAt ? sessionFromToken(token, expiresAt) : null;
    if (session) {
      saveSession(session);
      router.replace(takeReturnPath());
      return;
    }

    const failure = hash.get("error");
    // No token and no error (e.g. this page reloaded): if already logged in, move on.
    if (!failure && readSession()) {
      router.replace(takeReturnPath());
      return;
    }
    setError(failure ?? "login_failed");
  }, [router]);

  if (!error) {
    return (
      <div className={styles.page}>
        <h1 className={styles.title}>Logging you in…</h1>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Login didn't work</h1>
      <p className={styles.message} role="alert">
        {ERRORS[error] ?? ERRORS.login_failed}
      </p>
      <div className={styles.actions}>
        <AccountControls />
        <Link href="/">Back to the home page</Link>
      </div>
    </div>
  );
}
