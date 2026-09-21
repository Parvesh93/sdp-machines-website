import { z } from "zod";

export const machineModelSchema = z.object({
  machineId: z
    .string()
    .min(1),

  name: z
    .string()
    .trim()
    .min(1, "Model name is required.")
    .max(120),

  modelNumber: z
    .string()
    .trim()
    .min(1, "Model number is required.")
    .max(120),

  slug: z
    .string()
    .trim()
    .min(1, "Slug is required.")
    .max(150)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Use lowercase letters, numbers and hyphens only.",
    ),

  shortDescription: z
    .string()
    .trim()
    .max(1000)
    .optional(),

  active: z.boolean(),

  sortOrder: z
    .number()
    .int()
    .min(0),
});

export type MachineModelInput =
  z.infer<typeof machineModelSchema>;