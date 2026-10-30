"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { observeApproach } from "@/lib/observe-approach";

export function ProjectDetailMotion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    let disposed = false;
    let teardown: (() => void) | undefined;

    async function enhance() {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (disposed || !root?.isConnected) return;
      gsap.registerPlugin(ScrollTrigger);
      const media = gsap.matchMedia(root);
      media.add({
        motion: "(prefers-reduced-motion:no-preference)",
        desktop: "(min-width:1024px) and (min-height:700px)",
      }, context => {
        if (!context.conditions?.motion) return;
        const desktop = context.conditions.desktop;
        root.dataset.detailMotion = desktop ? "desktop" : "compact";
        const find = <T extends HTMLElement>(selector: string) => root.querySelector<T>(selector);
        const observers: (() => void)[] = [];
        const near = (element: Element | null | undefined, animate: () => void) => {
          if (element) observers.push(observeApproach(element, () => context.add(animate)));
        };
        const stage = find("[data-detail-hero-stage]");
        const track = find("[data-detail-hero-track]");
        const visual = find("[data-detail-hero-visual]");

        if (stage && track && visual && desktop) {
          const intro = gsap.timeline({
            scrollTrigger: {
              trigger: track, start: "top 100px",
              end: () => "+=" + (track.offsetHeight - stage.offsetHeight),
              scrub: 0.6, invalidateOnRefresh: true,
            },
          });
          intro
            .to("[data-detail-title]", { yPercent: -150, rotate: -4, duration: 0.35, ease: "power2.in" }, 0.1)
            .to("[data-detail-hero-support]", { y: -65, autoAlpha: 0, stagger: 0.04, duration: 0.25 }, 0.12)
            .to(visual, {
              x: () => stage.clientWidth / 2 - (visual.offsetLeft + visual.offsetWidth / 2),
              y: 45,
              scale: () => Math.min(1.45, (stage.clientHeight - 145) / visual.offsetHeight, (stage.clientWidth - 80) / visual.offsetWidth),
              duration: 0.5, ease: "power2.inOut",
            }, 0.18)
            .fromTo("[data-detail-signature]", { autoAlpha: 0, y: 50, scale: 0.85 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.35 }, 0.35);
          const nodes = visual.querySelectorAll("[data-architecture-node]");
          const lines = visual.querySelectorAll("[data-architecture-line]");
          if (nodes.length) intro
            .to(nodes, { y: (index: number) => index === 1 ? -18 : 18, scale: (index: number) => index === 1 ? 1.1 : 0.94, stagger: 0.06, duration: 0.22 }, 0.25)
            .to(nodes, { y: 0, scale: 1, stagger: 0.03, duration: 0.3 }, 0.5);
          if (lines.length) intro
            .to(lines, { scaleX: 0.25, transformOrigin: "left center", duration: 0.2 }, 0.25)
            .to(lines, { scaleX: 1, duration: 0.35 }, 0.45);
          intro.to({}, { duration: 0.16 });
        } else if (stage && visual) {
          gsap.to(visual, {
            y: -30, scale: 0.94, ease: "none",
            scrollTrigger: { trigger: stage, start: "top top", end: "bottom top", scrub: 0.6 },
          });
        }

        const overview = find("[data-detail-overview]");
        const contextSection = find("[data-detail-context]");
        if (overview && contextSection) near(overview, () => {
          gsap.fromTo("[data-detail-aside-panel]", { x: desktop ? -50 : 0, y: 65, rotate: -3, scale: 0.88 }, {
            x: 0, y: 0, rotate: 0, scale: 1, ease: "power2.out",
            scrollTrigger: { trigger: overview, start: "top 90%", end: "top 38%", scrub: 0.55 },
          });
          gsap.fromTo("[data-detail-reading]", { scaleX: 0 }, {
            scaleX: 1, ease: "none",
            scrollTrigger: { trigger: overview, start: "top 55%", end: "bottom 55%", scrub: 0.5 },
          });
          gsap.fromTo(contextSection.querySelectorAll("[data-context-word]"), { yPercent: 110, rotate: 4 }, {
            yPercent: 0, rotate: 0, stagger: 0.025, ease: "power1.out",
            scrollTrigger: { trigger: contextSection, start: "top 85%", end: "top 30%", scrub: 0.55 },
          });
        });

        root.querySelectorAll<HTMLElement>("[data-detail-heading]").forEach(title => { near(title.parentElement, () => {
          gsap.fromTo(title, { yPercent: 110, x: 35, rotate: -2 }, {
            yPercent: 0, x: 0, rotate: 0, ease: "power2.out",
            scrollTrigger: { trigger: title.parentElement, start: "top 94%", end: "top 58%", scrub: 0.5 },
          });
        }); });

        root.querySelectorAll<HTMLElement>("[data-project-application]").forEach((app, index) => { near(app, () => {
          const reveal = gsap.timeline({ scrollTrigger: { trigger: app, start: "top 94%", end: "top 58%", scrub: 0.55 } });
          reveal
            .fromTo(app.querySelector("[data-app-heading]"), { x: desktop ? (index % 2 ? 35 : -35) : 0 }, { x: 0, duration: 0.55 }, 0)
            .fromTo(app.querySelector("[data-app-icon]"), { scale: 0.6, rotate: -20 }, { scale: 1, rotate: 0, duration: 0.55 }, 0)
            .fromTo(app.querySelector("[data-app-rule]"), { scaleX: 0 }, { scaleX: 1, duration: 0.65 }, 0.05);
        }); });

        // Keep native details semantics and exclusivity. Only the newly opened
        // content animates; height changes refresh scroll positions separately.
        const onToggle = (event: Event) => {
          const detail = event.target;
          if (!(detail instanceof HTMLDetailsElement) || !detail.open || !detail.hasAttribute("data-project-application")) return;
          context.add(() => {
            gsap.fromTo(detail.querySelectorAll("[data-app-reveal]"), { y: 25, autoAlpha: 0 }, {
              y: 0, autoAlpha: 1, stagger: 0.055, duration: 0.45, ease: "power2.out", overwrite: "auto",
            });
          });
        };
        root.addEventListener("toggle", onToggle, true);

        root.querySelectorAll<HTMLElement>("[data-detail-decision]").forEach((card, index) => { near(card, () => {
          const step = gsap.timeline({ scrollTrigger: { trigger: card, start: "top 94%", end: "top 48%", scrub: 0.55 } });
          step
            .fromTo(card.querySelector("[data-decision-surface]"), { x: desktop ? (index % 2 ? 20 : -20) : 0, y: 85, scale: 0.9, rotate: desktop ? (index % 2 ? 2 : -2) : 0 }, { x: 0, y: 0, scale: 1, rotate: 0, duration: 0.65 }, 0)
            .fromTo(card.querySelector("[data-decision-rule]"), { scaleX: 0 }, { scaleX: 1, duration: 0.55 }, 0)
            .fromTo(card.querySelector("[data-decision-title]"), { yPercent: 110 }, { yPercent: 0, duration: 0.45 }, 0.1)
            .fromTo(card.querySelector("[data-decision-body]"), { y: 35 }, { y: 0, duration: 0.45 }, 0.17);
        }); });

        const related = find("[data-detail-related]");
        if (related) near(related, () => { gsap.fromTo(related.querySelectorAll("[data-related-link]"), { y: 65, x: (index: number) => desktop ? (index % 2 ? 22 : -22) : 0 }, {
          y: 0, x: 0, stagger: 0.09, ease: "power2.out",
          scrollTrigger: { trigger: related, start: "top 90%", end: "top 30%", scrub: 0.6 },
        }); });

        const contact = find("#contato");
        if (contact) near(contact, () => {
          const finale = gsap.timeline({ scrollTrigger: { trigger: contact, start: "top 95%", end: "top 22%", scrub: 0.55 } });
          finale
            .fromTo("[data-contact-wash]", { scale: 0.015 }, { scale: 1.7, duration: 1, ease: "power1.inOut" }, 0)
            .fromTo("[data-contact-line]", { yPercent: 115, x: (index: number) => index ? 90 : -90, rotate: (index: number) => index ? 3 : -3 }, { yPercent: 0, x: 0, rotate: 0, stagger: 0.15, duration: 0.55, ease: "power2.out" }, 0.15);
        });
        const footer = root.parentElement?.querySelector("footer");
        if (footer) near(footer, () => { gsap.fromTo(footer.children, { y: 30 }, {
          y: 0, stagger: 0.1, ease: "power2.out",
          scrollTrigger: { trigger: footer, start: "top 98%", end: "bottom bottom", scrub: 0.5 },
        }); });
        return () => { observers.forEach(disconnect => disconnect()); root.removeEventListener("toggle", onToggle, true); delete root.dataset.detailMotion; };
      });

      let refreshTimer: ReturnType<typeof setTimeout>;
      let overviewHeight: number | undefined;
      const observer = new ResizeObserver(([entry]) => {
        const height = entry.contentRect.height;
        if (overviewHeight === undefined) { overviewHeight = height; return; }
        if (height === overviewHeight) return;
        overviewHeight = height;
        clearTimeout(refreshTimer);
        refreshTimer = setTimeout(() => { if (!disposed) ScrollTrigger.refresh(true); }, 250);
      });
      const overview = root.querySelector("[data-detail-overview]");
      if (overview) observer.observe(overview);
      if (document.fonts.status === "loading") {
        void document.fonts.ready.then(() => { if (!disposed) ScrollTrigger.refresh(true); });
      }
      teardown = () => { observer.disconnect(); clearTimeout(refreshTimer); media.revert(); };
    }
    const start = () => { void enhance().catch(() => undefined); };
    const idle = "requestIdleCallback" in window ? window.requestIdleCallback(start, { timeout: 1500 }) : undefined;
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
