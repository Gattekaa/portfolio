import { currentWork } from "./current-work";

export type Locale = "pt" | "en";
export const locales: Locale[] = ["pt", "en"];
export const isLocale = (value: string): value is Locale =>
  locales.includes(value as Locale);
export const profile = {
  name: "Vinicius Martins",
  email: "viniciusgabrielm30@gmail.com",
  linkedin: "https://www.linkedin.com/in/vinicius-martins-76a991216/",
  github: "https://github.com/Gattekaa",
  site: (
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.viniciusgabriel.tech"
  ).replace(/\/$/, ""),
};

export const copy = {
  pt: {
    locale: "pt-BR",
    role: "Engenheiro de Software",
    title: "Vinicius Martins | Engenheiro de Software Full Stack",
    description:
      "Portfólio de Vinicius Martins. Arquitetura frontend, Design Systems e desenvolvimento full stack com React, Next.js, TypeScript, .NET, Ruby on Rails e React Native.",
    nav: ["Atuação", "Especialidades", "Sobre", "Contato"],
    skip: "Pular para o conteúdo",
    menu: "Abrir navegação",
    close: "Fechar navegação",
    theme: "Alternar tema",
    eyebrow: "ENGENHARIA DE SOFTWARE",
    headline: ["Interfaces claras.", "Sistemas sólidos."],
    intro:
      "Sou Vinicius Martins. Desenvolvo produtos web e mobile, conectando experiência de uso, arquitetura e regras de negócio.",
    viewWork: "Explorar atuação",
    talk: "Vamos conversar",
    workTitle: "O que desenvolvo hoje.",
    workIntro:
      "Produto próprio e frentes de atuação em aplicações web, backend, mobile e arquitetura de interfaces.",
    all: "Todos",
    product: "Produto",
    architecture: "Arquitetura",
    backend: "Backend",
    mobile: "Mobile",
    case: "Conhecer atuação",
    projectCount: "destaques",
    empty: "Nenhum destaque nesta categoria.",
    expertiseTitle: "Da experiência à infraestrutura.",
    expertiseIntro:
      "Decisões técnicas conectadas ao produto, com atenção ao que o usuário vê e ao que o sistema precisa sustentar.",
    specialties: [
      {
        name: "Arquitetura frontend",
        text: "Interfaces acessíveis, renderização no servidor e padrões que acompanham a evolução do produto.",
        tags: ["React", "Next.js", "TypeScript", "WCAG"],
      },
      {
        name: "Design Systems",
        text: "Componentes reutilizáveis, documentação e testes para dar consistência às interfaces e às equipes.",
        tags: ["Storybook", "Radix UI", "Tailwind CSS", "Vitest"],
      },
      {
        name: "Backend e integrações",
        text: "APIs corporativas, persistência de dados, autenticação, cache distribuído e processamento assíncrono.",
        tags: ["C# / .NET", "Ruby on Rails", "SQL Server", "Redis", "Azure"],
      },
      {
        name: "Desenvolvimento mobile",
        text: "Aplicativos para saúde, trabalho em campo e controle de ponto, com operação offline, sincronização e recursos nativos.",
        tags: ["React Native", "Expo", "SQLite", "WatermelonDB"],
      },
      {
        name: "Qualidade e entrega",
        text: "Revisão de código, testes automatizados e pipelines que apoiam a manutenção contínua do software.",
        tags: ["RSpec", "Testing Library", "CI/CD", "Azure"],
      },
    ],
    aboutTitle: "Prazer, Vinicius.",
    aboutBody:
      "Sou engenheiro de software com mais de 5 anos de experiência em aplicações web e mobile. Atuo entre frontend e backend, da definição de arquitetura à evolução de sistemas em produção.",
    aboutBody2:
      "Gosto de entender o problema antes de escolher a ferramenta. Meu trabalho conecta interfaces, regras de negócio e práticas de engenharia para criar software que as pessoas conseguem usar e as equipes conseguem manter.",
    careerTitle: "Experiência que conecta as partes.",
    education: "Análise e Desenvolvimento de Sistemas",
    school: "Cruzeiro do Sul, fev. 2023 a fev. 2025",
    resume: "Currículo",
    resumeLabel: "Ler currículo em português",
    contactTitle: "O próximo projeto pode começar aqui.",
    contactBody:
      "Tem um produto para construir, uma interface para evoluir ou um desafio técnico para conversar?",
    emailAction: "Enviar e-mail",
    copyEmail: "Copiar e-mail",
    copied: "E-mail copiado",
    copyError: "Não foi possível copiar. Use o link de e-mail.",
    footer: "Interfaces, sistemas e atenção aos detalhes.",
    back: "Todos os destaques",
    challenge: "O contexto",
    approach: "Minha contribuição",
    decisions: "Decisões de engenharia",
    stack: "Tecnologias",
    next: "Próximo projeto",
    live: "Conhecer produto",
    illustrative: "Ilustração conceitual de arquitetura modular.",
    screenshot: "Página inicial do Gatree com um perfil de exemplo.",
    related: "Outras frentes de atuação",
    notFoundTitle: "Página não encontrada.",
    notFoundText:
      "Este endereço não está disponível. Você pode voltar aos projetos.",
    home: "Voltar ao início",
  },
  en: {
    locale: "en",
    role: "Software Engineer",
    title: "Vinicius Martins | Full Stack Software Engineer",
    description:
      "Vinicius Martins’ portfolio. Frontend architecture, Design Systems and full stack development with React, Next.js, TypeScript, .NET, Ruby on Rails and React Native.",
    nav: ["Work", "Expertise", "About", "Contact"],
    skip: "Skip to content",
    menu: "Open navigation",
    close: "Close navigation",
    theme: "Toggle theme",
    eyebrow: "SOFTWARE ENGINEERING",
    headline: ["Clear interfaces.", "Solid systems."],
    intro:
      "I’m Vinicius Martins. I build web and mobile products, connecting user experience, architecture and business logic.",
    viewWork: "Explore my work",
    talk: "Let’s talk",
    workTitle: "What I build today.",
    workIntro:
      "An independent product and areas of practice across web, backend, mobile and interface architecture.",
    all: "All work",
    product: "Product",
    architecture: "Architecture",
    backend: "Backend",
    mobile: "Mobile",
    case: "Explore work",
    projectCount: "highlights",
    empty: "No highlights in this category.",
    expertiseTitle: "From experience to infrastructure.",
    expertiseIntro:
      "Engineering decisions connected to the product, considering what people see and what the system needs to support.",
    specialties: [
      {
        name: "Frontend architecture",
        text: "Accessible interfaces, server rendering and patterns that support a product as it evolves.",
        tags: ["React", "Next.js", "TypeScript", "WCAG"],
      },
      {
        name: "Design Systems",
        text: "Reusable components, documentation and tests that bring consistency to interfaces and teams.",
        tags: ["Storybook", "Radix UI", "Tailwind CSS", "Vitest"],
      },
      {
        name: "Backend and integrations",
        text: "Enterprise APIs, data persistence, authentication, distributed caching and asynchronous processing.",
        tags: ["C# / .NET", "Ruby on Rails", "SQL Server", "Redis", "Azure"],
      },
      {
        name: "Mobile development",
        text: "Healthcare, fieldwork and time tracking apps with offline workflows, data synchronization and native device features.",
        tags: ["React Native", "Expo", "SQLite", "WatermelonDB"],
      },
      {
        name: "Quality and delivery",
        text: "Code reviews, automated tests and delivery pipelines that support ongoing software maintenance.",
        tags: ["RSpec", "Testing Library", "CI/CD", "Azure"],
      },
    ],
    aboutTitle: "Hi, I’m Vinicius.",
    aboutBody:
      "I’m a software engineer with over 5 years of experience building web and mobile applications. I work across frontend and backend, from architecture decisions to maintaining production systems.",
    aboutBody2:
      "I like to understand the problem before choosing the tool. My work connects interfaces, business logic and engineering practices to create software people can use and teams can maintain.",
    careerTitle: "Experience across the whole system.",
    education: "Systems Analysis and Development",
    school: "Cruzeiro do Sul, Feb 2023 to Feb 2025",
    resume: "Resume",
    resumeLabel: "Read resume in English",
    contactTitle: "The next project can start here.",
    contactBody:
      "Building a product, improving an interface or working through an engineering challenge?",
    emailAction: "Send an email",
    copyEmail: "Copy email",
    copied: "Email copied",
    copyError: "Could not copy. Please use the email link.",
    footer: "Interfaces, systems and attention to detail.",
    back: "All work",
    challenge: "The context",
    approach: "My contribution",
    decisions: "Engineering decisions",
    stack: "Technologies",
    next: "Next project",
    live: "Visit product",
    illustrative: "Conceptual illustration of modular architecture.",
    screenshot: "Gatree homepage featuring an example profile.",
    related: "More work",
    notFoundTitle: "Page not found.",
    notFoundText:
      "This address is unavailable. You can return to the projects.",
    home: "Back to home",
  },
};

export type Project = {
  slug: string;
  category: "product" | "architecture" | "backend" | "mobile";
  image?: string;
  imageAlt?: Record<Locale, string>;
  visual?: "dotnet" | "rails" | "mobile" | "design-system";
  title: string;
  tags: string[];
  url?: string;
  conceptual?: boolean;
  content: Record<
    Locale,
    {
      category: string;
      summary: string;
      context: string;
      role: string;
      applicationsTitle?: string;
      applications?: {
        name: string;
        icon:
          | "health"
          | "map"
          | "clock"
          | "shield"
          | "chart"
          | "documents"
          | "business";
        area: string;
        summary: string;
        capabilities: string[];
        technologies: string[];
      }[];
      decisions: { title: string; text: string }[];
    }
  >;
};

const selectedProjects: Project[] = [
  {
    slug: "gatree",
    title: "Gatree",
    category: "product",
    image: "/images/gatree-home.webp",
    imageAlt: {
      pt: "Página inicial do Gatree em preto e dourado, com a chamada Seu mundo. Em um link. e prévia de uma página de links",
      en: "Gatree homepage in black and gold, with the headline Seu mundo. Em um link. and a link-in-bio page preview",
    },
    tags: ["Next.js", "TypeScript", "PostgreSQL"],
    url: "https://gatree.vercel.app/",
    content: {
      pt: {
        category: "Produto próprio",
        summary:
          "Uma presença digital, muitas possibilidades. Links, personalização e analytics em um só produto.",
        context:
          "O Gatree reúne links e conteúdos em páginas personalizáveis. O projeto conecta edição visual, publicação e acompanhamento de acessos em uma experiência de produto completa.",
        role: "Desenvolvimento full stack do produto, incluindo interfaces, edição de conteúdo, personalização visual, persistência e integração entre as funcionalidades.",
        decisions: [
          {
            title: "Personalização como parte do produto",
            text: "Estruturei temas, paletas e recursos visuais para permitir a criação de páginas com diferentes identidades sem perder a consistência da experiência de edição.",
          },
          {
            title: "Interações que respondem ao usuário",
            text: "Implementei personalização em tempo real e organização de conteúdo por drag-and-drop, conectando a edição ao resultado apresentado na página.",
          },
          {
            title: "Uma base para evoluir",
            text: "Utilizei Next.js, TypeScript, Tailwind CSS e PostgreSQL para organizar interfaces, serviços e dados, mantendo espaço para a evolução das funcionalidades.",
          },
        ],
      },
      en: {
        category: "Independent product",
        summary:
          "One digital presence, many possibilities. Links, customization and analytics in a single product.",
        context:
          "Gatree brings links and content together on customizable pages. The project connects visual editing, publishing and traffic analytics in a complete product experience.",
        role: "Full stack product development, including interfaces, content editing, visual customization, persistence and integration across features.",
        decisions: [
          {
            title: "Customization as a product capability",
            text: "Structured themes, color palettes and visual features to support different page identities while maintaining a consistent editing experience.",
          },
          {
            title: "Interactions that respond to the user",
            text: "Implemented real-time customization and drag-and-drop content ordering, connecting the editing experience to the published result.",
          },
          {
            title: "A foundation for ongoing development",
            text: "Used Next.js, TypeScript, Tailwind CSS and PostgreSQL to organize interfaces, services and data while supporting future product development.",
          },
        ],
      },
    },
  },
  {
    slug: "design-system",
    title: "Design System",
    category: "architecture",
    visual: "design-system",
    tags: ["React", "Storybook", "Vitest"],
    content: {
      pt: {
        category: "Arquitetura de interfaces",
        summary:
          "Componentes compartilhados. Uma linguagem visual. Uma base para diferentes aplicações.",
        context:
          "Aplicações corporativas precisam compartilhar padrões de interface e comportamento sem duplicar soluções em cada projeto. O Design System organiza essa base de forma reutilizável.",
        role: "Concepção e estruturação de uma biblioteca corporativa de componentes, com documentação, testes e distribuição de pacotes privados.",
        decisions: [
          {
            title: "Composição e acessibilidade",
            text: "Combinei React, Radix UI e Tailwind CSS para estruturar componentes reutilizáveis e padrões de interação, com atenção à acessibilidade.",
          },
          {
            title: "Documentação junto ao código",
            text: "Organizei a documentação no Storybook e a validação de componentes com Vitest, aproximando comportamento, exemplos e manutenção.",
          },
          {
            title: "Distribuição como biblioteca",
            text: "Estruturei o build com Vite em ES Modules e a distribuição pelo Azure Artifacts, integrando o pacote ao fluxo de desenvolvimento das aplicações.",
          },
        ],
      },
      en: {
        category: "Interface architecture",
        summary:
          "Shared components. One visual language. A foundation for multiple applications.",
        context:
          "Enterprise applications need to share interface and behavioral patterns without duplicating solutions in every project. The Design System provides that reusable foundation.",
        role: "Designed and built a corporate component library with documentation, testing and private package distribution.",
        decisions: [
          {
            title: "Composition and accessibility",
            text: "Combined React, Radix UI and Tailwind CSS to structure reusable components and interaction patterns with attention to accessibility.",
          },
          {
            title: "Documentation alongside code",
            text: "Organized documentation in Storybook and component validation with Vitest, keeping behavior, examples and maintenance connected.",
          },
          {
            title: "Library distribution",
            text: "Set up a Vite ES Modules build and Azure Artifacts distribution, integrating the package into application development workflows.",
          },
        ],
      },
    },
  },
];

export const projects: Project[] = [
  selectedProjects[0],
  ...currentWork,
  selectedProjects[1],
];

export const experience = {
  pt: [
    {
      company: "SENAI Soluções Digitais",
      role: "Engenheiro de Software Full Stack",
      period: "mai. 2024 - atual",
      text: "Arquitetura frontend, Design System corporativo e desenvolvimento de serviços com .NET, Redis e Azure.",
    },
    {
      company: "Clear Cloud Software",
      role: "Engenheiro de Software Full Stack",
      period: "fev. 2022 - mai. 2024",
      text: "Aplicações com React e Next.js, integração de APIs, revisão de código, deploy e SEO técnico.",
    },
    {
      company: "Consultoria independente",
      role: "Desenvolvedor Full Stack e Consultor",
      period: "ago. 2020 - atual",
      text: "Sistemas sob medida, interfaces e regras de negócio com React, Ruby on Rails e PostgreSQL.",
    },
  ],
  en: [
    {
      company: "SENAI Soluções Digitais",
      role: "Full Stack Software Engineer",
      period: "May 2024 - present",
      text: "Frontend architecture, a corporate Design System and backend development with .NET, Redis and Azure.",
    },
    {
      company: "Clear Cloud Software",
      role: "Full Stack Software Engineer",
      period: "Feb 2022 - May 2024",
      text: "React and Next.js applications, API integrations, code reviews, deployment and technical SEO.",
    },
    {
      company: "Independent consulting",
      role: "Full Stack Developer and Consultant",
      period: "Aug 2020 - present",
      text: "Custom systems, interfaces and business logic with React, Ruby on Rails and PostgreSQL.",
    },
  ],
};
