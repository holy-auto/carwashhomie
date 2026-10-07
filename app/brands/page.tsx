import Brands from "@/components/Brands";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqJsonLd from "@/components/FaqJsonLd";
import { pageMetadata } from "@/lib/constants";
import { getBrands } from "@/lib/content";
import { BRAND_FAQS } from "@/lib/faqs";

// Always reflect the latest brand list edited in the admin panel.
export const dynamic = "force-dynamic";

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
      <FaqJsonLd faqs={BRAND_FAQS} />
      <Brands brands={brands} faqs={BRAND_FAQS} />
    </div>
  );
}
