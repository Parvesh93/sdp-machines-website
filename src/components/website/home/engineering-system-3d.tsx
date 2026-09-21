"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const modules = [
  {
    number: "01",
    title: "Structural Frame",
    text: "Rigid architecture engineered for stability under continuous production.",
    className: "engineering-module-frame",
  },
  {
    number: "02",
    title: "Drive System",
    text: "Controlled motion designed for repeatability across long operating cycles.",
    className: "engineering-module-drive",
  },
  {
    number: "03",
    title: "Processing Assembly",
    text: "The working core engineered around precision and production consistency.",
    className: "engineering-module-process",
  },
  {
    number: "04",
    title: "Operator Control",
    text: "Integrated controls for visibility, safety and predictable operation.",
    className: "engineering-module-control",
  },
];

export function EngineeringSystem3D() {
  const sectionRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const scene = sceneRef.current;

    if (!section || !scene) return;

    const ctx = gsap.context(() => {
      const cards =
        gsap.utils.toArray<HTMLElement>(
          ".engineering-3d-module",
        );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        },
      });

      // ENTRY
      tl.fromTo(
        scene,
        {
          scale: 0.72,
          rotateX: 11,
          rotateY: -10,
          y: 70,
        },
        {
          scale: 1,
          rotateX: 0,
          rotateY: 0,
          y: 0,
          duration: 1,
          ease: "none",
        },
      );

      tl.fromTo(
        ".engineering-3d-intro",
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
      );

      // INTRO OUT
      tl.to(
        ".engineering-3d-intro",
        {
          opacity: 0,
          y: -35,
          duration: 0.4,
        },
        0.9,
      );

      // EXPLODE
      tl.to(
        ".engineering-module-frame",
        {
          y: -175,
          z: 120,
          duration: 0.8,
        },
        1.05,
      );

      tl.to(
        ".engineering-module-drive",
        {
          x: -245,
          z: 90,
          duration: 0.8,
        },
        1.05,
      );

      tl.to(
        ".engineering-module-control",
        {
          x: 245,
          z: 90,
          duration: 0.8,
        },
        1.05,
      );

      tl.to(
        ".engineering-module-process",
        {
          y: 175,
          z: 135,
          duration: 0.8,
        },
        1.05,
      );

      tl.fromTo(
        ".engineering-connector",
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.45,
        },
        1.35,
      );

      tl.fromTo(
        ".engineering-3d-detail",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
        },
        1.45,
      );

      // INDIVIDUAL HIGHLIGHTS
      cards.forEach((card, index) => {
        const start =
          1.9 + index * 0.42;

        tl.to(
          cards,
          {
            opacity: 0.35,
            duration: 0.18,
          },
          start,
        );

        tl.to(
          card,
          {
            opacity: 1,
            scale: 1.08,
            z: 170,
            duration: 0.28,
          },
          start,
        );

        tl.to(
          card,
          {
            scale: 1,
            z: 100,
            duration: 0.25,
          },
          start + 0.3,
        );
      });

      // ALL ACTIVE
      tl.to(
        cards,
        {
          opacity: 1,
          duration: 0.3,
        },
        3.75,
      );

      // REASSEMBLE
      tl.to(
        ".engineering-3d-detail",
        {
          opacity: 0,
          duration: 0.3,
        },
        3.9,
      );

      tl.to(
        ".engineering-connector",
        {
          opacity: 0,
          duration: 0.3,
        },
        3.9,
      );

      tl.to(
        ".engineering-module-frame",
        {
          y: 0,
          z: 0,
          duration: 0.8,
        },
        4.05,
      );

      tl.to(
        ".engineering-module-drive",
        {
          x: 0,
          z: 0,
          duration: 0.8,
        },
        4.05,
      );

      tl.to(
        ".engineering-module-control",
        {
          x: 0,
          z: 0,
          duration: 0.8,
        },
        4.05,
      );

      tl.to(
        ".engineering-module-process",
        {
          y: 0,
          z: 0,
          duration: 0.8,
        },
        4.05,
      );

      // EXIT MESSAGE
      tl.fromTo(
        ".engineering-3d-exit",
        {
          opacity: 0,
          y: 45,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
        },
        4.45,
      );

      tl.to(
        scene,
        {
          scale: 0.8,
          opacity: 0.32,
          y: -30,
          duration: 0.8,
        },
        4.45,
      );
    }, section);

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="engineering-3d-section"
    >
      <div className="engineering-3d">
        <div className="engineering-3d-grid" />

        <div className="engineering-3d-meta">
          <span>
            02 / Engineering System
          </span>

          <span>
            Scroll to inspect
          </span>
        </div>

        <div className="engineering-3d-intro">
          <span className="section-index">
            Inside SDP Engineering
          </span>

          <h2>
            Not isolated parts.
            <span>
              One production system.
            </span>
          </h2>
        </div>

        <div
          ref={sceneRef}
          className="engineering-3d-scene"
        >
          <div className="engineering-3d-core" />

          {modules.map((module) => (
            <article
              key={module.number}
              className={`engineering-3d-module ${module.className}`}
            >
              <span>
                {module.number}
              </span>

              <strong>
                {module.title}
              </strong>

              <small>
                {module.text}
              </small>

              <i />
            </article>
          ))}

          <div className="engineering-connector connector-top" />
          <div className="engineering-connector connector-left" />
          <div className="engineering-connector connector-right" />
          <div className="engineering-connector connector-bottom" />
        </div>

        <div className="engineering-3d-detail">
          <span>
            01–04 / SYSTEM
          </span>

          <p>
            Each engineering layer works
            together around stability,
            controlled motion, repeatability
            and continuous production.
          </p>
        </div>

        <div className="engineering-3d-axis">
          <span>X</span>
          <i />
          <span>Y</span>
        </div>

        <div className="engineering-3d-exit">
          <span className="section-index">
            One engineering philosophy
          </span>

          <h2>
            Built around
            <span>
              production.
            </span>
          </h2>
        </div>
      </div>
    </section>
  );
}