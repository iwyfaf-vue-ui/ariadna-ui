import { execSync } from 'child_process';
import chalk from 'chalk';
import {
  LIBRARY_CREATED,
  PROJECT_DEPENDENCIES_NOT_UPDATED,
  PROJECT_DEPENDENCIES_UPDATED,
  VUE3_VITE_TS_PROJECT_CREATED,
  VUE3_VITE_TS_PROJECT_NOT_CREATED,
} from '../locales/en/main';
import packageJsonLibrary from '../templates/vue3-vite-ts/package.json.library';
import packageJsonPlayground from '../templates/vue3-vite-ts/package.json.playground';
import viteConfigLibrary from '../templates/vue3-vite-ts/vite.config.library';
import viteConfigPlayground from '../templates/vue3-vite-ts/vite.config.playground';
import stylelintrc from '../templates/vue3-vite-ts/stylelintrc.json';
import prettierrc from '../templates/vue3-vite-ts/prettierrc';
import shimsVueDts from '../templates/vue3-vite-ts/shims.vue';
import lib from '../templates/vue3-vite-ts/lib';
import publish from '../templates/vue3-vite-ts/publish';
import gitignore from '../templates/vue3-vite-ts/gitignore';
import fs from 'fs';

export const Vue3ViteTsBuilder = (
  name: string,
  description: string,
  prefix: string,
  packageType: string,
  path: string,
  update: boolean,
) => {
  try {
    execSync(`npm init vite@latest ${name} -- --template vue-ts`, {
      cwd: packageType,
    });
    console.log(chalk.green(VUE3_VITE_TS_PROJECT_CREATED));
  } catch (err) {
    console.log(chalk.red(VUE3_VITE_TS_PROJECT_NOT_CREATED));
    process.exit(0);
  }

  let files;
  switch (packageType) {
    case 'libraries':
      files = [
        {
          filepath: '/package.json',
          content: packageJsonLibrary({
            packageName: name,
            packagePrefix: prefix,
            packageDescription: description,
          }),
        },
        {
          filepath: '/vite.config.ts',
          content: viteConfigLibrary({
            packageName: name,
          }),
        },
        {
          filepath: '/shims-vue.d.ts',
          content: shimsVueDts({
            packageName: name,
          }),
        },
        {
          filepath: '/src/lib.ts',
          content: lib({
            packageName: name,
          }),
        },
        {
          filepath: '/publish.sh',
          content: publish({
            packageName: name,
          }),
        },
        {
          filepath: '/.gitignore',
          content: gitignore(),
        },
        {
          filepath: '/.stylelintrc.json',
          content: stylelintrc(),
        },
        {
          filepath: '/.prettierrc',
          content: prettierrc(),
        },
      ];
      break;
    case 'playgrounds':
      files = [
        {
          filepath: '/package.json',
          content: packageJsonPlayground({
            playgroundName: name,
          }),
        },
        {
          filepath: '/vite.config.ts',
          content: viteConfigPlayground({
            packageName: name,
          }),
        },
        {
          filepath: '/.gitignore',
          content: gitignore(),
        },
        {
          filepath: '/.stylelintrc.json',
          content: stylelintrc(),
        },
        {
          filepath: '/.prettierrc',
          content: prettierrc(),
        },
      ];
      break;
    default:
      files = [
        {
          filepath: '/package.json',
          content: packageJsonLibrary({
            packageName: name,
            packagePrefix: prefix,
            packageDescription: description,
          }),
        },
        {
          filepath: '/vite.config.ts',
          content: viteConfigLibrary({
            packageName: name,
          }),
        },
        {
          filepath: '/shims-vue.d.ts',
          content: shimsVueDts({
            packageName: name,
          }),
        },
        {
          filepath: '/src/lib.ts',
          content: lib({
            packageName: name,
          }),
        },
        {
          filepath: '/publish.sh',
          content: publish({
            packageName: name,
          }),
        },
        {
          filepath: '/.gitignore',
          content: gitignore(),
        },
        {
          filepath: '/.stylelintrc.json',
          content: stylelintrc(),
        },
        {
          filepath: '/.prettierrc',
          content: prettierrc(),
        },
      ];
  }

  if (files) {
    files.forEach((file: { filepath: string; content: string }) => {
      const fileBuffer = new Uint8Array(Buffer.from(file.content));
      fs.writeFileSync(path + file.filepath, fileBuffer);
    });
  }

  if (update) {
    try {
      execSync('ncu -u', {
        cwd: `${packageType}/${name}`,
      });
      console.log(chalk.green(PROJECT_DEPENDENCIES_UPDATED));
    } catch (err) {
      console.log(chalk.red(PROJECT_DEPENDENCIES_NOT_UPDATED));
    }
  }

  console.log(chalk.green(`✅ ${name} ${LIBRARY_CREATED}`));
};
