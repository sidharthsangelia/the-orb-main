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
    /*
     * Next 16 serves only the qualities listed here (the default is [75]) and
     * warns on any other value. The visual story decks ask for 85 on their
     * portrait slides, so it has to be declared.
     */
    qualities: [75, 85],
  },
};

export default nextConfig;
