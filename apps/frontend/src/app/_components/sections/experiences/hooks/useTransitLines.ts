import { useEffect } from "react";
import type maplibregl from "maplibre-gl";

const SOURCE_ID = "turkey-transit";
const LAYER_ID = "turkey-transit-lines";
let transitDataPromise: Promise<TransitFeatureCollection> | null = null;


type TransitFeature = {
    type: "Feature";
    properties?: {
        route?: string;
        name?: string;
    };
    geometry?: {
        type?: string;
        coordinates?: unknown;
    };
};

type TransitFeatureCollection = {
    type: "FeatureCollection";
    features: TransitFeature[];
};

function normalizeText(value: string): string {
    return value
        .toLocaleLowerCase("tr-TR")
        .normalize("NFD")
        .replace(/[ıİ]/g, "i")
        .replace(/\p{Diacritic}/gu, "")
        .replace(/\s+/g, " ")
        .trim();
}

function isRailRoute(route: string): boolean {
    return [
        "subway",
        "tram",
        "light_rail",
        "rail",
        "train",
        "monorail",
        "funicular",
    ].includes(route);
}

function isHighSpeedRail(name: string): boolean {
    const normalized = normalizeText(name);
    return (
        normalized.includes("yht") ||
        normalized.includes("yuksek hiz") ||
        normalized.includes("high speed")
    );
}

function isPoint(value: unknown): value is [number, number] {
    return (
        Array.isArray(value) &&
        value.length >= 2 &&
        typeof value[0] === "number" &&
        typeof value[1] === "number"
    );
}

function collectPoints(value: unknown, points: [number, number][]): void {
    if (isPoint(value)) {
        points.push([value[0], value[1]]);
        return;
    }

    if (Array.isArray(value)) {
        value.forEach((entry) => {
            collectPoints(entry, points);
        });
    }
}

function collectAllPoints(geometry: TransitFeature["geometry"] | undefined): [number, number][] {
    const points: [number, number][] = [];
    if (!geometry?.coordinates) return points;
    collectPoints(geometry.coordinates, points);
    return points;
}

function canonicalLineKey(route: string, name: string): string {
    const normalizedName = normalizeText(name)
        .replace(/\([^)]*\)/g, "")
        .replace(/[→←↔>]/g, "-")
        .replace(/\bto\b/g, "-")
        .replace(/\s*[-–—]+\s*/g, "-");

    const label = normalizedName.includes(":")
        ? normalizedName.split(":").slice(1).join(":").trim()
        : normalizedName;

    const parts = label.split("-").map((part) => part.trim()).filter(Boolean);
    if (parts.length === 2) {
        const sorted = [parts[0], parts[1]].sort();
        return `${route}:${sorted.join("-")}`;
    }

    if (parts.length > 2) {
        const head = parts[0];
        const tail = parts[parts.length - 1];
        const middle = parts.slice(1, -1).join("-");
        const sortedEndpoints = [head, tail].sort();
        return `${route}:${sortedEndpoints[0]}-${middle}-${sortedEndpoints[1]}`;
    }

    return `${route}:${label}`;
}

async function loadFilteredTransitData(): Promise<TransitFeatureCollection> {
    if (!transitDataPromise) {
        transitDataPromise = (async () => {
            const response = await fetch("/transit/turkey-rail.geojson");
            if (!response.ok) {
                throw new Error("Failed to load transit data");
            }

            const raw = (await response.json()) as TransitFeatureCollection;
            const seen = new Set<string>();

            const features = raw.features.filter((feature) => {
                const route = feature.properties?.route?.toLowerCase() ?? "";
                const name = feature.properties?.name ?? "";

                if (!route || !isRailRoute(route)) {
                    return false;
                }

                // Expose all features across Türkiye (no city cropping),
                // but keep only rail-related routes and filter out high-speed rails.
                if (isHighSpeedRail(name)) {
                    return false;
                }

                // ensure feature has at least one coordinate point
                const points = collectAllPoints(feature.geometry);
                if (points.length === 0) {
                    return false;
                }

                const key = canonicalLineKey(route, name);
                if (seen.has(key)) {
                    return false;
                }

                seen.add(key);
                return true;
            });

            return {
                type: "FeatureCollection",
                features,
            };
        })();
    }

    try {
        return await transitDataPromise;
    } catch (error) {
        transitDataPromise = null;
        throw error;
    }
}

export function useTransitLines(map: maplibregl.Map | null) {
    useEffect(() => {
        if (!map) {
            return;
        }

        let cancelled = false;

        const addTransitLayer = async () => {
            if (map.getSource(SOURCE_ID)) {
                return;
            }

            let data: TransitFeatureCollection = {
                type: "FeatureCollection",
                features: [],
            };

            try {
                data = await loadFilteredTransitData();
            } catch {
                return;
            }

            if (cancelled) {
                return;
            }

            map.addSource(SOURCE_ID, {
                type: "geojson",
                data: data as never,
            });

            map.addLayer({
                id: LAYER_ID,
                type: "line",
                source: SOURCE_ID,
                paint: {
                    "line-color": [
                        "match",
                        ["get", "route"],
                        "subway",
                        "#E84141",
                        "tram",
                        "#F47B20",
                        "light_rail",
                        "#EC008C",
                        "rail",
                        "#2E3192",
                        "train",
                        "#2E3192",
                        "monorail",
                        "#7AC143",
                        "funicular",
                        "#00AEEF",
                        "#2E3192",
                    ],
                    "line-width": [
                        "interpolate",
                        ["linear"],
                        ["zoom"],
                        8,
                        1,
                        12,
                        2.5,
                        15,
                        4,
                    ],
                    "line-opacity": 0.85,
                },
            });
        };

        if (map.isStyleLoaded()) {
            void addTransitLayer();
        } else {
            map.on("load", addTransitLayer);
        }

        return () => {
            cancelled = true;
            map.off("load", addTransitLayer);

            if (map.getLayer(LAYER_ID)) {
                map.removeLayer(LAYER_ID);
            }

            if (map.getSource(SOURCE_ID)) {
                map.removeSource(SOURCE_ID);
            }
        };
    }, [map]);
}
