import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge conditional class names and resolve Tailwind conflicts. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a whole-rupee amount as an Indian-locale currency string, e.g. ₹3,999. */
export function formatINR(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Percentage saved between an original and offer price, rounded to the nearest whole number. */
export function discountPercent(original: number, offer: number) {
  if (!original || original <= offer) return 0;
  return Math.round(((original - offer) / original) * 100);
}

/** Turn "Toyota Innova Crysta" into a URL-safe slug fragment, kept alongside the numeric id. */
export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
