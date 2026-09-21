"use server";

import { revalidatePath } from "next/cache";

import { auth } from "../../../auth";
import { prisma } from "@/lib/db/prisma";
import { machineSpecificationSchema } from "@/lib/validation/machine-specification";

export type CreateMachineSpecificationState = {
  success?: boolean;
  error?: string;

  fieldErrors?: {
    groupName?: string[];
    label?: string[];
    value?: string[];
    unit?: string[];
    sortOrder?: string[];
  };
};

export async function createMachineSpecification(
  previousState: CreateMachineSpecificationState,
  formData: FormData,
): Promise<CreateMachineSpecificationState> {
  try {
    const session = await auth();

    if (!session?.user) {
      return {
        error: "You are not authorized.",
      };
    }

    const parsed =
      machineSpecificationSchema.safeParse({
        machineId: String(
          formData.get("machineId") ?? "",
        ),

        machineModelId: String(
          formData.get("machineModelId") ?? "",
        ),

        groupName:
          String(
            formData.get("groupName") ?? "",
          ).trim() || undefined,

        label: String(
          formData.get("label") ?? "",
        ).trim(),

        value: String(
          formData.get("value") ?? "",
        ).trim(),

        unit:
          String(
            formData.get("unit") ?? "",
          ).trim() || undefined,

        sortOrder: Number(
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

    const {
      machineId,
      machineModelId,
      groupName,
      label,
      value,
      unit,
      sortOrder,
    } = parsed.data;

    const model =
      await prisma.machineModel.findFirst({
        where: {
          id: machineModelId,
          machineId,
        },

        select: {
          id: true,
          machineId: true,
        },
      });

    if (!model) {
      return {
        error:
          "This machine model could not be found.",
      };
    }

    await prisma.machineSpecification.create({
      data: {
        machineModelId,
        groupName: groupName ?? null,
        label,
        value,
        unit: unit ?? null,
        sortOrder,
      },
    });

    revalidatePath(
      `/admin/machines/${machineId}/models/${machineModelId}`,
    );

    revalidatePath(
      `/admin/machines/${machineId}/models`,
    );

    return {
      success: true,
    };
  } catch (error) {
    console.error(
      "CREATE SPECIFICATION ERROR:",
      error,
    );

    return {
      error:
        error instanceof Error
          ? error.message
          : "Unable to add specification.",
    };
  }
}