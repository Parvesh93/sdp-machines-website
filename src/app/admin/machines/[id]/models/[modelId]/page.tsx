import Link from "next/link";
import { notFound } from "next/navigation";

import {
  AdminPageHeader,
} from "@/components/admin/admin-page-header";

import {
  MachineSpecificationForm,
} from "@/components/admin/machines/machine-specification-form";

import {
  prisma,
} from "@/lib/db/prisma";

type ModelPageProps = {
  params: Promise<{
    id: string;
    modelId: string;
  }>;
};

export default async function ModelPage({
  params,
}: ModelPageProps) {
  const {
    id,
    modelId,
  } = await params;

  const model =
    await prisma.machineModel.findFirst({
      where: {
        id: modelId,
        machineId: id,
      },

      include: {
        machine: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },

        specifications: {
          orderBy: [
            {
              sortOrder: "asc",
            },
            {
              label: "asc",
            },
          ],
        },
      },
    });

  if (!model) {
    notFound();
  }

  return (
    <>
      <AdminPageHeader
        eyebrow={model.machine.name}
        title={model.modelNumber}
        description="Manage model information and technical specifications."
        actions={
          <div className="admin-page-actions">
            <Link
              href={`/admin/machines/${id}/models`}
              className="admin-secondary-button"
            >
              Back to models
            </Link>

            <Link
              href={`/machines/${model.machine.slug}`}
              target="_blank"
              className="admin-secondary-button"
            >
              Preview machine
            </Link>
          </div>
        }
      />

      <section className="admin-machine-summary">
        <div>
          <span>
            Model
          </span>

          <strong>
            {model.modelNumber}
          </strong>
        </div>

        <div>
          <span>
            Status
          </span>

          <strong>
            {model.active
              ? "Active"
              : "Inactive"}
          </strong>
        </div>

        <div>
          <span>
            Specifications
          </span>

          <strong>
            {
              model.specifications
                .length
            }
          </strong>
        </div>

        <div>
          <span>
            Slug
          </span>

          <strong>
            {model.slug}
          </strong>
        </div>
      </section>

      <section className="admin-form-card">
        <div className="admin-form-card-header">
          <div>
            <h2>
              Add specification
            </h2>

            <p>
              Add technical values for
              {` ${model.modelNumber}`}.
            </p>
          </div>
        </div>

        <div className="admin-spec-create">
          <MachineSpecificationForm
            machineId={id}
            machineModelId={
              model.id
            }
          />
        </div>
      </section>

      <section
        className="admin-table-card"
        style={{
          marginTop: "18px",
        }}
      >
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>
                  Group
                </th>

                <th>
                  Specification
                </th>

                <th>
                  Value
                </th>

                <th>
                  Unit
                </th>

                <th>
                  Order
                </th>
              </tr>
            </thead>

            <tbody>
              {model.specifications
                .length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="admin-empty-state"
                  >
                    No technical
                    specifications have
                    been added yet.
                  </td>
                </tr>
              ) : (
                model.specifications.map(
                  (specification) => (
                    <tr
                      key={
                        specification.id
                      }
                    >
                      <td>
                        {specification
                          .groupName ??
                          "—"}
                      </td>

                      <td>
                        <strong>
                          {
                            specification.label
                          }
                        </strong>
                      </td>

                      <td>
                        {
                          specification.value
                        }
                      </td>

                      <td>
                        {specification.unit ??
                          "—"}
                      </td>

                      <td>
                        {
                          specification
                            .sortOrder
                        }
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