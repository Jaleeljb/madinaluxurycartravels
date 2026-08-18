import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function LegalPageShell({
  eyebrow,
  title,
  intro,
  effectiveDate,
  lastUpdated,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  effectiveDate: string;
  lastUpdated: string;
  children: ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-28 sm:pt-32 pb-24 bg-paper">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <p className="font-mono text-xs tracking-[0.25em] text-muted uppercase mb-3">{eyebrow}</p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold leading-tight mb-4">{title}</h1>
          {intro && <p className="text-ivory/70 leading-relaxed mb-6 max-w-2xl">{intro}</p>}
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted font-mono mb-12 pb-8 border-b border-card-border">
            <span>Effective date: {effectiveDate}</span>
            <span>Last updated: {lastUpdated}</span>
          </div>

          <div className="legal-content space-y-14">{children}</div>
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

/** One numbered section of a policy page — consistent heading, spacing,
 *  and an anchor id so the footer/other pages can deep-link to it
 *  (e.g. #grievance-officer). */
export function PolicySection({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="font-display text-xl sm:text-2xl font-semibold mb-4 flex items-baseline gap-3">
        <span className="text-muted font-mono text-sm shrink-0">{number}</span>
        {title}
      </h2>
      <div className="prose-legal text-[15px] leading-relaxed text-ivory/75 space-y-4">{children}</div>
    </section>
  );
}
