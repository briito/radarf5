import { buildAdSlotHtml } from "./ad-slot-html.js";

// Tags de bloco que contam como "conteúdo real" do artigo, usadas para
// calcular onde fica o meio do texto.
const BLOCK_TAGS = new Set([
  "p",
  "h2",
  "h3",
  "h4",
  "ul",
  "ol",
  "blockquote",
  "pre",
  "table",
  "figure",
]);

// Só insere o slot do meio se o artigo tiver blocos de conteúdo suficientes;
// evita colocar anúncio/oferta em textos muito curtos.
const MIN_BLOCKS_FOR_MIDDLE_SLOT = 4;

/**
 * @param {{
 *   enabled?: boolean,
 *   adsenseClientId?: string,
 *   adsenseSlotIdMiddle?: string,
 * }} options
 */
export default function rehypeAdSlots(options = {}) {
  const { enabled = false, adsenseClientId, adsenseSlotIdMiddle } = options;

  return (tree, file) => {
    const frontmatter = file.data?.astro?.frontmatter ?? {};
    const affiliateProduct = frontmatter.affiliateProduct;

    const html = buildAdSlotHtml({
      enabled,
      position: "middle",
      adsenseClientId,
      adsenseSlotId: adsenseSlotIdMiddle,
      affiliateProduct,
    });

    // Nada para inserir (sem AdSense ativo e sem oferta configurada) —
    // não mexe na árvore, então não sobra nenhum elemento vazio.
    if (!html) return;

    const blockIndexes = [];

    tree.children.forEach((node, index) => {
      if (node.type === "element" && BLOCK_TAGS.has(node.tagName)) {
        blockIndexes.push(index);
      }
    });

    if (blockIndexes.length < MIN_BLOCKS_FOR_MIDDLE_SLOT) return;

    const middleBlockIndex =
      blockIndexes[Math.max(0, Math.floor(blockIndexes.length / 2) - 1)];

    tree.children.splice(middleBlockIndex + 1, 0, {
      type: "raw",
      value: `\n${html}\n`,
    });
  };
}
