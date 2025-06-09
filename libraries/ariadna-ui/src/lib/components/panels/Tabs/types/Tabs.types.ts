/**
 * Represents a tab item with dynamic properties. Each tab item can have any number of properties with keys as strings
 * and values of any type.
 */
export type TTabItem = {
  [key: string]: any;
};

/**
 * Represents the slot properties for a Label in Tabs component.
 *
 * @template T - The type of the item.
 */
export type TTabsSlotsLabel<T = any> = {
  /**
   * The item associated with the label.
   */
  item: T;

  /**
   * Indicates whether the tab is currently selected.
   */
  selected: boolean;
};

/**
 * Represents the default slot properties in Tabs component.
 *
 * @template T - The type of the item.
 */
export type TTabsSlotsDefault<T = any> = {
  /**
   * The item associated with the default slot.
   */
  item: T;
};

/**
 * Represents the payload emitted when a tab change event occurs.
 */
export type TTabsEmitsChange = {
  /**
   *  The unique key identifying the selected tab.
   */
  key: string;

  /**
   * The tab item object corresponding to the selected tab.
   */
  tab: TTabItem;
};
