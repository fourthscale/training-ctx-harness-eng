import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emits a minimal self-contained server, used by the Docker image.
  output: "standalone",
};

export default nextConfig;
