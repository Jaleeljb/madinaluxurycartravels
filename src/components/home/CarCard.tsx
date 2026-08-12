import Image from "next/image";
import Link from "next/link";
import { Phone, ImageIcon } from "lucide-react";
import type { Car } from "@/lib/db/schema";
import { AvailabilityBadge } from "@/components/ui/AvailabilityBadge";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { buildTelLink } from "@/lib/whatsapp";
import { formatINR, discountPercent } from "@/lib/utils";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

export function CarCard({ car }: { car: Car }) {
  const discount = discountPercent(car.originalPrice, car.offerPrice);
  const coverImage = car.images[0];
  const phone = car.phoneNumber || siteConfig.phoneNumber;

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-xl2 border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-cardHover",
        !car.available && "opacity-90"
      )}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-navy-100">
        {coverImage ? (
          <Image
            src={coverImage}
            alt={`${car.name} ${car.model} — ${car.category}`}
            fill
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 92vw"
            className={cn(
              "object-cover transition-transform duration-500 group-hover:scale-[1.04]",
              !car.available && "grayscale-[35%]"
            )}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-navy-900/5 text-ink-muted">
            <ImageIcon className="h-8 w-8" />
          </div>
        )}

        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
          <span className="rounded-full bg-navy-950/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-paper backdrop-blur-sm">
            {car.category}
          </span>
          {discount > 0 && (
            <span className="rounded-full bg-gold-500 px-3 py-1 text-[11px] font-bold text-navy-950 shadow-gold">
              {discount}% OFF
            </span>
          )}
        </div>

        {!car.available && (
          <div className="absolute inset-0 flex items-center justify-center bg-navy-950/45">
            <span className="rounded-full bg-navy-950/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-paper">
              Currently Unavailable
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold text-navy-900">{car.name}</h3>
        <p className="mt-0.5 text-sm text-ink-muted">{car.model}</p>

        {car.description && (
          <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-ink-soft">{car.description}</p>
        )}

        <div className="mt-4 flex items-end gap-2 tabular">
          {discount > 0 && (
            <span className="text-sm text-ink-muted line-through">{formatINR(car.originalPrice)}</span>
          )}
          <span className="text-2xl font-bold text-navy-900">{formatINR(car.offerPrice)}</span>
          <span className="mb-0.5 text-xs text-ink-muted">/ day</span>
        </div>

        <div className="mt-3">
          <AvailabilityBadge available={car.available} />
        </div>

        <div className="mt-5 flex flex-col gap-2 border-t border-line pt-4">
          <div className="flex gap-2">
            <WhatsAppButton
              car={{ name: car.name, model: car.model, offerPrice: car.offerPrice }}
              number={car.whatsappNumber || undefined}
              disabled={!car.available}
              size="sm"
              className="flex-1"
            />
            {phone && (
              <a
                href={buildTelLink(phone)}
                aria-label={`Call about the ${car.name}`}
                className="btn-outline min-h-[40px] w-11 justify-center px-0"
              >
                <Phone className="h-4 w-4" />
              </a>
            )}
          </div>
          <Link
            href={`/cars/${car.id}`}
            className="text-center text-sm font-semibold text-navy-900 underline decoration-gold-500 decoration-2 underline-offset-4 hover:text-gold-600"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
