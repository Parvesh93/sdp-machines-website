import Link from "next/link";
import { notFound } from "next/navigation";

import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { MachineModelForm } from "@/components/admin/machines/machine-model-form";
import { prisma } from "@/lib/db/prisma";

type NewModelPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function NewModelPage({
  params,
}: NewModelPageProps) {
  const { id } = await params;

  const machine =
    await prisma.machine.findUnique({
      where: {
        id,
      },

      select: {
        id: true,
        name: true,
      },
    });

  if (!machine) {
    notFound();
  }

  return (
    <>
      <AdminPageHeader
        eyebrow="Machine model"
        title="Add model"
        description={`Add a new model under ${machine.name}.`}
        actions={
          <Link
            href={`/admin/machines/${machine.id}/models`}
            className="admin-secondary-button"
          >
            Back to models
          </Link>
        }
      />

      <MachineModelForm
        machineId={machine.id}
      />
    </>
  );
}