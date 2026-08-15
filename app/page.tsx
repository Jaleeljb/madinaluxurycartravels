import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CarMarquee from "@/components/CarMarquee";
import FleetSection from "@/components/FleetSection";
import HowItWorks from "@/components/HowItWorks";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { getCars } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function Home() {
  const cars = await getCars();

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <CarMarquee cars={cars} />
        <FleetSection cars={cars} />
        <HowItWorks />
        <AboutSection />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
