import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const capabilities = [
  "Cutting",
  "Polishing",
  "Handling",
  "Resin-line equipment",
];

export function AboutPreview() {
  return (
    <section className="bg-[#f4f7fa] px-[5vw] py-[120px] text-[#0b1720] max-[650px]:px-[18px] max-[650px]:py-20">
      <div className="mx-auto grid w-full max-w-[1600px] gap-14 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
        <div>
          <span className="mb-6 block text-[9px] font-bold uppercase tracking-[0.17em] text-[var(--site-accent)]">
            03 / About SDP Machines
          </span>

          <h2 className="max-w-[900px] text-[clamp(50px,5.8vw,96px)] font-medium leading-[0.9] tracking-[-0.065em]">
            Engineering and manufacturing
            <span className="block text-[#8fa6b4]">from Ajmer.</span>
          </h2>
        </div>

        <div className="lg:justify-self-end">
          <p className="max-w-[470px] text-[12px] leading-7 text-[#5f7480]">
            SDP Machines designs and manufactures stone processing equipment in
            Ajmer, Rajasthan. Our range covers cutting, polishing, handling and
            resin-line equipment for stone processing operations.
          </p>

          <Link
            href="/about"
            className="group mt-7 inline-flex items-center gap-4 text-[10px] font-semibold text-[#0b1720]"
          >
            About SDP Machines
            <ArrowUpRight
              size={17}
              className="text-[var(--site-accent)] transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-16 grid w-full max-w-[1600px] border-y border-[#ccd7de] sm:grid-cols-2 lg:grid-cols-4">
        {capabilities.map((item, index) => (
          <div
            key={item}
            className="flex min-h-[150px] flex-col justify-between border-b border-[#ccd7de] p-6 last:border-b-0 sm:border-r sm:nth-[2n]:border-r-0 lg:border-b-0 lg:nth-[2n]:border-r lg:last:border-r-0"
          >
            <span className="text-[9px] tabular-nums text-[var(--site-accent)]">
              0{index + 1}
            </span>
            <strong className="text-[20px] font-medium tracking-[-0.035em]">
              {item}
            </strong>
          </div>
        ))}
      </div>
    </section>
  );
}
