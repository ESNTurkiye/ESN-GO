import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "standalone",
    images: {
        qualities: [75, 85, 90],
        remotePatterns: [
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