import { BuilderConstructor } from './builder-constructor';
import type { TCustomSettings } from '../../types/builder-custom-settings/custom-settings.type';
import type { TDefaultSettings } from '../../types/builder-default-settings/default-settings.type';

/**
 * @description A class that extends `BuilderConstructor` to build a theme by combining various
 * SCSS components. This class provides a method to construct a theme by aggregating different SCSS
 * fragments and applying necessary transformations.
 */
export default class Builder extends BuilderConstructor {
  /**
   * @description Constructs an instance of the `Builder` class.
   * @param {TCustomSettings} customSettings - Custom settings to be used for theme generation.
   * @param {TDefaultSettings} defaultSettings - Default settings to be used as a fallback.
   */
  constructor(customSettings: TCustomSettings, defaultSettings: TDefaultSettings) {
    super(customSettings, defaultSettings);
  }

  /**
   * @description Builds a complete theme by combining various SCSS components. This method
   * aggregates SCSS fragments for breakpoints, grid settings, containers, debug utilities,
   * default styles, and helper classes. It also applies transformations to clean up the final
   * output.
   *
   * @returns {string} The generated theme as a string of SCSS code.
   */
  buildTheme(): string {
    let theme = '';

    // Aggregate SCSS fragments for different theme components
    theme += super.buildDirectivesScss();
    theme += super.buildBreakPointsScss();
    theme += super.buildBreakPointsMediaMixins();
    theme += super.buildGridSettings();
    theme += super.buildGridContainer();
    theme += super.buildGridContainerFluid();
    theme += super.buildGridDebug();
    theme += super.buildGridDefault();
    theme += super.buildTheme();
    theme += super.buildUtilities();

    // Add helpers mixins
    theme += super.buildHelperTextStyle();
    theme += super.buildHelperColumnOffset();

    // Apply transformations to clean up the theme
    theme = super.replacer(theme);
    theme = super.removeEmptyLines(theme);

    return theme;
  }
}
