"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

// A stable measurement wrapper keeps scroll motion independent of the filter's
// layout animation. Each newly mounted cover owns and cleans up its tracking.
export function ScrollMedia({ children, className, direction = 0 }: { children: ReactNode; className: string; direction?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 45%"] });
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const x = useTransform(scrollYProgress, [0, 1], [direction * 28, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [direction * 5, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.82, 1]);

  return (
    <div ref={ref} className={`relative shrink-0 ${className}`}>
      <motion.div
        className="absolute inset-0 overflow-hidden rounded-3xl border border-line bg-surface"
        style={reduced ? undefined : { x, y, rotate, scale }}
      >
        {children}
      </motion.div>
    </div>
  );
}
