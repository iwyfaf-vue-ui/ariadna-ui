export default ({ packageName }: { packageName: string }): string => {
  return `import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import typescript2 from 'rollup-plugin-typescript2';
import clear from 'rollup-plugin-clear';
import dts from 'vite-plugin-dts';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({}),
    typescript2({
      check: false,
      include: ['src/**/*.ts', 'tests/**/*.ts'],
      tsconfigOverride: {
        compilerOptions: {
          sourceMap: true,
          declaration: true,
          declarationMap: true,
          baseUrl: '.',
          paths: {
            '@/*': ['src/*'],
          },
        },
        exclude: ['vite.config.ts'],
      },
    }),
    dts(),
    clear({
      targets: ['./dist'],
    }),
  ],
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
  build: {
    cssCodeSplit: false,
    lib: {
      entry: './src/lib.ts',
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs'),
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
        exports: 'named' /** Disable warning for default imports */,
      },
    },
  },
});
`;
};
