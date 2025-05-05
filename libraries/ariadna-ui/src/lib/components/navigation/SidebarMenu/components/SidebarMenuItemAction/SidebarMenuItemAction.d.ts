import type { TSidebarMenuItem } from '../../types/SidebarMenu.item';

/**
 * Component props definition.
 */
export type TSidebarMenuItemActionProps = {
  /**
   * Menu item action callback function.
   *
   * @default undefined
   * @required
   */
  action: TSidebarMenuItem['action'];

  /**
   * Menu item action icon string or Vue component.
   *
   * @default '...'
   */
  actionIcon?: TSidebarMenuItem['actionIcon'];
};
