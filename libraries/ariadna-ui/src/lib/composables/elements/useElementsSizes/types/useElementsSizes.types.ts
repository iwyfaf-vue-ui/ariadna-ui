import type { Ref } from 'vue';

export type TUseElementsSizes = {
  /**
   * Width of the element in pixels.
   */
  width: number;

  /**
   * Height of the element in pixels.
   */
  height: number;

  /**
   * Scrollable width of the element in pixels.
   */
  scrollWidth: number;

  /**
   * Scrollable height of the element in pixels.
   */
  scrollHeight: number;
};

export type TUseElementsSizesReturn = {
  /**
   * The reactive sizes of the element in pixels.
   */
  sizes: Ref<Array<TUseElementsSizes>>;
};
