import type { TSidebarMenuItem } from '../../types/SidebarMenu.item';

/**
 * @description Component props definition.
 */
export type TSidebarMenuItemActionProps = {
  /**
   * @description Menu item action callback function.
   * @default undefined
   * @required
   */
  action: TSidebarMenuItem['action'];

  /**
   * @description Menu item action icon string or Vue component.
   * @default '...'
   */
  actionIcon?: TSidebarMenuItem['actionIcon'];
};
