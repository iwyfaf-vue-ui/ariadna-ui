import type { Ref } from 'vue';

export type TUseElementSizeReturn = {
  /**
   * The reactive width of the element in pixels.
   */
  width: Ref<number>;

  /**
   * The reactive scrollable width of the element in pixels.
   */
  scrollWidth: Ref<number>;

  /**
   * The reactive height of the element in pixels.
   */
  height: Ref<number>;

  /**
   * The reactive scrollable height of the element in pixels.
   */
  scrollHeight: Ref<number>;
};
