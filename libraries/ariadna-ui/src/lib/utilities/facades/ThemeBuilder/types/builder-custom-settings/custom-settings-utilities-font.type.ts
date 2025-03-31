/**
 * @description Utilities fonts settings.
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
   * @description Font CSS variables.
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
     * @description Font-family CSS variables.
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
       * @description Font-family utility group.
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
         * @description Font-family property with its value.
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
     * @description Font-size CSS variables.
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
       * @description Font-size utility group.
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
         * @description Font-size property and its value.
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
     * @description Font-weight CSS variables.
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
       * @description Font-weight utility group.
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
         * @description Font-weight property and its value.
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
     * @description Font-height CSS variables.
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
       * @description Font-height utility group.
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
         * @description Font-height property and its value.
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
