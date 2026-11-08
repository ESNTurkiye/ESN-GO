"use client";

import { useId, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { ApiError } from "@/lib/client-api";
import type { FormErrors, FormPhoto } from "@/lib/place-form";
import { LIMITS } from "@/lib/places";
import { PHOTO_TYPES, photoProblem } from "@/lib/uploads";
import { FieldError } from "./Field";
import styles from "./PlaceForm.module.scss";

/** A photo on its way to S3; it joins the place's photos when the upload is done. */
export type PendingPhoto = {
  id: string;
  file: File;
  preview: string;
  alt: string;
  progress: number;
  error?: string;
};

type PhotosStepProps = {
  photos: FormPhoto[];
  pending: PendingPhoto[];
  /** Local previews of finished uploads (key → blob:), so nothing flickers. */
  previews: Record<string, string>;
  errors: FormErrors;
  onAddFiles: (files: File[]) => void;
  onRetry: (id: string) => void;
  onRemovePending: (id: string) => void;
  onPendingAlt: (id: string, alt: string) => void;
  onPhotosChange: (photos: FormPhoto[]) => void;
};

/**
 * Step 4, Photos (standard: ImageUpload: choose → upload → preview, progress and errors
 * in words). Up to 5; the first is the cover. Alt text is required: without it a photo
 * is not saved (standard: Fotoğraf kuralları).
 */
export function PhotosStep({
  photos,
  pending,
  previews,
  errors,
  onAddFiles,
  onRetry,
  onRemovePending,
  onPendingAlt,
  onPhotosChange,
}: PhotosStepProps) {
  const inputId = useId();
  const [rejected, setRejected] = useState<string[]>([]);
  const [dragging, setDragging] = useState(false);
  const room = LIMITS.photos - photos.length - pending.length;

  function take(list: FileList | null) {
    if (!list) return;
    const files = [...list];
    const problems: string[] = [];
    const ok: File[] = [];
    for (const file of files) {
      const problem = photoProblem(file);
      if (problem) problems.push(problem);
      else ok.push(file);
    }
    if (ok.length > room) {
      problems.push(
        `You can add up to ${LIMITS.photos} photos. ${ok.length - Math.max(room, 0)} of them were left out; remove a photo to add another.`,
      );
    }
    setRejected(problems);
    if (room > 0) onAddFiles(ok.slice(0, room));
  }

  function move(index: number) {
    // "Make cover": this photo goes first, the others keep their order.
    const next = [...photos];
    const [photo] = next.splice(index, 1);
    onPhotosChange([photo, ...next]);
  }

  return (
    <div className={styles.stepBody}>
      <p className={styles.help}>
        Photos you took yourself: up to {LIMITS.photos}, JPEG, PNG or WebP,
        under 5 MB each. The first photo is the cover. Photos are optional, but
        places with photos get more visits.
      </p>

      {room > 0 ? (
        <label
          htmlFor={inputId}
          className={`${styles.drop} ${dragging ? styles.dropActive : ""}`}
          onDragOver={(event) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(event) => {
            event.preventDefault();
            setDragging(false);
            take(event.dataTransfer.files);
          }}
        >
          <Icon name="image-outline" size={32} />
          <span className={styles.dropTitle}>Choose photos</span>
          <span className={styles.help}>
            or drag them here · {room} more {room === 1 ? "photo" : "photos"}{" "}
            allowed
          </span>
          <input
            id={inputId}
            type="file"
            accept={PHOTO_TYPES.join(",")}
            multiple
            className="visually-hidden"
            onChange={(event) => {
              take(event.target.files);
              event.target.value = "";
            }}
          />
        </label>
      ) : (
        <p className={styles.help}>
          You've added {LIMITS.photos} photos, the most a place can have. Remove
          one to add another.
        </p>
      )}

      {rejected.length > 0 && (
        <div className={styles.alert} role="alert">
          {rejected.map((message) => (
            <p key={message}>
              <Icon name="alert-circle-outline" size={20} />
              <span>{message}</span>
            </p>
          ))}
        </div>
      )}

      {(photos.length > 0 || pending.length > 0) && (
        <ul className={styles.photos}>
          {photos.map((photo, i) => {
            const errorId = `field-photo-${i}-error`;
            const altId = `field-photo-${i}`;
            return (
              <li key={photo.key} className={styles.photo}>
                <div className={styles.photoImage}>
                  {/* Plain img: a preview of the visitor's own upload, not a page image. */}
                  {/* biome-ignore lint/performance/noImgElement: local blob: preview or a just-uploaded file */}
                  <img src={previews[photo.key] ?? photo.url} alt="" />
                  {i === 0 && <span className={styles.cover}>Cover</span>}
                </div>
                <div className={styles.photoFields}>
                  <label htmlFor={altId} className={styles.label}>
                    Describe photo {i + 1}
                  </label>
                  <input
                    id={altId}
                    type="text"
                    value={photo.alt}
                    placeholder="e.g. Tables by the window"
                    aria-invalid={errors[`photo-${i}`] ? true : undefined}
                    aria-describedby={
                      errors[`photo-${i}`] ? errorId : undefined
                    }
                    className={`${styles.input} ${errors[`photo-${i}`] ? styles.invalid : ""}`}
                    onChange={(event) =>
                      onPhotosChange(
                        photos.map((p, j) =>
                          j === i ? { ...p, alt: event.target.value } : p,
                        ),
                      )
                    }
                  />
                  <FieldError id={errorId} message={errors[`photo-${i}`]} />
                  <div className={styles.photoActions}>
                    {i > 0 && (
                      <button
                        type="button"
                        className={styles.linkButton}
                        onClick={() => move(i)}
                      >
                        Make cover
                      </button>
                    )}
                    <button
                      type="button"
                      className={styles.linkButton}
                      onClick={() =>
                        onPhotosChange(photos.filter((_, j) => j !== i))
                      }
                    >
                      Remove
                      <span className="visually-hidden"> photo {i + 1}</span>
                    </button>
                  </div>
                </div>
              </li>
            );
          })}

          {pending.map((item) => {
            const altId = `pending-${item.id}`;
            const percent = Math.round(item.progress * 100);
            return (
              <li key={item.id} className={styles.photo}>
                <div className={styles.photoImage}>
                  {/* biome-ignore lint/performance/noImgElement: local blob: preview */}
                  <img src={item.preview} alt="" />
                </div>
                <div className={styles.photoFields}>
                  {item.error ? (
                    <FieldError id={`${altId}-error`} message={item.error} />
                  ) : (
                    <>
                      <progress
                        className={styles.progress}
                        max={100}
                        value={percent}
                        aria-label={`Uploading ${item.file.name}`}
                      />
                      <p className={styles.help} aria-live="polite">
                        Uploading… {percent}%
                      </p>
                    </>
                  )}
                  <label htmlFor={altId} className={styles.label}>
                    Describe this photo
                  </label>
                  <input
                    id={altId}
                    type="text"
                    value={item.alt}
                    placeholder="e.g. Tables by the window"
                    className={styles.input}
                    onChange={(event) =>
                      onPendingAlt(item.id, event.target.value)
                    }
                  />
                  <div className={styles.photoActions}>
                    {item.error && (
                      <button
                        type="button"
                        className={styles.linkButton}
                        onClick={() => onRetry(item.id)}
                      >
                        Try again
                      </button>
                    )}
                    <button
                      type="button"
                      className={styles.linkButton}
                      onClick={() => onRemovePending(item.id)}
                    >
                      {item.error ? "Remove" : "Cancel"}
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <FieldError id="field-photos-error" message={errors.photos} />
    </div>
  );
}

/** Message for a failed upload (the API's words when it has them). */
export function uploadError(err: unknown): string {
  if (err instanceof ApiError) return err.message;
  return "The photo didn't upload. Try again.";
}
