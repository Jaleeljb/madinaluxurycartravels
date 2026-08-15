import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";

// A single clean grotesque sans, used everywhere — headlines lean on
// weight (800/900) rather than a separate display face, in keeping with
// a flat, monochrome, Uber-style typographic system.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
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
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
