import type { ComputedRef, Ref } from 'vue';
import type { TSidebarMenuItem } from '../../types/SidebarMenu.item';

/**
 * Return type for the `useSidebarMenuItem` composable function.
 */
export type TUseSidebarMenuItemReturn = {
  /**
   * CSS class name for the sidebar menu, injected from the provider.
   */
  cssClass: string | undefined;

  /**
   * Reactive ref isOpen whether the menu item is expanded (open).
   */
  isOpen: Ref<boolean, boolean>;

  /**
   * Reactive ref indicating whether the menu item is currently hovered.
   */
  isHover: Ref<boolean, boolean>;

  /**
   * Computed property indicating whether the menu item should be hidden.
   */
  isHidden: ComputedRef<boolean>;

  /**
   * Computed property returning a function to determine if a menu item is active.
   */
  isMenuItemActiveComputed: ComputedRef<(item: TSidebarMenuItem) => boolean>;

  /**
   * Computed property indicating whether the menu item has child items.
   */
  hasChildren: ComputedRef<boolean>;

  /**
   * Computed property returning the array of child menu items.
   */
  children: ComputedRef<TSidebarMenuItem[]>;

  /**
   * Reactive computed property indicating whether the link is currently active.
   */
  isLinkActive: ComputedRef<boolean>;

  /**
   * Reactive computed property generating CSS class string based on component props (modifier, size, states, etc.).
   */
  componentClasses: ComputedRef<string>;

  /**
   * Handler for mouse enter event on the menu item.
   *
   * @param event MouseEvent
   */
  onMouseEnter: (event: MouseEvent) => void;

  /**
   * Handler for mouse leave event on the menu item.
   *
   * @param event MouseEvent
   */
  onMouseLeave: (event: MouseEvent) => void;

  /**
   * Handler for toggling the expanded state of the menu item.
   *
   * @param event MouseEvent
   */
  onToggle: (event: MouseEvent) => void;

  /**
   * Handler for the start of the expand transition.
   *
   * @param el Element being expanded
   */
  onExpandEnter: (el: Element) => void;

  /**
   * Handler for after the expand transition has completed.
   *
   * @param el Element that finished expanding
   */
  onExpandAfterEnter: (el: Element) => void;

  /**
   * Handler for before the collapse transition starts.
   *
   * @param el Element being collapsed
   */
  onExpandBeforeLeave: (el: Element) => void;
};
