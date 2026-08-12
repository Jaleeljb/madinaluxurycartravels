"use client";

import { Phone } from "lucide-react";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { buildTelLink } from "@/lib/whatsapp";
import { siteConfig } from "@/lib/config";

export function MobileStickyBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-line bg-white/95 px-4 py-3 backdrop-blur-sm lg:hidden"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      {siteConfig.phoneNumber && (
        <a
          href={buildTelLink()}
          aria-label="Call now"
          className="btn-outline w-14 justify-center px-0"
        >
          <Phone className="h-5 w-5" />
        </a>
      )}
      <WhatsAppButton label="Book on WhatsApp" className="flex-1" />
    </div>
  );
}
