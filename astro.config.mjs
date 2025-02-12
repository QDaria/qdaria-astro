import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import { fileURLToPath } from 'url';

export default defineConfig({
  security: {
    headers: {
      "Content-Security-Policy": "default-src 'self'; img-src 'self' data:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'"
    }
  },
  redirects: {
    '/pitch': '/404',
    '/pitch/*': '/404',
    '/pitch-deck': '/404', 
    '/pitch-deck/*': '/404',
    '/company/media': '/404',
    '/company/media/*': '/404',
    '/company/blog': '/404',
    '/company/blog/*': '/404'
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
    routing: {
      prefixDefaultLocale: false,
      strategy: 'prefix-except-default'
    }
  },
  integrations: [
    tailwind(),
    react({
      include: ['**/react/*', '**/components/**/*.tsx', '**/components/**/*.jsx']
    }),
    mdx(),
  ],
  vite: {
    ssr: {
      noExternal: ['@astrojs/prism']
    },
    esbuild: {
      loader: 'ts'
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
        '@layouts': fileURLToPath(new URL('./src/layouts', import.meta.url)),
        '@config': fileURLToPath(new URL('./src/config', import.meta.url)),
        '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
        '@styles': fileURLToPath(new URL('./src/styles', import.meta.url)),
        '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
        '@js': fileURLToPath(new URL('./src/js', import.meta.url))
      }
    },
    optimizeDeps: {
      include: ['astro/jsx-runtime']
    }
  },
  jsx: {
    runtime: 'automatic'
  }
});
