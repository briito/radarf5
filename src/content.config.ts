// src/content/config.ts
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const articles = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/articles",
  }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    author: z.string().default("Redação Radar F5"),
    pubDate: z.coerce.date(),
    category: z.string(),
    image: z.string(),
    imageAlt: z.string().default("Imagem ilustrativa"),
    // Se definido, a imagem de capa do artigo vira um link clicável
    // (ex: direto para uma oferta de afiliado específica).
    imageLink: z.string().url().optional(),
    draft: z.boolean().optional().default(false),
    // CTA de afiliado (Hotmart/Kiwify) exibido no final do artigo.
    // Só aparece se `ctaUrl` for definido; sem ele, nada é renderizado.
    // `ctaText` e `ctaButtonLabel` já vêm com um texto padrão pensado pra
    // ser repetido em todos os artigos — normalmente só `ctaUrl` muda.
    ctaUrl: z.string().url().optional(),
    ctaText: z
      .string()
      .optional()
      .default(
        "Quer aprender a construir um negócio digital e ter uma renda recorrente?",
      ),
    ctaButtonLabel: z.string().optional().default("Quero Aprender"),
  }),
});

export const collections = { articles };