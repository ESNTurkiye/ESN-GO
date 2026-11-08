"use client";

import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import type { City } from "@/lib/api";
import { rememberReturnPath } from "@/lib/auth";
import { ApiError, api } from "@/lib/client-api";
import { EMPTY_FORM, formFromPlace } from "@/lib/place-form";
import type { Place } from "@/lib/places";
import { useSession } from "@/lib/session";
import { DeletePlace } from "./DeletePlace";
import { PlaceForm } from "./PlaceForm";
import styles from "./PlaceFormPage.module.scss";

type PlaceFormPageProps = {
  cities: City[];
  /** Edit an existing place; without it the form adds a new one. */
  placeId?: string;
};

type Load =
  | { state: "loading" }
  | { state: "ready"; place: Place | null }
  | { state: "missing" }
  | { state: "forbidden"; place: Place }
  | { state: "error"; message: string };

/**
 * /places/new and /places/{id}/edit. Login is asked here, only when adding or editing
 * (standard: visitors browse everything without logging in). The session is known only
 * in the browser, so the page decides after it loads. Once the form is shown it stays,
 * even if the login runs out: the form then says so and keeps what was typed.
 */
export function PlaceFormPage({ cities, placeId }: PlaceFormPageProps) {
  const session = useSession();
  const [hydrated, setHydrated] = useState(false);
  const [started, setStarted] = useState(false);
  const [load, setLoad] = useState<Load>(
    placeId ? { state: "loading" } : { state: "ready", place: null },
  );
  const [deleted, setDeleted] = useState<string | null>(null);

  useEffect(() => setHydrated(true), []);
  useEffect(() => {
    if (session) setStarted(true);
  }, [session]);

  // Edit: the place as it is now (not the cached page), and whether it is yours.
  // The session is read once when loading; a later expiry is handled by the form.
  // biome-ignore lint/correctness/useExhaustiveDependencies: see above
  useEffect(() => {
    if (!placeId || !started) return;
    let cancelled = false;
    api<Place>(`/places/${encodeURIComponent(placeId)}`)
      .then((place) => {
        if (cancelled) return;
        const me = session;
        const allowed =
          me && (me.userId === place.authorId || me.role === "admin");
        setLoad(
          allowed ? { state: "ready", place } : { state: "forbidden", place },
        );
      })
      .catch((err) => {
        if (cancelled) return;
        if (err instanceof ApiError && err.status === 404) {
          setLoad({ state: "missing" });
        } else {
          setLoad({
            state: "error",
            message:
              err instanceof ApiError
                ? err.message
                : "We couldn't load the place. Try again.",
          });
        }
      });
    return () => {
      cancelled = true;
    };
  }, [placeId, started]);

  const path = placeId ? `/places/${placeId}/edit` : "/places/new";

  if (!hydrated) return <div className={styles.loading} aria-hidden="true" />;

  if (!started) {
    return (
      <div className={styles.panel}>
        <p className={styles.lead}>
          {placeId
            ? "Log in with your ESN account first to edit this place."
            : "Log in with your ESN account first. After logging in you come straight back to this form."}
        </p>
        <ButtonLink
          href={`/login?next=${encodeURIComponent(path)}`}
          onClick={() => rememberReturnPath(path)}
        >
          Log in
        </ButtonLink>
      </div>
    );
  }

  if (deleted) {
    return (
      <div className={styles.panel}>
        <output className={styles.lead}>{deleted} is deleted.</output>
        <div className={styles.actions}>
          <ButtonLink href="/places/new">Add a place</ButtonLink>
          <ButtonLink href="/explore" variant="secondary">
            Explore places
          </ButtonLink>
        </div>
      </div>
    );
  }

  if (load.state === "loading") {
    return <output className={styles.lead}>Loading the place…</output>;
  }
  if (load.state === "missing") {
    return (
      <div className={styles.panel}>
        <p className={styles.lead}>
          We couldn't find this place. It may have been deleted or hidden by an
          admin.
        </p>
        <ButtonLink href="/places/new" variant="secondary">
          Add a place
        </ButtonLink>
      </div>
    );
  }
  if (load.state === "forbidden") {
    return (
      <div className={styles.panel}>
        <p className={styles.lead}>
          You can only edit places you added. {load.place.name} was added by{" "}
          {load.place.authorName}.
        </p>
        <ButtonLink href={`/places/${load.place.placeId}`} variant="secondary">
          Back to {load.place.name}
        </ButtonLink>
      </div>
    );
  }
  if (load.state === "error") {
    return (
      <div className={styles.panel}>
        <p className={styles.lead} role="alert">
          {load.message}
        </p>
      </div>
    );
  }

  const place = load.place;
  return (
    <>
      <PlaceForm
        formId={place ? place.placeId : "new"}
        initial={place ? formFromPlace(place) : EMPTY_FORM}
        cities={cities}
      />
      {place && (
        <DeletePlace place={place} onDeleted={() => setDeleted(place.name)} />
      )}
    </>
  );
}
