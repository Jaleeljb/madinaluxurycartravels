import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = { title: "Terms & Conditions" };

export default function TermsPage() {
  return (
    <section className="bg-paper py-16 sm:py-24">
      <div className="container-page max-w-2xl">
        <h1 className="font-display text-3xl font-semibold text-navy-900">Terms &amp; Conditions</h1>
        <p className="mt-4 text-sm text-ink-muted">Placeholder content — replace with your actual terms.</p>
        <div className="prose mt-8 space-y-4 text-[15px] leading-relaxed text-ink-soft">
          <p>
            This page is a placeholder for {siteConfig.businessName}&apos;s booking terms — for
            example, cancellation policy, payment terms, driver conduct, and vehicle usage
            conditions. Prices shown on this website are indicative until confirmed directly with
            our team over WhatsApp or phone.
          </p>
          <p>
            Replace this text with your finalised terms and conditions before launching publicly.
          </p>
        </div>
      </div>
    </section>
  );
}
