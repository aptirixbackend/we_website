import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Voice Agent lives on its own product app.
      { source: "/voice-agent", destination: "https://callagent.lazyrabbit.in", permanent: false },
    ];
  },
};

export default nextConfig;
