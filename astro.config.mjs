// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      external: ['payload', 'path', 'fs']
    },
    build: {
      rollupOptions: {
        external: [/payload\.config\.ts/]
      }
    }
  },
  integrations: [sitemap()],
  site: 'https://warynessy.com'
});