"use client";

import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef } from "react";
import { mapStyleUrl } from "@/lib/map-style";
import {
  addedBy,
  PLACE_TYPES,
  type Place,
  PRICE_RANGES,
  placeHref,
} from "@/lib/places";
import styles from "./PlaceMap.module.scss";

/** [minLng, minLat, maxLng, maxLat]: the visible map area, as the API's bbox wants it. */
export type Bounds = [number, number, number, number];

type PlaceMapProps = {
  places: Place[];
  selectedId?: string | null;
  onSelect?: (placeId: string | null) => void;
  /** Called after the visitor pans or zooms (not after code moves the map). */
  onMove?: (bounds: Bounds) => void;
  /** Zoom to the pins whenever the list changes. Off while "Search as I move the map" is on. */
  fit?: boolean;
  /** Start position when there are no pins. */
  center?: { lat: number; lng: number };
  zoom?: number;
  className?: string;
  /** For screen readers; the default fits the lists. */
  label?: string;
};

const TURKIYE = { lat: 39.0, lng: 35.2 };

/** Pins farther than this from the city centre don't decide the city map's zoom. */
const NEAR_KM = 60;

/** Straight-line distance in km (haversine); enough for "is it in this city". */
function distanceKm(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number },
) {
  const rad = Math.PI / 180;
  const dLat = (b.lat - a.lat) * rad;
  const dLng = (b.lng - a.lng) * rad;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dLng / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(h));
}

/**
 * Places on a map (wireframes 02 note 17, 05 X7). ESN-coloured pins with a white edge,
 * 32 px (selected 40 px, thicker edge). A pin opens a short card with a link to the place.
 * Loaded only in the browser (next/dynamic), see PlacesBrowser.
 */
export default function PlaceMap({
  places,
  selectedId,
  onSelect,
  onMove,
  fit = true,
  center,
  zoom = 11,
  className,
  label = "Map of places. Every place is also in the list.",
}: PlaceMapProps) {
  const container = useRef<HTMLElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const markers = useRef(new Map<string, maplibregl.Marker>());
  const popup = useRef<maplibregl.Popup | null>(null);
  // Latest callbacks without re-creating the map.
  const handlers = useRef({ onSelect, onMove });
  handlers.current = { onSelect, onMove };
  // Zooms to the current pins; set by the pins effect (null while fit is off).
  const refit = useRef<(() => void) | null>(null);
  const url = mapStyleUrl();

  // Create the map once.
  // biome-ignore lint/correctness/useExhaustiveDependencies: the map is created once; later changes go through the effects below
  useEffect(() => {
    if (!container.current || !url) return;
    const start = center ?? TURKIYE;
    const instance = new maplibregl.Map({
      container: container.current,
      style: url,
      center: [start.lng, start.lat],
      zoom: center ? zoom : 5,
      attributionControl: { compact: true },
    });
    instance.addControl(
      new maplibregl.NavigationControl({ showCompass: false }),
      "top-right",
    );
    instance.on("moveend", (event) => {
      // Only moves made by the visitor (drag, scroll, buttons) count.
      if (!("originalEvent" in event) || !event.originalEvent) return;
      const b = instance.getBounds();
      handlers.current.onMove?.([
        b.getWest(),
        b.getSouth(),
        b.getEast(),
        b.getNorth(),
      ]);
    });
    instance.on("click", (event) => {
      const target = event.originalEvent.target as HTMLElement;
      if (!target.closest(`.${styles.pin}`)) handlers.current.onSelect?.(null);
    });
    // A hidden map (List / Map tab) has no size: when it appears, size it and zoom to the pins.
    let wasHidden = container.current.clientWidth === 0;
    const observer = new ResizeObserver(([entry]) => {
      const hidden = entry.contentRect.width === 0;
      if (hidden) {
        wasHidden = true;
        return;
      }
      instance.resize();
      if (wasHidden) refit.current?.();
      wasHidden = false;
    });
    observer.observe(container.current);
    map.current = instance;
    return () => {
      observer.disconnect();
      instance.remove();
      map.current = null;
      markers.current.clear();
    };
  }, [url]);

  // Pins follow the list.
  // biome-ignore lint/correctness/useExhaustiveDependencies: the city centre only matters when the places change
  useEffect(() => {
    const instance = map.current;
    if (!instance) return;
    const next = new Set(places.map((p) => p.placeId));
    for (const [id, marker] of markers.current) {
      if (!next.has(id)) {
        marker.remove();
        markers.current.delete(id);
      }
    }
    for (const place of places) {
      if (markers.current.has(place.placeId)) continue;
      const el = document.createElement("button");
      el.type = "button";
      el.className = styles.pin;
      el.setAttribute("aria-label", place.name);
      el.addEventListener("click", (event) => {
        event.stopPropagation();
        handlers.current.onSelect?.(place.placeId);
      });
      const marker = new maplibregl.Marker({ element: el, anchor: "bottom" })
        .setLngLat([place.lng, place.lat])
        .addTo(instance);
      markers.current.set(place.placeId, marker);
    }
    if (fit && places.length > 0) {
      const zoomToPins = () => {
        // A hidden map (List / Map tab) has no size: zooming now would end far out.
        // The ResizeObserver above zooms again when it appears.
        if (instance.getContainer().clientWidth === 0) return;
        // The box may have changed size (List / Map tab, sticky column).
        instance.resize();
        // With a city: zoom to the pins near it, so one far-away pin never pulls
        // the city's map out to the next city (its pin is still on the map).
        const near = center
          ? places.filter((p) => distanceKm(p, center) <= NEAR_KM)
          : places;
        const pins = near.length > 0 ? near : places;
        if (pins.length === 1) {
          instance.jumpTo({ center: [pins[0].lng, pins[0].lat], zoom: 15 });
          return;
        }
        const bounds = new maplibregl.LngLatBounds();
        for (const p of pins) bounds.extend([p.lng, p.lat]);
        instance.fitBounds(bounds, { padding: 72, maxZoom: 15, duration: 0 });
      };
      refit.current = zoomToPins;
      zoomToPins();
      // Before the style has loaded MapLibre can drop the camera move: do it again then.
      if (!instance.isStyleLoaded()) instance.once("load", zoomToPins);
    } else {
      refit.current = null;
    }
  }, [places, fit]);

  // Selected pin: bigger, with a short card.
  useEffect(() => {
    const instance = map.current;
    if (!instance) return;
    for (const [id, marker] of markers.current) {
      marker.getElement().classList.toggle(styles.selected, id === selectedId);
      marker
        .getElement()
        .setAttribute("aria-pressed", String(id === selectedId));
    }
    popup.current?.remove();
    const place = places.find((p) => p.placeId === selectedId);
    if (!place) return;
    popup.current = new maplibregl.Popup({
      // Opens on whichever side of the pin has room; the offset clears the pin.
      offset: {
        center: [0, -24],
        top: [0, 0],
        bottom: [0, -46],
        left: [22, -24],
        right: [-22, -24],
        "top-left": [0, 0],
        "top-right": [0, 0],
        "bottom-left": [0, -46],
        "bottom-right": [0, -46],
      },
      closeButton: true,
      maxWidth: "260px",
      className: styles.popup,
    })
      .setLngLat([place.lng, place.lat])
      .setDOMContent(popupContent(place))
      .addTo(instance);
    popup.current.on("close", () => {
      if (handlers.current.onSelect && selectedId === place.placeId) {
        handlers.current.onSelect(null);
      }
    });
  }, [selectedId, places]);

  if (!url) {
    return (
      <div className={`${styles.map} ${styles.missing} ${className ?? ""}`}>
        The map needs NEXT_PUBLIC_LOCATION_API_KEY in .env.local.
      </div>
    );
  }
  return (
    <section
      ref={container}
      className={`${styles.map} ${className ?? ""}`}
      aria-label={label}
    />
  );
}

/** The short card on a pin: plain DOM (MapLibre owns the popup). */
function popupContent(place: Place): HTMLElement {
  const root = document.createElement("div");
  root.className = styles.card;
  if (place.photos[0]) {
    const img = document.createElement("img");
    img.src = place.photos[0].url;
    img.alt = place.photos[0].alt;
    root.append(img);
  }
  const name = document.createElement("a");
  name.href = placeHref(place);
  name.className = styles.cardName;
  name.textContent = place.name;
  const meta = document.createElement("p");
  meta.className = styles.cardMeta;
  meta.textContent = [
    PLACE_TYPES[place.placeType],
    place.district,
    PRICE_RANGES[place.price]?.short,
  ]
    .filter(Boolean)
    .join(" · ");
  const by = document.createElement("p");
  by.className = styles.cardMeta;
  by.textContent = `Added by ${addedBy(place)}`;
  root.append(name, meta, by);
  return root;
}
