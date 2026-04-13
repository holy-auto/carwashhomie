import { BUSINESS, SITE } from "@/lib/constants";

/* Structured data for Google / Bing / social crawlers.
   Emits an AutomotiveBusiness LocalBusiness schema with
   address, hours, contact, and legal registration number. */
export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AutomotiveBusiness",
    "@id": `${SITE.url}/#business`,
    name: BUSINESS.nameJa,
    alternateName: BUSINESS.nameEn,
    legalName: BUSINESS.nameJa,
    slogan: BUSINESS.tagline,
    description: SITE.description,
    url: SITE.url,
    image: `${SITE.url}${SITE.ogImage}`,
    logo: `${SITE.url}/logo.png`,
    telephone: `+81-${BUSINESS.phone.replace(/^0/, "").replace(/-/g, "-")}`,
    priceRange: "¥¥",
    taxID: BUSINESS.registrationNumber,
    address: {
      "@type": "PostalAddress",
      postalCode: BUSINESS.postalCode,
      addressCountry: "JP",
      addressRegion: BUSINESS.addressRegion,
      addressLocality: BUSINESS.addressLocality,
      streetAddress: BUSINESS.streetAddress,
    },
    openingHoursSpecification: BUSINESS.openingHoursSpec.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: h.opens,
      closes: h.closes,
    })),
    sameAs: [BUSINESS.instagramUrl, BUSINESS.xUrl],
    founder: {
      "@type": "Person",
      name: BUSINESS.operator,
      jobTitle: BUSINESS.operatorTitle,
    },
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
