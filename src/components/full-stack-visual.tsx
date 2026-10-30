import {
  ArrowDownIcon,
  BracketsCurlyIcon,
  BrowserIcon,
  DatabaseIcon,
  DeviceMobileIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { Locale } from "@/lib/content";

// A schematic of areas of practice, not a screenshot of a client application.
export function FullStackVisual({ lang }: { lang: Locale }) {
  const pt = lang === "pt";
  return (
    <figure
      className="flex h-full flex-col justify-center p-6 sm:p-8 lg:p-9"
      aria-label={pt ? "Interfaces web e mobile conectadas a serviços, dados e integrações" : "Web and mobile interfaces connected to services, data and integrations"}
    >
      <div data-hero-image aria-hidden="true">
        <div className="grid grid-cols-2 gap-3">
          {[
            { name: "Web", tech: "React · Next.js", Icon: BrowserIcon },
            { name: "Mobile", tech: "React Native", Icon: DeviceMobileIcon },
          ].map(({ name, tech, Icon }) => (
            <div data-hero-node key={name} className="border-b border-line pb-5">
              <Icon size={29} weight="light" className="mb-3 text-accent" />
              <span className="block text-2xl font-medium tracking-[-.035em]">{name}</span>
              <span className="mt-1 block text-xs text-muted">{tech}</span>
            </div>
          ))}
        </div>
        <div data-hero-connector className="relative mx-auto h-11 w-1/2 border-x border-line">
          <div className="absolute inset-x-0 bottom-0 h-px bg-line" />
        </div>
        <ArrowDownIcon data-hero-connector size={25} weight="light" className="mx-auto -mt-px text-accent" />
        <div data-hero-node className="flex items-center gap-4 rounded-2xl border border-accent/35 bg-raised px-5 py-4">
          <BracketsCurlyIcon size={30} weight="light" className="shrink-0 text-accent" />
          <div>
            <span className="block text-xl font-medium tracking-[-.025em]">{pt ? "APIs e serviços" : "APIs & services"}</span>
            <span className="mt-1 block text-xs text-muted">.NET · Ruby on Rails</span>
          </div>
        </div>
        <div data-hero-connector className="mx-auto h-6 w-px bg-line" />
        <div data-hero-node className="flex items-center justify-center gap-3">
          <DatabaseIcon size={24} weight="light" className="shrink-0 text-accent" />
          <span className="text-sm text-muted">{pt ? "Dados e integrações" : "Data & integrations"}</span>
        </div>
      </div>
    </figure>
  );
}
