import type { EThumbPosition } from '../../types/Slider.enums';

/**
 * @description
 * Return type for the `useThumbEvents` composable function.
 * Contains reactive properties and methods for Slider component functionality.
 */
export type TUseThumbEventsReturn = {
  /**
   * Handles mouse down events on a slider thumb.
   * @param {MouseEvent} event - The touch event triggered by user interaction.
   * @param {number} index - The index of the thumb being interacted with.
   * @param {EThumbPosition} position - The position of the thumb (e.g., start, end).
   */
  onThumbMouseDown: (event: MouseEvent, index: number, position: EThumbPosition) => void;

  /**
   * Handles touch start events on a slider thumb.
   * @param {MouseEvent} event - The touch event triggered by user interaction.
   * @param {number} index - The index of the thumb being interacted with.
   * @param {EThumbPosition} position - The position of the thumb (e.g., start, end).
   */
  onThumbTouchStart: (event: TouchEvent, index: number, position: EThumbPosition) => void;

  /**
   * Handles the pointer move event on a slider thumb.
   * @param {number} clientX - The horizontal coordinate of the pointer in the viewport.
   * @param {number} index - The index of the thumb being moved.
   * @param {EThumbPosition} position - The position of the thumb, represented by the EThumbPosition enum.
   */
  onThumbPointerMove: (clientX: number, index: number, position: EThumbPosition) => void;

  /**
   * Handles the pointer up event on a slider thumb.
   * @param {number} clientX - The horizontal coordinate of the pointer in the viewport at the time of release.
   * @param {number} index - The index of the thumb being released.
   * @param {EThumbPosition} position - The position of the thumb, represented by the EThumbPosition enum.
   */
  onThumbPointerUp: (clientX: number, index: number, position: EThumbPosition) => void;
};
