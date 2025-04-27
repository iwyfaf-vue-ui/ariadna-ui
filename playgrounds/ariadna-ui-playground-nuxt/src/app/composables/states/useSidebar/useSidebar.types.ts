/**
 * Represents the return type of the `useSidebar` composable, providing state and actions for managing the sidebar
 * states.
 */
export type TUseSidebarReturn = {
  /**
   * A reactive reference indicating whether the sidebar is collapsed.
   */
  sidebarCollapsed: Ref<boolean, boolean>;

  /**
   * Toggles the collapsed state of the sidebar.
   */
  sidebarCollapsedHandler: () => void;
};

/**
 * @description
 * Enum representing the keys used for managing the sidebar state and its persistence.
 * These keys are typically used for referencing the sidebar's collapsed state in the application state
 * and for storing/retrieving the sidebar state in cookies or other storage mechanisms.
 */
export enum EUseSidebar {
  /**
   * Key used to reference the sidebar's collapsed state in the application state.
   * @type {EUseSidebar.USE_SIDEBAR_STATE}
   */
  USE_SIDEBAR_STATE = 'sidebarCollapsed',

  /**
   * Key used to store or retrieve the sidebar's collapsed state in cookies.
   * @type {EUseSidebar.USE_SIDEBAR_COOKIE}
   */
  USE_SIDEBAR_COOKIE = 'sidebar_collapsed',
}
