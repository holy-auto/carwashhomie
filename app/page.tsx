import Hero from "@/components/Hero";
import MenuOverview from "@/components/MenuOverview";
import PinStripe from "@/components/PinStripe";
import OpeningAnimation from "@/components/OpeningAnimation";

export default function Home() {
  return (
    <OpeningAnimation>
      <Hero />
      <PinStripe />
      <MenuOverview />
    </OpeningAnimation>
  );
}
