import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Phone, Check } from "lucide-react";
import { getCarById } from "@/lib/db/queries";
import { CarGallery } from "@/components/home/CarGallery";
import { AvailabilityBadge } from "@/components/ui/AvailabilityBadge";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { buildTelLink } from "@/lib/whatsapp";
import { formatINR, discountPercent } from "@/lib/utils";
import { siteConfig } from "@/lib/config";

export const dynamic = "force-dynamic";

type Props = { params: { id: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = Number(params.id);
  if (!Number.isInteger(id)) return {};

  const car = await getCarById(id).catch(() => undefined);
  if (!car) return { title: "Car Not Found" };

  return {
    title: `${car.name} ${car.model} — ${car.category} for Rent`,
    description: car.description || `Book the ${car.name} ${car.model} with ${siteConfig.businessName}.`,
    openGraph: {
      title: `${car.name} ${car.model}`,
      description: car.description,
      images: car.images[0] ? [car.images[0]] : undefined,
    },
  };
}

export default async function CarDetailPage({ params }: Props) {
  const id = Number(params.id);
  if (!Number.isInteger(id)) notFound();

  const car = await getCarById(id).catch(() => undefined);
  if (!car) notFound();

  const discount = discountPercent(car.originalPrice, car.offerPrice);
  const phone = car.phoneNumber || siteConfig.phoneNumber;

  return (
    <section className="bg-paper py-10 sm:py-14">
      <div className="container-page">
        <Link
          href="/#fleet"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-navy-900"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Fleet
        </Link>

        <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
          <CarGallery images={car.images} alt={`${car.name} ${car.model}`} />

          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-navy-900 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-paper">
                {car.category}
              </span>
              <AvailabilityBadge available={car.available} />
              {discount > 0 && (
                <span className="rounded-full bg-gold-500 px-3 py-1 text-[11px] font-bold text-navy-950">
                  {discount}% OFF
                </span>
              )}
            </div>

            <h1 className="mt-4 font-display text-3xl font-semibold text-navy-900 sm:text-4xl">
              {car.name}
            </h1>
            <p className="mt-1 text-ink-muted">{car.model}</p>

            {car.description && (
              <p className="mt-5 text-[15px] leading-relaxed text-ink-soft">{car.description}</p>
            )}

            {car.specifications.length > 0 && (
              <div className="mt-6">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-navy-900">
                  Specifications
                </h2>
                <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2.5 sm:grid-cols-3">
                  {car.specifications.map((spec) => (
                    <li key={spec} className="flex items-center gap-2 text-sm text-ink-soft">
                      <Check className="h-3.5 w-3.5 shrink-0 text-gold-600" />
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-7 flex items-end gap-3 rounded-xl2 border border-line bg-white p-5 tabular">
              <div>
                {discount > 0 && (
                  <p className="text-sm text-ink-muted line-through">{formatINR(car.originalPrice)}</p>
                )}
                <p className="text-3xl font-bold text-navy-900">
                  {formatINR(car.offerPrice)}
                  <span className="ml-1 text-sm font-normal text-ink-muted">/ day</span>
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <WhatsAppButton
                car={{ name: car.name, model: car.model, offerPrice: car.offerPrice }}
                number={car.whatsappNumber || undefined}
                disabled={!car.available}
                className="flex-1"
                label={car.available ? "Book on WhatsApp" : "Currently Unavailable"}
              />
              {phone && car.available && (
                <a href={buildTelLink(phone)} className="btn-outline sm:min-w-[160px]">
                  <Phone className="h-4 w-4" />
                  Call {phone}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
