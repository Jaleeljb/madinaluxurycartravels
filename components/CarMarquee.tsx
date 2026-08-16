"use client";

import type { CSSProperties } from "react";
import type { Car } from "@/lib/types";
import { useLanguage } from "./LanguageProvider";
import AmbientBackground from "./AmbientBackground";

export default function CarMarquee({ cars }: { cars: Car[] }) {
  const { t } = useLanguage();
  if (cars.length === 0) return null;

  // Duplicate the list so the scroll loops seamlessly.
  const track = [...cars, ...cars];
  const duration = Math.max(cars.length * 4, 18);

  return (
    <section aria-label="Our full fleet" className="relative py-10 sm:py-14 bg-charcoal border-y border-card-border overflow-hidden">
      <AmbientBackground variant="marquee" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 mb-6 flex items-center justify-between">
        <p className="font-mono text-xs tracking-[0.25em] text-gold uppercase">{t("marquee.exploreFleet")}</p>
        <p className="hidden sm:block text-xs text-muted">{t("marquee.hoverToPause")}</p>
      </div>

      <div className="relative">
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-charcoal to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-charcoal to-transparent z-10" />

        <div
          className="marquee-track flex gap-5 w-max motion-reduce:animate-none"
          style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
        >
          {track.map((car, i) => (
            <a
              key={`${car.id}-${i}`}
              href="#fleet"
              className="group relative shrink-0 w-64 sm:w-72 h-40 sm:h-44 rounded-2xl overflow-hidden border border-card-border card-shadow"
            >
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-4">
                <p className="font-display text-white font-semibold leading-tight">{car.name}</p>
                <p className="font-mono text-[11px] text-white/70 mt-0.5">
                  {car.currency}
                  {car.pricePerDay.toLocaleString("en-IN")}/day
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
