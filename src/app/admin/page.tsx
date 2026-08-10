import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { prisma } from "@/lib/db/prisma";

export default async function AdminDashboardPage() {
  const [
    machineCount,
    enquiryCount,
    installationCount,
    mediaCount,
  ] = await Promise.all([
    prisma.machine.count(),
    prisma.enquiry.count(),
    prisma.installation.count(),
    prisma.media.count(),
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
            <span>
              {stat.label}
            </span>

            <strong>
              {stat.value}
            </strong>
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