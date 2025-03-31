/**
 * @description Utilities indents settings.
 *
 * @example
 * ```typescript
 *  indent: {
 *     padding: {
 *       100: {
 *         100: '5px',
 *       },
 *       200: {
 *         200: '10px',
 *       },
 *     },
 *     margin: {
 *       100: {
 *         100: '5px',
 *       },
 *       200: {
 *         200: '10px',
 *         md: '7px',
 *       },
 *     },
 *   },
 * ```
 */
export type TCustomSettingsUtilitiesIndent = {
  /**
   * @description Indents variables (i.e. margins & paddings).
   *
   * @example
   * ```typescript
   * utilities: {
   *   indent: {},
   * },
   * ```
   */
  indent?: {
    /**
     * @description Paddings CSS variables.
     *
     * @example
     * ```typescript
     * utilities: {
     *   indent: {
     *     padding: {},
     *   },
     * },
     * ```
     */
    padding?: {
      /**
       * @description Paddings utility group.
       *
       * @example
       * ```typescript
       * utilities: {
       *   indent: {
       *     padding: {
       *       100: {},
       *       200: {},
       *     },
       *   },
       * },
       * ```
       */
      [key: string]: {
        /**
         * @description Paddings property and its value.
         *
         * @example
         * ```typescript
         * utilities: {
         *   indent: {
         *     padding: {
         *       100: {
         *         100: '5px',
         *       },
         *       200: {
         *         200: '10px',
         *       },
         *     },
         *   },
         * },
         * ```
         */
        [key: string]: string;
      };
    };

    /**
     * @description Margins CSS variables.
     *
     * @example
     * ```typescript
     * utilities: {
     *   indent: {
     *     margin: {},
     *   },
     * },
     * ```
     */
    margin?: {
      /**
       * @description Margins utility group.
       *
       * @example
       * ```typescript
       * utilities: {
       *   indent: {
       *     margin: {
       *       100: {},
       *       200: {},
       *     },
       *   },
       * },
       * ```
       */
      [key: string]: {
        /**
         * @description Margins property and its value.
         *
         * @example
         * ```typescript
         * utilities: {
         *   indent: {
         *     margin: {
         *       100: {
         *         100: '5px',
         *       },
         *       200: {
         *         200: '10px',
         *         md: '7px',
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
