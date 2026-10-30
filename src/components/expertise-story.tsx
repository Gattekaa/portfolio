"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore, type KeyboardEvent } from "react";
import {
  ArrowDownIcon,
  BracketsCurlyIcon,
  BrowserIcon,
  DatabaseIcon,
  DeviceMobileIcon,
  GitBranchIcon,
  SquaresFourIcon,
} from "@phosphor-icons/react";
import type { Locale } from "@/lib/content";
import type { ScrollTrigger as ScrollTriggerInstance } from "gsap/ScrollTrigger";
import { container, heading, lead } from "@/lib/styles";
import { SurfaceBackdrop } from "./site-background";

type Specialty = { name: string; text: string; tags: readonly string[] };
const immersiveQuery = "(min-width:1024px) and (min-height:700px) and (prefers-reduced-motion:no-preference), (min-width:360px) and (max-width:1023px) and (min-height:800px) and (prefers-reduced-motion:no-preference)";
function subscribeImmersive(notify: () => void) {
  const media = window.matchMedia(immersiveQuery);
  media.addEventListener("change", notify);
  return () => media.removeEventListener("change", notify);
}
const immersiveSnapshot = () => window.matchMedia(immersiveQuery).matches;
const staticSnapshot = () => false;
const icons = [BrowserIcon, SquaresFourIcon, DatabaseIcon, DeviceMobileIcon, GitBranchIcon];

export function ExpertiseStory({ lang, title, intro, items }: {
  lang: Locale; title: string; intro: string; items: readonly Specialty[];
}) {
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<ScrollTriggerInstance | null>(null);
  const activeRef = useRef(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const supported = useSyncExternalStore(subscribeImmersive, immersiveSnapshot, staticSnapshot);
  const [failed, setFailed] = useState(false);
  const immersive = supported && !failed;
  const id = useId();
  const pt = lang === "pt";
  const labels = pt ? ["Interfaces", "Componentes", "Serviços", "Mobile", "Entrega"] : ["Interfaces", "Components", "Services", "Mobile", "Delivery"];
  const words = ["Frontend.", "Design System.", "Backend.", "Mobile.", pt ? "Entrega." : "Delivery."];
  const nodes = pt
    ? [["React", "Next.js", "TypeScript"], ["Tokens", "Componentes", "Documentação"], ["API", "Domínio", "Dados"], ["App", "Dados locais", "Sync"], ["Código", "Testes", "Deploy"]]
    : [["React", "Next.js", "TypeScript"], ["Tokens", "Components", "Documentation"], ["API", "Domain", "Data"], ["App", "Local data", "Sync"], ["Code", "Tests", "Deploy"]];

  useEffect(() => {
    const element = root.current;
    if (!element || !immersive) return;
    let disposed = false;
    let revert: (() => void) | undefined;
    const start = () => { void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);
      const context = gsap.context(() => {
        const stage = element.querySelector<HTMLElement>("[data-story-stage]")!;
        const panels = gsap.utils.toArray<HTMLElement>("[data-story-panel]", element);
        const visuals = gsap.utils.toArray<HTMLElement>("[data-story-visual]", element);
        const duration = items.length - 0.35;
        gsap.set(panels, { autoAlpha: 0, yPercent: 110 });
        gsap.set(visuals, { autoAlpha: 0, xPercent: 70, rotate: 5, scale: 0.86 });
        gsap.set([panels[0], visuals[0]], { autoAlpha: 1, xPercent: 0, yPercent: 0, rotate: 0, scale: 1 });
        const update = (self: ScrollTriggerInstance) => {
          const phase = Math.min(items.length - 1, Math.floor(self.progress * duration + 0.17));
          element.dataset.phase = String(phase);
          if (phase !== activeRef.current) {
            activeRef.current = phase;
            setActive(phase);
          }
        };
        const timeline = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: element,
            start: "top 100px",
            end: () => `+=${element.offsetHeight - stage.offsetHeight}`,
            scrub: 0.45,
            invalidateOnRefresh: true,
            onUpdate: update,
            onRefresh: update,
          },
        });
        panels.slice(1).forEach((panel, offset) => {
          const index = offset + 1;
          const at = index - 0.35;
          timeline
            .to(panels[offset], { yPercent: -65, scale: 0.92, autoAlpha: 0, duration: 0.32 }, at)
            .to(panel, { yPercent: 0, scale: 1, autoAlpha: 1, duration: 0.35 }, at)
            .to(visuals[offset], { xPercent: index % 2 ? -70 : 70, rotate: index % 2 ? -5 : 5, scale: 0.82, autoAlpha: 0, duration: 0.35 }, at)
            .fromTo(visuals[index], { xPercent: index % 2 ? 70 : -70, rotate: index % 2 ? 5 : -5, scale: 0.86 }, { xPercent: 0, rotate: 0, scale: 1, autoAlpha: 1, duration: 0.4 }, at)
            .fromTo(visuals[index].querySelectorAll("[data-story-node]"), { y: 38, scale: 0.8 }, { y: 0, scale: 1, stagger: 0.04, duration: 0.3 }, at + 0.08);
        });
        timeline.fromTo("[data-story-progress]", { scaleX: 0 }, { scaleX: 1, duration, ease: "none" }, 0);
        trigger.current = timeline.scrollTrigger || null;
        if (trigger.current) update(trigger.current);
        element.dataset.initialized = "true";
        ScrollTrigger.refresh(true);
      }, element);
      revert = () => {
        trigger.current = null;
        context.revert();
        element.dataset.initialized = "false";
        delete element.dataset.phase;
      };
    }).catch(() => { revert?.(); if (!disposed) setFailed(true); }); };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { observer.disconnect(); start(); }
    }, { rootMargin: "1400px 0px" });
    observer.observe(element);
    return () => { disposed = true; observer.disconnect(); revert?.(); };
  }, [immersive, items.length]);

  function select(index: number) {
    const scroll = trigger.current;
    if (scroll) {
      const fraction = (index + 0.28) / (items.length - 0.35);
      window.scrollTo({ top: scroll.start + fraction * (scroll.end - scroll.start), behavior: "smooth" });
    } else {
      document.getElementById(`${id}-panel-${index}`)?.scrollIntoView({ block: "center", behavior: "auto" });
    }
  }
  function onKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (!immersive) return;
    let next: number;
    if (event.key === "ArrowRight") next = (index + 1) % items.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + items.length) % items.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = items.length - 1;
    else return;
    event.preventDefault();
    select(next);
    tabs.current[next]?.focus({ preventScroll: true });
  }

  return (
    <section className="relative isolate bg-surface py-16 md:py-24" aria-labelledby="expertise-title">
      <SurfaceBackdrop />
      <div id="especialidades" ref={root} data-immersive={immersive ? "true" : undefined} data-initialized="false" className="group/story relative data-[immersive=true]:h-[360svh] lg:data-[immersive=true]:h-[420svh]">
        <div data-story-stage className={`${container} flex flex-col group-data-[immersive=true]/story:sticky group-data-[immersive=true]/story:top-25 group-data-[immersive=true]/story:h-[calc(100svh-124px)]`}>
          <div className="shrink-0">
            <h2 id="expertise-title" className={`${heading} group-data-[immersive=true]/story:text-[clamp(1.7rem,3.7vw,3.2rem)]`}>{title}</h2>
            <p className={`${lead} group-data-[immersive=true]/story:mt-3 group-data-[immersive=true]/story:text-sm group-data-[immersive=true]/story:lg:text-base`}>{intro}</p>
          </div>
          <div className="mt-9 min-h-0 grow group-data-[immersive=true]/story:grid group-data-[immersive=true]/story:grid-rows-[.9fr_1.1fr] group-data-[immersive=true]/story:gap-5 lg:group-data-[immersive=true]/story:grid-cols-[1.1fr_1fr] lg:group-data-[immersive=true]/story:grid-rows-1 lg:group-data-[immersive=true]/story:gap-16">
            <div className="relative hidden min-h-0 overflow-hidden group-data-[immersive=true]/story:block" aria-hidden="true">
              {items.map((item, index) => {
                const Icon = icons[index];
                return <div key={item.name} data-story-visual className="[[data-initialized=false]_&]:invisible first:[[data-initialized=false]_&]:visible absolute inset-0 flex flex-col justify-center">
                  <span className="text-[clamp(2.6rem,8vw,7rem)] font-medium leading-[.98] tracking-[-.065em] text-accent">{index === 1 ? <>Design<br />System.</> : words[index]}</span>
                  <div className="mt-5 flex items-center gap-3 lg:mt-10 lg:gap-5">
                    {nodes[index].map((node, nodeIndex) => <div data-story-node key={node} className="flex min-w-0 flex-1 items-center gap-3">
                      <div className="min-w-0">
                        {nodeIndex === 1 ? <Icon size={26} weight="light" className="mb-2 text-accent" /> : nodeIndex === 0 ? <BracketsCurlyIcon size={26} weight="light" className="mb-2 text-muted" /> : <ArrowDownIcon size={26} weight="light" className="mb-2 text-muted" />}
                        <span className="block text-[11px] text-muted lg:text-sm">{node}</span>
                      </div>
                      {nodeIndex < 2 && <span className="h-px min-w-3 grow bg-line" />}
                    </div>)}
                  </div>
                </div>;
              })}
            </div>
            <div className="relative flex min-h-0 flex-col gap-8 group-data-[immersive=true]/story:block group-data-[immersive=true]/story:overflow-hidden">
              {items.map((item, index) => {
                const Icon = icons[index];
                return <div
                  key={item.name}
                  data-story-panel
                  id={`${id}-panel-${index}`}
                  role={immersive ? "tabpanel" : undefined}
                  aria-labelledby={immersive ? `${id}-tab-${index}` : undefined}
                  aria-hidden={immersive && active !== index ? true : undefined}
                  inert={immersive && active !== index}
                  className="[[data-immersive=true][data-initialized=false]_&]:invisible first:[[data-immersive=true][data-initialized=false]_&]:visible group-data-[immersive=true]/story:absolute group-data-[immersive=true]/story:inset-0 group-data-[immersive=true]/story:flex group-data-[immersive=true]/story:flex-col group-data-[immersive=true]/story:justify-center"
                >
                  <Icon size={30} weight="light" aria-hidden="true" className="mb-4 text-accent group-data-[immersive=true]/story:hidden lg:group-data-[immersive=true]/story:block" />
                  <h3 className="text-2xl font-medium leading-tight tracking-[-.035em] lg:text-4xl">{item.name}</h3>
                  <p className="mt-4 max-w-[500px] text-base leading-relaxed text-muted lg:text-xl">{item.text}</p>
                  <ul className="mt-5 flex list-none flex-wrap gap-x-5 gap-y-2 p-0 text-xs text-muted lg:mt-7 lg:text-sm">{item.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
                </div>;
              })}
            </div>
          </div>
          <div className="relative mt-8 hidden shrink-0 border-t border-line pt-3 group-data-[immersive=true]/story:block">
            <div data-story-progress aria-hidden="true" className="absolute -top-px left-0 h-px w-full origin-left bg-accent" />
            <div role={immersive ? "tablist" : undefined} aria-label={pt ? "Explorar especialidades" : "Explore expertise"} className="grid grid-cols-5 gap-1">
              {labels.map((label, index) => <button
                ref={el => { tabs.current[index] = el; }}
                id={`${id}-tab-${index}`}
                key={label}
                role={immersive ? "tab" : undefined}
                aria-selected={immersive ? active === index : undefined}
                aria-controls={`${id}-panel-${index}`}
                tabIndex={immersive && active !== index ? -1 : 0}
                onClick={() => select(index)}
                onKeyDown={event => onKey(event, index)}
                className="min-h-11 px-0 text-left text-[10px] text-muted transition-colors aria-selected:text-accent sm:text-xs lg:text-sm"
              >{label}</button>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
