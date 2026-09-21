"use server";

import { revalidatePath } from "next/cache";

import { auth } from "../../../auth";
import { prisma } from "@/lib/db/prisma";
import { updateMachineSchema } from "@/lib/validation/machine";

export type UpdateMachineState = {
  success?: boolean;
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

export async function updateMachine(
  previousState: UpdateMachineState,
  formData: FormData,
): Promise<UpdateMachineState> {
  const session = await auth();

  if (!session?.user) {
    return {
      error: "You are not authorized.",
    };
  }

  const parsed =
    updateMachineSchema.safeParse({
      id: formData.get("id"),

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
        parsed.error.flatten().fieldErrors,
    };
  }

  const existingSlug =
    await prisma.machine.findFirst({
      where: {
        slug: parsed.data.slug,

        NOT: {
          id: parsed.data.id,
        },
      },
    });

  if (existingSlug) {
    return {
      fieldErrors: {
        slug: [
          "Another machine already uses this slug.",
        ],
      },
    };
  }

  await prisma.machine.update({
    where: {
      id: parsed.data.id,
    },

    data: {
      categoryId:
        parsed.data.categoryId,

      name:
        parsed.data.name,

      slug:
        parsed.data.slug,

      eyebrow:
        parsed.data.eyebrow,

      headline:
        parsed.data.headline,

      summary:
        parsed.data.summary,

      status:
        parsed.data.status,

      featured:
        parsed.data.featured,

      sortOrder:
        parsed.data.sortOrder,
    },
  });

  revalidatePath(
    `/admin/machines/${parsed.data.id}`,
  );

  revalidatePath("/admin/machines");

  return {
    success: true,
  };
}