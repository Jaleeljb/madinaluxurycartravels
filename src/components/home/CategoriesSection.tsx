"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { CAR_CATEGORIES, CATEGORY_INFO } from "@/lib/config";
import { exploreCategory } from "@/lib/fleet-filter";

export function CategoriesSection() {
  return (
    <section id="categories" className="bg-navy-950 py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Vehicle Categories"
          title="Choose Your Perfect Ride"
          subtitle="From a quick city sedan to a full Tempo Traveller for a group trip — pick the category that fits your journey."
          tone="light"
        />

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CAR_CATEGORIES.map((category, i) => {
            const info = CATEGORY_INFO[category];
            return (
              <Reveal key={category} delay={i * 80}>
                <button
                  type="button"
                  onClick={() => exploreCategory(category)}
                  className="group flex h-full w-full flex-col overflow-hidden rounded-xl2 border border-paper/10 bg-navy-900 text-left transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/40"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={info.image}
                      alt={`${category} vehicles`}
                      fill
                      sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 92vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/10 to-transparent" />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-xl font-semibold text-paper">{category}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-paper/65">{info.description}</p>
                    <p className="mt-4 font-mono text-xs text-gold-300">{info.priceRange}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-400 group-hover:text-gold-300">
                      Explore Cars
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
