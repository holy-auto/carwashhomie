import Script from "next/script";

/* Google Analytics 4 (gtag.js).
   Rendered only when NEXT_PUBLIC_GA_ID (e.g. "G-XXXXXXXXXX") is set,
   so local dev / previews without the variable send nothing.
   Client-side route changes are tracked by GA4's Enhanced Measurement
   ("Page changes based on browser history events"), which is on by
   default — no manual page_view calls needed. */

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

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
