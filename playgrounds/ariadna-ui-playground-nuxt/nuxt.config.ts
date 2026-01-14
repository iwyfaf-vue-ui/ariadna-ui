// https://nuxt.com/docs/api/configuration/nuxt-config
import * as path from 'node:path';

export default defineNuxtConfig({
  compatibilityDate: '2025-04-25',
  srcDir: 'src/app',
  $development: {
    devtools: { enabled: true },
    modules: [
      [
        '@nuxtjs/html-validator',
        {
          options: {
            rules: {
              'tel-non-breaking': 'off',
              'svg-focusable': 'off',
              'no-unknown-elements': 'error',
              // Conflicts or not needed as we use prettier formatting
              'void-style': 'off',
              'no-trailing-whitespace': 'off',
              // Conflict with Nuxt defaults
              'require-sri': 'off',
              'attribute-boolean-style': 'off',
              'doctype-style': 'off',
              // Unreasonable rule
              'no-inline-style': 'off',
              //https://gitlab.com/html-validate/html-validate/-/issues/102
              'prefer-native-element': [
                'error',
                {
                  exclude: ['button', 'listbox'],
                },
              ],
            },
          },
        },
      ],
    ],
  },
  css: [
    '@iwyfaf-vue-ui/ariadna-ui/components/Ariadna',
    '@/assets/scss/app.scss',
    '@/assets/fonts/icons/icons.css',
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@iwyfaf-vue-ui/ariadna-ui/theme/Ariadna" as *;
          `,
        },
      },
    },
  },
  modules: [],
  alias: {
    // Fix only for local development, to resolve Cannot read properties of null (reading 'ce')
    vue: path.resolve(__dirname, 'node_modules/vue'),
  },
  build: {
    transpile: ['@iwyfaf-vue-ui/ariadna-ui'],
  },
});
