"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1738996596694-93a6a2359b22?q=80&w=2600&auto=format&fit=crop";

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-ink">
      {/* Real car photograph */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: prefersReducedMotion ? 1 : 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 9, ease: "easeOut" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/55 to-ink/85" />
      <div className="absolute inset-0 bg-ink/20" />

      {/* Centered quotation */}
      <div className="relative mx-auto max-w-3xl px-6 sm:px-8 text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-display text-6xl sm:text-7xl leading-none text-[#6EE7B7]/70 select-none"
          aria-hidden="true"
        >
          &ldquo;
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-2 font-display italic font-medium text-[1.85rem] leading-snug sm:text-4xl sm:leading-snug lg:text-5xl text-white"
        >
          Comfort is not a luxury
          <br className="hidden sm:block" /> — it&apos;s how we drive.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="mt-7 font-mono text-xs tracking-[0.3em] uppercase text-white/60"
        >
          Madina Travels · Narasaraopet
        </motion.p>
      </div>

      <motion.a
        href="#fleet"
        aria-label="Scroll to fleet"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-white/45 hover:text-[#6EE7B7] transition-colors"
      >
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <ArrowDown size={18} />
        </motion.span>
      </motion.a>
    </section>
  );
}
