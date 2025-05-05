/**
 * @description
 * Represents a configuration object for custom settings helpers.
 * This type defines a set of helper mixins that can be enabled or disabled to generate utility mixins for specific CSS
 * properties or functionalities.
 */
export type TCustomSettingsHelpers = {
  /**
   * Configuration object for helper mixins. These mixins provide utility functions for common CSS patterns.
   * If helper mixin is turned off, it will not be built into the project.
   *
   * @example
   * ```typescript
   *  helpers: {},
   * ```
   */
  helpers?: {
    /**
     * Determines whether to generate a helper mixin for font-related properties. When enabled, it allows the use of a
     * mixin like `text-style-helper` to apply predefined font styles.
     *
     * @example
     * ```typescript
     * helpers: {
     *   textStyle: true,
     * },
     * ```
     *
     * ```scss
     * &__title {
     *   @include text-style-helper(h1);
     * }
     * ```
     *
     * @default false
     */
    textStyle?: boolean;

    /**
     * Determines whether to generate a helper mixin for column offset functionality.
     * When enabled, it provides a mixin to manage column offsets in grid or flex layouts.
     *
     * ```typescript
     *  helpers: {
     *     columnOffset: true,
     *   },
     * ```
     *
     * ```scss
     * &__title {
     *   @include column-offset('1/2','1/4','1/7','3/11');
     * }
     * ```
     *
     * @default false
     */
    columnOffset?: boolean;
  };
};
