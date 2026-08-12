import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { cars, type NewCar } from "@/lib/db/schema";

/**
 * Seeds a handful of clearly-marked demo vehicles (isDemo: true) so the site
 * looks complete on first launch. None of this is real inventory, pricing,
 * or contact data — replace it from /admin/cars before going live.
 *
 * Run with: npm run db:seed
 */

const SEDAN_1 =
  "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1200&auto=format&fit=crop";
const SEDAN_2 =
  "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=1200&auto=format&fit=crop";
const SEDAN_3 =
  "https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=1200&auto=format&fit=crop";
const SUV_1 =
  "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=1200&auto=format&fit=crop";
const SUV_2 =
  "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1200&auto=format&fit=crop";
const SUV_3 =
  "https://images.unsplash.com/photo-1583267746897-2cf415887172?q=80&w=1200&auto=format&fit=crop";
const TEMPO_1 =
  "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=1200&auto=format&fit=crop";
const TEMPO_2 =
  "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=1200&auto=format&fit=crop";
const TUFAAN_1 =
  "https://images.unsplash.com/photo-1600661653561-629509216228?q=80&w=1200&auto=format&fit=crop";
const TUFAAN_2 =
  "https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=1200&auto=format&fit=crop";

const demoCars: NewCar[] = [
  {
    name: "Swift Dzire",
    model: "Maruti Suzuki · Sedan",
    category: "Sedan",
    description:
      "A comfortable, fuel-efficient sedan ideal for city rides and airport drop-offs.",
    specifications: ["4 seater", "AC", "Manual", "Air-conditioned", "Music system"],
    images: [SEDAN_1, SEDAN_3],
    originalPrice: 2500,
    offerPrice: 2199,
    available: true,
    phoneNumber: "",
    whatsappNumber: "",
    isDemo: true,
  },
  {
    name: "Honda Amaze",
    model: "Honda · Sedan",
    category: "Sedan",
    description: "A refined, quiet ride with generous legroom — well suited to longer city trips.",
    specifications: ["4 seater", "AC", "Automatic", "Reverse camera"],
    images: [SEDAN_2, SEDAN_1],
    originalPrice: 2800,
    offerPrice: 2800,
    available: true,
    phoneNumber: "",
    whatsappNumber: "",
    isDemo: true,
  },
  {
    name: "Toyota Innova Crysta",
    model: "Toyota · SUV",
    category: "SUV",
    description:
      "Spacious 7-seater SUV with a smooth ride — a favourite for family trips and outstation travel.",
    specifications: ["7 seater", "AC", "Diesel", "Automatic", "Ample luggage space"],
    images: [SUV_1, SUV_3],
    originalPrice: 4500,
    offerPrice: 3999,
    available: true,
    phoneNumber: "",
    whatsappNumber: "",
    isDemo: true,
  },
  {
    name: "Mahindra XUV700",
    model: "Mahindra · SUV",
    category: "SUV",
    description: "A bold, feature-rich SUV for a premium outstation experience.",
    specifications: ["7 seater", "AC", "Sunroof", "Automatic", "ADAS"],
    images: [SUV_2, SUV_1],
    originalPrice: 5200,
    offerPrice: 4599,
    available: false,
    phoneNumber: "",
    whatsappNumber: "",
    isDemo: true,
  },
  {
    name: "Tempo Traveller",
    model: "Force · 12-Seater",
    category: "Tempo",
    description: "Roomy group transport for larger families, pilgrimages and corporate outings.",
    specifications: ["12 seater", "AC", "Pushback seats", "Ample luggage carrier"],
    images: [TEMPO_1, TEMPO_2],
    originalPrice: 7500,
    offerPrice: 6999,
    available: true,
    phoneNumber: "",
    whatsappNumber: "",
    isDemo: true,
  },
  {
    name: "Tufaan Deluxe",
    model: "Force Tufaan",
    category: "Tufaan",
    description: "A dependable, rugged Tufaan built for longer routes and varied road conditions.",
    specifications: ["6 seater", "AC", "Diesel", "High ground clearance"],
    images: [TUFAAN_1, TUFAAN_2],
    originalPrice: 4200,
    offerPrice: 3799,
    available: true,
    phoneNumber: "",
    whatsappNumber: "",
    isDemo: true,
  },
];

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set. Add it to .env.local before seeding.");
  }

  const needsSsl = !/localhost|127\.0\.0\.1/.test(connectionString);
  const client = postgres(connectionString, { max: 1, ssl: needsSsl ? "require" : false });
  const db = drizzle(client);

  console.log(`Seeding ${demoCars.length} demo cars...`);
  await db.insert(cars).values(demoCars);
  console.log("Done. These are demo records — replace them from /admin/cars.");

  await client.end();
}

main().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
