import type { Locale, Project } from "./content";

type Applications = NonNullable<Project["content"][Locale]["applications"]>;

export const railsProjects: Record<Locale, Applications> = {
  pt: [
    {
      name: "Gestão de serviços de saúde",
      icon: "health",
      area: "Atendimento e operação",
      summary:
        "Aplicações que conectam cadastros, atendimentos e rotinas das equipes de saúde, com interfaces web e integração com aplicativos de campo.",
      capabilities: [
        "Cadastros, agendamentos e histórico de atendimentos",
        "APIs de sincronização para aplicativos com operação offline",
        "Relatórios, integrações e processamento de dados",
      ],
      technologies: ["Ruby on Rails", "PostgreSQL", "Turbo", "Stimulus"],
    },
    {
      name: "Gestão de jornada e frequência",
      icon: "clock",
      area: "Pessoas e operações",
      summary:
        "Sistemas para acompanhar a jornada de trabalho, integrando marcações de diferentes origens às regras de apuração e aos documentos de ponto.",
      capabilities: [
        "Apuração de frequência, escalas e banco de horas",
        "Integração com relógios de ponto e aplicativos mobile",
        "Espelhos de ponto, comprovantes e fluxos de assinatura",
      ],
      technologies: ["Ruby on Rails", "PostgreSQL", "Sidekiq", "RSpec"],
    },
    {
      name: "Gestão documental e processos digitais",
      icon: "documents",
      area: "Documentos e colaboração",
      summary:
        "Organização de documentos e processos administrativos, com controle de acesso, histórico de alterações e recursos de assinatura.",
      capabilities: [
        "Organização de documentos, anexos e versões",
        "Permissões, assinaturas e histórico de operações",
        "Geração de PDFs e integração entre sistemas",
      ],
      technologies: ["Ruby on Rails", "PaperTrail", "Stimulus", "RSpec"],
    },
    {
      name: "Gestão de compras e contratos",
      icon: "business",
      area: "Processos administrativos",
      summary:
        "Aplicações que conectam solicitações de compra, fornecedores e contratos, com importação de dados e integração com serviços externos.",
      capabilities: [
        "Solicitações, contratos e acompanhamento de fornecedores",
        "Importação de planilhas e relatórios em segundo plano",
        "Integrações com APIs e tratamento de respostas externas",
      ],
      technologies: ["Ruby on Rails", "PostgreSQL", "Sidekiq", "Redis"],
    },
  ],
  en: [
    {
      name: "Healthcare service management",
      icon: "health",
      area: "Care delivery and operations",
      summary:
        "Applications connecting records, appointments and healthcare team workflows, with web interfaces and integration with fieldwork apps.",
      capabilities: [
        "Registration, scheduling and care history",
        "Synchronization APIs for apps with offline workflows",
        "Reports, integrations and data processing",
      ],
      technologies: ["Ruby on Rails", "PostgreSQL", "Turbo", "Stimulus"],
    },
    {
      name: "Workforce time and attendance",
      icon: "clock",
      area: "People and operations",
      summary:
        "Systems for tracking working hours, connecting clock-ins from different sources to attendance calculations and timesheet documents.",
      capabilities: [
        "Attendance calculations, work schedules and time balances",
        "Integration with time clocks and mobile apps",
        "Timesheets, receipts and signing workflows",
      ],
      technologies: ["Ruby on Rails", "PostgreSQL", "Sidekiq", "RSpec"],
    },
    {
      name: "Document management and digital workflows",
      icon: "documents",
      area: "Documents and collaboration",
      summary:
        "Document and administrative workflow management with access control, change history and signing features.",
      capabilities: [
        "Document, attachment and version management",
        "Permissions, signatures and operation history",
        "PDF generation and integrations between systems",
      ],
      technologies: ["Ruby on Rails", "PaperTrail", "Stimulus", "RSpec"],
    },
    {
      name: "Procurement and contract management",
      icon: "business",
      area: "Administrative workflows",
      summary:
        "Applications connecting purchase requests, suppliers and contracts, with data imports and external service integrations.",
      capabilities: [
        "Purchase requests, contracts and supplier tracking",
        "Spreadsheet imports and background report generation",
        "API integrations and external response handling",
      ],
      technologies: ["Ruby on Rails", "PostgreSQL", "Sidekiq", "Redis"],
    },
  ],
};
