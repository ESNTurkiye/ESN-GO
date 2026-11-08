"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { DeletePlace } from "@/components/place-form/DeletePlace";
import { PlaceCard } from "@/components/places/PlaceCard";
import { PlaceCardSkeleton } from "@/components/places/PlaceCardSkeleton";
import { ButtonLink, buttonClassName } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";
import type { City } from "@/lib/api";
import { rememberReturnPath } from "@/lib/auth";
import { ApiError, api } from "@/lib/client-api";
import type { Place, PlacePage } from "@/lib/places";
import { useSession } from "@/lib/session";
import styles from "./page.module.scss";

const PAGE_SIZE = 12;
const PATH = "/me/places";

type State =
  | { kind: "loading" }
  | { kind: "ready"; places: Place[]; nextCursor?: string; more: boolean }
  | { kind: "error"; message: string }
  | { kind: "session" };

/**
 * My places: the places this ESNer added, newest first, hidden ones too (status from
 * GET /me/places). Each card links to the place and has Edit and Delete under it.
 * Login is asked here only (standard: visitors browse without logging in).
 */
export function MyPlaces({ cities }: { cities: City[] }) {
  const session = useSession();
  const [hydrated, setHydrated] = useState(false);
  const [state, setState] = useState<State>({ kind: "loading" });
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => setHydrated(true), []);

  const load = useCallback(async (cursor?: string) => {
    const query = new URLSearchParams({ limit: String(PAGE_SIZE) });
    if (cursor) query.set("cursor", cursor);
    try {
      const page = await api<PlacePage>(`/me/places?${query}`, { auth: true });
      setState((prev) => ({
        kind: "ready",
        places:
          cursor && prev.kind === "ready"
            ? [...prev.places, ...page.places]
            : page.places,
        nextCursor: page.nextCursor,
        more: false,
      }));
    } catch (err) {
      if (err instanceof ApiError && err.code === "SESSION") {
        setState({ kind: "session" });
      } else {
        setState({
          kind: "error",
          message:
            err instanceof ApiError
              ? err.message
              : "We couldn't load your places. Try again.",
        });
      }
    }
  }, []);

  // Load once the session is known (only in the browser).
  const userId = session?.userId;
  useEffect(() => {
    if (userId) load();
  }, [userId, load]);

  if (!hydrated) return <ListSkeleton />;

  if (!session && state.kind !== "session") {
    return (
      <div className={styles.panel}>
        <p>Log in with your ESN account to see the places you added.</p>
        <ButtonLink
          href={`/login?next=${encodeURIComponent(PATH)}`}
          onClick={() => rememberReturnPath(PATH)}
        >
          Log in
        </ButtonLink>
      </div>
    );
  }

  if (state.kind === "session") {
    return (
      <div className={styles.panel} role="alert">
        <p>Your session expired. Log in again to see your places.</p>
        <ButtonLink
          href={`/login?next=${encodeURIComponent(PATH)}`}
          onClick={() => rememberReturnPath(PATH)}
          variant="secondary"
        >
          Log in again
        </ButtonLink>
      </div>
    );
  }

  if (state.kind === "loading") return <ListSkeleton />;

  if (state.kind === "error") {
    return (
      <div className={styles.panel} role="alert">
        <p>{state.message}</p>
        <button
          type="button"
          className={buttonClassName("secondary")}
          onClick={() => {
            setState({ kind: "loading" });
            load();
          }}
        >
          Try again
        </button>
      </div>
    );
  }

  const { places, nextCursor, more } = state;

  if (places.length === 0) {
    return (
      <div className={styles.empty}>
        {notice && <output className={styles.notice}>{notice}</output>}
        <Icon name="location-outline" size={32} />
        <p className={styles.emptyTitle}>You haven't added a place yet.</p>
        <p className={styles.help}>
          Share a café, a view or a cheap dinner spot you'd show a friend
          arriving in your city.
        </p>
        <ButtonLink href="/places/new">
          <Icon name="add-outline" size={20} />
          Add your first place
        </ButtonLink>
      </div>
    );
  }

  return (
    <>
      <div className={styles.bar}>
        <p className={styles.count} aria-live="polite">
          {places.length}
          {nextCursor ? "+" : ""} {places.length === 1 ? "place" : "places"}
        </p>
        <ButtonLink href="/places/new">
          <Icon name="add-outline" size={20} />
          Add a place
        </ButtonLink>
      </div>

      {notice && <output className={styles.notice}>{notice}</output>}

      <ul className={styles.grid}>
        {places.map((place) => (
          <li key={place.placeId}>
            <PlaceCard place={place} cities={cities}>
              <div className={styles.extra}>
                {place.status === "hidden" && (
                  <p className={styles.hidden}>
                    <Icon name="alert-circle-outline" size={20} />
                    <span>
                      Hidden by an admin: visitors can't see it. Contact your
                      ESN section if you think this is a mistake.
                    </span>
                  </p>
                )}
                <div className={styles.actions}>
                  <Link
                    href={`/places/${place.placeId}/edit`}
                    className={styles.action}
                  >
                    <Icon name="create-outline" size={20} />
                    Edit
                    <span className="visually-hidden"> {place.name}</span>
                  </Link>
                  <DeletePlace
                    place={place}
                    compact
                    onDeleted={() => {
                      setNotice(`${place.name} is deleted.`);
                      setState((prev) =>
                        prev.kind === "ready"
                          ? {
                              ...prev,
                              places: prev.places.filter(
                                (p) => p.placeId !== place.placeId,
                              ),
                            }
                          : prev,
                      );
                    }}
                  />
                </div>
              </div>
            </PlaceCard>
          </li>
        ))}
      </ul>

      {nextCursor && (
        <div className={styles.more}>
          <button
            type="button"
            className={buttonClassName("secondary")}
            disabled={more}
            onClick={() => {
              setState({ ...state, more: true });
              load(nextCursor);
            }}
          >
            {more ? "Loading…" : "Load more"}
          </button>
        </div>
      )}
    </>
  );
}

function ListSkeleton() {
  return (
    <output className={styles.grid}>
      <span className="visually-hidden">Loading your places…</span>
      {[0, 1, 2].map((i) => (
        <PlaceCardSkeleton key={i} />
      ))}
    </output>
  );
}
