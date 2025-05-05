/**
 * Represents the configuration options for the theme builder.
 * This type defines the essential properties required to build and place a theme.
 *
 * @example
 * ```javascript
 * new ThemeBuilder(
 *   {
 *     projectName: 'my-project.com',
 *     destination: './assets/scss/theme/',
 *     themeName: 'theme',
 *   },
 *   {},
 * ).buildAll();
 * ```
 */
export type TBuilderOptions = {
  /**
   * Name of your project.
   *
   * @example
   * ```typescript
   * projectName: 'my-project.com',
   * ```
   */
  projectName: string;

  /**
   * Destination path (with a closing slash) where theme will be placed.
   *
   * @example
   * ```typescript
   * destination: './assets/scss/theme/',
   * ```
   */
  destination: string;

  /**
   * Name of file with theme.
   *
   * @example
   * ```typescript
   * themeName: 'theme',
   * ```
   */
  themeName: string;
};
