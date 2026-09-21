import "dotenv/config";

import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST!,
  port: Number(process.env.DATABASE_PORT ?? 3306),
  user: process.env.DATABASE_USER!,
  password: process.env.DATABASE_PASSWORD!,
  database: process.env.DATABASE_NAME!,
  connectionLimit: 5,
});

const prisma = new PrismaClient({
  adapter,
});

const categories = [
  {
    name: "Primary Processing",
    slug: "primary-processing",
    sortOrder: 10,
  },
  {
    name: "Secondary Processing",
    slug: "secondary-processing",
    sortOrder: 20,
  },
  {
    name: "Packaging",
    slug: "packaging",
    sortOrder: 30,
  },
];

async function main() {
  for (const category of categories) {
    await prisma.machineCategory.upsert({
      where: {
        slug: category.slug,
      },

      update: {
        name: category.name,
        sortOrder: category.sortOrder,
        active: true,
      },

      create: {
        ...category,
        active: true,
      },
    });
  }

  console.log("Machine categories seeded.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });