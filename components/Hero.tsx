"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Phone } from "lucide-react";
import { waLink, generalEnquiryMessage } from "@/lib/whatsapp";
import { useLanguage } from "./LanguageProvider";

const WHATSAPP_NUMBER = "919876543210";

// A cinematic open-road shot at sunset — reads instantly as "travel" and
// pairs cleanly with the site's black/white theme via the dark overlay.
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1683220042545-ef1348b2cfb6?q=80&w=2400&auto=format&fit=crop";

// useLayoutEffect warns on the server — fall back to useEffect there.
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const HEADLINE_MAX_PX = 80;
const HEADLINE_MIN_PX = 13;
// A small safety margin so integer scrollWidth rounding never lets the
// text edge past the container on any script or device.
const HEADLINE_FIT_SAFETY = 0.96;

// The hero headline. On phones and small tablets (below md) it behaves
// exactly as before: always exactly one line, auto-shrunk to fit via a
// hidden measuring clone. From md up, it switches to a plain, larger,
// naturally-wrapping Tailwind size — more room to be big without fighting
// the one-line constraint.
function FitHeadline({ text }: { text: string }) {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const [fontSize, setFontSize] = useState(HEADLINE_MAX_PX);

  useIsoLayoutEffect(() => {
    const container = containerRef.current;
    const measure = measureRef.current;
    if (!container || !measure) return;

    function recalc() {
      const containerWidth = container!.clientWidth;
      const naturalWidth = measure!.scrollWidth;
      if (!containerWidth || !naturalWidth) return;
      const scale = containerWidth / naturalWidth;
      const next = Math.min(
        HEADLINE_MAX_PX,
        Math.max(HEADLINE_MIN_PX, HEADLINE_MAX_PX * scale * HEADLINE_FIT_SAFETY)
      );
      setFontSize(next);
    }

    recalc();
    const ro = new ResizeObserver(recalc);
    ro.observe(container);
    window.addEventListener("orientationchange", recalc);
    return () => {
      ro.disconnect();
      window.removeEventListener("orientationchange", recalc);
    };
  }, [text]);

  return (
    <motion.h1
      ref={containerRef}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.12 }}
      className="relative mt-4 w-full"
    >
      {/* Invisible, fixed-size clone used only to measure natural width */}
      <span
        ref={measureRef}
        aria-hidden="true"
        className="font-display font-black tracking-tight inline-block"
        style={{
          position: "absolute",
          visibility: "hidden",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          left: 0,
          top: 0,
          fontSize: HEADLINE_MAX_PX,
        }}
      >
        {text}
      </span>

      {/* Phones & small tablets: previous behaviour, unchanged — always
          one line, auto-shrunk to fit. */}
      <span
        className="md:hidden headline-color-shift font-display font-black tracking-tight inline-block"
        style={{ whiteSpace: "nowrap", fontSize, lineHeight: 1.05 }}
      >
        {text}
      </span>

      {/* Tablet and up: bigger, free to wrap across two lines. */}
      <span className="hidden md:inline-block headline-color-shift font-display font-black tracking-tight leading-[1.05] md:text-5xl lg:text-6xl xl:text-7xl">
        {text}
      </span>
    </motion.h1>
  );
}

// The hero tagline as one unified line — it slides in and shimmers
// purely along the horizontal axis (never a per-word vertical cascade).
function Tagline({ text }: { text: string }) {
  return (
    <div className="mt-5 overflow-hidden">
      <motion.p
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="tagline-shimmer inline-block font-display text-sm sm:text-lg lg:text-xl xl:text-2xl font-medium whitespace-nowrap"
      >
        {text}
      </motion.p>
    </div>
  );
}

export default function Hero() {
  const { t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-ink pt-6 sm:pt-8">
      {/* Static travel wallpaper — a single slow, graceful settle-zoom on
          load, then holds still. Scales to fill every screen size via
          object-cover, no fixed dimensions. */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: prefersReducedMotion ? 1 : 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 14, ease: "easeOut" }}
      >
        <img src={HERO_IMAGE} alt="" className="w-full h-full object-cover" aria-hidden="true" />
      </motion.div>

      <div className="absolute inset-0 bg-black/55" />

      {/* Centered copy */}
      <div className="relative mx-auto max-w-5xl w-full min-w-0 px-6 sm:px-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-semibold text-xs md:text-sm lg:text-base tracking-[0.3em] uppercase text-white/70"
        >
          Madina Travels · Narasaraopet
        </motion.p>

        <FitHeadline text={t("hero.headline")} />

        <Tagline text={t("hero.quote")} />

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
            className="inline-flex items-center gap-2 text-sm lg:text-base font-semibold px-6 py-3 rounded-full bg-white text-ink hover:bg-white/90 transition-colors"
          >
            {t("hero.reserveOnWhatsApp")}
          </a>
          <a
            href={`tel:+${WHATSAPP_NUMBER}`}
            className="inline-flex items-center gap-2 text-sm lg:text-base font-semibold px-6 py-3 rounded-full border border-white/35 text-white hover:border-white/70 transition-colors"
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
        className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-white/50 hover:text-white transition-colors"
      >
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <ArrowDown size={18} />
        </motion.span>
      </motion.a>
    </section>
  );
}
