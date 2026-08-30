import Brands from "@/components/Brands";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqJsonLd, { type FaqItem } from "@/components/FaqJsonLd";
import { pageMetadata } from "@/lib/constants";
import { getBrands } from "@/lib/content";

// Always reflect the latest brand list edited in the admin panel.
export const dynamic = "force-dynamic";

/* Same Q&A pairs power both the visible FAQ section and the
   FAQPage JSON-LD below, so search engines / LLM answer engines
   and human visitors always see identical facts. Written around the
   "Adam's Polishes 埼玉 施工代理店" query this page targets. */
const FAQS: FaqItem[] = [
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
    answer:
      "埼玉県さいたま市岩槻区末田2421-2の車の美容外科 Car Wash Homiesが、Adam's Polishesの埼玉施工代理店です。岩槻ICから車で約10分、駐車場完備で埼玉県内各地からご来店いただけます。",
  },
  {
    question: "ブランドごとの使い分けはどう決まりますか？",
    answer:
      "車両の状態やご希望に応じて、Adam's Polishesの本格コーティングから、TACSYSTEMの時短系タッチレスコーティングまで最適な製品をご提案します。",
  },
];

export const metadata = pageMetadata({
  title: "Adam's Polishes 埼玉 施工代理店｜取扱いブランド",
  description:
    "車の美容外科 Car Wash Homiesは埼玉県さいたま市岩槻区の「Adam's Polishes 埼玉 施工代理店」。FunCruise・BULLET・TACSYSTEMなど厳選ブランドの施工・販売にも対応します。",
  path: "/brands",
  keywords: [
    "Adam's Polishes 埼玉",
    "Adam's Polishes 施工代理店",
    "アダムスポリッシュ 埼玉",
    "アダムスポリッシュ 施工代理店",
    "FunCruise",
    "BULLET",
    "TACSYSTEM",
    "取扱いブランド",
    "さいたま市",
    "岩槻",
  ],
});

export default async function BrandsPage() {
  const brands = await getBrands();

  return (
    <div className="pt-20">
      <Breadcrumbs
        crumbs={[
          { name: "ホーム", path: "/" },
          { name: "取扱いブランド", path: "/brands" },
        ]}
      />
      <FaqJsonLd faqs={FAQS} />
      <Brands brands={brands} faqs={FAQS} />
    </div>
  );
}
