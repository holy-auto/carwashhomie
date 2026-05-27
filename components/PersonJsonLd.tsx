import { BUSINESS, SITE } from "@/lib/constants";

/* Person schema for the doctor / operator. Surfaces author /
   founder info to search engines so Google can build a richer
   Knowledge Panel and associate the brand with the named
   professional. Rendered on /doctor. */
export default function PersonJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE.url}/doctor#person`,
    name: BUSINESS.operator,
    jobTitle: BUSINESS.operatorTitle,
    worksFor: { "@id": `${SITE.url}/#business` },
    affiliation: { "@id": `${SITE.url}/#business` },
    url: `${SITE.url}/doctor`,
    image: `${SITE.url}/logo.png`,
    sameAs: [BUSINESS.instagramUrl, BUSINESS.xUrl],
    knowsAbout: [
      "自動車整備",
      "コーティング",
      "ガラスコーティング",
      "セラミックコーティング",
      "車磨き",
      "ディテーリング",
      "洗車",
    ],
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "license",
        name: BUSINESS.operatorTitle,
        recognizedBy: {
          "@type": "GovernmentOrganization",
          name: "国土交通省",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
