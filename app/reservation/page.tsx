import Reservation from "@/components/Reservation";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqJsonLd from "@/components/FaqJsonLd";
import FaqSection from "@/components/FaqSection";
import { pageMetadata } from "@/lib/constants";
import { RESERVATION_FAQS } from "@/lib/faqs";

export const metadata = pageMetadata({
  title: "ご予約・ご相談",
  description:
    "無料カウンセリング受付中。お電話・Instagram DM・お問い合わせフォームよりお気軽にご相談ください。",
  path: "/reservation",
  keywords: [
    "ご予約",
    "ご相談",
    "無料カウンセリング",
    "コーティング予約",
    "問い合わせ",
    "さいたま市",
    "岩槻",
  ],
});

export default function ReservationPage() {
  return (
    <div className="pt-20">
      <Breadcrumbs
        crumbs={[
          { name: "ホーム", path: "/" },
          { name: "ご予約・ご相談", path: "/reservation" },
        ]}
      />
      <Reservation />
      <FaqJsonLd faqs={RESERVATION_FAQS} />
      <FaqSection faqs={RESERVATION_FAQS} heading="ご予約についてのご質問" />
    </div>
  );
}
