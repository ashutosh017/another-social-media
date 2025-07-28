import { url } from "inspector";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      new URL("https://media.newyorker.com/**"),
      new URL("https://res.cloudinary.com/**"),
      new URL("https://static.cdninstagram.com/**"),
    ],
  },
  experimental:{
    optimizePackageImports:[
      '@prisma/client'
    ]
  }
};

export default nextConfig;
