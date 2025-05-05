import type { Component } from 'vue';

/**
 * SidebarMenu item element.
 */
export type TSidebarMenuItem = {
  /**
   * Menu item title attribute.
   */
  title: string;

  /**
   * Menu item icon string or Vue component.
   */
  icon?: string | Component;

  /**
   * Menu item badge string or Vue component.
   */
  badge?: string | number | Component;

  /**
   * Menu item href attribute.
   */
  href?: string;

  /**
   * Use native `<a>` tag instead router link for menu item.
   */
  native?: boolean;

  /**
   * Menu item hidden state.
   */
  hidden?: boolean;

  /**
   * Menu item  expand state.
   */
  expand?: boolean;

  /**
   * Menu item disabled state.
   */
  disabled?: boolean;

  /**
   * Menu item action callback function.
   */
  action?: () => void;

  /**
   * Menu item action icon string or Vue component.
   */
  actionIcon?: string | Component;

  /**
   * Menu item children.
   */
  children?: Array<TSidebarMenuItem>;
};
