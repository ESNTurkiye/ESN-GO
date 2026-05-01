"use client";

import type { ExperienceItem } from "./data";
import { useEffect, useMemo, useRef } from "react";
import maplibregl from "maplibre-gl";

interface MapPlaceholderProps {
    items: ExperienceItem[];
    activeId: string | null;
    onSelect: (id: string) => void;
}

export default function MapPlaceholder({
    items,
    activeId,
    onSelect,
}: MapPlaceholderProps) {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<maplibregl.Map | null>(null);
    const markersRef = useRef<Map<string, maplibregl.Marker>>(new Map());

    const mapStyleUrl = useMemo(() => {
        const key = process.env.NEXT_PUBLIC_MAPTILER_KEY;
        if (key) {
            return `https://api.maptiler.com/maps/streets-v2/style.json?key=${key}`;
        }
        return "https://demotiles.maplibre.org/style.json";
    }, []);

    useEffect(() => {
        if (!mapContainerRef.current || mapRef.current) {
            return;
        }

        mapRef.current = new maplibregl.Map({
            container: mapContainerRef.current,
            style: mapStyleUrl,
            center: [28.97, 41.01],
            zoom: 9.5,
            attributionControl: false,
        });

        mapRef.current.addControl(new maplibregl.NavigationControl(), "top-right");

        return () => {
            mapRef.current?.remove();
            mapRef.current = null;
        };
    }, [mapStyleUrl]);

    useEffect(() => {
        if (!mapRef.current) {
            return;
        }

        markersRef.current.forEach((marker) => marker.remove());
        markersRef.current.clear();

        items.forEach((item) => {
            const markerEl = document.createElement("button");
            markerEl.type = "button";
            markerEl.className =
                "h-4 w-4 rounded-full border-2 border-white shadow-sm bg-esn-magenta";
            markerEl.setAttribute("aria-label", `Focus ${item.title}`);
            markerEl.onclick = () => onSelect(item.id);

            const marker = new maplibregl.Marker({ element: markerEl })
                .setLngLat([item.lng, item.lat])
                .addTo(mapRef.current as maplibregl.Map);
            markersRef.current.set(item.id, marker);
        });

        if (items.length > 0) {
            const bounds = new maplibregl.LngLatBounds();
            items.forEach((item) => bounds.extend([item.lng, item.lat]));
            mapRef.current.fitBounds(bounds, { padding: 70, maxZoom: 12 });
        }
    }, [items, onSelect]);

    useEffect(() => {
        markersRef.current.forEach((marker, id) => {
            const markerEl = marker.getElement();
            if (id === activeId) {
                markerEl.className =
                    "h-5 w-5 rounded-full border-2 border-white shadow-md bg-esn-dark-blue";
                const active = items.find((item) => item.id === id);
                if (active) {
                    mapRef.current?.flyTo({
                        center: [active.lng, active.lat],
                        zoom: 12,
                        essential: true,
                    });
                }
            } else {
                markerEl.className =
                    "h-4 w-4 rounded-full border-2 border-white shadow-sm bg-esn-magenta";
            }
        });
    }, [activeId, items]);

    return (
        <div className="h-[56vh] lg:h-[calc(100vh-6rem)] lg:sticky lg:top-24 overflow-hidden">
            <div ref={mapContainerRef} className="h-full w-full" />
        </div>
    );
}