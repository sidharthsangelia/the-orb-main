import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    SC_DISABLE_SPEEDY: "false",
  },
  images: {
    /*
     * `images.domains` was removed in Next 16. remotePatterns is the
     * replacement and is stricter by design: it pins the protocol and the
     * path prefix rather than trusting an entire host.
     */
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
