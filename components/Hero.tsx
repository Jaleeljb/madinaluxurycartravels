"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, MessageCircle, Phone } from "lucide-react";
import { waLink, generalEnquiryMessage } from "@/lib/whatsapp";
import { useLanguage } from "./LanguageProvider";

const WHATSAPP_NUMBER = "919876543210";

// Two clips from the same shoot, chained into one loop: bags go into the
// car, then the ride begins. Reads clearly as "your trip, start to finish".
const HERO_CLIPS = [
  {
    src: "https://videos.pexels.com/video-files/8629212/8629212-uhd_2560_1440_25fps.mp4",
    poster:
      "https://images.pexels.com/videos/8629212/pexels-photo-8629212.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    src: "https://videos.pexels.com/video-files/8630307/8630307-uhd_2560_1440_25fps.mp4",
    poster:
      "https://images.pexels.com/videos/8630307/pexels-photo-8630307.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
];

export default function Hero() {
  const { t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const videoRefs = [useRef<HTMLVideoElement>(null), useRef<HTMLVideoElement>(null)];

  useEffect(() => {
    videoRefs.forEach((ref, i) => {
      const el = ref.current;
      if (!el) return;
      if (i === active) {
        el.currentTime = 0;
        el.play().catch(() => {});
      } else {
        el.pause();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  function handleEnded() {
    setActive((prev) => (prev + 1) % HERO_CLIPS.length);
  }

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-ink">
      {/* Looping travel sequence — loading up, then on the road. One slow,
          steady zoom on load, crossfading cleanly between clips; scales to
          fill every screen size via object-cover, no fixed dimensions. */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: prefersReducedMotion ? 1 : 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 12, ease: "easeOut" }}
      >
        {HERO_CLIPS.map((clip, i) => (
          <video
            key={clip.src}
            ref={videoRefs[i]}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              active === i ? "opacity-100" : "opacity-0"
            }`}
            src={clip.src}
            poster={clip.poster}
            autoPlay={i === 0}
            muted
            playsInline
            preload={i === 0 ? "auto" : "metadata"}
            onEnded={handleEnded}
            aria-hidden="true"
          />
        ))}
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
          {t("hero.headline")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.24 }}
          className="mt-5 font-body text-base sm:text-lg text-white/75 max-w-lg mx-auto"
        >
          {t("hero.subtext")}
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
            {t("hero.reserveOnWhatsApp")}
          </a>
          <a
            href={`tel:+${WHATSAPP_NUMBER}`}
            className="inline-flex items-center gap-2 text-sm font-medium px-6 py-3 rounded-full border border-white/25 text-white hover:border-white/50 transition-colors"
          >
            <Phone size={16} />
            {t("hero.callUs")}
          </a>
        </motion.div>
      </div>

      <motion.a
        href="#fleet"
        aria-label={t("hero.scrollToFleet")}
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
