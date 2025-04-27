import type { TSidebarMenuItem } from '../../types/SidebarMenu.item';

/**
 * @description Component props definition.
 */
export type TSidebarMenuItemLinkProps = {
  /**
   * @description Sidebar menu link element.
   *
   * @type TSidebarMenuItem
   * @default undefined
   * @required
   */
  item: TSidebarMenuItem;
};
