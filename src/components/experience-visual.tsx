import {
  ArrowsClockwiseIcon,
  BracketsCurlyIcon,
  BrowserIcon,
  DatabaseIcon,
  DeviceMobileIcon,
  StackIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { Locale } from "@/lib/content";
import { DesignSystemVisual } from "./design-system-visual";

export type ExperienceKind = "dotnet" | "rails" | "mobile" | "design-system";

const visuals = {
  dotnet: {
    name: ".NET / Azure",
    caption: "Clean Architecture · Redis · Azure",
    Icon: StackIcon,
    nodes: [
      { Icon: BracketsCurlyIcon, pt: "API", en: "API" },
      { Icon: StackIcon, pt: "Domínio", en: "Domain" },
      { Icon: DatabaseIcon, pt: "Dados", en: "Data" },
    ],
  },
  rails: {
    name: "Ruby on Rails",
    caption: "Turbo · Stimulus · Sidekiq",
    Icon: BracketsCurlyIcon,
    nodes: [
      { Icon: BrowserIcon, pt: "Interface", en: "Interface" },
      { Icon: BracketsCurlyIcon, pt: "Rails", en: "Rails" },
      { Icon: DatabaseIcon, pt: "PostgreSQL", en: "PostgreSQL" },
    ],
  },
  mobile: {
    name: "React Native",
    caption: "Expo · SQLite · APIs",
    Icon: DeviceMobileIcon,
    nodes: [
      { Icon: DeviceMobileIcon, pt: "App", en: "App" },
      { Icon: DatabaseIcon, pt: "Dados locais", en: "Local data" },
      { Icon: ArrowsClockwiseIcon, pt: "Sincronização", en: "Sync" },
    ],
  },
};

// Architecture sketches communicate the work without depicting a client interface.
export function ExperienceVisual({
  kind,
  lang,
  variant = "card",
}: {
  kind: ExperienceKind;
  lang: Locale;
  variant?: "card" | "detail";
}) {
  if (kind === "design-system") return <DesignSystemVisual lang={lang} />;
  const { name, caption, Icon, nodes } = visuals[kind];
  return (
    <div
      className="flex h-full w-full flex-col justify-between bg-surface p-6 sm:p-8"
      aria-hidden="true"
    >
      <div className="flex items-center justify-between gap-4">
        <span
          className={
            variant === "detail"
              ? "text-sm text-muted"
              : "text-[28px] font-medium leading-tight tracking-[-.045em] sm:text-[32px]"
          }
        >
          {variant === "detail"
            ? lang === "pt"
              ? "Visão simplificada"
              : "At a glance"
            : name}
        </span>
        <Icon size={26} weight="light" className="shrink-0 text-muted" />
      </div>
      <div className="relative my-5">
        <div data-architecture-line className="absolute inset-x-[16.66%] top-7 h-px bg-line" />
        <div className="relative grid grid-cols-3 gap-2">
          {nodes.map(({ Icon: NodeIcon, ...node }, index) => (
            <div data-architecture-node key={node.en} className="min-w-0 text-center">
              <div
                className={`mx-auto grid size-14 place-items-center rounded-2xl border transition-colors duration-300 ${index === 1 ? "border-accent/35 bg-raised text-accent group-hover:border-accent/70" : "border-line bg-surface text-muted group-hover:text-ink"}`}
              >
                <NodeIcon size={25} weight="light" />
              </div>
              <span className="mt-3 block text-[11px] text-muted sm:text-xs">
                {node[lang]}
              </span>
            </div>
          ))}
        </div>
      </div>
      <p className="text-[11px] text-subtle sm:text-xs">{caption}</p>
    </div>
  );
}
