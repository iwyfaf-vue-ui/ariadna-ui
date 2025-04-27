import type { TSidebarMenuItem } from '../../types/SidebarMenu.item';

/**
 * @description Component props definition.
 */
export type TSidebarMenuItemIconProps = {
  /**
   * @description Menu item icon string or Vue component.
   * @default undefined
   * @required
   */
  icon: TSidebarMenuItem['icon'];
};
