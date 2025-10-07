import type { TSharedMenu } from '../../../../../types/component';

/**
 * Represents a single menu item in the mobile menu component.
 *
 * @remarks
 * This type defines the structure and behavior of a menu item, including label, unique key, optional icon, nested
 * sub-items, loading state, and an optional command callback triggered on click.
 *
 * @example
 * const menuItem: TMobileMenuItem = {
 *   label: 'Home',
 *   key: 'home',
 *   icon: 'home-icon',
 *   items: [],
 *   loading: false,
 *   command: (event) => {
 *     console.log('Home clicked', event);
 *   },
 * };
 */
export type TMobileMenuItem = {
  /**
   * Label of menu item.
   *
   * @type string
   * @required
   */
  label: string;

  /**
   * Unique identifier for the menu item.
   *
   * @type string
   * @required
   */
  key: string;

  /**
   * Icon of menu item.
   *
   * @type {string | null}
   */
  icon?: string | null;

  /**
   * Additional CSS class
   *
   * @type string
   * @required
   */
  class?: string;

  /**
   * Nested menu items for submenus
   *
   * @type {Array<TSharedMenu>}
   */
  items: Array<TSharedMenu>;

  /**
   * Indicates whether the menu item is in a loading state.
   *
   * @type boolean
   */
  loading: boolean;

  /**
   * Callback function executed when the menu item is clicked.
   *
   * @type {(event: TMobileMenuItemCommandEvent) => void}
   */
  command?: (event: TMobileMenuItemCommandEvent) => void;
};

/**
 * Represents the event object for commands triggered on a mobile menu item.
 *
 * @remarks
 * This interface provides access to the current and previous menu items, the open state, and various control methods
 * to manipulate the mobile menu's behavior.
 */
export type TMobileMenuItemCommandEvent = {
  /**
   * Current clicked menu item.
   */
  menuItem: TMobileMenuItem;

  /**
   * Previous clicked menu item.
   */
  previousMenuItem: TMobileMenuItem | null;

  /**
   * Opened state
   */
  opened: boolean;

  /**
   * Close a mobile menu.
   */
  close: () => void;

  /**
   * Open a mobile menu.
   */
  open: () => void;

  /**
   * Toggle a mobile menu.
   */
  toggle: () => void;

  /**
   * Action back through menu.
   */
  back: () => void;

  /**
   * Return to the main screen of the current menu.
   */
  home: () => void;

  /**
   * Adds the current menu to the stack, thereby allowing you to switch back using the back button.
   */
  addToStack: () => void;

  /**
   * Clear a history of pages.
   */
  clearStack: () => void;

  /**
   * Override default behavior.
   */
  preventDefault: () => void;
};

/**
 * Represents a single item in the mobile menu page stack.
 *
 * @remarks
 * This type is used to track the current state of the menu navigation, including the current item, previous item, and
 * the depth level in the menu hierarchy.
 */
export type TMobileMenuPageStackItem = {
  /**
   * The renderable menu item component or data.
   */
  item?: TSharedMenu;

  /**
   * The current active menu item in the stack.
   */
  menuItem?: TMobileMenuItem | null;

  /**
   * The previous menu item before the current one.
   */
  prevMenuItem?: TMobileMenuItem | null;

  /**
   * The depth level of this item in the menu hierarchy.
   */
  level: number;
};
