"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
} from "react";

import gsap from "gsap";

export function HeroMachineVisual() {
  const visualRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const visual = visualRef.current;
    const image = imageRef.current;

    if (!visual || !image) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to(".hero-machine-marker", {
        scale: 1.18,
        opacity: 1,
        duration: 1.4,
        ease: "sine.inOut",
        stagger: 0.4,
        repeat: -1,
        yoyo: true,
      });
    }, visual);

    const handlePointerMove = (event: PointerEvent) => {
      const rect = visual.getBoundingClientRect();

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
      ctx.revert();

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

  const markerClass =
    "hero-machine-marker pointer-events-none absolute z-[6] grid h-[15px] w-[15px] place-items-center rounded-full border border-[rgba(216,255,62,0.45)] opacity-75";

  return (
    <div
      ref={visualRef}
      className="absolute inset-0 grid place-items-center [perspective:1200px]"
    >
      <div className="hero-machine-ring pointer-events-none absolute h-[610px] w-[610px] rounded-full border border-[rgba(216,255,62,0.15)] max-[950px]:h-[480px] max-[950px]:w-[480px] max-[650px]:h-[330px] max-[650px]:w-[330px]">
        <span className="absolute left-[4%] top-[18%] h-[7px] w-[7px] rounded-full border border-[rgba(216,255,62,0.55)] bg-[#0b0c0c]" />
        <span className="absolute bottom-[16%] right-[7%] h-[7px] w-[7px] rounded-full border border-[rgba(216,255,62,0.55)] bg-[#0b0c0c]" />
      </div>

      <div className="hero-machine-ring pointer-events-none absolute h-[430px] w-[430px] rounded-full border border-white/[0.07] [transform:rotateX(64deg)_rotateZ(-12deg)] max-[950px]:h-[340px] max-[950px]:w-[340px] max-[650px]:h-[250px] max-[650px]:w-[250px]" />

      <div className="pointer-events-none absolute h-px w-[82%] bg-white/[0.075]" />
      <div className="pointer-events-none absolute h-[78%] w-px bg-white/[0.075]" />

      <div className="pointer-events-none absolute bottom-0 h-[300px] w-[85%] origin-bottom opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:40px_40px] [mask-image:linear-gradient(to_top,black,transparent_80%)] [transform:perspective(900px)_rotateX(69deg)] max-[650px]:w-[120%]" />

      <div
        ref={imageRef}
        className="hero-machine-image-wrap relative z-[4] w-[88%] max-w-[880px] origin-center [transform-style:preserve-3d] will-change-transform max-[950px]:w-[76%] max-[650px]:w-full"
      >
        <div className="absolute bottom-[2%] left-[12%] right-[10%] -z-10 h-[15%] rounded-full bg-black/70 blur-[30px] [transform:translateZ(-80px)_scaleX(1.12)]" />

        <Image
          src="/images/machines/multi-cutter-3.png"
          alt="SDP stone processing machine"
          width={1100}
          height={850}
          priority
          className="block h-auto w-full object-contain [filter:contrast(1.05)_saturate(0.88)_drop-shadow(0_34px_38px_rgba(0,0,0,0.58))]"
        />
      </div>

      <div className={`${markerClass} left-[35%] top-[30%] max-[650px]:hidden`}>
        <span className="h-[3px] w-[3px] rounded-full bg-[var(--site-accent)] shadow-[0_0_12px_rgba(216,255,62,0.8)]" />
        <i className="absolute -inset-[7px] rounded-full border border-[rgba(216,255,62,0.12)]" />
      </div>

      <div className={`${markerClass} right-[17%] top-[47%] max-[650px]:hidden`}>
        <span className="h-[3px] w-[3px] rounded-full bg-[var(--site-accent)] shadow-[0_0_12px_rgba(216,255,62,0.8)]" />
        <i className="absolute -inset-[7px] rounded-full border border-[rgba(216,255,62,0.12)]" />
      </div>

      <div className={`${markerClass} bottom-[25%] left-[47%] max-[650px]:hidden`}>
        <span className="h-[3px] w-[3px] rounded-full bg-[var(--site-accent)] shadow-[0_0_12px_rgba(216,255,62,0.8)]" />
        <i className="absolute -inset-[7px] rounded-full border border-[rgba(216,255,62,0.12)]" />
      </div>
    </div>
  );
}
