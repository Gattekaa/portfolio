"use client";

import Link from "next/link";
import { useEffect, useSyncExternalStore } from "react";
import { ArrowLeftIcon, ArrowUpRightIcon } from "@phosphor-icons/react";
import { container, primaryButton, secondaryButton } from "@/lib/styles";

const subscribe = (notify: () => void) => {
  window.addEventListener("popstate", notify);
  return () => window.removeEventListener("popstate", notify);
};
const getLocale = () =>
  /^\/en(?:\/|$)/.test(window.location.pathname) ? "en" : "pt";
const getServerLocale = () => "pt" as const;

export function NotFoundContent({
  standalone = false,
}: {
  standalone?: boolean;
}) {
  const lang = useSyncExternalStore(subscribe, getLocale, getServerLocale);
  const english = lang === "en";
  useEffect(() => {
    if (standalone) document.documentElement.lang = english ? "en" : "pt-BR";
  }, [english, standalone]);
  return (
    <>
      {standalone && (
        <header
          className={`${container} flex min-h-24 items-center justify-between gap-5`}
        >
          <Link
            href={`/${lang}`}
            className="text-[33px] font-semibold leading-none tracking-[-.095em]"
            aria-label={
              english ? "Vinicius Martins, home" : "Vinicius Martins, início"
            }
          >
            vm<span className="text-accent">.</span>
          </Link>
          <nav
            aria-label={english ? "Choose a language" : "Escolher idioma"}
            className="flex gap-1 text-sm"
          >
            <Link
              href="/pt"
              lang="pt-BR"
              className="grid size-11 place-items-center rounded-full transition-colors hover:bg-surface"
            >
              PT
            </Link>
            <Link
              href="/en"
              lang="en"
              className="grid size-11 place-items-center rounded-full transition-colors hover:bg-surface"
            >
              EN
            </Link>
          </nav>
        </header>
      )}
      <main
        id="main-content"
        data-not-found="true"
        className={`${container} grid min-h-[calc(100dvh-180px)] items-center gap-10 py-9 lg:grid-cols-[1fr_.95fr] lg:gap-16 lg:py-12`}
      >
        <div>
          <p className="mb-5 text-sm text-accent">
            {english ? "Error 404" : "Erro 404"}
          </p>
          <h1 className="max-w-[15ch] text-[clamp(2.6rem,5.7vw,5rem)] font-medium leading-[1.05] tracking-[-.05em]">
            {english
              ? "We couldn’t find this page."
              : "Não encontramos esta página."}
          </h1>
          <p className="mt-6 max-w-[470px] text-base text-muted md:text-lg">
            {english
              ? "The page may have moved, or the address may be incorrect. You can continue exploring my work."
              : "A página pode ter mudado ou o endereço estar incorreto. Você pode continuar explorando minha atuação."}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href={`/${lang}`} className={`${primaryButton} gap-3 pr-6`}>
              <ArrowLeftIcon size={19} weight="light" aria-hidden="true" />
              {english ? "Back to home" : "Voltar ao início"}
            </Link>
            <Link
              href={`/${lang}#projetos`}
              className={`${secondaryButton} gap-3 pr-5`}
            >
              {english ? "Explore my work" : "Explorar atuação"}
              <ArrowUpRightIcon size={19} weight="light" aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div
          className="relative grid h-[260px] place-items-center overflow-hidden rounded-3xl border border-line bg-surface md:h-[340px] lg:h-[420px]"
          aria-hidden="true"
        >
          <span className="text-[100px] font-medium leading-none tracking-[-.07em] text-ink md:text-[140px]">
            4<span className="text-accent">0</span>4
          </span>
        </div>
      </main>
      {standalone && (
        <footer
          className={`${container} flex min-h-20 flex-wrap items-center justify-between gap-3 border-t border-line py-5 text-xs text-muted`}
        >
          <span>Vinicius Martins</span>
          <span>
            {english
              ? "Clear interfaces. Solid systems."
              : "Interfaces claras. Sistemas sólidos."}
          </span>
        </footer>
      )}
    </>
  );
}
