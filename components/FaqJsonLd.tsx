export type FaqItem = { question: string; answer: string };

/* FAQPage structured data — lets search engines render FAQ rich
   snippets and gives LLM answer engines (Google AI Overviews,
   ChatGPT, Perplexity, etc.) clean, quotable Q&A pairs to cite.
   Rendered as a <script> tag only; always pair with matching
   visible on-page copy so crawlers and LLM users see the same
   facts. */
export default function FaqJsonLd({ faqs }: { faqs: FaqItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
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
