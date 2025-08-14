import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Enter a valid email"),
  phone: z
    .string()
    .min(7, "Enter a valid phone")
    .transform((v) => v.replace(/[^0-9]/g, "")),
  zip: z.string().regex(/^\d{5}$/g, "Enter a 5-digit ZIP code"),
  interests: z.array(z.string()).min(1, "Choose at least one interest"),
  message: z.string().max(2000).optional().default(""),
  consent: z.literal(true, { message: "Please agree to proceed" as any }),
  // Anti-spam
  honey: z.string().max(0).optional().default(""),
  ttfb: z.number().min(300, "Please wait a moment before submitting"),
  // Attribution
  source: z.string().optional().default(""),
});

export type ContactPayload = z.infer<typeof contactSchema>;


