# Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## 📢 Espaços de anúncio (AdSense) e ofertas de afiliado

O site reserva dois espaços por artigo: **no meio do texto** (inserido automaticamente, sem precisar editar cada artigo) e **no final do texto**. Enquanto o AdSense não estiver ativo, esses espaços não aparecem vazios — eles mostram um card de oferta/afiliado (se você definir um no artigo) ou simplesmente não renderizam nada.

### Para colocar uma oferta de afiliado num artigo agora

Adicione isto no frontmatter (topo) do arquivo `.md` do artigo:

```yaml
affiliateProduct:
  name: "Notebook XYZ 15 polegadas"
  image: "/images/notebook-xyz.webp"
  imageAlt: "Notebook XYZ visto de frente"
  price: "R$ 3.499"
  url: "https://www.exemplo.com/produto?tag=seu-link-de-afiliado"
  ctaText: "Ver oferta na loja"
```

Todos os campos são opcionais, exceto `name`, `image` e `url`. O card aparece automaticamente nos dois espaços reservados (meio e fim do artigo), com o aviso "Link de afiliado" já incluído.

### Para ativar o AdSense de verdade no futuro

1. Copie `.env.example` para `.env` (localmente) e/ou configure as mesmas variáveis em **Vercel > Project Settings > Environment Variables**.
2. Preencha:
   - `ADS_ENABLED=true`
   - `ADSENSE_CLIENT_ID` (ex: `ca-pub-XXXXXXXXXXXXXXXX`)
   - `ADSENSE_SLOT_MIDDLE` e `ADSENSE_SLOT_END` (os IDs dos blocos de anúncio criados no painel do AdSense)
3. Faça o deploy. Os espaços passam a mostrar o anúncio real automaticamente, no lugar do card de afiliado, sem precisar editar nenhum artigo ou componente.

Se algum artigo tiver `affiliateProduct` configurado, ele só aparece enquanto `ADS_ENABLED` for `false` — quando o AdSense entra, ele assume o espaço.