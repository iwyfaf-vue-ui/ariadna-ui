/**
 * @description
 * Return type for the `useViewerUX` composable function.
 * Contains reactive properties and methods for Viewer component functionality.
 */
export type TUseViewerUXReturn = {
  /**
   * Handles the action when the "Next" button is clicked in the Viewer.
   */
  onClickNext: () => void;

  /**
   * Handles the action when the "Previous" button is clicked in the Viewer.
   */
  onClickPrev: () => void;

  /**
   * Handles the action to close the Viewer when the overlay is clicked.
   */
  closeOnOverlayClick: () => void;

  /**
   * keyboard events for navigation and closing the Viewer.
   *
   * @param {KeyboardEvent} event - The keyboard event triggered by the user.
   */
  onKeyPress: (event: KeyboardEvent) => void;
};
