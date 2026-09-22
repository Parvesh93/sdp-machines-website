import "dotenv/config";

import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../src/generated/prisma/client";
import bcrypt from "bcryptjs";

const required = [
  "DATABASE_HOST",
  "DATABASE_PORT",
  "DATABASE_USER",
  "DATABASE_PASSWORD",
  "DATABASE_NAME",
] as const;

console.log("Environment:");
for (const key of required) {
  console.log(`  ${key}: ${process.env[key] ? "SET" : "MISSING"}`);
}

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST!,
  port: Number(process.env.DATABASE_PORT ?? 3306),
  user: process.env.DATABASE_USER!,
  password: process.env.DATABASE_PASSWORD!,
  database: process.env.DATABASE_NAME!,
  connectionLimit: 2,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("\nTesting database connection...");
  await prisma.$queryRaw`SELECT 1`;
  console.log("  Database connection: OK");

  const user = await prisma.user.findUnique({
    where: { email: "admin@sdpmachines.com" },
  });

  if (!user) {
    console.log("  Admin user: NOT FOUND");
    process.exitCode = 2;
    return;
  }

  console.log("  Admin user: FOUND");
  console.log(`  Active: ${user.active}`);
  console.log(`  Role: ${user.role}`);

  const tempPasswordMatches = await bcrypt.compare(
    "ChangeMe123!",
    user.passwordHash,
  );

  console.log(
    `  Temporary password matches: ${tempPasswordMatches ? "YES" : "NO"}`,
  );
}

main()
  .catch((error) => {
    console.error("\nDB CHECK FAILED");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
