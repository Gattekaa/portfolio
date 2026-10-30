import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeftIcon,
  ArrowUpRightIcon,
} from "@phosphor-icons/react/dist/ssr";
import { copy, isLocale, profile, projects } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { container, tags, textLink } from "@/lib/styles";
import { Contact } from "@/components/shared";
import { ProjectDetailMotion } from "@/components/project-detail-motion";
import { JsonLd } from "@/components/json-ld";
import { ProjectApplications } from "@/components/project-applications";
import { ProjectDetailHero } from "@/components/project-detail-hero";

export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}
type Props = { params: Promise<{ lang: string; slug: string }> };
export async function generateMetadata({ params }: Props) {
  const { lang, slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!isLocale(lang) || !project) notFound();
  return pageMetadata(
    lang,
    `/projetos/${slug}`,
    `${project.title} | ${profile.name}`,
    project.content[lang].summary,
  );
}
export default async function ProjectPage({ params }: Props) {
  const { lang, slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!isLocale(lang) || !project) notFound();
  const t = copy[lang];
  const p = project.content[lang];
  return (
    <ProjectDetailMotion key={`${lang}/${slug}`}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": project.visual ? "Service" : "CreativeWork",
              name: project.title,
              description: p.summary,
              url: `${profile.site}/${lang}/projetos/${slug}`,
              ...(project.image
                ? { image: `${profile.site}${project.image}` }
                : {}),
              [project.visual ? "provider" : "creator"]: {
                "@type": "Person",
                name: profile.name,
                url: `${profile.site}/${lang}`,
              },
              inLanguage: t.locale,
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: profile.name,
                  item: `${profile.site}/${lang}`,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: project.title,
                  item: `${profile.site}/${lang}/projetos/${slug}`,
                },
              ],
            },
          ],
        }}
      />
      <article className={`${container} relative pt-7 md:pt-10`}>
        <Link
          href={`/${lang}#projetos`}
          className={`${textLink} mb-7 text-muted md:mb-9 lg:absolute lg:left-0 lg:top-7 lg:z-10 lg:mb-0`}
        >
          <ArrowLeftIcon size={19} weight="light" />
          {t.back}
        </Link>
        <ProjectDetailHero project={project} lang={lang} />
        <nav
          className="mt-9 flex flex-wrap gap-x-7 gap-y-1 border-b border-line pb-3 md:mt-11"
          aria-label={lang === "pt" ? "Nesta página" : "On this page"}
        >
          <a
            href="#overview"
            className="inline-flex min-h-11 items-center text-sm text-muted transition-colors hover:text-ink"
          >
            {lang === "pt" ? "Visão geral" : "Overview"}
          </a>
          {p.applications && (
            <a
              href="#applications"
              className="inline-flex min-h-11 items-center text-sm text-muted transition-colors hover:text-ink"
            >
              {lang === "pt" ? "Experiências" : "Experience"}
            </a>
          )}
          <a
            href="#engineering"
            className="inline-flex min-h-11 items-center text-sm text-muted transition-colors hover:text-ink"
          >
            {lang === "pt" ? "Engenharia" : "Engineering"}
          </a>
        </nav>
        <div
          id="overview"
          data-detail-overview
          className="grid scroll-mt-32 items-start gap-10 py-9 md:py-12 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-14"
        >
          <aside
            className="lg:sticky lg:top-30"
            aria-labelledby="contribution-title"
          >
            <div data-detail-aside-panel className="relative overflow-hidden rounded-3xl bg-surface p-6">
            <div data-detail-reading aria-hidden="true" className="absolute inset-x-0 top-0 h-1 origin-left bg-accent" />
            <h2
              id="contribution-title"
              className="text-[23px] font-medium tracking-[-.03em]"
            >
              {t.approach}
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">
              {p.role}
            </p>
            <div className="mt-6 border-t border-line pt-5">
              <p className="mb-3 text-xs text-subtle">
                {lang === "pt" ? "Stack principal" : "Core stack"}
              </p>
              <ul className={`${tags} [&>li]:bg-raised`}>
                {project.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>
            </div>
          </aside>
          <div className="min-w-0">
            <section data-detail-context aria-labelledby="context-title">
              <h2
                id="context-title"
                className="overflow-hidden text-[30px] font-medium leading-tight tracking-[-.035em] md:text-[36px]"
              >
                <span data-detail-heading className="block">{t.challenge}</span>
              </h2>
              <p className="mt-5 max-w-[65ch] text-[17px] leading-relaxed text-muted">
                {p.context.split(" ").map((word, index) => <span key={index}><span className="inline-block overflow-hidden align-top"><span data-context-word className="inline-block">{word}</span></span>{" "}</span>)}
              </p>
            </section>
            {p.applications && (
              <ProjectApplications
                applications={p.applications}
                lang={lang}
                title={p.applicationsTitle}
              />
            )}
            <section
              id="engineering"
              className="mt-12 scroll-mt-32 md:mt-14"
              aria-labelledby="engineering-title"
            >
              <h2
                id="engineering-title"
                className="overflow-hidden text-[30px] font-medium leading-tight tracking-[-.035em] md:text-[36px]"
              >
                <span data-detail-heading className="block">{t.decisions}</span>
              </h2>
              <div className="mt-7 grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {p.decisions.map((item, index) => (
                  <article key={item.title} data-detail-decision className={p.decisions.length % 2 === 1 && index === p.decisions.length - 1 ? "md:col-span-2 lg:col-span-1 xl:col-span-2" : ""}>
                    <div data-decision-surface>
                      <div data-decision-rule aria-hidden="true" className="mb-5 h-px w-full origin-left bg-line" />
                      <h3 className="overflow-hidden text-[21px] font-medium leading-snug tracking-[-.025em]">
                        <span data-decision-title className="block">{item.title}</span>
                      </h3>
                      <p data-decision-body className="mt-3 max-w-[65ch] text-base leading-relaxed text-muted">{item.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>
        <section data-detail-related className="mt-4 border-t border-line pb-14 pt-9 md:pb-18 md:pt-11">
          <h2 className="overflow-hidden text-[30px] font-medium tracking-[-.035em] md:text-[36px]">
            <span data-detail-heading className="block">{t.related}</span>
          </h2>
          <nav
            className="mt-5 grid gap-x-10 sm:grid-cols-2"
            aria-label={t.related}
          >
            {projects
              .filter((item) => item.slug !== slug)
              .map((item) => (
                <Link
                  key={item.slug}
                  data-related-link
                  href={`/${lang}/projetos/${item.slug}`}
                  className="group flex items-center justify-between gap-5 border-b border-line py-5"
                >
                  <div>
                    <p className="text-xs text-muted">
                      {item.content[lang].category}
                    </p>
                    <span className="mt-1 block text-[25px] font-medium tracking-[-.03em] transition-colors group-hover:text-accent">
                      {item.title}
                    </span>
                  </div>
                  <span
                    className="grid size-11 shrink-0 place-items-center rounded-full border border-line transition-colors group-hover:border-accent group-hover:bg-gold group-hover:text-on-gold"
                    aria-hidden="true"
                  >
                    <ArrowUpRightIcon size={21} weight="light" />
                  </span>
                </Link>
              ))}
          </nav>
        </section>
      </article>
      <Contact lang={lang} cinematic />
    </ProjectDetailMotion>
  );
}
