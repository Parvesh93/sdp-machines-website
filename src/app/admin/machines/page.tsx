import Link from "next/link";

import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { prisma } from "@/lib/db/prisma";

const primaryButtonClass = "inline-flex min-h-10 items-center justify-center rounded-[5px] bg-[#161616] px-4 text-[13px] font-semibold text-white transition-colors hover:bg-[#f36b21] hover:text-[#111111] disabled:cursor-wait disabled:opacity-60";

const statusClasses = {
  DRAFT: "bg-[#ededeb] text-[#6a6a6a]",
  PUBLISHED: "bg-[#e6f3e8] text-[#296436]",
  ARCHIVED: "bg-[#f4e8e8] text-[#7e3939]",
} as const;

export default async function MachinesPage() {
  const machines = await prisma.machine.findMany({
    include: {
      category: true,
      models: { select: { id: true } },
    },
    orderBy: [
      { sortOrder: "asc" },
      { name: "asc" },
    ],
  });

  return (
    <>
      <AdminPageHeader
        eyebrow="Catalogue"
        title="Machines"
        description="Manage machine families, models, specifications and website content."
        actions={
          <Link href="/admin/machines/new" className={primaryButtonClass}>
            Add machine
          </Link>
        }
      />

      <section className="overflow-hidden rounded-lg border border-[#e1e1dd] bg-white">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr>
                {["Machine","Category","Models","Status","Featured","Updated"].map((label) => (
                  <th key={label} className="whitespace-nowrap border-b border-[#e6e6e2] bg-[#f8f8f6] px-[18px] py-[13px] text-left text-[10px] font-bold uppercase tracking-[0.08em] text-[#7a7a7a]">{label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {machines.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-[70px] text-center text-[#919191]">
                    No machines have been added yet.
                  </td>
                </tr>
              ) : (
                machines.map((machine) => (
                  <tr key={machine.id} className="group">
                    <td className="border-b border-[#ededeb] px-[18px] py-[17px] align-middle text-[13px] text-[#444444]">
                      <Link
                        href={`/admin/machines/${machine.id}`}
                        className="block font-semibold text-[#161616] transition-colors hover:text-[#f36b21]"
                      >
                        {machine.name}
                      </Link>
                      <span className="mt-1 block text-[11px] text-[#999999]">
                        /machines/{machine.slug}
                      </span>
                    </td>
                    <td className="border-b border-[#ededeb] px-[18px] py-[17px] align-middle text-[13px] text-[#444444]">{machine.category.name}</td>
                    <td className="border-b border-[#ededeb] px-[18px] py-[17px] align-middle text-[13px] text-[#444444]">{machine.models.length}</td>
                    <td className="border-b border-[#ededeb] px-[18px] py-[17px] align-middle text-[13px] text-[#444444]">
                      <span className={`inline-flex min-h-6 items-center rounded-full px-2 text-[10px] font-bold tracking-[0.04em] ${statusClasses[machine.status]}`}>
                        {machine.status}
                      </span>
                    </td>
                    <td className="border-b border-[#ededeb] px-[18px] py-[17px] align-middle text-[13px] text-[#444444]">{machine.featured ? "Yes" : "No"}</td>
                    <td className="border-b border-[#ededeb] px-[18px] py-[17px] align-middle text-[13px] text-[#444444]">
                      {machine.updatedAt.toLocaleDateString("en-IN")}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
