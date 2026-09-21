"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

const machines = [
  {
    number: "01",
    title: "Multi Cutters",
    subtitle: "Automatic Bridge-Type",
    description:
      "Heavy-duty multi-blade cutting systems engineered for high-output stone processing.",
    image:
      "/images/machines/multi-cutter-3.png",
    href: "/machines/multi-cutters",
  },
  {
    number: "02",
    title: "Line Polishing",
    subtitle: "Surface Processing Systems",
    description:
      "Continuous polishing technology designed for consistent surface finish and production efficiency.",
    image:
      "/images/machines/lpm-1.png",
    href: "/machines/line-polishing",
  },
  {
    number: "03",
    title: "Thin Wire",
    subtitle: "Precision Cutting Systems",
    description:
      "Precision wire cutting solutions developed for controlled, accurate stone processing.",
    image:
      "/images/machines/thin-wire-1.png",
    href: "/machines/thin-wire",
  },
  {
    number: "04",
    title: "Handling & Cranes",
    subtitle: "Material Handling",
    description:
      "Industrial handling systems engineered around safer and more efficient stone movement.",
    image:
      "/images/machines/gantry.jpg",
    href: "/machines/handling-cranes",
  },
];

export function MachineShowcase() {
  const [activeIndex, setActiveIndex] =
    useState(0);

  const activeMachine =
    machines[activeIndex];

  return (
    <section className="machine-showcase">
      <div className="machine-showcase-head">
        <div>
          <span className="section-index">
            02 / Machine Range
          </span>

          <h2>
            Machines built around
            <span>
              the way you produce.
            </span>
          </h2>
        </div>

        <p>
          From primary cutting to surface
          finishing and material handling,
          SDP systems are engineered around
          the demands of continuous stone
          production.
        </p>
      </div>

      <div className="machine-showcase-body">
        <div className="machine-index">
          {machines.map(
            (machine, index) => {
              const active =
                index === activeIndex;

              return (
                <button
                  key={machine.number}
                  type="button"
                  className={
                    active
                      ? "machine-index-item machine-index-item-active"
                      : "machine-index-item"
                  }
                  onMouseEnter={() =>
                    setActiveIndex(index)
                  }
                  onFocus={() =>
                    setActiveIndex(index)
                  }
                  onClick={() =>
                    setActiveIndex(index)
                  }
                >
                  <span className="machine-index-number">
                    {machine.number}
                  </span>

                  <span className="machine-index-copy">
                    <small>
                      {machine.subtitle}
                    </small>

                    <strong>
                      {machine.title}
                    </strong>
                  </span>

                  <ArrowUpRight
                    className="machine-index-arrow"
                    size={20}
                  />
                </button>
              );
            },
          )}
        </div>

        <div className="machine-stage">
          <div className="machine-stage-grid" />

          <span className="machine-stage-number">
            {activeMachine.number}
          </span>

          <div
            className="machine-stage-image"
            key={activeMachine.image}
          >
            <Image
              src={activeMachine.image}
              alt={activeMachine.title}
              fill
              sizes="(max-width: 900px) 100vw, 55vw"
              className="machine-stage-img"
            />
          </div>

          <div className="machine-stage-meta">
            <p>
              {activeMachine.description}
            </p>

            <Link
              href={activeMachine.href}
              className="machine-explore-link"
            >
              Explore machine

              <ArrowUpRight
                size={17}
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}