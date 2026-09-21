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
          <div className="admin-page-actions">
            <Link
              href="/admin/machines"
              className="admin-secondary-button"
            >
              Back
            </Link>

            <Link
              href={`/machines/${machine.slug}`}
              target="_blank"
              className="admin-secondary-button"
            >
              View page
            </Link>
          </div>
        }
      />

      <nav
        className="admin-workspace-tabs"
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
                  ? "admin-workspace-tab admin-workspace-tab-active"
                  : "admin-workspace-tab"
              }
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>

      <section className="admin-machine-summary">
        <div>
          <span>
            Category
          </span>

          <strong>
            {machine.category.name}
          </strong>
        </div>

        <div>
          <span>
            Models
          </span>

          <strong>
            {machine.models.length}
          </strong>
        </div>

        <div>
          <span>
            Status
          </span>

          <strong>
            {machine.status}
          </strong>
        </div>

        <div>
          <span>
            URL
          </span>

          <strong>
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