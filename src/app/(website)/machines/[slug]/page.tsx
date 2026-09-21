import { notFound } from "next/navigation";

import { prisma } from "@/lib/db/prisma";
import { MachineDetailExperience } from "@/components/website/machines/machine-detail-experience";

type MachinePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function MachinePage({
  params,
}: MachinePageProps) {
  const { slug } = await params;

  const machine =
    await prisma.machine.findUnique({
      where: {
        slug,
      },

      include: {
        category: true,

        models: {
          where: {
            active: true,
          },

          orderBy: {
            sortOrder: "asc",
          },

          include: {
            specifications: {
              orderBy: {
                sortOrder: "asc",
              },
            },
          },
        },

        features: {
          where: {
            active: true,
          },

          orderBy: {
            sortOrder: "asc",
          },
        },
      },
    });

  if (!machine) {
    notFound();
  }

  return (
    <MachineDetailExperience
      machine={{
        id: machine.id,

        name: machine.name,

        slug: machine.slug,

        eyebrow: machine.eyebrow,

        headline: machine.headline,

        summary: machine.summary,

        category: {
          name: machine.category.name,
        },

        models: machine.models.map(
          (model) => ({
            id: model.id,

            name: model.name,

            modelNumber:
              model.modelNumber,

            specifications:
              model.specifications.map(
                (specification) => ({
                  id:
                    specification.id,

                  groupName:
                    specification.groupName,

                  label:
                    specification.label,

                  value:
                    specification.value,

                  unit:
                    specification.unit,

                  sortOrder:
                    specification.sortOrder,
                }),
              ),
          }),
        ),

        features: machine.features.map(
          (feature) => ({
            id: feature.id,

            title: feature.title,

            description:
              feature.description,

            statValue:
              feature.statValue,

            statLabel:
              feature.statLabel,

            scrollChapter:
              feature.scrollChapter,
          }),
        ),
      }}
    />
  );
}