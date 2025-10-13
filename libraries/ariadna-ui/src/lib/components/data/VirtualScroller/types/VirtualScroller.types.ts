/**
 * Represents an item in a VirtualScroller component with its associated data and index.
 *
 * @template Data - The type of data contained in the VirtualScroller component item.
 */
export type TVirtualScrollerItem<Data> = {
  /**
   * The actual data content of the VirtualScroller component item.
   */
  data: Data;

  /**
   * The index position of the item in the VirtualScroller component.
   */
  index: number;
};

/**
 * Represents the range of visible indexes in a VirtualScroller component.
 */
export type TVirtualScrollerIndexes = {
  /**
   * The starting index of the visible range.
   */
  start: number;

  /**
   * The ending index of the visible range.
   */
  end: number;
};
