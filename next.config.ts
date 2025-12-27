import type { NextConfig } from "next";
import bundleAnalyzer from '@next/bundle-analyzer';

// Bundle analyzer setup
const withBundleAnalyzer = bundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
    output: 'standalone',
    images: {
        formats: ['image/avif', 'image/webp'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        minimumCacheTTL: 60,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'babas-teknoloji.s3.eu-central-1.amazonaws.com',
                port: '',
                pathname: '/esn-go/**',
            },
            {
                protocol: 'https',
                hostname: 'scontent.cdninstagram.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'raw.githubusercontent.com',
                port: '',
                pathname: '/**',
            }
        ],
    },
    compress: true,
    poweredByHeader: false,
    allowedDevOrigins: [
        'local-origin.dev', '*.local-origin.dev'
    ],
};

export default withBundleAnalyzer(nextConfig);