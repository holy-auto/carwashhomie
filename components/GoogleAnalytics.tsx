import Script from "next/script";

/* Google Analytics 4 (gtag.js).
   - NEXT_PUBLIC_GA_ID set → that ID is used in any environment.
   - Otherwise the site's own property (DEFAULT_GA_ID) is used, but only
     on the Vercel production deployment, so local dev and preview URLs
     don't pollute the stats.
   Client-side route changes are tracked by GA4's Enhanced Measurement
   ("Page changes based on browser history events"), which is on by
   default — no manual page_view calls needed. */

const DEFAULT_GA_ID = "G-JF9WTVBEL3";

const GA_ID =
  process.env.NEXT_PUBLIC_GA_ID ||
  (process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ? DEFAULT_GA_ID : "");

export default function GoogleAnalytics() {
  if (!GA_ID) return null;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
    </>
  );
}
