// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'middleware'
  }),
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ['payload', 'file-type', '@payloadcms/richtext-lexical']
    },
    ssr: {
      external: ['payload', 'path', 'fs', 'file-type', '@payloadcms/richtext-lexical'],
      noExternal: []
    },
    build: {
      rollupOptions: {
        external: [/payload/, /file-type/]
      }
    }
  },
  integrations: [sitemap()],
  site: 'https://warynessy.com'
});