import Link from "next/link";
import { notFound } from "next/navigation";

import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { MachineOverviewForm } from "@/components/admin/machines/machine-overview-form";
import { prisma } from "@/lib/db/prisma";

type MachinePageProps = {
  params: Promise<{
    id: string;
  }>;
};

const tabs = [
  {
    label: "Overview",
    href: "",
  },
  {
    label: "Models",
    href: "/models",
  },
  {
    label: "Features & 3D",
    href: "/features",
  },
  {
    label: "Media",
    href: "/media",
  },
  {
    label: "Related Machines",
    href: "/related",
  },
  {
    label: "SEO",
    href: "/seo",
  },
];

export default async function MachinePage({
  params,
}: MachinePageProps) {
  const { id } = await params;

  const [machine, categories] =
    await Promise.all([
      prisma.machine.findUnique({
        where: {
          id,
        },

        include: {
          category: true,

          models: {
            select: {
              id: true,
            },
          },
        },
      }),

      prisma.machineCategory.findMany({
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
      }),
    ]);

  if (!machine) {
    notFound();
  }

  return (
    <>
      <AdminPageHeader
        eyebrow="Machine"
        title={machine.name}
        description={`Manage ${machine.name} content, models and interactive machine data.`}
        actions={
          <div className="flex items-start gap-2.5">
            <Link
              href="/admin/machines"
              className="inline-flex min-h-10 items-center justify-center rounded-[5px] border border-[#d6d6d1] bg-white px-4 text-[13px] font-semibold text-[#333333] transition-colors hover:border-[#aaaaa5]"
            >
              Back
            </Link>

            <Link
              href={`/machines/${machine.slug}`}
              target="_blank"
              className="inline-flex min-h-10 items-center justify-center rounded-[5px] border border-[#d6d6d1] bg-white px-4 text-[13px] font-semibold text-[#333333] transition-colors hover:border-[#aaaaa5]"
            >
              View page
            </Link>
          </div>
        }
      />

      <nav
        className="mb-[18px] flex gap-1 overflow-x-auto rounded-[7px] bg-[#eaeae6] p-1"
        aria-label="Machine workspace"
      >
        {tabs.map((tab) => {
          const href =
            `/admin/machines/${machine.id}${tab.href}`;

          return (
            <Link
              key={tab.label}
              href={href}
              className={
                tab.label === "Overview"
                  ? "inline-flex min-h-9 shrink-0 items-center rounded-[5px] bg-white px-[13px] text-[12px] font-semibold text-[#161616] shadow-[0_1px_2px_rgba(0,0,0,0.06)]"
                  : "inline-flex min-h-9 shrink-0 items-center rounded-[5px] px-[13px] text-[12px] font-semibold text-[#6f6f6f] transition-colors hover:text-[#161616]"
              }
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>

      <section className="mb-[18px] grid grid-cols-1 overflow-hidden rounded-lg border border-[#e1e1dd] bg-white sm:grid-cols-2 lg:grid-cols-4">
        <div className="min-w-0 border-b border-[#ededeb] p-[18px_20px] sm:border-r lg:border-b-0 last:border-r-0">
          <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.08em] text-[#8a8a8a]">
            Category
          </span>

          <strong className="block overflow-hidden text-ellipsis whitespace-nowrap text-[13px] text-[#252525]">
            {machine.category.name}
          </strong>
        </div>

        <div className="min-w-0 border-b border-[#ededeb] p-[18px_20px] sm:border-r lg:border-b-0 last:border-r-0">
          <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.08em] text-[#8a8a8a]">
            Models
          </span>

          <strong className="block overflow-hidden text-ellipsis whitespace-nowrap text-[13px] text-[#252525]">
            {machine.models.length}
          </strong>
        </div>

        <div className="min-w-0 border-b border-[#ededeb] p-[18px_20px] sm:border-r lg:border-b-0 last:border-r-0">
          <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.08em] text-[#8a8a8a]">
            Status
          </span>

          <strong className="block overflow-hidden text-ellipsis whitespace-nowrap text-[13px] text-[#252525]">
            {machine.status}
          </strong>
        </div>

        <div className="min-w-0 border-b border-[#ededeb] p-[18px_20px] sm:border-r lg:border-b-0 last:border-r-0">
          <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.08em] text-[#8a8a8a]">
            URL
          </span>

          <strong className="block overflow-hidden text-ellipsis whitespace-nowrap text-[13px] text-[#252525]">
            /machines/{machine.slug}
          </strong>
        </div>
      </section>

      <MachineOverviewForm
        machine={{
          id: machine.id,

          categoryId:
            machine.categoryId,

          name:
            machine.name,

          slug:
            machine.slug,

          eyebrow:
            machine.eyebrow,

          headline:
            machine.headline,

          summary:
            machine.summary,

          status:
            machine.status,

          featured:
            machine.featured,

          sortOrder:
            machine.sortOrder,
        }}
        categories={categories}
      />
    </>
  );
}