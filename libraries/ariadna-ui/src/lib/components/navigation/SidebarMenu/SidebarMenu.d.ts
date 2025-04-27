import type { ClassComponent, GlobalComponentConstructor } from '../../../../types/component';
import type { VNode } from 'vue';
import type { ESidebarMenuPropsDefault } from './types/SidebarMenu.enums';
export type { TSidebarMenuItem } from './types/SidebarMenu.item';

/**
 * @description Component props definition.
 */
export type TSidebarMenuProps = {
  /**
   * @description An array of SidebarMenu elements.
   *
   * @type Array<TSidebarMenuItem>
   * @required
   */
  data: Array<TSidebarMenuItem>;

  /**
   * @description SidebarMenu collapsed state.
   *
   * @type boolean
   * @default false
   */
  collapsed?: boolean;

  /**
   * @description Tell the SidebarMenu that he needs to remember the expand state for each menu item on its own.
   *
   * @type boolean
   * @default false
   */
  rememberExpanded?: boolean;

  /**
   * @description Redefines the CSS class of the root element and its descendants.
   * @example css-class="example"
   * @default {@link ESidebarMenuPropsDefault.CSS_CLASS}
   */
  cssClass?: string;
};

/**
 * @description Component slots definition.
 */
export type TSidebarMenuSlots = {
  /**
   * @description Header SidebarMenu slot.
   * @returns {VNode[]}
   */
  header?(): VNode[];

  /**
   * @description Footer SidebarMenu slot.
   * @returns {VNode[]}
   */
  footer?(): VNode[];

  /**
   * @description Dropdown icon element slot.
   * @param {boolean} props.isOpen - Menu element open state.
   * @returns {VNode[]}
   */
  dropdownIcon?(props: { isOpen: boolean }): VNode[];
};

/**
 * @description Component events emitted.
 */
export type TSidebarMenuEmits = {
  /**
   * @description Emit a change for the collapsed state.
   * @param {"update:collapsed"} e
   * @param {boolean} collapsed - Collapsed state.
   */
  (e: 'update:collapsed', collapsed: boolean): void;
};

/**
 * Ariadna UI | Components | Navigation
 *
 * @description Sidebar menu displays a list of navigation elements in vertical orientation.
 */
declare class SidebarMenu extends ClassComponent<
  TSidebarMenuProps,
  TSidebarMenuSlots,
  TSidebarMenuEmits,
  HTMLButtonElement
> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    SidebarMenu: GlobalComponentConstructor<SidebarMenu>;
  }
}

export default SidebarMenu;
