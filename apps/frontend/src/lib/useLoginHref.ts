import { useEffect, useState } from "react";
import { loginUrl, siteOrigin } from "./auth";

/**
 * The ESN Accounts login address, or null when the API is not configured.
 * Same value on the server and in the first render (no hydration mismatch); after
 * loading, the visitor's own address is used if NEXT_PUBLIC_SITE_URL is not set.
 */
export function useLoginHref(): string | null {
    const [href, setHref] = useState(() => loginUrl(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"));
    useEffect(() => {
        setHref(loginUrl(siteOrigin()));
    }, []);
    return href;
}
