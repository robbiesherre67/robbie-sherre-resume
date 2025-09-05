import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone", // required for our GoDaddy deploy
  // no basePath when serving the app at domain root
};

export default nextConfig;