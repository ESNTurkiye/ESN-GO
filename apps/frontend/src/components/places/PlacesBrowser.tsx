"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import buttonStyles from "@/components/ui/button.module.scss";
import { Icon } from "@/components/ui/Icon";
import type { City } from "@/lib/api";
import { ApiError, api } from "@/lib/client-api";
import {
  cityName,
  PLACE_TYPES,
  type Place,
  type PlacePage,
  type PlaceType,
} from "@/lib/places";
import { PlaceCard } from "./PlaceCard";
import { PlaceCardSkeleton } from "./PlaceCardSkeleton";
import type { Bounds } from "./PlaceMap";
import styles from "./PlacesBrowser.module.scss";

// The map only runs in the browser; until it loads, a grey box of the same size holds its place.
const PlaceMap = dynamic(() => import("./PlaceMap"), {
  ssr: false,
  loading: () => <div className={styles.mapLoading} />,
});

/** Places per page ("Load more" asks for the next one). */
const PAGE_SIZE = 12;

type PlacesBrowserProps = {
  cities: City[];
  /** Fixed destination (city page). Without it a destination select is shown (Explore!). */
  cityId?: string;
  /** Destination chosen in the URL (?city=). */
  initialCity?: string;
  /** Called when the visitor picks another destination (Explore! keeps it in the URL). */
  onCityChange?: (cityId: string) => void;
  /** "split": list + sticky map side by side (Explore!). "tabs": List / Map tabs (city page). */
  layout: "split" | "tabs";
  /** First page from the server, so the list is there before the script runs. */
  initial?: PlacePage;
};

/**
 * Places list + map with category chips and "Load more" (wireframes 02 notes 12-14, 17;
 * 05 X3-X10). Data: GET /places or GET /cities/{cityId}/places, newest first.
 * The category filter runs in the browser on the places loaded so far (the API has no
 * category filter yet). "Search as I move the map" asks the API for the visible area (bbox).
 */
export function PlacesBrowser({
  cities,
  cityId,
  initialCity = "",
  onCityChange,
  layout,
  initial,
}: PlacesBrowserProps) {
  const [city, setCity] = useState(cityId ?? initialCity);
  const [type, setType] = useState<PlaceType | "">("");
  const [places, setPlaces] = useState<Place[]>(initial?.places ?? []);
  const [cursor, setCursor] = useState(initial?.nextCursor);
  const [loading, setLoading] = useState(!initial);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<"list" | "map">("list");
  const [selected, setSelected] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [followMap, setFollowMap] = useState(false);
  const [bounds, setBounds] = useState<Bounds | null>(null);
  const request = useRef(0);

  const load = useCallback(
    async (opts: { more?: boolean; area?: Bounds | null } = {}) => {
      const id = ++request.current;
      setLoading(true);
      setError(null);
      const params = new URLSearchParams({ limit: String(PAGE_SIZE) });
      if (opts.more && cursor) params.set("cursor", cursor);
      const area = opts.area ?? null;
      if (area) params.set("bbox", area.map((n) => n.toFixed(5)).join(","));
      const path = city
        ? `/cities/${encodeURIComponent(city)}/places`
        : "/places";
      try {
        const page = await api<PlacePage>(`${path}?${params}`);
        if (id !== request.current) return; // an older answer arrived late
        setPlaces((prev) =>
          opts.more ? [...prev, ...page.places] : page.places,
        );
        setCursor(page.nextCursor);
      } catch (err) {
        if (id !== request.current) return;
        setError(
          err instanceof ApiError
            ? err.message
            : "We couldn't load the places. Try again.",
        );
      } finally {
        if (id === request.current) setLoading(false);
      }
    },
    [city, cursor],
  );

  // New destination: start the list again (the first page may come from the server).
  const firstRender = useRef(true);
  // biome-ignore lint/correctness/useExhaustiveDependencies: reload only when the destination changes
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      if (initial) return;
    }
    setSelected(null);
    load({ area: followMap ? bounds : null });
  }, [city]);

  const visible = useMemo(
    () => (type ? places.filter((p) => p.placeType === type) : places),
    [places, type],
  );

  const placeName = city ? cityName(city, cities) : "";
  const result = resultLine(visible.length, type, placeName, Boolean(cursor));

  function pickCity(next: string) {
    setCity(next);
    onCityChange?.(next);
  }

  function clearFilters() {
    setType("");
    if (!cityId && city) pickCity("");
    if (followMap) {
      setFollowMap(false);
      load();
    }
  }

  function onMapMove(next: Bounds) {
    setBounds(next);
    if (followMap) load({ area: next });
  }

  function toggleFollow(on: boolean) {
    setFollowMap(on);
    load({ area: on ? bounds : null });
  }

  const list = (
    <div className={styles.listCol}>
      <div className={styles.resultBar}>
        <p className={styles.result} aria-live="polite">
          {result}
        </p>
        <p className={styles.sort}>Newest first</p>
      </div>

      {error && (
        <div className={styles.error} role="alert">
          <Icon name="alert-circle-outline" size={20} />
          <span>{error}</span>
          <button
            type="button"
            className={buttonStyles.ghost}
            onClick={() => load({ area: followMap ? bounds : null })}
          >
            Try again
          </button>
        </div>
      )}

      {visible.length > 0 && (
        <ul className={layout === "split" ? styles.gridSplit : styles.grid}>
          {visible.map((place) => (
            <li key={place.placeId}>
              <PlaceCard
                place={place}
                cities={cityId ? undefined : cities}
                active={place.placeId === selected || place.placeId === hovered}
                onHover={setHovered}
              />
            </li>
          ))}
        </ul>
      )}

      {loading && visible.length === 0 && (
        <ul
          className={layout === "split" ? styles.gridSplit : styles.grid}
          aria-hidden="true"
        >
          {Array.from({ length: 4 }, (_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: placeholders have no identity
            <li key={i}>
              <PlaceCardSkeleton />
            </li>
          ))}
        </ul>
      )}

      {!loading && !error && visible.length === 0 && (
        <EmptyState
          type={type}
          cityName={placeName}
          followMap={followMap}
          onClear={clearFilters}
          canClear={Boolean(type || (!cityId && city) || followMap)}
        />
      )}

      {cursor && (
        <div className={styles.more}>
          <button
            type="button"
            className={`${buttonStyles.button} ${buttonStyles.secondary}`}
            disabled={loading}
            onClick={() =>
              load({ more: true, area: followMap ? bounds : null })
            }
          >
            {loading ? "Loading…" : "Load more"}
          </button>
        </div>
      )}
    </div>
  );

  const map = (
    <div className={styles.mapCol}>
      <div className={styles.mapBox}>
        <PlaceMap
          places={visible}
          selectedId={selected ?? hovered}
          onSelect={setSelected}
          onMove={onMapMove}
          fit={!followMap}
          center={cities.find((c) => c.cityId === city)?.mapCenter}
        />
        <label className={styles.follow}>
          <input
            type="checkbox"
            checked={followMap}
            onChange={(e) => toggleFollow(e.target.checked)}
          />
          Search as I move the map
        </label>
      </div>
    </div>
  );

  return (
    <div className={styles.browser}>
      <div className={styles.filters}>
        {!cityId && (
          <label className={styles.select}>
            <span className="visually-hidden">Destination</span>
            <select value={city} onChange={(e) => pickCity(e.target.value)}>
              <option value="">All destinations</option>
              {cities.map((c) => (
                <option key={c.cityId} value={c.cityId}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
        )}
        <fieldset className={styles.chips}>
          <legend className="visually-hidden">Category</legend>
          {(["", ...Object.keys(PLACE_TYPES)] as (PlaceType | "")[]).map(
            (key) => (
              <label key={key || "all"} className={styles.chip}>
                <input
                  type="radio"
                  name="category"
                  value={key}
                  checked={type === key}
                  onChange={() => setType(key)}
                />
                <span>{key ? plural(PLACE_TYPES[key]) : "All"}</span>
              </label>
            ),
          )}
        </fieldset>

        {/* Mobile (and the city page): List / Map tabs. Switching does not reload the data. */}
        <div
          className={`${styles.tabs} ${layout === "split" ? styles.tabsMobileOnly : ""}`}
          role="tablist"
          aria-label="View"
        >
          <button
            type="button"
            role="tab"
            aria-selected={view === "list"}
            className={styles.tab}
            onClick={() => setView("list")}
          >
            <Icon name="list-outline" size={20} /> List
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={view === "map"}
            className={styles.tab}
            onClick={() => setView("map")}
          >
            <Icon name="map-outline" size={20} /> Map
          </button>
        </div>
      </div>

      <div
        className={`${styles.body} ${layout === "split" ? styles.split : styles.tabbed}`}
        data-view={view}
      >
        {list}
        {map}
      </div>
    </div>
  );
}

function plural(label: string) {
  return label === "Café" ? "Cafés" : `${label}s`.replace("Natures", "Nature");
}

/** "12 cafés in İstanbul", "86 places" (standard: the count says what is listed). */
function resultLine(
  count: number,
  type: PlaceType | "",
  city: string,
  more: boolean,
) {
  const noun = type
    ? count === 1
      ? PLACE_TYPES[type].toLowerCase()
      : plural(PLACE_TYPES[type]).toLowerCase()
    : count === 1
      ? "place"
      : "places";
  return `${count}${more ? "+" : ""} ${noun}${city ? ` in ${city}` : ""}`;
}

function EmptyState({
  type,
  cityName: city,
  followMap,
  onClear,
  canClear,
}: {
  type: PlaceType | "";
  cityName: string;
  followMap: boolean;
  onClear: () => void;
  canClear: boolean;
}) {
  const what = type ? plural(PLACE_TYPES[type]).toLowerCase() : "places";
  const where = followMap ? " in this area" : city ? ` in ${city}` : "";
  return (
    <div className={styles.empty}>
      <h3>
        No {what}
        {where} yet
      </h3>
      <p>
        {followMap
          ? "Move or zoom out the map, or try another category."
          : "Try another category or destination."}
      </p>
      <div className={styles.emptyActions}>
        {canClear && (
          <button
            type="button"
            className={`${buttonStyles.button} ${buttonStyles.secondary}`}
            onClick={onClear}
          >
            Clear filters
          </button>
        )}
        <Link href="/places/new" className={buttonStyles.ghost}>
          Add the first place
        </Link>
      </div>
      <p className={styles.emptyNote}>Adding places is for logged-in ESNers.</p>
    </div>
  );
}
