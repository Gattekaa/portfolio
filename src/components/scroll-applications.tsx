"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Opening adds content below the heading being read. Keeping earlier entries
// open preserves document flow and avoids moving the reader's scroll position.
export function ScrollApplications({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root || !("IntersectionObserver" in window)) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let disable: (() => void) | undefined;

    function enable() {
      if (!root) return;
      const items = [...root.querySelectorAll<HTMLDetailsElement>("[data-project-application]")];
      const originalNames = items.map(item => item.getAttribute("name"));
      const summaries = items.map(item => item.querySelector("summary")!);
      const manuallyClosed = new WeakSet<HTMLDetailsElement>();
      const inReadingZone = new Set<Element>();
      let observer: IntersectionObserver;
      let resizeTimer: ReturnType<typeof setTimeout>;
      let paused = false;

      // Progressive disclosure needs independent native details elements.
      // The server-rendered/manual fallback retains the original group name.
      items.forEach(item => item.removeAttribute("name"));
      root.dataset.scrollApplications = "enabled";

      function observe() {
        observer?.disconnect();
        inReadingZone.clear();
        const top = window.innerWidth >= 768 ? 112 : 88;
        const bottom = Math.round(window.innerHeight * 0.45);
        observer = new IntersectionObserver(entries => {
          if (paused) return;
          for (const entry of entries) {
            if (entry.isIntersecting) inReadingZone.add(entry.target);
            else {
              inReadingZone.delete(entry.target);
              const item = entry.target.parentElement;
              if (item instanceof HTMLDetailsElement) manuallyClosed.delete(item);
            }
          }
          items.forEach((item, index) => {
            const summary = summaries[index];
            if (item.open || manuallyClosed.has(item) || !inReadingZone.has(summary)) return;
            // Recheck geometry: a preceding expansion may have moved this
            // heading outside the zone since the observer queued its entries.
            const bounds = summary.getBoundingClientRect();
            if (bounds.bottom > top && bounds.top < window.innerHeight - bottom) item.open = true;
          });
        }, { rootMargin: `-${top}px 0px -${bottom}px 0px`, threshold: 0 });
        summaries.forEach(summary => observer.observe(summary));
      }

      function onClick(event: MouseEvent) {
        if (!(event.target instanceof Element)) return;
        const summary = event.target.closest("summary");
        const item = summary?.parentElement;
        if (!(item instanceof HTMLDetailsElement) || !items.includes(item)) return;
        // Summary activation from Enter/Space also dispatches a click. Never
        // prevent its default behavior or reopen a deliberately collapsed item.
        if (item.open) manuallyClosed.add(item);
        else manuallyClosed.delete(item);
      }
      function onResize() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => { if (!paused) observe(); }, 120);
      }
      function pause() {
        paused = true;
        observer?.disconnect();
        inReadingZone.clear();
        if (root) root.dataset.scrollApplications = "paused";
      }
      function resume() {
        if (!paused) return;
        paused = false;
        if (root) root.dataset.scrollApplications = "enabled";
        observe();
      }
      function onNavigation(event: MouseEvent) {
        if (event.target instanceof Element && event.target.closest("a")) pause();
      }
      function onKeyDown(event: KeyboardEvent) {
        if (["Tab", "Home", "End"].includes(event.key)) { pause(); return; }
        if (event.target instanceof Element) {
          if (event.target.closest("input, textarea, select, [contenteditable=true]")) return;
          if (event.key === " " && event.target.closest("summary")) return;
        }
        if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", " "].includes(event.key)) resume();
      }
      root.addEventListener("click", onClick, true);
      window.addEventListener("resize", onResize, { passive: true });
      window.addEventListener("click", onNavigation, true);
      window.addEventListener("keydown", onKeyDown, true);
      window.addEventListener("wheel", resume, { passive: true });
      window.addEventListener("touchmove", resume, { passive: true });
      observe();
      return () => {
        observer.disconnect();
        clearTimeout(resizeTimer);
        root.removeEventListener("click", onClick, true);
        window.removeEventListener("resize", onResize);
        window.removeEventListener("click", onNavigation, true);
        window.removeEventListener("keydown", onKeyDown, true);
        window.removeEventListener("wheel", resume);
        window.removeEventListener("touchmove", resume);
        items.forEach((item, index) => {
          const name = originalNames[index];
          if (name !== null) item.setAttribute("name", name);
        });
        delete root.dataset.scrollApplications;
      };
    }
    function update() {
      disable?.();
      disable = motion.matches ? undefined : enable();
    }
    update();
    motion.addEventListener("change", update);
    return () => { motion.removeEventListener("change", update); disable?.(); };
  }, []);
  return <div ref={ref} className="mt-6">{children}</div>;
}
