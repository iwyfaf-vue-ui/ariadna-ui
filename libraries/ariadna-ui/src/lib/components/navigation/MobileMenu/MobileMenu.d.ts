import type {
  ClassComponent,
  GlobalComponentConstructor,
  TSharedMenu,
} from '../../../../types/component';
import type { VNode } from 'vue';
import type { TMobileMenuItem, TMobileMenuItemCommandEvent } from './types/MobileMenu.types';
export type { TSharedMenu } from '../../../../types/component';
export type { TMobileMenuItem, TMobileMenuItemCommandEvent } from './types/MobileMenu.types';

/**
 * Component props definition.
 */
export type TMobileMenuProps = {
  /**
   * @description Menu tabs in navbar.
   *
   * @type {Array<TMobileMenuItem>}
   * @example :menu="menu"
   */
  menu: Array<TMobileMenuItem>;

  /**
   * Animation time in ms.
   *
   * @type number
   * @default 300
   * @example :animation-time="300"
   */
  animationTime?: number;

  /**
   * Redefines the CSS class of the root element and its descendants.
   *
   * @type string
   * @default {@link EMobileMenuPropsDefault.CSS_CLASS}
   * @example css-class="example"
   */
  cssClass?: string;

  /**
   * aria-label attribute for `<nav>` tag.
   *
   * @type string
   * @default undefined
   * @example aria-label="Mobile menu"
   */
  ariaLabel?: string;
};

/**
 * Component slots definition.
 */
export type TMobileMenuSlots = {
  /**
   * Slot for rendering a single menu navbar item.
   *
   * @param {TMobileMenuItem} props.item - The menu navbar item data.
   * @param {boolean} props.opened - Whether the menu navbar item is currently opened.
   * @returns {VNode[]}
   */
  navbarItem?(props: { item: TMobileMenuItem; opened: boolean }): VNode[];

  /**
   * Slot for rendering the entire menu content.
   *
   * @param {TMobileMenuItem} props.currentMenuItem - The currently active menu item.
   * @param {Array<TMobileMenuItem>} props.menu - The full array of menu items.
   * @param {boolean} props.opened - Whether the menu is opened.
   * @param {(item: TSharedMenu) => void} props.onClick - Callback invoked when a menu item is clicked.
   * @returns {VNode[]}
   */
  allContent?(props: {
    currentMenuItem: TMobileMenuItem;
    menu: Array<TMobileMenuItem>;
    opened: boolean;
    onClick: (item: TSharedMenu) => void;
  }): VNode[];

  /**
   * Slot for rendering the title in the page stack.
   *
   * @param {TSharedMenu} props.item - The menu item for the title.
   * @param {number} props.level - The depth level in the page stack.
   * @param {boolean} props.opened - Whether the menu is opened.
   * @returns {VNode[]}
   */
  pageStackTitle?(props: { item: TSharedMenu; level: number; opened: boolean }): VNode[];

  /**
   * Slot for rendering an icon before the item label.
   *
   * @param {string} props.icon - The icon name.
   * @param {boolean} props.opened - Whether the menu item is opened.
   * @returns {VNode[]}
   */
  itemBeforeIcon?(props: { icon: string; opened: boolean }): VNode[];

  /**
   * Slot for rendering an icon after the item label.
   *
   * @param {string} props.icon - The icon name.
   * @param {boolean} props.opened - Whether the menu item is opened.
   * @returns {VNode[]}
   */
  itemAfterIcon?(props: { icon: string; opened: boolean }): VNode[];

  /**
   * Slot for rendering the label of a menu item.
   *
   * @param {string} props.label - The text label of the menu item.
   * @param {boolean} props.opened - Whether the menu item is opened.
   * @returns {VNode[]}
   */
  itemLabel?(props: { label: string; opened: boolean }): VNode[];

  /**
   * Slot for rendering a generic menu item.
   *
   * @param {TSharedMenu} props.item - The menu item data.
   * @param {boolean} props.opened - Whether the menu item is opened.
   * @returns {VNode[]}
   */
  item?(props: { item: TSharedMenu; opened: boolean }): VNode[];

  /**
   * Slot for rendering the back icon.
   *
   * @param {TMobileMenuItemCommandEvent['back']} props.back - The back command event handler.
   * @param {boolean} props.opened - Whether the menu item is opened.
   * @returns {VNode[]}
   */
  backIcon?(props: { back: TMobileMenuItemCommandEvent['back']; opened: boolean }): VNode[];

  /**
   * Slot for rendering the close icon.
   *
   * @param {TMobileMenuItemCommandEvent['back']} props.back - The close command event handler.
   * @param {boolean} props.opened - Whether the menu item is opened.
   * @returns {VNode[]}
   */
  closeIcon?(props: { close: TMobileMenuItemCommandEvent['close']; opened: boolean }): VNode[];

  /**
   * Slot for rendering the header label.
   *
   * @param {boolean} props.opened - Whether the menu is opened.
   * @param {TMobileMenuItem | null} props.item - The current menu item or null.
   * @returns {VNode[]}
   */
  headerLabel?(props: { opened: boolean; item: TMobileMenuItem | null }): VNode[];

  /**
   * Slot for rendering the full header including label and icons.
   *
   * @param {boolean} props.opened - Whether the menu is opened.
   * @param {string} props.label - The header label text.
   * @param {TMobileMenuItemCommandEvent['back']} props.back - The back command event handler.
   * @param {TMobileMenuItemCommandEvent['close']} props.close - The close command event handler.
   * @returns {VNode[]}
   */
  fullHeader?(props: {
    opened: boolean;
    label: string;
    back: TMobileMenuItemCommandEvent['back'];
    close: TMobileMenuItemCommandEvent['close'];
    backVisible: boolean;
  }): VNode[];

  /**
   * Slot for rendering a loading state.
   *
   * @param {boolean} props.opened - Whether the menu is opened.
   * @param {TMobileMenuItem} props.item - The current menu item.
   * @returns {VNode[]}
   */
  loading?(props: { opened: boolean; item: TMobileMenuItem }): VNode[];

  /**
   * Additional custom slots with specific props. Used instead of allContent slot. You can use key menu item as slot
   * name to edit its contents. Prefix - page-${menu.key}
   *
   * @param {TMobileMenuItem} props.item - The menu item data.
   * @param {boolean} props.opened - Whether the menu is opened.
   * @param {(item: TSharedMenu) => void} props.onClick - Callback invoked when a menu item is clicked.
   */
  [key: string]: (props: {
    item: TMobileMenuItem;
    opened: boolean;
    onClick: (item: TSharedMenu) => void;
  }) => VNode[];
};

/**
 * Component emits definition.
 */
export type TMobileMenuEmits = {
  /**
   * Emitted when menu is opened.
   *
   * @param {"open"} e - The event name.
   */
  (e: 'open'): void;

  /**
   * Emitted when menu is closed.
   *
   * @param {"close"} e - The event name.
   */
  (e: 'close'): void;
};

/**
 * Ariadna UI | Components | MobileMenu
 *
 * MobileMenu is a component for displaying a mobile navigation menu with support for nested items and animation of
 * transitions between levels.
 */
declare class MobileMenu extends ClassComponent<
  TMobileMenuProps,
  TMobileMenuSlots,
  TMobileMenuEmits,
  HTMLDivElement
> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    MobileMenu: GlobalComponentConstructor<MobileMenu>;
  }
}

export default MobileMenu;
