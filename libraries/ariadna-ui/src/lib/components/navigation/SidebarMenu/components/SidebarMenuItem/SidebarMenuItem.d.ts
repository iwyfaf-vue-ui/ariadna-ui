import type { TSidebarMenuItem } from '../../types/SidebarMenu.item';
import type { VNode } from 'vue';

/**
 * @description Component props definition.
 */
export type TSidebarMenuItemProps = {
  /**
   * @description Sidebar menu element.
   *
   * @type TSidebarMenuItem
   * @default undefined
   * @required
   */
  item: TSidebarMenuItem;

  /**
   * @description Sidebar menu item level.
   *
   * @type number
   * @default 1
   */
  level?: number;

  /**
   * @description Sidebar menu item active state.
   *
   * @type boolean
   * @default false
   */
  active?: boolean;
};

/**
 * @description Sidebar menu item component slots.
 */
export type TSidebarMenuItemSlots = {
  /**
   * @description Dropdown icon slot.
   */
  dropdownIcon?(props: { isOpen: boolean }): VNode[];

  /**
   * @description Action icon slot.
   * @returns {VNode[]}
   */
  actionIcon?(): VNode[];
};
