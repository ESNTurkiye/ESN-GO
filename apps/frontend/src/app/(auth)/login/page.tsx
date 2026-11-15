import type { Metadata } from "next";
import { LoginPanel } from "./LoginPanel";

export const metadata: Metadata = {
  title: "Log in",
  description:
    "ESNers log in with ESN Accounts to add places. See what ESN GO receives before you log in.",
};

/**
 * /login: "Log in" and "Add a place" come here first. The page says what ESN GO receives
 * from ESN Accounts and what for, then the visitor chooses to continue.
 * Layout: (auth), a centred card without the site header and footer.
 */
export default function LoginPage() {
  return <LoginPanel />;
}
