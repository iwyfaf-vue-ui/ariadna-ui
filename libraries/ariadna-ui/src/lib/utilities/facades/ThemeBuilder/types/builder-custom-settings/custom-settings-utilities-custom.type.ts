/**
 * @description Represents a deeply nested structure for custom CSS utility settings.
 * This type allows defining custom CSS properties at multiple nested levels,
 * typically used for utility-first CSS frameworks or theme configurations.
 *
 * @example
 * ```typescript
 *  transition: {
 *     time: {
 *       10: {
 *         10: '0.1s',
 *       },
 *       20: {
 *         20: '0.2s',
 *       },
 *     },
 *     easing: {
 *       linear: {
 *         linear: 'linear',
 *       },
 *       ease: {
 *         ease: 'ease',
 *       },
 *       easeinout: {
 *         easeinout: 'ease-in-out',
 *       },
 *       cubicin: {
 *         cubicin: 'cubic-bezier(0.5, 0, 0, 1)',
 *       },
 *       cubicout: {
 *         cubicout: 'cubic-bezier(0.5, 0, 0.5, 1)',
 *       },
 *     },
 *   },
 * ```
 */
export type TCustomSettingsUtilitiesCustom = {
  /**
   * @description Utility identifier (e.g., 'transition', 'spacing').
   * Keys represent utility names, values contain nested utility definitions.
   *
   * @example
   * ```typescript
   * utilities: {
   *   transition: {},
   * },
   * ```
   */
  [key: string]: {
    /**
     * @description Utility group (e.g., 'time', 'easing').
     * Keys represent sub-categories, values contain property definitions.
     *
     * @example
     * ```typescript
     * utilities: {
     *  transition: {
     *     time: {},
     *     easing: {},
     *   },
     * },
     * ```
     */
    [key: string]: {
      /**
       * @description Utility subgroup (e.g., '10', 'linear').
       * Keys represent variant names, values contain final CSS properties.
       *
       * @example
       * ```typescript
       * utilities: {
       *  transition: {
       *     time: {
       *       10: {},
       *       20: {},
       *     },
       *     easing: {
       *       linear: {},
       *       ease: {},
       *       easeinout: {},
       *       cubicin: {},
       *       cubicout: {},
       *     },
       *   },
       * },
       * ```
       */
      [key: string]: {
        /**
         * @description Individual utility property.
         * Keys represent CSS property names, values are CSS values.
         *
         * @example
         * ```typescript
         * utilities: {
         *  transition: {
         *     time: {
         *       10: {
         *         10: '0.1s',
         *       },
         *       20: {
         *         20: '0.2s',
         *       },
         *     },
         *     easing: {
         *       linear: {
         *         linear: 'linear',
         *       },
         *       ease: {
         *         ease: 'ease',
         *       },
         *       easeinout: {
         *         easeinout: 'ease-in-out',
         *       },
         *       cubicin: {
         *         cubicin: 'cubic-bezier(0.5, 0, 0, 1)',
         *       },
         *       cubicout: {
         *         cubicout: 'cubic-bezier(0.5, 0, 0.5, 1)',
         *       },
         *     },
         *   },
         * },
         * ```
         */
        [key: string]: string;
      };
    };
  };
};
