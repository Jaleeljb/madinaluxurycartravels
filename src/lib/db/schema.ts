import {
  pgTable,
  serial,
  text,
  varchar,
  integer,
  boolean,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";

/**
 * A single vehicle in the fleet. This is the one source of truth consumed
 * by both the public "Our Fleet" section and the admin "Manage Cars" screen.
 */
export const cars = pgTable("cars", {
  id: serial("id").primaryKey(),

  name: varchar("name", { length: 120 }).notNull(),
  model: varchar("model", { length: 120 }).notNull(),
  category: varchar("category", { length: 40 }).notNull(), // Sedan | SUV | Tempo | Tufaan
  description: text("description").notNull().default(""),

  // Free-text specification lines, e.g. ["5 seater", "Automatic", "AC"]
  specifications: jsonb("specifications").$type<string[]>().notNull().default([]),

  // Image URLs (first image is the card/cover image).
  images: jsonb("images").$type<string[]>().notNull().default([]),

  originalPrice: integer("original_price").notNull(),
  offerPrice: integer("offer_price").notNull(),

  available: boolean("available").notNull().default(true),

  // Per-car overrides. Empty string = fall back to the global business number.
  phoneNumber: varchar("phone_number", { length: 32 }).notNull().default(""),
  whatsappNumber: varchar("whatsapp_number", { length: 32 }).notNull().default(""),

  isDemo: boolean("is_demo").notNull().default(false),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type Car = typeof cars.$inferSelect;
export type NewCar = typeof cars.$inferInsert;
