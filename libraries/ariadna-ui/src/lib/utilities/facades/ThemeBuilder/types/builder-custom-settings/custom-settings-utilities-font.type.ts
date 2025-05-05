/**
 * Utilities fonts settings.
 *
 * @example
 * ```typescript
 * font: {
 *   family: {
 *     arial: {
 *       arial: 'Arial, Helvetica, sans-serif',
 *     },
 *   },
 *   size: {
 *     h1: {
 *       h1: '35px',
 *         md: '60px',
 *     },
 *     t1: {
 *       t1: '18px',
 *         md: '20px',
 *     },
 *   },
 *   weight: {
 *     h1: {
 *       h1: '600',
 *     },
 *     t1: {
 *       t1: '400',
 *     },
 *   },
 *   height: {
 *     h1: {
 *       h1: '115%',
 *     },
 *     t1: {
 *       t1: '140%',
 *     },
 *   },
 * },
 * ```
 */
export type TCustomSettingsUtilitiesFont = {
  /**
   * Font CSS variables.
   *
   * @example
   * ```typescript
   * utilities: {
   *   font: {},
   * },
   * ```
   */
  font?: {
    /**
     * Font-family CSS variables.
     *
     * @example
     * ```typescript
     * utilities: {
     *   font: {
     *     family: {},
     *   },
     * },
     * ```
     */
    family?: {
      /**
       * Font-family utility group.
       *
       * @example
       * ```typescript
       * utilities: {
       *   font: {
       *     family: {
       *       arial: {},
       *     },
       *   },
       * },
       * ```
       */
      [key: string]: {
        /**
         * Font-family property with its value.
         *
         * @example
         * ```typescript
         * utilities: {
         *   font: {
         *     family: {
         *       arial: {
         *         arial: 'Arial, Helvetica, sans-serif',
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
     * Font-size CSS variables.
     *
     * @example
     * ```typescript
     * utilities: {
     *   font: {
     *     size: {},
     *   },
     * },
     * ```
     */
    size?: {
      /**
       * Font-size utility group.
       *
       * @example
       * ```typescript
       * utilities: {
       *   font: {
       *     size: {
       *       h1: {},
       *       t1: {},
       *     },
       *   },
       * },
       * ```
       */
      [key: string]: {
        /**
         * Font-size property and its value.
         *
         * @example
         * ```typescript
         * utilities: {
         *   font: {
         *     size: {
         *       h1: {
         *         h1: '35px',
         *         md: '60px',
         *       },
         *       t1: {
         *         t1: '18px',
         *         md: '20px',
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
     * Font-weight CSS variables.
     *
     * @example
     * ```typescript
     * utilities: {
     *   font: {
     *     weight: {},
     *   },
     * },
     * ```
     */
    weight?: {
      /**
       * Font-weight utility group.
       *
       * @example
       * ```typescript
       * utilities: {
       *   font: {
       *     weight: {
       *       h1: {},
       *       t1: {},
       *     },
       *   },
       * },
       * ```
       */
      [key: string]: {
        /**
         * Font-weight property and its value.
         *
         * @example
         * ```typescript
         * utilities: {
         *   font: {
         *     weight: {
         *       h1: {
         *         h1: '600',
         *       },
         *       t1: {
         *         t1: '400',
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
     * Font-height CSS variables.
     *
     * @example
     * ```typescript
     * utilities: {
     *   font: {
     *     height: {},
     *   },
     * },
     * ```
     */
    height?: {
      /**
       * Font-height utility group.
       *
       * @example
       * ```typescript
       * utilities: {
       *   font: {
       *     height: {
       *       h1: {},
       *       t1: {},
       *     },
       *   },
       * },
       * ```
       */
      [key: string]: {
        /**
         * Font-height property and its value.
         *
         * @example
         * ```typescript
         * utilities: {
         *   font: {
         *     height: {
         *       h1: {
         *         h1: '115%',
         *       },
         *       t1: {
         *         t1: '140%',
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
