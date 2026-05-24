"use client";

import type { ExperienceItem } from "./data";
import { useEffect, useMemo, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
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
    viewBounds?: {
        minLat: number;
        maxLat: number;
        minLng: number;
        maxLng: number;
    } | null;
}

export default function MapPlaceholder({
    items,
    activeId,
    onSelect,
    onBoundsChange,
    viewBounds = null,
}: MapPlaceholderProps) {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<maplibregl.Map | null>(null);
    const markersRef = useRef<Map<string, maplibregl.Marker>>(new Map());
    const [mapInstance, setMapInstance] = useState<maplibregl.Map | null>(null);
    const [showMap, setShowMap] = useState(false);
    useTransitLines(mapInstance);

    const mapStyleUrl = useMemo(() => {
        const key = process.env.NEXT_PUBLIC_MAPTILER_KEY;
        if (key) {
            return `https://api.maptiler.com/maps/streets-v2/style.json?key=${key}`;
        }
        return "https://demotiles.maplibre.org/style.json";
    }, []);

    useEffect(() => {
        if (!showMap) return;
        if (!mapContainerRef.current || mapRef.current) {
            return;
        }

        mapRef.current = new maplibregl.Map({
            container: mapContainerRef.current,
            style: mapStyleUrl,
            center: [28.97, 41.01],
            zoom: 9.5,
            pitch: 0,
            bearing: 0,
            attributionControl: false,
            dragRotate: false,
            pitchWithRotate: false,
        });
        setMapInstance(mapRef.current);

        mapRef.current.addControl(new maplibregl.NavigationControl(), "top-right");

        // enforce top-down camera and disable pitch/rotation interactions
        mapRef.current.setPitch(0);
        mapRef.current.setBearing(0);
        try {
            // use any to avoid type issues with handlers
            const m = mapRef.current as any;
            m.dragRotate?.disable?.();
            m.touchZoomRotate?.disableRotation?.();
            m.touchZoomRotate?.disable?.();
        } catch {
            // ignore if handlers unavailable
        }

        const syncBounds = () => {
            const bounds = mapRef.current?.getBounds();
            if (!bounds) {
                return;
            }

            // only emit bounds when map is effectively top-down (locked)
            const pitch = Math.abs(mapRef.current?.getPitch ? mapRef.current.getPitch() : 0);
            const bearing = Math.abs(mapRef.current?.getBearing ? mapRef.current.getBearing() : 0);
            if (pitch > 1 || bearing > 1) {
                return;
            }

            onBoundsChange({
                minLat: bounds.getSouth(),
                maxLat: bounds.getNorth(),
                minLng: bounds.getWest(),
                maxLng: bounds.getEast(),
            });
        };

        const onLoad = () => syncBounds();

        mapRef.current.on("load", onLoad);
        mapRef.current.on("moveend", syncBounds);

        return () => {
            mapRef.current?.off("load", onLoad);
            mapRef.current?.off("moveend", syncBounds);
            mapRef.current?.remove();
            mapRef.current = null;
            setMapInstance(null);
        };
    }, [mapStyleUrl, onBoundsChange, showMap]);

    // if parent supplies viewBounds, fit map to them
    useEffect(() => {
        if (!mapRef.current || !viewBounds) return;
        try {
            mapRef.current.fitBounds([
                [viewBounds.minLng, viewBounds.minLat],
                [viewBounds.maxLng, viewBounds.maxLat],
            ] as [[number, number], [number, number]], { padding: 20 });
        } catch {
            // ignore
        }
    }, [viewBounds]);

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
        <div className="h-[56vh] lg:h-full overflow-hidden relative">
            {!showMap && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-gradient-to-b from-black/10 to-transparent">
                    <button
                        type="button"
                        onClick={() => setShowMap(true)}
                        className="px-4 py-2 bg-white/90 rounded shadow"
                    >
                        Haritayı Görüntüle
                    </button>
                </div>
            )}

            <div ref={mapContainerRef} className="h-full w-full" />
        </div>
    );
}