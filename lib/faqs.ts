/* Page-by-page FAQ — the single source for three outputs that must
   always agree:
     1. the visible FAQ section on each page (components/FaqSection)
     2. FAQPage JSON-LD (components/FaqJsonLd)
     3. /llms.txt (app/llms.txt/route.ts)

   Writing rules (LLM answer engines quote single answers out of
   context, so each one must stand on its own):
   - Name the shop in the answer instead of 「当店」.
   - Pull facts (address, hours, closed days, phone, prices) from
     BUSINESS / the CMS so an edit there updates the answer too.
   - Only state facts that are also shown elsewhere on the site. */

import type { FaqItem } from "@/components/FaqJsonLd";
import {
  BUSINESS,
  closedDaysLabel,
  hoursLabel,
} from "@/lib/constants";
import type { BodyCoating } from "@/lib/content";

const NAME = BUSINESS.nameJa;
const ADDRESS = `〒${BUSINESS.postalCode} ${BUSINESS.addressLine}`;

export const TOP_FAQS: FaqItem[] = [
  {
    question: `${NAME}はどんなお店ですか？`,
    answer: `${NAME}は、${BUSINESS.addressRegion}${BUSINESS.addressLocality}にあるボディコーティング・カーディテーリングの専門店です。お車の塗装状態や使用環境を診断し、1台ごとに最適なコーティング・磨きの施術をご提案しています。`,
  },
  {
    question: "さいたま市・岩槻周辺でボディコーティングを依頼できるお店はありますか？",
    answer: `${ADDRESS}の${NAME}で承っています。東北自動車道「岩槻IC」から車で約10分、店舗前に駐車スペースがあり、さいたま市内をはじめ埼玉県内各地からご来店いただけます。`,
  },
  {
    question: `${NAME}ではどんな施術を受けられますか？`,
    answer: `${NAME}では、ボディコーティングを中心に、内装コーティング・ガラスコーティング・ホイールコーティングに対応しています。業者様向けのご依頼も承っています。料金は施術メニューページに掲載しています。`,
  },
  {
    question: `${NAME}の院長はどんな人ですか？`,
    answer: `${NAME}の院長は${BUSINESS.operator}（${BUSINESS.operatorTitle}）です。整備・磨き・コーティングの実務経験は約9年で、お車の状態を診断して施術をご提案します。`,
  },
];

/* Built from the live body-coating plans so prices and durations in
   the answers always match the price table on /menu. */
export function menuFaqs(coatings: BodyCoating[]): FaqItem[] {
  const label = (c: BodyCoating) =>
    c.class_label ? `${c.name}（${c.class_label}）` : c.name;
  const priced = coatings.filter((c) => c.price);
  const timed = coatings.filter((c) => c.duration);

  const faqs: FaqItem[] = [];
  if (priced.length > 0) {
    faqs.push({
      question: "ボディコーティングの料金はいくらですか？",
      answer: `${NAME}のボディコーティングは、${priced
        .map((c) => `${label(c)}が${c.price}`)
        .join("、")}です。お車の大きさや塗装の状態によって金額が変わる場合があるため、無料カウンセリングで車両の状態を確認したうえでご案内します。`,
    });
  }
  if (timed.length > 0) {
    faqs.push({
      question: "施工にはどのくらいの期間がかかりますか？",
      answer: `${NAME}のボディコーティングの施工期間は、${timed
        .map((c) => `${label(c)}が${c.duration}`)
        .join("、")}が目安です。お車の状態によって前後する場合があります。`,
    });
  }
  faqs.push(
    {
      question: "どのコーティングを選べばいいかわかりません。",
      answer: `${NAME}では無料カウンセリングで塗装状態・使用環境・年式を診断し、お車に合ったメニューをご提案します。まずはお気軽にご相談ください。`,
    },
    {
      question: "ボディ以外のコーティングにも対応していますか？",
      answer: `はい。${NAME}では内装コーティング・ガラスコーティング・ホイールコーティングにも対応しています。料金は施術メニューページの各料金表をご覧ください。`,
    },
  );
  return faqs;
}

export const ACCESS_FAQS: FaqItem[] = [
  {
    question: `${NAME}の場所はどこですか？`,
    answer: `${NAME}の所在地は${ADDRESS}です。東北自動車道「岩槻IC」から車で約10分です。`,
  },
  {
    question: "駐車場はありますか？",
    answer: `はい。${NAME}の店舗前に駐車スペースがあり、大型車も駐車できます。`,
  },
  {
    question: "営業時間と定休日を教えてください。",
    answer: `${NAME}の営業時間は${hoursLabel}、定休日は${closedDaysLabel()}です。`,
  },
  {
    question: "電車で行くことはできますか？",
    answer: `${NAME}へは、東武アーバンパークライン「岩槻駅」からお車で約10分です。`,
  },
];

export const RESERVATION_FAQS: FaqItem[] = [
  {
    question: "予約はどうすればいいですか？",
    answer: `${NAME}のご予約・ご相談は、公式LINE・お電話（${BUSINESS.phone}）・Instagram DM・お問い合わせフォームで受け付けています。`,
  },
  {
    question: "相談だけでも大丈夫ですか？",
    answer: `はい。${NAME}では無料カウンセリングを行っており、車両の状態を確認したうえで施術内容をご提案します。`,
  },
  {
    question: "支払い方法は何がありますか？",
    answer: `${NAME}では、現金・銀行振込・各種キャッシュレス決済がご利用いただけます。お支払いは施術完了後に店頭でお願いしています。`,
  },
  {
    question: "予約のキャンセルや変更はできますか？",
    answer: `ご予約日の前日までに、${NAME}へお電話またはDMでご連絡ください。当日キャンセルの場合、キャンセル料を申し受ける場合があります。`,
  },
];

/* Written around the "Adam's Polishes 埼玉 施工代理店" query that
   /brands targets. */
export const BRAND_FAQS: FaqItem[] = [
  {
    question:
      "車の美容外科 Car Wash Homiesは「Adam's Polishes」の埼玉施工代理店ですか？",
    answer:
      "はい。埼玉県さいたま市岩槻区を拠点に、Adam's Polishes 埼玉 施工代理店としてAdam's Polishes製品を使用したボディコーティング・ディテーリング施工を行っております。",
  },
  {
    question: "取り扱っているブランドを教えてください。",
    answer:
      "Adam's Polishes（アダムスポリッシュ）を中心に、FunCruise・BULLET・TACSYSTEMなど、信頼できるカーケアブランドを厳選して取り扱っています。",
  },
  {
    question: "Adam's Polishes製品の購入だけでもお願いできますか？",
    answer:
      "施工だけでなく、Adam's Polishes製品の販売にも対応しております。お気軽にお問い合わせください。",
  },
  {
    question: "埼玉県内でAdam's Polishesの正規施工を受けられる店舗はどこですか？",
    answer: `${BUSINESS.addressLine}の${NAME}が、Adam's Polishesの埼玉施工代理店です。岩槻ICから車で約10分、駐車場完備で埼玉県内各地からご来店いただけます。`,
  },
  {
    question: "ブランドごとの使い分けはどう決まりますか？",
    answer:
      "車両の状態やご希望に応じて、Adam's Polishesの本格コーティングから、TACSYSTEMの時短系タッチレスコーティングまで最適な製品をご提案します。",
  },
];

/** Every FAQ on the site (duplicates removed) — for llms.txt. */
export function allFaqs(coatings: BodyCoating[]): FaqItem[] {
  const seen = new Set<string>();
  return [
    ...TOP_FAQS,
    ...menuFaqs(coatings),
    ...BRAND_FAQS,
    ...ACCESS_FAQS,
    ...RESERVATION_FAQS,
  ].filter((f) => {
    if (seen.has(f.question)) return false;
    seen.add(f.question);
    return true;
  });
}
