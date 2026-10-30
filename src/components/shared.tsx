import Link from "next/link";
import {
  ArrowUpRightIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
} from "@phosphor-icons/react/dist/ssr";
import { copy, profile, type Locale } from "@/lib/content";
import { container, section, lead, primaryButton } from "@/lib/styles";
import { CopyEmail } from "./site-controls";
import { Reveal } from "./reveal";
import { SurfaceBackdrop } from "./site-background";

export function ArrowCircle() {
  return (
    <span
      className="grid size-9 place-items-center rounded-full bg-[#1d211514] transition-transform duration-350 ease-out-expo group-hover:rotate-8 motion-reduce:transform-none md:size-10"
      aria-hidden="true"
    >
      <ArrowUpRightIcon size={19} weight="light" />
    </span>
  );
}

export function Contact({ lang, cinematic = false }: { lang: Locale; cinematic?: boolean }) {
  const t = copy[lang];
  const lines = lang === "pt" ? ["O próximo projeto", "pode começar aqui."] : ["The next project", "can start here."];
  return (
    <section id="contato" className={`${section} relative isolate overflow-hidden bg-surface`}>
      <SurfaceBackdrop />
      <div data-contact-wash aria-hidden="true" className={cinematic ? "pointer-events-none absolute left-1/2 top-full -z-10 size-[180vmax] -translate-x-1/2 -translate-y-1/2 origin-center rounded-full bg-gold/12" : "pointer-events-none absolute inset-0 -z-10 bg-gold/8"} />
      <div className={`${container} relative`}>
        <Reveal>
          <h2 className={cinematic ? "max-w-[1200px] text-[clamp(2.1rem,7.3vw,7rem)] font-medium leading-[1.05] tracking-[-.055em] text-accent" : "max-w-[760px] text-[41px] font-medium leading-[1.08] tracking-[-.045em] md:text-6xl lg:text-7xl"}>
            {cinematic ? lines.map(line => <span key={line} className="block overflow-hidden pb-[.08em]"><span data-contact-line className="block origin-left">{line}</span></span>) : t.contactTitle}
          </h2>
          <p className={lead}>{t.contactBody}</p>
          <div className="mb-6 mt-8 flex flex-wrap items-center gap-5 md:gap-7">
            <a href={`mailto:${profile.email}`} className={primaryButton}>
              {t.emailAction}
              <ArrowCircle />
            </a>
            <CopyEmail
              email={profile.email}
              label={t.copyEmail}
              copiedLabel={t.copied}
              errorLabel={t.copyError}
            />
          </div>
          <a
            className="break-all text-sm text-muted"
            href={`mailto:${profile.email}`}
          >
            {profile.email}
          </a>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer({ lang }: { lang: Locale }) {
  return (
    <footer
      className={`${container} flex flex-col items-start justify-between gap-5 py-9 md:flex-row md:items-center md:py-11 print:hidden`}
    >
      <div>
        <Link
          href={`/${lang}`}
          className="text-xl font-medium tracking-[-.03em]"
        >
          Vinicius Martins
          <span className="text-accent" aria-hidden="true">
            .
          </span>
        </Link>
        <p className="mt-1.5 text-xs text-muted">{copy[lang].footer}</p>
      </div>
      <div className="flex gap-6">
        <a
          className="inline-flex min-h-11 items-center gap-2 text-sm"
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubLogoIcon size={20} weight="light" />
          GitHub
          <span className="sr-only">
            {" "}
            ({lang === "pt" ? "abre em nova aba" : "opens a new tab"})
          </span>
        </a>
        <a
          className="inline-flex min-h-11 items-center gap-2 text-sm"
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedinLogoIcon size={20} weight="light" />
          LinkedIn
          <span className="sr-only">
            {" "}
            ({lang === "pt" ? "abre em nova aba" : "opens a new tab"})
          </span>
        </a>
      </div>
    </footer>
  );
}
