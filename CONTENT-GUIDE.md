# Guia de conteúdo — Blog Radar F5

Nicho: **IA e Redes Sociais para Pequenos Negócios**.
Modelo: audiência + conteúdo + produtos digitais (Instagram → ManyChat → Blog → produtos → curso).

## Categorias (definidas em `src/lib/categories.ts`)

O campo `category` do frontmatter precisa ser exatamente um destes nomes
(o build falha se for diferente):

- Conteúdo com IA
- Instagram e Redes Sociais
- Atendimento e Vendas
- Produtividade
- Ferramentas e Prompts

Cada categoria tem uma página própria em `/categorias/<slug>/`.

## Frontmatter de um artigo

```yaml
title: ""
slug: "tres-ou-quatro-palavras"      # só palavras-chave; slugs já divulgados não mudam
description: ""                      # até ~160 caracteres
pubDate: "AAAA-MM-DD"                # define a ordem de listagem
updatedDate: "AAAA-MM-DD"            # obrigatório em artigos sobre ferramentas/preços
category: "Conteúdo com IA"
image: "/images/slug-1200x675.webp"  # 1200x675, .webp, em public/images/
imageAlt: ""
draft: false
related: ["outro-slug"]              # links internos; se vazio, usa a mesma categoria
# CTA (opcional): ver ADS-SETUP.md
```

## Estrutura recomendada do artigo

Título claro → introdução (problema) → **resposta direta** → explicação →
passo a passo → exemplos para pequenos negócios → ferramentas/recursos →
**limitações** → conclusão → **próxima ação** (outro artigo, isca ou produto).

## Checklist antes de publicar

- Resolve um problema real do pequeno negócio e responde à intenção de busca?
- Está claro para iniciante, com exemplos concretos?
- Informações que mudam (preços, planos, regras) têm data e fonte?
- Distingue fato, análise, experiência e opinião? Não apresenta teste isolado como verdade universal?
- Tem limitações explícitas e próxima ação coerente?
- Tem links internos (`related`) e possíveis desdobramentos (Reel, carrossel, Stories, isca)?
