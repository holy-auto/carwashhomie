import Services from "@/components/Services";
import Breadcrumbs from "@/components/Breadcrumbs";
import { pageMetadata } from "@/lib/constants";

export const metadata = pageMetadata({
  title: "施術メニュー",
  description:
    "ボディコーティング・内装コーティング・ガラス／ホイールコーティング・洗車サービスの料金一覧。車両ごとに最適な施術計画をご提案します。",
  path: "/menu",
  keywords: [
    "施術メニュー",
    "コーティング料金",
    "ボディコーティング",
    "内装コーティング",
    "窓ガラスコーティング",
    "ホイールコーティング",
    "手洗い洗車",
    "さいたま市",
    "岩槻",
  ],
});

export default function MenuPage() {
  return (
    <div className="pt-20">
      <Breadcrumbs
        crumbs={[
          { name: "ホーム", path: "/" },
          { name: "施術メニュー", path: "/menu" },
        ]}
      />
      <Services />
    </div>
  );
}
