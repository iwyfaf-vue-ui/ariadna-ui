import type { Component } from 'vue';

/**
 * Expand mode for nested sub-menus.
 */
export type TDropdownMenuPropsExpandMode = 'click' | 'hover';

/**
 * A single item in the dropdown menu.
 */
export type TDropdownMenuItem = {
  /**
   * Display text of the menu item.
   * Not required when `separator: true`.
   */
  label?: string;

  /**
   * Item icon: CSS-class string or Vue component.
   */
  icon?: string | Component;

  /**
   * Navigation URL. Renders `<a>` or `<router-link>` depending on whether the link is external.
   */
  href?: string;

  /**
   * Link target attribute (e.g. `'_blank'`).
   */
  target?: string;

  /**
   * Click handler. Renders `<a>` with an onclick handler.
   */
  action?: () => void;

  /**
   * Badge: plain text, number or Vue component.
   */
  badge?: string | number | Component;

  /**
   * Additional CSS class applied to the item element.
   */
  cssClass?: string;

  /**
   * When true, the item is not interactive.
   */
  disabled?: boolean;

  /**
   * When true, the item is not rendered.
   */
  hidden?: boolean;

  /**
   * When true, renders a visual separator (`<hr>`) instead of a menu item.
   * All other fields are ignored.
   */
  separator?: boolean;

  /**
   * Nested sub-menu items.
   */
  children?: TDropdownMenuItem[];
};
