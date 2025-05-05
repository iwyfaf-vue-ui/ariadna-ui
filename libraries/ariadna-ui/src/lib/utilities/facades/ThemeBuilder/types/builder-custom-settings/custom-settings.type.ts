import type { TCustomSettingsBreakpoints } from './custom-settings-breakpoints.type';
import type { TCustomSettingsGrid } from './custom-settings-grid.type';
import type { TCustomSettingsTheme } from './custom-settings-theme.type';
import type { TCustomSettingsUtilities } from './custom-settings-utilities.type';
import type { TCustomSettingsHelpers } from './custom-settings-helpers.type';

/**
 * @description
 * Represents a comprehensive collection of custom settings for a project, combining breakpoints, grid configurations,
 * themes, utilities, and helper flags. This type is an intersection of multiple specialized setting types.
 *
 * @extends TCustomSettingsBreakpoints - Breakpoint definitions for responsive design.
 * @extends TCustomSettingsGrid - Grid system configuration settings.
 * @extends TCustomSettingsTheme - Theme definitions including color schemes.
 * @extends TCustomSettingsUtilities - Utility classes for fonts, spacing, transitions, etc.
 * @extends TCustomSettingsHelpers - Helper flags for additional functionality.
 *
 * @example
 * ```typescript
 *  breakPoints: {
 *     sm: {
 *       width: '576px',
 *     },
 *     md: {
 *       width: '768px',
 *     },
 *     lg: {
 *       width: '992px',
 *     },
 *     xl: {
 *       width: '1200px',
 *     },
 *     xxl: {
 *       width: '1600px',
 *     },
 *   },
 *   gridSettings: {
 *     container: {
 *       container: '100%',
 *       sm: '100%',
 *       md: '100%',
 *       lg: '100%',
 *       xl: '100%',
 *       xxl: '1600px',
 *     },
 *     fields: {
 *       fields: '16px',
 *       sm: '30px',
 *       xl: '40px',
 *     },
 *     gap: {
 *       gap: '14px',
 *       sm: '20px',
 *       xl: '30px',
 *     },
 *   },
 *   themes: {
 *     default: {
 *       colors: {
 *         brand: {
 *           primary: {
 *             200: '#E1E2FF',
 *             '200-15': 'rgba(225, 226, 255, 0.15)',
 *             100: '#F5F6FF',
 *           },
 *           secondary: {
 *             500: '#86A4CA',
 *             400: '#AAC9F0',
 *             300: '#E9F3FF',
 *             200: '#F9FAFF',
 *           },
 *         },
 *         utility: {
 *           black: {
 *             default: '#000000',
 *           },
 *           white: {
 *             default: '#ffffff',
 *             50: 'rgba(255, 255, 255, 0.5)',
 *             30: 'rgba(255, 255, 255, 0.3)',
 *           },
 *           success: {
 *             default: '#4DBE7B',
 *             20: 'rgba(77, 190, 123, 0.2)',
 *           },
 *           error: {
 *             default: '#F14343',
 *             20: 'rgba(241, 67, 67, 0.2)',
 *           },
 *           warning: {
 *             default: '#FF9B63',
 *             20: 'rgba(255, 155, 99, 0.2)',
 *           },
 *           link: {
 *             default: '#1B6ACE',
 *             20: 'rgba(27, 106, 206, 0.2)',
 *           },
 *         },
 *       },
 *     },
 *   },
 *   utilities: {
 *     fonts: {
 *       family: {
 *         arial: {
 *           arial: 'Arial, Helvetica, sans-serif',
 *         },
 *       },
 *       size: {
 *         h1: {
 *           h1: '35px',
 *           md: '60px',
 *         },
 *         t1: {
 *           t1: '18px',
 *           md: '20px',
 *         },
 *       },
 *       weight: {
 *         h1: {
 *           h1: '600',
 *         },
 *         t1: {
 *           t1: '400',
 *         },
 *       },
 *       height: {
 *         h1: {
 *           h1: '115%',
 *         },
 *         t1: {
 *           t1: '140%',
 *         },
 *       },
 *     },
 *     indents: {
 *       indents: {
 *         200: {
 *           200: '5px',
 *         },
 *         300: {
 *           300: '10px',
 *         },
 *       },
 *     },
 *     transition: {
 *       time: {
 *         10: {
 *           10: '0.1s',
 *         },
 *         20: {
 *           20: '0.2s',
 *         },
 *       },
 *       easing: {
 *         linear: {
 *           linear: 'linear',
 *         },
 *         ease: {
 *           ease: 'ease',
 *         },
 *         easeinout: {
 *           easeinout: 'ease-in-out',
 *         },
 *         cubicin: {
 *           cubicin: 'cubic-bezier(0.5, 0, 0, 1)',
 *         },
 *         cubicout: {
 *           cubicout: 'cubic-bezier(0.5, 0, 0.5, 1)',
 *         },
 *       },
 *     },
 *     radius: {
 *       radius: {
 *         5: {
 *           5: '5px',
 *         },
 *         10: {
 *           10: '10px',
 *         },
 *         '50percent': {
 *           '50percent': '50%',
 *         },
 *         rounded: {
 *           rounded: '99em',
 *         },
 *       },
 *     },
 *     shadow: {
 *       shadow: {
 *         default: {
 *           default: '30px 10px 30px 0px rgba(0, 0, 0, 0.25)',
 *         },
 *         1: {
 *           1: '30px 20px 30px 0px rgba(0, 0, 0, 0.15)',
 *         },
 *       },
 *     },
 *     blur: {
 *       blur: {
 *         0: {
 *           0: 'blur(0px)',
 *         },
 *         20: {
 *           20: 'blur(20px)',
 *         },
 *       },
 *     },
 *   },
 *   helpers: {
 *     textStyle: true,
 *     columnOffset: true,
 *   },
 * ```
 */
export type TCustomSettings = TCustomSettingsBreakpoints &
  TCustomSettingsGrid &
  TCustomSettingsTheme &
  TCustomSettingsUtilities &
  TCustomSettingsHelpers;
