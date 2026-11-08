"use client";

import { useRef, useState } from "react";
import { buttonClassName } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";
import { ApiError, api } from "@/lib/client-api";
import { clearDraft } from "@/lib/place-form";
import type { Place } from "@/lib/places";
import styles from "./PlaceFormPage.module.scss";

/**
 * "Delete place" with a confirmation (standard: Dialog, only for what can't be undone;
 * focus stays inside, Esc closes, the button names the action). Native <dialog>.
 */
export function DeletePlace({
  place,
  onDeleted,
}: {
  place: Place;
  onDeleted: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
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

  return (
    <section aria-labelledby="delete-title" className={styles.danger}>
      <h2 id="delete-title" className={styles.dangerTitle}>
        Delete this place
      </h2>
      <p className={styles.help}>
        It disappears from ESN GO for everyone. This can't be undone.
      </p>
      <button
        type="button"
        className={buttonClassName("secondary", false, styles.dangerButton)}
        onClick={() => {
          setProblem(null);
          dialog.current?.showModal();
        }}
      >
        <Icon name="trash-outline" size={20} />
        Delete place
      </button>

      <dialog
        ref={dialog}
        className={styles.dialog}
        aria-labelledby="delete-dialog-title"
      >
        <h2 id="delete-dialog-title" className={styles.dangerTitle}>
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
    </section>
  );
}
