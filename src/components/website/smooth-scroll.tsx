"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

type SmoothScrollProps = {
  children: ReactNode;
};

function isInteractiveOrNativeScrollTarget(target: EventTarget | null) {
  let element = target instanceof HTMLElement ? target : null;

  while (element && element !== document.body) {
    const styles = window.getComputedStyle(element);
    const overflowY = styles.overflowY;
    const isScrollable =
      (overflowY === "auto" || overflowY === "scroll") &&
      element.scrollHeight > element.clientHeight + 2;

    if (
      isScrollable ||
      element.hasAttribute("data-native-scroll") ||
      element.matches("textarea, select, input[type='range']")
    ) {
      return true;
    }

    element = element.parentElement;
  }

  return false;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const pathname = usePathname();

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointer = window.matchMedia("(pointer: coarse)");

    if (reduceMotion.matches || coarsePointer.matches) return;

    let current = window.scrollY;
    let target = current;
    let rafId: number | null = null;

    const maxScroll = () =>
      Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        0,
      );

    const clampTarget = () => {
      target = Math.min(Math.max(target, 0), maxScroll());
    };

    const render = () => {
      const distance = target - current;
      const eased = distance * 0.11;

      current += eased;

      if (Math.abs(distance) < 0.45) {
        current = target;
      }

      window.scrollTo(0, current);

      if (current !== target) {
        rafId = window.requestAnimationFrame(render);
      } else {
        rafId = null;
      }
    };

    const requestRender = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(render);
      }
    };

    const handleWheel = (event: WheelEvent) => {
      if (
        event.ctrlKey ||
        event.metaKey ||
        isInteractiveOrNativeScrollTarget(event.target)
      ) {
        return;
      }

      event.preventDefault();

      const multiplier = event.deltaMode === 1 ? 18 : event.deltaMode === 2 ? window.innerHeight : 1;
      const delta = event.deltaY * multiplier;

      target += delta * 0.88;
      clampTarget();
      requestRender();
    };

    const syncToNativePosition = () => {
      if (rafId === null) {
        current = window.scrollY;
        target = current;
      }
    };

    const handleResize = () => {
      current = window.scrollY;
      target = current;
      clampTarget();
    };

    const handleClick = (event: MouseEvent) => {
      const targetElement = event.target instanceof Element ? event.target : null;
      const anchor = targetElement?.closest<HTMLAnchorElement>('a[href^="#"]');

      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      const id = decodeURIComponent(href.slice(1));
      const destination = document.getElementById(id);
      if (!destination) return;

      event.preventDefault();

      const headerOffset = 86;
      target = destination.getBoundingClientRect().top + window.scrollY - headerOffset;
      clampTarget();
      requestRender();

      history.pushState(null, "", href);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("scroll", syncToNativePosition, { passive: true });
    window.addEventListener("resize", handleResize);
    document.addEventListener("click", handleClick);

    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }

      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", syncToNativePosition);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("click", handleClick);
    };
  }, [pathname]);

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    const id = decodeURIComponent(hash.slice(1));
    const destination = document.getElementById(id);
    if (!destination) return;

    window.requestAnimationFrame(() => {
      destination.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [pathname]);

  return children;
}
