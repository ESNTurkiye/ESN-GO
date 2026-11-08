"use client";

import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef } from "react";
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
};

const TURKIYE = { lat: 39.0, lng: 35.2 };

/** Amazon Location map (standard: Harita standardı): Monochrome style, Light scheme. */
function styleUrl(): string | null {
  const key = process.env.NEXT_PUBLIC_LOCATION_API_KEY;
  const region = process.env.NEXT_PUBLIC_LOCATION_REGION ?? "eu-central-1";
  if (!key) return null;
  return `https://maps.geo.${region}.amazonaws.com/v2/styles/Monochrome/descriptor?key=${encodeURIComponent(key)}&color-scheme=Light`;
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
}: PlaceMapProps) {
  const container = useRef<HTMLElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const markers = useRef(new Map<string, maplibregl.Marker>());
  const popup = useRef<maplibregl.Popup | null>(null);
  // Latest callbacks without re-creating the map.
  const handlers = useRef({ onSelect, onMove });
  handlers.current = { onSelect, onMove };
  const url = styleUrl();

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
    map.current = instance;
    return () => {
      instance.remove();
      map.current = null;
      markers.current.clear();
    };
  }, [url]);

  // Pins follow the list.
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
        // The box may have changed size (List / Map tab, sticky column).
        instance.resize();
        if (places.length === 1) {
          instance.jumpTo({ center: [places[0].lng, places[0].lat], zoom: 15 });
          return;
        }
        const bounds = new maplibregl.LngLatBounds();
        for (const p of places) bounds.extend([p.lng, p.lat]);
        instance.fitBounds(bounds, { padding: 72, maxZoom: 15, duration: 0 });
      };
      zoomToPins();
      // Before the style has loaded MapLibre can drop the camera move: do it again then.
      if (!instance.isStyleLoaded()) instance.once("load", zoomToPins);
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
      aria-label="Map of places. Every place is also in the list."
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
