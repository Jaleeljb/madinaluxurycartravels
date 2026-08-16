"use client";

import { motion } from "framer-motion";
import { Search, MessageCircle, CarFront } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import AmbientBackground from "./AmbientBackground";
import type { TranslationKey } from "@/lib/i18n";

const STEPS: { icon: typeof Search; titleKey: TranslationKey; bodyKey: TranslationKey }[] = [
  { icon: Search, titleKey: "how.step1Title", bodyKey: "how.step1Body" },
  { icon: MessageCircle, titleKey: "how.step2Title", bodyKey: "how.step2Body" },
  { icon: CarFront, titleKey: "how.step3Title", bodyKey: "how.step3Body" },
];

export default function HowItWorks() {
  const { t } = useLanguage();

  return (
    <section id="how-it-works" className="relative py-24 sm:py-32 bg-charcoal border-y border-card-border overflow-hidden">
      <AmbientBackground variant="how" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <p className="font-mono text-xs tracking-[0.25em] text-gold uppercase mb-3">{t("how.eyebrow")}</p>
        <h2 className="font-display text-4xl sm:text-5xl font-semibold max-w-lg mb-14">
          {t("how.heading")}
        </h2>

        <div className="grid sm:grid-cols-3 gap-8">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.titleKey}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative"
            >
              <div className="flex items-center gap-4 mb-5">
                <span className="grid place-items-center w-12 h-12 rounded-full border border-gold/40 text-gold">
                  <step.icon size={20} strokeWidth={1.75} />
                </span>
                <span className="font-mono text-xs text-muted tracking-widest">
                  0{i + 1}
                </span>
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">{t(step.titleKey)}</h3>
              <p className="text-sm text-ivory/60 leading-relaxed">{t(step.bodyKey)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
