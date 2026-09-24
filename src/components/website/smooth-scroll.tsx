"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";

type SmoothScrollProps = {
  children: ReactNode;
};

function hasNativeScrollableParent(target: EventTarget | null) {
  let element =
    target instanceof HTMLElement ? target : null;

  while (element && element !== document.body) {
    const styles = window.getComputedStyle(element);
    const overflowY = styles.overflowY;
    const scrollable =
      (overflowY === "auto" || overflowY === "scroll") &&
      element.scrollHeight > element.clientHeight + 2;

    if (
      scrollable ||
      element.hasAttribute("data-native-scroll") ||
      element.tagName === "TEXTAREA" ||
      element.tagName === "SELECT"
    ) {
      return true;
    }

    element = element.parentElement;
  }

  return false;
}

export function SmoothScroll({
  children,
}: SmoothScrollProps) {
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const coarsePointer = window.matchMedia(
      "(pointer: coarse)",
    );

    if (
      reduceMotion.matches ||
      coarsePointer.matches
    ) {
      return;
    }

    let current = window.scrollY;
    let target = current;
    let frame: number | null = null;

    const clampTarget = () => {
      const max =
        document.documentElement.scrollHeight -
        window.innerHeight;

      target = Math.min(
        Math.max(target, 0),
        Math.max(max, 0),
      );
    };

    const animate = () => {
      const distance = target - current;

      current += distance * 0.105;

      if (Math.abs(distance) < 0.35) {
        current = target;
      }

      window.scrollTo(0, current);

      if (current !== target) {
        frame = window.requestAnimationFrame(
          animate,
        );
      } else {
        frame = null;
      }
    };

    const startAnimation = () => {
      if (frame === null) {
        frame = window.requestAnimationFrame(
          animate,
        );
      }
    };

    const handleWheel = (event: WheelEvent) => {
      if (
        event.ctrlKey ||
        event.metaKey ||
        hasNativeScrollableParent(event.target)
      ) {
        return;
      }

      event.preventDefault();

      target += event.deltaY * 0.9;
      clampTarget();
      startAnimation();
    };

    const handleScroll = () => {
      if (frame === null) {
        current = window.scrollY;
        target = current;
      }
    };

    const handleResize = () => {
      current = window.scrollY;
      target = current;
      clampTarget();
    };

    window.addEventListener(
      "wheel",
      handleWheel,
      { passive: false },
    );

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true },
    );

    window.addEventListener(
      "resize",
      handleResize,
    );

    return () => {
      if (frame !== null) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener(
        "wheel",
        handleWheel,
      );

      window.removeEventListener(
        "scroll",
        handleScroll,
      );

      window.removeEventListener(
        "resize",
        handleResize,
      );
    };
  }, []);

  return children;
}
