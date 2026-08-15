"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, MessageCircle } from "lucide-react";
import { waLink, generalEnquiryMessage } from "@/lib/whatsapp";

const WHATSAPP_NUMBER = "919876543210";

// Smooth highway footage — clearly reads as "on a trip", not just a parked car.
const HERO_VIDEO =
  "https://videos.pexels.com/video-files/854671/854671-hd_1920_1080_25fps.mp4";
const HERO_POSTER =
  "https://images.pexels.com/videos/854671/free-video-854671.jpg?auto=compress&cs=tinysrgb&w=1600";

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-ink">
      {/* Looping travel video — one slow, steady zoom, nothing fussier */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: prefersReducedMotion ? 1 : 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 12, ease: "easeOut" }}
      >
        <video
          className="w-full h-full object-cover"
          src={HERO_VIDEO}
          poster={HERO_POSTER}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-ink/75 via-ink/55 to-ink/90" />

      {/* Centered copy */}
      <div className="relative mx-auto max-w-2xl px-6 sm:px-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs tracking-[0.3em] uppercase text-[#6EE7B7]/80"
        >
          Madina Travels · Narasaraopet
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="mt-4 font-display font-semibold text-4xl sm:text-5xl lg:text-6xl leading-[1.08] text-white"
        >
          Every trip, sorted —<br className="hidden sm:block" /> in one WhatsApp message.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.24 }}
          className="mt-5 font-body text-base sm:text-lg text-white/75 max-w-lg mx-auto"
        >
          Sedans, SUVs and vans for local rides, outstation trips and airport
          transfers — pick a car, confirm the dates, and we take it from there.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.36 }}
          className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <a
            href={waLink(WHATSAPP_NUMBER, generalEnquiryMessage())}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium px-6 py-3 rounded-full bg-gold text-white hover:bg-gold-light transition-colors"
          >
            <MessageCircle size={16} />
            Reserve on WhatsApp
          </a>
          <a
            href="#fleet"
            className="inline-flex items-center gap-2 text-sm font-medium px-6 py-3 rounded-full border border-white/25 text-white hover:border-white/50 transition-colors"
          >
            See the fleet
          </a>
        </motion.div>
      </div>

      <motion.a
        href="#fleet"
        aria-label="Scroll to fleet"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-white/45 hover:text-[#6EE7B7] transition-colors"
      >
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <ArrowDown size={18} />
        </motion.span>
      </motion.a>
    </section>
  );
}
