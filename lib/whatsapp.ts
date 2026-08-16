import type { Car } from "./types";
import { daysBetweenInclusive, formatDate, type DateRange } from "./dates";

export function waLink(number: string, message: string): string {
  const digits = number.replace(/[^0-9]/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function bookingMessage(car: Car, dateRange?: DateRange | null): string {
  let dateLine = `Pickup date: `;
  if (dateRange) {
    if (dateRange.start === dateRange.end) {
      dateLine = `Date: ${formatDate(dateRange.start)}`;
    } else {
      const nights = daysBetweenInclusive(dateRange.start, dateRange.end);
      dateLine = `Dates: ${formatDate(dateRange.start)} \u2013 ${formatDate(dateRange.end)} (${nights} day${nights === 1 ? "" : "s"})`;
    }
  }

  return [
    `Hi, I'd like to book a vehicle from Madina Travels.`,
    ``,
    `Car: ${car.name} (${car.category})`,
    `Rate: ${car.currency}${car.pricePerDay.toLocaleString("en-IN")}/day`,
    dateLine,
    `Pickup location: `,
    `Trip: `,
    ``,
    `Please confirm availability.`,
  ].join("\n");
}

export function generalEnquiryMessage(): string {
  return `Hi, I'd like to enquire about your car rental fleet in Narasaraopet.`;
}
