import type { VNode } from 'vue';

/**
 * Sidebar menu item component slots.
 */
export type TSidebarMenuScrollSlots = {
  /**
   * Default scroll slot.
   */
  default?(): VNode[];
};
