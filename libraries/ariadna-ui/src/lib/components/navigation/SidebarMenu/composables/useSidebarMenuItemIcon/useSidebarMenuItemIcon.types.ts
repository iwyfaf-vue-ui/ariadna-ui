import type { ComputedRef } from 'vue';

/**
 * @description Return type for the `useSidebarMenuItemIcon` composable function.
 * Contains reactive properties.
 */
export type TUseSidebarMenuItemIconReturn = {
  /**
   * A computed boolean indicating whether the sidebar menu item's icon is represented as a string.
   */
  isIconString: ComputedRef<boolean>;

  /**
   * Reactive computed property generating CSS class string based on component props (modifier, size, states, etc.).
   */
  componentClasses: ComputedRef<string>;
};
