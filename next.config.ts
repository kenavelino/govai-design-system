import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
