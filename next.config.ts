import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // 允许任何 HTTPS 图片
      },
    ],
  },
};

export default nextConfig;
