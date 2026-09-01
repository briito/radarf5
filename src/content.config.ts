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
    description: z.string(),
    author: z.string().default("Redação Radar F5"), // Valor padrão
    pubDate: z.coerce.date(),
    category: z.string(),
    image: z.string(),
    imageAlt: z.string().default("Imagem ilustrativa"),
    draft: z.boolean().optional().default(false), // Útil para ocultar rascunhos no AdSense
  }),
});

export const collections = { articles };