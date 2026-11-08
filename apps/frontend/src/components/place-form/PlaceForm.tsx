"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { PlaceTypeIcon } from "@/components/places/PlaceTypeIcon";
import { ButtonLink, buttonClassName } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";
import type { City } from "@/lib/api";
import { ApiError, api } from "@/lib/client-api";
import {
  clearDraft,
  type FormErrors,
  type FormPhoto,
  firstInvalidStep,
  loadDraft,
  type PlaceFormValues,
  STEPS,
  type StepIndex,
  saveDraft,
  toRequestBody,
  validateStep,
} from "@/lib/place-form";
import {
  FOOD_OPTIONS,
  LIMITS,
  PLACE_TYPES,
  type Place,
  type PlaceType,
  PRICE_RANGES,
  TRANSPORT_LEVELS,
} from "@/lib/places";
import { PROVINCES, provinceName, TURKEY_CENTER } from "@/lib/provinces";
import { uploadPhoto } from "@/lib/uploads";
import { ChoiceGroup, fieldIds, RatingField, TextField } from "./Field";
import { LocationStep } from "./LocationStep";
import { type PendingPhoto, PhotosStep, uploadError } from "./PhotosStep";
import styles from "./PlaceForm.module.scss";

type PlaceFormProps = {
  /** "new", or the placeId being edited (also the draft's name). */
  formId: string;
  initial: PlaceFormValues;
  /** Destinations (GET /cities): big choices and their map centres. */
  cities: City[];
};

/**
 * The place form: City → Location → Details → Photos, one step at a time with a connected
 * step indicator (standard: Bağlantılılık, at most 4 steps). Typed data is never lost:
 * every change is kept in this browser and comes back after a reload or a new login
 * (standard: Önden düşünme, Oturum süresi doldu). Ends with the success screen
 * ("Your place is live in Kadıköy"; standard: Başarı ekranı).
 */
export function PlaceForm({ formId, initial, cities }: PlaceFormProps) {
  const isNew = formId === "new";
  const pathname = usePathname();
  const headingId = useId();
  const [values, setValues] = useState(initial);
  const [step, setStep] = useState<StepIndex>(0);
  const [reached, setReached] = useState<StepIndex>(isNew ? 0 : 3);
  const [errors, setErrors] = useState<FormErrors>({});
  const [restored, setRestored] = useState(false);
  const [banner, setBanner] = useState<"session" | string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState<Place | null>(null);
  const [pending, setPending] = useState<PendingPhoto[]>([]);
  const [previews, setPreviews] = useState<Record<string, string>>({});
  const pendingRef = useRef(pending);
  pendingRef.current = pending;
  const controllers = useRef(new Map<string, AbortController>());
  const stepHeading = useRef<HTMLHeadingElement>(null);
  // State, not a ref: saving starts on the render after the draft is back, so the
  // empty form never overwrites it (React runs effects twice in development).
  const [draftRead, setDraftRead] = useState(false);

  // A draft from earlier (reload, expired login): bring it back once.
  useEffect(() => {
    const draft = loadDraft(formId);
    if (draft) {
      setValues(draft.values);
      setStep(draft.step);
      setReached(isNew ? draft.step : 3);
      setRestored(true);
    }
    setDraftRead(true);
  }, [formId, isNew]);

  // Keep every change (not before the draft was read, not after saving).
  useEffect(() => {
    if (draftRead && !saved) saveDraft(formId, values, step);
  }, [draftRead, formId, values, step, saved]);

  // Cancel uploads when leaving the page.
  useEffect(() => {
    const running = controllers.current;
    return () => {
      for (const controller of running.values()) controller.abort();
    };
  }, []);

  const onSessionExpired = useCallback(() => setBanner("session"), []);

  const update = useCallback((patch: Partial<PlaceFormValues>) => {
    setValues((v) => ({ ...v, ...patch }));
    // A changed field loses its old message.
    setErrors((e) => {
      const next = { ...e };
      for (const key of Object.keys(patch)) delete next[key];
      if ("lat" in patch) delete next.location;
      if ("photos" in patch) {
        for (const key of Object.keys(next)) {
          if (key.startsWith("photo-")) delete next[key];
        }
      }
      return next;
    });
  }, []);

  function goTo(next: StepIndex) {
    setStep(next);
    setReached((r) => (next > r ? next : r));
    setErrors({});
    // Screen readers and keyboards start at the new step's title.
    requestAnimationFrame(() => stepHeading.current?.focus());
  }

  function focusFirstError(found: FormErrors) {
    const first = Object.keys(found)[0];
    if (!first) return;
    requestAnimationFrame(() => {
      document.getElementById(fieldIds(first).input)?.focus();
    });
  }

  function next() {
    jump((step + 1) as StepIndex);
  }

  /** Forward only through finished steps: stops at the first one with a problem. */
  function jump(target: StepIndex) {
    if (target <= step) return goTo(target);
    for (let s = step; s < target; s++) {
      const found = validateStep(s as StepIndex, values, pending.length > 0);
      if (Object.keys(found).length > 0) {
        if (s !== step) goTo(s as StepIndex);
        setErrors(found);
        focusFirstError(found);
        return;
      }
    }
    goTo(target);
  }

  // ---- uploads ---------------------------------------------------------------------

  function startUpload(item: PendingPhoto) {
    const controller = new AbortController();
    controllers.current.set(item.id, controller);
    const setItem = (patch: Partial<PendingPhoto>) =>
      setPending((list) =>
        list.map((p) => (p.id === item.id ? { ...p, ...patch } : p)),
      );
    uploadPhoto(
      item.file,
      (progress) => setItem({ progress }),
      controller.signal,
    )
      .then(({ key, url }) => {
        // The alt typed while it was uploading comes along.
        const alt = pendingRef.current.find((p) => p.id === item.id)?.alt ?? "";
        setPreviews((p) => ({ ...p, [key]: item.preview }));
        setValues((v) => ({ ...v, photos: [...v.photos, { key, url, alt }] }));
        setPending((list) => list.filter((p) => p.id !== item.id));
      })
      .catch((err) => {
        if (err instanceof ApiError && err.code === "ABORTED") return;
        if (err instanceof ApiError && err.code === "SESSION") {
          onSessionExpired();
        }
        setItem({ error: uploadError(err) });
      })
      .finally(() => controllers.current.delete(item.id));
  }

  function addFiles(files: File[]) {
    const items = files.map((file) => ({
      id: crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file),
      alt: "",
      progress: 0,
    }));
    setPending((list) => [...list, ...items]);
    setErrors((e) => ({ ...e, photos: undefined }));
    items.forEach(startUpload);
  }

  function retry(id: string) {
    const item = pending.find((p) => p.id === id);
    if (!item) return;
    const fresh = { ...item, error: undefined, progress: 0 };
    setPending((list) => list.map((p) => (p.id === id ? fresh : p)));
    startUpload(fresh);
  }

  function removePending(id: string) {
    controllers.current.get(id)?.abort();
    setPending((list) => list.filter((p) => p.id !== id));
  }

  // ---- save --------------------------------------------------------------------------

  async function submit() {
    const uploading = pending.some((p) => !p.error);
    const bad = firstInvalidStep(values, uploading);
    if (bad !== null) {
      const found = validateStep(bad, values, uploading);
      if (bad !== step) goTo(bad);
      setErrors(found);
      focusFirstError(found);
      return;
    }
    setSaving(true);
    setBanner(null);
    try {
      const place = await api<Place>(isNew ? "/places" : `/places/${formId}`, {
        method: isNew ? "POST" : "PUT",
        body: toRequestBody(values),
        auth: true,
      });
      clearDraft(formId);
      setSaved(place);
      window.scrollTo({ top: 0 });
    } catch (err) {
      if (err instanceof ApiError && err.code === "SESSION") {
        setBanner("session");
      } else {
        setBanner(
          err instanceof ApiError
            ? `We couldn't save the place: ${err.message} Your form is kept; fix it and try again.`
            : "We couldn't save the place. Your form is kept; try again.",
        );
      }
    } finally {
      setSaving(false);
    }
  }

  function startOver() {
    clearDraft(formId);
    setValues(initial);
    setStep(0);
    setReached(isNew ? 0 : 3);
    setErrors({});
    setPending([]);
    setRestored(false);
    setSaved(null);
    setBanner(null);
  }

  // ---- city context --------------------------------------------------------------------

  const destination = cities.find((c) => c.cityId === values.cityId);
  const cityName =
    destination?.name ?? provinceName(values.cityId) ?? "Türkiye";
  const center = destination?.mapCenter ?? TURKEY_CENTER;
  const zoom = destination?.mapCenter ? 12 : 5;

  if (saved) {
    return (
      <Success
        place={saved}
        isNew={isNew}
        where={saved.district || cityName}
        onAnother={startOver}
      />
    );
  }

  const others = PROVINCES.filter(
    (p) => !cities.some((c) => c.cityId === p.id),
  );
  const loginHref = `/login?next=${encodeURIComponent(pathname)}`;

  return (
    <form
      className={styles.form}
      aria-labelledby={headingId}
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        if (step === 3) submit();
        else next();
      }}
    >
      {restored && (
        <output className={styles.notice}>
          <Icon name="checkmark-circle-outline" size={20} />
          <span>We kept what you entered last time.</span>
          <button
            type="button"
            className={styles.linkButton}
            onClick={startOver}
          >
            Start over
          </button>
        </output>
      )}

      {banner && (
        <div className={styles.alert} role="alert">
          <p>
            <Icon name="alert-circle-outline" size={20} />
            <span>
              {banner === "session"
                ? "Your session expired. Log in again; your form is saved."
                : banner}
            </span>
          </p>
          {banner === "session" && (
            <ButtonLink href={loginHref} variant="secondary">
              Log in again
            </ButtonLink>
          )}
        </div>
      )}

      <StepIndicator step={step} reached={reached} onGo={jump} />

      <section className={styles.step} aria-labelledby={headingId}>
        <h2
          id={headingId}
          ref={stepHeading}
          tabIndex={-1}
          className={styles.stepTitle}
        >
          <span className={styles.stepNumber}>
            Step {step + 1} of {STEPS.length}
          </span>
          {STEP_TITLES[step]}
        </h2>

        {step === 0 && (
          <div className={styles.stepBody}>
            <ChoiceGroup
              name="cityId"
              legend="Which city is the place in?"
              options={cities.map((c) => ({ value: c.cityId, label: c.name }))}
              value={
                cities.some((c) => c.cityId === values.cityId)
                  ? values.cityId
                  : ""
              }
              onChange={(cityId) => update({ cityId })}
              error={errors.cityId}
            />
            <div className={styles.field}>
              <label htmlFor="field-other-city" className={styles.label}>
                Another city
              </label>
              <p className={styles.help}>
                Places can be in any city in Türkiye; only some have a
                destination page yet.
              </p>
              <select
                id="field-other-city"
                className={styles.input}
                value={destination ? "" : values.cityId}
                onChange={(event) => update({ cityId: event.target.value })}
              >
                <option value="">Choose a city</option>
                {others.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {step === 1 && (
          <LocationStep
            values={values}
            cityName={cityName}
            center={center}
            zoom={zoom}
            addCityToSearch={!destination}
            error={errors.location}
            onChange={update}
            onSessionExpired={onSessionExpired}
          />
        )}

        {step === 2 && (
          <div className={styles.stepBody}>
            <TextField
              name="name"
              label="Name"
              value={values.name}
              onChange={(name) => update({ name })}
              error={errors.name}
              limit={LIMITS.name}
            />
            <TextField
              name="subtitle"
              label="In one line"
              help="What makes it worth a visit, e.g. “Cosy café with a sea view”."
              value={values.subtitle}
              onChange={(subtitle) => update({ subtitle })}
              error={errors.subtitle}
              limit={LIMITS.subtitle}
            />
            <TextField
              name="description"
              label="Why do you recommend it?"
              help="Write it for an exchange student: what to order or do, when to go, anything to know."
              value={values.description}
              onChange={(description) => update({ description })}
              error={errors.description}
              limit={LIMITS.description}
              multiline
            />
            <TextField
              name="district"
              label="District"
              help="Filled in from the location. Change it if it's wrong."
              value={values.district}
              onChange={(district) => update({ district })}
              error={errors.district}
              limit={LIMITS.district}
              optional
            />
            <ChoiceGroup<PlaceType>
              name="placeType"
              legend="What kind of place is it?"
              options={(Object.keys(PLACE_TYPES) as PlaceType[]).map((t) => ({
                value: t,
                label: PLACE_TYPES[t],
                icon: <PlaceTypeIcon type={t} />,
              }))}
              value={values.placeType}
              onChange={(placeType) => update({ placeType })}
              error={errors.placeType}
            />
            <ChoiceGroup
              name="food"
              legend="Food options"
              help="Choose all that apply."
              options={Object.entries(FOOD_OPTIONS).map(([value, label]) => ({
                value: value as keyof typeof FOOD_OPTIONS,
                label,
              }))}
              multiple
              value={values.food}
              onChange={(food) => update({ food })}
              optional
            />
            <ChoiceGroup
              name="price"
              legend="Price per person"
              options={Object.entries(PRICE_RANGES).map(([value, p]) => ({
                value: value as keyof typeof PRICE_RANGES,
                label: p.long,
              }))}
              value={values.price}
              onChange={(price) => update({ price })}
              error={errors.price}
            />
            <ChoiceGroup
              name="transport"
              legend="Getting there"
              options={Object.entries(TRANSPORT_LEVELS).map(
                ([value, label]) => ({
                  value: value as keyof typeof TRANSPORT_LEVELS,
                  label,
                }),
              )}
              value={values.transport}
              onChange={(transport) => update({ transport })}
              error={errors.transport}
            />
            <RatingField
              name="placeRating"
              legend="Your rating of the place"
              value={values.placeRating}
              onChange={(placeRating) => update({ placeRating })}
              error={errors.placeRating}
            />
            <RatingField
              name="locationRating"
              legend="Your rating of the location"
              help="The area around it: easy to find, pleasant, safe at night."
              value={values.locationRating}
              onChange={(locationRating) => update({ locationRating })}
              error={errors.locationRating}
            />
          </div>
        )}

        {step === 3 && (
          <PhotosStep
            photos={values.photos}
            pending={pending}
            previews={previews}
            errors={errors}
            onAddFiles={addFiles}
            onRetry={retry}
            onRemovePending={removePending}
            onPendingAlt={(id, alt) =>
              setPending((list) =>
                list.map((p) => (p.id === id ? { ...p, alt } : p)),
              )
            }
            onPhotosChange={(photos: FormPhoto[]) => update({ photos })}
          />
        )}
      </section>

      <div className={styles.nav}>
        {step > 0 && (
          <button
            type="button"
            className={buttonClassName("secondary")}
            onClick={() => goTo((step - 1) as StepIndex)}
          >
            <Icon name="arrow-back-outline" size={20} />
            Back
          </button>
        )}
        {step < 3 ? (
          <button type="submit" className={buttonClassName("primary")}>
            Next: {STEPS[step + 1]}
            <Icon name="arrow-forward-outline" size={20} />
          </button>
        ) : (
          <button
            type="submit"
            className={buttonClassName("primary")}
            disabled={saving}
            aria-disabled={saving || undefined}
          >
            {saving ? "Saving…" : isNew ? "Add place" : "Save changes"}
          </button>
        )}
      </div>
      {banner === "session" && (
        <p className={styles.help}>
          After logging in you come back here with your form as you left it.
        </p>
      )}
    </form>
  );
}

const STEP_TITLES: Record<StepIndex, string> = {
  0: "Choose the city",
  1: "Find the place",
  2: "Tell us about it",
  3: "Add photos",
};

/**
 * Connected steps (standard: Bağlantılılık). Steps already reached can be opened again;
 * when editing, every step is reached (the place is complete).
 */
function StepIndicator({
  step,
  reached,
  onGo,
}: {
  step: StepIndex;
  reached: StepIndex;
  onGo: (step: StepIndex) => void;
}) {
  return (
    <nav aria-label="Form steps">
      <ol className={styles.steps}>
        {STEPS.map((label, i) => {
          const index = i as StepIndex;
          const state =
            index === step ? "current" : index <= reached ? "done" : "todo";
          const content = (
            <>
              <span className={styles.stepDot} aria-hidden="true">
                {state === "done" && index < step ? (
                  <Icon name="checkmark-circle-outline" size={20} />
                ) : (
                  index + 1
                )}
              </span>
              <span className={styles.stepLabel}>{label}</span>
            </>
          );
          return (
            <li
              key={label}
              className={`${styles.stepItem} ${styles[state]}`}
              aria-current={index === step ? "step" : undefined}
            >
              {index !== step && index <= reached ? (
                <button
                  type="button"
                  className={styles.stepButton}
                  onClick={() => onGo(index)}
                >
                  {content}
                  <span className="visually-hidden">
                    {index < step ? " (go back)" : " (open)"}
                  </span>
                </button>
              ) : (
                <span className={styles.stepButton}>{content}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** "Your place is live in Kadıköy" (standard: Başarı ekranı, the ESNer's best moment). */
function Success({
  place,
  isNew,
  where,
  onAnother,
}: {
  place: Place;
  isNew: boolean;
  where: string;
  onAnother: () => void;
}) {
  const title = useRef<HTMLHeadingElement>(null);
  useEffect(() => title.current?.focus(), []);
  return (
    <div className={styles.success}>
      <Icon
        name="checkmark-circle-outline"
        size={48}
        className={styles.successIcon}
      />
      <h2 ref={title} tabIndex={-1} className={styles.successTitle}>
        {isNew ? `Your place is live in ${where}` : "Your changes are saved"}
      </h2>
      <p className={styles.help}>
        {isNew
          ? `${place.name} is now on ESN GO with your name and section. Thank you for helping the next exchange students!`
          : `${place.name} is updated. It can take a few minutes until every page shows the change.`}
      </p>
      <div className={styles.nav}>
        <ButtonLink href={`/places/${place.placeId}`}>View place</ButtonLink>
        {isNew ? (
          <button
            type="button"
            className={buttonClassName("secondary")}
            onClick={onAnother}
          >
            Add another place
          </button>
        ) : (
          <ButtonLink href="/places/new" variant="secondary">
            Add a place
          </ButtonLink>
        )}
      </div>
    </div>
  );
}
