// https://nuxt.com/docs/api/configuration/nuxt-config
import * as path from 'node:path';

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
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
  css: ['@/assets/scss/app.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "assets/scss/themes/asana/asana" as *;
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
