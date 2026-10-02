import Services from "@/components/Services";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqJsonLd from "@/components/FaqJsonLd";
import FaqSection from "@/components/FaqSection";
import { pageMetadata } from "@/lib/constants";
import {
  getBodyCoatings,
  getWashServices,
  getInteriorCoatings,
  getInteriorOptions,
  getGlassCoatings,
  getWheelCoatings,
  getB2BServices,
  getBrands,
} from "@/lib/content";
import { menuFaqs } from "@/lib/faqs";

// Always reflect the latest menu edited in the admin panel.
export const dynamic = "force-dynamic";

export const metadata = pageMetadata({
  title: "施術メニュー",
  description:
    "ボディコーティング・内装コーティング・ガラス／ホイールコーティングの料金一覧。車両ごとに最適な施術計画をご提案します。",
  path: "/menu",
  keywords: [
    "施術メニュー",
    "コーティング料金",
    "ボディコーティング",
    "内装コーティング",
    "ガラスコーティング",
    "ホイールコーティング",
    "さいたま市",
    "岩槻",
  ],
});

export default async function MenuPage() {
  const [
    bodyCoatings,
    washServices,
    interiorCoatings,
    interiorOptions,
    glassCoatings,
    wheelCoatings,
    b2bServices,
    brands,
  ] = await Promise.all([
    getBodyCoatings(),
    getWashServices(),
    getInteriorCoatings(),
    getInteriorOptions(),
    getGlassCoatings(),
    getWheelCoatings(),
    getB2BServices(),
    getBrands(),
  ]);

  // Prices / durations in the answers come from the live price table.
  const faqs = menuFaqs(bodyCoatings);

  return (
    <div className="pt-20">
      <Breadcrumbs
        crumbs={[
          { name: "ホーム", path: "/" },
          { name: "施術メニュー", path: "/menu" },
        ]}
      />
      <Services
        bodyCoatings={bodyCoatings}
        washServices={washServices}
        interiorCoatings={interiorCoatings}
        interiorOptions={interiorOptions}
        glassCoatings={glassCoatings}
        wheelCoatings={wheelCoatings}
        b2bServices={b2bServices}
        brands={brands}
      />
      <FaqJsonLd faqs={faqs} />
      <FaqSection faqs={faqs} heading="施術メニューについてのご質問" />
    </div>
  );
}
