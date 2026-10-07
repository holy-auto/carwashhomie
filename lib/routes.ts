/* Public page registry — the single list that both app/sitemap.ts and
   app/llms.txt/route.ts read, so a new page only has to be added here.

   lastmod rules (Google ignores lastmod that is always "now"):
   - `updated` → hand-maintained pages. Bump it in the SAME commit that
     changes the page's visible content.
   - `tables`  → CMS-driven pages. The sitemap uses the newest
     `updated_at` among the published rows of these tables.
   Article detail pages (/news/<slug>, /useful/<slug>) are added by the
   sitemap itself from the database. */

import { BUSINESS } from "@/lib/constants";

export type ChangeFrequency = "daily" | "weekly" | "monthly" | "yearly";

export type StaticRoute = {
  path: string;
  /** Page name — used as the link text in llms.txt. */
  title: string;
  /** One-line, fact-only summary for llms.txt. */
  summary: string;
  priority: number;
  changeFrequency: ChangeFrequency;
  /** YYYY-MM-DD the page content last changed (hand-maintained pages). */
  updated?: string;
  /** Tables whose rows make up the page (CMS-driven pages). */
  tables?: readonly string[];
};

export const STATIC_ROUTES: StaticRoute[] = [
  {
    path: "/",
    title: "トップ",
    summary: "車の美容外科 Car Wash Homies の概要・施術メニューの入口・よくある質問",
    priority: 1.0,
    changeFrequency: "weekly",
    updated: "2026-10-02",
  },
  {
    path: "/concept",
    title: "当院のコンセプト",
    summary: "塗装状態・使用環境・年式を診断し、車両ごとに施術計画を提案する診察方針",
    priority: 0.8,
    changeFrequency: "monthly",
    updated: "2026-04-14",
  },
  {
    path: "/menu",
    title: "施術メニュー・料金",
    summary: "ボディ・内装・ガラス・ホイールコーティングの料金一覧と施工期間の目安",
    priority: 0.9,
    changeFrequency: "monthly",
    tables: [
      "body_coatings",
      "wash_services",
      "interior_coatings",
      "interior_options",
      "glass_coatings",
      "wheel_coatings",
      "b2b_services",
    ],
  },
  {
    path: "/brands",
    title: "取扱いブランド",
    summary: "Adam's Polishes 埼玉 施工代理店。FunCruise・BULLET・TACSYSTEM などの取扱いブランド",
    priority: 0.8,
    changeFrequency: "monthly",
    tables: ["brands"],
  },
  {
    path: "/gallery",
    title: "症例カルテ",
    summary: "Before / After で見る施工事例とお客様の声",
    priority: 0.8,
    changeFrequency: "weekly",
    tables: ["gallery_cases", "testimonials"],
  },
  {
    path: "/news",
    title: "お知らせ",
    summary: "キャンペーン・営業案内などの最新情報",
    priority: 0.6,
    changeFrequency: "weekly",
    tables: ["news_posts"],
  },
  {
    path: "/useful",
    title: "お役立ち情報",
    summary: "洗車・コーティング・メンテナンスのコツをまとめたコラム",
    priority: 0.6,
    changeFrequency: "weekly",
    tables: ["useful_articles"],
  },
  {
    path: "/doctor",
    title: "院長紹介",
    summary: `院長 ${BUSINESS.operator}（${BUSINESS.operatorTitle}）のプロフィールと実績`,
    priority: 0.7,
    changeFrequency: "monthly",
    updated: "2026-04-14",
  },
  {
    path: "/reservation",
    title: "ご予約・ご相談",
    summary: "無料カウンセリングの予約方法（公式LINE・電話・Instagram DM・フォーム）",
    priority: 0.9,
    changeFrequency: "monthly",
    updated: "2026-10-02",
  },
  {
    path: "/access",
    title: "アクセス",
    summary: "所在地・営業時間・定休日・駐車場・車と電車でのアクセス",
    priority: 0.7,
    changeFrequency: "yearly",
    updated: "2026-10-02",
  },
  {
    path: "/privacy",
    title: "プライバシーポリシー",
    summary: "個人情報の取り扱い",
    priority: 0.3,
    changeFrequency: "yearly",
    updated: "2026-04-14",
  },
  {
    path: "/legal",
    title: "特定商取引法に基づく表記",
    summary: "事業者情報・支払方法・キャンセルについて",
    priority: 0.3,
    changeFrequency: "yearly",
    updated: "2026-04-14",
  },
];
