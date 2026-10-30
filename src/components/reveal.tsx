"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Progressive enhancement: server-rendered content is visible without JavaScript.
export function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!el || reduced.matches || !("IntersectionObserver" in window)) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    el.dataset.reveal = "pending";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.reveal = "visible";
          observer.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    observer.observe(el);
    const onMotionChange = () => {
      if (reduced.matches) {
        el.dataset.reveal = "visible";
        observer.disconnect();
      }
    };
    reduced.addEventListener("change", onMotionChange);
    return () => {
      observer.disconnect();
      reduced.removeEventListener("change", onMotionChange);
      delete el.dataset.reveal;
    };
  }, []);
  return (
    <div
      ref={ref}
      className={`transition-[transform,opacity] duration-750 ease-out-expo data-[reveal=pending]:translate-y-5 data-[reveal=pending]:opacity-0 motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:transition-none ${className}`}
    >
      {children}
    </div>
  );
}
