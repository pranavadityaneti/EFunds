import type { NextConfig } from "next";

/**
 * Domain split (one codebase, two hostnames on the same Vercel deployment):
 *   - docket.finlot.ai  → the CRM dashboard
 *   - www.finlot.ai     → the marketing / products website
 *
 * Redirects are host-scoped so each domain only serves its own surface.
 * NOTE: none of the sources below match `/api/*`, so the live lead pipeline
 * is untouched. Route paths are case-sensitive — the dashboard home is the
 * exact-case `/CRMdashboard`.
 */
const DASH_HOST = "docket.finlot.ai";
const DASH_HOST_RE = "^docket\\.finlot\\.ai$";
const SITE_HOST = "www.finlot.ai";
const SITE_HOST_RE = "^(www\\.)?finlot\\.ai$"; // apex finlot.ai canonicalizes to www

// Routes that belong to the dashboard (exact case as on disk under app/).
const DASHBOARD_ROUTES = [
  "CRMdashboard",
  "leads",
  "applications",
  "employees",
  "managers",
  "partners",
  "payouts",
  "payout-requests",
  "notifications",
  "settings",
  "contact", // "Contact & FAQs" support page, reached from the dashboard sidebar
];

// Routes that belong to the marketing / products website.
const MARKETING_ROUTES = [
  "landing",
  "B2C",
  "B2B",
  "careers",
  "business-loan-enquiry",
  "privacy-policy",
  "terms-and-conditions",
];

const nextConfig: NextConfig = {
  reactCompiler: true,

  async redirects() {
    return [
      // 1. On docket, the root IS the dashboard home.
      {
        source: "/",
        has: [{ type: "host", value: DASH_HOST_RE }],
        destination: "/CRMdashboard",
        permanent: false,
      },

      // 2. Dashboard routes don't belong on the products site → send to docket.
      ...DASHBOARD_ROUTES.flatMap((r) => [
        {
          source: `/${r}`,
          has: [{ type: "host" as const, value: SITE_HOST_RE }],
          destination: `https://${DASH_HOST}/${r}`,
          permanent: false,
        },
        {
          source: `/${r}/:path*`,
          has: [{ type: "host" as const, value: SITE_HOST_RE }],
          destination: `https://${DASH_HOST}/${r}/:path*`,
          permanent: false,
        },
      ]),

      // 3. Marketing routes don't belong on the dashboard domain → send to the site.
      ...MARKETING_ROUTES.flatMap((r) => [
        {
          source: `/${r}`,
          has: [{ type: "host" as const, value: DASH_HOST_RE }],
          destination: `https://${SITE_HOST}/${r}`,
          permanent: false,
        },
        {
          source: `/${r}/:path*`,
          has: [{ type: "host" as const, value: DASH_HOST_RE }],
          destination: `https://${SITE_HOST}/${r}/:path*`,
          permanent: false,
        },
      ]),
    ];
  },
};

export default nextConfig;
