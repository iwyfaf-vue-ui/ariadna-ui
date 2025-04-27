import type { TSidebarMenuItem } from '../../types/SidebarMenu.item';

/**
 * @description Component props definition.
 */
export type TSidebarMenuItemBadgeProps = {
  /**
   * @description Menu item action badge string or Vue component.
   * @default undefined
   * @required
   */
  badge: TSidebarMenuItem['badge'];
};
