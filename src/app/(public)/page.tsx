import { listCars } from "@/lib/db/queries";
import { Hero } from "@/components/home/Hero";
import { FleetSection } from "@/components/home/FleetSection";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { AboutSection } from "@/components/home/AboutSection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { ContactSection } from "@/components/home/ContactSection";
import { QRSection } from "@/components/home/QRSection";
import type { Car } from "@/lib/db/schema";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let cars: Car[] = [];
  let loadError = false;

  try {
    cars = await listCars();
  } catch (err) {
    console.error("Failed to load cars for home page:", err);
    loadError = true;
  }

  return (
    <>
      <Hero />

      {loadError ? (
        <section id="fleet" className="bg-paper py-20">
          <div className="container-page">
            <div className="rounded-xl2 border border-dashed border-line bg-white py-16 text-center">
              <p className="font-display text-lg text-navy-900">The fleet couldn&apos;t be loaded</p>
              <p className="mx-auto mt-2 max-w-sm text-sm text-ink-muted">
                This usually means the database isn&apos;t connected yet. Check DATABASE_URL in your
                environment configuration.
              </p>
            </div>
          </div>
        </section>
      ) : (
        <FleetSection cars={cars} />
      )}

      <CategoriesSection />
      <AboutSection />
      <WhyChooseUs />
      <QRSection />
      <ContactSection />
    </>
  );
}
