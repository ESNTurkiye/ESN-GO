"use client";

import type { ExperienceItem } from "./data";
import { useEffect, useMemo, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useTransitLines } from "./hooks/useTransitLines";

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
    const [mapInstance, setMapInstance] = useState<maplibregl.Map | null>(null);
    const [isMapEnabled, setIsMapEnabled] = useState(false);
    useTransitLines(mapInstance);

    const mapStyleUrl = useMemo(() => {
        const key = process.env.NEXT_PUBLIC_MAPTILER_KEY;
        if (key) {
            return `https://api.maptiler.com/maps/streets-v2/style.json?key=${key}`;
        }
        return "https://demotiles.maplibre.org/style.json";
    }, []);

    useEffect(() => {
        if (!mapContainerRef.current || mapRef.current || !isMapEnabled) {
            return;
        }

        mapRef.current = new maplibregl.Map({
            container: mapContainerRef.current,
            style: mapStyleUrl,
            center: [35, 39],
            zoom: 5.5,
            attributionControl: false,
        });
        setMapInstance(mapRef.current);

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

        const onLoad = () => {
            // Zoom to active item's city if available
            if (activeId && items.length > 0) {
                const activeItem = items.find((item) => item.id === activeId);
                if (activeItem && mapRef.current) {
                    mapRef.current.flyTo({
                        center: [activeItem.lng, activeItem.lat],
                        zoom: 10,
                        duration: 800,
                    });
                }
            }
            syncBounds();
        };

        mapRef.current.on("load", onLoad);
        mapRef.current.on("moveend", syncBounds);

        return () => {
            mapRef.current?.off("load", onLoad);
            mapRef.current?.off("moveend", syncBounds);
            mapRef.current?.remove();
            mapRef.current = null;
            setMapInstance(null);
        };
    }, [mapStyleUrl, onBoundsChange, activeId, items]);

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
        <div className="relative h-[56vh] lg:h-full overflow-hidden rounded-lg">
            <div
                ref={mapContainerRef}
                className={`h-full w-full transition-all duration-300 ${isMapEnabled ? "blur-0" : "blur-md"}`}
            />
            {!isMapEnabled && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-b from-transparent to-gray-100/80">
                    <p className="text-center text-sm font-medium text-gray-700">
                        View experiences on map
                    </p>
                    <button
                        onClick={() => setIsMapEnabled(true)}
                        type="button"
                        className="rounded-lg bg-esn-magenta px-6 py-2.5 text-white font-semibold hover:bg-esn-magenta/90 transition-colors"
                    >
                        View Map
                    </button>
                </div>
            )}
        </div>
    );
}