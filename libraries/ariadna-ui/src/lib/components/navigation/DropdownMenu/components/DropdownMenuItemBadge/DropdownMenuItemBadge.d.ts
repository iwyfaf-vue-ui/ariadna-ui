import type { TDropdownMenuItem } from '../../types/DropdownMenu.types';

/**
 * Component props definition.
 */
export type TDropdownMenuItemBadgeProps = {
  /**
   * Menu item badge: plain text, number or Vue component.
   *
   * @type {string | number | Component}
   * @required
   * @example :badge="3"
   */
  badge: TDropdownMenuItem['badge'];
};
