import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import * as path from 'path';
import scanFiles from './packageGenerator/scan-files';

type TFileNode = {
  path: string;
  name: string;
};

type TFileTree = {
  [key: string]: TFileNode[];
};

const utilities: TFileTree = scanFiles('./src/lib/utilities', ['.test.ts'], ['core', 'types']);

const dynamicFileNames = Object.fromEntries(
  Object.entries({ ...utilities }).map(([_, value]) => {
    const file = value[0];
    const fileName = file.name.split('.')[0];
    const isVue = value.some((file) => file.name.includes('.vue'));

    return [
      fileName,
      { path: `${file.path}/${fileName}`.replace('src/', ''), ext: isVue ? 'vue' : 'ts' },
    ];
  }),
);

export const fileNames = {
  ...dynamicFileNames,
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [
      vue({}),
      viteStaticCopy({
        targets: [
          { src: 'src/types/component.d.ts', dest: '' },
          ...Object.entries(fileNames).map(([key, value]) => ({
            src: value.ext === 'vue' ? `src/${value.path}.d.ts` : `src/${value.path}.types.ts`,
            dest: path.dirname(value.path.replace(`/${value.path}`, '')),
          })),
        ],
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
        entry: Object.entries(fileNames).map(([_, value]) => `./src/${value.path}.${value.ext}`),
        formats: ['es'],
        fileName: (format, entryName) => {
          return fileNames[entryName as keyof typeof fileNames].path + '.esm.js';
        },
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
      chunkSizeWarningLimit: 50,
      sourcemap: mode === 'development',
    },
  };
});
