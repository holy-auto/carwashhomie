import type { Metadata } from "next";
import Tokusho from "@/components/Tokusho";

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記 | 車の美容外科 Car Wash Homies",
  description:
    "車の美容外科 Car Wash Homies の特定商取引法に基づく表記。販売事業者、所在地、連絡先、支払方法、返品について。",
};

export default function LegalPage() {
  return (
    <div className="pt-20">
      <Tokusho />
    </div>
  );
}
