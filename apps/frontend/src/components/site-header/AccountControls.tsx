"use client";

import { useEffect, useState } from "react";
import { loginUrl, rememberReturnPath, siteOrigin } from "@/lib/auth";
import { clearSession, useSession } from "@/lib/session";
import buttonStyles from "../ui/button.module.scss";
import { LoginButton } from "./LoginButton";
import styles from "./SiteHeader.module.scss";

type AccountControlsProps = {
  /** Full width (mobile menu). */
  block?: boolean;
};

/**
 * Header account slot: "Log in" for visitors, the ESNer's first name and "Log out"
 * after login (wireframe H1). "My places" joins this once that page exists.
 */
export function AccountControls({ block }: AccountControlsProps) {
  const session = useSession();
  // Same address on the server and in the first render (no hydration mismatch);
  // after loading, the visitor's own address is used if NEXT_PUBLIC_SITE_URL is not set.
  const [href, setHref] = useState(() =>
    loginUrl(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  );
  useEffect(() => {
    setHref(loginUrl(siteOrigin()));
  }, []);

  if (session) {
    const firstName = session.name.split(" ")[0];
    return (
      <div className={`${styles.account} ${block ? styles.accountBlock : ""}`}>
        <span
          className={styles.accountName}
          title={[session.name, session.section].filter(Boolean).join(", ")}
        >
          {firstName}
        </span>
        <button
          type="button"
          className={[
            buttonStyles.button,
            buttonStyles.secondary,
            block && buttonStyles.block,
          ]
            .filter(Boolean)
            .join(" ")}
          onClick={clearSession}
        >
          Log out
        </button>
      </div>
    );
  }

  return <LoginButton href={href} block={block} onClick={rememberReturnPath} />;
}
