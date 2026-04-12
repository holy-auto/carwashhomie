import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import BeforeAfter from "@/components/BeforeAfter";
import Doctor from "@/components/Doctor";
import Testimonials from "@/components/Testimonials";
import Reservation from "@/components/Reservation";
import Access from "@/components/Access";
import Footer from "@/components/Footer";
import PinStripe from "@/components/PinStripe";
import OpeningAnimation from "@/components/OpeningAnimation";

export default function Home() {
  return (
    <OpeningAnimation>
      <main className="relative overflow-x-hidden">
        <Navbar />
        <Hero />
        <PinStripe />
        <About />
        <PinStripe />
        <Services />
        <PinStripe />
        <BeforeAfter />
        <PinStripe />
        <Doctor />
        <PinStripe />
        <Testimonials />
        <PinStripe />
        <Reservation />
        <PinStripe />
        <Access />
        <Footer />
      </main>
    </OpeningAnimation>
  );
}
