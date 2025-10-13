import type { ComputedRef, StyleValue } from 'vue';
import type { TVirtualScrollerItem } from '../../types/VirtualScroller.types';

/**
 * @description
 * Return type for the `useVirtualScroller` composable function.
 * Contains reactive properties and methods for VirtualScroller component functionality.
 */
export type TUseVirtualScrollerReturn<Data> = {
  /**
   * Computed list of normalized items prepared for rendering in the viewport.
   */
  dataList: ComputedRef<Array<TVirtualScrollerItem<Data>>>;

  /**
   * Computes how many items can fit into the current viewport given a container size. Useful to derive capacity during
   * layout or when the container is resized.
   *
   * @param {number} containerSize - The pixel size of the scrollable container along the virtualization axis (width
   * for horizontal, height for vertical).
   *
   * @returns {number} - The integer number of items that can be fully displayed within the viewport.
   */
  getViewCapacity: (containerSize: number) => number;

  /**
   * Recalculates the visible item range based on the current scroll offset, capacity, and overscan settings.
   * Call this after container resize, data mutation, or when external factors affect layout.
   */
  calculateRange: () => void;

  /**
   * Programmatically scrolls the virtual scroller to ensure the item at `index` becomes visible. If the index is out
   * of bounds, it will be clamped to the valid range.
   * @param {number} index
   */
  scrollTo: (index: number) => void;

  /**
   * Computed inline style for the root wrapper element of the virtual scroller. Typically, defines the scrollable area
   * sizing and overflow behavior.
   */
  rootStyle: ComputedRef<StyleValue>;

  /**
   * Computed CSS class string for the root element, derived from component props and state (e.g., size, modifiers,
   * disabled).
   */
  contentStyle: ComputedRef<StyleValue>;

  /**
   * Reactive computed property generating CSS class string based on component props (modifier, size, states, etc.).
   */
  componentClasses: ComputedRef<string>;
};
