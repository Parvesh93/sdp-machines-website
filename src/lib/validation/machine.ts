import { z } from "zod";

export const machineSchema = z.object({
  categoryId: z
    .string()
    .min(1, "Please select a category."),

  name: z
    .string()
    .trim()
    .min(2, "Machine name is required.")
    .max(150),

  slug: z
    .string()
    .trim()
    .min(2, "Slug is required.")
    .max(160)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Use lowercase letters, numbers and hyphens only.",
    ),

  eyebrow: z
    .string()
    .trim()
    .max(100)
    .optional(),

  headline: z
    .string()
    .trim()
    .max(200)
    .optional(),

  summary: z
    .string()
    .trim()
    .max(1000)
    .optional(),

  status: z.enum([
    "DRAFT",
    "PUBLISHED",
    "ARCHIVED",
  ]),

  featured: z.boolean(),

  sortOrder: z
    .number()
    .int()
    .min(0),
});

export const updateMachineSchema =
  machineSchema.extend({
    id: z.string().min(1),
  });

export type MachineInput =
  z.infer<typeof machineSchema>;

export type UpdateMachineInput =
  z.infer<typeof updateMachineSchema>;