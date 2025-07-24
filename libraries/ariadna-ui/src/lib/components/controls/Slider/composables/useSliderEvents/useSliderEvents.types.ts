/**
 * @description
 * Return type for the `useSliderEvents` composable function.
 * Contains reactive properties and methods for Slider component functionality.
 */
export type TUseSliderEventsReturn = {
  /**
   * Handles pointer down events on the slider.
   * @param {number} clientX - The horizontal coordinate of the pointer event relative to the viewport.
   */
  onSliderPointerDown(clientX: number): void;

  /**
   * Handles mouse down events on the slider.
   * @param {MouseEvent} event - The native MouseEvent triggered by the user interaction.
   */
  onSliderMouseDown(event: MouseEvent): void;

  /**
   * Handles touch start events on the slider.
   * @param {TouchEvent} event - The native TouchEvent triggered by the user interaction.
   */
  onSliderTouchStart(event: TouchEvent): void;

  /**
   * Handles pointer move events on the slider.
   * @param {number} clientX - The horizontal coordinate of the pointer event relative to the viewport.
   */
  onSliderPointerMove(clientX: number): void;

  /**
   * Handles pointer up events on the slider.
   * @param {number} clientX - The horizontal coordinate of the pointer event relative to the viewport.
   */
  onSliderPointerUp(clientX: number): void;
};
