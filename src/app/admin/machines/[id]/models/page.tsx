import Link from "next/link";
import { notFound } from "next/navigation";

import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { prisma } from "@/lib/db/prisma";

type ModelsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const tabs = [
  { label: "Overview", href: "" },
  { label: "Models", href: "/models" },
  { label: "Features & 3D", href: "/features" },
  { label: "Media", href: "/media" },
  { label: "Related Machines", href: "/related" },
  { label: "SEO", href: "/seo" },
];

export default async function ModelsPage({
  params,
}: ModelsPageProps) {
  const { id } = await params;

  const machine = await prisma.machine.findUnique({
    where: {
      id,
    },

    include: {
      models: {
        orderBy: [
          {
            sortOrder: "asc",
          },
          {
            name: "asc",
          },
        ],
      },
    },
  });

  if (!machine) {
    notFound();
  }

  return (
    <>
      <AdminPageHeader
        eyebrow="Machine"
        title={machine.name}
        description="Manage models available under this machine family."
        actions={
          <Link
            href={`/admin/machines/${machine.id}/models/new`}
            className="inline-flex min-h-10 items-center justify-center rounded-[5px] bg-[#161616] px-4 text-[13px] font-semibold text-white transition-colors hover:bg-[#f36b21] hover:text-[#111111] disabled:cursor-wait disabled:opacity-60"
          >
            Add model
          </Link>
        }
      />

      <nav className="mb-[18px] flex gap-1 overflow-x-auto rounded-[7px] bg-[#eaeae6] p-1">
        {tabs.map((tab) => {
          const href =
            `/admin/machines/${machine.id}${tab.href}`;

          return (
            <Link
              key={tab.label}
              href={href}
              className={
                tab.label === "Models"
                  ? "inline-flex min-h-9 shrink-0 items-center rounded-[5px] bg-white px-[13px] text-[12px] font-semibold text-[#161616] shadow-[0_1px_2px_rgba(0,0,0,0.06)]"
                  : "inline-flex min-h-9 shrink-0 items-center rounded-[5px] px-[13px] text-[12px] font-semibold text-[#6f6f6f] transition-colors hover:text-[#161616]"
              }
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>

      <section className="overflow-hidden rounded-lg border border-[#e1e1dd] bg-white">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr>
                <th className="whitespace-nowrap border-b border-[#e6e6e2] bg-[#f8f8f6] px-[18px] py-[13px] text-left text-[10px] font-bold uppercase tracking-[0.08em] text-[#7a7a7a]">Model</th>
                <th className="whitespace-nowrap border-b border-[#e6e6e2] bg-[#f8f8f6] px-[18px] py-[13px] text-left text-[10px] font-bold uppercase tracking-[0.08em] text-[#7a7a7a]">Model number</th>
                <th className="whitespace-nowrap border-b border-[#e6e6e2] bg-[#f8f8f6] px-[18px] py-[13px] text-left text-[10px] font-bold uppercase tracking-[0.08em] text-[#7a7a7a]">Slug</th>
                <th className="whitespace-nowrap border-b border-[#e6e6e2] bg-[#f8f8f6] px-[18px] py-[13px] text-left text-[10px] font-bold uppercase tracking-[0.08em] text-[#7a7a7a]">Status</th>
                <th className="whitespace-nowrap border-b border-[#e6e6e2] bg-[#f8f8f6] px-[18px] py-[13px] text-left text-[10px] font-bold uppercase tracking-[0.08em] text-[#7a7a7a]">Sort order</th>
                <th className="whitespace-nowrap border-b border-[#e6e6e2] bg-[#f8f8f6] px-[18px] py-[13px] text-left text-[10px] font-bold uppercase tracking-[0.08em] text-[#7a7a7a]">Updated</th>
              </tr>
            </thead>

            <tbody>
              {machine.models.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-[70px] text-center text-[#919191]"
                  >
                    No models added yet.
                  </td>
                </tr>
              ) : (
                machine.models.map((model) => (
                  <tr key={model.id}>
                    <td className="border-b border-[#ededeb] px-[18px] py-[17px] align-middle text-[13px] text-[#444444]">
                      <Link
                        href={`/admin/machines/${machine.id}/models/${model.id}`}
                        className="block font-semibold text-[#161616] transition-colors hover:text-[#f36b21]"
                      >
                        {model.name}
                      </Link>
                    </td>

                    <td className="border-b border-[#ededeb] px-[18px] py-[17px] align-middle text-[13px] text-[#444444]">
                      {model.modelNumber}
                    </td>

                    <td className="border-b border-[#ededeb] px-[18px] py-[17px] align-middle text-[13px] text-[#444444]">
                      {model.slug}
                    </td>

                    <td className="border-b border-[#ededeb] px-[18px] py-[17px] align-middle text-[13px] text-[#444444]">
                      {model.active
                        ? "Active"
                        : "Inactive"}
                    </td>

                    <td className="border-b border-[#ededeb] px-[18px] py-[17px] align-middle text-[13px] text-[#444444]">
                      {model.sortOrder}
                    </td>

                    <td className="border-b border-[#ededeb] px-[18px] py-[17px] align-middle text-[13px] text-[#444444]">
                      {model.updatedAt.toLocaleDateString(
                        "en-IN",
                      )}
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