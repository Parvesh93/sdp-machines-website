import { prisma } from "@/lib/db/prisma";

export default async function DatabaseTestPage() {
  const userCount = await prisma.user.count();
  const machineCount = await prisma.machine.count();

  return (
    <main style={{ padding: 40 }}>
      <h1>Database Test</h1>

      <p>Users: {userCount}</p>
      <p>Machines: {machineCount}</p>

      <p>MySQL connection is working.</p>
    </main>
  );
}