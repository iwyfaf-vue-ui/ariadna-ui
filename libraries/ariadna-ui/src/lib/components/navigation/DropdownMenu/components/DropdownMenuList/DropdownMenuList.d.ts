import type { TDropdownMenuItem } from '../../types/DropdownMenu.types';

/**
 * Component props definition.
 */
export type TDropdownMenuListProps = {
  /**
   * Array of menu items to render.
   *
   * @type Array<TDropdownMenuItem>
   * @required
   */
  data: Array<TDropdownMenuItem>;

  /**
   * Nesting level of this list (1 = root list).
   *
   * @type number
   * @default 1
   */
  level?: number;
};
