import type { TSidebarMenuItem } from '../../types/SidebarMenu.item';

/**
 * Component props definition.
 */
export type TSidebarMenuItemLinkProps = {
  /**
   * Sidebar menu link element.
   *
   * @type TSidebarMenuItem
   * @default undefined
   * @required
   */
  item: TSidebarMenuItem;
};
