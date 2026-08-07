import Services from "@/components/Services";
import Breadcrumbs from "@/components/Breadcrumbs";
import { pageMetadata } from "@/lib/constants";
import {
  getBodyCoatings,
  getWashServices,
  getInteriorCoatings,
  getInteriorOptions,
  getGlassCoatings,
  getWheelCoatings,
} from "@/lib/content";

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
  ] = await Promise.all([
    getBodyCoatings(),
    getWashServices(),
    getInteriorCoatings(),
    getInteriorOptions(),
    getGlassCoatings(),
    getWheelCoatings(),
  ]);

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
      />
    </div>
  );
}
