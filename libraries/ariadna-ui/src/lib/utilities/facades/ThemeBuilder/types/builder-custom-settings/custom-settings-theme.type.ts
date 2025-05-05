/**
 * @description
 * Configuration object for theme settings. Allows defining multiple themes with nested color structures. Each theme
 * can have multiple color groups (brand, utility, etc.), subgroups (primary, secondary, etc.), and properties with
 * their respective color values.
 */
export type TCustomSettingsTheme = {
  /**
   * Theme settings.
   *
   * @example
   * ```typescript
   * themes: {
   *   default: {
   *     color: {
   *       brand: {
   *         primary: {
   *           800: '#323352',
   *           700: '#44456B',
   *           600: '#585984',
   *           500: '#6D6E9E',
   *           '500-50': 'rgba(109, 110, 158, 0.5)',
   *           400: '#9A9CD1',
   *           300: '#C9CBFF',
   *           200: '#E1E2FF',
   *           '200-15': 'rgba(225, 226, 255, 0.15)',
   *           100: '#F5F6FF',
   *         },
   *         secondary: {
   *           500: '#86A4CA',
   *           400: '#AAC9F0',
   *           300: '#E9F3FF',
   *           200: '#F9FAFF',
   *         },
   *       },
   *       gray: {
   *         neutral: {
   *           700: '#211F1F',
   *           600: '#373535',
   *           500: '#545151',
   *           400: '#A5A5A5',
   *           300: '#F7F7F7',
   *         },
   *       },
   *       utility: {
   *         black: {
   *           default: '#000000',
   *         },
   *         white: {
   *           default: '#ffffff',
   *           50: 'rgba(255, 255, 255, 0.5)',
   *           30: 'rgba(255, 255, 255, 0.3)',
   *         },
   *         success: {
   *           default: '#4DBE7B',
   *           20: 'rgba(77, 190, 123, 0.2)',
   *         },
   *         error: {
   *           default: '#F14343',
   *           20: 'rgba(241, 67, 67, 0.2)',
   *         },
   *         warning: {
   *           default: '#FF9B63',
   *           20: 'rgba(255, 155, 99, 0.2)',
   *         },
   *         link: {
   *           default: '#1B6ACE',
   *           20: 'rgba(27, 106, 206, 0.2)',
   *         },
   *       },
   *     },
   *   },
   * },
   * ```
   */
  themes: {
    /**
     * Theme identifier (e.g., 'default', 'dark', 'light').
     * The key represents the theme name that can be used to apply the theme.
     *
     * @example
     * ```typescript
     * themes: {
     *   light: { ... }, // Light theme
     *   dark: { ... }    // Dark theme
     * },
     * ```
     */
    [key: string]: {
      /**
       * Theme group category (e.g., 'color', 'gradient', etc.').
       * Organizes theme into logical groups for better maintainability.
       *
       * @example
       * ```typescript
       * themes: {
       *  light: {
       *     color: {},
       *     gradient: {},
       *   },
       *  dark: {
       *     color: {},
       *     gradient: {},
       *   },
       * },
       * ```
       */
      [key: string]: {
        /**
         * Color group category (e.g., 'text', 'icon', 'background').
         * Organizes theme colors into logical groups for better maintainability.
         *
         * @example
         * ```typescript
         * themes: {
         *  light: {
         *     color: {
         *       text: {},
         *       icon: {},
         *       background: {},
         *     },
         *   },
         *  dark: {
         *     color: {
         *       text: {},
         *       icon: {},
         *       background: {},
         *     },
         *   },
         * },
         * ```
         */
        [key: string]: {
          /**
           * Color subgroup category (e.g., 'default', 'primary', 'secondary').
           * Organizes theme colors into logical subgroups for better maintainability.
           *
           * @example
           * ```typescript
           * themes: {
           *   light: {
           *     color: {
           *       text: {
           *         default: {},
           *         primary: {},
           *         secondary: {},
           *       },
           *       icon: {
           *        default: {},
           *         primary: {},
           *         secondary: {},
           *        },
           *       background: {
           *        default: {},
           *         primary: {},
           *         secondary: {},
           *       },
           *     },
           *   },
           * },
           * ```
           */
          [key: string]: {
            /**
             * Individual color properties with their values.
             * Keys can be numeric scales (e.g., 100-900) or semantic names (e.g., 'default').
             * Supports opacity variants with suffix (e.g., '500-50' for 50% opacity).
             *
             * @example
             * ```typescript
             * themes: {
             *   light: {
             *     color: {
             *       text: {
             *         default: {
             *            default: '#000',
             *            foreground: '#fff',
             *            disabled: '#666',
             *            weak: '#333',
             *            opacity: 'rgb(109 110 111 / 8%)',
             *            '500-50': 'rgb(109, 110, 158 / 50%)',
             *         },
             *         primary: {},
             *         secondary: {},
             *       },
             *       icon: {
             *        default: {},
             *         primary: {},
             *         secondary: {},
             *        },
             *       background: {
             *        default: {},
             *         primary: {},
             *         secondary: {},
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
  };
};
