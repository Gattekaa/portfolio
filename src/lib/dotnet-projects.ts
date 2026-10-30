import type { Locale, Project } from "./content";

type Applications = NonNullable<Project["content"][Locale]["applications"]>;

export const dotnetProjects: Record<Locale, Applications> = {
  pt: [
    {
      name: "Gestão de saúde ocupacional",
      icon: "shield",
      area: "Segurança e saúde do trabalho",
      summary:
        "Serviços para organizar processos de saúde ocupacional, conectando prestadores, documentos, atendimentos e sistemas corporativos.",
      capabilities: [
        "APIs para credenciamento, agendamentos e gestão documental",
        "Integrações corporativas e processamento em segundo plano",
        "Cache distribuído, controle de concorrência e auditoria",
      ],
      technologies: [
        "ASP.NET Core",
        "EF Core",
        "SQL Server",
        "Redis",
        "Azure Functions",
      ],
    },
    {
      name: "Planejamento e acompanhamento de metas",
      icon: "chart",
      area: "Planejamento e gestão",
      summary:
        "Backend para definição e acompanhamento de metas, com regras de negócio que conectam unidades, regionais e diferentes perfis de acesso.",
      capabilities: [
        "Fluxos de pactuação, regionalização e indicadores",
        "Importação de dados, relatórios e notificações",
        "Autenticação corporativa, permissões e rastreabilidade",
      ],
      technologies: [
        ".NET 8",
        "SQL Server",
        "Azure Service Bus",
        "Azure AD",
        "xUnit",
      ],
    },
  ],
  en: [
    {
      name: "Occupational health management",
      icon: "shield",
      area: "Occupational health and safety",
      summary:
        "Services supporting occupational health workflows, connecting providers, documents, appointments and enterprise systems.",
      capabilities: [
        "APIs for provider accreditation, scheduling and document management",
        "Enterprise integrations and background processing",
        "Distributed caching, concurrency control and auditing",
      ],
      technologies: [
        "ASP.NET Core",
        "EF Core",
        "SQL Server",
        "Redis",
        "Azure Functions",
      ],
    },
    {
      name: "Target planning and tracking",
      icon: "chart",
      area: "Planning and performance management",
      summary:
        "Backend services for setting and tracking targets, with business logic connecting organizational units, regions and access roles.",
      capabilities: [
        "Target-setting workflows, regional allocation and indicators",
        "Data imports, reports and notifications",
        "Enterprise authentication, permissions and traceability",
      ],
      technologies: [
        ".NET 8",
        "SQL Server",
        "Azure Service Bus",
        "Azure AD",
        "xUnit",
      ],
    },
  ],
};
