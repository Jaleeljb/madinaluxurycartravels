"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Globe } from "lucide-react";
import { LANGUAGES } from "@/lib/i18n";
import { useLanguage } from "./LanguageProvider";

export default function LanguageSwitcher({
  compact = false,
  className = "",
}: {
  compact?: boolean;
  className?: string;
}) {
  const { language, setLanguage, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const current = LANGUAGES.find((l) => l.code === language) ?? LANGUAGES[0];

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("nav.language")}
        className={
          compact
            ? "grid place-items-center w-10 h-10 rounded-full text-ivory hover:bg-charcoal transition-colors"
            : "inline-flex items-center gap-1.5 text-sm text-ivory/75 hover:text-gold-light transition-colors px-3 py-2 rounded-full hover:bg-charcoal"
        }
      >
        <Globe size={compact ? 19 : 15} className="shrink-0" />
        {!compact && <span className="whitespace-nowrap">{current.label}</span>}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.ul
              initial={{ opacity: 0, y: -6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.97 }}
              transition={{ duration: 0.15 }}
              role="listbox"
              aria-label={t("nav.language")}
              className="absolute right-0 mt-2 w-40 rounded-2xl border border-card-border bg-card shadow-lg overflow-hidden z-50"
            >
              {LANGUAGES.map((lang) => (
                <li key={lang.code}>
                  <button
                    role="option"
                    aria-selected={lang.code === language}
                    onClick={() => {
                      setLanguage(lang.code);
                      setOpen(false);
                    }}
                    className="w-full flex items-center justify-between gap-2 px-4 py-2.5 text-sm text-ivory/80 hover:bg-charcoal hover:text-gold-light transition-colors"
                  >
                    <span>{lang.label}</span>
                    {lang.code === language && <Check size={14} className="text-gold shrink-0" />}
                  </button>
                </li>
              ))}
            </motion.ul>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
