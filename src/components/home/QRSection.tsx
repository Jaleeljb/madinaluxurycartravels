"use client";

import { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Download, Smartphone } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/lib/config";

export function QRSection() {
  const canvasWrapperRef = useRef<HTMLDivElement>(null);

  function handleDownload() {
    const canvas = canvasWrapperRef.current?.querySelector("canvas");
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = url;
    link.download = "madina-luxury-car-travels-qr.png";
    link.click();
  }

  return (
    <section id="scan" className="bg-navy-950 py-20 sm:py-28">
      <div className="container-page grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Quick Access"
            title="Scan to Book Your Ride"
            subtitle="Point your phone camera at the code to open our website instantly — browse the fleet and book on WhatsApp in seconds."
            tone="light"
          />

          <ul className="mt-7 flex flex-col gap-3 text-sm text-paper/70">
            <li className="flex items-center gap-2.5">
              <Smartphone className="h-4 w-4 shrink-0 text-gold-400" />
              Open your phone&apos;s camera app — no separate scanner needed.
            </li>
            <li className="flex items-center gap-2.5">
              <Smartphone className="h-4 w-4 shrink-0 text-gold-400" />
              Tap the link that appears to open this website.
            </li>
            <li className="flex items-center gap-2.5">
              <Smartphone className="h-4 w-4 shrink-0 text-gold-400" />
              Browse the fleet and tap &ldquo;Book on WhatsApp&rdquo; on any car.
            </li>
          </ul>

          <button
            type="button"
            onClick={handleDownload}
            className="btn-outline-light mt-8"
          >
            <Download className="h-4 w-4" />
            Download QR Code
          </button>
        </div>

        <div className="flex justify-center lg:justify-end">
          <div className="rounded-xl2 bg-paper p-7 shadow-cardHover sm:p-8" ref={canvasWrapperRef}>
            <QRCodeCanvas
              value={siteConfig.siteUrl}
              size={220}
              level="M"
              marginSize={0}
              fgColor="#0B1220"
              bgColor="#FAF8F3"
            />
            <p className="mt-4 text-center font-mono text-xs uppercase tracking-widest2 text-ink-muted">
              {siteConfig.siteUrl.replace(/^https?:\/\//, "")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
