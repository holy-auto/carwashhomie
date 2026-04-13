import type { Metadata } from "next";
import PrivacyPolicy from "@/components/PrivacyPolicy";

export const metadata: Metadata = {
  title: "プライバシーポリシー | 車の美容外科 Car Wash Homies",
  description:
    "車の美容外科 Car Wash Homies のプライバシーポリシー。お客様の個人情報の取得・利用目的・第三者提供・開示請求等の取り扱いについて。",
};

export default function PrivacyPage() {
  return (
    <div className="pt-20">
      <PrivacyPolicy />
    </div>
  );
}
