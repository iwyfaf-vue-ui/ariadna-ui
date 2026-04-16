import type { ComputedRef } from 'vue';

/**
 * Return type for the `useDropdownMenuItemBadge` composable.
 */
export type TUseDropdownMenuItemBadgeReturn = {
  /**
   * Whether the badge is a plain string or number (as opposed to a Vue component).
   */
  isBadgeNotComponent: ComputedRef<boolean>;

  /**
   * BEM CSS class string for the badge wrapper element.
   */
  componentClasses: ComputedRef<string>;
};
