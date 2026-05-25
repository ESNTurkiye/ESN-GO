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
    focusBounds?: {
        minLat: number;
        maxLat: number;
        minLng: number;
        maxLng: number;
    } | null;
    // when true, do not emit onBoundsChange (used while programmatically animating fits)
    suppressOnBoundsChange?: boolean;
    // optional callback invoked when a programmatic fit animation completes
    onFitComplete?: () => void;
}

export default function MapPlaceholder({
    items,
    activeId,
    onSelect,
    onBoundsChange,
    focusBounds = null,
    suppressOnBoundsChange = false,
    onFitComplete,
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
            // start more zoomed out so whole Türkiye is visible (matches placeholder image)
            center: [35.5, 39],
            zoom: 4.6,
            pitch: 0,
            bearing: 0,
            attributionControl: false,
            dragRotate: false,
            pitchWithRotate: false,
        });
        setMapInstance(mapRef.current);

        const nav = new maplibregl.NavigationControl({ showCompass: false });
        mapRef.current.addControl(nav, "top-right");
        try {
            const container = mapRef.current.getContainer().querySelector(
                ".maplibregl-ctrl-top-right",
            ) as HTMLElement | null;
            if (container) {
                container.style.transform = "scale(0.9)";
                container.style.top = "8px";
                container.style.right = "8px";
            }
        } catch {
            // ignore styling failures
        }

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

            if (suppressOnBoundsChange) return;

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

    useEffect(() => {
        if (!mapRef.current || !focusBounds) {
            return;
        }

        try {
            mapRef.current.fitBounds(
                [
                    [focusBounds.minLng, focusBounds.minLat],
                    [focusBounds.maxLng, focusBounds.maxLat],
                ],
                {
                    padding: 24,
                    duration: 900,
                    essential: true,
                },
            );
            // notify caller when animation completes
            const onMoveEnd = () => {
                try {
                    onFitComplete?.();
                } catch {
                    // ignore
                }
            };
            mapRef.current.once("moveend", onMoveEnd);
        } catch {
            // ignore fit animation failures
        }
    }, [focusBounds]);

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
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                    <img
                        src="/experiences-cover-map.png"
                        alt="Harita önizleme"
                        className="absolute inset-0 h-full w-full object-cover blur-md scale-[1.03]"
                    />

                    <div className="absolute inset-0 bg-white/10" />

                    <button
                        type="button"
                        onClick={() => setShowMap(true)}
                        className="px-4 py-2 bg-white/90 rounded shadow z-20"
                    >
                        Haritayı Görüntüle
                    </button>
                </div>
            )}

            <div ref={mapContainerRef} className="h-full w-full" />
        </div>
    );
}