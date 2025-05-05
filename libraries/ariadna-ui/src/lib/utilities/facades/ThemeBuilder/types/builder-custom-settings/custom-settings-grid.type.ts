/**
 * @description
 * Custom grid settings that define container widths, fields, and gaps for different breakpoints. Allows responsive
 * design configuration with default values and breakpoint overrides.
 */
export type TCustomSettingsGrid = {
  /**
   * Custom grid settings.
   *
   * @example
   * ```typescript
   * gridSettings: {
   *   container: {
   *     container: '100%',
   *     sm: '540px',
   *     md: '720px',
   *     lg: '960px',
   *     xl: '1140px',
   *     xxl: '1320px',
   *   },
   *   fields: {
   *     fields: '16px',
   *   },
   *   gap: {
   *     gap: '32px',
   *   },
   * },
   * ```
   *
   * @default
   * ```
   * gridSettings: {
   *   container: {
   *     container: '100%',
   *     sm: '540px',
   *     md: '720px',
   *     lg: '960px',
   *     xl: '1140px',
   *     xxl: '1320px',
   *   },
   *   fields: {
   *     fields: '16px',
   *   },
   *   gap: {
   *     gap: '32px',
   *   },
   * },
   * ```
   */
  gridSettings: {
    /**
     * Grid container options.
     *
     * @example
     * ```typescript
     * gridSettings: {
     *   container: {
     *     container: '100%',
     *     sm: '540px',
     *     md: '720px',
     *     lg: '960px',
     *     xl: '1140px',
     *     xxl: '1320px',
     *   },
     * },
     * ```
     */
    container: {
      /**
       * Grid container value.
       */
      container: string;

      /**
       * Grid container value redefinition for specified breakpoint.
       */
      [key: string]: string;
    };

    /**
     * Grid fields in pixels.
     */
    fields: {
      /**
       * Grid fields value.
       *
       * @example
       * ```typescript
       * gridSettings: {
       *   fields: {
       *     fields: '16px',
       *   },
       * },
       * ```
       */
      fields: string;

      /**
       * Grid fields value redefinition for specified breakpoint.
       */
      [key: string]: string;
    };

    /**
     * Grid gap in pixels.
     */
    gap: {
      /**
       * Grid gap value.
       *
       * @example
       * ```typescript
       * gridSettings: {
       *   gap: {
       *     gap: '32px',
       *   },
       * },
       * ```
       */
      gap: string;

      /**
       * Grid gap value redefinition for specified breakpoint.
       */
      [key: string]: string;
    };
  };
};
