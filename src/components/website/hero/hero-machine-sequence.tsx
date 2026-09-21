"use client";

import Image from "next/image";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import gsap from "gsap";

type MachineSlide = {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageClass?: string;
};

const slides: MachineSlide[] = [
  {
    number: "01",
    eyebrow: "LPM 16 Head",
    title: "Precision polishing architecture",
    description:
      "Multi-head surface processing engineered for repeatable finish and continuous production.",
    image:
      "/images/machines/lpm/lpm-hero-isometric.jpg",
    imageClass:
      "hero-sequence-image-isometric",
  },

  {
    number: "02",
    eyebrow: "Engineering Profile",
    title: "16-head processing system",
    description:
      "A controlled polishing platform built around consistency, access and long operating cycles.",
    image:
      "/images/machines/lpm/lpm-front.jpg",
    imageClass:
      "hero-sequence-image-front",
  },

  {
    number: "03",
    eyebrow: "Complete Production Line",
    title: "Integrated material flow",
    description:
      "Loading, processing and unloading systems designed as one continuous production architecture.",
    image:
      "/images/machines/lpm/lpm-full-line.jpg",
    imageClass:
      "hero-sequence-image-line",
  },
];

export function HeroMachineSequence() {
  const rootRef =
    useRef<HTMLDivElement>(null);

  const imageRef =
    useRef<HTMLDivElement>(null);

  const contentRef =
    useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] =
    useState(0);

  const activeSlide =
    slides[activeIndex];

  useEffect(() => {
    const root =
      rootRef.current;

    const image =
      imageRef.current;

    if (!root || !image) {
      return;
    }

    const handlePointerMove = (
      event: PointerEvent,
    ) => {
      const rect =
        root.getBoundingClientRect();

      const x =
        (event.clientX -
          rect.left) /
          rect.width -
        0.5;

      const y =
        (event.clientY -
          rect.top) /
          rect.height -
        0.5;

      gsap.to(image, {
        x: x * 16,
        y: y * 10,

        rotateY: x * 3,
        rotateX: y * -2,

        duration: 1.1,

        ease: "power3.out",

        transformPerspective: 1400,
      });
    };

    const handlePointerLeave = () => {
      gsap.to(image, {
        x: 0,
        y: 0,
        rotateX: 0,
        rotateY: 0,

        duration: 1.2,

        ease: "power3.out",
      });
    };

    root.addEventListener(
      "pointermove",
      handlePointerMove,
    );

    root.addEventListener(
      "pointerleave",
      handlePointerLeave,
    );

    return () => {
      root.removeEventListener(
        "pointermove",
        handlePointerMove,
      );

      root.removeEventListener(
        "pointerleave",
        handlePointerLeave,
      );
    };
  }, []);

  useEffect(() => {
    const interval =
      window.setInterval(() => {
        const image =
          imageRef.current;

        const content =
          contentRef.current;

        if (!image || !content) {
          return;
        }

        const timeline =
          gsap.timeline();

        timeline
          .to(
            content,
            {
              opacity: 0,
              y: -12,
              duration: 0.3,
              ease: "power2.in",
            },
          )

          .to(
            image,
            {
              opacity: 0,
              scale: 1.06,
              x: -30,
              duration: 0.42,
              ease: "power2.in",
            },
            0,
          )

          .call(() => {
            setActiveIndex(
              (current) =>
                (current + 1) %
                slides.length,
            );
          })

          .set(image, {
            x: 40,
            scale: 0.94,
          })

          .to(
            image,
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 0.75,
              ease: "power3.out",
            },
          )

          .to(
            content,
            {
              opacity: 1,
              y: 0,
              duration: 0.55,
              ease: "power3.out",
            },
            "-=0.5",
          );
      }, 4800);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  function selectSlide(
    index: number,
  ) {
    if (
      index === activeIndex
    ) {
      return;
    }

    const image =
      imageRef.current;

    const content =
      contentRef.current;

    if (!image || !content) {
      setActiveIndex(index);
      return;
    }

    gsap
      .timeline()

      .to(
        [image, content],
        {
          opacity: 0,
          duration: 0.25,
        },
      )

      .call(() => {
        setActiveIndex(index);
      })

      .set(image, {
        x: 35,
        scale: 0.95,
      })

      .to(
        image,
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.65,
          ease: "power3.out",
        },
      )

      .to(
        content,
        {
          opacity: 1,
          duration: 0.4,
        },
        "-=0.4",
      );
  }

  return (
    <div
      ref={rootRef}
      className="hero-sequence"
    >
      <div className="hero-sequence-orbit hero-sequence-orbit-one" />

      <div className="hero-sequence-orbit hero-sequence-orbit-two" />

      <div className="hero-sequence-crosshair">
        <span />
        <span />
      </div>

      <div
        ref={imageRef}
        className="hero-sequence-image-wrap"
      >
        <div className="hero-sequence-machine-shadow" />

        <Image
          key={activeSlide.image}
          src={activeSlide.image}
          alt={activeSlide.title}
          fill
          priority
          sizes="55vw"
          className={`hero-sequence-image ${
            activeSlide.imageClass ??
            ""
          }`}
        />
      </div>

      <div className="hero-sequence-node hero-sequence-node-a">
        <span />
      </div>

      <div className="hero-sequence-node hero-sequence-node-b">
        <span />
      </div>

      <div
        ref={contentRef}
        className="hero-sequence-content"
      >
        <div className="hero-sequence-meta">
          <span>
            {activeSlide.number}
          </span>

          <small>
            {activeSlide.eyebrow}
          </small>
        </div>

        <strong>
          {activeSlide.title}
        </strong>

        <p>
          {activeSlide.description}
        </p>
      </div>

      <div className="hero-sequence-controls">
        {slides.map(
          (slide, index) => (
            <button
              key={slide.number}
              type="button"
              aria-label={`Show ${slide.title}`}
              className={
                index ===
                activeIndex
                  ? "hero-sequence-dot hero-sequence-dot-active"
                  : "hero-sequence-dot"
              }
              onClick={() =>
                selectSlide(
                  index,
                )
              }
            >
              <span>
                {slide.number}
              </span>
            </button>
          ),
        )}
      </div>

      <div className="hero-sequence-label">
        SDP / MACHINE SYSTEM
      </div>
    </div>
  );
}