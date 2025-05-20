import type { TOnClickOutsideDirective } from './types/OnClickOutside.types';

/**
 * Ariadna UI | Directives | OnClickOutside
 *
 * @description
 * `OnClickOutside` is a Vue custom directive that detects clicks or touches outside the bound element and invokes a
 * provided callback. Useful for closing dropdowns, modals, or popovers when the user interacts outside the component.
 *
 * @example
 * <div v-on-click-outside="outsideClickHandler">
 *   Click outside of me
 * </div>
 */
declare const vOnClickOutside: TOnClickOutsideDirective;

export default vOnClickOutside;
