"use client";

import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef } from "react";
import { mapStyleUrl } from "@/lib/map-style";
import styles from "./LocationPicker.module.scss";

type Point = { lat: number; lng: number };

type LocationPickerProps = {
  /** Where the map starts: the city (zoom ~12) or Türkiye (zoom 5). */
  center: Point;
  zoom: number;
  /** The chosen spot; null until there is one. */
  pin: Point | null;
  /** Tap on the map or the pin dragged. */
  onPick: (point: Point) => void;
};

/**
 * Map for the place form (standard: ESNer's search gave no result → "tap the map to
 * place the pin yourself"). Tap to place the pin, drag to correct it. The search above
 * is the keyboard way; this map is the extra way, not the only one.
 */
export default function LocationPicker({
  center,
  zoom,
  pin,
  onPick,
}: LocationPickerProps) {
  const container = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const marker = useRef<maplibregl.Marker | null>(null);
  const pick = useRef(onPick);
  pick.current = onPick;
  const url = mapStyleUrl();

  // biome-ignore lint/correctness/useExhaustiveDependencies: created once; the pin and center effects below keep it in sync
  useEffect(() => {
    if (!container.current || !url) return;
    const start = pin ?? center;
    const instance = new maplibregl.Map({
      container: container.current,
      style: url,
      center: [start.lng, start.lat],
      zoom: pin ? 15 : zoom,
      attributionControl: { compact: true },
    });
    instance.addControl(
      new maplibregl.NavigationControl({ showCompass: false }),
      "top-right",
    );
    instance.on("click", (event) => {
      pick.current({ lat: event.lngLat.lat, lng: event.lngLat.lng });
    });
    const observer = new ResizeObserver(() => instance.resize());
    observer.observe(container.current);
    map.current = instance;
    return () => {
      observer.disconnect();
      instance.remove();
      map.current = null;
      marker.current = null;
    };
  }, [url]);

  // A new city: move there (only while no pin is placed).
  // biome-ignore lint/correctness/useExhaustiveDependencies: follow the city, not every pin change
  useEffect(() => {
    if (!map.current || pin) return;
    map.current.jumpTo({ center: [center.lng, center.lat], zoom });
  }, [center.lat, center.lng, zoom]);

  // The pin: create, move, or remove it; fly to a pin set from the search.
  useEffect(() => {
    const instance = map.current;
    if (!instance) return;
    if (!pin) {
      marker.current?.remove();
      marker.current = null;
      return;
    }
    if (!marker.current) {
      const element = document.createElement("div");
      element.className = styles.pin;
      element.setAttribute("aria-hidden", "true");
      marker.current = new maplibregl.Marker({
        element,
        anchor: "bottom",
        draggable: true,
      })
        .setLngLat([pin.lng, pin.lat])
        .addTo(instance);
      marker.current.on("dragend", () => {
        const at = marker.current?.getLngLat();
        if (at) pick.current({ lat: at.lat, lng: at.lng });
      });
    } else {
      marker.current.setLngLat([pin.lng, pin.lat]);
    }
    const bounds = instance.getBounds();
    if (!bounds.contains([pin.lng, pin.lat]) || instance.getZoom() < 13) {
      instance.flyTo({
        center: [pin.lng, pin.lat],
        zoom: Math.max(instance.getZoom(), 15),
      });
    }
  }, [pin]);

  if (!url) {
    return (
      <div className={`${styles.map} ${styles.missing}`}>
        The map needs NEXT_PUBLIC_LOCATION_API_KEY.
      </div>
    );
  }
  return <div ref={container} className={styles.map} />;
}
