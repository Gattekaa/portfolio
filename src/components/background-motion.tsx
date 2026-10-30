"use client";

import { useEffect } from "react";
import { useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";

const spring = { stiffness: 42, damping: 22, mass: 1 };
const properties = ["--ambient-pointer-x", "--ambient-pointer-y", "--ambient-scroll-y"];

// One controller for all decorative layers. Motion values update only CSS
// transforms, without rendering React on pointer or scroll events.
export function BackgroundMotion() {
  const reduced = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, spring);
  const y = useSpring(pointerY, spring);
  const { scrollYProgress } = useScroll();
  const travel = useTransform(scrollYProgress, [0, 1], [0, -72]);
  const scroll = useSpring(travel, spring);

  useMotionValueEvent(x, "change", value => {
    if (!reduced) document.documentElement.style.setProperty(properties[0], `${value.toFixed(2)}px`);
  });
  useMotionValueEvent(y, "change", value => {
    if (!reduced) document.documentElement.style.setProperty(properties[1], `${value.toFixed(2)}px`);
  });
  useMotionValueEvent(scroll, "change", value => {
    if (!reduced) document.documentElement.style.setProperty(properties[2], `${value.toFixed(2)}px`);
  });

  useEffect(() => {
    const root = document.documentElement;
    const clear = () => properties.forEach(property => root.style.removeProperty(property));
    if (reduced) {
      clear();
      return;
    }
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reset = () => { pointerX.set(0); pointerY.set(0); };
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !fine.matches) return;
      pointerX.set((event.clientX / window.innerWidth - 0.5) * 36);
      pointerY.set((event.clientY / window.innerHeight - 0.5) * 24);
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("blur", reset);
    window.addEventListener("resize", reset);
    document.documentElement.addEventListener("pointerleave", reset);
    fine.addEventListener("change", reset);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("blur", reset);
      window.removeEventListener("resize", reset);
      document.documentElement.removeEventListener("pointerleave", reset);
      fine.removeEventListener("change", reset);
      clear();
    };
  }, [reduced, pointerX, pointerY]);

  return null;
}
