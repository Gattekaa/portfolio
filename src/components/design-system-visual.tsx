import { ArrowUpRightIcon, CheckIcon } from "@phosphor-icons/react/dist/ssr";
import type { Locale } from "@/lib/content";

// A specimen of this portfolio's own design language, without client assets.
export function DesignSystemVisual({ lang }: { lang: Locale }) {
  return (
    <div className="flex h-full flex-col justify-between bg-surface p-6 sm:p-8" aria-hidden="true">
      <div className="flex items-center justify-between gap-4 border-b border-line pb-4">
        <span className="text-xl font-medium tracking-[-.035em]">Design System</span>
        <div className="flex -space-x-1.5">
          <span className="size-6 rounded-full border-2 border-surface bg-ink" />
          <span className="size-6 rounded-full border-2 border-surface bg-muted" />
          <span className="size-6 rounded-full border-2 border-surface bg-gold" />
        </div>
      </div>
      <div className="flex items-end justify-between gap-5 py-4">
        <div>
          <span className="block text-[66px] font-medium leading-none tracking-[-.07em] sm:text-[76px]">Aa</span>
          <span className="mt-2 block text-xs text-muted">Outfit · 400 / 500 / 600</span>
        </div>
        <div className="flex flex-col items-end gap-3">
          <span className="inline-flex items-center gap-5 rounded-full bg-gold px-4 py-2.5 text-xs font-medium text-on-gold">
            {lang === "pt" ? "Continuar" : "Continue"}<ArrowUpRightIcon size={17} />
          </span>
          <span className="inline-flex items-center gap-2 text-xs text-muted">
            <CheckIcon size={16} className="text-accent" />{lang === "pt" ? "Acessível por padrão" : "Accessible by default"}
          </span>
        </div>
      </div>
      <p className="text-[11px] text-subtle sm:text-xs">{lang === "pt" ? "Tokens · Componentes · Consistência" : "Tokens · Components · Consistency"}</p>
    </div>
  );
}
