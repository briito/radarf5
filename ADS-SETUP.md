# Espaço de anúncio (AdSense) e CTA de afiliado

O site reserva **um único espaço de anúncio por artigo**, logo abaixo do
breadcrumb (Home > Artigos > Categoria) e acima do título. Enquanto o
AdSense não estiver ativo, esse espaço simplesmente não renderiza nada
(sem caixa vazia).

No final do artigo pode aparecer um **próximo passo (CTA)**: uma isca digital
gratuita, um produto próprio ou, quando fizer sentido, um link de afiliado
(Hotmart/Kiwify). O CTA só aparece se o artigo tiver `ctaUrl` **e** `ctaText`;
não existe mais texto padrão genérico.

## Para configurar o CTA num artigo

Adicione no frontmatter (topo) do arquivo `.md` do artigo:

```yaml
ctaType: "isca"          # "isca" | "produto" | "afiliado"
ctaUrl: "https://..."
ctaText: "Texto do convite, em 1 ou 2 parágrafos (separe com uma linha em branco)."
ctaButtonLabel: "Baixar o calendário"   # opcional (padrão: "Acessar")
```

- `isca` e `produto`: sem aviso de comissão e com `rel="noopener"`.
- `afiliado`: mostra "Link de afiliado — podemos ganhar uma comissão." e usa
  `rel="sponsored noopener"`.

Sem `ctaUrl` ou sem `ctaText`, nenhum CTA aparece no final do artigo.
