/**
 * @description
 * Return type for the `useInputNumberHandlers` composable function.
 * Contains reactive properties and methods for InputNumber component functionality.
 */
export type TUseInputNumberHandlersReturn = {
  /**
   * Handles the input event for the InputNumber component, typically used to process and validate user input.
   *
   * @param {Event} event  - The input event triggered by the user.
   */
  inputHandler: (event: Event) => void;

  /**
   * Handles both keydown and keyup events for the InputNumber component.
   *
   * @param {KeyboardEvent} event - The keyboard event triggered by the user.
   */
  onKeyDownOrUpHandler: (event: KeyboardEvent) => void;

  /**
   * Initiates the calculation process, such as incrementing or decrementing the input value.
   *
   * @param {boolean} increment - If true, starts incrementing; if false, starts decrementing.
   */
  startCalculation: (increment: boolean) => void;

  /**
   * Stops the ongoing calculation process, such as halting auto-increment or auto-decrement.
   */
  stopCalculation: () => void;
};
