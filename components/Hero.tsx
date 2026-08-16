"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Phone } from "lucide-react";
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

// useLayoutEffect warns on the server — fall back to useEffect there.
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const HEADLINE_MAX_PX = 80;
const HEADLINE_MIN_PX = 13;
// A small safety margin so integer scrollWidth rounding never lets the
// text edge past the container on any script or device.
const HEADLINE_FIT_SAFETY = 0.96;

// The hero headline: always exactly one line, on every screen and in
// every language. A hidden clone (fixed at the max size) measures the
// text's true rendered width; we scale from that to fit the available
// space. The visible span's font-size is purely React-state-driven, so
// there's no manual DOM mutation racing with re-renders.
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

      <span
        className="headline-color-shift font-display font-black tracking-tight inline-block"
        style={{ whiteSpace: "nowrap", fontSize, lineHeight: 1.05 }}
      >
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
        className="tagline-shimmer inline-block font-display text-sm sm:text-lg font-medium whitespace-nowrap"
      >
        {text}
      </motion.p>
    </div>
  );
}

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
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-ink pt-6 sm:pt-8">
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

      <div className="absolute inset-0 bg-black/55" />

      {/* Centered copy */}
      <div className="relative mx-auto max-w-5xl w-full min-w-0 px-6 sm:px-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-semibold text-xs tracking-[0.3em] uppercase text-white/70"
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
            className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-full bg-white text-ink hover:bg-white/90 transition-colors"
          >
            {t("hero.reserveOnWhatsApp")}
          </a>
          <a
            href={`tel:+${WHATSAPP_NUMBER}`}
            className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-full border border-white/35 text-white hover:border-white/70 transition-colors"
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
