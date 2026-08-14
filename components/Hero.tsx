"use client";

import { motion } from "framer-motion";
import { MessageCircle, ArrowDown, MapPin } from "lucide-react";
import { waLink, generalEnquiryMessage } from "@/lib/whatsapp";

const WHATSAPP_NUMBER = "919876543210";

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden bg-paper pt-28 pb-16">
      {/* backdrop image — kept as a deliberate dark, dramatic moment even in the light theme */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=2400&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/80 to-paper" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/40 to-transparent" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-mono text-xs tracking-[0.25em] text-[#E9C46A] uppercase mb-6"
        >
          Chauffeured travel · Madina, Saudi Arabia
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display font-semibold text-[2.5rem] leading-[1.08] sm:text-6xl sm:leading-[1.05] lg:text-7xl max-w-3xl text-white"
        >
          Your journey through the <span className="gold-gradient-text italic">Blessed City</span>, arranged with care.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22 }}
          className="mt-6 max-w-xl text-base sm:text-lg text-white/75 leading-relaxed"
        >
          Private sedans, SUVs and group vans for Ziyarat, Umrah transfers and
          city travel — reserved in minutes, confirmed over WhatsApp, driven
          by people who know every road between Madina and Makkah.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.32 }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <a
            href={waLink(WHATSAPP_NUMBER, generalEnquiryMessage())}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full bg-[#25D366] text-ink font-medium px-6 py-3.5 hover:brightness-105 active:scale-[0.98] transition"
          >
            <MessageCircle size={18} strokeWidth={2} />
            Chat on WhatsApp
          </a>
          <a
            href="#fleet"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3.5 text-white/90 hover:border-[#E9C46A] hover:text-[#E9C46A] transition"
          >
            View the fleet
          </a>
        </motion.div>

        {/* signature: route ticket strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 max-w-xl rounded-2xl border border-card-border bg-card/85 backdrop-blur-sm px-6 py-5 card-shadow"
        >
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-ivory">
              <MapPin size={14} className="text-gold" />
              <span className="font-mono tracking-wide">MED</span>
            </div>
            <div className="relative flex-1 mx-4 h-px bg-card-border overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 w-2 h-2 -top-[3px] rounded-full bg-gold"
                animate={{ left: ["0%", "96%"] }}
                transition={{ duration: 2.6, repeat: Infinity, repeatDelay: 0.6, ease: "easeInOut" }}
              />
            </div>
            <div className="flex items-center gap-2 text-ivory">
              <span className="font-mono tracking-wide">MAK</span>
              <MapPin size={14} className="text-gold" />
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between font-mono text-[11px] text-muted uppercase tracking-wider">
            <span>Al-Masjid an-Nabawi</span>
            <span>~450 km · door to door</span>
            <span>Masjid al-Haram</span>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#fleet"
        aria-label="Scroll to fleet"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-white/60 hover:text-[#E9C46A] transition-colors"
      >
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase">Scroll</span>
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <ArrowDown size={16} />
        </motion.span>
      </motion.a>
    </section>
  );
}
