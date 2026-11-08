"use client";

import dynamic from "next/dynamic";
import { useEffect, useId, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { ApiError, api } from "@/lib/client-api";
import type { PlaceFormValues } from "@/lib/place-form";
import { FieldError, fieldIds } from "./Field";
import styles from "./PlaceForm.module.scss";

// Browser only; a grey box of the same size until it loads.
const LocationPicker = dynamic(() => import("./LocationPicker"), {
  ssr: false,
  loading: () => <div className={styles.mapLoading} />,
});

type Suggestion = { locationPlaceId: string; name: string; address?: string };
type Location = Suggestion & { lat: number; lng: number; district?: string };

type LocationStepProps = {
  values: PlaceFormValues;
  /** City name for the messages ("near İzmir"). */
  cityName: string;
  /** Search bias and map start. */
  center: { lat: number; lng: number };
  /** The city has no destination page: its name is added to the search text. */
  addCityToSearch: boolean;
  zoom: number;
  error?: string;
  onChange: (patch: Partial<PlaceFormValues>) => void;
  /** Session ran out (API 401). */
  onSessionExpired: () => void;
};

const MIN_CHARS = 3;

/**
 * Step 2, Location (Amazon Location through our API, doc 07): type the name, choose a
 * suggestion, the pin goes there. No result → tap the map (standard: Mekan araması sonuç
 * vermedi). Combobox pattern: arrow keys move, Enter chooses, Esc closes.
 */
export function LocationStep({
  values,
  cityName,
  center,
  addCityToSearch,
  zoom,
  error,
  onChange,
  onSessionExpired,
}: LocationStepProps) {
  const listId = useId();
  const ids = fieldIds("location");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [state, setState] = useState<"idle" | "searching" | "none" | "error">(
    "idle",
  );
  const [problem, setProblem] = useState<string | null>(null);
  const request = useRef(0);
  // The text put in the box by choosing a suggestion: not searched again.
  const chosenText = useRef<string | null>(null);

  // Search 300 ms after the last key; older answers are ignored.
  useEffect(() => {
    const text = query.trim();
    if (query === chosenText.current) return;
    if (text.length < MIN_CHARS) {
      setResults([]);
      setState("idle");
      return;
    }
    const id = ++request.current;
    const timer = setTimeout(async () => {
      setState("searching");
      try {
        const q = addCityToSearch ? `${text} ${cityName}` : text;
        const params = new URLSearchParams({
          q: q.slice(0, 100),
          lat: String(center.lat),
          lng: String(center.lng),
        });
        const data = await api<{ results: Suggestion[] }>(
          `/geo/suggest?${params}`,
          { auth: true },
        );
        if (id !== request.current) return;
        setResults(data.results);
        setActive(-1);
        setOpen(true);
        setState(data.results.length ? "idle" : "none");
      } catch (err) {
        if (id !== request.current) return;
        setState("error");
        // An expired login is shown once, at the top of the form.
        if (err instanceof ApiError && err.code === "SESSION") {
          onSessionExpired();
          return;
        }
        setProblem(
          err instanceof ApiError
            ? err.message
            : "The search didn't answer. Try again.",
        );
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [
    query,
    addCityToSearch,
    cityName,
    center.lat,
    center.lng,
    onSessionExpired,
  ]);

  async function choose(suggestion: Suggestion) {
    setOpen(false);
    chosenText.current = suggestion.name;
    setQuery(suggestion.name);
    setResults([]);
    setState("idle");
    setProblem(null);
    try {
      const place = await api<Location>(
        `/geo/place?${new URLSearchParams({ id: suggestion.locationPlaceId })}`,
        { auth: true },
      );
      onChange({
        lat: place.lat,
        lng: place.lng,
        address: place.address ?? "",
        locationPlaceId: place.locationPlaceId,
        district: place.district ?? values.district,
        // The search name is a good start for the place's name; the ESNer can change it.
        name: values.name || place.name,
      });
    } catch (err) {
      if (err instanceof ApiError && err.code === "SESSION") {
        onSessionExpired();
        return;
      }
      setProblem(
        err instanceof ApiError
          ? err.message
          : "We couldn't get that place's location. Choose it again, or tap the map.",
      );
    }
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (!open || results.length === 0) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((i) => (i + 1) % results.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((i) => (i <= 0 ? results.length - 1 : i - 1));
    } else if (event.key === "Enter" && active >= 0) {
      event.preventDefault();
      choose(results[active]);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  const pin =
    values.lat !== null && values.lng !== null
      ? { lat: values.lat, lng: values.lng }
      : null;
  const searchHelp = `Type at least ${MIN_CHARS} letters of the place's name, e.g. “Moda Cafe”.`;

  return (
    <div className={styles.stepBody}>
      <div className={styles.field}>
        <label htmlFor={ids.input} className={styles.label}>
          Search for the place
        </label>
        <p id={ids.help} className={styles.help}>
          {searchHelp}
        </p>
        <div className={styles.combo}>
          <Icon name="search-outline" size={20} className={styles.comboIcon} />
          <input
            id={ids.input}
            type="text"
            role="combobox"
            autoComplete="off"
            aria-autocomplete="list"
            aria-expanded={open && results.length > 0}
            aria-controls={listId}
            aria-activedescendant={
              active >= 0 ? `${listId}-${active}` : undefined
            }
            aria-describedby={[ids.help, error && ids.error]
              .filter(Boolean)
              .join(" ")}
            aria-invalid={error ? true : undefined}
            className={`${styles.input} ${styles.comboInput} ${error ? styles.invalid : ""}`}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setProblem(null);
            }}
            onKeyDown={onKeyDown}
            onFocus={() => results.length && setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 150)}
          />
          {open && results.length > 0 && (
            // Combobox listbox: the input keeps focus (aria-activedescendant), keys are
            // handled there; a click chooses too.
            <div id={listId} role="listbox" className={styles.options}>
              {results.map((result, i) => (
                <div
                  key={result.locationPlaceId}
                  id={`${listId}-${i}`}
                  role="option"
                  tabIndex={-1}
                  aria-selected={i === active}
                  className={`${styles.option} ${i === active ? styles.optionActive : ""}`}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => choose(result)}
                  onKeyDown={() => undefined}
                >
                  <span className={styles.optionName}>{result.name}</span>
                  {result.address && (
                    <span className={styles.optionAddress}>
                      {result.address}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        <p className={styles.status} aria-live="polite">
          {state === "searching" && "Searching…"}
          {state === "none" &&
            `We couldn't find “${query.trim()}” near ${cityName}. Check the spelling, or tap the map to place the pin yourself.`}
          {state === "idle" &&
            open &&
            results.length > 0 &&
            `${results.length} suggestions. Use the arrow keys to choose.`}
        </p>
        {problem && (
          <FieldError id={`${ids.input}-problem`} message={problem} />
        )}
      </div>

      <div className={styles.field}>
        <p className={styles.label} id="map-label">
          Or tap the map
        </p>
        <p className={styles.help}>
          Tap where the place is. Drag the pin to move it.
        </p>
        <LocationPicker
          center={center}
          zoom={zoom}
          pin={pin}
          onPick={(point) =>
            // A spot chosen by hand: the search's address no longer applies.
            onChange({
              lat: point.lat,
              lng: point.lng,
              address: "",
              locationPlaceId: "",
            })
          }
        />
      </div>

      <div className={styles.chosen} aria-live="polite">
        {pin ? (
          <>
            <Icon name="location-outline" size={20} />
            <div>
              <p className={styles.chosenTitle}>Pin placed</p>
              <p className={styles.help}>
                {values.address ||
                  `On the map at ${pin.lat.toFixed(5)}, ${pin.lng.toFixed(5)}. You can add the district in the next step.`}
              </p>
            </div>
            <button
              type="button"
              className={styles.linkButton}
              onClick={() =>
                onChange({
                  lat: null,
                  lng: null,
                  address: "",
                  locationPlaceId: "",
                })
              }
            >
              Remove pin
            </button>
          </>
        ) : (
          <p className={styles.help}>No pin yet.</p>
        )}
      </div>
      <FieldError id={ids.error} message={error} />
    </div>
  );
}
