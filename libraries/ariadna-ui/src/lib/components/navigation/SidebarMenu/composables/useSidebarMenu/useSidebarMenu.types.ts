import type { ComputedRef } from 'vue';
import type { TSidebarMenuItem } from '../../types/SidebarMenu.item';

/**
 * @description Return type for the `useSidebarMenu` composable function.
 * Contains reactive properties.
 */
export type TUseSidebarMenuReturn = {
  /**
   * Computed property returning a function to determine if a menu item is active.
   */
  isMenuItemActiveComputed: ComputedRef<(item: TSidebarMenuItem) => boolean>;

  /**
   * Reactive computed property generating CSS class string based on component props (modifier, size, states, etc.).
   */
  componentClasses: ComputedRef<string>;
};
