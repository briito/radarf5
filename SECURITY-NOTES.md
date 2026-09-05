# Notas de segurança

## path-to-regexp (ReDoS) — GHSA-9wv6-86v2-598j

**Status:** conhecido, não corrigido de propósito. Revisitar periodicamente.

**Onde aparece:** `npm audit` reporta 3 vulnerabilidades "high" vindas de
`path-to-regexp`, usado internamente por `@vercel/routing-utils`, que é
dependência do `@astrojs/vercel` (o adapter de deploy).

**O que é:** o `path-to-regexp` pode gerar expressões regulares lentas
(ReDoS) quando uma rota tem **dois parâmetros no mesmo segmento separados
por um caractere que não é ponto** — ex: `/:a-:b`.
Detalhes: https://github.com/advisories/GHSA-9wv6-86v2-598j

**Por que não foi corrigido com `npm audit fix --force` (em 2026-09):**

1. A correção automática faz downgrade de `@astrojs/vercel` de `^11.0.10`
   para `8.0.4` — um retrocesso de 3 versões principais, com risco real de
   quebrar o adapter/deploy na Vercel.
2. O padrão vulnerável (dois parâmetros no mesmo segmento) **não existe**
   nas rotas deste projeto. Todas as rotas dinâmicas usam um único
   parâmetro por segmento: `/artigos/[slug]`, `/en/articles/[slug]`,
   `/es/articulos/[slug]`.
3. O `path-to-regexp` atua aqui só na geração do `vercel.json` de rotas
   **durante o build** — não processa requisições de usuários em tempo
   real no site publicado.

**Risco real estimado:** baixo. Vale corrigir quando existir uma atualização
do `@astrojs/vercel` que traga uma versão corrigida do `path-to-regexp`
sem exigir esse downgrade.

**Próxima ação:** de tempos em tempos, rodar `npm outdated @astrojs/vercel`
e `npm audit` de novo. Se existir uma versão nova do `@astrojs/vercel` que
resolva isso sem downgrade, atualizar normalmente via `npm install
@astrojs/vercel@latest` e rodar `npm run build` pra confirmar que nada
quebrou antes de subir.
