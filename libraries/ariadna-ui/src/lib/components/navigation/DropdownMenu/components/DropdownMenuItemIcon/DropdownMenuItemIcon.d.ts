import type { TDropdownMenuItem } from '../../types/DropdownMenu.types';

/**
 * Component props definition.
 */
export type TDropdownMenuItemIconProps = {
  /**
   * Menu item icon: CSS-class string or Vue component.
   *
   * @type {string | Component}
   * @required
   * @example icon="pi pi-home"
   */
  icon: TDropdownMenuItem['icon'];
};
