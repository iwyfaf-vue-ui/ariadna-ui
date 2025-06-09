import { defineConfig } from 'vitepress';
import { config as root, searchLocale as searchLocaleRu } from './config/ru/config';
import { config as en, searchLocale as searchLocaleEn } from './config/en/config';
import VitePluginVitepressDemo from 'vite-plugin-vitepress-demo';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    i18nRouting: true,
    cleanUrls: true,

    search: {
      provider: 'local',
      options: {
        locales: {
          ...searchLocaleRu,
          ...searchLocaleEn,
        },
      },
    },

    nav: [
      { text: 'Компоненты', link: '/components/' },
      { text: 'Composables', link: '/composables/' },
      { text: 'Директивы', link: '/directives/' },
      { text: 'Утилиты', link: '/utilities/' },
    ],

    outline: 'deep',
    socialLinks: [{ icon: 'github', link: 'https://github.com/iwyfaf-vue-ui/ariadna-ui' }],
  },

  markdown: {
    lineNumbers: true,
  },

  locales: {
    ...root,
    ...en,
  },

  vite: {
    css: {
      // https://github.com/vuejs/vitepress/issues/4340
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
    ssr: {
      noExternal: ['@iwyfaf-vue-ui/ariadna-ui'],
    },
    build: {
      rollupOptions: {
        external: ['vue-router'],
      },
    },
    plugins: [VitePluginVitepressDemo()],
  },
});
