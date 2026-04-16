import type { ComputedRef } from 'vue';

/**
 * Return type for the `useDropdownMenuItemIcon` composable.
 */
export type TUseDropdownMenuItemIconReturn = {
  /**
   * Whether the icon is a plain CSS-class string (as opposed to a Vue component).
   */
  isIconString: ComputedRef<boolean>;

  /**
   * BEM CSS class string for the icon wrapper element.
   */
  componentClasses: ComputedRef<string>;
};
