import {
  CheckIcon,
  ClockIcon,
  MapPinIcon,
  StethoscopeIcon,
  ShieldCheckIcon,
  ChartLineUpIcon,
  FilesIcon,
  BriefcaseIcon,
  CaretDownIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { Locale, Project } from "@/lib/content";
import { tags } from "@/lib/styles";
import { ScrollApplications } from "./scroll-applications";

const appIcons = {
  health: StethoscopeIcon,
  map: MapPinIcon,
  clock: ClockIcon,
  shield: ShieldCheckIcon,
  chart: ChartLineUpIcon,
  documents: FilesIcon,
  business: BriefcaseIcon,
};

export function ProjectApplications({
  applications,
  lang,
  title,
}: {
  applications: NonNullable<Project["content"][Locale]["applications"]>;
  lang: Locale;
  title?: string;
}) {
  return (
    <section
      id="applications"
      className="mt-12 scroll-mt-32 md:mt-14"
      aria-labelledby="project-apps-title"
    >
      <h2
        id="project-apps-title"
        className="overflow-hidden text-[30px] font-medium leading-tight tracking-[-.035em] md:text-[36px]"
      >
        <span data-detail-heading className="block">{title ||
          (lang === "pt"
            ? "Aplicativos em que atuei."
            : "Apps I’ve worked on.")}</span>
      </h2>
      <ScrollApplications>
        {applications.map((app, index) => {
          const Icon = appIcons[app.icon];
          return (
            <details
              data-project-application
              key={app.name}
              name="project-applications"
              open={index === 0}
              className="group relative border-b border-line first:border-t"
            >
              <summary className="cursor-pointer list-none py-5 [&::-webkit-details-marker]:hidden">
                <h3 className="flex items-center gap-4">
                  <span data-app-icon className="grid size-11 shrink-0 place-items-center rounded-xl bg-surface text-accent">
                    <Icon size={22} weight="light" aria-hidden="true" />
                  </span>
                  <span data-app-heading className="min-w-0 flex-1">
                    <span className="mb-1 block text-xs font-normal text-muted">
                      {app.area}
                    </span>
                    <span className="block text-xl font-medium leading-snug tracking-[-.025em] md:text-[23px]">
                      {app.name}
                    </span>
                  </span>
                  <CaretDownIcon
                    size={19}
                    weight="light"
                    className="shrink-0 text-muted transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
                    aria-hidden="true"
                  />
                </h3>
              </summary>
              <div className="pb-7 md:pl-15">
                <p data-app-reveal className="max-w-[65ch] text-base text-muted">
                  {app.summary}
                </p>
                <ul className="mt-5 grid gap-3">
                  {app.capabilities.map((capability) => (
                    <li
                      data-app-reveal
                      key={capability}
                      className="flex items-start gap-3 text-base"
                    >
                      <CheckIcon
                        size={19}
                        weight="light"
                        className="mt-1 shrink-0 text-accent"
                        aria-hidden="true"
                      />
                      <span>{capability}</span>
                    </li>
                  ))}
                </ul>
                <ul
                  data-app-reveal
                  className={`${tags} mt-6`}
                  aria-label={lang === "pt" ? "Tecnologias" : "Technologies"}
                >
                  {app.technologies.map((technology) => (
                    <li key={technology}>{technology}</li>
                  ))}
                </ul>
              </div>
              <div data-app-rule aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px origin-left bg-accent/45" />
            </details>
          );
        })}
      </ScrollApplications>
    </section>
  );
}
