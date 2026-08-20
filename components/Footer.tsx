"use client";

import Link from "next/link";
import { MessageCircle, Phone, MapPin } from "lucide-react";
import { waLink, generalEnquiryMessage } from "@/lib/whatsapp";
import Logo from "./Logo";
import AmbientBackground from "./AmbientBackground";
import { useLanguage } from "./LanguageProvider";

const WHATSAPP_NUMBER = "916301353952";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer id="contact" className="relative bg-black overflow-hidden">
      <AmbientBackground variant="footer" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 py-20">
        <div className="grid md:grid-cols-[1.4fr_1fr_1fr] gap-12">
          <div>
            <div className="mb-4">
              <Logo variant="light" size={38} />
            </div>
            <p className="text-base text-white/55 max-w-sm leading-relaxed mb-6">
              {t("footer.tagline")}
            </p>
            <a
              href={waLink(WHATSAPP_NUMBER, generalEnquiryMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-[#25D366] text-ink font-medium px-5 py-3 text-base hover:brightness-105 transition"
            >
              <MessageCircle size={16} />
              {t("footer.messageWhatsApp")}
            </a>
          </div>

          <div>
            <p className="text-sm font-semibold tracking-widest uppercase text-white/40 mb-4">{t("footer.navigate")}</p>
            <ul className="space-y-3 text-base text-white/70">
              <li><a href="#fleet" className="hover:text-white transition-colors">{t("nav.fleet")}</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">{t("nav.howItWorks")}</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">{t("nav.about")}</a></li>
              <li><Link href="/admin" className="hover:text-white transition-colors">{t("footer.admin")}</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold tracking-widest uppercase text-white/40 mb-4">{t("footer.contact")}</p>
            <ul className="space-y-3 text-base text-white/70">
              <li>
                <a href={`tel:+${WHATSAPP_NUMBER}`} className="flex items-center gap-2.5 hover:text-white transition-colors">
                  <Phone size={14} className="text-white/50" />
                  +91 63013 53952
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={14} className="text-white/50 mt-0.5 shrink-0" />
                <span>Shadi Khana Grounds, Narasaraopet, Palnadu District, Andhra Pradesh - 522601</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm lg:text-xs text-white/40">
          <p>© {new Date().getFullYear()} Madina Car Travels. {t("footer.rightsReserved")}</p>
          <nav className="flex items-center gap-5" aria-label="Legal">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              {t("footer.privacyPolicy")}
            </Link>
            <Link href="/copyright" className="hover:text-white transition-colors">
              {t("footer.copyrightNotice")}
            </Link>
          </nav>
          <p>{t("footer.tagline2")}</p>
        </div>
      </div>
    </footer>
  );
}
