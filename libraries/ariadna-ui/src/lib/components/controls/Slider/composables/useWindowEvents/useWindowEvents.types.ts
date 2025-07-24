/**
 * @description
 * Return type for the `useSliderEvents` composable function.
 * Contains reactive properties and methods for Slider component functionality.
 */
export type TUseSliderEventsReturn = {
  /**
   * Handles the mouse move event on the window.
   * @param {MouseEvent} event - The MouseEvent object containing details about the mouse movement.
   */
  onWindowMouseMove: (event: MouseEvent) => void;

  /**
   * Handles the touch move event on the window.
   * @param {TouchEvent} event - The TouchEvent object containing details about the touch movement.
   */
  onWindowTouchMove: (event: TouchEvent) => void;

  /**
   * Handles the mouse up event on the window.
   * @param {MouseEvent} event - The MouseEvent object containing details about the mouse button release.
   */
  onWindowMouseUp: (event: MouseEvent) => void;

  /**
   * Handles the touch end event on the window.
   * @param {TouchEvent} event - The TouchEvent object containing details about the touch end.
   */
  onWindowTouchEnd: (event: TouchEvent) => void;
};
