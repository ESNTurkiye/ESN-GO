"use client";

import type { ExperienceItem } from "./data";
import { useEffect, useMemo, useRef } from "react";
import maplibregl from "maplibre-gl";

interface MapPlaceholderProps {
    items: ExperienceItem[];
    activeId: string | null;
    onSelect: (id: string) => void;
    onBoundsChange: (bounds: {
        minLat: number;
        maxLat: number;
        minLng: number;
        maxLng: number;
    }) => void;
}

export default function MapPlaceholder({
    items,
    activeId,
    onSelect,
    onBoundsChange,
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

        const syncBounds = () => {
            const bounds = mapRef.current?.getBounds();
            if (!bounds) {
                return;
            }
            onBoundsChange({
                minLat: bounds.getSouth(),
                maxLat: bounds.getNorth(),
                minLng: bounds.getWest(),
                maxLng: bounds.getEast(),
            });
        };

        mapRef.current.on("load", syncBounds);
        mapRef.current.on("moveend", syncBounds);

        return () => {
            mapRef.current?.off("load", syncBounds);
            mapRef.current?.off("moveend", syncBounds);
            mapRef.current?.remove();
            mapRef.current = null;
        };
    }, [mapStyleUrl, onBoundsChange]);

    useEffect(() => {
        if (!mapRef.current) {
            return;
        }

        markersRef.current.forEach((marker) => marker.remove());
        markersRef.current.clear();

        items.forEach((item) => {
            const markerEl = document.createElement("button");
            markerEl.type = "button";
            markerEl.style.width = "1rem";
            markerEl.style.height = "1rem";
            markerEl.style.borderRadius = "50%";
            markerEl.style.border = "2px solid white";
            markerEl.style.backgroundColor = "#ec008c";
            markerEl.style.boxShadow = "0 1px 3px 0 rgb(0 0 0 / 0.1)";
            markerEl.style.cursor = "pointer";
            markerEl.setAttribute("aria-label", `Focus ${item.title}`);
            markerEl.onmouseenter = () => onSelect(item.id);
            markerEl.onfocus = () => onSelect(item.id);

            const marker = new maplibregl.Marker({
                element: markerEl,
                anchor: "center",
            })
                .setLngLat([item.lng, item.lat])
                .addTo(mapRef.current as maplibregl.Map);
            markersRef.current.set(item.id, marker);
        });

    }, [items, onSelect]);

    useEffect(() => {
        markersRef.current.forEach((marker, id) => {
            const markerEl = marker.getElement();
            if (id === activeId) {
                markerEl.style.backgroundColor = "#2e3192";
                markerEl.style.width = "1.25rem";
                markerEl.style.height = "1.25rem";
                markerEl.style.boxShadow = "0 4px 6px -1px rgb(0 0 0 / 0.1)";
            } else {
                markerEl.style.backgroundColor = "#ec008c";
                markerEl.style.width = "1rem";
                markerEl.style.height = "1rem";
                markerEl.style.boxShadow = "0 1px 3px 0 rgb(0 0 0 / 0.1)";
            }
        });
    }, [activeId, items]);

    return (
        <div className="h-[56vh] lg:h-full overflow-hidden">
            <div ref={mapContainerRef} className="h-full w-full" />
        </div>
    );
}