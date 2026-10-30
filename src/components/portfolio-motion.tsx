"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { observeApproach } from "@/lib/observe-approach";

// Only enhance the server-rendered page after its first paint. Navigation and
// content remain available before the animation module loads or without JS.
export function PortfolioMotion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    let disposed = false;
    let teardown: (() => void) | undefined;

    async function enhance() {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (disposed || !root?.isConnected) return;
      gsap.registerPlugin(ScrollTrigger);
      const media = gsap.matchMedia(root);
      media.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          desktop: "(min-width: 1024px) and (min-height: 700px)",
        },
        (context) => {
          if (!context.conditions?.motion) return;
          const desktop = context.conditions.desktop;
          root.dataset.scrollMotion = desktop ? "desktop" : "compact";
          const find = <T extends HTMLElement>(selector: string) =>
            root.querySelector<T>(selector);
          const observers: (() => void)[] = [];
          const near = (element: Element | null | undefined, animate: () => void) => {
            if (element) observers.push(observeApproach(element, () => context.add(animate)));
          };
          const hero = find("[data-scroll-hero]");
          const track = find("[data-hero-track]");
          const frame = find("[data-hero-frame]");
          if (hero && track && frame && desktop) {
            const intro = gsap.timeline({
              scrollTrigger: {
                trigger: track, start: "top 100px",
                end: () => "+=" + (track.offsetHeight - hero.offsetHeight),
                scrub: 0.6, invalidateOnRefresh: true,
              },
            });
            intro
              .to("[data-hero-line]", { xPercent: (index: number) => index ? 55 : -55, yPercent: -110, duration: 0.4, stagger: 0.06, ease: "power2.in" }, 0.1)
              .to("[data-hero-support]", { y: -75, autoAlpha: 0, duration: 0.24, stagger: 0.03 }, 0.12)
              .to(frame, { x: () => hero.clientWidth / 2 - (frame.offsetLeft + frame.offsetWidth / 2), scale: 1.08, duration: 0.4, ease: "power2.inOut" }, 0.18)
              .to("[data-hero-node]", { xPercent: (index: number) => [-18, 18, 0, 0][index], y: (index: number) => [-16, -16, 20, 30][index], duration: 0.25 }, 0.32)
              .to("[data-hero-connector]", { scaleY: 0, opacity: 0, transformOrigin: "center top", duration: 0.25 }, 0.32)
              .to(frame, { y: -90, scale: 0.8, autoAlpha: 0, duration: 0.25 }, 0.65)
              .fromTo("[data-hero-conclusion]", { autoAlpha: 0, y: 90, scale: 0.72 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.28, ease: "power2.out" }, 0.69)
              .to({}, { duration: 0.12 });
          } else if (hero) {
            gsap.to("[data-hero-line]", {
              x: (index: number) => index ? 25 : -25,
              ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.6 },
            });
            gsap.to("[data-hero-node]", {
              x: (index: number) => [-22, 22, 0, 0][index],
              y: (index: number) => [-16, -16, 15, 25][index], ease: "none",
              scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.6 },
            });
          }

          near(find("#projetos"), () => { gsap.fromTo("[data-work-title]", { yPercent: 105, x: -90, rotate: -3 }, {
            yPercent: 0, x: 0, rotate: 0, ease: "power2.out",
            scrollTrigger: { trigger: "#projetos", start: "top 92%", end: "top 45%", scrub: 0.55 },
          }); });

          const about = find("#sobre");
          if (about) near(about, () => {
            const portrait = gsap.timeline({
              scrollTrigger: { trigger: about, start: "top 85%", end: "top 30%", scrub: 0.65 },
            });
            portrait
              .fromTo("[data-about-curtain]", { autoAlpha: 1, yPercent: 0 }, { yPercent: -101, duration: 0.55, ease: "power2.inOut" }, 0)
              .fromTo("[data-about-portrait]", { y: 100, rotate: -5, scale: 0.88 }, { y: 0, rotate: 0, scale: 1, duration: 0.7, ease: "power2.out" }, 0)
              .fromTo("[data-about-title]", { yPercent: 110, x: 50 }, { yPercent: 0, x: 0, duration: 0.45 }, 0.1);
            gsap.fromTo("[data-about-image]", { scale: 1.22, yPercent: 5 }, {
              scale: 1.02, yPercent: -2, ease: "none",
              scrollTrigger: { trigger: about, start: "top bottom", end: "bottom top", scrub: 0.7 },
            });
            const words = about.querySelectorAll("[data-about-word]");
            gsap.fromTo(words, { yPercent: 110, rotate: 5 }, {
              yPercent: 0, rotate: 0, stagger: 0.025, ease: "power1.out",
              scrollTrigger: { trigger: about, start: "top 80%", end: "top 15%", scrub: 0.55 },
            });
            gsap.fromTo("[data-about-secondary]", { y: 65 }, {
              y: 0, stagger: 0.1, ease: "power2.out",
              scrollTrigger: { trigger: about, start: "top 68%", end: "top 12%", scrub: 0.55 },
            });
          });

          const career = find("[data-career]");
          if (career) near(career, () => {
            gsap.fromTo("[data-career-title]", { yPercent: 110, rotate: -3 }, {
              yPercent: 0, rotate: 0, stagger: 0.16, ease: "power2.out",
              scrollTrigger: { trigger: career, start: "top 88%", end: "top 35%", scrub: 0.55 },
            });
            gsap.fromTo("[data-career-rail]", { scaleY: 0 }, {
              scaleY: 1, ease: "none",
              scrollTrigger: { trigger: "[data-career-list]", start: "top 70%", end: "bottom 55%", scrub: 0.6 },
            });
            career.querySelectorAll<HTMLElement>("[data-career-row]").forEach(row => {
              const step = gsap.timeline({ scrollTrigger: { trigger: row, start: "top 92%", end: "top 45%", scrub: 0.55 } });
              step
                .fromTo(row.querySelector("[data-career-company]"), { x: desktop ? -65 : -25, y: 30 }, { x: 0, y: 0, duration: 0.5 }, 0)
                .fromTo(row.querySelector("[data-career-date]"), { x: desktop ? 36 : 14 }, { x: 0, duration: 0.5 }, 0.08)
                .fromTo(row.querySelector("[data-career-description]"), { y: 70 }, { y: 0, duration: 0.5 }, 0.12)
                .fromTo(row.querySelector("[data-career-rule]"), { scaleX: 0 }, { scaleX: 1, duration: 0.6 }, 0.1);
            });
          });

          const footer = root.parentElement?.querySelector("footer");
          if (footer) near(footer, () => { gsap.fromTo(footer.children, { y: 30, x: (index: number) => index ? 25 : -25 }, {
            y: 0, x: 0, stagger: 0.1, ease: "power2.out",
            scrollTrigger: { trigger: footer, start: "top 98%", end: "bottom bottom", scrub: 0.5 },
          }); });

          const contact = find("#contato");
          if (contact) near(contact, () => {
            const finale = gsap.timeline({
              scrollTrigger: { trigger: contact, start: "top 95%", end: "top 22%", scrub: 0.55 },
            });
            finale
              .fromTo("[data-contact-wash]", { scale: 0.015 }, { scale: 1.7, duration: 1, ease: "power1.inOut" }, 0)
              .fromTo("[data-contact-line]", { yPercent: 115, x: (index: number) => index ? 90 : -90, rotate: (index: number) => index ? 3 : -3 }, { yPercent: 0, x: 0, rotate: 0, duration: 0.55, stagger: 0.15, ease: "power2.out" }, 0.15);
          });
          return () => { observers.forEach(disconnect => disconnect()); delete root.dataset.scrollMotion; };
        },
      );

      // Filters change the height above the sticky column. Safe refresh waits
      // for scrolling to finish, preserving native smooth anchor navigation.
      let refreshTimer: ReturnType<typeof setTimeout>;
      let projectHeight: number | undefined;
      const observer = new ResizeObserver(([entry]) => {
        const height = entry.contentRect.height;
        if (projectHeight === undefined) { projectHeight = height; return; }
        if (height === projectHeight) return;
        projectHeight = height;
        clearTimeout(refreshTimer);
        refreshTimer = setTimeout(() => { if (!disposed) ScrollTrigger.refresh(true); }, 400);
      });
      const projects = root.querySelector("#projetos");
      if (projects) observer.observe(projects);
      if (document.fonts.status === "loading") {
        void document.fonts.ready.then(() => { if (!disposed) ScrollTrigger.refresh(true); });
      }
      teardown = () => {
        observer.disconnect();
        clearTimeout(refreshTimer);
        media.revert();
      };
    }

    // A failed optional animation chunk must never take down the page.
    const start = () => { void enhance().catch(() => undefined); };
    const idle = "requestIdleCallback" in window
      ? window.requestIdleCallback(start, { timeout: 1500 })
      : undefined;
    const timer = idle === undefined ? setTimeout(start, 160) : undefined;
    return () => {
      disposed = true;
      if (idle !== undefined) window.cancelIdleCallback(idle);
      clearTimeout(timer);
      teardown?.();
    };
  }, []);

  return <main id="main-content" ref={ref}>{children}</main>;
}
