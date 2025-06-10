import type {
  ClassComponent,
  GlobalComponentConstructor,
  TSharedMenu,
} from '../../../../types/component';
export type { TSharedMenu } from '../../../../types/component';
import type { VNode } from 'vue';
import type { TDesktopMenuPropsExpandMode } from './types/DesktopMenu.types';

/**
 * Component props definition.
 */
export type TDesktopMenuProps = {
  /**
   * Menu data.
   *
   * @type Array<TSharedMenu>
   * @default []
   * @example :data="menu"
   */
  data: Array<TSharedMenu>;

  /**
   * Expand context menu's mode.
   *
   * @type TDesktopMenuPropsExpandMode
   * @default {@link EDesktopMenuPropsDefault.EXPAND_MODE}
   * @example :expand-mode="click"
   */
  expandMode?: TDesktopMenuPropsExpandMode;

  /**
   * The number of visible items for the third menu level. If the value is 0, all elements will be visible.
   *
   * @type number
   * @default 0
   * @example :visible-items="5"
   */
  visibleItems?: number;

  /**
   * Show overlay element.
   *
   * @type boolean
   * @default true
   * @example :overlay="false"
   */
  overlay?: boolean;

  /**
   * Component invalid state.
   *
   * @type boolean
   * @default false
   * @example :invalid="true"
   */
  invalid?: boolean;

  /**
   * Redefines the CSS class of the root element and its descendants.
   *
   * @type string
   * @default {@link EDesktopMenuPropsDefault.CSS_CLASS}
   * @example css-class="example"
   */
  cssClass?: string;
};

/**
 * Component slots definition.
 */
export type TDesktopMenuSlots = {
  /**
   * Slot for rendering rubricator (first level) items.
   *
   * @param {Array<TSharedMenu>} props.data - An array of menu items to display.
   * @param {(uniqKey: TSharedMenu) => void} props.secondLevelVisibleHandler - Callback to toggle visibility of second-level menus.
   * @param {TSharedMenu | null} props.activeMenu - The currently active shared menu item or null if none.
   *
   * @returns {VNode[]}
   */
  rubricator?(props: {
    data: Array<TSharedMenu>;
    secondLevelVisibleHandler: (uniqKey: TSharedMenu) => void;
    activeMenu: TSharedMenu | null;
  }): VNode[];

  /**
   * Slot for rendering contextual menu items with advanced controls.
   *
   * @param {Array<TSharedMenu>} props.data - An array of menu items to display.
   * @param {Map<Array<TSharedMenu> | undefined, boolean>} props.mapShowMoreState - A map tracking the "show more" state for menu groups.
   * @param {(uniqKey: Array<TSharedMenu>) => void} props.showMoreHandler - Callback to toggle "show more" state for a group of menu items.
   * @param {(idx: number, children: Array<TSharedMenu>) => boolean} props.isMenuElementHidden - Function to determine if a menu element should be hidden based on index and children.
   *
   * @returns {VNode[]}
   */
  menu?(props: {
    data: TSharedMenu;
    mapShowMoreState: Map<Array<TSharedMenu> | undefined, boolean>;
    showMoreHandler: (uniqKey: Array<TSharedMenu>) => void;
    isMenuElementHidden: (idx: number, children: Array<TSharedMenu>) => boolean;
  }): VNode[];

  /**
   * Slot to render loading state.
   *
   * @returns {VNode[]}
   */
  loading?: () => VNode[];

  /**
   * Slot to render error state.
   *
   * @returns {VNode[]}
   */
  error?: () => VNode[];
};

/**
 * Component emits definition.
 */
export type TDesktopMenuEmits = {
  /**
   * Emitted when component is mounted.
   *
   * @param {"mounted"} e - The event name.
   */
  (e: 'mounted'): void;

  /**
   * Emitted when user click on overlay.
   *
   * @param {"click:overlay"} e - The event name.
   */
  (e: 'click:overlay'): void;
};

/**
 * Ariadna UI | Components | DesktopMenu
 *
 * DesktopMenu is a big menu component for desktop.
 */
declare class DesktopMenu extends ClassComponent<
  TDesktopMenuProps,
  TDesktopMenuSlots,
  TDesktopMenuEmits,
  HTMLDivElement
> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    DesktopMenu: GlobalComponentConstructor<DesktopMenu>;
  }
}

export default DesktopMenu;
