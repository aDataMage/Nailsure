import { z } from "zod";

export const generalSchema = z.object({
    businessName: z.string().min(1, "Business name is required"),
    phone: z.string().min(1, "Phone number is required"),
    email: z.string().email("Invalid email address"),
    address: z.string().min(1, "Address is required"),
    instagram: z.string().url("Invalid URL").optional().or(z.literal("")),
    facebook: z.string().url("Invalid URL").optional().or(z.literal("")),
});

export const homeSchema = z.object({
    heroTitle: z.string().min(1, "Hero title is required"),
    heroSubtitle: z.string().min(1, "Hero subtitle is required"),
    aboutTeaserTitle: z.string().min(1, "About teaser title is required"),
    aboutTeaserText: z.string().min(1, "About teaser text is required"),
});

export const serviceSchema = z.object({
    id: z.string(),
    name: z.string().min(1, "Service name is required"),
    price: z.coerce.number().min(0, "Price must be positive"),
    duration: z.coerce.number().min(1, "Duration must be positive"),
    description: z.string().optional(),
});

export const contentSchema = z.object({
    general: generalSchema,
    home: homeSchema,
    services: z.array(serviceSchema),
});

export type ContentFormValues = z.infer<typeof contentSchema>;
