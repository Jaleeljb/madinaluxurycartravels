/**
 * Central, editable business configuration.
 *
 * Everything here is sourced from environment variables so the owner can
 * rebrand contact details, the WhatsApp number, and the live site URL
 * without touching any component code. See .env.example / README.md.
 */

export const siteConfig = {
  businessName: "Madina Luxury Car Travels",
  tagline: "Your Journey, Our Luxury.",
  headline: "Travel in Comfort. Arrive in Luxury.",
  subheadline:
    "Chauffeur-driven cars for every journey — airport runs, outstation trips and everyday travel, booked in a single WhatsApp message.",

  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, ""),

  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
  phoneNumber: process.env.NEXT_PUBLIC_PHONE_NUMBER || "",
  email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL || "",
  address: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS || "",
  hours: process.env.NEXT_PUBLIC_BUSINESS_HOURS || "",
  mapsUrl: process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL || "",
} as const;

export const CAR_CATEGORIES = ["Sedan", "SUV", "Tempo", "Tufaan"] as const;
export type CarCategory = (typeof CAR_CATEGORIES)[number];

/**
 * Indicative, editable price ranges shown on the category cards. These are
 * placeholders, not quoted prices — replace them any time from
 * /admin/settings once real fleet pricing is finalised.
 */
export const CATEGORY_INFO: Record<
  CarCategory,
  { description: string; priceRange: string; image: string }
> = {
  Sedan: {
    description: "Smooth, fuel-efficient rides for city trips and airport transfers.",
    priceRange: "₹1,800 – ₹3,000 / day (indicative)",
    image:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1200&auto=format&fit=crop",
  },
  SUV: {
    description: "Extra space and comfort for families and longer outstation drives.",
    priceRange: "₹3,000 – ₹5,500 / day (indicative)",
    image:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=1200&auto=format&fit=crop",
  },
  Tempo: {
    description: "Group and luggage-friendly Tempo Travellers for larger parties.",
    priceRange: "₹5,500 – ₹9,000 / day (indicative)",
    image:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1200&auto=format&fit=crop",
  },
  Tufaan: {
    description: "Rugged, dependable Tufaan vehicles built for tougher routes.",
    priceRange: "₹3,200 – ₹5,800 / day (indicative)",
    image:
      "https://images.unsplash.com/photo-1600661653561-629509216228?q=80&w=1200&auto=format&fit=crop",
  },
};
