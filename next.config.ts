import type { NextConfig } from "next";

const nextConfig = {
  // Add this to ensure API routes work
  experimental: {
    appDir: true,
  }
}
export default nextConfig;
