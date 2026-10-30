// Shared Tailwind recipes keep the same interaction and spacing rules across routes.
export const container =
  "mx-auto w-[calc(100%-40px)] md:w-[calc(100%-64px)] lg:w-[calc(100%-96px)] max-w-[1280px]";
export const section = "py-16 md:py-26";
export const heading =
  "max-w-[850px] text-4xl md:text-5xl lg:text-[58px] font-medium leading-[1.08] tracking-[-.045em]";
export const lead =
  "mt-5 max-w-[580px] text-base md:text-lg text-muted leading-relaxed";
export const buttonBase =
  "group inline-flex min-h-13 items-center justify-center gap-5 whitespace-nowrap rounded-full py-2 pl-6 pr-2 text-sm font-medium transition-transform duration-350 ease-out-expo hover:-translate-y-0.5 active:scale-[.98] motion-reduce:transform-none";
export const primaryButton = `${buttonBase} bg-gold text-on-gold`;
export const secondaryButton = `${buttonBase} bg-raised text-ink`;
export const textLink =
  "group inline-flex min-h-11 items-center gap-3 text-sm font-medium [&>svg]:transition-transform [&>svg]:duration-350 [&>svg]:ease-out-expo hover:[&>svg]:translate-x-1 motion-reduce:hover:[&>svg]:transform-none";
export const iconButton =
  "inline-grid size-11 shrink-0 place-items-center rounded-full bg-raised text-ink transition-transform duration-300 ease-out-expo hover:-rotate-6 motion-reduce:transform-none";
export const tags =
  "m-0 flex list-none flex-wrap gap-2 p-0 [&>li]:rounded-lg [&>li]:bg-surface [&>li]:px-2.5 [&>li]:py-1.5 [&>li]:text-[11px] [&>li]:text-muted";
