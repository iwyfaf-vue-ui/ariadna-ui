import type { ClassComponent, GlobalComponentConstructor } from '../../../../types/component';
import type { VNode } from 'vue';
import type { TDropdownMenuItem, TDropdownMenuPropsExpandMode } from './types/DropdownMenu.types';

export type { TDropdownMenuItem } from './types/DropdownMenu.types';
export type { TDropdownMenuPropsExpandMode } from './types/DropdownMenu.types';

/**
 * Component props definition.
 */
export type TDropdownMenuProps = {
  /**
   * Array of menu items.
   *
   * @type Array<TDropdownMenuItem>
   * @required
   * @example :data="items"
   */
  data: Array<TDropdownMenuItem>;

  /**
   * Sub-menu expand mode.
   *
   * @type TDropdownMenuPropsExpandMode
   * @default 'click'
   * @example expand-mode="hover"
   */
  expandMode?: TDropdownMenuPropsExpandMode;

  /**
   * Close the menu when the user clicks outside of it.
   *
   * @type boolean
   * @default true
   * @example :close-on-click-outside="false"
   */
  closeOnClickOutside?: boolean;

  /**
   * Close the menu when the user presses the Escape key.
   *
   * @type boolean
   * @default true
   * @example :close-on-escape="false"
   */
  closeOnEscape?: boolean;

  /**
   * Prevents the menu from opening.
   *
   * @type boolean
   * @default false
   * @example :disabled="true"
   */
  disabled?: boolean;

  /**
   * Redefines the CSS class of the root element and all descendants.
   *
   * @type string
   * @default 'ar-dropdown-menu'
   * @example css-class="my-menu"
   */
  cssClass?: string;
};

/**
 * Component slots definition.
 */
export type TDropdownMenuSlots = {
  /**
   * Trigger element that opens the menu.
   * Receives the current open state and control functions.
   *
   * @param {boolean} props.opened - Whether the menu is currently open.
   * @param {() => void} props.open - Opens the menu.
   * @param {() => void} props.close - Closes the menu.
   * @param {() => void} props.toggle - Toggles the menu.
   * @returns {VNode[]}
   * @required
   */
  activator(props: {
    opened: boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;
  }): VNode[];

  /**
   * Custom render for a single menu item.
   * When provided, replaces the default item rendering for every item in the tree.
   *
   * @param {TDropdownMenuItem} props.item - The menu item data.
   * @param {number} props.level - Nesting level (1 = root).
   * @param {() => void} props.close - Closes the root menu.
   * @returns {VNode[]}
   */
  item?(props: { item: TDropdownMenuItem; level: number; close: () => void }): VNode[];
};

/**
 * Component emits definition.
 */
export type TDropdownMenuEmits = {
  /**
   * Emitted when the menu opens.
   *
   * @param {"show"} e - The event name.
   */
  (e: 'show'): void;

  /**
   * Emitted when the menu closes.
   *
   * @param {"hide"} e - The event name.
   */
  (e: 'hide'): void;

  /**
   * Emitted when a menu item is clicked (including nested items).
   * Not emitted for separators or disabled items.
   *
   * @param {"item-click"} e - The event name.
   * @param {TDropdownMenuItem} payload - The clicked menu item.
   */
  (e: 'item-click', payload: TDropdownMenuItem): void;
};

/**
 * Component exposes definition.
 */
export type TDropdownMenuExposes = {
  /**
   * Programmatically opens the menu.
   */
  open: () => void;

  /**
   * Programmatically closes the menu.
   */
  close: () => void;

  /**
   * Programmatically toggles the menu.
   */
  toggle: () => void;
};

/**
 * Ariadna UI | Components | DropdownMenu
 *
 * A data-driven dropdown menu with support for multi-level nested sub-menus.
 * The trigger element is provided via the `activator` slot.
 */
declare class DropdownMenu
  extends ClassComponent<TDropdownMenuProps, TDropdownMenuSlots, TDropdownMenuEmits, HTMLDivElement>
  implements TDropdownMenuExposes
{
  open: () => void;
  close: () => void;
  toggle: () => void;
}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    DropdownMenu: GlobalComponentConstructor<DropdownMenu>;
  }
}

export default DropdownMenu;
