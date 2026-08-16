"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
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

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-[0.85fr_1fr] gap-16 lg:gap-20 items-center">
        {/* Owner portrait */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto w-full max-w-[320px] sm:max-w-sm"
        >
          {/* slow-rotating conic ring */}
          <motion.div
            aria-hidden="true"
            className="absolute -inset-4 rounded-[2rem]"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0%, rgba(0,0,0,0.16) 16%, transparent 34%, transparent 66%, rgba(0,0,0,0.16) 84%, transparent 100%)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
          />
          {/* breathing halo */}
          <motion.div
            aria-hidden="true"
            className="absolute -inset-6 rounded-[2.5rem] bg-black/[0.05] blur-2xl"
            animate={{ scale: [1, 1.07, 1], opacity: [0.5, 0.85, 0.5] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* gently floating photo card */}
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}>
            <div className="relative rounded-[1.75rem] overflow-hidden border border-card-border card-shadow aspect-[4/5]">
              {/*
                Demo owner photo — replace the file at
                /public/owner-placeholder.jpg with a real photo (keep the same
                filename) and it will update here automatically.
              */}
              <img
                src="/owner-placeholder.jpg"
                alt={t("about.ownerRole")}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />

              <div className="absolute bottom-0 inset-x-0 p-5">
                <p className="text-white font-display font-semibold leading-tight">
                  {t("about.ownerRole")}
                </p>
                <p className="text-white/70 text-xs mt-1.5 flex items-start gap-1.5">
                  <Quote className="w-3.5 h-3.5 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{t("about.ownerQuote")}</span>
                </p>
              </div>
            </div>
          </motion.div>

          {/* floating years badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="absolute -top-5 -right-4 sm:-right-7"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="rounded-2xl bg-ink text-white px-4 py-2.5 shadow-lg text-center"
            >
              <p className="font-display text-xl font-bold leading-none">10+</p>
              <p className="text-[9px] text-white/70 mt-1 uppercase tracking-wider">
                {t("about.badgeYears")}
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p className="font-mono text-xs md:text-sm lg:text-base tracking-[0.25em] text-gold uppercase mb-3">{t("about.eyebrow")}</p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold mb-5 leading-tight">
            {t("about.heading")}
          </h2>
          <p className="text-ivory/65 lg:text-lg leading-relaxed mb-8 max-w-md">
            {t("about.paragraph1")}
          </p>

          <div className="grid grid-cols-2 gap-4">
            {STATS.map((s, i) => (
              <motion.div
                key={s.labelKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -3 }}
                className="rounded-2xl border border-card-border bg-card p-6 card-shadow"
              >
                <p className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold gold-gradient-text mb-1">{s.value}</p>
                <p className="text-sm lg:text-base text-ivory/60">{t(s.labelKey)}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
