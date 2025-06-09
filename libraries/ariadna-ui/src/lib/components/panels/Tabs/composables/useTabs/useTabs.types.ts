import type { ComputedRef, Ref } from 'vue';

/**
 * @description
 * Return type for the `useTabs` composable function.
 * Contains reactive properties and methods for Tabs component functionality.
 */
export type TUseTabsReturn = {
  /**
   * Reactive computed property generating CSS class string based on component props (modifier, size, states, etc.).
   */
  componentClasses: ComputedRef<string>;

  /**
   * This reactive reference holds the key of the active tab in a tabs component. It is used to track and update the
   * active tab state reactively.
   */
  activeTabKey: Ref<string, string>;

  /**
   * Function to switch the active tab to the tab identified by the given key.
   *
   * @param {string} key - The unique identifier of the tab to switch to.
   */
  switchTab: (key: string) => void;

  /**
   * Function to switch the active tab to the next tab in the sequence.
   */
  nextTab: () => void;

  /**
   * Function to switch the active tab to the previous tab in the sequence.
   */
  prevTab: () => void;
};
