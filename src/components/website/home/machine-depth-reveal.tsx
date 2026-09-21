"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function MachineDepthReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const machineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const machine = machineRef.current;

    if (!section || !machine) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
        },
      });

      // Far away / cinematic entrance
      tl.fromTo(
        machine,
        {
          scale: 0.42,
          y: 90,
          rotateX: 6,
          rotateY: -5,
          filter: "blur(5px)",
          opacity: 0.35,
        },
        {
          scale: 0.8,
          y: 20,
          rotateX: 2,
          rotateY: -2,
          filter: "blur(1px)",
          opacity: 0.75,
          duration: 1,
          ease: "none",
        },
      );

      // Machine comes towards camera
      tl.to(
        machine,
        {
          scale: 1.08,
          y: 0,
          rotateX: 0,
          rotateY: 0,
          filter: "blur(0px)",
          opacity: 1,
          duration: 1.1,
          ease: "none",
        },
        0.8,
      );

      // Background word
      tl.fromTo(
        ".depth-word-one",
        {
          opacity: 0,
          x: -160,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
        },
        0.55,
      );

      tl.to(
        ".depth-word-one",
        {
          opacity: 0.09,
          x: 80,
          duration: 0.8,
        },
        1.45,
      );

      // First technical callout
      tl.fromTo(
        ".depth-callout-one",
        {
          opacity: 0,
          x: -40,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.45,
        },
        1.25,
      );

      // Second word
      tl.fromTo(
        ".depth-word-two",
        {
          opacity: 0,
          x: 170,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.75,
        },
        1.7,
      );

      // Machine shifts to create depth
      tl.to(
        machine,
        {
          x: 120,
          scale: 1.18,
          rotateY: 2.5,
          duration: 0.9,
          ease: "none",
        },
        1.7,
      );

      tl.fromTo(
        ".depth-callout-two",
        {
          opacity: 0,
          x: 45,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.45,
        },
        1.95,
      );

      // Grid depth
      tl.to(
        ".machine-depth-grid-back",
        {
          y: -80,
          scale: 1.12,
          duration: 1.3,
          ease: "none",
        },
        1,
      );

      tl.to(
        ".machine-depth-grid-front",
        {
          y: -160,
          scale: 1.3,
          duration: 1.3,
          ease: "none",
        },
        1,
      );

      // Third word / strongest moment
      tl.fromTo(
        ".depth-word-three",
        {
          opacity: 0,
          y: 70,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
        },
        2.5,
      );

      tl.to(
        machine,
        {
          x: -70,
          scale: 1.28,
          rotateY: -2,
          duration: 0.9,
          ease: "none",
        },
        2.5,
      );

      tl.fromTo(
        ".depth-callout-three",
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
        },
        2.7,
      );

      // Exit
      tl.to(
        [
          ".depth-callout-one",
          ".depth-callout-two",
          ".depth-callout-three",
        ],
        {
          opacity: 0,
          duration: 0.35,
        },
        3.25,
      );

      tl.to(
        ".depth-word-three",
        {
          opacity: 0.08,
          y: -40,
          duration: 0.5,
        },
        3.3,
      );

      tl.to(
        machine,
        {
          scale: 0.72,
          y: -120,
          opacity: 0.3,
          duration: 0.9,
          ease: "none",
        },
        3.45,
      );

      tl.fromTo(
        ".machine-depth-exit-copy",
        {
          opacity: 0,
          y: 55,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
        },
        3.55,
      );
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="machine-depth-section"
    >
      <div className="machine-depth-stage">
        <div className="machine-depth-grid-back" />
        <div className="machine-depth-grid-front" />

        <div className="machine-depth-meta">
          <span>
            02 / Engineering Depth
          </span>

          <span>
            Scroll to move through the machine
          </span>
        </div>

        <div className="depth-word depth-word-one">
          PRECISION
        </div>

        <div className="depth-word depth-word-two">
          CONTROL
        </div>

        <div className="depth-word depth-word-three">
          PRODUCTION
        </div>

        <div
          ref={machineRef}
          className="machine-depth-machine"
        >
          <Image
            src="/images/machines/multi-cutter-2.png"
            alt="SDP stone processing machine"
            fill
            sizes="70vw"
            className="machine-depth-image"
            priority
          />
        </div>

        <div className="depth-callout depth-callout-one">
          <span>
            01
          </span>

          <div>
            <strong>
              Structural rigidity
            </strong>

            <small>
              Designed to stay stable through
              continuous production cycles.
            </small>
          </div>
        </div>

        <div className="depth-callout depth-callout-two">
          <span>
            02
          </span>

          <div>
            <strong>
              Controlled motion
            </strong>

            <small>
              Movement designed around
              repeatability and production
              accuracy.
            </small>
          </div>
        </div>

        <div className="depth-callout depth-callout-three">
          <span>
            03
          </span>

          <div>
            <strong>
              Production architecture
            </strong>

            <small>
              Machine systems engineered to
              work as one production platform.
            </small>
          </div>
        </div>

        <div className="machine-depth-exit-copy">
          <span className="section-index">
            One engineering philosophy
          </span>

          <h2>
            Built for
            <span>
              continuous production.
            </span>
          </h2>
        </div>

        <div className="machine-depth-axis">
          <span>Z</span>
          <i />
          <span>DEPTH</span>
        </div>
      </div>
    </section>
  );
}