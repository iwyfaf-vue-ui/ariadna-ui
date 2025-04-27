import type { ComputedRef } from 'vue';

/**
 * @description Return type for the `useSidebarMenuItemBadge` composable function.
 * Contains reactive properties.
 */
export type TUseSidebarMenuItemBadgeReturn = {
  /**
   * A computed boolean indicating whether the sidebar menu item's badge is represented as not Vue component.
   */
  isBadgeNotComponent: ComputedRef<boolean>;

  /**
   * Reactive computed property generating CSS class string based on component props (modifier, size, states, etc.).
   */
  componentClasses: ComputedRef<string>;
};
