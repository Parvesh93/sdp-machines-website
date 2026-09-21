"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { auth } from "../../../auth";
import { prisma } from "@/lib/db/prisma";
import { machineModelSchema } from "@/lib/validation/machine-model";

export type CreateMachineModelState = {
  error?: string;

  fieldErrors?: {
    name?: string[];
    modelNumber?: string[];
    slug?: string[];
    shortDescription?: string[];
    active?: string[];
    sortOrder?: string[];
  };
};

export async function createMachineModel(
  previousState: CreateMachineModelState,
  formData: FormData,
): Promise<CreateMachineModelState> {
  const session = await auth();

  if (!session?.user) {
    return {
      error: "You are not authorized.",
    };
  }

  const parsed =
    machineModelSchema.safeParse({
      machineId:
        formData.get("machineId"),

      name:
        formData.get("name"),

      modelNumber:
        formData.get("modelNumber"),

      slug:
        formData.get("slug"),

      shortDescription:
        formData.get("shortDescription") ||
        undefined,

      active:
        formData.get("active") === "on",

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

  const machine =
    await prisma.machine.findUnique({
      where: {
        id: parsed.data.machineId,
      },

      select: {
        id: true,
      },
    });

  if (!machine) {
    return {
      error: "Machine not found.",
    };
  }

  const duplicate =
    await prisma.machineModel.findFirst({
      where: {
        machineId:
          parsed.data.machineId,

        OR: [
          {
            slug:
              parsed.data.slug,
          },
          {
            modelNumber:
              parsed.data.modelNumber,
          },
        ],
      },
    });

  if (duplicate) {
    if (
      duplicate.modelNumber ===
      parsed.data.modelNumber
    ) {
      return {
        fieldErrors: {
          modelNumber: [
            "This model number already exists for this machine.",
          ],
        },
      };
    }

    return {
      fieldErrors: {
        slug: [
          "This slug already exists for this machine.",
        ],
      },
    };
  }

  const model =
    await prisma.machineModel.create({
      data: parsed.data,
    });

  revalidatePath(
    `/admin/machines/${parsed.data.machineId}/models`,
  );

  redirect(
    `/admin/machines/${parsed.data.machineId}/models/${model.id}`,
  );
}