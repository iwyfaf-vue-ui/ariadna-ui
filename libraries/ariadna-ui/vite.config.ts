import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import * as path from 'path';
import * as fs from 'fs';
import scanFiles from './packageGenerator/scan-files.js';

enum ETypes {
  VUE = 'vue',
  TS = 'ts',
}

type TFileNode = {
  path: string;
  name: string;
  ext: ETypes;
};

type TFileTree = {
  [key: string]: TFileNode[];
};

const components: TFileTree = scanFiles(
  './src/lib/components',
  ['.test.ts'],
  ['components', 'composables', 'core', 'directive', 'prompts', 'providers', 'tests', 'types'],
);

const directives: TFileTree = scanFiles(
  './src/lib/directives',
  ['.test.ts'],
  ['composables', 'core', 'prompts', 'providers', 'tests', 'types'],
);

const utilities: TFileTree = scanFiles(
  './src/lib/utilities',
  ['.test.ts'],
  ['core', 'types', 'tests', 'prompts'],
);

const dynamicFileNames = Object.fromEntries(
  Object.entries({ ...components, ...directives, ...utilities }).map(([_, value]) => {
    const file = value[0];
    const fileName = file.name.split('.')[0];
    const isVue = value.some((file) => file.name.endsWith('.vue'));
    const isTS = value.some((file) => file.name.endsWith('.ts'));

    let ext: ETypes;
    if (isVue) {
      ext = ETypes.VUE;
    } else if (isTS) {
      ext = ETypes.TS;
    }

    return [fileName, { path: file.path.replace('src/', ''), name: fileName, ext: ext }];
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
          { src: 'src/types/component.d.ts', dest: 'types/' },
          ...Object.entries(fileNames).map(([key, value]) => ({
            src: `src/${value.path}/${value.name}.d.ts`,
            dest: value.path,
          })),
          ...Object.entries(fileNames)
            .map(([key, value]) => {
              const typesDir = `src/${value.path}/types`;

              if (fs.existsSync(typesDir)) {
                return {
                  src: typesDir,
                  dest: value.path,
                };
              }

              return null;
            })
            .filter(Boolean),
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
        entry: Object.entries(fileNames).map(
          ([_, value]) => `./src/${value.path}/${value.name}.${value.ext}`,
        ),
        formats: ['es'],
        fileName: (format, entryName) =>
          `${fileNames[entryName as keyof typeof fileNames].path}/${
            fileNames[entryName as keyof typeof fileNames].name
          }.esm.js`,
      },
      rollupOptions: {
        external: ['vue', 'fs'],
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
