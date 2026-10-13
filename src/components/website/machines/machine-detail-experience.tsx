"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type MachineDetailExperienceProps = {
  machine: {
    id: string;
    name: string;
    slug: string;
    eyebrow: string | null;
    headline: string | null;
    summary: string | null;
    category: { name: string };
    models: {
      id: string;
      name: string;
      modelNumber: string;
      specifications: {
        id: string;
        groupName: string | null;
        label: string;
        value: string;
        unit: string | null;
        sortOrder: number;
      }[];
    }[];
    features: {
      id: string;
      title: string;
      description: string | null;
      statValue: string | null;
      statLabel: string | null;
      scrollChapter: number | null;
    }[];
  };
};

const fallbackFeatures = [
  {
    id: "01",
    title: "Heavy-duty frame",
    description:
      "Rigid fabrication designed around continuous industrial cutting cycles.",
    statValue: "24/7",
    statLabel: "Production-ready",
  },
  {
    id: "02",
    title: "Precision drive system",
    description:
      "Controlled movement engineered to maintain repeatability through long production runs.",
    statValue: "±",
    statLabel: "Controlled motion",
  },
  {
    id: "03",
    title: "Operator control",
    description:
      "Centralised machine control designed for visibility, safety and production management.",
    statValue: "HMI",
    statLabel: "Integrated control",
  },
];

const sectionIndexClass =
  "mb-6 block text-[9px] font-bold uppercase tracking-[0.17em] text-[var(--site-accent)]";

const quoteButtonClass =
  "inline-flex h-[50px] items-center justify-center gap-6 bg-[var(--site-accent)] px-5 text-[11px] font-bold text-[#0a0b0a] transition duration-200 hover:-translate-y-0.5 hover:bg-[#ffd867]";

export function MachineDetailExperience({
  machine,
}: MachineDetailExperienceProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const [activeChapter, setActiveChapter] = useState(0);

  const chapters =
    machine.features.length > 0
      ? machine.features
      : fallbackFeatures;

  const specificationLabels = Array.from(
    new Set(
      machine.models.flatMap((model) =>
        model.specifications.map(
          (specification) => specification.label,
        ),
      ),
    ),
  );

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const visual = visualRef.current;

    if (!wrapper || !visual) return;

    const ctx = gsap.context(() => {
      gsap.from(".machine-detail-hero-copy > *", {
        opacity: 0,
        y: 35,
        stagger: 0.1,
        duration: 0.9,
        ease: "power3.out",
      });

      gsap.from(".machine-detail-hero-image", {
        opacity: 0,
        scale: 0.9,
        x: 70,
        duration: 1.2,
        ease: "power3.out",
      });

      gsap.to(".machine-detail-hero-image", {
        y: -50,
        scrollTrigger: {
          trigger: ".machine-detail-hero",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      const chapterElements =
        gsap.utils.toArray<HTMLElement>(
          ".machine-story-chapter",
        );

      chapterElements.forEach((chapter, index) => {
        ScrollTrigger.create({
          trigger: chapter,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveChapter(index),
          onEnterBack: () => setActiveChapter(index),
        });
      });

      gsap.to(".machine-story-image-wrap", {
        rotateY: 10,
        rotateX: -3,
        scale: 1.08,
        scrollTrigger: {
          trigger: ".machine-story",
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });
    }, wrapper);

    return () => {
      ctx.revert();
    };
  }, []);

  const active =
    chapters[activeChapter] ?? chapters[0];

  return (
    <div
      ref={wrapperRef}
      className="bg-[#0b0c0c] text-[#f2f0ea]"
    >
      <section className="machine-detail-hero relative grid min-h-svh grid-cols-[minmax(0,0.9fr)_minmax(520px,1.1fr)] items-center overflow-hidden px-[5vw] pb-[70px] pt-[150px] max-[1050px]:grid-cols-1 max-[1050px]:pt-[135px] max-[700px]:px-[18px] max-[700px]:pb-[75px] max-[700px]:pt-[120px]">
        <div className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] [background-size:80px_80px]" />

        <div className="machine-detail-hero-copy relative z-[3]">
          <span className={sectionIndexClass}>
            {machine.category.name}
          </span>

          <h1 className="m-0 max-w-[760px] text-[clamp(72px,7vw,126px)] font-medium leading-[0.86] tracking-[-0.07em] max-[700px]:text-[clamp(54px,16vw,84px)]">
            {machine.name}
          </h1>

          <p className="my-[35px] mb-[25px] max-w-[490px] text-[12px] leading-[1.75] text-[#8c8f8a]">
            {machine.summary ??
              "Engineered for continuous stone processing, precision and long production life."}
          </p>

          {machine.models.length > 0 ? (
            <div className="mb-[30px] flex flex-wrap gap-[7px]">
              {machine.models.map((model) => (
                <span
                  key={model.id}
                  className="border border-white/10 px-2.5 py-[7px] text-[9px] text-[#a5a8a3]"
                >
                  {model.modelNumber}
                </span>
              ))}
            </div>
          ) : null}

          <Link
            href="/contact"
            className={quoteButtonClass}
          >
            Request a Quote
            <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="relative z-[2] h-[min(70vh,720px)] max-[1050px]:mt-[-30px] max-[1050px]:h-[520px] max-[700px]:h-[360px]">
          <div className="absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(216,255,62,0.12)] max-[700px]:h-[330px] max-[700px]:w-[330px]" />

          <Image
            src="/images/machines/multi-cutter-3.png"
            alt={machine.name}
            fill
            priority
            sizes="55vw"
            className="machine-detail-hero-image object-contain drop-shadow-[0_40px_35px_rgba(0,0,0,0.65)]"
          />

          <div className="absolute right-[3%] top-[20%] flex flex-col items-end text-[8px] tracking-[0.12em] text-[#686b66]">
            <span>SDP / MACHINE</span>
            <span>{machine.slug}</span>
          </div>
        </div>

        <div className="absolute bottom-[35px] left-[5vw] flex items-center gap-[9px] text-[8px] uppercase tracking-[0.12em] text-[#6d706b] max-[700px]:left-[18px]">
          Scroll to inspect
          <ArrowDown
            size={14}
            className="text-[var(--site-accent)]"
          />
        </div>
      </section>

      <section className="machine-story relative grid min-h-[240vh] grid-cols-[minmax(320px,0.7fr)_minmax(520px,1.3fr)_minmax(260px,0.5fr)] border-t border-white/[0.08] bg-[#111210] max-[1050px]:grid-cols-[minmax(280px,0.8fr)_minmax(0,1.2fr)] max-[700px]:block max-[700px]:min-h-0">
        <div className="relative border-r border-white/[0.09] max-[700px]:border-r-0">
          <div className="sticky top-[130px] flex min-h-[560px] flex-col justify-center px-[42px] py-[60px] max-[700px]:relative max-[700px]:top-auto max-[700px]:min-h-0 max-[700px]:px-[18px] max-[700px]:pb-[35px] max-[700px]:pt-[70px]">
            <span className={sectionIndexClass}>
              Engineering Detail
            </span>

            <span className="mb-6 text-[13px] text-[var(--site-accent)]">
              0{activeChapter + 1}
            </span>

            <h2 className="m-0 text-[clamp(38px,4vw,64px)] font-medium leading-[0.95] tracking-[-0.05em]">
              {active.title}
            </h2>

            <p className="mt-6 max-w-[340px] text-[11px] leading-[1.7] text-[#838681]">
              {active.description}
            </p>

            {active.statValue ? (
              <div className="mt-[35px] border-t border-white/10 pt-5">
                <strong className="block text-[36px] font-medium tracking-[-0.05em]">
                  {active.statValue}
                </strong>

                <span className="mt-[5px] block text-[8px] uppercase tracking-[0.1em] text-[#666964]">
                  {active.statLabel}
                </span>
              </div>
            ) : null}
          </div>
        </div>

        <div
          ref={visualRef}
          className="sticky top-[88px] h-[calc(100vh-88px)] overflow-hidden max-[700px]:relative max-[700px]:top-auto max-[700px]:h-[430px]"
        >
          <div className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] [background-size:55px_55px]" />

          <div className="machine-story-image-wrap absolute inset-[10%_3%_12%] origin-center [transform-style:preserve-3d] will-change-transform">
            <Image
              src="/images/machines/multi-cutter-3.png"
              alt={machine.name}
              fill
              sizes="55vw"
              className="object-contain drop-shadow-[0_30px_32px_rgba(0,0,0,0.65)]"
            />

            <span className="absolute left-[30%] top-[31%] h-[11px] w-[11px] rounded-full border border-[rgba(216,255,62,0.65)] shadow-[0_0_0_7px_rgba(216,255,62,0.05)]" />
            <span className="absolute right-[21%] top-[47%] h-[11px] w-[11px] rounded-full border border-[rgba(216,255,62,0.65)] shadow-[0_0_0_7px_rgba(216,255,62,0.05)]" />
            <span className="absolute bottom-[24%] left-1/2 h-[11px] w-[11px] rounded-full border border-[rgba(216,255,62,0.65)] shadow-[0_0_0_7px_rgba(216,255,62,0.05)]" />
          </div>

          <div className="absolute bottom-[26px] left-7 z-[4] flex items-center gap-3 border border-white/10 bg-[rgba(14,15,14,0.76)] px-[14px] py-3 backdrop-blur-[10px]">
            <span className="text-[8px] text-[var(--site-accent)]">
              0{activeChapter + 1}
            </span>

            <strong className="text-[10px] font-semibold">
              {active.title}
            </strong>
          </div>
        </div>

        <div className="border-l border-white/[0.09] max-[1050px]:col-span-full max-[1050px]:hidden">
          {chapters.map((chapter, index) => (
            <article
              key={chapter.id}
              className="machine-story-chapter flex min-h-[80vh] flex-col justify-center border-b border-white/[0.09] px-7 py-[55px]"
            >
              <span className="text-[8px] text-[var(--site-accent)]">
                0{index + 1}
              </span>

              <strong className="mt-3 text-[21px] font-medium tracking-[-0.03em]">
                {chapter.title}
              </strong>

              <p className="mt-3 text-[10px] leading-[1.6] text-[#737671]">
                {chapter.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#e9e8e2] px-[5vw] py-[130px] text-[#171817] max-[700px]:px-[18px] max-[700px]:py-20">
        <div className="mx-auto w-full max-w-[1600px]">
          <span className="mb-6 block text-[9px] font-bold uppercase tracking-[0.17em] text-[#64675f]">
            Models
          </span>

          <h2 className="m-0 max-w-[950px] text-[clamp(52px,6vw,100px)] font-medium leading-[0.9] tracking-[-0.065em]">
            One platform.
            <span className="block text-[#9b9b93]">
              Multiple production requirements.
            </span>
          </h2>

          {machine.models.length > 0 ? (
            <div className="mt-[65px] grid grid-cols-3 border-l border-t border-[#c5c4be] max-[1050px]:grid-cols-2 max-[700px]:grid-cols-1">
              {machine.models.map((model, index) => (
                <article
                  key={model.id}
                  className="flex min-h-[200px] flex-col justify-between border-b border-r border-[#c5c4be] p-6"
                >
                  <span className="text-[9px] text-[#9b9c95]">
                    0{index + 1}
                  </span>

                  <strong className="mt-auto text-[clamp(30px,3vw,46px)] font-medium tracking-[-0.05em]">
                    {model.modelNumber}
                  </strong>

                  <small className="mt-1 text-[9px] text-[#6e7069]">
                    {model.name}
                  </small>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-[65px] border border-black/10 px-5 py-[60px] text-center text-[#747772]">
              Models will be added shortly.
            </div>
          )}
        </div>
      </section>

      <section className="border-t border-white/[0.08] bg-[#111210] px-[5vw] pb-[140px] pt-[130px] text-[#f2f0ea] max-[900px]:px-6 max-[900px]:py-[100px] max-[650px]:px-[18px] max-[650px]:py-20">
        <div className="mx-auto w-full max-w-[1600px]">
          {machine.models.length === 1 ? (
            <>
              <div className="mb-[60px] grid grid-cols-[minmax(0,1.4fr)_minmax(260px,0.6fr)] items-end gap-[70px] max-[900px]:grid-cols-1 max-[900px]:gap-[25px]">
                <div>
                  <span className={sectionIndexClass}>
                    Technical Data
                  </span>

                  <h2 className="m-0 max-w-[850px] text-[clamp(52px,6vw,100px)] font-medium leading-[0.9] tracking-[-0.065em] max-[650px]:text-[clamp(48px,14vw,72px)]">
                    Technical
                    <span className="block text-[#737671]">
                      specifications.
                    </span>
                  </h2>
                </div>

                <div className="flex max-w-[390px] flex-col items-start">
                  <span className="text-[8px] font-bold uppercase tracking-[0.13em] text-[#62655f]">
                    Model
                  </span>
                  <strong className="mt-2 text-[30px] font-medium tracking-[-0.045em] text-[#f2f0ea]">
                    {machine.models[0].modelNumber}
                  </strong>
                  <p className="mt-[18px] text-[11px] leading-[1.7] text-[#858883]">
                    Key technical parameters for evaluating this machine against
                    your production requirement.
                  </p>
                </div>
              </div>

              {machine.models[0].specifications.length > 0 ? (
                <div className="border-t border-white/10">
                  {Array.from(
                    new Set(
                      machine.models[0].specifications.map(
                        (specification) =>
                          specification.groupName ?? "General",
                      ),
                    ),
                  ).map((group) => {
                    const specifications =
                      machine.models[0].specifications.filter(
                        (specification) =>
                          (specification.groupName ?? "General") === group,
                      );

                    return (
                      <div
                        key={group}
                        className="grid grid-cols-[minmax(190px,0.32fr)_minmax(0,1fr)] border-b border-white/10 max-[700px]:grid-cols-1"
                      >
                        <div className="border-r border-white/10 bg-white/[0.018] p-[26px] max-[700px]:border-b max-[700px]:border-r-0">
                          <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--site-accent)]">
                            {group}
                          </span>
                        </div>

                        <div className="grid">
                          {specifications.map((specification) => (
                            <div
                              key={specification.id}
                              className="grid min-h-[72px] grid-cols-[minmax(0,1fr)_auto] items-center gap-10 border-b border-white/[0.08] px-6 py-[18px] transition-colors duration-200 last:border-b-0 hover:bg-[rgba(216,255,62,0.025)] max-[700px]:gap-5"
                            >
                              <span className="text-[12px] text-[#9a9d98]">
                                {specification.label}
                              </span>

                              <div className="min-w-[130px] text-right">
                                <strong className="text-[17px] font-medium tabular-nums text-[#f2f0ea]">
                                  {specification.value}
                                </strong>

                                {specification.unit ? (
                                  <span className="ml-1.5 text-[9px] text-[#666964]">
                                    {specification.unit}
                                  </span>
                                ) : null}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="border border-white/10 px-5 py-[60px] text-center text-[#747772]">
                  Technical specifications will be added shortly.
                </div>
              )}
            </>
          ) : (
            <>
              <div className="mb-[60px] grid grid-cols-[minmax(0,1.4fr)_minmax(260px,0.6fr)] items-end gap-[70px] max-[900px]:grid-cols-1 max-[900px]:gap-[25px]">
                <div>
                  <span className={sectionIndexClass}>
                    Technical Data
                  </span>

                  <h2 className="m-0 max-w-[850px] text-[clamp(52px,6vw,100px)] font-medium leading-[0.9] tracking-[-0.065em] max-[650px]:text-[clamp(48px,14vw,72px)]">
                    Compare
                    <span className="block text-[#737671]">
                      machine models.
                    </span>
                  </h2>
                </div>

                <p className="m-0 max-w-[390px] text-[11px] leading-[1.75] text-[#858883]">
                  Compare key technical parameters across available models to
                  identify the right configuration for your production
                  requirement.
                </p>
              </div>

              {machine.models.length > 0 ? (
                <div className="w-full overflow-x-auto border-l border-t border-white/10">
                  <table className="w-full min-w-[760px] border-collapse text-left">
                    <thead>
                      <tr>
                        <th className="w-[34%] border-b border-r border-white/10 bg-white/[0.025] px-[22px] py-[21px] text-[9px] font-semibold uppercase tracking-[0.1em] text-[#737671]">
                          Specification
                        </th>

                        {machine.models.map((model) => (
                          <th
                            key={model.id}
                            className="min-w-[160px] border-b border-r border-white/10 bg-white/[0.025] px-[22px] py-[21px] align-bottom"
                          >
                            <span className="block text-[8px] uppercase tracking-[0.12em] text-[#5e615c]">
                              Model
                            </span>

                            <strong className="mt-1.5 block text-[22px] font-medium tracking-[-0.04em] text-[#f3f1eb]">
                              {model.modelNumber}
                            </strong>
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      {specificationLabels.length > 0 ? (
                        specificationLabels.map((label) => (
                          <tr
                            key={label}
                            className="transition-colors duration-200 hover:bg-[rgba(216,255,62,0.025)]"
                          >
                            <td className="border-b border-r border-white/10 px-[22px] py-[21px] text-[11px] text-[#9b9e99]">
                              {label}
                            </td>

                            {machine.models.map((model) => {
                              const specification =
                                model.specifications.find(
                                  (item) => item.label === label,
                                );

                              return (
                                <td
                                  key={model.id}
                                  className="border-b border-r border-white/10 px-[22px] py-[21px] text-[#f2f0ea]"
                                >
                                  {specification ? (
                                    <>
                                      <strong className="text-[15px] font-medium tabular-nums">
                                        {specification.value}
                                      </strong>

                                      {specification.unit ? (
                                        <span className="ml-[5px] text-[9px] text-[#71746f]">
                                          {specification.unit}
                                        </span>
                                      ) : null}
                                    </>
                                  ) : (
                                    <span>—</span>
                                  )}
                                </td>
                              );
                            })}
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={machine.models.length + 1}
                            className="px-5 py-[60px] text-center text-[#666964]"
                          >
                            Technical specifications will be added shortly.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              ) : null}
            </>
          )}

          <div className="mt-6 flex items-center justify-between gap-[30px] max-[650px]:flex-col max-[650px]:items-start">
            <span className="text-[9px] uppercase tracking-[0.08em] text-[#696c67]">
              Need help selecting a model?
            </span>

            <Link
              href="/contact"
              className="group inline-flex items-center gap-[15px] text-[10px] font-semibold text-[#f2f0ea]"
            >
              Talk to engineering
              <ArrowUpRight
                size={17}
                className="text-[var(--site-accent)] transition-transform duration-200 group-hover:translate-x-[3px] group-hover:-translate-y-[3px]"
              />
            </Link>
          </div>
        </div>
      </section>

      <section className="flex items-end justify-between gap-[50px] bg-[#0b0c0c] px-[5vw] py-[110px] max-[700px]:flex-col max-[700px]:items-start max-[700px]:px-[18px] max-[700px]:py-20">
        <div>
          <span className={sectionIndexClass}>
            Talk to Engineering
          </span>

          <h2 className="m-0 max-w-[900px] text-[clamp(54px,6vw,100px)] font-medium leading-[0.9] tracking-[-0.065em]">
            Discuss your
            <span className="block text-[#737671]">
              production requirement.
            </span>
          </h2>
        </div>

        <Link
          href="/contact"
          className={quoteButtonClass}
        >
          Request a Quote
          <ArrowUpRight size={17} />
        </Link>
      </section>
    </div>
  );
}
