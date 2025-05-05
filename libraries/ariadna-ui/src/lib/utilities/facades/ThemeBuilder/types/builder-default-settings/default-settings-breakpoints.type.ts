/**
 * @description
 * Represents custom breakpoints settings for responsive design.
 * This type allows defining breakpoints for various device sizes, including
 * small (sm), medium (md), large (lg), extra large (xl), very extra large (xxl),
 * and custom breakpoints. Each breakpoint is optional and can be configured
 * with a specific width.
 */
export type TDefaultSettingsBreakpoints = {
  /**
   * Breakpoints default settings.
   *
   * A collection of breakpoints for different device sizes.
   * Each breakpoint is optional and can be configured with a specific width.
   *
   * @example
   * ```typescript
   * breakPoints: {
   *   sm: {
   *     width: '576px',
   *   },
   *   md: {
   *     width: '768px',
   *   },
   *   lg: {
   *     width: '992px',
   *   },
   *   xl: {
   *     width: '1200px',
   *   },
   *   xxl: {
   *     width: '1400px',
   *   },
   * },
   * ```
   *
   * @default
   * ```
   * breakPoints: {
   *   sm: {
   *     width: '576px',
   *   },
   *   md: {
   *     width: '768px',
   *   },
   *   lg: {
   *     width: '992px',
   *   },
   *   xl: {
   *     width: '1200px',
   *   },
   *   xxl: {
   *     width: '1400px',
   *   },
   * },
   * ```
   */
  breakPoints: {
    /**
     * Optional breakpoint for small devices.
     *
     * @example
     * ```typescript
     * breakPoints: {
     *   sm: {
     *     width: '576px',
     *   },
     * }
     * ```
     */
    sm?: {
      width: string;
    };

    /**
     * Optional breakpoint for medium devices.
     *
     * @example
     * ```typescript
     * breakPoints: {
     *   md: {
     *     width: '768px',
     *   },
     * }
     * ```
     */
    md?: {
      width: string;
    };

    /**
     * Optional breakpoint for large devices.
     *
     * @example
     * ```typescript
     * breakPoints: {
     *   lg: {
     *     width: '992px',
     *   },
     * }
     * ```
     */
    lg?: {
      width: string;
    };

    /**
     * Optional breakpoint for extra large devices.
     *
     * @example
     * ```typescript
     * breakPoints: {
     *   xl: {
     *     width: '1200px',
     *   },
     * }
     * ```
     */
    xl?: {
      width: string;
    };

    /**
     * Optional breakpoint for very extra large devices.
     *
     * @example
     * ```typescript
     * breakPoints: {
     *   xxl: {
     *     width: '1400px',
     *   },
     * }
     * ```
     */
    xxl?: {
      width?: string;
    };
  };
};
