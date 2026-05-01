import { useEffect } from "react";
import type maplibregl from "maplibre-gl";

const SOURCE_ID = "turkey-transit";
const LAYER_ID = "turkey-transit-lines";

export function useTransitLines(map: maplibregl.Map | null) {
    useEffect(() => {
        if (!map) {
            return;
        }

        const addTransitLayer = () => {
            if (map.getSource(SOURCE_ID)) {
                return;
            }

            map.addSource(SOURCE_ID, {
                type: "geojson",
                data: "/transit/turkey-rail.geojson",
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
            addTransitLayer();
        } else {
            map.on("load", addTransitLayer);
        }

        return () => {
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
