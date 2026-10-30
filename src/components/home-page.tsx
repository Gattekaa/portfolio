import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightIcon,
} from "@phosphor-icons/react/dist/ssr";
import { copy, experience, projects, type Locale } from "@/lib/content";
import {
  container,
  section,
  heading,
  lead,
  primaryButton,
  textLink,
} from "@/lib/styles";
import { ProjectGrid } from "./project-grid";
import { Reveal } from "./reveal";
import { ArrowCircle, Contact } from "./shared";
import { PortfolioMotion } from "./portfolio-motion";
import { FullStackVisual } from "./full-stack-visual";
import { ExpertiseStory } from "./expertise-story";

export function HomePage({ lang }: { lang: Locale }) {
  const t = copy[lang];
  return (
    <PortfolioMotion key={lang}>
      <div data-hero-track className="relative lg:motion-safe:[@media(min-height:700px)]:h-[175svh]">
      <section
        data-scroll-hero
        className={`${container} relative isolate grid grid-cols-1 items-center gap-10 overflow-hidden pb-9 pt-12 md:min-h-[530px] md:grid-cols-[1.15fr_1fr] md:gap-6 md:py-15 lg:min-h-[580px] lg:py-18 lg:motion-safe:[@media(min-height:700px)]:sticky lg:motion-safe:[@media(min-height:700px)]:top-25 lg:motion-safe:[@media(min-height:700px)]:h-[calc(100svh-124px)] lg:motion-safe:[@media(min-height:700px)]:min-h-0 lg:motion-safe:[@media(min-height:700px)]:py-10`}
        aria-labelledby="hero-title"
      >
        <div data-hero-copy>
          <p className="mb-5 text-[11px] font-medium tracking-[.16em] text-accent md:mb-6">
            {t.eyebrow}
          </p>
          <h1
            id="hero-title"
            className="mb-5 text-[clamp(2.3rem,9.8vw,4.1rem)] font-medium leading-[1.04] tracking-[-.055em] md:mb-7 md:text-[clamp(2.5rem,5.3vw,5rem)]"
          >
            <span className="block overflow-hidden pb-[.04em]"><span data-hero-line className="block">{t.headline[0]}</span></span>
            <span className="block overflow-hidden pb-[.04em] text-accent"><span data-hero-line className="block">{t.headline[1]}</span></span>
          </h1>
          <p data-hero-support className="mb-7 max-w-[440px] text-base text-muted md:mb-8 md:text-lg">
            {t.intro}
          </p>
          <div data-hero-support className="flex flex-wrap items-center gap-4 md:gap-7">
            <a href="#projetos" className={primaryButton}>
              {t.viewWork}
              <ArrowCircle />
            </a>
            <a
              href="#contato"
              className="group inline-flex min-h-11 items-center gap-2 text-[13px] font-medium md:gap-3 md:text-sm"
            >
              {t.talk}
              <ArrowRightIcon size={20} weight="light" />
            </a>
          </div>
        </div>
        <div data-hero-frame className="relative min-h-[350px] self-stretch overflow-hidden rounded-3xl border border-line bg-surface md:min-h-[350px] lg:min-h-[410px]">
          <FullStackVisual lang={lang} />
        </div>
        <div data-hero-conclusion aria-hidden="true" className="pointer-events-none invisible absolute inset-0 grid place-items-center text-[clamp(4rem,16vw,15rem)] font-medium tracking-[-.075em] text-accent">Full stack.</div>
      </section>
      </div>

      <section
        id="projetos"
        className={`${container} ${section} !pt-10 md:!pt-18`}
        aria-labelledby="work-title"
      >
        <Reveal>
          <h2 id="work-title" className={`${heading} overflow-hidden`}>
            <span data-work-title className="block">{t.workTitle}</span>
          </h2>
          <p className={lead}>{t.workIntro}</p>
        </Reveal>
        <ProjectGrid
          lang={lang}
          labels={[t.all, t.product, t.backend, t.mobile, t.architecture]}
          action={t.case}
          empty={t.empty}
          countLabel={t.projectCount}
          projects={projects.map((p) => ({
            slug: p.slug,
            title: p.title,
            image: p.image,
            visual: p.visual,
            category: p.category,
            tags: p.tags,
            alt: p.imageAlt?.[lang] || p.title,
            summary: p.content[lang].summary,
            categoryLabel: p.content[lang].category,
          }))}
        />
      </section>

      <ExpertiseStory lang={lang} title={t.expertiseTitle} intro={t.expertiseIntro} items={t.specialties} />

      <section
        id="sobre"
        className={`${section} ${container}`}
        aria-labelledby="about-title"
      >
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[.8fr_1.2fr] md:gap-16 lg:gap-28">
          <div data-about-portrait className="w-full max-w-[330px] rounded-3xl bg-raised p-2 md:max-w-[390px]">
            <div className="relative aspect-square overflow-hidden rounded-[18px] md:aspect-[.86]">
              <Image
                data-about-image
                src="/images/vinicius.png"
                alt="Vinicius Martins"
                fill
                sizes="(max-width: 767px) 85vw, 390px"
                className="object-cover object-[50%_35%]"
              />
              <div data-about-curtain aria-hidden="true" className="invisible absolute inset-0 bg-raised" />
            </div>
          </div>
          <div>
            <h2 id="about-title" className={`${heading} overflow-hidden`}>
              <span data-about-title className="block">{t.aboutTitle}</span>
            </h2>
            <p className="mb-5 mt-6 text-xl leading-relaxed text-ink md:text-[21px]">
              {t.aboutBody.split(" ").map((word, index) => <span key={index}><span className="inline-block overflow-hidden align-top"><span data-about-word className="inline-block">{word}</span></span>{" "}</span>)}
            </p>
            <p data-about-secondary className="text-base text-muted md:text-[17px]">
              {t.aboutBody2}
            </p>
            <div data-about-secondary className="mb-4 mt-8 border-l-2 border-accent pl-4">
              <span className="text-[15px]">{t.education}</span>
              <p className="mt-1 text-[13px] text-muted">{t.school}</p>
            </div>
            <Link
              href={`/${lang}/curriculo`}
              data-about-secondary
              className={textLink}
              aria-label={t.resumeLabel}
            >
              {t.resume}
              <ArrowRightIcon size={20} weight="light" />
            </Link>
          </div>
        </div>
      </section>

      <section
        data-career
        className={`${section} ${container} !pt-4 md:!pt-6`}
        aria-labelledby="career-title"
      >
        <div className="grid grid-cols-1 items-start gap-9 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
          <div className="self-start lg:sticky lg:top-32">
            <h2 id="career-title" className={heading}>
              {(lang === "pt" ? ["Experiência que", "conecta as partes."] : ["Experience across", "the whole system."]).map(line => <span key={line} className="block overflow-hidden pb-[.07em]"><span data-career-title className="block">{line}{" "}</span></span>)}
            </h2>
          </div>
          <div data-career-list className="relative border-l border-line pl-6 md:pl-9">
            <div data-career-rail aria-hidden="true" className="absolute inset-y-0 -left-px w-px origin-top bg-accent" />
            {experience[lang].map((item, i) => (
              <article key={item.company} data-career-row className={i ? "pt-9" : ""}>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_auto]">
                  <div data-career-company>
                    <h3 className="mb-1.5 text-xl font-medium tracking-[-.025em] md:text-2xl">{item.company}</h3>
                    <p className="text-[13px] text-muted">{item.role}</p>
                  </div>
                  <span data-career-date className="whitespace-nowrap text-xs text-subtle md:pt-2">{item.period}</span>
                </div>
                <p data-career-description className="mt-5 max-w-[550px] text-base text-muted md:text-lg">{item.text}</p>
                <div data-career-rule aria-hidden="true" className="mt-8 h-px w-full origin-left bg-line" />
              </article>
            ))}
          </div>
        </div>
      </section>
      <Contact lang={lang} cinematic />
    </PortfolioMotion>
  );
}
