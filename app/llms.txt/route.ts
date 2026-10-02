import {
  BUSINESS,
  SITE,
  closedDaysLabel,
  hoursLabel,
} from "@/lib/constants";
import { STATIC_ROUTES } from "@/lib/routes";
import { allFaqs } from "@/lib/faqs";
import {
  articlePath,
  getBodyCoatings,
  getBrands,
  getNewsPosts,
  getUsefulArticles,
} from "@/lib/content";

/* /llms.txt — a plain-Markdown briefing for LLM answer engines
   (format proposed at llmstxt.org): name, one-line summary, then
   sections of facts and links. Everything is generated from the same
   sources as the pages (BUSINESS, lib/routes, lib/faqs, the CMS), so
   it can never disagree with the site. Facts only — no marketing copy,
   and nothing private (admin URLs, APIs). */

export const revalidate = 3600;

export async function GET() {
  const [coatings, brands, news, useful] = await Promise.all([
    getBodyCoatings(),
    getBrands(),
    getNewsPosts(),
    getUsefulArticles(),
  ]);

  const lines = [
    `# ${BUSINESS.nameJa}`,
    "",
    `> ${SITE.description}`,
    "",
    "## 基本情報",
    "",
    `- 名称: ${BUSINESS.nameJa}（${BUSINESS.nameEn}）`,
    "- 業種: ボディコーティング・カーディテーリング専門店",
    `- 所在地: 〒${BUSINESS.postalCode} ${BUSINESS.addressLine}`,
    "- アクセス: 東北自動車道「岩槻IC」から車で約10分／東武アーバンパークライン「岩槻駅」から車で約10分／店舗前に駐車スペースあり（大型車可）",
    `- 営業時間: ${hoursLabel}`,
    `- 定休日: ${closedDaysLabel()}`,
    `- 電話: ${BUSINESS.phone}`,
    `- 院長: ${BUSINESS.operator}（${BUSINESS.operatorTitle}）`,
    `- 取扱いブランド: ${brands.map((b) => b.name).join("、")}（Adam's Polishes 埼玉 施工代理店）`,
    `- 適格請求書発行事業者登録番号: ${BUSINESS.registrationNumber}`,
    `- 予約・相談（無料カウンセリング）: ${SITE.url}/reservation`,
    "",
    "## 主要ページ",
    "",
    ...STATIC_ROUTES.map(
      (r) => `- [${r.title}](${SITE.url}${r.path}): ${r.summary}`,
    ),
    "",
    "## よくある質問",
    "",
    ...allFaqs(coatings).flatMap((f) => [`### ${f.question}`, "", f.answer, ""]),
  ];

  if (useful.length > 0) {
    lines.push(
      "## お役立ち情報",
      "",
      ...useful
        .slice(0, 30)
        .map((a) => `- [${a.title}](${SITE.url}${articlePath("useful", a)})`),
      "",
    );
  }

  if (news.length > 0) {
    lines.push(
      "## お知らせ（最新10件）",
      "",
      ...news
        .slice(0, 10)
        .map((p) => `- [${p.title}](${SITE.url}${articlePath("news", p)})`),
      "",
    );
  }

  lines.push(
    "## Optional",
    "",
    `- [Instagram](${BUSINESS.instagramUrl})`,
    `- [X](${BUSINESS.xUrl})`,
    `- [公式LINE](${BUSINESS.lineUrl})`,
    "",
  );

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
