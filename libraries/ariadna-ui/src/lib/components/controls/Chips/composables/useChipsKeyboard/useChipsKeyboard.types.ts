/**
 * @description
 * Return type for the `useChipsKeyboard` composable function.
 * Contains reactive properties and methods for Chips component functionality.
 */
export type TUseChipsKeyboardReturn = {
  /**
   * Event handler for keyboard events on the input element.
   *
   * @param {KeyboardEvent} event - The native keyboard event object
   */
  onInputKeyDown: (event: KeyboardEvent) => void;

  /**
   * Event handler for keyboard events on the root wrapper element.
   *
   * @param {KeyboardEvent} event - The native keyboard event object
   */
  onRootWrapperKeyDown: (event: KeyboardEvent) => void;
};
