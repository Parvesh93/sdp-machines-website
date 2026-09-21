"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { auth } from "../../../auth";
import { prisma } from "@/lib/db/prisma";
import { machineSchema } from "@/lib/validation/machine";

export type CreateMachineState = {
  error?: string;

  fieldErrors?: {
    categoryId?: string[];
    name?: string[];
    slug?: string[];
    eyebrow?: string[];
    headline?: string[];
    summary?: string[];
    status?: string[];
    featured?: string[];
    sortOrder?: string[];
  };
};

export async function createMachine(
  previousState: CreateMachineState,
  formData: FormData,
): Promise<CreateMachineState> {
  const session = await auth();

  if (!session?.user) {
    return {
      error: "You are not authorized.",
    };
  }

  const parsed = machineSchema.safeParse({
    categoryId:
      formData.get("categoryId"),

    name:
      formData.get("name"),

    slug:
      formData.get("slug"),

    eyebrow:
      formData.get("eyebrow") || undefined,

    headline:
      formData.get("headline") || undefined,

    summary:
      formData.get("summary") || undefined,

    status:
      formData.get("status"),

    featured:
      formData.get("featured") === "on",

    sortOrder:
      Number(
        formData.get("sortOrder") ?? 0,
      ),
  });

  if (!parsed.success) {
    return {
      fieldErrors:
        parsed.error.flatten()
          .fieldErrors,
    };
  }

  const existingMachine =
    await prisma.machine.findUnique({
      where: {
        slug: parsed.data.slug,
      },
    });

  if (existingMachine) {
    return {
      fieldErrors: {
        slug: [
          "A machine with this slug already exists.",
        ],
      },
    };
  }

  const machine =
    await prisma.machine.create({
      data: parsed.data,
    });

revalidatePath("/admin/machines");

redirect(
  `/admin/machines/${machine.id}`,
);
}