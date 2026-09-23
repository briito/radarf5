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
    imageLink: z.string().url().optional(),
    draft: z.boolean().optional().default(false),

    ctaUrl: z.string().url().optional(),
    ctaText: z
      .string()
      .optional()
      .default(
        "Você trabalha o dia inteiro, mas sente que o dinheiro nunca é suficiente?\n\nJá tentou empreender online e sentiu que estava se esforçando muito sem ver resultado?\n\nO problema não é você — é a estratégia.\n\nExiste um método simples para transformar seu conhecimento em uma fonte de renda recorrente.\n\nSem depender só do seu tempo.",
      ),
    ctaButtonLabel: z.string().optional().default("Quero Ver o Método"),
  }),
});

export const collections = { articles };