import type { TBuilderOptions } from './types/builder-options/builder-options.type';
import type { TCustomSettings } from './types/builder-custom-settings/custom-settings.type';

export type { TBuilderOptions } from './types/builder-options/builder-options.type';
export type { TCustomSettings } from './types/builder-custom-settings/custom-settings.type';
export type { TCustomSettingsBreakpoints } from './types/builder-custom-settings/custom-settings-breakpoints.type';
export type { TCustomSettingsGrid } from './types/builder-custom-settings/custom-settings-grid.type';
export type { TCustomSettingsTheme } from './types/builder-custom-settings/custom-settings-theme.type';
export type { TCustomSettingsUtilities } from './types/builder-custom-settings/custom-settings-utilities.type';
export type { TCustomSettingsUtilitiesFont } from './types/builder-custom-settings/custom-settings-utilities-font.type';
export type { TCustomSettingsUtilitiesIndent } from './types/builder-custom-settings/custom-settings-utilities-indent.type';
export type { TCustomSettingsUtilitiesCustom } from './types/builder-custom-settings/custom-settings-utilities-custom.type';
export type { TCustomSettingsHelpers } from './types/builder-custom-settings/custom-settings-helpers.type';

/**
 * Ariadna UI | Utilities | Facades
 *
 * @description ThemeBuilder is a class responsible for building and placing a theme based on the
 * provided options and settings.
 */
declare class ThemeBuilder {
  /**
   * Constructs a new instance of ThemeBuilder.
   *
   * @param {TBuilderOptions} options - The options for the theme builder, including project name, destination path, and theme name.
   * @param {TCustomSettings} settings - Optional custom settings for the theme. If not provided, default settings will be used.
   */
  constructor(options: TBuilderOptions, settings: TCustomSettings);

  /**
   * Builds the theme and places it in the specified destination.
   */
  public buildTheme(): void;

  /**
   * Builds the documentation and places it in the specified destination.
   */
  public buildDocs(): void;

  /**
   * Builds both the theme and the documentation and places them in the specified destination.
   */
  public buildAll(): void;
}

export default ThemeBuilder;
