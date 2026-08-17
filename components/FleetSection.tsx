"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { Car } from "@/lib/types";
import CarCard from "./CarCard";
import AmbientBackground from "./AmbientBackground";
import { useLanguage } from "./LanguageProvider";

const ALL_CATEGORIES = "__all__";

export default function FleetSection({ cars }: { cars: Car[] }) {
  const { t } = useLanguage();
  const categories = useMemo(() => [ALL_CATEGORIES, ...Array.from(new Set(cars.map((c) => c.category)))], [cars]);
  const [active, setActive] = useState<string>(ALL_CATEGORIES);

  const filtered = active === ALL_CATEGORIES ? cars : cars.filter((c) => c.category === active);

  return (
    <section id="fleet" className="relative py-24 sm:py-32 bg-paper overflow-hidden">
      <AmbientBackground variant="fleet" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <p className="font-mono text-sm lg:text-base tracking-[0.25em] text-gold uppercase mb-3">{t("fleet.eyebrow")}</p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold">
              {t("fleet.headingPrefix")} <span className="gold-gradient-text">{t("fleet.headingEmphasis")}</span>
            </h2>
          </div>
          <p className="max-w-sm text-base text-ivory/60 leading-relaxed">
            {t("fleet.description")}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`text-base px-4 py-2 rounded-full border transition-colors ${
                active === cat
                  ? "bg-gold text-white border-gold"
                  : "border-card-border text-ivory/70 hover:border-gold/50 hover:text-gold-light"
              }`}
            >
              {cat === ALL_CATEGORIES ? t("fleet.categoryAll") : cat}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-card-border py-20 text-center text-ivory/50">
            {t("fleet.noVehicles")}
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
