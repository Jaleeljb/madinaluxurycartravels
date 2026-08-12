import Image from "next/image";
import { ArrowRight, Armchair, Car, IndianRupee, MessageCircle } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { siteConfig } from "@/lib/config";

const TRUST_ITEMS = [
  { icon: Armchair, label: "Comfortable Rides" },
  { icon: Car, label: "Multiple Car Options" },
  { icon: IndianRupee, label: "Affordable Pricing" },
  { icon: MessageCircle, label: "Easy WhatsApp Booking" },
];

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-navy-950 pt-[72px]">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=2000&auto=format&fit=crop"
          alt="Chauffeur-driven luxury car on a highway at golden hour"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/85 via-navy-950/70 to-navy-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/70 via-transparent to-navy-950/40" />
      </div>

      <div className="container-page relative flex flex-1 flex-col justify-center py-16 sm:py-20">
        <div className="max-w-2xl animate-fade-up">
          <Logo tone="light" className="mb-8" />

          <p className="eyebrow text-gold-300">
            <span className="h-px w-8 bg-gold-400" />
            Premium Chauffeur-Driven Travel
          </p>

          <h1 className="mt-5 text-[2.4rem] font-semibold leading-[1.08] text-paper sm:text-5xl lg:text-[3.4rem]">
            {siteConfig.headline}
          </h1>

          <p className="mt-5 max-w-lg text-base leading-relaxed text-paper/75 sm:text-lg">
            {siteConfig.subheadline}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <WhatsAppButton label="Book Your Car" className="sm:min-w-[200px]" />
            <a href="#fleet" className="btn-outline-light sm:min-w-[180px]">
              Explore Cars
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-paper/10 pt-8 sm:mt-16 sm:grid-cols-4 sm:gap-8">
          {TRUST_ITEMS.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold-400/30 bg-paper/5 text-gold-300">
                <Icon className="h-[18px] w-[18px]" />
              </span>
              <span className="text-sm font-medium text-paper/85">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
