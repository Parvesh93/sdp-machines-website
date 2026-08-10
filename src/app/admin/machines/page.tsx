import Link from "next/link";

import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { prisma } from "@/lib/db/prisma";

export default async function MachinesPage() {
  const machines =
    await prisma.machine.findMany({
      include: {
        category: true,

        models: {
          select: {
            id: true,
          },
        },
      },

      orderBy: [
        {
          sortOrder: "asc",
        },
        {
          name: "asc",
        },
      ],
    });

  return (
    <>
      <AdminPageHeader
        eyebrow="Catalogue"
        title="Machines"
        description="Manage machine families, models, specifications and website content."
        actions={
          <Link
            href="/admin/machines/new"
            className="admin-primary-button"
          >
            Add machine
          </Link>
        }
      />

      <section className="admin-table-card">
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>
                  Machine
                </th>

                <th>
                  Category
                </th>

                <th>
                  Models
                </th>

                <th>
                  Status
                </th>

                <th>
                  Featured
                </th>

                <th>
                  Updated
                </th>
              </tr>
            </thead>

            <tbody>
              {machines.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="admin-empty-state"
                  >
                    No machines have been
                    added yet.
                  </td>
                </tr>
              ) : (
                machines.map(
                  (machine) => (
                    <tr key={machine.id}>
                      <td>
                        <Link
                          href={`/admin/machines/${machine.id}`}
                          className="admin-table-title"
                        >
                          {machine.name}
                        </Link>

                        <span className="admin-table-meta">
                          /machines/
                          {machine.slug}
                        </span>
                      </td>

                      <td>
                        {
                          machine
                            .category
                            .name
                        }
                      </td>

                      <td>
                        {
                          machine.models
                            .length
                        }
                      </td>

                      <td>
                        <span
                          className={`admin-status admin-status-${machine.status.toLowerCase()}`}
                        >
                          {
                            machine.status
                          }
                        </span>
                      </td>

                      <td>
                        {machine.featured
                          ? "Yes"
                          : "No"}
                      </td>

                      <td>
                        {machine.updatedAt.toLocaleDateString(
                          "en-IN",
                        )}
                      </td>
                    </tr>
                  ),
                )
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}