import Link from "next/link";
import { Phone, QrCode } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { buildTelLink, buildWhatsAppLink } from "@/lib/whatsapp";
import { siteConfig, CAR_CATEGORIES } from "@/lib/config";

const QUICK_LINKS = [
  { href: "#fleet", label: "Our Cars" },
  { href: "#categories", label: "Categories" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 pt-16 text-paper/70">
      <div className="container-page grid grid-cols-1 gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <div>
          <Logo tone="light" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-paper/60">
            Chauffeur-driven cars for every journey, booked in a single WhatsApp message.
          </p>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-paper">
            Quick Links
          </h3>
          <ul className="mt-4 flex flex-col gap-2.5">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-sm text-paper/60 hover:text-gold-300">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-paper">
            Vehicle Categories
          </h3>
          <ul className="mt-4 flex flex-col gap-2.5">
            {CAR_CATEGORIES.map((category) => (
              <li key={category}>
                <a href="#categories" className="text-sm text-paper/60 hover:text-gold-300">
                  {category}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-paper">
            Contact
          </h3>
          <ul className="mt-4 flex flex-col gap-3">
            {siteConfig.phoneNumber && (
              <li>
                <a
                  href={buildTelLink()}
                  className="flex items-center gap-2 text-sm text-paper/60 hover:text-gold-300"
                >
                  <Phone className="h-4 w-4" />
                  {siteConfig.phoneNumber}
                </a>
              </li>
            )}
            <li>
              <a
                href={buildWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-paper/60 hover:text-gold-300"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Book on WhatsApp
              </a>
            </li>
            <li>
              <a
                href="#scan"
                className="flex items-center gap-2 text-sm text-paper/60 hover:text-gold-300"
              >
                <QrCode className="h-4 w-4" />
                Scan our QR code
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-paper/10 py-6">
        <div className="container-page flex flex-col-reverse items-center justify-between gap-4 text-xs text-paper/45 sm:flex-row">
          <p>
            © {year} {siteConfig.businessName}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-gold-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gold-300">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
