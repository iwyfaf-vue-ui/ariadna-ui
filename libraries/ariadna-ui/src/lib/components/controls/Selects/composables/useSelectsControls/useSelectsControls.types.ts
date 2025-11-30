/**
 * @description
 * Return type for the `useSelectsControls` composable function.
 * Contains reactive properties and methods for SingleSelects components functionality.
 */
export type TUseSelectsControlsReturn = {
  /**
   * Handles keyboard events for "ArrowDown" and "ArrowUp" keys within the select component.
   *
   * @param {KeyboardEvent} event - The keyboard event triggered by user interaction.
   */
  onKeyDownOrUpHandler: (event: KeyboardEvent) => void;

  /**
   * Handles keyboard events for "Space" or "Enter" keys to select or activate options.
   */
  onKeySpaceOrEnterHandler: () => void;
};
