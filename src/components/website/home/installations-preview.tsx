"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  useEffect,
  useRef,
} from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const locations = [
  "Kishangarh",
  "Hosur",
  "Krishnagiri",
  "Ongole",
  "Karimnagar",
];

const stats = [
  { value: "1,000+", label: "Installations" },
  { value: "5", label: "Service Centres" },
  { value: "1995", label: "Engineering Since" },
];

export function InstallationsPreview() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".installation-heading",
        {
          opacity: 0,
          y: 45,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
          },
        },
      );

      gsap.fromTo(
        ".installation-image",
        {
          scale: 1.08,
        },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        },
      );

      gsap.fromTo(
        ".installation-stat",
        {
          opacity: 0,
          y: 25,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.65,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".installation-proof-grid",
            start: "top 75%",
          },
        },
      );
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#f2f0ea] px-[5vw] pb-[150px] pt-[130px] text-[#171817] max-[950px]:px-6 max-[950px]:py-[100px] max-[650px]:px-[18px] max-[650px]:py-20"
    >
      <div className="mx-auto w-full max-w-[1600px]">
        <div className="installation-heading mb-[70px] grid grid-cols-[minmax(0,1.4fr)_minmax(280px,0.6fr)] items-end gap-20 max-[950px]:grid-cols-1 max-[950px]:gap-7">
          <div>
            <span className="mb-[25px] block text-[9px] font-bold uppercase tracking-[0.17em] text-[var(--site-accent)]">
              04 / Field Proof
            </span>

            <h2 className="m-0 max-w-[980px] text-[clamp(54px,6.5vw,110px)] font-medium leading-[0.88] tracking-[-0.068em] max-[650px]:text-[clamp(48px,14vw,72px)]">
              Built in Ajmer.
              <span className="block text-[#97978f]">
                Running where stone is processed.
              </span>
            </h2>
          </div>

          <div className="pb-2.5">
            <p className="mb-6 max-w-[380px] text-[12px] leading-[1.75] text-[#666861]">
              Machines prove themselves on the factory floor. SDP installations
              operate across India&apos;s major stone-processing clusters.
            </p>

            <Link
              href="/installations"
              className="group inline-flex items-center gap-[15px] text-[10px] font-semibold text-[#151615]"
            >
              View installations
              <ArrowUpRight
                size={17}
                className="text-[var(--site-accent)] transition-transform duration-200 group-hover:translate-x-[3px] group-hover:-translate-y-[3px]"
              />
            </Link>
          </div>
        </div>

        <div className="installation-proof-grid grid grid-cols-[minmax(0,1.5fr)_minmax(300px,0.5fr)] gap-px bg-[#bebdb7] max-[950px]:grid-cols-1">
          <div className="relative min-h-[650px] overflow-hidden bg-[#181918] max-[950px]:min-h-[520px] max-[650px]:min-h-[420px]">
            <Image
              src="/images/installations/installation-01.jpeg"
              alt="SDP machine installed at a stone processing facility"
              fill
              sizes="(max-width: 900px) 100vw, 65vw"
              className="installation-image object-cover [filter:saturate(0.82)_contrast(1.04)]"
            />

            <div className="absolute inset-0 bg-black/28" />

            <div className="absolute bottom-7 left-[30px] z-[2] max-[650px]:bottom-[18px] max-[650px]:left-[18px]">
              <span className="mb-[7px] block text-[8px] uppercase tracking-[0.13em] text-white/55">
                Installation / India
              </span>

              <strong className="block text-[clamp(25px,3vw,42px)] font-medium tracking-[-0.04em] text-white">
                Machines in production
              </strong>
            </div>
          </div>

          <div className="flex flex-col bg-[#171817] text-[#f3f1eb] max-[950px]:grid max-[950px]:grid-cols-2 max-[650px]:block">
            <div className="grid">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="installation-stat flex min-h-[150px] flex-col justify-between border-b border-white/10 px-[27px] py-6 max-[650px]:min-h-[110px]"
                >
                  <strong className="text-[clamp(40px,4vw,66px)] font-medium leading-none tracking-[-0.06em] tabular-nums">
                    {stat.value}
                  </strong>

                  <span className="text-[9px] uppercase tracking-[0.09em] text-[#777a75]">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-auto p-7">
              <span className="mb-[18px] block text-[8px] uppercase tracking-[0.14em] text-[#666964]">
                Stone processing clusters
              </span>

              <div className="border-t border-white/10">
                {locations.map((location, index) => (
                  <div
                    key={location}
                    className="grid min-h-[52px] grid-cols-[36px_1fr] items-center border-b border-white/10"
                  >
                    <span className="text-[8px] text-[#575a55]">
                      0{index + 1}
                    </span>

                    <strong className="text-[12px] font-medium text-[#c3c5c0]">
                      {location}
                    </strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
