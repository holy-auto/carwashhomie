import Access from "@/components/Access";
import Breadcrumbs from "@/components/Breadcrumbs";
import { pageMetadata } from "@/lib/constants";

export const metadata = pageMetadata({
  title: "アクセス・店舗情報 | 岩槻のボディコーティング専門店 Car Wash Homies",
  absoluteTitle: true,
  description:
    "埼玉県さいたま市岩槻区のボディコーティング専門店「Car Wash Homies」へのアクセス情報。東北自動車道「岩槻IC」より車で約10分。大型車も対応可能な駐車スペースを完備しています。岩槻周辺で車のコーティングや磨きをお探しの方はお気軽にご来店ください。",
  path: "/access",
  keywords: [
    "アクセス",
    "店舗情報",
    "岩槻",
    "さいたま市",
    "末田",
    "岩槻IC",
    "東北自動車道",
    "駐車場完備",
    "ボディコーティング",
    "コーティング",
  ],
});

export default function AccessPage() {
  return (
    <div className="pt-20">
      <Breadcrumbs
        crumbs={[
          { name: "ホーム", path: "/" },
          { name: "アクセス", path: "/access" },
        ]}
      />
      <Access />
    </div>
  );
}
