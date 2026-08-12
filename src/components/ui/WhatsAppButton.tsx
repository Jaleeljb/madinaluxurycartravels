"use client";

import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

type WhatsAppButtonProps = {
  car?: { name: string; model: string; offerPrice: number };
  number?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
  size?: "sm" | "md";
};

export function WhatsAppButton({
  car,
  number,
  label = "Book on WhatsApp",
  disabled = false,
  className,
  size = "md",
}: WhatsAppButtonProps) {
  const effectiveNumber = number || siteConfig.whatsappNumber;
  const notConfigured = !effectiveNumber;

  if (disabled) {
    return (
      <button
        type="button"
        disabled
        aria-disabled="true"
        title="This vehicle is currently unavailable"
        className={cn(
          "btn cursor-not-allowed bg-navy-900/[0.06] text-ink-muted",
          size === "sm" && "min-h-[40px] px-4 text-xs",
          className
        )}
      >
        <WhatsAppIcon className="h-4 w-4 opacity-50" />
        Currently Unavailable
      </button>
    );
  }

  if (notConfigured) {
    return (
      <button
        type="button"
        disabled
        aria-disabled="true"
        title="WhatsApp booking isn't configured yet — add NEXT_PUBLIC_WHATSAPP_NUMBER"
        className={cn(
          "btn cursor-not-allowed bg-navy-900/[0.06] text-ink-muted",
          size === "sm" && "min-h-[40px] px-4 text-xs",
          className
        )}
      >
        <WhatsAppIcon className="h-4 w-4 opacity-50" />
        WhatsApp Not Configured
      </button>
    );
  }

  return (
    <a
      href={buildWhatsAppLink(car, effectiveNumber)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("btn-whatsapp", size === "sm" && "min-h-[40px] px-4 text-xs", className)}
      aria-label={car ? `Book the ${car.name} on WhatsApp` : "Book on WhatsApp"}
    >
      <WhatsAppIcon className="h-4 w-4" />
      {label}
    </a>
  );
}
