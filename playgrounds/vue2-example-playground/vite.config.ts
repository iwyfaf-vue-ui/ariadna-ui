import { defineConfig } from 'vite';
import { createVuePlugin } from 'vite-plugin-vue2';
import * as path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [createVuePlugin()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, './src'),
      },
    ],
  },
});
