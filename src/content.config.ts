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
    // Se true, não insere o card de oferta automático no meio do artigo
    // (útil quando o autor já colocou manualmente uma imagem/link no texto).
    hideMiddleAdSlot: z.boolean().optional().default(false),
    // Se true, não insere automaticamente o card de oferta no meio do
    // artigo (útil quando o artigo já tem uma imagem/link manual no meio
    // e o card completo deve aparecer só no final).
    disableMiddleOffer: z.boolean().optional().default(false),
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
        links: z
          .array(
            z.object({
              label: z.string(),
              url: z.string().url(),
              price: z.string().optional(),
              marketplace: z.enum(["amazon", "shopee", "mercadolivre"]).optional(),
            }),
          )
          .min(1),
      })
      .optional(),
  }),
});

export const collections = { articles };