"use client";

import { motion } from "framer-motion";
import { useLanguage } from "./LanguageProvider";
import AmbientBackground from "./AmbientBackground";
import type { TranslationKey } from "@/lib/i18n";

const STATS: { value: string; labelKey: TranslationKey }[] = [
  { value: "10+", labelKey: "about.stat1Label" },
  { value: "25K+", labelKey: "about.stat2Label" },
  { value: "24/7", labelKey: "about.stat3Label" },
  { value: "4.9★", labelKey: "about.stat4Label" },
];

export default function AboutSection() {
  const { t } = useLanguage();

  return (
    <section id="about" className="relative py-24 sm:py-32 bg-paper overflow-hidden">
      <AmbientBackground variant="about" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-2 gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-xs tracking-[0.25em] text-gold uppercase mb-3">{t("about.eyebrow")}</p>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold mb-6 leading-tight">
            {t("about.heading")}
          </h2>
          <p className="text-ivory/65 leading-relaxed mb-4">
            {t("about.paragraph1")}
          </p>
          <p className="text-ivory/65 leading-relaxed">
            {t("about.paragraph2")}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-5">
          {STATS.map((s, i) => (
            <motion.div
              key={s.labelKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border border-card-border bg-card p-7 card-shadow"
            >
              <p className="font-display text-4xl font-bold gold-gradient-text mb-1">{s.value}</p>
              <p className="text-sm text-ivory/60">{t(s.labelKey)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
