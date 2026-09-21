import { z } from "zod";

export const machineSpecificationSchema =
  z.object({
    machineId: z
      .string()
      .min(1),

    machineModelId: z
      .string()
      .min(1),

    groupName: z
      .string()
      .trim()
      .max(100)
      .optional(),

    label: z
      .string()
      .trim()
      .min(
        1,
        "Specification name is required.",
      )
      .max(150),

    value: z
      .string()
      .trim()
      .min(
        1,
        "Specification value is required.",
      )
      .max(150),

    unit: z
      .string()
      .trim()
      .max(50)
      .optional(),

    sortOrder: z
      .number()
      .int()
      .min(0),
  });