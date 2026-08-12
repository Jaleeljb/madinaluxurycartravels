"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { buildTelLink } from "@/lib/whatsapp";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#fleet", label: "Our Cars" },
  { href: "#categories", label: "Categories" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || menuOpen
          ? "bg-navy-950/95 shadow-[0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md"
          : "bg-gradient-to-b from-navy-950/70 to-transparent"
      )}
    >
      <nav className="container-page flex h-[72px] items-center justify-between" aria-label="Primary">
        <Link href="/" className="relative z-10" aria-label={`${siteConfig.businessName} — home`}>
          <Logo tone="light" />
        </Link>

        <ul className="hidden items-center gap-9 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-paper/85 transition-colors hover:text-gold-300"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          {siteConfig.phoneNumber && (
            <a
              href={buildTelLink()}
              className="inline-flex items-center gap-2 text-sm font-medium text-paper/85 hover:text-gold-300"
            >
              <Phone className="h-4 w-4" />
              {siteConfig.phoneNumber}
            </a>
          )}
          <WhatsAppButton label="Book Now" size="sm" />
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="relative z-10 -mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-paper lg:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <div
        id="mobile-menu"
        className={cn(
          "grid overflow-hidden bg-navy-950 transition-[grid-template-rows] duration-300 ease-out lg:hidden",
          menuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="min-h-0">
          <ul className="container-page flex flex-col gap-1 pb-6 pt-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-lg px-3 py-3.5 text-base font-medium text-paper/90 hover:bg-paper/5 hover:text-gold-300"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="container-page flex flex-col gap-3 border-t border-paper/10 pb-8 pt-5">
            {siteConfig.phoneNumber && (
              <a href={buildTelLink()} className="btn-outline-light w-full">
                <Phone className="h-4 w-4" />
                Call {siteConfig.phoneNumber}
              </a>
            )}
            <WhatsAppButton label="Book on WhatsApp" className="w-full" />
          </div>
        </div>
      </div>
    </header>
  );
}
