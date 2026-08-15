"use client";

import Link from "next/link";
import { MessageCircle, Phone, MapPin } from "lucide-react";
import { waLink, generalEnquiryMessage } from "@/lib/whatsapp";
import Logo from "./Logo";
import { useLanguage } from "./LanguageProvider";

const WHATSAPP_NUMBER = "919876543210";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer id="contact" className="relative bg-charcoal border-t border-card-border">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-20">
        <div className="grid md:grid-cols-[1.4fr_1fr_1fr] gap-12">
          <div>
            <div className="mb-4">
              <Logo wordmarkClassName="font-display text-2xl font-semibold" />
            </div>
            <p className="text-sm text-ivory/60 max-w-sm leading-relaxed mb-6">
              {t("footer.tagline")}
            </p>
            <a
              href={waLink(WHATSAPP_NUMBER, generalEnquiryMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-[#25D366] text-ink font-medium px-5 py-3 hover:brightness-105 transition"
            >
              <MessageCircle size={16} />
              {t("footer.messageWhatsApp")}
            </a>
          </div>

          <div>
            <p className="font-mono text-xs tracking-widest uppercase text-muted mb-4">{t("footer.navigate")}</p>
            <ul className="space-y-3 text-sm text-ivory/70">
              <li><a href="#fleet" className="hover:text-gold-light transition-colors">{t("nav.fleet")}</a></li>
              <li><a href="#how-it-works" className="hover:text-gold-light transition-colors">{t("nav.howItWorks")}</a></li>
              <li><a href="#about" className="hover:text-gold-light transition-colors">{t("nav.about")}</a></li>
              <li><Link href="/admin" className="hover:text-gold-light transition-colors">{t("footer.admin")}</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs tracking-widest uppercase text-muted mb-4">{t("footer.contact")}</p>
            <ul className="space-y-3 text-sm text-ivory/70">
              <li>
                <a href={`tel:+${WHATSAPP_NUMBER}`} className="flex items-center gap-2.5 hover:text-gold-light transition-colors">
                  <Phone size={14} className="text-gold" />
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin size={14} className="text-gold" />
                Narasaraopet, Andhra Pradesh 552601, India
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-card-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted font-mono">
          <p>© {new Date().getFullYear()} Madina Travels. {t("footer.rightsReserved")}</p>
          <p>{t("footer.tagline2")}</p>
        </div>
      </div>
    </footer>
  );
}
