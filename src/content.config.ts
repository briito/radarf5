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
    translationKey: z.string().optional(),
    description: z.string(),
    author: z.string().default("Redação Radar F5"),
    pubDate: z.coerce.date(),
    category: z.string(),
    language: z.enum(["pt", "en", "es"]).default("pt"),
    image: z.string(),
    imageAlt: z.string().default("Imagem ilustrativa"),
    draft: z.boolean().optional().default(false),
    // Card de oferta/afiliado exibido no espaço reservado para anúncios
    // (no meio do artigo) enquanto o AdSense ainda não está ativo.
    // Quando ADS_ENABLED=true, esse espaço passa a mostrar o anúncio do
    // AdSense no lugar deste card automaticamente — não precisa remover.
    affiliateProduct: z
      .object({
        name: z.string(),
        image: z.string(),
        imageAlt: z.string().optional(),
        price: z.string().optional(),
        url: z.string().url(),
        ctaText: z.string().optional(),
      })
      .optional(),
  }),
});

export const collections = { articles };