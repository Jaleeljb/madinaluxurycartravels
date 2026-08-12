import { formatINR } from "@/lib/utils";
import { siteConfig } from "@/lib/config";

type WhatsAppCarInfo = {
  name: string;
  model: string;
  offerPrice: number;
};

/**
 * Builds an official WhatsApp click-to-chat URL
 * (https://wa.me/<number>?text=<encoded message>) pre-filled with a booking
 * enquiry for the given car. Falls back to a generic enquiry if no car is
 * passed (used by header/footer "Book Now" buttons).
 */
export function buildWhatsAppLink(car?: WhatsAppCarInfo, number = siteConfig.whatsappNumber) {
  const lines = car
    ? [
        `Hello ${siteConfig.businessName},`,
        `I am interested in booking the ${car.name} ${car.model}.`.trim(),
        `Offer Price: ${formatINR(car.offerPrice)}.`,
        "Please share availability and booking details.",
      ]
    : [
        `Hello ${siteConfig.businessName},`,
        "I'd like to enquire about booking a car.",
        "Please share availability and pricing.",
      ];

  const message = lines.join("\n");
  const cleanNumber = number.replace(/[^\d]/g, "");
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

export function buildTelLink(number = siteConfig.phoneNumber) {
  return `tel:${number.replace(/[^\d+]/g, "")}`;
}
