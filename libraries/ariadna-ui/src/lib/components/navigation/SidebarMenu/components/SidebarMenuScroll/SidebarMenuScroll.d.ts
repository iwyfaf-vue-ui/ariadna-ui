import type { VNode } from 'vue';

/**
 * @description Sidebar menu item component slots.
 */
export type TSidebarMenuScrollSlots = {
  /**
   * @description Default scroll slot.
   */
  default?(): VNode[];
};
