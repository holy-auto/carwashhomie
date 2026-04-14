import Tokusho from "@/components/Tokusho";
import Breadcrumbs from "@/components/Breadcrumbs";
import { pageMetadata } from "@/lib/constants";

export const metadata = pageMetadata({
  title: "特定商取引法に基づく表記",
  description:
    "車の美容外科 Car Wash Homies の特定商取引法に基づく表記。販売事業者、所在地、連絡先、支払方法、返品について。",
  path: "/legal",
  keywords: ["特定商取引法", "特商法", "事業者情報"],
});

export default function LegalPage() {
  return (
    <div className="pt-20">
      <Breadcrumbs
        crumbs={[
          { name: "ホーム", path: "/" },
          { name: "特定商取引法に基づく表記", path: "/legal" },
        ]}
      />
      <Tokusho />
    </div>
  );
}
