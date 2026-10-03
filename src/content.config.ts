// src/content.config.ts
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { CATEGORY_NAMES } from "./lib/categories";

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
    // Data da última revisão relevante (exibida como "Atualizado em").
    updatedDate: z.coerce.date().optional(),
    // Precisa ser uma das categorias definidas em src/lib/categories.ts
    category: z.enum(CATEGORY_NAMES),
    image: z.string(),
    imageAlt: z.string().default("Imagem ilustrativa"),
    imageLink: z.string().url().optional(),
    draft: z.boolean().optional().default(false),

    // Slugs de artigos relacionados (links internos / cluster).
    // Se vazio, o site sugere outros artigos da mesma categoria.
    related: z.array(z.string()).default([]),

    // Próximo passo (CTA) no fim do artigo. Só aparece se ctaUrl E ctaText existirem.
    // ctaType: "isca" (material gratuito), "produto" (produto próprio) ou
    // "afiliado" (único tipo que exibe aviso de comissão e rel="sponsored").
    ctaUrl: z.string().url().optional(),
    ctaText: z.string().optional(),
    ctaButtonLabel: z.string().optional().default("Acessar"),
    ctaType: z.enum(["isca", "produto", "afiliado"]).default("isca"),
  }),
});

export const collections = { articles };
