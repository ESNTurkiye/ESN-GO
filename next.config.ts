import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'cdn.goturkiye.com',
            },
            {
                protocol: 'https',
                hostname: 'scontent.cdninstagram.com',
            },
        ],
        qualities: [75, 85],
    },
};

export default nextConfig;