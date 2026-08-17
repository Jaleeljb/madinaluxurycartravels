"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { CalendarDays, MessageCircle, Users, Briefcase } from "lucide-react";
import type { Car } from "@/lib/types";
import { waLink, bookingMessage } from "@/lib/whatsapp";
import { useLanguage } from "./LanguageProvider";
import AvailabilityCalendar from "./AvailabilityCalendar";
import { LOCALE_BY_LANGUAGE, formatRange, type DateRange } from "@/lib/dates";

export default function CarCard({ car, index }: { car: Car; index: number }) {
  const { t, language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const cardRef = useRef<HTMLElement>(null);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | null>(null);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const springX = useSpring(px, { stiffness: 220, damping: 20, mass: 0.4 });
  const springY = useSpring(py, { stiffness: 220, damping: 20, mass: 0.4 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);

  function handlePointerMove(e: React.PointerEvent<HTMLElement>) {
    if (prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handlePointerLeave() {
    px.set(0);
    py.set(0);
  }

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.08 }}
      whileHover={{ y: -6 }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        rotateX: prefersReducedMotion ? 0 : rotateX,
        rotateY: prefersReducedMotion ? 0 : rotateY,
        transformPerspective: 900,
      }}
      className="group relative rounded-2xl overflow-hidden bg-card border border-card-border hover:border-gold/50 card-shadow transition-colors"
    >
      <div className="relative h-52 overflow-hidden">
        <motion.img
          src={car.image}
          alt={car.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent" />
        <span className="absolute top-3 left-3 text-xs lg:text-[10px] font-semibold uppercase tracking-widest bg-black/75 backdrop-blur px-2.5 py-1 rounded-full text-white">
          {car.category}
        </span>
        <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 text-xs lg:text-[10px] font-semibold uppercase tracking-widest bg-black/75 backdrop-blur px-2.5 py-1 rounded-full text-white">
          <span className="relative flex w-2 h-2">
            <span
              className={`absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping ${
                car.available ? "bg-[#06C167]" : "bg-[var(--danger)]"
              }`}
            />
            <span
              className={`relative inline-flex w-2 h-2 rounded-full ${
                car.available ? "bg-[#06C167]" : "bg-[var(--danger)]"
              }`}
            />
          </span>
          {car.available ? t("car.available") : t("car.unavailable")}
        </span>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl font-semibold leading-tight">{car.name}</h3>
        </div>

        <p className="mt-2 text-base text-ivory/60 leading-relaxed line-clamp-2">{car.description}</p>

        <div className="mt-4 flex items-center gap-4 text-sm lg:text-xs text-muted font-mono">
          <span className="flex items-center gap-1.5">
            <Users size={13} /> {car.seats} {t("car.seats")}
          </span>
          <span className="flex items-center gap-1.5">
            <Briefcase size={13} /> {car.bags} {t("car.bags")}
          </span>
        </div>

        <button
          type="button"
          onClick={() => setCalendarOpen(true)}
          className="mt-4 w-full flex items-center justify-between gap-2 rounded-xl border border-card-border px-3.5 py-2.5 text-base lg:text-sm text-ivory/70 hover:border-gold/50 hover:text-gold-light transition-colors"
        >
          <span className="flex items-center gap-2 truncate">
            <CalendarDays size={15} className="shrink-0" />
            <span className="truncate">
              {dateRange ? formatRange(dateRange, LOCALE_BY_LANGUAGE[language]) : t("calendar.selectDates")}
            </span>
          </span>
          {dateRange && <span className="text-sm lg:text-xs text-gold-light shrink-0">{t("calendar.change")}</span>}
        </button>
      </div>

      <AvailabilityCalendar
        open={calendarOpen}
        unavailableDates={car.unavailableDates}
        value={dateRange}
        onChange={setDateRange}
        onClose={() => setCalendarOpen(false)}
      />

      {/* flat divider, Uber-style */}
      <div className="border-t border-card-border mx-5" />

      <div className="flex items-center justify-between px-5 py-4">
        <div>
          <p className="font-mono text-xs lg:text-[10px] uppercase tracking-widest text-muted">{t("car.perDay")}</p>
          <p className="font-display text-2xl font-bold text-gold-light">
            {car.currency}{car.pricePerDay.toLocaleString("en-IN")}
          </p>
        </div>
        <a
          href={waLink(car.whatsapp, bookingMessage(car, dateRange))}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-[#25D366] text-ink text-base font-medium px-4 py-2.5 hover:brightness-105 active:scale-[0.97] transition"
        >
          <MessageCircle size={16} />
          {t("car.book")}
        </a>
      </div>
    </motion.article>
  );
}
