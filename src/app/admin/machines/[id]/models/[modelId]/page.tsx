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
          <div className="flex items-start gap-2.5">
            <Link
              href={`/admin/machines/${id}/models`}
              className="inline-flex min-h-10 items-center justify-center rounded-[5px] border border-[#d6d6d1] bg-white px-4 text-[13px] font-semibold text-[#333333] transition-colors hover:border-[#aaaaa5]"
            >
              Back to models
            </Link>

            <Link
              href={`/machines/${model.machine.slug}`}
              target="_blank"
              className="inline-flex min-h-10 items-center justify-center rounded-[5px] border border-[#d6d6d1] bg-white px-4 text-[13px] font-semibold text-[#333333] transition-colors hover:border-[#aaaaa5]"
            >
              Preview machine
            </Link>
          </div>
        }
      />

      <section className="mb-[18px] grid grid-cols-1 overflow-hidden rounded-lg border border-[#e1e1dd] bg-white sm:grid-cols-2 lg:grid-cols-4">
        <div className="min-w-0 border-b border-[#ededeb] p-[18px_20px] sm:border-r lg:border-b-0 last:border-r-0">
          <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.08em] text-[#8a8a8a]">
            Model
          </span>

          <strong className="block overflow-hidden text-ellipsis whitespace-nowrap text-[13px] text-[#252525]">
            {model.modelNumber}
          </strong>
        </div>

        <div className="min-w-0 border-b border-[#ededeb] p-[18px_20px] sm:border-r lg:border-b-0 last:border-r-0">
          <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.08em] text-[#8a8a8a]">
            Status
          </span>

          <strong className="block overflow-hidden text-ellipsis whitespace-nowrap text-[13px] text-[#252525]">
            {model.active
              ? "Active"
              : "Inactive"}
          </strong>
        </div>

        <div className="min-w-0 border-b border-[#ededeb] p-[18px_20px] sm:border-r lg:border-b-0 last:border-r-0">
          <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.08em] text-[#8a8a8a]">
            Specifications
          </span>

          <strong className="block overflow-hidden text-ellipsis whitespace-nowrap text-[13px] text-[#252525]">
            {
              model.specifications
                .length
            }
          </strong>
        </div>

        <div className="min-w-0 border-b border-[#ededeb] p-[18px_20px] sm:border-r lg:border-b-0 last:border-r-0">
          <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.08em] text-[#8a8a8a]">
            Slug
          </span>

          <strong className="block overflow-hidden text-ellipsis whitespace-nowrap text-[13px] text-[#252525]">
            {model.slug}
          </strong>
        </div>
      </section>

      <section className="overflow-hidden rounded-lg border border-[#e1e1dd] bg-white">
        <div className="border-b border-[#e8e8e4] px-6 py-[22px]">
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

        <div className="px-6 pb-[26px] pt-[22px]">
          <MachineSpecificationForm
            machineId={id}
            machineModelId={
              model.id
            }
          />
        </div>
      </section>

      <section
        className="overflow-hidden rounded-lg border border-[#e1e1dd] bg-white mt-[18px]"
      >
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr>
                <th className="whitespace-nowrap border-b border-[#e6e6e2] bg-[#f8f8f6] px-[18px] py-[13px] text-left text-[10px] font-bold uppercase tracking-[0.08em] text-[#7a7a7a]">
                  Group
                </th>

                <th className="whitespace-nowrap border-b border-[#e6e6e2] bg-[#f8f8f6] px-[18px] py-[13px] text-left text-[10px] font-bold uppercase tracking-[0.08em] text-[#7a7a7a]">
                  Specification
                </th>

                <th className="whitespace-nowrap border-b border-[#e6e6e2] bg-[#f8f8f6] px-[18px] py-[13px] text-left text-[10px] font-bold uppercase tracking-[0.08em] text-[#7a7a7a]">
                  Value
                </th>

                <th className="whitespace-nowrap border-b border-[#e6e6e2] bg-[#f8f8f6] px-[18px] py-[13px] text-left text-[10px] font-bold uppercase tracking-[0.08em] text-[#7a7a7a]">
                  Unit
                </th>

                <th className="whitespace-nowrap border-b border-[#e6e6e2] bg-[#f8f8f6] px-[18px] py-[13px] text-left text-[10px] font-bold uppercase tracking-[0.08em] text-[#7a7a7a]">
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
                    className="px-5 py-[70px] text-center text-[#919191]"
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
                      <td className="border-b border-[#ededeb] px-[18px] py-[17px] align-middle text-[13px] text-[#444444]">
                        {specification
                          .groupName ??
                          "—"}
                      </td>

                      <td className="border-b border-[#ededeb] px-[18px] py-[17px] align-middle text-[13px] text-[#444444]">
                        <strong>
                          {
                            specification.label
                          }
                        </strong>
                      </td>

                      <td className="border-b border-[#ededeb] px-[18px] py-[17px] align-middle text-[13px] text-[#444444]">
                        {
                          specification.value
                        }
                      </td>

                      <td className="border-b border-[#ededeb] px-[18px] py-[17px] align-middle text-[13px] text-[#444444]">
                        {specification.unit ??
                          "—"}
                      </td>

                      <td className="border-b border-[#ededeb] px-[18px] py-[17px] align-middle text-[13px] text-[#444444]">
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