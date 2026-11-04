/**
 * ESN Accounts (CAS) login. Matches apps/backend/src/functions/auth/handler.ts:
 * 1. accounts.esn.org/cas/login?service=<API>/auth/callback?returnTo=<site>
 * 2. the API validates the ticket and sends the browser to <site>/auth/callback#token=…
 * 3. /auth/callback stores the session (src/lib/session.ts) and goes back to the page
 *    the visitor was on.
 * The service URL is built the same way as in the backend, so CAS accepts the ticket.
 * <site> must be in the backend's AllowedOrigins, otherwise the API answers 400.
 */
const CAS_LOGIN = "https://accounts.esn.org/cas/login";
const RETURN_PATH_KEY = "esngo:returnPath";

/**
 * Where ESN sends the visitor back to. NEXT_PUBLIC_SITE_URL wins when set (Vercel previews:
 * one fixed address the backend allows); otherwise the address the visitor is on.
 */
export function siteOrigin(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (configured) return configured;
  return typeof window === "undefined"
    ? "http://localhost:3000"
    : window.location.origin;
}

/** Null when the API address is not configured (local dev without .env.local). */
export function loginUrl(site: string): string | null {
  const api = process.env.NEXT_PUBLIC_API_URL;
  if (!api) return null;

  const service = new URL("/auth/callback", api);
  service.searchParams.set("returnTo", site);

  const login = new URL(CAS_LOGIN);
  login.searchParams.set("service", service.toString());
  return login.toString();
}

/** Called when "Log in" is clicked: come back to this page afterwards. */
export function rememberReturnPath() {
  try {
    sessionStorage.setItem(
      RETURN_PATH_KEY,
      window.location.pathname + window.location.search,
    );
  } catch {
    // Storage blocked (private mode): the visitor lands on the home page instead.
  }
}

/** The remembered page, once. Only paths on this site ("/…", never "//…"). */
export function takeReturnPath(): string {
  try {
    const path = sessionStorage.getItem(RETURN_PATH_KEY);
    sessionStorage.removeItem(RETURN_PATH_KEY);
    if (
      path?.startsWith("/") &&
      !path.startsWith("//") &&
      !path.startsWith("/auth/")
    ) {
      return path;
    }
  } catch {
    // ignore
  }
  return "/";
}
