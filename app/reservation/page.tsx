import type { Metadata } from "next";
import Reservation from "@/components/Reservation";

export const metadata: Metadata = {
  title: "ご予約・ご相談 | 車の美容外科 Car Wash Homies",
  description:
    "無料カウンセリング受付中。お電話・Instagram DM・お問い合わせフォームよりお気軽にご相談ください。",
};

export default function ReservationPage() {
  return (
    <div className="pt-20">
      <Reservation />
    </div>
  );
}
