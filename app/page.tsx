import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import BeforeAfter from "@/components/BeforeAfter";
import Doctor from "@/components/Doctor";
import Testimonials from "@/components/Testimonials";
import Reservation from "@/components/Reservation";
import Access from "@/components/Access";
import Footer from "@/components/Footer";
import PinStripe from "@/components/PinStripe";

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <Navbar />
      <Hero />
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
  );
}
