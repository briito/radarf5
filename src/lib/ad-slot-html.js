// Gera o HTML de um "espaço de anúncio" do site.
//
// Regra: enquanto o AdSense não estiver ativo (ADS_ENABLED !== "true"),
// esse espaço NUNCA fica vazio nem aparece uma caixa em branco — ou mostra
// o card de oferta/afiliado (se o artigo tiver um definido em
// `affiliateProduct` no frontmatter), ou simplesmente não renderiza nada.
//
// Quando o AdSense for ativado (variáveis de ambiente ADS_ENABLED=true,
// ADSENSE_CLIENT_ID e o slot id correspondente preenchidos), o mesmo espaço
// passa a exibir o anúncio real automaticamente, sem precisar mexer em
// nenhum artigo.

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildAdsenseHtml({ position, adsenseClientId, adsenseSlotId }) {
  if (!adsenseClientId || !adsenseSlotId) {
    // AdSense está "ligado" mas ainda faltam as credenciais reais —
    // não renderiza nada em vez de quebrar a página com um slot inválido.
    return "";
  }

  return `
    <div class="ad-slot ad-slot--adsense ad-slot--${position}">
      <ins class="adsbygoogle"
        style="display:block; text-align:center;"
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="${escapeHtml(adsenseClientId)}"
        data-ad-slot="${escapeHtml(adsenseSlotId)}"></ins>
      <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
    </div>
  `.trim();
}

function buildAffiliateHtml({ position, affiliateProduct }) {
  const { name, image, imageAlt, price, url, ctaText } = affiliateProduct;

  return `
    <div class="ad-slot ad-slot--affiliate ad-slot--${position}">
      <div class="offer-card ad-slot__card">
        <picture class="featured-image">
          <img src="${escapeHtml(image)}" alt="${escapeHtml(imageAlt ?? name)}" loading="lazy" />
        </picture>
        <h3 class="offer-title">${escapeHtml(name)}</h3>
        ${price ? `<p class="ad-slot__price">${escapeHtml(price)}</p>` : ""}
        <a href="${escapeHtml(url)}" class="btn-offer" rel="sponsored noopener" target="_blank">
          ${escapeHtml(ctaText ?? "Ver oferta")}
        </a>
        <p class="ad-slot__disclosure">Link de afiliado — podemos ganhar uma comissão.</p>
      </div>
    </div>
  `.trim();
}

export function buildAdSlotHtml({
  enabled,
  position,
  adsenseClientId,
  adsenseSlotId,
  affiliateProduct,
}) {
  if (enabled) {
    const adsenseHtml = buildAdsenseHtml({ position, adsenseClientId, adsenseSlotId });
    if (adsenseHtml) return adsenseHtml;
  }

  if (affiliateProduct) {
    return buildAffiliateHtml({ position, affiliateProduct });
  }

  return "";
}
