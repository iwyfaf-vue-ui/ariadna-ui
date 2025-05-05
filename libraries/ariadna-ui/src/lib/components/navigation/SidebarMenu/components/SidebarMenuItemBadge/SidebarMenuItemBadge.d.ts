import type { TSidebarMenuItem } from '../../types/SidebarMenu.item';

/**
 * Component props definition.
 */
export type TSidebarMenuItemBadgeProps = {
  /**
   * Menu item action badge string or Vue component.
   *
   * @default undefined
   * @required
   */
  badge: TSidebarMenuItem['badge'];
};
