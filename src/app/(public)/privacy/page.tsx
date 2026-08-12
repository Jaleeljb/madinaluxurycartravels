import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <section className="bg-paper py-16 sm:py-24">
      <div className="container-page max-w-2xl">
        <h1 className="font-display text-3xl font-semibold text-navy-900">Privacy Policy</h1>
        <p className="mt-4 text-sm text-ink-muted">Placeholder content — replace with your actual policy.</p>
        <div className="prose mt-8 space-y-4 text-[15px] leading-relaxed text-ink-soft">
          <p>
            {siteConfig.businessName} respects your privacy. This page is a placeholder — add details
            here about what information is collected when a customer contacts us (for example, name
            and phone number shared over WhatsApp), how it is used to arrange bookings, and how long
            it is retained.
          </p>
          <p>
            Replace this text with your finalised privacy policy before launching publicly. If you
            work with a legal advisor, this is a good page to have them review.
          </p>
        </div>
      </div>
    </section>
  );
}
