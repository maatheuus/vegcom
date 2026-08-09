import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  async headers() {
    const isDev = process.env.NODE_ENV === "development";
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "";
    // Use only the origin so CSP doesn't block subpaths (e.g. /api/v1/auth/signin)
    const apiOrigin = (() => {
      try {
        return apiUrl ? new URL(apiUrl).origin : "";
      } catch {
        return apiUrl;
      }
    })();

    const connectSrc = [
      "'self'",
      apiOrigin,
      "https://*.sentry.io",
      "https://www.google-analytics.com",
      "https://analytics.google.com",
      "https://www.googletagmanager.com",
      "https://vitals.vercel-insights.com",
      "https://va.vercel-scripts.com",
      "https://vercel.live",
      // emoji-mart fetches i18n locale files from jsdelivr when locale != "en"
      "https://cdn.jsdelivr.net",
      // useCitiesSearch hook fetches directly from IBGE API in the browser
      "https://servicodados.ibge.gov.br",
      // DiceBear avatar presets fetched client-side for canvas conversion
      "https://api.dicebear.com",
      // Reverse geocoding: resolve address/city from map pin coordinates
      "https://nominatim.openstreetmap.org",
    ]
      .filter(Boolean)
      .join(" ");

    const csp = [
      "default-src 'self'",
      // 'unsafe-inline' required: Google Analytics inline gtag script + Next.js hydration chunks
      // 'unsafe-eval' required in dev only: Next.js webpack uses eval-based source maps
      // vercel.live required: Vercel toolbar/feedback widget injected at runtime
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com https://va.vercel-scripts.com https://vercel.live https://cdn.jsdelivr.net https://challenges.cloudflare.com`,
      "style-src 'self' 'unsafe-inline'",
      [
        "img-src 'self' data: blob:",
        "https://res.cloudinary.com",
        "https://images.unsplash.com",
        "https://plus.unsplash.com",
        "https://picsum.photos",
        "https://github.com",
        "https://randomuser.me",
        "https://www.google-analytics.com",
        "https://api.dicebear.com",
        "https://*.tile.openstreetmap.org",
        "https://*.basemaps.cartocdn.com",
      ].join(" "),
      // next/font/google self-hosts fonts at build time → 'self' is sufficient
      "font-src 'self'",
      `connect-src ${connectSrc}`,
      // blob: required for Web Workers spawned by Next.js/webpack chunks
      "worker-src blob: 'self'",
      // vercel.live toolbar renders inside an iframe
      "frame-src https://vercel.live https://challenges.cloudflare.com",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join("; ");

    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(self), interest-cohort=()",
          },
          { key: "Content-Security-Policy", value: csp },
          {
            key: "Link",
            value: [
              '</.well-known/api-catalog>; rel="api-catalog"',
              '</.well-known/agent-skills/index.json>; rel="agent-skills"',
            ].join(", "),
          },
        ],
      },
    ];
  },

  experimental: {
    viewTransition: true,
    useCache: true,
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: "vegcom-f7",
  project: "sentry-vegcom",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-side errors will fail.
  tunnelRoute: "/monitoring",

  webpack: {
    // Automatically tree-shake Sentry logger statements to reduce bundle size
    treeshake: {
      removeDebugLogging: true,
    },

    // Enables automatic instrumentation of Vercel Cron Monitors.
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,

    // Automatically annotate React components to show their full name in breadcrumbs and session replay
    reactComponentAnnotation: {
      enabled: true,
    },
  },
});
