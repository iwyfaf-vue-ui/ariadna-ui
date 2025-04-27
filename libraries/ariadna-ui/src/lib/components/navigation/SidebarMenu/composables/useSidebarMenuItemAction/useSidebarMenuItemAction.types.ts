import type { ComputedRef } from 'vue';

/**
 * @description Return type for the `useSidebarMenuItemAction` composable function.
 * Contains reactive properties.
 */
export type TUseSidebarMenuItemActionReturn = {
  /**
   * A computed boolean indicating whether the sidebar menu item's action icon is represented as string.
   */
  isActionString: ComputedRef<boolean>;

  /**
   * Reactive computed property generating CSS class string based on component props (modifier, size, states, etc.).
   */
  componentClasses: ComputedRef<string>;
};
