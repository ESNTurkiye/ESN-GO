import {
  type FoodOption,
  LIMITS,
  type Place,
  type PlaceType,
  type PriceRange,
  type TransportLevel,
} from "./places";

/**
 * The place form (/places/new, /places/{id}/edit): four steps, City → Location →
 * Details → Photos (standard: Bağlantılılık; adding a place in at most 4 steps).
 * Rules match the API (apps/backend/src/lib/places.ts parsePlaceInput), so the form
 * catches mistakes before saving; the API checks everything again.
 */

export const STEPS = ["City", "Location", "Details", "Photos"] as const;
export type StepIndex = 0 | 1 | 2 | 3;

/** A photo already in the bucket (key from POST /uploads), with its alt text. */
export type FormPhoto = {
  key: string;
  /** CDN address or a local preview while editing. */
  url: string;
  alt: string;
};

export type PlaceFormValues = {
  cityId: string;
  lat: number | null;
  lng: number | null;
  /** From the location search; empty when the pin was placed on the map by hand. */
  address: string;
  locationPlaceId: string;
  district: string;
  name: string;
  subtitle: string;
  description: string;
  placeType: PlaceType | "";
  food: FoodOption[];
  price: PriceRange | "";
  transport: TransportLevel | "";
  placeRating: number;
  locationRating: number;
  photos: FormPhoto[];
};

export const EMPTY_FORM: PlaceFormValues = {
  cityId: "",
  lat: null,
  lng: null,
  address: "",
  locationPlaceId: "",
  district: "",
  name: "",
  subtitle: "",
  description: "",
  placeType: "",
  food: [],
  price: "",
  transport: "",
  placeRating: 0,
  locationRating: 0,
  photos: [],
};

export function formFromPlace(place: Place): PlaceFormValues {
  return {
    cityId: place.cityId,
    lat: place.lat,
    lng: place.lng,
    address: place.address ?? "",
    locationPlaceId: place.locationPlaceId ?? "",
    district: place.district ?? "",
    name: place.name,
    subtitle: place.subtitle,
    description: place.description,
    placeType: place.placeType,
    food: place.food,
    price: place.price,
    transport: place.transport,
    placeRating: place.placeRating,
    locationRating: place.locationRating,
    photos: place.photos.map((p) => ({ key: p.key, url: p.url, alt: p.alt })),
  };
}

/** Field → message. A message says what is wrong and how to fix it (standard). */
export type FormErrors = Partial<Record<string, string>>;

function textError(
  value: string,
  limit: number,
  emptyMessage: string | null,
): string | undefined {
  const trimmed = value.trim();
  if (!trimmed) return emptyMessage ?? undefined;
  if (trimmed.length > limit) {
    return `Use at most ${limit} characters (now ${trimmed.length}).`;
  }
  return undefined;
}

/** The problems that keep this step from being finished; {} when it is fine. */
export function validateStep(
  step: StepIndex,
  v: PlaceFormValues,
  uploading: boolean,
): FormErrors {
  const errors: FormErrors = {};
  const set = (field: string, message: string | undefined) => {
    if (message) errors[field] = message;
  };

  if (step === 0) {
    set("cityId", v.cityId ? undefined : "Choose the city the place is in.");
  }
  if (step === 1) {
    set(
      "location",
      v.lat === null || v.lng === null
        ? "Find the place in the search, or tap the map to place the pin."
        : undefined,
    );
  }
  if (step === 2) {
    set("name", textError(v.name, LIMITS.name, "Write the place's name."));
    set(
      "subtitle",
      textError(
        v.subtitle,
        LIMITS.subtitle,
        "Write one line about the place, e.g. “Cosy café with a sea view”.",
      ),
    );
    set(
      "description",
      textError(
        v.description,
        LIMITS.description,
        "Tell students why you recommend it.",
      ),
    );
    set("district", textError(v.district, LIMITS.district, null));
    set(
      "placeType",
      v.placeType ? undefined : "Choose what kind of place it is.",
    );
    set("price", v.price ? undefined : "Choose the price per person.");
    set(
      "transport",
      v.transport ? undefined : "Choose how easy it is to get there.",
    );
    set("placeRating", v.placeRating ? undefined : "Rate the place.");
    set("locationRating", v.locationRating ? undefined : "Rate the location.");
  }
  if (step === 3) {
    v.photos.forEach((photo, i) => {
      const alt = photo.alt.trim();
      if (!alt) {
        errors[`photo-${i}`] =
          "Describe the photo for people who can't see it, e.g. “Tables by the window”.";
      } else if (alt.length > LIMITS.photoAlt) {
        errors[`photo-${i}`] =
          `Use at most ${LIMITS.photoAlt} characters (now ${alt.length}).`;
      }
    });
    if (uploading) {
      errors.photos = "Wait until the photos finish uploading.";
    }
  }
  return errors;
}

/** The first step with a problem, or null when the whole form is ready to save. */
export function firstInvalidStep(
  v: PlaceFormValues,
  uploading: boolean,
): StepIndex | null {
  for (const step of [0, 1, 2, 3] as const) {
    if (Object.keys(validateStep(step, v, uploading)).length > 0) return step;
  }
  return null;
}

/** Body of POST /places and PUT /places/{id}. */
export function toRequestBody(v: PlaceFormValues) {
  const optional = (value: string) => value.trim() || undefined;
  return {
    cityId: v.cityId,
    lat: v.lat,
    lng: v.lng,
    address: optional(v.address),
    locationPlaceId: optional(v.locationPlaceId),
    district: optional(v.district),
    name: v.name.trim(),
    subtitle: v.subtitle.trim(),
    description: v.description.trim(),
    placeType: v.placeType,
    food: v.food,
    price: v.price,
    transport: v.transport,
    placeRating: v.placeRating,
    locationRating: v.locationRating,
    photos: v.photos.map((p) => ({ key: p.key, alt: p.alt.trim() })),
  };
}

// ---- draft: the form survives a reload or an expired login (standard: Oturum süresi doldu)

type Draft = { values: PlaceFormValues; step: StepIndex; savedAt: number };

/** One draft per form: "new" or a placeId. Kept for 7 days. */
const draftKey = (id: string) => `esngo:place-draft:${id}`;
const DRAFT_DAYS = 7;

export function loadDraft(id: string): Draft | null {
  try {
    const raw = localStorage.getItem(draftKey(id));
    if (!raw) return null;
    const draft = JSON.parse(raw) as Draft;
    if (Date.now() - draft.savedAt > DRAFT_DAYS * 24 * 60 * 60 * 1000) {
      localStorage.removeItem(draftKey(id));
      return null;
    }
    return { ...draft, values: { ...EMPTY_FORM, ...draft.values } };
  } catch {
    return null;
  }
}

export function saveDraft(
  id: string,
  values: PlaceFormValues,
  step: StepIndex,
) {
  try {
    // values.photos holds only finished uploads (key + CDN address); photos still
    // uploading live in the form's own state and are not kept.
    const draft: Draft = { values, step, savedAt: Date.now() };
    localStorage.setItem(draftKey(id), JSON.stringify(draft));
  } catch {
    // Storage blocked: the form still works, it just isn't kept.
  }
}

export function clearDraft(id: string) {
  try {
    localStorage.removeItem(draftKey(id));
  } catch {
    // ignore
  }
}
