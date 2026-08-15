import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans, Space_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";

// Editorial serif with real character (soft, high-contrast, great italics) —
// used for headlines instead of the ubiquitous Playfair Display.
const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

// Warm, rounded humanist sans for body copy — friendlier and less generic
// than Inter while staying just as readable.
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Ticket/boarding-pass mono for eyebrows, prices and labels — leans into the
// perforated "ticket stub" motif already used across the booking cards.
const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Madina Travels | Car Rentals & Outstation Travel in Narasaraopet",
  description:
    "Book sedans, SUVs and group vans for local trips, outstation travel and airport transfers in Narasaraopet, Andhra Pradesh — reserve instantly over WhatsApp.",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${jakarta.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
