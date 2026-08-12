import { Armchair, IndianRupee, MessageCircle, Car, ShieldCheck, Headset } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const BENEFITS = [
  {
    icon: Armchair,
    title: "Comfortable Vehicles",
    description: "Clean, well-maintained cars kept ready for every kind of journey.",
  },
  {
    icon: IndianRupee,
    title: "Transparent Pricing",
    description: "The price you're quoted on WhatsApp is the price you pay — no surprises.",
  },
  {
    icon: MessageCircle,
    title: "Easy Booking",
    description: "Pick a car and send one WhatsApp message. That's the whole process.",
  },
  {
    icon: Car,
    title: "Multiple Vehicle Options",
    description: "Sedans, SUVs, Tempo Travellers and Tufaan vehicles for any group size.",
  },
  {
    icon: ShieldCheck,
    title: "Reliable Service",
    description: "We plan pickups around your schedule and keep you updated along the way.",
  },
  {
    icon: Headset,
    title: "WhatsApp Support",
    description: "Questions before or during your trip? Reach us directly, any time.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="bg-paper py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Built Around a Better Booking Experience"
          align="center"
          className="mx-auto"
        />

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((benefit, i) => (
            <Reveal key={benefit.title} delay={i * 70}>
              <div className="card h-full p-6 hover:shadow-cardHover">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-navy-900/[0.05] text-navy-900">
                  <benefit.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-navy-900">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{benefit.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
