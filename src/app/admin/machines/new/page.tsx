import Link from "next/link";

import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { MachineForm } from "@/components/admin/machines/machine-form";
import { prisma } from "@/lib/db/prisma";

export default async function NewMachinePage() {
  const categories =
    await prisma.machineCategory.findMany({
      where: {
        active: true,
      },

      orderBy: {
        sortOrder: "asc",
      },

      select: {
        id: true,
        name: true,
      },
    });

  return (
    <>
      <AdminPageHeader
        eyebrow="Catalogue"
        title="Add machine"
        description="Create a new machine for the SDP Machines catalogue."
        actions={
          <Link
            href="/admin/machines"
            className="admin-secondary-button"
          >
            Back to machines
          </Link>
        }
      />

      <MachineForm
        categories={categories}
      />
    </>
  );
}