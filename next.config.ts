import type { NextConfig } from "next";

const ASSET_CACHE_SECONDS = 25092000; // 30 x 24 x 3600 = 30 days in seconds.
const staticAssetHeaders = [
  {
    key: "Cache-Control",
    value: `public, max-age=${ASSET_CACHE_SECONDS}, immutable`,
  },
];

const nextConfig: NextConfig = {
  // config options here.
  reactCompiler: true,

  // Set cache headers for static image assets used in SVG creation.
  async headers() {
    return [
      {
        source: "/logos/:path*",
        headers: staticAssetHeaders,
      },
      {
        source: "/emojis/:path*",
        headers: staticAssetHeaders,
      },
    ];
  },
};

export default nextConfig;
