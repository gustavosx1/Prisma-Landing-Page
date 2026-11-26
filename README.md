# Prisma Site — landing, conta e tópicos web

**Atualizado em: 2026-11-25.** Descreve o checkout local com a atualização editorial do site; não comprova deploy, migrações aplicadas, configuração Supabase/lojas ou disponibilidade de produção.

Site Next.js **16.4.6**, React **19.2.4**, TypeScript e Tailwind 4, com App Router, Supabase Auth SSR e proxy server-side para a API Spectrum. Versões/scripts: [package.json](package.json). Não é só uma landing nem um backend alternativo de notícias.

## Mapa do workspace para LLMs

A raiz `/home/gusta/Prisma_app` **não tem Git**. São três repositórios independentes, não um monorepo:

| Projeto | Responsabilidade | Fontes iniciais |
|---|---|---|
| [../spectrum/](../spectrum/) | FastAPI, scraper RSS/Playwright, Celery/Redis, Supabase, IA, assinatura e push | [README](../spectrum/README.md), [CLAUDE](../spectrum/CLAUDE.md), [ARCHITECTURE](../spectrum/ARCHITECTURE.md), [OPERATIONS](../spectrum/OPERATIONS.md) |
| [../spectrum_front/](../spectrum_front/) | App Expo iOS/Android/Web, sessão, compra/restauração nativa e consumo da API | [README](../spectrum_front/README.md), [CLAUDE](../spectrum_front/CLAUDE.md), [PRODUCT](../spectrum_front/PRODUCT.md), [DESIGN](../spectrum_front/DESIGN.md), [DEPLOYMENT](../spectrum_front/DEPLOYMENT.md) |
| Este repositório | Landing institucional, login/cadastro, feed/detalhe web e analytics | Este README, [AGENTS.md](AGENTS.md), [CLAUDE.md](CLAUDE.md), código abaixo |

Visão consolidada e decisões/permissões: [../CODEBASE_DOCUMENTATION.md](../CODEBASE_DOCUMENTATION.md). Use `git status`/`diff` dentro de cada projeto; preserve alterações de terceiros. Não executar SQL, conceder admin, ativar imagens, enviar push, publicar/deployar ou fazer commit sem autorização específica.

**Precedência:** código/DTOs/testes atuais para comportamento; política editorial de **16/11/2026** para design; runbooks para operação. Documentos irmãos ainda contêm trechos históricos de free 4/20, claims, refresh legado e digest automático. Confirme no código; não reproduza esses trechos como contrato vigente. Leia [AGENTS.md](AGENTS.md) e a documentação local versionada do Next antes de mudar APIs/convenções.

## Mapa local: onde mudar cada coisa

| Área | Fonte de verdade |
|---|---|
| Composição da landing | [app/page.tsx](app/page.tsx), [components/sections/](components/sections/) |
| Layout, Manrope e tema inicial | [app/layout.tsx](app/layout.tsx), [app/globals.css](app/globals.css) |
| Landing editorial e identidade compartilhada | [components/ui/Landing.module.css](components/ui/Landing.module.css), [PrismaSignature](components/ui/PrismaSignature.tsx), [EditorialHeading](components/ui/EditorialHeading.tsx), [Sunprint](components/ui/Sunprint.tsx), [ThemeToggle](components/ui/ThemeToggle.tsx) |
| Conta e confirmação | [app/conta/page.tsx](app/conta/page.tsx), [components/discovery/AuthForm.tsx](components/discovery/AuthForm.tsx), [app/auth/callback/route.ts](app/auth/callback/route.ts) |
| Feed e detalhe autenticados | [app/topicos/page.tsx](app/topicos/page.tsx), [app/topicos/[topicId]/page.tsx](app/topicos/[topicId]/page.tsx), [components/discovery/](components/discovery/) |
| Sessão SSR, bearer e entitlement | [lib/server/topics-api.ts](lib/server/topics-api.ts), [lib/supabase/server.ts](lib/supabase/server.ts), [lib/supabase/browser.ts](lib/supabase/browser.ts) |
| Proxy same-origin | [app/api/topics/route.ts](app/api/topics/route.ts), [app/api/topics/[topicId]/route.ts](app/api/topics/[topicId]/route.ts), [app/api/auth/me/route.ts](app/api/auth/me/route.ts) |
| DTO adaptado/sanitização/estado | [lib/topics.ts](lib/topics.ts), [lib/topicFeedState.ts](lib/topicFeedState.ts), [components/PageStateRestoration.tsx](components/PageStateRestoration.tsx) |
| Lojas e CTA Premium sem venda web | [lib/appDownload.ts](lib/appDownload.ts), [components/sections/StoreButtons.tsx](components/sections/StoreButtons.tsx), [components/discovery/AppPremiumCTA.tsx](components/discovery/AppPremiumCTA.tsx) |
| Analytics | [app/api/track/route.ts](app/api/track/route.ts), [lib/analytics.ts](lib/analytics.ts), [lib/track.ts](lib/track.ts), [components/Tracker.tsx](components/Tracker.tsx), [supabase/events.sql](supabase/events.sql) |

O proxy está nos **Route Handlers**, não em um arquivo `proxy.ts` (inexistente neste checkout). Não há middleware/proxy global de refresh SSR. Os Server Components leem cookies; Route Handlers podem escrevê-los/renová-los.

O backend **existe no workspace**: montagem em [../spectrum/api/main.py](../spectrum/api/main.py), [router feed](../spectrum/api/feed/router.py), [auth](../spectrum/api/auth/router.py), [JWT](../spectrum/api/middleware/auth.py), [DTOs](../spectrum/api/models/schemas.py) e serviço de assinatura em [../spectrum/api/utils/premium.py](../spectrum/api/utils/premium.py). Serviços vivem em routers/utils/tasks, não em uma pasta presumida `services`. [../spectrum/worker/celery_app.py](../spectrum/worker/celery_app.py) é a fonte da agenda; [../spectrum/worker/tasks/cluster.py](../spectrum/worker/tasks/cluster.py) implementa editorial/imagens/push. O app integra por [../spectrum_front/src/api.ts](../spectrum_front/src/api.ts).

## Rotas e limites de acesso

- `/`: landing institucional e produto, com CTAs de download e **Ver na web**; lojas centralizadas em [lib/appDownload.ts](lib/appDownload.ts).
- `/conta`: login/cadastro via Supabase. `/auth/callback`: troca de `code` por sessão; `returnTo` só permite caminho local.
- `/topicos` e `/topicos/[topicId]`: **exigem conta autenticada**, redirecionando visitantes para `/conta`. Conta gratuita vê preview; autenticação não equivale a assinatura.
- Há páginas de metodologia, privacidade, termos de uso, suporte e exclusão em [app/](app/).
- **Nenhuma assinatura é vendida no site.** Não há checkout, webhook RevenueCat ou payment-sync web. Contratação/restauração permanecem nos apps nativos; Universal/App Links e destinos Premium precisam de validação própria no app/domínio, não podem ser presumidos por uma URL.

### Sessão, proxy e fail-closed

1. `authorizedSession()` em [lib/server/topics-api.ts](lib/server/topics-api.ts) chama **`getUser()` para validar identidade** e só depois **`getSession()` para obter access token**. Não autorizar usando apenas cookies/sessão não verificada.
2. Browser consulta `/api/topics`, `/api/topics/[topicId]` e `/api/auth/me` no próprio site. Next encaminha bearer a Spectrum **no servidor**, sem devolvê-lo nos JSONs de tópicos/perfil. A sessão do SDK Supabase browser é distinta dos segredos privados de infraestrutura.
3. `checkPremium()` consulta `/auth/subscription` com `cache: "no-store"`. HTTP/rede/formato não reconhecido retorna false: **não libera conteúdo Premium sem confirmação**. Spectrum revalida JWT e assinatura/expiração em toda rota protegida; a checagem Next não substitui `require_premium()`.
4. Fetches upstream usam `no-store`; respostas autenticadas do proxy usam **`Cache-Control: private, no-store`**; proxies de tópicos também usam `Vary: Cookie`. Respostas anônimas de tópicos podem ter cache público curto; não cachear dados privados como públicos.
5. 401/403/perda de entitlement em feed/detalhe dos Route Handlers permitem fallback a preview. Busca rejeitada continua erro; 5xx/rede não garantem fallback. O carregamento SSR inicial do detalhe também pode retornar estado indisponível em falha Premium. Não prometer fallback universal.

### Free e Premium: fatos verificados

- Site pede sempre `feed/topicsfree?limit=3&offset=0` e sanitiza campos permitidos de tópicos/artigos em [lib/topics.ts](lib/topics.ts). Paginação não amplia o free; pesquisa gratuita retorna 403, não é ignorada para liberar busca.
- Spectrum já limita o **feed público** a três: aceita `limit` legado até 20 mas faz clamp para 3, `offset>0` retorna vazio e `has_more=false`. Expo fixa os três mais recentes **antes** de filtros por categoria/relevância. Não usar filtros para trocar essa amostra nem buscar páginas adicionais.
- Detalhe free web exige ID presente na amostra dos três atuais. O **detalhe público direto Spectrum não impõe essa mesma allowlist de IDs**; limita artigos por faixa (padrão 2, máximo 5). Não afirmar que o teto de três IDs cobre toda chamada pública direta ao backend.
- Proxy valida feed até 50, busca até 30, termo 2–120 caracteres e offset 0–10.000. Conteúdo/consulta Premium dependem do backend; UI não deve contornar esses gates.
- Preview exclui campos privados de análise/fonte/enquete via allowlist. Não confundir sanitização da resposta web com autorização no banco/API.

## Design vigente e imagens

A referência é a **política editorial vigente de 16/11/2026**, que prevalece sobre seções históricas em [../spectrum_front/DESIGN.md](../spectrum_front/DESIGN.md), com estratégia em [../spectrum_front/PRODUCT.md](../spectrum_front/PRODUCT.md). O site usa **Manrope via `next/font/google`**, não Geist. Assinatura delicada: Prisma Regular 400/28px, news Regular 400/16px; manchetes mantêm hierarquia própria. Preferir superfícies planas, divisores sutis, espaçamento e CTAs legíveis; separar marca roxa, tinta Sunprint e dados políticos.

- Tokens efetivos web: [app/globals.css](app/globals.css); a composição da landing usa [components/ui/Landing.module.css](components/ui/Landing.module.css) com os mesmos tokens. Os valores do app estão em [../spectrum_front/src/theme.ts](../spectrum_front/src/theme.ts) e [../spectrum_front/src/lib/themeContext.tsx](../spectrum_front/src/lib/themeContext.tsx), não são importados automaticamente para Next.
- Tema claro/escuro **manual**, não sincronizado com SO. Site persiste `@prisma/theme-mode` em `localStorage` e aplica `data-theme`; Expo usa AsyncStorage. Mesma chave nominal não compartilha preferência entre origens/apps nem com Supabase.
- Sunprint é arte local decorativa em duas tintas (roxo + teal), não foto do acontecimento nem serviço de geração runtime. [components/discovery/NewsImage.tsx](components/discovery/NewsImage.tsx) trata imagens/fallbacks.
- Backend usa catálogo revisado `topic_image_assets` para tópico; scraper não coleta fotos de matérias. Artigos recebem imagem do veículo (`outlets.outlet_image` → `outlet_logo`/`image_url` na API). Assets seed ficam inativos até revisão de direitos/identidade; figura pública não implica licença livre. Consulte [../spectrum/ARCHITECTURE.md](../spectrum/ARCHITECTURE.md).
- `confidence`/`sources` em helpers de fontes indicam aderência/referência, **não prova da verdade**. DTO Premium expõe fonte oficial por tópico e enquete; o fluxo conectado não gera novas claims por artigo. Não transformar fontes, concordância comunitária ou comparação política em veredito.

## Ambiente e fronteira de segredos

Use [.env.example](.env.example) como modelo e configure o ambiente local/deploy sem registrar valores reais:

| Variável | Onde pode existir | Finalidade |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Browser + servidor | URL pública Supabase Auth |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Browser + servidor | Chave anon/publishable pública; **nunca service role** |
| `SPECTRUM_API_URL` | Somente servidor | Origem Spectrum para SSR/proxy |
| `SUPABASE_URL` | Somente servidor | Supabase usado pelo analytics |
| `SUPABASE_SERVICE_ROLE_KEY` | Somente ambiente privado do servidor | Inserção de analytics em `events`; **segredo**, não autenticação/Premium |

Analytics aceita `visit`/`download_click`, visitor ID e UTM. Sem credenciais, desenvolvimento responde `skipped`; produção retorna erro. A credencial service role nunca deve ter prefixo `NEXT_PUBLIC_`, aparecer em browser/logs/docs ou ser copiada de administração Spectrum por conveniência. O arquivo SQL local não comprova que tabela/RLS estejam aplicados.

### CORS e requisitos de publicação

O caminho browser→Next é same-origin; Next→Spectrum é servidor→servidor. **Não exige liberar origem do site no CORS Spectrum só para este proxy.** Expo Web ou painel administrativo que chamem Spectrum diretamente exigem suas origens HTTPS exatas; CORS vazio permite iniciar a API mas fecha acesso cross-origin do browser. Nunca usar wildcard com credenciais ou liberar localhost em produção.

Antes de publicar, verifique URL Spectrum acessível pelo servidor, env privado/público, redirects `/auth/callback` exatos no Supabase, esquema real de `/auth/subscription`, migrações aplicadas e fluxo login/free/Premium/expiração. Não presumir provedor de hospedagem ou estado de produção. Fontes backend e testes estão no workspace, mas não certificam sua implantação.

Push não é recurso administrativo desta landing: o backend oferece disparos manuais admin com outbox, campanhas separadas e Beat para publicar outbox/consultar receipts; **não há digest automático na agenda atual**. Receipts aceitos não provam exibição no dispositivo. Consulte [../spectrum/README.md](../spectrum/README.md), [../spectrum/api/notifications/router.py](../spectrum/api/notifications/router.py) e a agenda atual antes de seguir exemplos históricos.

## Segurança

Veja [SECURITY_REVIEW.md](SECURITY_REVIEW.md): IDs públicos não concedem acesso, correções de dependências/redirecionamento/cabeçalhos e limites da revisão local. Next.js atualizado para 16.4.6 em 25/11/2026; execute `npm run test:security` e `npm audit` além da validação normal. A landing não exibe o alternador de tema; ele permanece nas telas de conta e tópicos.

## Rodar e validar

Execute dentro deste repositório:

```bash
npm ci
# Configure o ambiente usando .env.example, sem versionar segredos.
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000). API local, se necessária, roda no repositório irmão com configuração própria; não faz parte de `npm run dev`.

```bash
npm run lint
npx tsc --noEmit
npm run build
# Após build, para servir o bundle:
npm start
```

`npm run test:security` executa dez regressões locais com doubles, sem credenciais reais. `next/font/google` pode exigir rede no build para Manrope. Em **2026-11-25**, testes de segurança, `npm audit`, `npm run lint`, `npx tsc --noEmit`, `npm run build` e `git diff --check` passaram. Landing e formulário foram verificados no navegador em 320/390/768/1440px; feed/detalhe foram inspecionados com fixtures, não com uma conta Premium de produção. Suítes dos outros projetos não foram reexecutadas. Antes de release, valide login/callback/logout reais, free sem bypass/paginação, Premium/expiração, sanitização e cache privado contra o ambiente alvo. Resultados locais não comprovam produção.
