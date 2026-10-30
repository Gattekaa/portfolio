import type { Project } from "./content";
import { mobileApplications } from "./mobile-applications";
import { dotnetProjects } from "./dotnet-projects";
import { railsProjects } from "./rails-projects";

// These entries describe areas of professional practice, not invented products.
export const currentWork: Project[] = [
  {
    slug: "dotnet",
    title: ".NET / Azure",
    category: "backend",
    visual: "dotnet",
    tags: ["C# / .NET 8", "SQL Server", "Redis", "Azure"],
    content: {
      pt: {
        category: "Desenvolvimento backend",
        summary:
          "APIs para saúde ocupacional e gestão de metas, com SQL Server, Redis e processamento assíncrono no Azure.",
        context:
          "Sistemas de saúde ocupacional e planejamento precisam traduzir regras de negócio em processos consistentes. Minha atuação conecta APIs, dados, autenticação e serviços externos para apoiar o trabalho de diferentes equipes e perfis de usuário.",
        role: "Desenvolvimento e evolução de APIs REST com C# e ASP.NET Core, seguindo Clean Architecture. Atuação em casos de uso, persistência com Entity Framework Core e SQL Server, cache e concorrência com Redis, integrações, auditoria e processamento assíncrono com serviços Azure.",
        applicationsTitle: "Projetos em que atuei.",
        applications: dotnetProjects.pt,
        decisions: [
          {
            title: "Arquitetura e persistência",
            text: "Estruturo APIs em camadas de domínio, aplicação e infraestrutura, com casos de uso, injeção de dependências e validações. Utilizo Entity Framework Core e SQL Server para organizar consultas, relacionamentos e transações.",
          },
          {
            title: "Cache e controle de concorrência",
            text: "Trabalho com cache distribuído em Redis, expiração de dados e mecanismos de coordenação entre operações. Considero a consistência das informações e o acesso simultâneo a recursos compartilhados.",
          },
          {
            title: "Integrações e processamento assíncrono",
            text: "Integro sistemas corporativos e serviços externos, utilizando Azure Service Bus e Azure Functions para filas, notificações, importações e rotinas em segundo plano, com tratamento de falhas e novas tentativas.",
          },
          {
            title: "Autenticação e rastreabilidade",
            text: "Atuo com autenticação corporativa via Azure AD, tokens JWT e permissões por perfil. Desenvolvo auditoria de alterações com Entity Framework Core e utilizo logs estruturados com Serilog para apoiar o acompanhamento das operações.",
          },
          {
            title: "Validação e manutenção",
            text: "Utilizo xUnit e Moq em testes de casos de uso, serviços e validações, com FluentValidation para regras de entrada. Trabalho com documentação de APIs em Swagger e ambientes de desenvolvimento em Docker.",
          },
        ],
      },
      en: {
        category: "Backend development",
        summary:
          "APIs for occupational health and target management, with SQL Server, Redis and asynchronous processing on Azure.",
        context:
          "Occupational health and planning systems need to translate business rules into consistent workflows. My work connects APIs, data, authentication and external services to support different teams and user roles.",
        role: "Development and ongoing improvement of REST APIs with C# and ASP.NET Core using Clean Architecture. Work includes use cases, Entity Framework Core and SQL Server persistence, Redis caching and concurrency control, integrations, auditing and asynchronous processing with Azure services.",
        applicationsTitle: "Projects I’ve worked on.",
        applications: dotnetProjects.en,
        decisions: [
          {
            title: "Architecture and persistence",
            text: "Structure APIs into domain, application and infrastructure layers, using use cases, dependency injection and validation. Use Entity Framework Core and SQL Server to organize queries, relationships and transactions.",
          },
          {
            title: "Caching and concurrency control",
            text: "Work with distributed Redis caching, data expiration and coordination between operations, accounting for information consistency and concurrent access to shared resources.",
          },
          {
            title: "Integrations and asynchronous processing",
            text: "Integrate enterprise systems and external services using Azure Service Bus and Azure Functions for queues, notifications, imports and background tasks, with failure handling and retries.",
          },
          {
            title: "Authentication and traceability",
            text: "Work with enterprise authentication through Azure AD, JWT tokens and role-based permissions. Develop change auditing with Entity Framework Core and use structured Serilog logs to support operational monitoring.",
          },
          {
            title: "Validation and maintainability",
            text: "Use xUnit and Moq to test use cases, services and validation, with FluentValidation for input rules. Work with Swagger API documentation and Docker development environments.",
          },
        ],
      },
    },
  },
  {
    slug: "ruby-on-rails",
    title: "Ruby on Rails",
    category: "backend",
    visual: "rails",
    tags: ["Ruby on Rails", "PostgreSQL", "Hotwire", "Sidekiq"],
    content: {
      pt: {
        category: "Desenvolvimento full stack",
        summary:
          "Sistemas de gestão em saúde, jornada, documentos e compras, com Rails, PostgreSQL e integrações entre serviços.",
        context:
          "Sistemas de gestão conectam rotinas de diferentes equipes, regras de negócio extensas e grandes volumes de registros. Minha atuação com Rails envolve evoluir essas aplicações em produção, integrando interfaces web, processamento de dados e serviços externos.",
        role: "Desenvolvimento full stack com Ruby on Rails, PostgreSQL e JavaScript, da implementação de regras de negócio e APIs à evolução de interfaces com Turbo e Stimulus. Atuação em consultas, sincronização com aplicativos mobile, processamento em segundo plano, relatórios, auditoria e testes automatizados.",
        applicationsTitle: "Frentes de atuação.",
        applications: railsProjects.pt,
        decisions: [
          {
            title: "Regras de negócio e persistência",
            text: "Organizo fluxos de negócio com serviços, validações e modelos Active Record. Trabalho com relacionamentos, transações e migrações em PostgreSQL, considerando a consistência dos dados e a evolução das funcionalidades existentes.",
          },
          {
            title: "Interfaces com Hotwire",
            text: "Evoluo formulários, listagens e interações com Turbo e Stimulus, utilizando atualizações parciais e componentes reutilizáveis para conectar a interface às regras executadas no servidor.",
          },
          {
            title: "Consultas e desempenho",
            text: "Investigo consultas Active Record e SQL, trabalhando com carregamento antecipado de associações, filtros, paginação e processamento em lotes. Considero o custo das consultas em históricos, relatórios e telas com muitos registros.",
          },
          {
            title: "APIs e sincronização de dados",
            text: "Desenvolvo integrações HTTP e APIs para aplicativos mobile, incluindo autenticação por token e sincronização incremental. Trabalho com validação de dados recebidos, serialização e tratamento de respostas e falhas entre sistemas.",
          },
          {
            title: "Processamento em segundo plano",
            text: "Utilizo Sidekiq e Redis para importações, relatórios, notificações e rotinas agendadas. Organizo o acompanhamento dessas operações e a geração de documentos e planilhas sem concentrar todo o processamento na requisição web.",
          },
          {
            title: "Permissões, auditoria e testes",
            text: "Atuo com controle de acesso e histórico de alterações com PaperTrail. Utilizo RSpec, FactoryBot e simulação de serviços externos para validar regras de negócio, integrações e regressões durante a evolução das aplicações.",
          },
        ],
      },
      en: {
        category: "Full stack development",
        summary:
          "Healthcare, workforce, document and procurement systems built with Rails, PostgreSQL and service integrations.",
        context:
          "Management systems connect workflows across teams, extensive business logic and large record sets. My Rails work involves developing these production applications, connecting web interfaces, data processing and external services.",
        role: "Full stack development with Ruby on Rails, PostgreSQL and JavaScript, from business logic and APIs to interfaces using Turbo and Stimulus. Work includes database queries, mobile app synchronization, background processing, reports, auditing and automated testing.",
        applicationsTitle: "Areas of practice.",
        applications: railsProjects.en,
        decisions: [
          {
            title: "Business logic and persistence",
            text: "Organize business workflows using services, validation and Active Record models. Work with PostgreSQL relationships, transactions and migrations, accounting for data consistency and existing application behavior.",
          },
          {
            title: "Interfaces with Hotwire",
            text: "Develop forms, listings and interactions with Turbo and Stimulus, using partial updates and reusable components to connect the interface to server-side business logic.",
          },
          {
            title: "Queries and performance",
            text: "Investigate Active Record and SQL queries, working with association preloading, filtering, pagination and batch processing. Consider query costs in history views, reports and screens with large record sets.",
          },
          {
            title: "APIs and data synchronization",
            text: "Develop HTTP integrations and mobile app APIs, including token authentication and incremental synchronization. Work with input validation, serialization, response handling and failures between systems.",
          },
          {
            title: "Background processing",
            text: "Use Sidekiq and Redis for imports, reports, notifications and scheduled tasks. Organize operation tracking and document and spreadsheet generation without concentrating all processing in the web request.",
          },
          {
            title: "Permissions, auditing and testing",
            text: "Work with access control and change history using PaperTrail. Use RSpec, FactoryBot and external service stubs to validate business logic, integrations and regressions as applications evolve.",
          },
        ],
      },
    },
  },
  {
    slug: "react-native",
    title: "React Native",
    category: "mobile",
    visual: "mobile",
    tags: ["React Native", "Expo", "TypeScript", "Offline-first"],
    content: {
      pt: {
        category: "Desenvolvimento mobile",
        summary:
          "Aplicativos para saúde, vistorias em campo e controle de ponto, com dados locais e sincronização offline.",
        context:
          "Agentes em campo e profissionais que registram sua jornada precisam trabalhar mesmo com conexão instável. Esses aplicativos conectam cadastros, visitas, vistorias e marcações de ponto aos sistemas de gestão, com dados disponíveis no dispositivo.",
        role: "Desenvolvimento e evolução de aplicativos com React Native e TypeScript, utilizando Expo, integração com APIs Ruby on Rails, bancos locais e recursos nativos. Atuação em interfaces, formulários, sincronização de dados e fluxos de uso no Android.",
        applications: mobileApplications.pt,
        decisions: [
          {
            title: "Dados disponíveis sem conexão",
            text: "Trabalho com persistência local em WatermelonDB e SQLite, sincronização incremental e tratamento de pendências para dar continuidade às atividades quando a conexão está indisponível.",
          },
          {
            title: "Recursos do dispositivo integrados ao produto",
            text: "Integro câmera, detecção facial, geolocalização, mapas e geração de PDFs aos fluxos dos aplicativos, considerando permissões e estados de carregamento ou falha.",
          },
          {
            title: "Formulários e regras de negócio",
            text: "Organizo componentes e formulários com TypeScript, React Hook Form e Zod. Conecto validações e regras de negócio às APIs, com atenção à manutenção e à consistência entre os dados locais e o servidor.",
          },
        ],
      },
      en: {
        category: "Mobile development",
        summary:
          "Healthcare, field inspection and time tracking apps with local data and offline synchronization.",
        context:
          "Field workers and employees tracking their time need to keep working with unreliable connectivity. These apps connect registration, home visits, inspections and clock-ins to management systems, with data available on the device.",
        role: "Development and ongoing improvement of React Native and TypeScript apps using Expo, Ruby on Rails APIs, local databases and native device features. Work spans interfaces, forms, data synchronization and Android workflows.",
        applications: mobileApplications.en,
        decisions: [
          {
            title: "Data available without a connection",
            text: "Work with local persistence in WatermelonDB and SQLite, incremental synchronization and pending changes so users can continue their tasks when connectivity is unavailable.",
          },
          {
            title: "Device capabilities connected to the product",
            text: "Integrate camera access, face detection, geolocation, maps and PDF generation into app workflows, accounting for permissions, loading states and failures.",
          },
          {
            title: "Forms and business logic",
            text: "Structure components and forms using TypeScript, React Hook Form and Zod. Connect validation and business logic to APIs, with attention to maintainability and consistency between local data and the server.",
          },
        ],
      },
    },
  },
];
