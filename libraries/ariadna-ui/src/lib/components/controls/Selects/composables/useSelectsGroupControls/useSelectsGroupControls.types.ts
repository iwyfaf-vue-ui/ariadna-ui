/**
 * @description
 * Return type for the `useSelectsGroupControls` composable function.
 * Contains reactive properties and methods for Group Selects components functionality.
 */
export type TUseSelectsGroupControlsReturn = {
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
