# Revisão local de segurança — 25/11/2026

## ID de tópico na URL

**Pode permanecer na URL.** O identificador descreve uma notícia compartilhada; não é senha, token ou autorização. Ocultar IDs ou trocar por slugs não resolve IDOR. Não foi identificado bypass Premium pela troca do ID no código revisado.

- [Proxy de detalhe](app/api/topics/[topicId]/route.ts): valida formato do ID, sessão via `getUser()`, assinatura e resposta upstream. Sem Premium, exige que o ID pertença à amostra pública e sanitiza a resposta. IDs fora da amostra retornam 404.
- [SSR de detalhe](app/topicos/[topicId]/page.tsx): exige login para a página, verifica assinatura e limita previews à amostra pública.
- [Helpers](lib/server/topics-api.ts): bearer encaminhado somente no servidor, fetch `no-store`, assinatura falha fechada.
- Spectrum verifica JWT e `require_premium()` antes de entregar detalhe completo. ID conhecido não concede assinatura. Queries usam Supabase/PostgREST; IDs não são interpolados em SQL pelo site.
- [Sanitização](lib/topics.ts) restringe campos públicos, quantidade de artigos e protocolos de links. React renderiza texto sem HTML fornecido pelo tópico.
- Respostas autenticadas do proxy são `private, no-store` com `Vary: Cookie`. Não usar caches compartilhados para essas respostas.

## Correções realizadas

1. **Dependências:** `npm audit --omit=dev` apontou seis pacotes vulneráveis, incluindo Next.js 16.2.10 com classificação crítica. Next e eslint-config-next atualizados para **16.4.6**; transitivas compatíveis atualizadas. Auditoria completa final: **zero vulnerabilidades reportadas**, não garantia de ausência de falhas desconhecidas.
2. **Retorno após login:** a validação do formulário era menos restrita que callback/SSR. [safeReturnTo](lib/safeReturnTo.ts) agora é compartilhado, exige origem local após normalização e rejeita barras invertidas, controles e URLs protocol-relative. Caminhos como `/@example.com` continuam locais e não foram classificados como redirecionamento externo.
3. **Cabeçalhos:** [next.config.ts](next.config.ts) adiciona `nosniff`, `DENY`, política de referrer que omite caminho para outras origens e CSP com `frame-ancestors 'none'`, `object-src 'none'`, `base-uri 'self'`. Esta CSP é parcial: não é uma política completa de scripts/nonces.
4. **Regressões:** `npm run test:security` executa dez testes com os helpers/Route Handler reais e upstream simulado: IDs inválidos, amostra pública, conta free, negação Premium upstream, sessão/assinatura, campos públicos, cache, redirecionamentos e texto copiado.

## Verificação de segredos

Arquivos de ambiente foram conferidos com comandos Git que **não imprimem valores**: ambiente local ignorado, não rastreado e sem histórico encontrado nas refs locais consultadas. Presença de segredo server-only em ambiente ignorado não demonstra vazamento. Não foi feita rotação nem reescrita de histórico. Esta revisão não certifica forks, refs removidas, logs, CI, hospedagem ou credenciais de produção.

## Limites e recomendações operacionais

- Não é pentest nem auditoria completa de RLS, banco, infraestrutura ou contas reais. Confira políticas RLS e privilégios diretamente no Supabase antes de publicar.
- O detalhe **público** de Spectrum pode oferecer preview de outros IDs a clientes diretos, enquanto o site exige os três atuais. Isso é diferença de política de acesso a previews, **não prova de entrega de campos Premium**. Se o limite de três IDs precisar valer globalmente, deve ser imposto e testado no backend; não esconder URLs como mitigação.
- Não há rate limit distribuído no proxy/analytics local. Configure WAF/rate limiting na hospedagem/API para abuso, custos e negação de serviço; um contador process-local não substitui isso.
- Revisão de código e doubles não certifica autorização no deploy. Teste anônimo/free/Premium/expirado contra o ambiente alvo sem acessar contas alheias, e confirme TLS, headers, caches e ausência de segredos no bundle/logs.
- Login via Supabase deve manter redirect allowlist e credenciais públicas separadas de service role. HSTS depende da implantação HTTPS; não foi forçado em localhost.

## Validação executada

Lint, TypeScript, dez testes de segurança, build Next 16.4.6, auditoria completa de dependências e `git diff --check` aprovados. Headers conferidos via HTTP local. Landing verificada em 320/390/768/1440px; detalhe validado com fixtures nos dois temas, incluindo cópia permitida/negada e resumo expandido. Sem deploy nem envio de notificações/alterações no banco.