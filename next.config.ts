import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
   
    SC_DISABLE_SPEEDY: "false",
  },
  images: {
    domains: ["cdn.sanity.io"],
  },
  eslint: {
    
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
