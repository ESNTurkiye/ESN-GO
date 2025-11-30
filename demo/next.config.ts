import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        domains: [
            'images.unsplash.com',
            'cdn.goturkiye.com',
            'scontent.cdninstagram.com',
        ],
        // Fixes FAQ-006: Add image quality configuration to resolve console warnings
        qualities: [75, 85],
    },
};

export default nextConfig;