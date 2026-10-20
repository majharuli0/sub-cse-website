import type { NextConfig } from "next"

// Hosts allowed for next/image: the API host plus any CDN listed in IMAGE_HOSTS (comma-separated).
const imageHosts = [
  process.env.NEXT_PUBLIC_API_URL && new URL(process.env.NEXT_PUBLIC_API_URL).hostname,
  ...(process.env.IMAGE_HOSTS?.split(",") ?? []),
]
  .map((host) => host && host.trim())
  .filter((host): host is string => Boolean(host))

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: imageHosts.map((hostname) => ({ protocol: "https" as const, hostname })),
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
}

export default nextConfig
