import type { TSidebarMenuItem } from '../../types/SidebarMenu.item';
import type { VNode } from 'vue';

/**
 * Component props definition.
 */
export type TSidebarMenuItemProps = {
  /**
   * Sidebar menu element.
   *
   * @type TSidebarMenuItem
   * @default undefined
   * @required
   */
  item: TSidebarMenuItem;

  /**
   * Sidebar menu item level.
   *
   * @type number
   * @default 1
   */
  level?: number;

  /**
   * Sidebar menu item active state.
   *
   * @type boolean
   * @default false
   */
  active?: boolean;
};

/**
 * Sidebar menu item component slots.
 */
export type TSidebarMenuItemSlots = {
  /**
   * Dropdown icon slot.
   */
  dropdownIcon?(props: { isOpen: boolean }): VNode[];

  /**
   * Action icon slot.
   *
   * @returns {VNode[]}
   */
  actionIcon?(): VNode[];
};
