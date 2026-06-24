import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "lastfm.freetls.fastly.net" },
      { protocol: "https", hostname: "upload.wikimedia.org" },      // fotos de artistas (Wikipedia)
      { protocol: "http",  hostname: "coverartarchive.org" },       // capas de álbuns
      { protocol: "https", hostname: "coverartarchive.org" },
      { protocol: "http",  hostname: "archive.org" },               // redirect do CAA
      { protocol: "https", hostname: "archive.org" },
    ],
  },
};

export default nextConfig;