import { BuilderInterface } from './interface/builder.interface';
import { isValidNameNpmPackage } from '../../utils/validNameNpmPackage';
import { isComponentExists } from '../../utils/componentExists';
import { Vue3ViteTsBuilder } from './vue3-vite-ts.builder';
import { Vue2ViteTsBuilder } from "./vue2-vite-ts.builder";

export class Builder implements BuilderInterface {
  update: boolean;
  stack: string;
  description?: string;
  prefix?: string;

  constructor(update: boolean, stack: string, description?: string, prefix?: string) {
    this.update = update;
    this.stack = stack;
    this.description = description || '';
    this.prefix = prefix || '';

    const packagePrefix: string = this.prefix.length > 0 ? `@${this.prefix}/` : '';
    const packageDescription: string = this.description.length > 0 ? `${this.description}` : '';
    const packageUpdate: boolean = this.update;
    let packageType: string;

    switch (process.env.npm_lifecycle_event) {
      case 'library:new':
        packageType = 'libraries';
        break;
      case 'playground:new':
        packageType = 'playgrounds';
        break;
      default:
        packageType = 'libraries';
    }

    const argv = process.argv;
    let packagesFolder: string = `${__dirname.substring(
      0,
      __dirname.lastIndexOf('scripts'),
    )}${packageType}/`;
    const newPackageName: string = argv[2] as string;
    const newPackagePath: string = packagesFolder + newPackageName;

    isValidNameNpmPackage(newPackageName);
    isComponentExists(newPackagePath);

    switch (this.stack) {
      case 'Vue 3 + Vite + TypeScript':
        Vue3ViteTsBuilder(
          newPackageName,
          packageDescription,
          packagePrefix,
          packageType,
          newPackagePath,
          packageUpdate,
        );
        break;
      case 'Vue 2 + Vite + TypeScript':
        Vue2ViteTsBuilder(
          newPackageName,
          packageDescription,
          packagePrefix,
          packageType,
          newPackagePath,
          packageUpdate,
        );
        break;
      default:
        Vue3ViteTsBuilder(
          newPackageName,
          packageDescription,
          packagePrefix,
          packageType,
          newPackagePath,
          packageUpdate,
        );
    }
  }
}
