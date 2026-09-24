import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const machines = [
  {
    number: "01",
    title: "Multi Cutters",
    eyebrow: "Automatic Bridge-Type",
    description:
      "High-output multi-blade cutting systems engineered for granite production.",
    image: "/images/machines/multi-cutter.jpg",
    href: "/machines/multi-cutters",
  },
  {
    number: "02",
    title: "Line Polishing",
    eyebrow: "Surface Processing",
    description:
      "Continuous polishing lines built for consistent finish and dependable throughput.",
    image: "/images/machines/lpm.jpg",
    href: "/machines/line-polishing",
  },
  {
    number: "03",
    title: "Thin Wire",
    eyebrow: "Precision Cutting",
    description:
      "Controlled wire-cutting systems for accurate processing and efficient material use.",
    image: "/images/machines/thin-wire.jpg",
    href: "/machines/thin-wire",
  },
  {
    number: "04",
    title: "Handling & Cranes",
    eyebrow: "Material Handling",
    description:
      "Gantry and EOT handling systems designed around safer, more efficient stone movement.",
    image: "/images/machines/gantry.jpg",
    href: "/machines/handling-cranes",
  },
];

export function MachineShowcase() {
  return (
    <section className="bg-[#f2f0ea] text-[#171817]">
      <div className="mx-auto w-full max-w-[1600px] px-[5vw] pb-10 pt-[110px] max-[650px]:px-[18px] max-[650px]:pt-20">
        <div className="grid gap-8 pb-14 lg:grid-cols-[1.25fr_.75fr] lg:items-end">
          <div>
            <span className="mb-5 block text-[9px] font-bold uppercase tracking-[0.17em] text-[var(--site-accent)]">
              02 / Machine Range
            </span>

            <h2 className="m-0 max-w-[980px] text-[clamp(52px,6.8vw,112px)] font-medium leading-[0.88] tracking-[-0.07em]">
              Four machine lines.
              <span className="block text-[#96958e]">
                One production partner.
              </span>
            </h2>
          </div>

          <p className="m-0 max-w-[390px] text-[12px] leading-[1.8] text-[#666861] lg:justify-self-end">
            Move straight to the machine line you need. Each range leads to
            models, technical data, installation proof and a quote path.
          </p>
        </div>
      </div>

      <div className="border-t border-[#c9c8c1]">
        {machines.map((machine) => (
          <article
            key={machine.number}
            className="border-b border-[#c9c8c1]"
          >
            <Link
              href={machine.href}
              className="group mx-auto grid min-h-[72vh] w-full max-w-[1600px] grid-cols-[minmax(320px,.7fr)_minmax(0,1.3fr)] items-stretch max-[900px]:grid-cols-1"
            >
              <div className="flex flex-col justify-between px-[5vw] py-12 max-[650px]:px-[18px] max-[650px]:py-9">
                <div className="flex items-center justify-between border-b border-[#c9c8c1] pb-4">
                  <span className="text-[10px] font-semibold tabular-nums text-[#77776f]">
                    {machine.number}
                  </span>

                  <span className="text-[8px] font-bold uppercase tracking-[0.13em] text-[#77776f]">
                    {machine.eyebrow}
                  </span>
                </div>

                <div className="py-12">
                  <h3 className="m-0 text-[clamp(48px,5vw,86px)] font-medium leading-[0.9] tracking-[-0.065em]">
                    {machine.title}
                  </h3>

                  <p className="mt-7 max-w-[430px] text-[12px] leading-[1.75] text-[#696b65]">
                    {machine.description}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-[#c9c8c1] pt-4">
                  <span className="text-[10px] font-semibold">
                    Explore machine
                  </span>

                  <ArrowUpRight
                    size={20}
                    className="text-[var(--site-accent)] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </div>
              </div>

              <div className="relative min-h-[520px] overflow-hidden bg-[#d9d8d1] max-[650px]:min-h-[360px]">
                <Image
                  src={machine.image}
                  alt={machine.title}
                  fill
                  sizes="(max-width: 900px) 100vw, 65vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                />

                <div className="pointer-events-none absolute inset-0 border-l border-black/10 max-[900px]:border-l-0 max-[900px]:border-t" />
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
