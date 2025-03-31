import type { TCustomSettingsUtilitiesFont } from './custom-settings-utilities-font.type';
import type { TCustomSettingsUtilitiesIndent } from './custom-settings-utilities-indent.type';
import type { TCustomSettingsUtilitiesCustom } from './custom-settings-utilities-custom.type';

/**
 * @description Represents a collection of utility settings for styling components.
 * This type combines font settings, indentation settings, and custom utility settings
 * into a single configuration object.
 *
 * @extends TCustomSettingsUtilitiesFont
 * @extends TCustomSettingsUtilitiesIndent
 * @extends TCustomSettingsUtilitiesCustom
 */
export type TCustomSettingsUtilities = {
  /**
   * @description Utilities settings.
   *
   * @example
   * ```typescript
   * utilities: {
   *   fonts: {
   *     family: {
   *       arial: {
   *         arial: 'Arial, Helvetica, sans-serif',
   *       },
   *     },
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
   *     weight: {
   *       h1: {
   *         h1: '600',
   *       },
   *       t1: {
   *         t1: '400',
   *       },
   *     },
   *     height: {
   *       h1: {
   *         h1: '115%',
   *       },
   *       t1: {
   *         t1: '140%',
   *       },
   *     },
   *   },
   *  indents: {
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
   *   transition: {
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
   *   radius: {
   *     radius: {
   *       5: {
   *         5: '5px',
   *       },
   *       10: {
   *         10: '10px',
   *       },
   *       '50percent': {
   *         '50percent': '50%',
   *       },
   *       rounded: {
   *         rounded: '99em',
   *       },
   *     },
   *   },
   *   shadow: {
   *     shadow: {
   *       default: {
   *         default: '30px 10px 30px 0px rgba(0, 0, 0, 0.25)',
   *       },
   *       1: {
   *         1: '30px 20px 30px 0px rgba(0, 0, 0, 0.15)',
   *       },
   *     },
   *   },
   *   blur: {
   *     blur: {
   *       0: {
   *         0: 'blur(0px)',
   *       },
   *       20: {
   *         20: 'blur(20px)',
   *       },
   *     },
   *   },
   * },
   * ```
   */
  utilities: TCustomSettingsUtilitiesFont &
    TCustomSettingsUtilitiesIndent &
    TCustomSettingsUtilitiesCustom;
};
