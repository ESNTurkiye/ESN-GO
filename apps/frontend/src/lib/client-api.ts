"use client";

import { clearSession, readSession } from "./session";

/**
 * API calls from the browser: lists with filters, the place form, My places.
 * Logged-in calls send the token from src/lib/session.ts.
 */

export class ApiError extends Error {
  constructor(
    readonly status: number,
    /** API error code (BAD_REQUEST, FORBIDDEN…); "SESSION" when the login ran out. */
    readonly code: string,
    message: string,
  ) {
    super(message);
  }
}

function token(): string | null {
  return readSession()?.token ?? null;
}

export function apiBase(): string | null {
  return process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? null;
}

type Options = { method?: string; body?: unknown; auth?: boolean };

export async function api<T>(path: string, options: Options = {}): Promise<T> {
  const base = apiBase();
  if (!base) throw new ApiError(0, "CONFIG", "NEXT_PUBLIC_API_URL is not set.");

  const headers: Record<string, string> = {};
  if (options.auth) {
    const t = token();
    if (!t) {
      throw new ApiError(401, "SESSION", "Log in with your ESN account first.");
    }
    headers.Authorization = `Bearer ${t}`;
  }
  if (options.body !== undefined) headers["content-type"] = "application/json";

  let res: Response;
  try {
    res = await fetch(`${base}${path}`, {
      method: options.method ?? "GET",
      headers,
      body:
        options.body === undefined ? undefined : JSON.stringify(options.body),
    });
  } catch {
    throw new ApiError(
      0,
      "NETWORK",
      "We couldn't reach ESN GO. Check your connection and try again.",
    );
  }

  if (res.status === 204) return undefined as T;
  const data = await res.json().catch(() => undefined);

  // 401, or a 403 without our error body: API Gateway refused the token (expired or invalid).
  if (
    options.auth &&
    (res.status === 401 || (res.status === 403 && !data?.error))
  ) {
    clearSession();
    throw new ApiError(
      401,
      "SESSION",
      "Your login has expired. Log in again; your changes on this page are kept.",
    );
  }
  if (!res.ok) {
    throw new ApiError(
      res.status,
      data?.error?.code ?? "ERROR",
      data?.error?.message ??
        `Something went wrong (${res.status}). Try again.`,
    );
  }
  return data as T;
}
