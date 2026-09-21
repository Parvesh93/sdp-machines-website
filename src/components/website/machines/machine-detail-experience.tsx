"use client";

import Image from "next/image";
import Link from "next/link";

import {
  ArrowDown,
  ArrowUpRight,
} from "lucide-react";

import {
  useEffect,
  useRef,
  useState,
} from "react";

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

    category: {
      name: string;
    };

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

export function MachineDetailExperience({
  machine,
}: MachineDetailExperienceProps) {
  const wrapperRef =
    useRef<HTMLDivElement>(null);

  const visualRef =
    useRef<HTMLDivElement>(null);

  const [activeChapter, setActiveChapter] =
    useState(0);

  const chapters =
    machine.features.length > 0
      ? machine.features
      : fallbackFeatures;

  const specificationLabels = Array.from(
    new Set(
      machine.models.flatMap((model) =>
        model.specifications.map(
          (specification) =>
            specification.label,
        ),
      ),
    ),
  );

  useEffect(() => {
    const wrapper =
      wrapperRef.current;

    const visual =
      visualRef.current;

    if (!wrapper || !visual) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(
        ".machine-detail-hero-copy > *",
        {
          opacity: 0,
          y: 35,
          stagger: 0.1,
          duration: 0.9,
          ease: "power3.out",
        },
      );

      gsap.from(
        ".machine-detail-hero-image",
        {
          opacity: 0,
          scale: 0.9,
          x: 70,
          duration: 1.2,
          ease: "power3.out",
        },
      );

      gsap.to(
        ".machine-detail-hero-image",
        {
          y: -50,

          scrollTrigger: {
            trigger:
              ".machine-detail-hero",

            start: "top top",

            end: "bottom top",

            scrub: 1,
          },
        },
      );

      const chapterElements =
        gsap.utils.toArray<HTMLElement>(
          ".machine-story-chapter",
        );

      chapterElements.forEach(
        (chapter, index) => {
          ScrollTrigger.create({
            trigger: chapter,

            start: "top center",

            end: "bottom center",

            onEnter: () =>
              setActiveChapter(index),

            onEnterBack: () =>
              setActiveChapter(index),
          });
        },
      );

      gsap.to(
        ".machine-story-image-wrap",
        {
          rotateY: 10,
          rotateX: -3,
          scale: 1.08,

          scrollTrigger: {
            trigger:
              ".machine-story",

            start: "top top",

            end: "bottom bottom",

            scrub: 1,
          },
        },
      );
    }, wrapper);

    return () => {
      ctx.revert();
    };
  }, []);

  const active =
    chapters[activeChapter] ??
    chapters[0];

  return (
    <div
      ref={wrapperRef}
      className="machine-detail-page"
    >
      {/* HERO */}

      <section className="machine-detail-hero">
        <div className="machine-detail-hero-grid" />

        <div className="machine-detail-hero-copy">
          <span className="section-index">
            {machine.category.name}
          </span>

          <h1>
            {machine.name}
          </h1>

          <p>
            {machine.summary ??
              "Engineered for continuous stone processing, precision and long production life."}
          </p>

          {machine.models.length > 0 ? (
            <div className="machine-detail-models">
              {machine.models.map(
                (model) => (
                  <span key={model.id}>
                    {model.modelNumber}
                  </span>
                ),
              )}
            </div>
          ) : null}

          <Link
            href="/contact"
            className="site-quote-button"
          >
            Request a Quote

            <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="machine-detail-hero-visual">
          <div className="machine-detail-hero-ring" />

          <Image
            src="/images/machines/multi-cutter-3.png"
            alt={machine.name}
            fill
            priority
            sizes="55vw"
            className="machine-detail-hero-image"
          />

          <div className="machine-detail-coordinate">
            <span>
              SDP / MACHINE
            </span>

            <span>
              {machine.slug}
            </span>
          </div>
        </div>

        <div className="machine-detail-scroll">
          Scroll to inspect

          <ArrowDown size={14} />
        </div>
      </section>

      {/* ENGINEERING STORY */}

      <section className="machine-story">
        <div className="machine-story-copy">
          <div className="machine-story-copy-inner">
            <span className="section-index">
              Engineering Detail
            </span>

            <span className="machine-story-index">
              0{activeChapter + 1}
            </span>

            <h2>
              {active.title}
            </h2>

            <p>
              {active.description}
            </p>

            {active.statValue ? (
              <div className="machine-story-stat">
                <strong>
                  {active.statValue}
                </strong>

                <span>
                  {active.statLabel}
                </span>
              </div>
            ) : null}
          </div>
        </div>

        <div
          ref={visualRef}
          className="machine-story-visual"
        >
          <div className="machine-story-visual-grid" />

          <div className="machine-story-image-wrap">
            <Image
              src="/images/machines/multi-cutter-3.png"
              alt={machine.name}
              fill
              sizes="55vw"
              className="machine-story-image"
            />

            <span className="machine-story-marker marker-01" />

            <span className="machine-story-marker marker-02" />

            <span className="machine-story-marker marker-03" />
          </div>

          <div className="machine-story-active-label">
            <span>
              0{activeChapter + 1}
            </span>

            <strong>
              {active.title}
            </strong>
          </div>
        </div>

        <div className="machine-story-chapters">
          {chapters.map(
            (chapter, index) => (
              <article
                key={chapter.id}
                className="machine-story-chapter"
              >
                <span>
                  0{index + 1}
                </span>

                <strong>
                  {chapter.title}
                </strong>

                <p>
                  {chapter.description}
                </p>
              </article>
            ),
          )}
        </div>
      </section>

      {/* MODELS */}

      <section className="machine-detail-model-section">
        <div className="machine-detail-model-inner">
          <span className="section-index">
            Models
          </span>

          <h2>
            One platform.
            <span>
              Multiple production requirements.
            </span>
          </h2>

          {machine.models.length > 0 ? (
            <div className="machine-model-grid">
              {machine.models.map(
                (model, index) => (
                  <article
                    key={model.id}
                    className="machine-model-card"
                  >
                    <span>
                      0{index + 1}
                    </span>

                    <strong>
                      {model.modelNumber}
                    </strong>

                    <small>
                      {model.name}
                    </small>
                  </article>
                ),
              )}
            </div>
          ) : (
            <div className="machine-spec-empty-box">
              Models will be added shortly.
            </div>
          )}
        </div>
      </section>

      {/* TECHNICAL SPECIFICATIONS */}

<section className="machine-specifications">
  <div className="machine-specifications-inner">
    {machine.models.length === 1 ? (
      <>
        <div className="machine-specifications-head">
          <div>
            <span className="section-index">
              Technical Data
            </span>

            <h2>
              Technical
              <span>
                specifications.
              </span>
            </h2>
          </div>

          <div className="machine-spec-intro">
            <span>
              Model
            </span>

            <strong>
              {machine.models[0].modelNumber}
            </strong>

            <p>
              Key technical parameters for
              evaluating this machine against
              your production requirement.
            </p>
          </div>
        </div>

        {machine.models[0].specifications.length >
        0 ? (
          <div className="single-model-specs">
            {Array.from(
              new Set(
                machine.models[0].specifications.map(
                  (specification) =>
                    specification.groupName ??
                    "General",
                ),
              ),
            ).map((group) => {
              const specifications =
                machine.models[0].specifications.filter(
                  (specification) =>
                    (specification.groupName ??
                      "General") === group,
                );

              return (
                <div
                  key={group}
                  className="single-spec-group"
                >
                  <div className="single-spec-group-title">
                    <span>
                      {group}
                    </span>
                  </div>

                  <div className="single-spec-rows">
                    {specifications.map(
                      (specification) => (
                        <div
                          key={specification.id}
                          className="single-spec-row"
                        >
                          <span className="single-spec-label">
                            {
                              specification.label
                            }
                          </span>

                          <div className="single-spec-value">
                            <strong>
                              {
                                specification.value
                              }
                            </strong>

                            {specification.unit ? (
                              <span>
                                {
                                  specification.unit
                                }
                              </span>
                            ) : null}
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="machine-spec-empty-box">
            Technical specifications will
            be added shortly.
          </div>
        )}
      </>
    ) : (
      <>
        <div className="machine-specifications-head">
          <div>
            <span className="section-index">
              Technical Data
            </span>

            <h2>
              Compare
              <span>
                machine models.
              </span>
            </h2>
          </div>

          <p>
            Compare key technical parameters
            across available models to identify
            the right configuration for your
            production requirement.
          </p>
        </div>

        {machine.models.length > 0 ? (
          <div className="machine-spec-table-wrap">
            <table className="machine-spec-table">
              <thead>
                <tr>
                  <th>
                    Specification
                  </th>

                  {machine.models.map(
                    (model) => (
                      <th key={model.id}>
                        <span>
                          Model
                        </span>

                        <strong>
                          {
                            model.modelNumber
                          }
                        </strong>
                      </th>
                    ),
                  )}
                </tr>
              </thead>

              <tbody>
                {specificationLabels.length >
                0 ? (
                  specificationLabels.map(
                    (label) => (
                      <tr key={label}>
                        <td>
                          {label}
                        </td>

                        {machine.models.map(
                          (model) => {
                            const specification =
                              model.specifications.find(
                                (item) =>
                                  item.label ===
                                  label,
                              );

                            return (
                              <td
                                key={
                                  model.id
                                }
                              >
                                {specification ? (
                                  <>
                                    <strong>
                                      {
                                        specification.value
                                      }
                                    </strong>

                                    {specification.unit ? (
                                      <span>
                                        {
                                          specification.unit
                                        }
                                      </span>
                                    ) : null}
                                  </>
                                ) : (
                                  <span>
                                    —
                                  </span>
                                )}
                              </td>
                            );
                          },
                        )}
                      </tr>
                    ),
                  )
                ) : (
                  <tr>
                    <td
                      colSpan={
                        machine.models.length +
                        1
                      }
                      className="machine-spec-empty"
                    >
                      Technical specifications
                      will be added shortly.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : null}
      </>
    )}

    <div className="machine-spec-footer">
      <span>
        Need help selecting a model?
      </span>

      <Link
        href="/contact"
        className="machine-explore-link"
      >
        Talk to engineering

        <ArrowUpRight size={17} />
      </Link>
    </div>
  </div>
</section>

      {/* FINAL CTA */}

      <section className="machine-detail-cta">
        <div>
          <span className="section-index">
            Talk to Engineering
          </span>

          <h2>
            Discuss your
            <span>
              production requirement.
            </span>
          </h2>
        </div>

        <Link
          href="/contact"
          className="site-quote-button"
        >
          Request a Quote

          <ArrowUpRight size={17} />
        </Link>
      </section>
    </div>
  );
}