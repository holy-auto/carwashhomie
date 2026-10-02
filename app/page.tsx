import Hero from "@/components/Hero";
import MenuOverview from "@/components/MenuOverview";
import PinStripe from "@/components/PinStripe";
import OpeningAnimation from "@/components/OpeningAnimation";
import FaqJsonLd from "@/components/FaqJsonLd";
import FaqSection from "@/components/FaqSection";
import { TOP_FAQS } from "@/lib/faqs";

export default function Home() {
  return (
    <OpeningAnimation>
      <Hero />
      <PinStripe />
      <MenuOverview />
      <FaqJsonLd faqs={TOP_FAQS} />
      <FaqSection faqs={TOP_FAQS} />
    </OpeningAnimation>
  );
}
