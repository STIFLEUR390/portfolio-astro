// @ts-check
import { defineConfig, envField } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vue from '@astrojs/vue';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://portfolio.aplix.nl',
  integrations: [vue(), sitemap()],
  env: {
    // Type-safe env: build fails fast with a clear error when missing.
    schema: {
      GHOST_URL: envField.string({ context: 'server', access: 'secret' }),
      CONTENT_API_KEY: envField.string({ context: 'server', access: 'secret' }),
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
