# Portfólio de Vinicius Martins

Next.js App Router, React, TypeScript e Tailwind CSS v4. Conteúdo em português e inglês, projetos com páginas próprias e currículo público com impressão em PDF. Criado como um projeto novo; o diretório `my-portfolio` foi preservado.

## Executar

Requer Node.js 20.9 ou superior.

```sh
npm install
npm run dev
```

Acesse http://localhost:3100. A raiz redireciona permanentemente para `/pt`; inglês em `/en`.

## Verificações

```sh
npm run lint
npm run typecheck
npm run build
npm start
# Em outro terminal, com o servidor em execução:
npm run check:seo
```

O comando `check:seo` valida as catorze páginas públicas, metadados, H1, idioma, canonical, hreflang, JSON-LD, sitemap, robots, imagem de compartilhamento, redirecionamento e ausência do vínculo confidencial no HTML.

## Configuração para publicar

Copie `.env.example` para `.env.local` e ajuste `NEXT_PUBLIC_SITE_URL` para o domínio que realmente servirá o site antes do build. O padrão usa o domínio encontrado no portfólio anterior: `https://www.viniciusgabriel.tech`. Canonical, sitemap e JSON-LD usam esse valor. Se publicar em outro domínio, altere a variável e execute novo build.

`GOOGLE_SITE_VERIFICATION` é opcional, para a verificação do Search Console. Após publicar, envie `/sitemap.xml` no Search Console. Não há garantia de posicionamento ou de indexação imediata. O site não inclui analytics ou rastreadores.

Pode ser executado na Vercel ou em qualquer hospedagem compatível com `next build` / `next start`. Nada foi publicado automaticamente.

## Estrutura

Os destaques representam a atuação atual: Gatree como produto próprio; .NET/Azure, Ruby on Rails e React Native como frentes de desenvolvimento; e Design Systems como arquitetura de interfaces. As páginas de atuação descrevem responsabilidades gerais, sem criar projetos ou clientes fictícios. A seleção antiga de Telecom foi removida, incluindo sua imagem e rota no sitemap.

- `src/lib/content.ts`: conteúdo bilíngue, projetos, experiências e links.
- `src/lib/current-work.ts`: descrições bilíngues das frentes de atuação atuais.
- `src/lib/seo.ts`: metadados e schema da pessoa.
- `src/lib/styles.ts`: receitas reutilizáveis de classes Tailwind.
- `src/components`: componentes de apresentação e folhas interativas.
- `src/app/[lang]`: páginas estáticas por idioma.
- `src/app/globals.css`: import do Tailwind, tokens, estilos base e animação compartilhada. Layout, espaçamento e responsividade estão em classes Tailwind nos componentes.
- `public/images`: imagens locais. Outfit é hospedada localmente em `public/fonts`.

O conteúdo público mantém a experiência Rails em consultoria e não divulga clientes confidenciais. O currículo acessível no site segue essa mesma regra; os currículos privados desta conversa não são publicados.

## Imagens e acessibilidade

Gatree usa uma captura existente do projeto com dados de demonstração. A imagem de módulos arquitetônicos é uma ilustração conceitual criada com ImageGen; não representa uma captura de produto. O retrato original foi fornecido pelo próprio usuário. Os arquivos originais e projetos existentes não foram modificados.

Navegação por teclado, link para pular ao conteúdo, menu com diálogo nativo e restauração de foco, preferência de movimento reduzido, temas claro e escuro e links externos com indicação acessível. Conteúdo renderizado no servidor; interatividade isolada em componentes cliente.

## Direção de design

Skills aplicadas: `design-taste-frontend` e `high-end-visual-design`. Paleta inspirada na identidade atual do Gatree, fonte Outfit e composição editorial. Consulte `DESIGN.md` para as decisões de linguagem visual.
