# Espaço de anúncio (AdSense) e CTA de afiliado

O site reserva **um único espaço de anúncio por artigo**, logo abaixo do
breadcrumb (Home > Artigos > Categoria) e acima do título. Enquanto o
AdSense não estiver ativo, esse espaço simplesmente não renderiza nada
(sem caixa vazia).

No final de cada artigo, em vez de anúncio, aparece um **CTA de afiliado**
(Hotmart/Kiwify), repetido com o mesmo texto em todos os artigos — só o
link de destino muda.

## Para configurar o CTA de afiliado num artigo

Adicione isto no frontmatter (topo) do arquivo `.md` do artigo:

```yaml
ctaUrl: "https://pay.hotmart.com/seu-link-de-afiliado"
```

Isso já é suficiente — o texto e o rótulo do botão têm um padrão pronto
("Quer aprender a construir um negócio digital e ter uma renda
recorrente?" / "Quero Acessar"). Se quiser personalizar esse texto só
para um artigo específico, também pode definir:

```yaml
ctaText: "Texto customizado para esse artigo"
ctaButtonLabel: "Rótulo do botão"
```

Sem `ctaUrl` definido, nenhum CTA aparece no final do artigo.

### Capa do artigo como link de afiliado direto

Se quiser que a própria imagem de capa do artigo seja clicável e leve
direto pra uma oferta, adicione no frontmatter:

```yaml
imageLink: "https://pay.hotmart.com/seu-link-de-afiliado"
```

Isso transforma a imagem de capa num link, com o aviso "Link de
afiliado" aparecendo automaticamente logo abaixo dela. Sem esse campo,
a imagem continua sendo só ilustrativa, sem link.

## Para ativar o AdSense de verdade no futuro

1. Copie `.env.example` para `.env` (localmente) e/ou configure as mesmas
   variáveis em **Vercel > Project Settings > Environment Variables**.
2. Preencha:
   - `ADS_ENABLED=true`
   - `ADSENSE_CLIENT_ID` (ex: `ca-pub-XXXXXXXXXXXXXXXX`)
   - `ADSENSE_SLOT_TOP` (o ID do bloco de anúncio criado no painel do AdSense
     para o espaço do topo)
3. Faça o deploy. O espaço passa a mostrar o anúncio real automaticamente,
   sem precisar editar nenhum artigo ou componente.
