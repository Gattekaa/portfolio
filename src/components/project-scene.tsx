"use client";

import { useRef, useSyncExternalStore, type FocusEvent, type ReactNode } from "react";
import { useScroll, useTransform } from "motion/react";
import * as m from "motion/react-m";

const query = "(min-width:1024px) and (min-height:700px) and (prefers-reduced-motion:no-preference)";
const snapshot = () => window.matchMedia(query).matches;
const serverSnapshot = () => false;
function subscribe(notify: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener("change", notify);
  return () => media.removeEventListener("change", notify);
}

// Natural-flow markers provide stable measurements while the showcase stays
// sticky. The next scene folds the preceding scene away, including on reverse.
export function ProjectScene({ children, index, hasNext, pair }: {
  children: ReactNode; index: number; hasNext: boolean; pair: boolean;
}) {
  const start = useRef<HTMLDivElement>(null);
  const end = useRef<HTMLDivElement>(null);
  const enhanced = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const { scrollYProgress } = useScroll({ target: end, offset: ["start end", "start 112px"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.86]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -64]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, -7]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.75, 1], [1, 0.6, 0, 0]);
  const pointerEvents = useTransform(scrollYProgress, value => value >= 0.75 ? "none" : "auto");

  function revealFocusedScene(event: FocusEvent<HTMLDivElement>) {
    if (!enhanced || !(event.target instanceof HTMLElement)) return;
    if (event.target.matches(":focus-visible") && getComputedStyle(event.currentTarget).position === "sticky") {
      start.current?.scrollIntoView({ block: "start", behavior: "auto" });
    }
  }
  return <>
    <div ref={start} aria-hidden="true" />
    <div
      data-project-scene
      onFocusCapture={revealFocusedScene}
      className="relative isolate grid items-center py-6 lg:motion-safe:[@media(min-height:700px)]:sticky lg:motion-safe:[@media(min-height:700px)]:top-28 lg:motion-safe:[@media(min-height:700px)]:min-h-[calc(100svh-124px)] lg:motion-safe:[@media(min-height:700px)]:py-5"
      // Three project scenes stack below the navigation's z-20 layer.
      style={{ zIndex: index + 1 }}
    >
      <m.div
        data-project-scene-inner
        className={pair ? "grid grid-cols-1 items-stretch gap-10 md:grid-cols-2 md:gap-8" : "min-w-0"}
        style={enhanced && hasNext ? { scale, y, rotateX, opacity, pointerEvents, transformPerspective: 1200, transformOrigin: "center top" } : { opacity: 1, pointerEvents: "auto" }}
      >{children}</m.div>
    </div>
    <div ref={end} aria-hidden="true" />
  </>;
}
