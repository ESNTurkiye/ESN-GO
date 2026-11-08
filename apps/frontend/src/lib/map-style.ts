/**
 * Amazon Location map style (standard: Harita standardı): Monochrome, Light scheme.
 * null when the map key is not configured (local dev without .env.local).
 */
export function mapStyleUrl(): string | null {
  const key = process.env.NEXT_PUBLIC_LOCATION_API_KEY;
  const region = process.env.NEXT_PUBLIC_LOCATION_REGION ?? "eu-central-1";
  if (!key) return null;
  return `https://maps.geo.${region}.amazonaws.com/v2/styles/Monochrome/descriptor?key=${encodeURIComponent(key)}&color-scheme=Light`;
}
