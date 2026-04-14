/* Central constants for business info — change once, propagate
   everywhere. Used across Navbar, Hero, Reservation, Access,
   Footer, tokusho, privacy, metadata / JSON-LD etc. */

export const BUSINESS = {
  /* Human-facing name */
  nameJa: "車の美容外科 Car Wash Homies",
  nameEn: "Car Wash Homies",
  tagline: "車の寿命を延ばし、価値を守る",

  /* Contact */
  phone: "048-606-4977",
  phoneTel: "0486064977", // for tel: links
  email: "japanesedetailergirl@gmail.com",
  instagramHandle: "japanese_detailer_girl",
  instagramUrl: "https://www.instagram.com/japanese_detailer_girl/",
  xHandle: "DetailerGirl",
  xUrl: "https://x.com/DetailerGirl",

  /* Address */
  postalCode: "339-0021",
  addressLine: "埼玉県さいたま市岩槻区末田2421-2",
  addressRegion: "埼玉県",
  addressLocality: "さいたま市岩槻区",
  streetAddress: "末田2421-2",

  /* Hours / legal */
  hours: "10:00 — 19:00",
  hoursNote: "不定休",
  openingHoursSpec: [{ opens: "10:00", closes: "19:00" }],
  registrationNumber: "T8810011150208", // 適格請求書発行事業者登録番号

  /* Responsible person */
  operator: "中山 春香",
  operatorTitle: "二級自動車整備士",
} as const;

export const SITE = {
  url: "https://carwashhomies.com",
  name: BUSINESS.nameJa,
  description:
    "埼玉県さいたま市岩槻区の車の美容外科 Car Wash Homies。塗装状態・使用環境・年式を診断し、車両ごとに最適な施術計画をご提案。コーティング・洗車・磨きなど、車の寿命を延ばし価値を守る施術をご提供します。",
  ogImage: "/og-image.png",
  locale: "ja_JP",
} as const;

/* Build a standard Next.js `Metadata` object for a sub-page.
   Centralizes canonical URL, Open Graph, Twitter Card, and
   keyword tags so every page gets the same SEO treatment
   without duplicating boilerplate. */
export function pageMetadata({
  title,
  description,
  path,
  keywords,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: readonly string[];
}) {
  const fullTitle = `${title} | ${BUSINESS.nameJa}`;
  return {
    title, // root-layout template adds the "| 車の美容外科..." suffix
    description,
    keywords: keywords ? [...keywords] : undefined,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website" as const,
      locale: SITE.locale,
      url: `${SITE.url}${path}`,
      siteName: BUSINESS.nameJa,
      title: fullTitle,
      description,
      images: [
        {
          url: SITE.ogImage,
          width: 1200,
          height: 630,
          alt: BUSINESS.nameJa,
        },
      ],
    },
    twitter: {
      card: "summary_large_image" as const,
      title: fullTitle,
      description,
      images: [SITE.ogImage],
      creator: `@${BUSINESS.xHandle}`,
    },
  };
}
