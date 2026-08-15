"use client";

import { motion } from "framer-motion";
import { Search, MessageCircle, CarFront } from "lucide-react";

const STEPS = [
  {
    icon: Search,
    title: "Choose your car",
    body: "Browse the fleet and pick the vehicle that fits your group, luggage and route.",
  },
  {
    icon: MessageCircle,
    title: "Confirm on WhatsApp",
    body: "Tap Book — your car, dates and route are pre-filled in a WhatsApp message to our team.",
  },
  {
    icon: CarFront,
    title: "We arrive on time",
    body: "Your driver meets you at the agreed point, on schedule, every time.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 sm:py-32 bg-charcoal border-y border-card-border">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="font-mono text-xs tracking-[0.25em] text-gold uppercase mb-3">Process</p>
        <h2 className="font-display text-4xl sm:text-5xl font-semibold max-w-lg mb-14">
          Three steps, no counters, no queues.
        </h2>

        <div className="grid sm:grid-cols-3 gap-8">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.title}
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
              <h3 className="font-display text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-ivory/60 leading-relaxed">{step.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
