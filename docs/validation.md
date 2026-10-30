# Validação

Verificação local realizada em 29/10/2026 com o build de produção do Next.js 16.4.3.

## Código e rotas

- `npm run build`: aprovado, com verificação TypeScript e páginas estáticas geradas, sem avisos.
- `npm run lint`: aprovado, sem erros ou avisos.
- `npm run check:seo`: aprovado nas catorze páginas públicas.
- Canonical, hreflang, idioma do documento, um H1 por página, descrição, imagem de compartilhamento, schemas JSON-LD, sitemap, robots, redirecionamento permanente e status 404 verificados.
- O HTML público não revela o empregador confidencial.
- 404 personalizada verificada em seis endereços inválidos, incluindo caminhos globais, idiomas e projetos inexistentes: status HTTP 404 preservado, marcador da tela personalizada, um H1 e metadado noindex. A 404 global usa `global-not-found` com a opção documentada `experimental.globalNotFound`, necessária para os múltiplos layouts raiz da aplicação.

## Navegador

- Desktop em 1280px e celular em 390px, sem overflow horizontal.
- Temas claro e escuro conferidos visualmente.
- Filtros de atuação verificados: produto, backend, mobile e arquitetura.
- Blocos de atuação redesenhados com colunas de mesma largura, capas de altura consistente e diagramas ilustrativos de arquitetura. Em 1280px, os quatro blocos secundários medem 576px de largura e 300px de altura, com títulos e tecnologias alinhados por linha. Filtros Todos, Backend e Mobile, responsividade em 390px e temas claro/escuro conferidos.
- Navegação português/inglês e página de projeto verificadas.
- Tela 404 conferida em desktop e celular, temas claro/escuro e português/inglês conforme o endereço. Os dois links de recuperação foram testados no navegador.
- Páginas de detalhes redesenhadas: abertura com resumo visual ou imagem do projeto, navegação por âncoras, contribuição em coluna lateral, experiências em seções nativas expansíveis e decisões técnicas em grade. Abertura por mouse e teclado, abertura e fechamento das seções, idiomas e temas conferidos; sem overflow em 390px.
- Imagem do Gatree substituída por captura da página inicial de `gatree-v2`, usando os recursos visuais do próprio projeto. Arquivo WebP de 82 KB, proporção preservada no card e no detalhe; carregamento e ausência de overflow conferidos em 390px.
- React Native: card, especialidade e página de atuação descrevem saúde comunitária, vistorias em campo e controle de jornada, com funcionalidades e tecnologias verificadas no código dos projetos. Conteúdo conferido nas duas línguas; layout em 1280px e 390px, sem overflow horizontal no celular.
- .NET: card, especialidade e página descrevem gestão de saúde ocupacional e planejamento de metas. Arquitetura, EF Core/SQL Server, Redis, Azure, autenticação, auditoria e testes descritos a partir dos projetos. Conteúdo em português e inglês e layout em 1280px e 390px verificados.
- Ruby on Rails: card e página ampliados com quatro frentes genéricas de atuação e seis temas de engenharia. Hotwire, PostgreSQL, APIs e sincronização, Sidekiq/Redis, permissões, auditoria e testes verificados nos projetos de referência. Conteúdo conferido em português e inglês; layout desktop e mobile de 390px sem overflow horizontal.
- Os trabalhos corporativos utilizam descrições genéricas em português e inglês, inclusive nos cards, sem os nomes internos dos projetos.
- Menu mobile: diálogo modal nativo, conteúdo externo inerte, fechamento por Escape e restauração de foco.
- Ação de copiar e-mail confirmada no navegador.
- Currículo público carregado e botão de impressão disponível.

## Visuais relacionados ao trabalho

- Removidas as referências à composição abstrata de pedra e âmbar na abertura, no projeto Design System e na tela 404.
- A abertura usa um esquema vetorial em HTML/Tailwind de interfaces web/mobile, APIs e dados. A capa e o detalhe de Design System usam amostras da linguagem visual do próprio portfólio, sem representar material de clientes.

## Profundidade do fundo

- Fundo compartilhado em home, detalhes, currículo e 404: luz difusa na paleta oliva/dourado, linhas de construção nas laterais e arcos vetoriais. Temas claro e escuro possuem valores próprios de contraste.
- Textura monocromática em SVG, restrita à camada fixa e sem interceptar cliques ou participar da árvore de acessibilidade. O grão permanece imóvel; luz e contornos possuem deslocamentos suaves ligados ao ponteiro e à rolagem, sem animação autônoma.
- Um controlador com Motion Values e springs atualiza variáveis usadas apenas nos transforms das camadas decorativas, sem renderizar React em cada evento. O ponteiro atua apenas em dispositivos com mouse; saída da janela, perda de foco e resize recentralizam o efeito. Movimento reduzido mantém o fundo estático e a limpeza remove listeners e variáveis.
- As aberturas da home e dos detalhes utilizam somente o fundo global, sem camadas locais duplicadas ou recortes durante as assinaturas de scroll. Especialidades e contato mantêm camadas locais com bordas suavizadas. Os traços vetoriais preservam a espessura em seções longas e as camadas decorativas ficam ocultas na impressão.
- As cenas dos cards são transparentes e compartilham o fundo da página, sem placas retangulares ou padrões locais repetidos. A cena anterior contrai e desaparece durante a entrada da próxima; elementos já invisíveis não interceptam o mouse. No celular, a opacidade retorna explicitamente a 1.
- Home e detalhe Rails conferidos em desktop e 390×844, nos temas claro e escuro; largura do documento de 390px no celular, sem overflow horizontal. Build, lint e verificações de SEO aprovados. Lighthouse da home manteve 100 nas quatro categorias, LCP de 0,9 s, CLS 0 e TBT de 10 ms.

## Movimento de scroll

- Referência: sequências de ScrollStory, MotionBridge e ScrollFinale do projeto local Gatree v2. A seção de especialidades agora utiliza cinco cenas fixadas com sticky nativo, animações coordenadas de tipografia, diagramas e painéis, e progresso ligado à posição do scroll.
- Navegação entre Interfaces, Componentes, Serviços, Mobile e Entrega por mouse, setas, Home e End. Apenas o painel ativo participa da árvore de acessibilidade durante a experiência imersiva; sem movimento, os cinco artigos permanecem em uma lista completa.
- Cena imersiva em desktop a partir de 1024×700 e em telas de 360 a 1023px com altura mínima de 800px. Telas menores, movimento reduzido e falha no carregamento das animações usam a lista estática. Redimensionamento entre 390×844 e 390×740 confirmou a limpeza e a recuperação dos cinco artigos, sem transformações remanescentes.
- Abertura desktop em um palco sticky: as linhas do título deixam a composição, o diagrama de arquitetura ocupa o centro e dá lugar à assinatura Full stack. A altura do palco é definida por Tailwind no HTML, sem depender do carregamento das animações. Em telas pequenas o fluxo é natural.
- Projetos em três cenas desktop: destaque do Gatree em composição lateral e duas duplas com capas uniformes. A cena seguinte contrai, inclina e cobre a anterior. Filtros exibem os resultados em grade normal; seleção Backend e retorno a Todos verificados. Foco por teclado revela a cena correspondente, confirmado ao avançar do Gatree para .NET.
- Sobre com máscara de revelação da foto, parallax interno e entrada sequencial das palavras. Trajetória com título sticky, linha vertical de progresso e entradas coordenadas de empresa, período e descrição. Rodapé com entrada dos dois grupos de conteúdo.
- Título da seção de atuação com entrada por máscara. Contato com expansão circular do fundo e duas linhas tipográficas entrando por direções opostas.
- Em 1280×720, abertura e projetos possuem fixação nativa; em 390×844 voltam ao fluxo natural e removem os transforms de contração das cenas. Ausência de overflow horizontal conferida em ambas. Navegação direta para Sobre, leitura integral do texto e progressão da linha de carreira conferidas.
- A primeira dobra aparece imediatamente no HTML. As animações da sequência são carregadas quando ela se aproxima da tela; sua altura é reservada antes desse carregamento, preservando os destinos das âncoras.
- Conferidos desktop e celular, navegação direta ao contato, retorno à sequência, mouse e teclado, além da limpeza das animações no redimensionamento. Observadores, consultas de mídia e contextos GSAP possuem limpeza ao desmontar. A troca de idioma recria a cena.
- Filtros de projetos continuam recalculando os pontos do scroll por ResizeObserver com refresh seguro, sem interromper o deslocamento nativo pelas âncoras.

## Movimento nas páginas de detalhes

- Aplicado ao modelo compartilhado de Gatree, .NET, Ruby on Rails, React Native e Design System, nos dois idiomas. A troca de rota ou idioma recria o controlador, limpando contextos GSAP, observadores, consultas de mídia e eventos anteriores.
- Abertura desktop em palco sticky com título por máscara e imagem ou diagrama que passa ao centro. A composição inicial fica visível no HTML, com carregamento das animações após a primeira pintura. No celular, o palco retorna ao fluxo natural e o diagrama também fica disponível.
- Contexto com revelação sequencial de palavras, contribuição lateral com entrada coordenada e indicador de leitura. Decisões técnicas possuem entrada por etapas, títulos por máscara e regras que se desenham conforme o scroll. Links relacionados, contato e rodapé seguem a dinâmica da home.
- Experiências continuam em details/summary nativos: abertura por Enter e por clique e preservação do foco verificadas. Com movimento habilitado, cada item se abre automaticamente quando o título chega à área de leitura. Itens já percorridos permanecem abertos para evitar deslocamentos na leitura; o recolhimento manual é respeitado durante aquela passagem. O conteúdo recém-aberto entra em sequência; ResizeObserver recalcula os pontos com refresh seguro após mudanças de altura. Títulos movem-se horizontalmente para preservar o espaço do corpo expandido.
- Conferidos Gatree e Rails em desktop, navegação por âncoras, transição entre os dois detalhes e experiências em 390×844. Sem overflow horizontal; hero volta ao modo compact e a assinatura intermediária fica oculta no celular. Preferência de movimento reduzido desativa os efeitos e preserva o conteúdo completo.

### Expansão progressiva das experiências

- IntersectionObserver acompanha os summaries em uma faixa de leitura abaixo da navegação. A geometria é conferida novamente após cada abertura, porque o conteúdo recém-revelado desloca os próximos títulos.
- A melhoria é independente da largura da tela: redimensionar não recolhe os itens que já foram abertos. Preferência de movimento reduzido e ausência de JavaScript mantêm a interação manual original.
- Grupo nativo exclusivo é desabilitado somente durante o modo progressivo e restaurado na limpeza. Observer, consultas de mídia, listeners e debounce de resize possuem limpeza ao desmontar.
- Rails: segunda e terceira frentes abriram apenas por scroll, preservando as anteriores. Fechamento manual e reabertura pelo teclado conferidos no navegador. Em 390×844, as três frentes abertas foram preservadas após o redimensionamento.
- .NET no celular: âncora Experiências pausou a expansão; a próxima rolagem retomou e abriu a segunda frente. Âncoras, Tab, Home e End pausam a automação, preservando saltos e foco; roda, toque e teclas de leitura retomam o observer. Navegação entre detalhes conferida após End.

## Lighthouse

Auditoria mobile local, com simulação do Lighthouse, em `http://127.0.0.1:3100/pt`:

| Categoria | Nota |
| --- | --- |
| Performance | 100 |
| Accessibility | 100 |
| Best practices | 100 |
| SEO | 100 |

LCP: 0,9 s. CLS: 0. Total Blocking Time: 10 ms.

Esses resultados descrevem o teste local e não métricas de usuários reais, nem garantia de posicionamento em mecanismos de busca. Reavalie após publicar no domínio final.

O relatório completo está em `reports/lighthouse.report.html`.

### Páginas de detalhes

| Página | Performance | Accessibility | Best practices | SEO | LCP | CLS |
| --- | --- | --- | --- | --- | --- | --- |
| Tecnologia | 100 | 100 | 100 | 100 | 0,9 s | 0 |
| Produto | 98 | 100 | 100 | 100 | 2,5 s | 0 |

TBT de 10 ms em ambas. A imagem principal do produto usa carregamento imediato e prioridade alta. Relatórios em `reports/detail-technology.html` e `reports/detail-product.html`.
