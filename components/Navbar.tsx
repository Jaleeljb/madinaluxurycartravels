"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Car } from "lucide-react";

const LINKS = [
  { href: "#fleet", label: "Fleet" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
        scrolled ? "bg-ink/85 backdrop-blur-md border-b border-card-border" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-5 sm:px-8 flex items-center justify-between h-18 py-4">
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="grid place-items-center w-9 h-9 rounded-full border border-gold/60 text-gold group-hover:bg-gold group-hover:text-ink transition-colors duration-300">
            <Car size={16} strokeWidth={1.75} />
          </span>
          <span className="font-display text-lg sm:text-xl tracking-wide">
            Madina <span className="gold-gradient-text">Luxury</span> Car Travels
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-9">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-ivory/75 hover:text-gold-light transition-colors tracking-wide"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#fleet"
            className="text-sm font-medium px-5 py-2.5 rounded-full bg-gold text-ink hover:bg-gold-light transition-colors"
          >
            Reserve now
          </a>
        </div>

        <button
          className="md:hidden text-ivory p-2"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-ink/97 backdrop-blur-md border-b border-card-border"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-base text-ivory/85 hover:text-gold-light transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#fleet"
                onClick={() => setOpen(false)}
                className="text-center text-sm font-medium px-5 py-3 rounded-full bg-gold text-ink"
              >
                Reserve now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
