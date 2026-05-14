import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const OVERPASS_URLS = [
    "https://overpass-api.de/api/interpreter",
    "https://overpass.kumi.systems/api/interpreter",
];
const MAX_RETRIES_PER_ENDPOINT = 3;
const BASE_BACKOFF_MS = 1500;
const OUTPUT_FILE = path.join(process.cwd(), "public/transit/turkey-rail.geojson");

const query = `
[out:json][timeout:180];
area["ISO3166-1"="TR"]->.turkey;
(
  relation["route"~"^(subway|tram|rail|train|light_rail|monorail|funicular)$"]["public_transport"="route"](area.turkey);
  relation["route"~"^(subway|tram|rail|train|light_rail|monorail|funicular)$"](area.turkey);
);
(._;>;);
out geom;
`;

async function fetchTransitGeoJson() {
    let payload = null;
    let lastError = null;

    for (const url of OVERPASS_URLS) {
        for (let attempt = 1; attempt <= MAX_RETRIES_PER_ENDPOINT; attempt += 1) {
            try {
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "text/plain;charset=UTF-8",
                        "User-Agent":
                            "ESN-GO Transit Fetcher/1.0 (+https://github.com/ESNTurkiye/ESN-GO)",
                        Referer: "https://esngo.org",
                    },
                    body: query,
                });

                if (response.status === 429) {
                    const backoffMs = BASE_BACKOFF_MS * 2 ** (attempt - 1);
                    console.warn(
                        `fetch-transit: ${url} rate-limited (attempt ${attempt}/${MAX_RETRIES_PER_ENDPOINT}), waiting ${backoffMs}ms...`,
                    );
                    await new Promise((resolve) => setTimeout(resolve, backoffMs));
                    continue;
                }

                if (!response.ok) {
                    throw new Error(
                        `Overpass request failed (${url}) with status ${response.status}`,
                    );
                }

                payload = await response.json();
                break;
            } catch (error) {
                lastError = error;
                if (attempt < MAX_RETRIES_PER_ENDPOINT) {
                    const backoffMs = BASE_BACKOFF_MS * 2 ** (attempt - 1);
                    console.warn(
                        `fetch-transit: ${url} failed (attempt ${attempt}/${MAX_RETRIES_PER_ENDPOINT}), retrying in ${backoffMs}ms...`,
                    );
                    await new Promise((resolve) => setTimeout(resolve, backoffMs));
                }
            }
        }

        if (payload) {
            break;
        }
    }

    if (!payload) {
        throw lastError ?? new Error("Overpass request failed");
    }

    const elements = Array.isArray(payload.elements) ? payload.elements : [];

    const features = elements
        .filter(
            (element) =>
                element.type === "relation" &&
                Array.isArray(element.members) &&
                element.members.length > 0,
        )
        .map((relation) => {
            const segments = relation.members
                .filter(
                    (member) =>
                        member.type === "way" &&
                        Array.isArray(member.geometry) &&
                        member.geometry.length > 1,
                )
                .map((member) =>
                    member.geometry.map((point) => [point.lon, point.lat]),
                );

            if (segments.length === 0) {
                return null;
            }

            return {
                type: "Feature",
                properties: {
                    route: relation.tags?.route ?? "rail",
                    name: relation.tags?.name ?? "",
                    colour: relation.tags?.colour ?? null,
                },
                geometry:
                    segments.length === 1
                        ? {
                              type: "LineString",
                              coordinates: segments[0],
                          }
                        : {
                              type: "MultiLineString",
                              coordinates: segments,
                          },
            };
        })
        .filter(Boolean);

    return { type: "FeatureCollection", features };
}

async function writeTransitGeoJson(geojson) {
    await mkdir(path.dirname(OUTPUT_FILE), { recursive: true });
    await writeFile(OUTPUT_FILE, JSON.stringify(geojson));
}

async function main() {
    try {
        const geojson = await fetchTransitGeoJson();
        await writeTransitGeoJson(geojson);
        console.log(`fetch-transit: saved ${geojson.features.length} segments`);
    } catch (error) {
        console.warn("fetch-transit: failed, keeping existing transit dataset.");
        console.warn(error);
    }
}

await main();
