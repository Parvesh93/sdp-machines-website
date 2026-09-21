"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
} from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function EngineeringTransition() {
  const sectionRef =
    useRef<HTMLElement>(null);

  useEffect(() => {
    const section =
      sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      const timeline =
        gsap.timeline({
          scrollTrigger: {
            trigger: section,

            start: "top top",

            end: "+=2400",

            scrub: 1,

            pin: true,

            anticipatePin: 1,
          },
        });

      /*
       * PHASE 1
       * Machine arrives
       */

      timeline
        .fromTo(
          ".engineering-machine-normal",
          {
            scale: 0.85,
            y: 80,
          },
          {
            scale: 1.05,
            y: 0,
            duration: 1,
            ease: "none",
          },
        )

        /*
         * PHASE 2
         * Intro copy
         */

        .fromTo(
          ".engineering-intro",
          {
            opacity: 0,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
          },
          0.1,
        )

        /*
         * Normal machine fades
         */

        .to(
          ".engineering-intro",
          {
            opacity: 0,
            y: -30,
            duration: 0.35,
          },
          1,
        )

        /*
         * Blueprint version appears
         */

        .to(
          ".engineering-machine-normal",
          {
            opacity: 0.15,
            duration: 0.6,
          },
          1,
        )

        .fromTo(
          ".engineering-machine-blueprint",
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 0.7,
          },
          1,
        )

        /*
         * Blueprint grid becomes visible
         */

        .fromTo(
          ".engineering-blueprint-grid",
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 0.5,
          },
          1.15,
        )

        /*
         * Measurements
         */

        .fromTo(
          ".engineering-measurement",
          {
            opacity: 0,
            scaleX: 0,
          },
          {
            opacity: 1,
            scaleX: 1,
            stagger: 0.12,
            duration: 0.4,
            transformOrigin: "left center",
          },
          1.3,
        )

        /*
         * Phase heading
         */

        .fromTo(
          ".engineering-phase-copy",
          {
            opacity: 0,
            y: 25,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
          },
          1.35,
        )

        /*
         * Callouts
         */

        .fromTo(
          ".engineering-callout",
          {
            opacity: 0,
            x: 20,
          },
          {
            opacity: 1,
            x: 0,
            stagger: 0.15,
            duration: 0.45,
          },
          1.8,
        )

        /*
         * Markers
         */

        .fromTo(
          ".engineering-node",
          {
            opacity: 0,
            scale: 0,
          },
          {
            opacity: 1,
            scale: 1,
            stagger: 0.1,
            duration: 0.35,
          },
          1.75,
        )

        /*
         * Slight simulated exploded movement
         */

        .to(
          ".engineering-machine-blueprint",
          {
            scale: 1.08,
            x: 20,
            duration: 0.8,
          },
          2.1,
        )

        .to(
          ".engineering-callout-one",
          {
            x: -35,
            duration: 0.6,
          },
          2.25,
        )

        .to(
          ".engineering-callout-two",
          {
            x: 35,
            duration: 0.6,
          },
          2.25,
        )

        .to(
          ".engineering-callout-three",
          {
            y: -25,
            duration: 0.6,
          },
          2.25,
        )

        /*
         * End transition
         */

        .to(
          ".engineering-phase-copy",
          {
            opacity: 0,
            y: -20,
            duration: 0.4,
          },
          3,
        )

        .to(
          ".engineering-callout",
          {
            opacity: 0,
            duration: 0.35,
          },
          3,
        )

        .to(
          ".engineering-measurement",
          {
            opacity: 0,
            duration: 0.35,
          },
          3,
        )

        .to(
          ".engineering-machine-blueprint",
          {
            scale: 0.72,
            y: -110,
            opacity: 0,
            duration: 0.9,
          },
          3.15,
        )

        .fromTo(
          ".engineering-exit-copy",
          {
            opacity: 0,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
          },
          3.2,
        );
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="engineering-transition"
    >
      <div className="engineering-transition-grid" />

      <div className="engineering-blueprint-grid" />

      <div className="engineering-top-meta">
        <span>
          02 / Inside the Machine
        </span>

        <span>
          SDP Engineering System
        </span>
      </div>

      {/* INTRO */}

      <div className="engineering-intro">
        <span className="section-index">
          Engineering Intelligence
        </span>

        <h2>
          Built as a system.
          <span>
            Not an assembly of parts.
          </span>
        </h2>
      </div>

      {/* MACHINE */}

      <div className="engineering-machine-stage">
        <div className="engineering-machine-normal">
          <Image
            src="/images/machines/multi-cutter-3.png"
            alt="SDP stone processing machine"
            fill
            sizes="70vw"
            className="engineering-machine-image"
          />
        </div>

        <div className="engineering-machine-blueprint">
          <Image
            src="/images/machines/multi-cutter-2.png"
            alt=""
            fill
            sizes="70vw"
            className="engineering-machine-image engineering-machine-image-blueprint"
          />
        </div>

        {/* ENGINEERING NODES */}

        <span className="engineering-node node-one" />
        <span className="engineering-node node-two" />
        <span className="engineering-node node-three" />
        <span className="engineering-node node-four" />

        {/* DIMENSION LINES */}

        <div className="engineering-measurement measurement-width">
          <span />
          <small>
            X / Machine Width
          </small>
        </div>

        <div className="engineering-measurement measurement-height">
          <span />
          <small>
            Y / Working Height
          </small>
        </div>
      </div>

      {/* PHASE COPY */}

      <div className="engineering-phase-copy">
        <span>
          Engineering Layer / 01
        </span>

        <h3>
          Every assembly has
          <strong>
            a production purpose.
          </strong>
        </h3>
      </div>

      {/* CALLOUTS */}

      <div className="engineering-callout engineering-callout-one">
        <span>
          01
        </span>

        <div>
          <strong>
            Structural Frame
          </strong>

          <small>
            Designed for rigidity under
            continuous production loads.
          </small>
        </div>
      </div>

      <div className="engineering-callout engineering-callout-two">
        <span>
          02
        </span>

        <div>
          <strong>
            Cutting Assembly
          </strong>

          <small>
            Controlled cutting movement
            engineered for repeatability.
          </small>
        </div>
      </div>

      <div className="engineering-callout engineering-callout-three">
        <span>
          03
        </span>

        <div>
          <strong>
            Drive System
          </strong>

          <small>
            Industrial drive architecture
            built for long operating cycles.
          </small>
        </div>
      </div>

      <div className="engineering-callout engineering-callout-four">
        <span>
          04
        </span>

        <div>
          <strong>
            Operator Control
          </strong>

          <small>
            Centralised control for safer,
            repeatable machine operation.
          </small>
        </div>
      </div>

      {/* END COPY */}

      <div className="engineering-exit-copy">
        <span className="section-index">
          One engineering philosophy.
        </span>

        <h2>
          Different machines.
          <span>
            Built around production.
          </span>
        </h2>
      </div>

      <div className="engineering-progress">
        <span>
          Scroll
        </span>

        <div className="engineering-progress-line" />
      </div>
    </section>
  );
}