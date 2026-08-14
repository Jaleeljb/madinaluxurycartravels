import type { Car } from "./types";

export function waLink(number: string, message: string): string {
  const digits = number.replace(/[^0-9]/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function bookingMessage(car: Car): string {
  return [
    `Assalamu alaikum, I'd like to book a vehicle from Madina Luxury Car Travels.`,
    ``,
    `Car: ${car.name} (${car.category})`,
    `Rate: ${car.currency} ${car.pricePerDay}/day`,
    `Pickup date: `,
    `Pickup location: `,
    `Trip: `,
    ``,
    `Please confirm availability.`,
  ].join("\n");
}

export function generalEnquiryMessage(): string {
  return `Assalamu alaikum, I'd like to enquire about your car rental fleet in Madina.`;
}
