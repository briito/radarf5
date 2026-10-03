// Categorias oficiais do Radar F5 (organizadas por problema do pequeno negócio).
// O frontmatter dos artigos usa o campo `name` exatamente como escrito aqui.
export const CATEGORIES = [
  {
    slug: "conteudo-com-ia",
    name: "Conteúdo com IA",
    description:
      "Como criar posts, textos, vídeos e ideias de conteúdo mais rápido usando inteligência artificial no seu pequeno negócio.",
  },
  {
    slug: "instagram-redes-sociais",
    name: "Instagram e Redes Sociais",
    description:
      "Presença digital, engajamento, Reels, calendário e organização das redes sociais do seu negócio, com apoio de IA.",
  },
  {
    slug: "atendimento-vendas",
    name: "Atendimento e Vendas",
    description:
      "Como usar IA e automação para responder clientes, manter relacionamento e vender com mais organização.",
  },
  {
    slug: "produtividade",
    name: "Produtividade",
    description:
      "Organização, planejamento e processos: como economizar tempo em tarefas repetitivas do dia a dia do negócio.",
  },
  {
    slug: "ferramentas-prompts",
    name: "Ferramentas e Prompts",
    description:
      "Comparativos, testes de ferramentas de IA e listas de prompts prontos para pequenos negócios.",
  },
] as const;

export type CategoryName = (typeof CATEGORIES)[number]["name"];

export const CATEGORY_NAMES = CATEGORIES.map((c) => c.name) as [
  CategoryName,
  ...CategoryName[],
];

export function getCategoryByName(name: string) {
  return CATEGORIES.find((c) => c.name === name);
}

export function categoryHref(name: string) {
  const category = getCategoryByName(name);
  return category ? `/categorias/${category.slug}/` : "/artigos/";
}
