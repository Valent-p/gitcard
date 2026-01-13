import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   output: 'export', //This turns it into static HTML files
    images: {
    unoptimized: true, //for static export
  },
};

export default nextConfig;
