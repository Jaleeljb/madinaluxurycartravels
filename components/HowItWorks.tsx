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
    <section
      id="how-it-works"
      className="relative py-24 sm:py-32 bg-black border-y border-white/10 overflow-hidden"
    >
      <AmbientBackground variant="how" />

      {/* faint drifting grid for texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black 40%, transparent 90%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black 40%, transparent 90%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="font-mono text-sm lg:text-base tracking-[0.25em] text-white/50 uppercase mb-3"
        >
          {t("how.eyebrow")}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold max-w-lg lg:max-w-2xl mb-16 text-white"
        >
          {t("how.heading")}
        </motion.h2>

        <div className="relative">
          {/* connecting progress line with a travelling light (desktop only) */}
          <div className="hidden sm:block absolute inset-x-0 top-6 h-px pointer-events-none" aria-hidden="true">
            <div className="absolute inset-x-[10%] top-0 h-px bg-gradient-to-r from-white/0 via-white/15 to-white/0" />
            <motion.div
              className="absolute top-1/2 w-2 h-2 -translate-y-1/2 rounded-full bg-white"
              style={{ boxShadow: "0 0 14px 3px rgba(255,255,255,0.55)" }}
              animate={{ left: ["10%", "90%"], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.8 }}
            />
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.titleKey}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.14 }}
                whileHover={{ y: -6 }}
                className="group relative rounded-2xl border border-white/10 bg-white/[0.025] p-7 sm:p-6 backdrop-blur-sm transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.045]"
              >
                {/* huge faded number watermark */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-3 right-3 font-display font-black text-5xl text-white/[0.05] select-none"
                >
                  0{i + 1}
                </span>

                <div className="relative flex items-center gap-4 mb-5">
                  <span className="relative grid place-items-center w-12 h-12 rounded-full border border-white/25 text-white shrink-0">
                    {/* pulsing beacon ring */}
                    <motion.span
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full border border-white/40"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                    />
                    <motion.span
                      whileHover={{ rotate: 10, scale: 1.08 }}
                      transition={{ type: "spring", stiffness: 260, damping: 14 }}
                      className="relative grid place-items-center"
                    >
                      <step.icon size={20} strokeWidth={1.75} />
                    </motion.span>
                  </span>
                  <span className="font-mono text-sm lg:text-xs text-white/35 tracking-widest">
                    0{i + 1}
                  </span>
                </div>

                <h3 className="relative font-display text-xl font-semibold mb-2 text-white">
                  {t(step.titleKey)}
                </h3>
                <p className="relative text-base text-white/55 leading-relaxed">{t(step.bodyKey)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
