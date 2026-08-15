import Link from "next/link";
import { MessageCircle, Phone, MapPin } from "lucide-react";
import { waLink, generalEnquiryMessage } from "@/lib/whatsapp";
import Logo from "./Logo";

const WHATSAPP_NUMBER = "919876543210";

export default function Footer() {
  return (
    <footer id="contact" className="relative bg-charcoal border-t border-card-border">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-20">
        <div className="grid md:grid-cols-[1.4fr_1fr_1fr] gap-12">
          <div>
            <div className="mb-4">
              <Logo wordmarkClassName="font-display text-2xl font-semibold" />
            </div>
            <p className="text-sm text-ivory/60 max-w-sm leading-relaxed mb-6">
              Cars for local trips, outstation travel and airport transfers
              across Andhra Pradesh — booked instantly over WhatsApp.
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
                +91 98765 43210
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin size={14} className="text-gold" />
                Narasaraopet, Andhra Pradesh 552601, India
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-card-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted font-mono">
          <p>© {new Date().getFullYear()} Madina Travels. All rights reserved.</p>
          <p>Built for travellers, driven by locals.</p>
        </div>
      </div>
    </footer>
  );
}
