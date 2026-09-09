# Espaços de anúncio (AdSense) e ofertas de afiliado

O site reserva dois espaços por artigo: **no meio do texto** (inserido automaticamente, sem precisar editar cada artigo) e **no final do texto**. Enquanto o AdSense não estiver ativo, esses espaços não aparecem vazios — eles mostram um card de oferta/afiliado (se você definir um no artigo) ou simplesmente não renderizam nada.

## Para colocar uma oferta de afiliado num artigo agora

Adicione isto no frontmatter (topo) do arquivo `.md` do artigo:

```yaml
affiliateProduct:
  name: "Notebook XYZ 15 polegadas"
  image: "/images/notebook-xyz.webp"
  imageAlt: "Notebook XYZ visto de frente"
  price: "R$ 3.499"
  links:
    - label: "Prefiro Acessar na Amazon"
      url: "https://www.amazon.com.br/seu-link-de-afiliado"
      price: "R$ 3.499"
      marketplace: "amazon"
    - label: "Prefiro Acessar na Shopee"
      url: "https://s.shopee.com.br/seu-link-de-afiliado"
      price: "R$ 3.599"
      marketplace: "shopee"
    - label: "Prefiro Acessar no Mercado Livre"
      url: "https://meli.la/seu-link-de-afiliado"
      price: "R$ 3.550"
      marketplace: "mercadolivre"
```

Todos os campos são opcionais, exceto `name`, `image` e `links` (que precisa ter pelo menos 1 item, mas aceita quantos marketplaces você quiser). Cada item de `links` vira um botão no card, na ordem em que você escrever.

- `price` (dentro de cada link) mostra o preço específico daquele marketplace acima do botão correspondente
- `marketplace` (opcional: `amazon`, `shopee` ou `mercadolivre`) colore o botão com um tom suavizado da cor daquela loja. Sem esse campo, o botão usa a cor padrão do site

### Capa do artigo como link de afiliado direto

Se quiser que a própria imagem de capa do artigo seja clicável e leve direto pra uma oferta (em vez de mostrar só o card no meio/fim do artigo), adicione no frontmatter, fora do bloco `affiliateProduct`:

```yaml
imageLink: "https://www.amazon.com.br/seu-link-de-afiliado"
```

Isso transforma a imagem de capa num link, com o aviso "Link de afiliado" aparecendo automaticamente logo abaixo dela. Sem esse campo, a imagem continua sendo só ilustrativa, sem link.

## Para ativar o AdSense de verdade no futuro

1. Copie `.env.example` para `.env` (localmente) e/ou configure as mesmas variáveis em **Vercel > Project Settings > Environment Variables**.
2. Preencha:
   - `ADS_ENABLED=true`
   - `ADSENSE_CLIENT_ID` (ex: `ca-pub-XXXXXXXXXXXXXXXX`)
   - `ADSENSE_SLOT_MIDDLE` e `ADSENSE_SLOT_END` (os IDs dos blocos de anúncio criados no painel do AdSense)
3. Faça o deploy. Os espaços passam a mostrar o anúncio real automaticamente, no lugar do card de afiliado, sem precisar editar nenhum artigo ou componente.

Se algum artigo tiver `affiliateProduct` configurado, ele só aparece enquanto `ADS_ENABLED` for `false` — quando o AdSense entra, ele assume o espaço.
