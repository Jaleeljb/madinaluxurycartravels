import Image from "next/image";
import { Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/lib/config";

const SERVICE_HIGHLIGHTS = [
  "Comfortable, well-maintained vehicles",
  "Transparent, upfront pricing",
  "Simple booking over a single WhatsApp chat",
  "A range of vehicles for every kind of trip",
  "Customer-first, responsive service",
];

export function AboutSection() {
  return (
    <section id="about" className="bg-white py-20 sm:py-28">
      <div className="container-page grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className="relative order-2 lg:order-1">
          <div className="relative aspect-[5/4] w-full overflow-hidden rounded-xl2 shadow-card">
            <Image
              src="https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1200&auto=format&fit=crop"
              alt="Driver preparing a car for a customer journey"
              fill
              sizes="(min-width: 1024px) 46vw, 92vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-4 hidden max-w-[220px] rounded-xl2 border border-line bg-white p-5 shadow-cardHover sm:block">
            <p className="font-display text-2xl font-semibold text-navy-900">Door to Door</p>
            <p className="mt-1 text-sm text-ink-muted">
              We plan the pickup and route around you, not the other way round.
            </p>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <SectionHeading eyebrow="About Us" title={`About ${siteConfig.businessName}`} />

          <p className="mt-6 text-[15px] leading-relaxed text-ink-soft sm:text-base">
            {siteConfig.businessName} exists for one simple reason: getting from one place to
            another should feel comfortable, not stressful. We put together a fleet that covers
            everyday city rides, family outings and longer outstation journeys, and we keep the
            booking process as short as a single conversation — no forms, no waiting on hold, just
            a message on WhatsApp.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-soft sm:text-base">
            Every price you see on this site is the price you&apos;re quoted before you book — we
            believe travel arrangements should be easy to trust, from the first message to the
            moment you&apos;re dropped off.
          </p>

          <ul className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {SERVICE_HIGHLIGHTS.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-ink-soft">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
