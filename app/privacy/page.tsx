import PrivacyPolicy from "@/components/PrivacyPolicy";
import Breadcrumbs from "@/components/Breadcrumbs";
import { pageMetadata } from "@/lib/constants";

export const metadata = pageMetadata({
  title: "プライバシーポリシー",
  description:
    "車の美容外科 Car Wash Homies のプライバシーポリシー。お客様の個人情報の取得・利用目的・第三者提供・開示請求等の取り扱いについて。",
  path: "/privacy",
  keywords: ["プライバシーポリシー", "個人情報保護方針"],
});

export default function PrivacyPage() {
  return (
    <div className="pt-20">
      <Breadcrumbs
        crumbs={[
          { name: "ホーム", path: "/" },
          { name: "プライバシーポリシー", path: "/privacy" },
        ]}
      />
      <PrivacyPolicy />
    </div>
  );
}
