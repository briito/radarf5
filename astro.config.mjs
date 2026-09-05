// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import { loadEnv } from 'vite';
import rehypeAdSlots from './src/lib/rehype-ad-slots.mjs';

// Lê as variáveis de ambiente (do .env local ou das Environment Variables
// configuradas no painel da Vercel) já na hora de montar a config do Astro.
const env = loadEnv(process.env.NODE_ENV ?? 'development', process.cwd(), '');
const adsEnabled = env.ADS_ENABLED === 'true';

export default defineConfig({
  site: 'https://radarf5.com',
  output: 'server',
  adapter: vercel(),
  integrations: [sitemap()],
  markdown: {
    rehypePlugins: [
      [
        rehypeAdSlots,
        {
          enabled: adsEnabled,
          adsenseClientId: env.ADSENSE_CLIENT_ID,
          adsenseSlotIdMiddle: env.ADSENSE_SLOT_MIDDLE,
        },
      ],
    ],
  },
});