import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/privacy",
        destination: "/privacidade",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
