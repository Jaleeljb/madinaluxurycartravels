"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { Car } from "@/lib/types";
import CarCard from "./CarCard";

export default function FleetSection({ cars }: { cars: Car[] }) {
  const categories = useMemo(() => ["All", ...Array.from(new Set(cars.map((c) => c.category)))], [cars]);
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? cars : cars.filter((c) => c.category === active);

  return (
    <section id="fleet" className="relative py-24 sm:py-32 bg-ink">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <p className="font-mono text-xs tracking-[0.25em] text-gold uppercase mb-3">The fleet</p>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold">
              Vehicles for every party <span className="italic gold-gradient-text">size</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm text-ivory/60 leading-relaxed">
            Every car arrives cleaned, fuelled and with a driver briefed on
            your itinerary. Prices shown are daily rates in Saudi Riyal.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`text-sm px-4 py-2 rounded-full border transition-colors ${
                active === cat
                  ? "bg-gold text-ink border-gold"
                  : "border-card-border text-ivory/70 hover:border-gold/50 hover:text-gold-light"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-card-border py-20 text-center text-ivory/50">
            No vehicles in this category yet.
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((car, i) => (
              <CarCard key={car.id} car={car} index={i} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
