"use client";

import Link from "next/link";
import { MessageCircle, Phone, MapPin } from "lucide-react";
import { waLink, generalEnquiryMessage } from "@/lib/whatsapp";
import Logo from "./Logo";
import AmbientBackground from "./AmbientBackground";
import { useLanguage } from "./LanguageProvider";

const WHATSAPP_NUMBER = "919876543210";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer id="contact" className="relative bg-black overflow-hidden">
      <AmbientBackground variant="footer" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 py-20">
        <div className="grid md:grid-cols-[1.4fr_1fr_1fr] gap-12">
          <div>
            <div className="mb-4">
              <Logo
                variant="light"
                wordmarkClassName="font-display text-2xl font-semibold text-white"
              />
            </div>
            <p className="text-sm text-white/55 max-w-sm leading-relaxed mb-6">
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
            <p className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-4">{t("footer.navigate")}</p>
            <ul className="space-y-3 text-sm text-white/70">
              <li><a href="#fleet" className="hover:text-white transition-colors">{t("nav.fleet")}</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">{t("nav.howItWorks")}</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">{t("nav.about")}</a></li>
              <li><Link href="/admin" className="hover:text-white transition-colors">{t("footer.admin")}</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-4">{t("footer.contact")}</p>
            <ul className="space-y-3 text-sm text-white/70">
              <li>
                <a href={`tel:+${WHATSAPP_NUMBER}`} className="flex items-center gap-2.5 hover:text-white transition-colors">
                  <Phone size={14} className="text-white/50" />
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin size={14} className="text-white/50" />
                Narasaraopet, Andhra Pradesh 552601, India
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>© {new Date().getFullYear()} Madina Travels. {t("footer.rightsReserved")}</p>
          <p>{t("footer.tagline2")}</p>
        </div>
      </div>
    </footer>
  );
}
