import type { TTabItem } from '../../types/Tabs.types';

/**
 * Represents the core keys structure used for managing tab keys and updating tabs.
 */
export type TKeysCore = {
  /**
   * An array of string keys representing the tabs.
   */
  keys: Array<string>;

  /**
   * Updates the tabs with a new array of tab items.
   *
   * @param {Array<TTabItem>} tabs
   */
  updateTabs(tabs: Array<TTabItem>): void;
};
