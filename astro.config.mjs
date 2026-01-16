import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },
  integrations: [
    svelte(),
    tailwind(), 
  ],
});
