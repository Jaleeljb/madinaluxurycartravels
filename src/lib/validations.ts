import { z } from "zod";
import { CAR_CATEGORIES } from "@/lib/config";

export const carInputSchema = z
  .object({
    name: z.string().trim().min(2, "Car name is required.").max(120),
    model: z.string().trim().min(1, "Model is required.").max(120),
    category: z.enum(CAR_CATEGORIES, {
      errorMap: () => ({ message: "Choose a valid category." }),
    }),
    description: z.string().trim().max(2000).default(""),
    specifications: z.array(z.string().trim().min(1)).max(20).default([]),
    images: z.array(z.string().url("Each image must be a valid URL.")).max(8).default([]),
    originalPrice: z.coerce.number().int().positive("Enter a valid original price."),
    offerPrice: z.coerce.number().int().positive("Enter a valid offer price."),
    available: z.boolean().default(true),
    phoneNumber: z
      .string()
      .trim()
      .max(20)
      .regex(/^$|^[\d+\-\s()]{7,20}$/, "Enter a valid phone number.")
      .default(""),
    whatsappNumber: z
      .string()
      .trim()
      .max(20)
      .regex(/^$|^[\d]{10,15}$/, "WhatsApp number should be digits only, e.g. 91XXXXXXXXXX.")
      .default(""),
  })
  .refine((data) => data.offerPrice <= data.originalPrice, {
    message: "Offer price cannot be higher than the original price.",
    path: ["offerPrice"],
  })
  .refine((data) => data.images.length >= 1, {
    message: "Add at least one image.",
    path: ["images"],
  });

export type CarInput = z.infer<typeof carInputSchema>;

export const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
  password: z.string().min(1, "Password is required."),
});
