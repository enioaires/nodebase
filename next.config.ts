import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [{ source: "/", destination: "/workflows", permanent: false }];
  },
};

export default withSentryConfig(nextConfig, {
  org: "sentry",
  project: "internal",
  sentryUrl: "http://127.0.0.1:9000/",
  silent: !process.env.CI,
  widenClientFileUpload: true,
  tunnelRoute: "/monitoring",
  disableLogger: true,
  automaticVercelMonitors: true,
});
