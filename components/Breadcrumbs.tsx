import { SITE } from "@/lib/constants";

/* BreadcrumbList structured data — emits a JSON-LD breadcrumb
   trail for search engines. Rendered as a <script> tag only;
   no visible DOM (visible breadcrumbs, if any, are handled by
   the page UI). Used on sub-pages so Google can show the crumb
   trail in search results. */
export type Crumb = { name: string; path: string };

export default function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE.url}${c.path}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
