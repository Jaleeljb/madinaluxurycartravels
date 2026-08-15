"use client";

import { useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { MessageCircle, ArrowDown } from "lucide-react";
import { waLink, generalEnquiryMessage } from "@/lib/whatsapp";

const WHATSAPP_NUMBER = "919876543210";

const ROUTES = ["Narasaraopet ↔ Vijayawada", "Narasaraopet ↔ Guntur", "Narasaraopet ↔ Hyderabad"];

function CarSilhouette({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 100" className={className} xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="110" cy="88" rx="88" ry="7" fill="#142019" opacity="0.12" />
      <path
        d="M18 68 C14 68 12 64 13 58 L18 44 C20 36 27 30 36 30 L54 30 C60 20 72 13 90 13 L138 13 C154 13 166 21 172 31 L184 31 C196 31 205 39 207 51 L208 58 C209 64 206 68 200 68 Z"
        fill="#0f7a52"
      />
      <path
        d="M60 30 L72 30 C77 22 86 17 97 17 L128 17 C140 17 150 22 156 30 L96 30 Z"
        fill="#eaf5ef"
        opacity="0.9"
      />
      <line x1="96" y1="17" x2="96" y2="30" stroke="#0b5c3e" strokeWidth="1.5" />
      <circle cx="46" cy="70" r="16" fill="#142019" />
      <circle cx="46" cy="70" r="6.5" fill="#eaf5ef" />
      <circle cx="168" cy="70" r="16" fill="#142019" />
      <circle cx="168" cy="70" r="6.5" fill="#eaf5ef" />
      <circle cx="200" cy="45" r="3.5" fill="#eaf5ef" />
      <rect x="20" y="52" width="10" height="4" rx="2" fill="#eaf5ef" opacity="0.85" />
    </svg>
  );
}

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const [carFinished, setCarFinished] = useState(false);
  const showCar = !prefersReducedMotion && !carFinished;
  const showContent = Boolean(prefersReducedMotion) || carFinished;

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden bg-paper pt-24">
      {/* Ambient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-paper to-paper" />
        <div className="absolute -top-24 -right-24 w-[36rem] h-[36rem] rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute top-1/3 -left-24 w-[26rem] h-[26rem] rounded-full bg-gold/[0.06] blur-3xl" />
        {/* road */}
        <div className="absolute left-0 right-0 bottom-[26%] sm:bottom-[30%] h-14 sm:h-16 bg-ink/90">
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[3px] overflow-hidden">
            <motion.div
              className="flex gap-8 w-[200%]"
              animate={showCar ? { x: ["0%", "-50%"] } : {}}
              transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
            >
              {Array.from({ length: 24 }).map((_, i) => (
                <span key={i} className="block w-10 h-[3px] bg-paper/70 shrink-0" />
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Driving car intro */}
      <AnimatePresence>
        {showCar && (
          <motion.div
            className="absolute bottom-[26%] sm:bottom-[30%] w-40 sm:w-52"
            style={{ marginBottom: "-1px" }}
            initial={{ left: "-20%" }}
            animate={{ left: "115%" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.6, ease: [0.45, 0.05, 0.55, 0.95] }}
            onAnimationComplete={() => setCarFinished(true)}
          >
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 0.35, repeat: Infinity, ease: "easeInOut" }}
            >
              <CarSilhouette className="w-full h-auto drop-shadow-lg" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Revealed content */}
      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8 pb-20">
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-mono text-xs tracking-[0.25em] text-gold uppercase mb-6"
              >
                Car rentals &amp; outstation travel · Narasaraopet, Andhra Pradesh
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.18 }}
                className="font-display font-semibold text-[2.5rem] leading-[1.08] sm:text-6xl sm:leading-[1.05] lg:text-7xl max-w-3xl"
              >
                Comfortable rides across <span className="gold-gradient-text italic">Andhra Pradesh</span>, booked in a tap.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.26 }}
                className="mt-6 max-w-xl text-base sm:text-lg text-ivory/65 leading-relaxed"
              >
                Sedans, SUVs and vans for local trips, outstation travel and
                airport transfers — reserved in minutes, confirmed over
                WhatsApp, driven by people who know every road out of
                Narasaraopet.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.34 }}
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
                  className="inline-flex items-center gap-2 rounded-full border border-card-border px-6 py-3.5 text-ivory/80 hover:border-gold hover:text-gold-light transition"
                >
                  View the fleet
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.42 }}
                className="mt-10 flex flex-wrap gap-2.5"
              >
                {ROUTES.map((route) => (
                  <span
                    key={route}
                    className="font-mono text-xs px-3.5 py-2 rounded-full border border-card-border bg-card text-ivory/70 whitespace-nowrap"
                  >
                    {route}
                  </span>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {showContent && (
        <motion.a
          href="#fleet"
          aria-label="Scroll to fleet"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-ivory/40 hover:text-gold-light transition-colors"
        >
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase">Scroll</span>
          <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
            <ArrowDown size={16} />
          </motion.span>
        </motion.a>
      )}
    </section>
  );
}
