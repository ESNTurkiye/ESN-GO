import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "standalone",
    images: {
        qualities: [75, 85, 90],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "babas-teknoloji.s3.eu-central-1.amazonaws.com",
                port: "",
                pathname: "/esn-go/**",
            },
            {
                protocol: "https",
                hostname: "scontent.cdninstagram.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "images.unsplash.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "esnturkiye.github.io",
                port: "",
                pathname: "/esn-assets/**",
            },
        ],
    },
    poweredByHeader: false,
    allowedDevOrigins: ["local-origin.dev", "*.local-origin.dev"],
};

export default nextConfig;
