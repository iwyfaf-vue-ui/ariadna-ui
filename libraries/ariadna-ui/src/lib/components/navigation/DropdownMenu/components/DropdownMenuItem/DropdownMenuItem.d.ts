import type { TDropdownMenuItem } from '../../types/DropdownMenu.types';

/**
 * Component props definition.
 */
export type TDropdownMenuItemProps = {
  /**
   * The menu item data object.
   *
   * @type TDropdownMenuItem
   * @required
   */
  item: TDropdownMenuItem;

  /**
   * Nesting level of this item (1 = root level).
   *
   * @type number
   * @default 1
   */
  level?: number;
};
