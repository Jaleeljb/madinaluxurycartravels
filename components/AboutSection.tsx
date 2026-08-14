"use client";

import { motion } from "framer-motion";

const STATS = [
  { value: "12+", label: "Years on Madina roads" },
  { value: "40K+", label: "Pilgrims transferred" },
  { value: "24/7", label: "WhatsApp support" },
  { value: "4.9★", label: "Average rating" },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 sm:py-32 bg-paper overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-2 gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-xs tracking-[0.25em] text-gold uppercase mb-3">About us</p>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold mb-6 leading-tight">
            Local drivers, honest pricing, and a route through the city that only comes from years of it.
          </h2>
          <p className="text-ivory/65 leading-relaxed mb-4">
            Madina Luxury Car Travels started with a single sedan meeting
            families at the airport. Today our fleet covers everything from
            solo Ziyarat trips to full group transfers to Makkah — but the
            promise hasn&apos;t changed: a clean car, a punctual driver, and a
            price you agreed to before you got in.
          </p>
          <p className="text-ivory/65 leading-relaxed">
            No apps to download, no hidden fees. You book on WhatsApp, you
            travel with someone who knows the city, and you arrive on time.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-5">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border border-card-border bg-card p-7 card-shadow"
            >
              <p className="font-display text-4xl font-bold gold-gradient-text mb-1">{s.value}</p>
              <p className="text-sm text-ivory/60">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
