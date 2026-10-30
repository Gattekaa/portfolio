import Image from "next/image";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import type { Locale, Project } from "@/lib/content";
import { primaryButton, tags } from "@/lib/styles";
import { ExperienceVisual } from "./experience-visual";

export function ProjectDetailHero({
  project,
  lang,
}: {
  project: Project;
  lang: Locale;
}) {
  const content = project.content[lang];
  return (
    <div data-detail-hero-track className="relative lg:motion-safe:[@media(min-height:700px)]:h-[155svh]">
    <header
      data-detail-hero-stage
      className={`relative isolate grid items-center gap-8 overflow-hidden py-4 lg:gap-12 lg:motion-safe:[@media(min-height:700px)]:sticky lg:motion-safe:[@media(min-height:700px)]:top-25 lg:motion-safe:[@media(min-height:700px)]:h-[calc(100svh-124px)] lg:motion-safe:[@media(min-height:700px)]:py-8 ${project.image ? "lg:grid-cols-[.85fr_1.15fr]" : "lg:grid-cols-[1.15fr_.85fr]"}`}
    >
      <div>
        <p data-detail-hero-support className="mb-4 text-sm text-accent">{content.category}</p>
        <h1 className="max-w-[12ch] overflow-hidden pb-[.07em] text-[clamp(2.75rem,6.5vw,5.5rem)] font-medium leading-[1.04] tracking-[-.055em]">
          <span data-detail-title className="block">{project.title}</span>
        </h1>
        <p data-detail-hero-support className="mt-5 max-w-[620px] text-lg leading-relaxed text-muted md:text-[21px]">
          {content.summary}
        </p>
        <ul
          data-detail-hero-support
          className={`${tags} mt-6`}
          aria-label={
            lang === "pt" ? "Tecnologias principais" : "Core technologies"
          }
        >
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        {project.url && (
          <a
            data-detail-hero-support
            href={project.url}
            className={`${primaryButton} mt-7`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {lang === "pt" ? "Conhecer produto" : "Visit product"}
            <span className="mr-3">
              <ArrowUpRightIcon size={20} weight="light" />
            </span>
            <span className="sr-only">
              {" "}
              ({lang === "pt" ? "abre em nova aba" : "opens a new tab"})
            </span>
          </a>
        )}
      </div>
      {project.image ? (
        <figure data-detail-hero-visual className="relative min-w-0">
          <div
            className={`relative overflow-hidden rounded-3xl border border-line bg-[#111210] ${project.conceptual ? "aspect-[1.5]" : "aspect-[72/41]"}`}
          >
            <Image
              src={project.image}
              alt={project.imageAlt?.[lang] || project.title}
              fill
              loading="eager"
              fetchPriority="high"
              sizes="(max-width: 1023px) 100vw, 80vw"
              className={project.conceptual ? "object-cover" : "object-contain"}
            />
          </div>
          <figcaption className="mt-3 text-xs text-subtle">
            {project.conceptual
              ? lang === "pt"
                ? "Ilustração conceitual de arquitetura modular."
                : "Conceptual illustration of modular architecture."
              : lang === "pt"
                ? "Página inicial com um perfil de exemplo."
                : "Homepage featuring an example profile."}
          </figcaption>
        </figure>
      ) : project.visual ? (
        <div data-detail-hero-visual className="relative h-[240px] overflow-hidden rounded-3xl border border-line md:h-[280px]">
          <ExperienceVisual
            kind={project.visual}
            lang={lang}
            variant="detail"
          />
        </div>
      ) : null}
      <div data-detail-signature aria-hidden="true" className="pointer-events-none invisible absolute inset-x-0 top-5 text-center text-[clamp(2rem,5vw,5rem)] font-medium leading-tight tracking-[-.055em] text-accent">{project.title}</div>
    </header>
    </div>
  );
}
