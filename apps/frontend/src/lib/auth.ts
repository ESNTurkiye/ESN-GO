/**
 * ESN Accounts (CAS) login. Matches apps/backend/src/functions/auth/handler.ts:
 * 1. accounts.esn.org/cas/login?service=<API>/auth/callback?returnTo=<site>
 * 2. the API validates the ticket and sends the browser to <site>/auth/callback#token=…
 * The service URL is built the same way as in the backend, so CAS accepts the ticket.
 */
const CAS_LOGIN = "https://accounts.esn.org/cas/login";

/** Null when the API address is not configured (local dev without .env.local). */
export function loginUrl(): string | null {
  const api = process.env.NEXT_PUBLIC_API_URL;
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  if (!api) return null;

  const service = new URL("/auth/callback", api);
  service.searchParams.set("returnTo", site);

  const login = new URL(CAS_LOGIN);
  login.searchParams.set("service", service.toString());
  return login.toString();
}
