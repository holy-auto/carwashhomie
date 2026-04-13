import type { Metadata } from "next";
import Doctor from "@/components/Doctor";

export const metadata: Metadata = {
  title: "院長紹介 | 車の美容外科 Car Wash Homies",
  description:
    "院長 中山春香（二級自動車整備士）。整備・磨き・コーティングの実務経験約9年、SNSでも情報発信中。",
};

export default function DoctorPage() {
  return (
    <div className="pt-20">
      <Doctor />
    </div>
  );
}
