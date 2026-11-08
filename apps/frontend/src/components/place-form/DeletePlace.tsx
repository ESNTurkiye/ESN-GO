"use client";

import { useId, useRef, useState } from "react";
import { buttonClassName } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";
import { ApiError, api } from "@/lib/client-api";
import { clearDraft } from "@/lib/place-form";
import type { Place } from "@/lib/places";
import styles from "./PlaceFormPage.module.scss";

/**
 * "Delete place" with a confirmation (standard: Dialog, only for what can't be undone;
 * focus stays inside, Esc closes, the button names the action). Native <dialog>.
 * compact: only a small "Delete" button (a row in My places); otherwise a section
 * at the end of the edit page.
 */
export function DeletePlace({
  place,
  onDeleted,
  compact,
}: {
  place: Place;
  onDeleted: () => void;
  compact?: boolean;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [busy, setBusy] = useState(false);
  const [problem, setProblem] = useState<string | null>(null);

  async function remove() {
    setBusy(true);
    setProblem(null);
    try {
      await api(`/places/${place.placeId}`, { method: "DELETE", auth: true });
      clearDraft(place.placeId);
      dialog.current?.close();
      onDeleted();
    } catch (err) {
      setProblem(
        err instanceof ApiError && err.code === "SESSION"
          ? "Your session expired. Log in again, then delete the place."
          : err instanceof ApiError
            ? err.message
            : "We couldn't delete the place. Try again.",
      );
    } finally {
      setBusy(false);
    }
  }

  const open = () => {
    setProblem(null);
    dialog.current?.showModal();
  };

  const confirm = (
    <dialog ref={dialog} className={styles.dialog} aria-labelledby={titleId}>
      <h2 id={titleId} className={styles.dangerTitle}>
        Delete {place.name}?
      </h2>
      <p>
        The place disappears from ESN GO for everyone. This can't be undone.
      </p>
      {problem && (
        <p className={styles.problem} role="alert">
          <Icon name="alert-circle-outline" size={20} />
          <span>{problem}</span>
        </p>
      )}
      <div className={styles.actions}>
        <button
          type="button"
          className={buttonClassName("secondary")}
          onClick={() => dialog.current?.close()}
        >
          Keep place
        </button>
        <button
          type="button"
          className={buttonClassName("primary", false, styles.dangerSolid)}
          onClick={remove}
          disabled={busy}
        >
          {busy ? "Deleting…" : "Delete place"}
        </button>
      </div>
    </dialog>
  );

  if (compact) {
    return (
      <>
        <button type="button" className={styles.deleteLink} onClick={open}>
          <Icon name="trash-outline" size={20} />
          Delete
          <span className="visually-hidden"> {place.name}</span>
        </button>
        {confirm}
      </>
    );
  }

  return (
    <section aria-labelledby={`${titleId}-section`} className={styles.danger}>
      <h2 id={`${titleId}-section`} className={styles.dangerTitle}>
        Delete this place
      </h2>
      <p className={styles.help}>
        It disappears from ESN GO for everyone. This can't be undone.
      </p>
      <button
        type="button"
        className={buttonClassName("secondary", false, styles.dangerButton)}
        onClick={open}
      >
        <Icon name="trash-outline" size={20} />
        Delete place
      </button>
      {confirm}
    </section>
  );
}
