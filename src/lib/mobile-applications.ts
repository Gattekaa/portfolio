import type { Locale, Project } from "./content";

type Applications = NonNullable<Project["content"][Locale]["applications"]>;

export const mobileApplications: Record<Locale, Applications> = {
  pt: [
    {
      name: "Gestão de saúde comunitária",
      icon: "health",
      area: "Atenção básica",
      summary:
        "Apoio à rotina dos agentes de saúde, do cadastro das famílias ao acompanhamento das visitas domiciliares.",
      capabilities: [
        "Cadastros de cidadãos, famílias e domicílios",
        "Visitas domiciliares e formulários de saúde",
        "Persistência local e sincronização incremental",
      ],
      technologies: [
        "React Native",
        "TypeScript",
        "WatermelonDB",
        "React Hook Form",
      ],
    },
    {
      name: "Vistorias e controle de endemias",
      icon: "map",
      area: "Vigilância em saúde",
      summary:
        "Ferramentas para agentes de combate às endemias organizarem o território e registrarem vistorias em campo.",
      capabilities: [
        "Cadastro de imóveis, vistorias e pendências",
        "Mapas, geolocalização e registro de fotos",
        "Operação offline e sincronização bidirecional",
      ],
      technologies: ["Expo", "WatermelonDB", "NativeWind", "Leaflet"],
    },
    {
      name: "Controle de jornada",
      icon: "clock",
      area: "Gestão de jornada",
      summary:
        "Registro e acompanhamento da jornada de trabalho pelo celular, com recursos nativos e acesso aos documentos de ponto.",
      capabilities: [
        "Marcações offline com sincronização posterior",
        "Captura de foto com detecção facial e geolocalização",
        "Espelhos de ponto, assinatura e comprovantes em PDF",
      ],
      technologies: ["Expo", "SQLite", "Drizzle ORM", "Vision Camera"],
    },
  ],
  en: [
    {
      name: "Community healthcare management",
      icon: "health",
      area: "Primary healthcare",
      summary:
        "Support for community health workers, from household registration to home visit follow-up.",
      capabilities: [
        "Citizen, family and household records",
        "Home visits and healthcare forms",
        "Local persistence and incremental synchronization",
      ],
      technologies: [
        "React Native",
        "TypeScript",
        "WatermelonDB",
        "React Hook Form",
      ],
    },
    {
      name: "Field inspections and vector control",
      icon: "map",
      area: "Public health surveillance",
      summary:
        "Tools for vector control field workers to organize their assigned areas and record property inspections.",
      capabilities: [
        "Property records, inspections and follow-up tasks",
        "Maps, geolocation and photo capture",
        "Offline workflows and bidirectional synchronization",
      ],
      technologies: ["Expo", "WatermelonDB", "NativeWind", "Leaflet"],
    },
    {
      name: "Time and attendance management",
      icon: "clock",
      area: "Time and attendance",
      summary:
        "Mobile time tracking with native device features and access to attendance records and documents.",
      capabilities: [
        "Offline clock-ins with subsequent synchronization",
        "Photo capture with face detection and geolocation",
        "Timesheets, signing workflows and PDF receipts",
      ],
      technologies: ["Expo", "SQLite", "Drizzle ORM", "Vision Camera"],
    },
  ],
};
