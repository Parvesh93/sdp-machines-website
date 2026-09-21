"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
} from "react";

import gsap from "gsap";

export function HeroMachineVisual() {
  const visualRef =
    useRef<HTMLDivElement>(null);

  const imageRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
  const visual = visualRef.current;
  const image = imageRef.current;

  if (!visual || !image) {
    return;
  }

  const handlePointerMove = (
    event: PointerEvent,
  ) => {
    const rect =
      visual.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) /
        rect.width -
      0.5;

    const y =
      (event.clientY - rect.top) /
        rect.height -
      0.5;

    gsap.to(image, {
      rotateY: x * 7,
      rotateX: y * -5,
      x: x * 16,
      y: y * 10,
      duration: 1,
      ease: "power3.out",
      transformPerspective: 1200,
    });
  };

  const handlePointerLeave = () => {
    gsap.to(image, {
      rotateX: 0,
      rotateY: 0,
      x: 0,
      y: 0,
      duration: 1.2,
      ease: "power3.out",
    });
  };

  visual.addEventListener(
    "pointermove",
    handlePointerMove,
  );

  visual.addEventListener(
    "pointerleave",
    handlePointerLeave,
  );

  return () => {
    visual.removeEventListener(
      "pointermove",
      handlePointerMove,
    );

    visual.removeEventListener(
      "pointerleave",
      handlePointerLeave,
    );
  };
}, []);

  return (
    <div
      ref={visualRef}
      className="hero-machine-visual"
    >
      <div className="hero-machine-ring hero-machine-ring-large" />

      <div className="hero-machine-ring hero-machine-ring-small" />

      <div className="hero-machine-axis hero-machine-axis-x" />

      <div className="hero-machine-axis hero-machine-axis-y" />

      <div className="hero-machine-floor" />

      <div
        ref={imageRef}
        className="hero-machine-image-wrap"
      >
        <div className="hero-machine-shadow" />

        <Image
          src="/images/machines/multi-cutter-3.png"
          alt="SDP stone processing machine"
          width={1100}
          height={850}
          priority
          className="hero-machine-image"
        />
      </div>

      <div className="hero-machine-marker marker-a">
        <span />
      </div>

      <div className="hero-machine-marker marker-b">
        <span />
      </div>

      <div className="hero-machine-marker marker-c">
        <span />
      </div>
    </div>
  );
}