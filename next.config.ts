import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["www.notion.so", "prod-files-secure.s3.us-west-2.amazonaws.com"],
  },
};

export default nextConfig;
