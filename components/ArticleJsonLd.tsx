import { BUSINESS, SITE } from "@/lib/constants";

/* BlogPosting structured data for a single news / useful post.
   The author is the shop's director (E-E-A-T: a named, qualified
   person) and the publisher points at the site-wide LocalBusiness
   node (`/#business`) emitted by components/JsonLd.tsx. */
export default function ArticleJsonLd({
  path,
  headline,
  description,
  image,
  datePublished,
  dateModified,
}: {
  path: string;
  headline: string;
  description: string;
  image?: string | null;
  datePublished: string;
  dateModified?: string | null;
}) {
  const url = `${SITE.url}${path}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    mainEntityOfPage: url,
    headline,
    description,
    image: [image || `${SITE.url}${SITE.ogImage}`],
    datePublished,
    dateModified: dateModified || datePublished,
    inLanguage: "ja",
    author: {
      "@type": "Person",
      name: BUSINESS.operator,
      jobTitle: BUSINESS.operatorTitle,
      url: `${SITE.url}/doctor`,
    },
    publisher: { "@id": `${SITE.url}/#business` },
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
