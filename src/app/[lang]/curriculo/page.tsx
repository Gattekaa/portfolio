import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr";
import { copy, experience, isLocale, profile } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { container, textLink } from "@/lib/styles";
import { PrintResume } from "@/components/site-controls";

type Props = { params: Promise<{ lang: string }> };
export async function generateMetadata({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return pageMetadata(
    lang,
    "/curriculo",
    `${copy[lang].resume} | ${profile.name}`,
  );
}
export default async function ResumePage({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = copy[lang];
  return (
    <main
      id="main-content"
      className={`${container} max-w-[950px] py-12 md:py-18 print:w-full print:max-w-none print:p-0`}
    >
      <Link
        href={`/${lang}#sobre`}
        className={`${textLink} mb-10 text-muted print:hidden`}
      >
        <ArrowLeftIcon size={20} weight="light" />
        {t.home}
      </Link>
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <h1 className="text-5xl font-medium tracking-[-.04em] print:text-3xl">
            {profile.name}
          </h1>
          <p className="mt-3 text-lg text-muted">{t.role} Full Stack</p>
        </div>
        <PrintResume label={lang === "pt" ? "Salvar em PDF" : "Save as PDF"} />
      </div>
      <p className="mt-5 break-all text-sm text-muted">
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
        <br />
        <a href={profile.linkedin}>LinkedIn</a> /{" "}
        <a href={profile.github}>GitHub</a>
      </p>
      <section className="py-8 print:py-3">
        <h2 className="mb-5 text-2xl font-medium">
          {lang === "pt" ? "Perfil profissional" : "Professional profile"}
        </h2>
        <p className="text-muted print:text-xs">
          {t.aboutBody} {t.aboutBody2}
        </p>
      </section>
      <section className="py-8 print:py-3">
        <h2 className="mb-5 text-2xl font-medium">{t.nav[1]}</h2>
        <div className="space-y-4">
          {t.specialties.map((item) => (
            <p key={item.name} className="text-muted print:text-xs">
              <strong className="font-medium text-ink">{item.name}: </strong>
              {item.tags.join(", ")}.
            </p>
          ))}
        </div>
      </section>
      <section className="py-8 print:py-3">
        <h2 className="mb-5 text-2xl font-medium">
          {lang === "pt"
            ? "Experiência profissional"
            : "Professional experience"}
        </h2>
        {experience[lang].map((item) => (
          <article key={item.company} className="mb-7 break-inside-avoid">
            <h3 className="text-xl font-medium">{item.company}</h3>
            <p className="my-2 text-sm text-muted print:text-xs">
              {item.role}
              <br />
              {item.period}
            </p>
            <p className="text-muted print:text-xs">{item.text}</p>
          </article>
        ))}
      </section>
      <section className="py-8 print:py-3">
        <h2 className="mb-5 text-2xl font-medium">
          {lang === "pt" ? "Formação acadêmica" : "Education"}
        </h2>
        <p>{t.education}</p>
        <p className="mt-2 text-sm text-muted">{t.school}</p>
      </section>
      <section className="py-8 print:py-3">
        <h2 className="mb-5 text-2xl font-medium">
          {lang === "pt" ? "Idiomas" : "Languages"}
        </h2>
        <p className="text-muted print:text-xs">
          {lang === "pt"
            ? "Português nativo. Inglês avançado para leitura, escrita e comunicação profissional."
            : "Portuguese: native. English: advanced reading, writing and professional communication."}
        </p>
      </section>
    </main>
  );
}
