import type { Metadata } from "next";
import Access from "@/components/Access";

export const metadata: Metadata = {
  title: "アクセス | 車の美容外科 Car Wash Homies",
  description:
    "埼玉県さいたま市岩槻区末田2421-2。東北自動車道「岩槻IC」より約10分。駐車スペース完備（大型車OK）。",
};

export default function AccessPage() {
  return (
    <div className="pt-20">
      <Access />
    </div>
  );
}
