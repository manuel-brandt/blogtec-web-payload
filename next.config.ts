import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/blog",
        destination: "/de/blog",
        permanent: false,
      },
      {
        source: "/blog/:slug",
        destination: "/de/blog/:slug",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
