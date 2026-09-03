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
  }),
});

export const collections = { articles };