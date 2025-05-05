import type { ComputedRef } from 'vue';

/**
 * Return type for the `useSidebarMenuItemLink` composable function.
 */
export type TUseSidebarMenuItemLinkReturn = {
  /**
   * Reactive computed property that determines the type of the menu item link to render.
   */
  renderType: ComputedRef<'native' | 'external' | 'internal' | 'text'>;

  /**
   * Reactive computed property indicating whether the link is currently active.
   */
  isLinkActive: ComputedRef<boolean>;

  /**
   * Reactive computed property generating CSS class string based on component props (modifier, size, states, etc.).
   */
  componentClasses: ComputedRef<string>;
};
