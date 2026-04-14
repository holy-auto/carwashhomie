import Access from "@/components/Access";
import Breadcrumbs from "@/components/Breadcrumbs";
import { pageMetadata } from "@/lib/constants";

export const metadata = pageMetadata({
  title: "アクセス",
  description:
    "埼玉県さいたま市岩槻区末田2421-2。東北自動車道「岩槻IC」より約10分。駐車スペース完備（大型車OK）。",
  path: "/access",
  keywords: [
    "アクセス",
    "岩槻",
    "さいたま市",
    "末田",
    "岩槻IC",
    "東北自動車道",
    "駐車場完備",
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
