"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  MoonIcon,
  SunIcon,
  ListIcon,
  XIcon,
  CopyIcon,
  CheckIcon,
  PrinterIcon,
} from "@phosphor-icons/react";
import type { Locale } from "@/lib/content";
import { iconButton, secondaryButton } from "@/lib/styles";

export function Header({
  lang,
  labels,
  menuLabel,
  closeLabel,
  themeLabel,
}: {
  lang: Locale;
  labels: string[];
  menuLabel: string;
  closeLabel: string;
  themeLabel: string;
}) {
  const pathname = usePathname();
  const otherLang = lang === "pt" ? "en" : "pt";
  const translatedPath = pathname.replace(
    /^\/(pt|en)(?=\/|$)/,
    `/${otherLang}`,
  );
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const links = ["projetos", "especialidades", "sobre", "contato"];

  useEffect(() => {
    if (!open) return;
    const el = dialog.current;
    el?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      el?.close();
      document.body.style.overflow = previous;
    };
  }, [open]);

  function toggleTheme() {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("portfolio-theme", next);
    } catch {
      /* Private contexts may block storage. */
    }
  }

  return (
    <>
      <header className="sticky top-3 z-20 mx-auto mt-3 w-[calc(100%-28px)] max-w-[1160px] md:top-5 md:mt-5 md:w-[calc(100%-64px)] print:hidden">
        <nav
          className="flex h-15 items-center justify-between gap-3 rounded-full bg-nav py-0 pl-5 pr-2 shadow-[0_0_0_1px_color-mix(in_srgb,var(--ink)_9%,transparent),0_8px_32px_#11121008] backdrop-blur-xl md:h-17 md:gap-6 md:pl-7 md:pr-5 supports-[not(backdrop-filter:blur(1px))]:bg-surface"
          aria-label={lang === "pt" ? "Navegação principal" : "Main navigation"}
        >
          <Link
            href={`/${lang}`}
            className="py-1 pr-2 text-[33px] font-semibold leading-none tracking-[-.095em]"
            aria-label={
              lang === "pt"
                ? "vm, Vinicius Martins, início"
                : "vm, Vinicius Martins, home"
            }
          >
            vm
            <span className="text-accent" aria-hidden="true">
              .
            </span>
          </Link>
          <div className="hidden items-center gap-7 md:flex lg:gap-10">
            {links.map((id, i) => (
              <Link
                key={id}
                href={`/${lang}#${id}`}
                className="py-3.5 text-sm text-muted transition-colors duration-200 ease-out-expo hover:text-ink"
              >
                {labels[i]}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-1 md:gap-2.5">
            <Link
              href={translatedPath}
              className="grid min-h-11 min-w-11 place-items-center text-xs font-medium"
              hrefLang={otherLang === "pt" ? "pt-BR" : "en"}
              aria-label={
                otherLang === "pt"
                  ? "PT: Ver em português"
                  : "EN: View in English"
              }
            >
              {otherLang.toUpperCase()}
            </Link>
            <button
              className={iconButton}
              onClick={toggleTheme}
              aria-label={themeLabel}
              title={themeLabel}
            >
              <SunIcon
                className="[[data-theme=light]_&]:hidden"
                size={19}
                weight="light"
              />
              <MoonIcon
                className="hidden [[data-theme=light]_&]:block"
                size={19}
                weight="light"
              />
            </button>
            <button
              className={`${iconButton} md:hidden`}
              onClick={() => setOpen(true)}
              aria-label={menuLabel}
              aria-expanded={open}
              aria-controls="mobile-navigation"
            >
              <ListIcon size={23} weight="light" />
            </button>
          </div>
        </nav>
      </header>
      <dialog
        id="mobile-navigation"
        ref={dialog}
        className="fixed inset-x-0 top-3 z-30 mx-auto mt-0 h-auto max-h-[calc(100dvh-24px)] w-[calc(100%-24px)] max-w-[600px] rounded-3xl border-0 bg-canvas p-6 text-ink backdrop:bg-[#111210b8] backdrop:backdrop-blur-xl"
        aria-label={menuLabel}
        onCancel={() => setOpen(false)}
        onClose={() => setOpen(false)}
      >
        <div className="flex items-center justify-between">
          <span className="text-3xl font-semibold tracking-[-.095em]">
            vm<span className="text-accent">.</span>
          </span>
          <button
            className={iconButton}
            onClick={() => setOpen(false)}
            aria-label={closeLabel}
          >
            <XIcon size={26} weight="light" />
          </button>
        </div>
        <nav className="flex flex-col gap-1 py-9" aria-label={menuLabel}>
          {links.map((id, i) => (
            <Link
              key={id}
              href={`/${lang}#${id}`}
              onClick={() => setOpen(false)}
              className="px-1 py-3 text-4xl tracking-[-.04em] motion-safe:animate-enter"
              style={{ animationDelay: `${i * 55}ms` }}
            >
              {labels[i]}
            </Link>
          ))}
        </nav>
      </dialog>
    </>
  );
}

export function CopyEmail({
  email,
  label,
  copiedLabel,
  errorLabel,
}: {
  email: string;
  label: string;
  copiedLabel: string;
  errorLabel: string;
}) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  useEffect(() => {
    if (status === "idle") return;
    const timeout = setTimeout(() => setStatus("idle"), 3500);
    return () => clearTimeout(timeout);
  }, [status]);
  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }
  return (
    <div>
      <button
        type="button"
        className="flex min-h-11 items-center gap-2 border-0 bg-transparent py-2 text-sm text-muted"
        onClick={copy}
      >
        {status === "success" ? (
          <CheckIcon size={18} weight="light" />
        ) : (
          <CopyIcon size={18} weight="light" />
        )}
        {status === "success" ? copiedLabel : label}
      </button>
      <span
        role="status"
        className={
          status === "error" ? "block max-w-56 text-xs text-ink" : "sr-only"
        }
      >
        {status === "success"
          ? copiedLabel
          : status === "error"
            ? errorLabel
            : ""}
      </span>
    </div>
  );
}

export function PrintResume({ label }: { label: string }) {
  return (
    <button
      className={`${secondaryButton} gap-2.5 pr-6 print:hidden`}
      onClick={() => window.print()}
    >
      <PrinterIcon size={20} weight="light" />
      {label}
    </button>
  );
}
