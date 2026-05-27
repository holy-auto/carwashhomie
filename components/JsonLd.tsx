import { BUSINESS, SITE } from "@/lib/constants";

/* Structured data for Google / Bing / social crawlers.
   Emits AutomotiveBusiness LocalBusiness schema with address,
   geo, opening hours, contact, accepted payments, area served,
   and an OfferCatalog listing the headline services so the
   business is eligible for richer SERP features. */

const allDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

export default function JsonLd() {
  const openDays = allDays.filter(
    (d) => !BUSINESS.closedDays.includes(d as (typeof BUSINESS.closedDays)[number]),
  );

  const schema = {
    "@context": "https://schema.org",
    "@type": ["AutomotiveBusiness", "LocalBusiness"],
    "@id": `${SITE.url}/#business`,
    name: BUSINESS.nameJa,
    alternateName: BUSINESS.nameEn,
    legalName: BUSINESS.nameJa,
    slogan: BUSINESS.tagline,
    description: SITE.description,
    url: SITE.url,
    image: [`${SITE.url}/logo.png`, `${SITE.url}${SITE.ogImage}`],
    logo: `${SITE.url}/logo.png`,
    telephone: `+81-${BUSINESS.phone.replace(/^0/, "").replace(/-/g, "-")}`,
    email: BUSINESS.email,
    priceRange: "¥¥",
    taxID: BUSINESS.registrationNumber,
    currenciesAccepted: BUSINESS.currenciesAccepted,
    paymentAccepted: [...BUSINESS.paymentAccepted].join(", "),
    address: {
      "@type": "PostalAddress",
      postalCode: BUSINESS.postalCode,
      addressCountry: "JP",
      addressRegion: BUSINESS.addressRegion,
      addressLocality: BUSINESS.addressLocality,
      streetAddress: BUSINESS.streetAddress,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS.latitude,
      longitude: BUSINESS.longitude,
    },
    hasMap: BUSINESS.mapUrl,
    areaServed: BUSINESS.areaServed.map((a) => ({
      "@type": "City",
      name: a,
    })),
    openingHoursSpecification: BUSINESS.openingHoursSpec.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: openDays,
      opens: h.opens,
      closes: h.closes,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "施術メニュー",
      itemListElement: BUSINESS.services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.name,
          description: s.desc,
          provider: { "@id": `${SITE.url}/#business` },
          areaServed: BUSINESS.addressRegion,
        },
        priceCurrency: BUSINESS.currenciesAccepted,
        url: `${SITE.url}/menu`,
      })),
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: `+81-${BUSINESS.phone.replace(/^0/, "").replace(/-/g, "-")}`,
        email: BUSINESS.email,
        areaServed: "JP",
        availableLanguage: ["Japanese"],
      },
    ],
    sameAs: [BUSINESS.instagramUrl, BUSINESS.xUrl, BUSINESS.lineUrl],
    founder: {
      "@type": "Person",
      name: BUSINESS.operator,
      jobTitle: BUSINESS.operatorTitle,
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: BUSINESS.nameJa,
    inLanguage: "ja-JP",
    publisher: { "@id": `${SITE.url}/#business` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
