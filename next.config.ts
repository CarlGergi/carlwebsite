import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
    ],
  },
  // The site is now a single scrolling page. Old top-level routes map to the
  // matching section anchor so existing deep links never 404.
  // (/projects/[slug] detail pages are unaffected — only exact /projects matches.)
  async redirects() {
    return [
      { source: "/about", destination: "/#about", permanent: false},
      { source: "/projects", destination: "/#projects", permanent: false},
      { source: "/consulting", destination: "/#consulting", permanent: false},
      { source: "/experience", destination: "/#experience", permanent: false},
      { source: "/contact", destination: "/#contact", permanent: false},
    ];
  },
};

export default nextConfig;
