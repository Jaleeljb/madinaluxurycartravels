import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CarMarquee from "@/components/CarMarquee";
import FleetSection from "@/components/FleetSection";
import HowItWorks from "@/components/HowItWorks";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { getCars } from "@/lib/data";
import type { Car } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function Home() {
  let cars: Car[] = [];
  try {
    cars = await getCars();
  } catch (err) {
    // Never let a database hiccup take down the whole public site —
    // log it server-side and render with an empty fleet instead.
    console.error("Failed to load cars:", err);
  }

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
