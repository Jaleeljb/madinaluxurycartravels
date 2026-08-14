import Link from "next/link";
import { MessageCircle, Phone, MapPin } from "lucide-react";
import { waLink, generalEnquiryMessage } from "@/lib/whatsapp";

const WHATSAPP_NUMBER = "966500000001";

export default function Footer() {
  return (
    <footer id="contact" className="relative bg-charcoal border-t border-card-border">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-20">
        <div className="grid md:grid-cols-[1.4fr_1fr_1fr] gap-12">
          <div>
            <h3 className="font-display text-2xl font-semibold mb-3">
              Madina <span className="gold-gradient-text">Luxury</span> Car Travels
            </h3>
            <p className="text-sm text-ivory/60 max-w-sm leading-relaxed mb-6">
              Chauffeured cars for Ziyarat, Umrah transfers and city travel —
              booked instantly over WhatsApp.
            </p>
            <a
              href={waLink(WHATSAPP_NUMBER, generalEnquiryMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-[#25D366] text-ink font-medium px-5 py-3 hover:brightness-105 transition"
            >
              <MessageCircle size={16} />
              Message us on WhatsApp
            </a>
          </div>

          <div>
            <p className="font-mono text-xs tracking-widest uppercase text-muted mb-4">Navigate</p>
            <ul className="space-y-3 text-sm text-ivory/70">
              <li><a href="#fleet" className="hover:text-gold-light transition-colors">Fleet</a></li>
              <li><a href="#how-it-works" className="hover:text-gold-light transition-colors">How it works</a></li>
              <li><a href="#about" className="hover:text-gold-light transition-colors">About</a></li>
              <li><Link href="/admin" className="hover:text-gold-light transition-colors">Admin</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs tracking-widest uppercase text-muted mb-4">Contact</p>
            <ul className="space-y-3 text-sm text-ivory/70">
              <li className="flex items-center gap-2.5">
                <Phone size={14} className="text-gold" />
                +966 50 000 0001
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin size={14} className="text-gold" />
                Al Haram Road, Madina, KSA
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-card-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted font-mono">
          <p>© {new Date().getFullYear()} Madina Luxury Car Travels. All rights reserved.</p>
          <p>Built for travellers, driven by locals.</p>
        </div>
      </div>
    </footer>
  );
}
