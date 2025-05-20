import type { ClassComponent, GlobalComponentConstructor } from '../../../../types/component';
import type { VNode } from 'vue';
import type { ESidebarMenuPropsDefault } from './types/SidebarMenu.enums';
export type { TSidebarMenuItem } from './types/SidebarMenu.item';

/**
 * Component props definition.
 */
export type TSidebarMenuProps = {
  /**
   * An array of SidebarMenu elements.
   *
   * @type Array<TSidebarMenuItem>
   * @required
   * @example :data="data"
   */
  data: Array<TSidebarMenuItem>;

  /**
   * SidebarMenu collapsed state.
   *
   * @type boolean
   * @default false
   * @example :collapsed="true"
   */
  collapsed?: boolean;

  /**
   * Tell the SidebarMenu that he needs to remember the expand state for each menu item on its own.
   *
   * @type boolean
   * @default false
   * @example :remember-expanded="true"
   */
  rememberExpanded?: boolean;

  /**
   * Redefines the CSS class of the root element and its descendants.
   *
   * @type string
   * @default {@link ESidebarMenuPropsDefault.CSS_CLASS}
   * @example css-class="example"
   */
  cssClass?: string;
};

/**
 * Component slots definition.
 */
export type TSidebarMenuSlots = {
  /**
   * Header SidebarMenu slot.
   *
   * @returns {VNode[]}
   */
  header?(): VNode[];

  /**
   * Footer SidebarMenu slot.
   *
   * @returns {VNode[]}
   */
  footer?(): VNode[];

  /**
   * Dropdown icon element slot.
   *
   * @param {boolean} props.isOpen - Menu element open state.
   * @returns {VNode[]}
   */
  dropdownIcon?(props: { isOpen: boolean }): VNode[];
};

/**
 * Component events emitted.
 */
export type TSidebarMenuEmits = {
  /**
   * Emit a change for the collapsed state.
   *
   * @param {"update:collapsed"} e
   * @param {boolean} collapsed - Collapsed state.
   */
  (e: 'update:collapsed', collapsed: boolean): void;
};

/**
 * Ariadna UI | Components | Navigation
 *
 * Sidebar menu displays a list of navigation elements in vertical orientation.
 */
declare class SidebarMenu extends ClassComponent<
  TSidebarMenuProps,
  TSidebarMenuSlots,
  TSidebarMenuEmits,
  HTMLElement
> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    SidebarMenu: GlobalComponentConstructor<SidebarMenu>;
  }
}

export default SidebarMenu;
