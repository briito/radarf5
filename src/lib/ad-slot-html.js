// Gera o HTML de um "espaço de anúncio" do site (AdSense).
//
// Regra: enquanto o AdSense não estiver ativo (ADS_ENABLED !== "true") ou
// as credenciais do slot não estiverem preenchidas, esse espaço não
// renderiza nada — nunca aparece uma caixa vazia.
//
// Quando o AdSense for ativado (ADS_ENABLED=true, ADSENSE_CLIENT_ID e o
// slot id correspondente preenchidos), o espaço passa a exibir o anúncio
// real automaticamente, sem precisar mexer em nenhum artigo.

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function buildAdSlotHtml({ enabled, position, adsenseClientId, adsenseSlotId }) {
  if (!enabled || !adsenseClientId || !adsenseSlotId) {
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
