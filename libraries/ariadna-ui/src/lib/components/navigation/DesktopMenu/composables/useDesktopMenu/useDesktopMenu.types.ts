import type { ComputedRef, Ref } from 'vue';
import type { TSharedMenu } from '@/types/component';

/**
 * @description
 * Return type for the `useDesktopMenu` composable function.
 * Contains reactive properties and methods for DesktopMenu component functionality.
 */
export type TDesktopMenuReturn = {
  /**
   * Reactive reference to a Map that tracks the "show more" state for menu groups. The key is an array of shared menu
   * items or undefined, and the value is a boolean indicating visibility.
   */
  mapShowMoreState: Ref<Map<TSharedMenu[] | undefined, boolean>>;

  /**
   * Reactive reference to the currently active menu item.
   */
  activeMenu: Ref<TSharedMenu | null>;

  /**
   * Computed boolean indicating whether menu data exists.
   */
  isDataExist: ComputedRef<boolean>;

  /**
   * Reactive computed property generating CSS class string based on component props (modifier, size, states, etc.).
   */
  componentClasses: ComputedRef<string>;

  /**
   * Computed function that determines if a menu element at a given index with children should be hidden.
   *
   * @param idx - The index of the menu element.
   * @param children - The array of child menu items.
   */
  isMenuElementHidden: ComputedRef<(idx: number, children: TSharedMenu[]) => boolean>;

  /**
   * Computed event type that triggers menu interactions, either 'click' or 'mouseover'.
   */
  eventType: ComputedRef<'click' | 'mouseover'>;

  /**
   * Handler to toggle visibility of the second-level menu based on the provided menu data.
   *
   * @param {TSharedMenu} data - The shared menu item to toggle visibility for.
   */
  secondLevelVisibleHandler: (data: TSharedMenu) => void;

  /**
   * Handler to toggle the "show more" state for a unique key representing children menu items.
   *
   * @param {TSharedMenu["children"]} uniqKey - The unique key corresponding to children menu items.
   */
  showMoreHandler: (uniqKey: TSharedMenu['children']) => void;

  /**
   * Handler invoked when the overlay is clicked, typically to close menus or reset states.
   */
  onOverlayClick: () => void;
};
