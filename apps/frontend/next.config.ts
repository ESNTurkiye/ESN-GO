import type { NextConfig } from "next";

// Photos uploaded through the API are served from the stage's CloudFront domain
// (backend output MediaCdnDomain). Only that domain may go through next/image.
const mediaCdn = process.env.NEXT_PUBLIC_MEDIA_CDN?.replace(/\/$/, "");

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    remotePatterns: mediaCdn ? [new URL(`${mediaCdn}/**`)] : [],
  },
};

export default nextConfig;
