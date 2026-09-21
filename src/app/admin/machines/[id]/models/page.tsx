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
            className="admin-primary-button"
          >
            Add model
          </Link>
        }
      />

      <nav className="admin-workspace-tabs">
        {tabs.map((tab) => {
          const href =
            `/admin/machines/${machine.id}${tab.href}`;

          return (
            <Link
              key={tab.label}
              href={href}
              className={
                tab.label === "Models"
                  ? "admin-workspace-tab admin-workspace-tab-active"
                  : "admin-workspace-tab"
              }
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>

      <section className="admin-table-card">
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Model</th>
                <th>Model number</th>
                <th>Slug</th>
                <th>Status</th>
                <th>Sort order</th>
                <th>Updated</th>
              </tr>
            </thead>

            <tbody>
              {machine.models.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="admin-empty-state"
                  >
                    No models added yet.
                  </td>
                </tr>
              ) : (
                machine.models.map((model) => (
                  <tr key={model.id}>
                    <td>
                      <Link
                        href={`/admin/machines/${machine.id}/models/${model.id}`}
                        className="admin-table-title"
                      >
                        {model.name}
                      </Link>
                    </td>

                    <td>
                      {model.modelNumber}
                    </td>

                    <td>
                      {model.slug}
                    </td>

                    <td>
                      {model.active
                        ? "Active"
                        : "Inactive"}
                    </td>

                    <td>
                      {model.sortOrder}
                    </td>

                    <td>
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