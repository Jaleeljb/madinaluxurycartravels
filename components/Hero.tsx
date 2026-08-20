"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, MapPin, Phone, MessageCircle } from "lucide-react";
import { waLink, generalEnquiryMessage } from "@/lib/whatsapp";
import { useLanguage } from "./LanguageProvider";
import type { TranslationKey } from "@/lib/i18n";

const WHATSAPP_NUMBER = "916301353952";

// The looping hero background video, plus a poster frame shown instantly
// on load (and used as the static fallback for prefers-reduced-motion
// and for browsers/connections that can't play video).
const HERO_VIDEO_MP4 = "/video/hero-bg.mp4";
const HERO_VIDEO_WEBM = "/video/hero-bg.webm";
const HERO_POSTER = "/video/hero-bg-poster.jpg";

const STATS: { value: string; labelKey: TranslationKey }[] = [
  { value: "10+", labelKey: "about.stat1Label" },
  { value: "25K+", labelKey: "about.stat2Label" },
  { value: "24/7", labelKey: "about.stat3Label" },
  { value: "4.9★", labelKey: "about.stat4Label" },
];

// useLayoutEffect warns on the server — fall back to useEffect there.
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const HEADLINE_MAX_PX = 46;
const HEADLINE_MIN_PX = 17;
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
      <span className="hidden md:inline-block headline-color-shift font-display font-black tracking-tight leading-[1.05] md:text-3xl lg:text-4xl xl:text-5xl">
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
        className="tagline-shimmer inline-block font-display text-base lg:text-lg xl:text-xl font-medium whitespace-nowrap"
      >
        {text}
      </motion.p>
    </div>
  );
}

export default function Hero() {
  const { t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const [videoReady, setVideoReady] = useState(false);

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-ink pt-6 sm:pt-8">
      {/* Background layer: the poster frame paints instantly and always
          stays underneath, so there is never a blank/black gap while the
          video buffers (or if it fails to load at all). object-cover
          keeps everything filling the frame edge-to-edge, cropped
          sensibly, on any screen size or aspect ratio — phone portrait,
          tablet, ultrawide desktop, all the same markup. A single slow,
          graceful settle-zoom plays on load, then holds still. */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: prefersReducedMotion ? 1 : 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 14, ease: "easeOut" }}
      >
        <img
          src={HERO_POSTER}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        />
        {!prefersReducedMotion && (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={HERO_POSTER}
            onCanPlay={() => setVideoReady(true)}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
            style={{ opacity: videoReady ? 1 : 0 }}
            aria-hidden="true"
            disablePictureInPicture
            controlsList="nodownload nofullscreen noremoteplayback"
          >
            <source src={HERO_VIDEO_WEBM} type="video/webm" />
            <source src={HERO_VIDEO_MP4} type="video/mp4" />
          </video>
        )}
      </motion.div>

      {/* A vignette rather than a flat wash — darkest where the badge and
          buttons sit, lighter through the middle so the photo still reads
          as a photo, not just a dimmer switch. */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/72 via-black/38 to-black/72" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

      {/* Centered copy */}
      <div className="relative mx-auto max-w-5xl w-full min-w-0 px-6 sm:px-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 backdrop-blur-sm px-4 py-1.5 font-semibold text-xs lg:text-sm tracking-[0.25em] uppercase text-white/90"
        >
          <MapPin size={12} className="shrink-0 text-white/70" />
          Madina Car Travels · Narasaraopet
        </motion.p>

        <FitHeadline text={t("hero.headline")} />

        <Tagline text={t("hero.quote")} />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.36 }}
          className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <motion.a
            href={waLink(WHATSAPP_NUMBER, generalEnquiryMessage())}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="group relative inline-flex items-center gap-2 text-base font-semibold px-6 py-3 rounded-full bg-white text-ink shadow-[0_8px_24px_-4px_rgba(0,0,0,0.35)] ring-1 ring-white/40 hover:shadow-[0_12px_32px_-4px_rgba(37,211,102,0.45)] hover:ring-[#25D366]/50 transition-shadow duration-300 overflow-hidden"
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-black/10 to-transparent" />
            <MessageCircle size={17} className="relative text-[#25D366]" />
            <span className="relative">{t("hero.reserveOnWhatsApp")}</span>
          </motion.a>
          <motion.a
            href={`tel:+${WHATSAPP_NUMBER}`}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="group relative inline-flex items-center gap-2 text-base font-semibold px-6 py-3 rounded-full bg-white text-ink shadow-[0_8px_24px_-4px_rgba(0,0,0,0.35)] ring-1 ring-white/40 hover:shadow-[0_12px_32px_-4px_rgba(0,0,0,0.5)] hover:ring-ink/30 transition-shadow duration-300 overflow-hidden"
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-black/10 to-transparent" />
            <Phone size={16} className="relative" />
            <span className="relative">{t("hero.callUs")}</span>
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
        >
          {STATS.map((s, i) => (
            <div key={s.labelKey} className="flex items-center gap-8">
              <div className="text-center">
                <p className="font-display text-xl sm:text-2xl font-bold text-white leading-none">{s.value}</p>
                <p className="text-[10px] sm:text-[11px] text-white/55 uppercase tracking-wider mt-1.5 whitespace-nowrap">
                  {t(s.labelKey)}
                </p>
              </div>
              {i < STATS.length - 1 && <span className="hidden sm:block w-px h-8 bg-white/20" aria-hidden="true" />}
            </div>
          ))}
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
