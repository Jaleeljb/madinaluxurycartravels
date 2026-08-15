"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "./LanguageProvider";
import { waLink, generalEnquiryMessage } from "@/lib/whatsapp";

const WHATSAPP_NUMBER = "919876543210";

export default function Navbar() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const LINKS = [
    { href: "#fleet", label: t("nav.fleet") },
    { href: "#how-it-works", label: t("nav.howItWorks") },
    { href: "#about", label: t("nav.about") },
    { href: "#contact", label: t("nav.contact") },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 bg-paper transition-shadow duration-200 ${
        scrolled ? "shadow-[0_1px_0_0_var(--card-border)]" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-5 sm:px-8 flex items-center justify-between h-16">
        <Link href="/" className="shrink-0">
          <Logo size={30} wordmarkClassName="font-display text-base sm:text-lg tracking-tight font-extrabold whitespace-nowrap" />
        </Link>

        <div className="hidden lg:flex items-center gap-8 shrink-0">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-ivory/70 hover:text-ink transition-colors whitespace-nowrap"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <LanguageSwitcher className="hidden lg:block" />
          <LanguageSwitcher compact className="lg:hidden" />

          <a
            href={waLink(WHATSAPP_NUMBER, generalEnquiryMessage())}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center text-sm font-semibold px-5 py-2.5 rounded-full bg-gold text-white hover:bg-gold-light transition-colors whitespace-nowrap"
          >
            {t("nav.reserveNow")}
          </a>

          <button
            className="lg:hidden grid place-items-center w-10 h-10 rounded-full text-ink hover:bg-charcoal transition-colors shrink-0"
            aria-label={open ? t("nav.closeMenu") : t("nav.openMenu")}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="lg:hidden overflow-hidden bg-paper border-b border-card-border"
          >
            <div className="px-6 py-6 flex flex-col gap-1">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-base font-medium text-ivory/85 hover:text-ink transition-colors py-2.5 border-b border-card-border last:border-0"
                >
                  {l.label}
                </a>
              ))}
              <a
                href={waLink(WHATSAPP_NUMBER, generalEnquiryMessage())}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="mt-4 inline-flex items-center justify-center text-center text-sm font-semibold px-5 py-3 rounded-full bg-gold text-white"
              >
                {t("nav.reserveNow")}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
