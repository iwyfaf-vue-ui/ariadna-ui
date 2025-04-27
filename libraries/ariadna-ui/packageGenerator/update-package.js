/**
 * @file This script updates the `package.json` file with the correct `typesVersions` and `exports` fields
 * based on the files found in the `src/lib` directory. It scans for components, composables, directives, and utilities,
 * and generates the appropriate paths for their corresponding TypeScript declaration files and ES modules.
 */

import fs from 'fs';
import path from 'path';
import scanFiles from './scan-files.js';

/**
 * An object containing default exports to be included in the `package.json` file.
 * This can be used to manually specify exports that are not automatically detected by the script.
 * @type {Object}
 */
const exportsByDefault = {};

/**
 * Updates the `package.json` file with the correct `typesVersions` and `exports` fields.
 * It scans the `src/lib` directory for components, composables, directives, and utilities,
 * and generates the appropriate paths for their TypeScript declaration files and ES modules.
 * The updated `package.json` file is then written back to disk.
 */
const updatePackage = () => {
  // Read the current `package.json` file
  const packageJSON = JSON.parse(
    fs.readFileSync(path.resolve('./package.json'), { encoding: 'utf-8' }),
  );

  const components = scanFiles(
    './src/lib/components',
    ['.test.ts'],
    ['components', 'composables', 'core', 'directive', 'prompts', 'providers', 'tests', 'types'],
  );

  // const composables = scanFiles(
  //   './src/lib/composables',
  //   ['.test.ts', '.d.ts'],
  //   ['composables', 'test-data', 'core', 'shared', 'directive'],
  // );
  //
  // const directives = scanFiles(
  //   './src/lib/directives',
  //   ['.test.ts', '.d.ts'],
  //   ['composables', 'test-data', 'core', 'shared', 'directive'],
  // );

  const utilities = scanFiles(
    './src/lib/utilities',
    ['.test.ts'],
    ['core', 'types', 'tests', 'prompts'],
  );

  const typesVersions = Object.fromEntries(
    Object.entries({ ...components, ...utilities }).map(([_, value]) => {
      const file = value.find(
        (file) => file.name.includes('.d.ts') || file.name.includes('.types.ts'),
      );

      return [file.name.split('.')[0], [`${file.path}/${file.name}`.replace('src', './dist')]];
    }),
  );

  const exports = Object.fromEntries(
    Object.entries({ ...components, ...utilities }).map(([_, value]) => {
      const file = value.find(
        (file) => file.name.includes('.d.ts') || file.name.includes('.types.ts'),
      );
      const fileName = file.name.split('.')[0];

      return [
        `./${fileName}`,
        {
          import: `${file.path}/${fileName}.esm.js`.replace('src', './dist'),
          types: `${file.path}/${file.name}`.replace('src', './dist'),
        },
      ];
    }),
  );

  // Update the `package.json` file with the new `typesVersions` and `exports` fields
  packageJSON['typesVersions'] = { '*': { ...typesVersions } };
  packageJSON['exports'] = { ...exportsByDefault, ...exports };

  // Write the updated `package.json` file back to disk
  fs.writeFileSync(path.resolve('./package.json'), JSON.stringify(packageJSON, null, 2));
};

updatePackage();
console.log('package.json successfully updated!');
