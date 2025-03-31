import type { TBuilderOptions } from './types/builder-options/builder-options.type';
import type { TCustomSettings } from './types/builder-custom-settings/custom-settings.type';
import defaultSettings from './core/default/theme.default';
import Builder from './core/builder/builder';
import FilePlacer from './core/utils/file-placer';
import BuilderDocumentation from './core/builder/documentation/builder.documentation';

export default class ThemeBuilder {
  private builder: Builder;
  private builderDocumentation: BuilderDocumentation;
  private filePlacer: FilePlacer;

  constructor(options: TBuilderOptions, settings: TCustomSettings | {} = {}) {
    this.builder = new Builder(settings, defaultSettings);
    this.builderDocumentation = new BuilderDocumentation(settings, defaultSettings, options);
    this.filePlacer = new FilePlacer(options.projectName, options.destination, options.themeName);
  }

  public buildTheme(): void {
    const constructedTheme = this.builder.buildTheme();
    this.filePlacer.theme(constructedTheme);
  }

  public buildDocs(): void {
    const constructedDocs = this.builderDocumentation.buildDocs();
    this.filePlacer.documentation(constructedDocs);
  }

  public buildAll(): void {
    this.buildTheme();
    this.buildDocs();
  }
}
