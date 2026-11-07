import { useMemo, useSyncExternalStore } from "react";

/**
 * The logged-in ESNer, kept in this browser (localStorage) until the token expires.
 * The token is signed by the API; the name and section shown here are read from it
 * for display only. The API checks the signature on every request.
 * Logout only forgets the token here; the ESN Accounts session is not touched.
 */
export type Session = {
    token: string;
    /** Seconds since 1970, from the API. */
    expiresAt: number;
    userId: string;
    name: string;
    section?: string;
    role?: string;
};

const KEY = "esngo:session";
/** localStorage's own "storage" event only reaches other tabs; this one reaches this tab. */
const CHANGE = "esngo:session-change";

/** Token payload (base64url JSON, UTF-8: names like "Hakkı Erdem Günal"). */
function readPayload(token: string): Record<string, unknown> | null {
    try {
        const part = token.split(".")[1] ?? "";
        const base64 = part.replace(/-/g, "+").replace(/_/g, "/");
        const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
        const bytes = Uint8Array.from(atob(padded), (c) => c.charCodeAt(0));
        return JSON.parse(new TextDecoder().decode(bytes));
    } catch {
        return null;
    }
}

export function sessionFromToken(token: string, expiresAt: number): Session | null {
    const payload = readPayload(token);
    if (!payload || typeof payload.sub !== "string") return null;
    const text = (value: unknown) => (typeof value === "string" ? value : undefined);
    return {
        token,
        expiresAt,
        userId: payload.sub,
        name: text(payload.name) ?? payload.sub,
        section: text(payload.section),
        role: text(payload.role),
    };
}

function parse(raw: string | null): Session | null {
    if (!raw) return null;
    try {
        const session = JSON.parse(raw) as Session;
        return session.expiresAt * 1000 > Date.now() ? session : null;
    } catch {
        return null;
    }
}

function changed() {
    window.dispatchEvent(new Event(CHANGE));
}

export function saveSession(session: Session) {
    try {
        localStorage.setItem(KEY, JSON.stringify(session));
    } catch {
        // Storage blocked: the visitor stays logged out.
    }
    changed();
}

export function clearSession() {
    try {
        localStorage.removeItem(KEY);
    } catch {
        // ignore
    }
    changed();
}

function subscribe(onChange: () => void) {
    window.addEventListener("storage", onChange);
    window.addEventListener(CHANGE, onChange);
    return () => {
        window.removeEventListener("storage", onChange);
        window.removeEventListener(CHANGE, onChange);
    };
}

function readRaw() {
    try {
        return localStorage.getItem(KEY);
    } catch {
        return null;
    }
}

/** The current session outside React (event handlers, effects), or null. */
export function readSession(): Session | null {
    return parse(readRaw());
}

/**
 * The current session, or null. Null on the server and in the first render, so the
 * page HTML is the same for everyone; the header switches after the page loads.
 */
export function useSession(): Session | null {
    const raw = useSyncExternalStore(subscribe, readRaw, () => null);
    return useMemo(() => parse(raw), [raw]);
}
