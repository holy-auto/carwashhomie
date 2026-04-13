import type { Metadata } from "next";
import Services from "@/components/Services";

export const metadata: Metadata = {
  title: "施術メニュー | 車の美容外科 Car Wash Homies",
  description:
    "ボディコーティング・内装コーティング・ガラス／ホイールコーティング・洗車サービスの料金一覧。業者様向けご依頼も対応。",
};

export default function MenuPage() {
  return (
    <div className="pt-20">
      <Services />
    </div>
  );
}
