"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import { LOCALE_BY_LANGUAGE, startOfDay, toISO, type DateRange } from "@/lib/dates";

export default function AvailabilityCalendar({
  open,
  unavailableDates,
  value,
  onChange,
  onClose,
}: {
  open: boolean;
  unavailableDates: string[];
  value: DateRange | null;
  onChange: (range: DateRange | null) => void;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            key="dialog"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4"
            onClick={onClose}
          >
            {/* Mounted only while open — draft state below is always fresh
                from `value` with no effect-based reset needed. */}
            <CalendarBody unavailableDates={unavailableDates} value={value} onChange={onChange} onClose={onClose} />
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

function CalendarBody({
  unavailableDates,
  value,
  onChange,
  onClose,
}: {
  unavailableDates: string[];
  value: DateRange | null;
  onChange: (range: DateRange | null) => void;
  onClose: () => void;
}) {
  const { language, t } = useLanguage();
  const locale = LOCALE_BY_LANGUAGE[language];

  const today = useMemo(() => startOfDay(new Date()), []);
  const todayIso = toISO(today);
  const blocked = useMemo(() => new Set(unavailableDates), [unavailableDates]);

  const [viewMonth, setViewMonth] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [draftStart, setDraftStart] = useState<string | null>(value?.start ?? null);
  const [draftEnd, setDraftEnd] = useState<string | null>(value?.end ?? null);

  const monthLabel = new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }).format(viewMonth);

  const weekdayLabels = useMemo(() => {
    const sunday = new Date(2024, 0, 7); // a known Sunday
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(sunday);
      d.setDate(sunday.getDate() + i);
      return new Intl.DateTimeFormat(locale, { weekday: "narrow" }).format(d);
    });
  }, [locale]);

  const cells = useMemo(() => {
    const firstOfMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1);
    const daysInMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 0).getDate();
    const out: (Date | null)[] = Array(firstOfMonth.getDay()).fill(null);
    for (let d = 1; d <= daysInMonth; d++) out.push(new Date(viewMonth.getFullYear(), viewMonth.getMonth(), d));
    return out;
  }, [viewMonth]);

  const isCurrentMonth = viewMonth.getFullYear() === today.getFullYear() && viewMonth.getMonth() === today.getMonth();

  function goPrevMonth() {
    if (isCurrentMonth) return;
    setViewMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1));
  }
  function goNextMonth() {
    setViewMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1));
  }

  function handleDayClick(date: Date) {
    const iso = toISO(date);
    if (iso < todayIso || blocked.has(iso)) return;

    if (!draftStart || draftEnd) {
      setDraftStart(iso);
      setDraftEnd(null);
      return;
    }
    if (iso < draftStart) {
      setDraftStart(iso);
      setDraftEnd(null);
      return;
    }
    setDraftEnd(iso);
  }

  const rangeHasBlockedDate = useMemo(() => {
    if (!draftStart || !draftEnd) return false;
    for (const iso of blocked) {
      if (iso >= draftStart && iso <= draftEnd) return true;
    }
    return false;
  }, [draftStart, draftEnd, blocked]);

  function handleConfirm() {
    if (!draftStart || rangeHasBlockedDate) return;
    onChange({ start: draftStart, end: draftEnd ?? draftStart });
    onClose();
  }

  function handleClear() {
    setDraftStart(null);
    setDraftEnd(null);
    onChange(null);
  }

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      initial={{ opacity: 0, y: 14, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 14, scale: 0.97 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      onClick={(e) => e.stopPropagation()}
      className="w-full max-w-[340px] rounded-2xl border border-card-border bg-card shadow-xl p-5 relative"
    >
      <div className="flex items-center justify-between mb-1">
        <button
          type="button"
          onClick={goPrevMonth}
          disabled={isCurrentMonth}
          aria-label="Previous month"
          className="grid place-items-center w-8 h-8 rounded-full text-ivory/70 hover:bg-charcoal disabled:opacity-25 disabled:hover:bg-transparent transition-colors"
        >
          <ChevronLeft size={17} />
        </button>
        <p className="font-display font-semibold text-sm">{monthLabel}</p>
        <button
          type="button"
          onClick={goNextMonth}
          aria-label="Next month"
          className="grid place-items-center w-8 h-8 rounded-full text-ivory/70 hover:bg-charcoal transition-colors"
        >
          <ChevronRight size={17} />
        </button>
        <button
          type="button"
          onClick={onClose}
          aria-label={t("calendar.close")}
          className="absolute right-3 top-3 grid place-items-center w-8 h-8 rounded-full text-muted hover:bg-charcoal transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-y-1 mt-3">
        {weekdayLabels.map((w, i) => (
          <div key={i} className="text-center text-[11px] text-muted font-medium py-1">
            {w}
          </div>
        ))}
        {cells.map((date, i) => {
          if (!date) return <div key={`empty-${i}`} />;
          const iso = toISO(date);
          const isPast = iso < todayIso;
          const isBlocked = blocked.has(iso);
          const isStart = draftStart === iso;
          const isEnd = draftEnd === iso;
          const isInRange = !!draftStart && !!draftEnd && iso > draftStart && iso < draftEnd;
          const isEndpoint = isStart || isEnd;
          const disabled = isPast || isBlocked;

          return (
            <button
              key={iso}
              type="button"
              disabled={disabled}
              onClick={() => handleDayClick(date)}
              className={[
                "relative h-9 text-[13px] rounded-full transition-colors",
                disabled
                  ? isBlocked
                    ? "text-[var(--danger)]/50 line-through cursor-not-allowed"
                    : "text-muted/40 cursor-not-allowed"
                  : "hover:bg-charcoal cursor-pointer",
                isEndpoint ? "bg-ink text-white hover:bg-ink" : "",
                isInRange ? "bg-charcoal" : "",
                iso === todayIso && !isEndpoint ? "font-bold" : "",
              ].join(" ")}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-4 mt-4 text-[11px] text-muted">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#06C167]" /> {t("calendar.legendAvailable")}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[var(--danger)]" /> {t("calendar.legendBooked")}
        </span>
      </div>

      <p className="mt-3 text-xs text-muted">
        {rangeHasBlockedDate ? (
          <span className="text-[var(--danger)]">{t("calendar.rangeBlocked")}</span>
        ) : (
          t("calendar.hint")
        )}
      </p>

      <div className="flex items-center gap-2 mt-4">
        <button
          type="button"
          onClick={handleClear}
          className="flex-1 rounded-full border border-card-border px-4 py-2.5 text-sm text-ivory/70 hover:border-gold/50 transition-colors"
        >
          {t("calendar.clear")}
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          disabled={!draftStart || rangeHasBlockedDate}
          className="flex-1 rounded-full bg-ink text-white px-4 py-2.5 text-sm font-medium hover:bg-gold-light transition-colors disabled:opacity-30 disabled:hover:bg-ink"
        >
          {t("calendar.confirm")}
        </button>
      </div>
    </motion.div>
  );
}
