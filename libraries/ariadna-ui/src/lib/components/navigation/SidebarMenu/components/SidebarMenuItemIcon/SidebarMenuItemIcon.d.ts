import type { TSidebarMenuItem } from '../../types/SidebarMenu.item';

/**
 * Component props definition.
 */
export type TSidebarMenuItemIconProps = {
  /**
   * Menu item icon string or Vue component.
   *
   * @default undefined
   * @required
   */
  icon: TSidebarMenuItem['icon'];
};
