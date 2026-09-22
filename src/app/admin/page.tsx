import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { prisma } from "@/lib/db/prisma";

async function safeCount(
  label: string,
  query: () => Promise<number>,
) {
  try {
    return await query();
  } catch (error) {
    console.error(`[admin-dashboard] Unable to count ${label}:`, error);
    return 0;
  }
}

export default async function AdminDashboardPage() {
  const [
    machineCount,
    enquiryCount,
    installationCount,
    mediaCount,
  ] = await Promise.all([
    safeCount("machines", () => prisma.machine.count()),
    safeCount("enquiries", () => prisma.enquiry.count()),
    safeCount("installations", () => prisma.installation.count()),
    safeCount("media", () => prisma.media.count()),
  ]);

  const stats = [
    {
      label: "Machines",
      value: machineCount,
    },
    {
      label: "Enquiries",
      value: enquiryCount,
    },
    {
      label: "Installations",
      value: installationCount,
    },
    {
      label: "Media Assets",
      value: mediaCount,
    },
  ];

  return (
    <>
      <AdminPageHeader
        eyebrow="Overview"
        title="Dashboard"
        description="Manage SDP Machines website content, machine data and enquiries."
      />

      <section className="admin-stats-grid">
        {stats.map((stat) => (
          <article
            key={stat.label}
            className="admin-stat-card"
          >
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
          </article>
        ))}
      </section>

      <section className="admin-panel">
        <span className="admin-page-eyebrow">
          System
        </span>

        <h2>
          CMS foundation ready
        </h2>

        <p>
          Authentication, role-aware sessions
          and MySQL connectivity are working.
        </p>
      </section>
    </>
  );
}
