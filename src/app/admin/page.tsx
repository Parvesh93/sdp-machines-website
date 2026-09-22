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
    { label: "Machines", value: machineCount },
    { label: "Enquiries", value: enquiryCount },
    { label: "Installations", value: installationCount },
    { label: "Media Assets", value: mediaCount },
  ];

  return (
    <>
      <AdminPageHeader
        eyebrow="Overview"
        title="Dashboard"
        description="Manage SDP Machines website content, machine data and enquiries."
      />

      <section className="mb-7 grid grid-cols-1 gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <article
            key={stat.label}
            className="flex min-h-[150px] flex-col justify-between rounded-lg border border-[#e1e1dd] bg-white p-[22px]"
          >
            <span className="text-[12px] font-semibold text-[#747474]">
              {stat.label}
            </span>

            <strong className="text-[42px] leading-none tracking-[-0.05em] tabular-nums">
              {stat.value}
            </strong>
          </article>
        ))}
      </section>

      <section className="rounded-lg border border-[#e1e1dd] bg-white p-7">
        <span className="mb-2 inline-block text-[11px] font-bold uppercase tracking-[0.14em] text-[#f36b21]">
          System
        </span>

        <h2 className="m-0 text-[22px] tracking-[-0.025em]">
          CMS foundation ready
        </h2>

        <p className="mt-3.5 max-w-[700px] leading-[1.65] text-[#707070]">
          Authentication, role-aware sessions and MySQL connectivity are working.
        </p>
      </section>
    </>
  );
}
