"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRightIcon } from "@phosphor-icons/react";
import type { Locale, Project } from "@/lib/content";
import { tags } from "@/lib/styles";
import { ExperienceVisual } from "./experience-visual";
import { ScrollMedia } from "./scroll-media";
import { ProjectScene } from "./project-scene";

export type ProjectPreview = Pick<Project, "slug" | "title" | "image" | "visual" | "category" | "tags"> & {
  alt: string; summary: string; categoryLabel: string;
};
export function ProjectGrid({ projects, lang, labels, action, empty, countLabel }: {
  projects: ProjectPreview[]; lang: Locale; labels: string[]; action: string; empty: string; countLabel: string;
}) {
  const [filter, setFilter] = useState("all");
  const reduced = useReducedMotion();
  const categories = ["all", "product", "backend", "mobile", "architecture"];
  const visible = projects.filter(p => filter === "all" || p.category === filter);
  const featured = visible.find(p => p.slug === "gatree");
  const rest = visible.filter(p => p.slug !== "gatree");
  const scenes: ProjectPreview[][] = featured ? [[featured]] : [];
  for (let i = 0; i < rest.length; i += 2) scenes.push(rest.slice(i, i + 2));

  function card(project: ProjectPreview, index: number, showcase = false) {
    return <article key={project.slug} className="h-full min-w-0">
      <Link
        href={`/${lang}/projetos/${project.slug}`}
        className={`group flex h-full flex-col ${showcase ? "lg:grid lg:grid-cols-[1.25fr_.75fr] lg:items-center lg:gap-10" : ""}`}
        title={`${action}: ${project.title}`}
      >
        <ScrollMedia
          direction={showcase ? 0 : index % 2 ? 1 : -1}
          className={project.slug === "gatree" ? `aspect-[72/41] ${showcase ? "lg:aspect-auto lg:h-[min(55svh,440px)]" : ""}` : "h-[250px] sm:h-[280px] lg:h-[min(34svh,300px)]"}
        >
          {project.image ? <Image
            src={project.image}
            alt={project.alt}
            fill
            sizes={showcase ? "(max-width:767px) 100vw, 700px" : "(max-width:767px) 100vw, 640px"}
            className={`${showcase ? "bg-[#111210] object-contain" : "object-cover"} transition-transform duration-700 ease-out-expo group-hover:scale-[1.025] motion-reduce:transform-none`}
          /> : project.visual ? <ExperienceVisual kind={project.visual} lang={lang} /> : null}
        </ScrollMedia>
        <div className={`flex grow flex-col ${showcase ? "lg:py-6" : ""}`}>
          <div className={`mt-5 flex items-center justify-between gap-5 ${showcase ? "lg:mt-0" : "md:mt-6"}`}>
            <div>
              <span className="text-xs text-muted">{project.categoryLabel}</span>
              <h3 className={`mt-1 font-medium leading-tight tracking-[-.035em] ${showcase ? "text-[36px] lg:text-[clamp(3rem,5vw,5rem)]" : "text-[30px] md:text-[32px]"}`}>{project.title}</h3>
            </div>
            <span className="grid size-12 shrink-0 place-items-center rounded-full shadow-[inset_0_0_0_1px_var(--line)] transition-[background,transform] duration-300 ease-out-expo group-hover:rotate-10 group-hover:bg-gold group-hover:text-on-gold motion-reduce:transform-none" aria-hidden="true"><ArrowUpRightIcon size={25} weight="light" /></span>
          </div>
          <p className={`mb-5 mt-3 max-w-[580px] grow text-muted ${showcase ? "text-lg lg:mt-5 lg:text-xl" : "text-base"}`}>{project.summary}</p>
          <ul className={tags} aria-label={lang === "pt" ? "Tecnologias" : "Technologies"}>{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
        </div>
      </Link>
    </article>;
  }

  return <>
    <div className="mb-8 mt-8 flex items-start justify-between gap-4 md:mb-9 md:mt-10 md:items-center">
      <div className="flex flex-wrap gap-0.5 md:gap-1.5" role="group" aria-label={lang === "pt" ? "Filtrar atuação" : "Filter work"}>
        {categories.map((category, i) => <button key={category} type="button" aria-pressed={filter === category} onClick={() => setFilter(category)} className="min-h-11 rounded-full px-3 py-2.5 text-xs text-muted transition-colors duration-250 ease-out-expo aria-pressed:bg-raised aria-pressed:text-ink md:px-4.5 md:text-sm">{labels[i]}</button>)}
      </div>
      <span className="hidden whitespace-nowrap text-xs text-subtle md:block" aria-live="polite">{visible.length}{" "}{visible.length === 1 ? lang === "pt" ? "destaque" : "highlight" : countLabel}</span>
    </div>
    <AnimatePresence initial={false} mode="wait">
      <motion.div key={filter} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : 0.18 }}>
        {filter === "all" ? <div data-project-sequence>
          {scenes.map((scene, index) => <ProjectScene key={scene.map(p => p.slug).join("-")} index={index} hasNext={index < scenes.length - 1} pair={scene.length > 1}>
            {scene.map((project, i) => card(project, i, scene.length === 1 && project.slug === "gatree"))}
          </ProjectScene>)}
        </div> : <div className="grid grid-cols-1 items-stretch gap-10 md:grid-cols-2 md:gap-x-8 md:gap-y-12">{visible.map((project, index) => card(project, index))}</div>}
        {visible.length === 0 && <p>{empty}</p>}
      </motion.div>
    </AnimatePresence>
  </>;
}
