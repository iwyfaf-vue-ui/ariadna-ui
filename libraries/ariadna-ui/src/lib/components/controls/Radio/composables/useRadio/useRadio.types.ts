import type { ComputedRef } from 'vue';

/**
 * @description
 * Return type for the `useRadio` composable function.
 * Contains reactive properties and methods for Textarea component functionality.
 */
export type TUseRadioReturn = {
  /**
   * Computed unique identifier for the component instance.
   */
  uniqueID: ComputedRef<string>;

  /**
   * Reactive computed property generating CSS class string based on component props (modifier, size, states, etc.).
   */
  componentClasses: ComputedRef<string>;

  /**
   * Updates the model value of the Radio component.
   */
  updateModel: () => void;

  /**
   * Handles the focus event on the Radio component.
   *
   * @param event - The focus event object.
   */
  onFocus: (event: Event) => void;

  /**
   * Handles the blur event on the Radio component.
   *
   * @param event - The blur event object.
   */
  onBlur: (event: Event) => void;

  /**
   * Handles the change event on the Radio component.
   *
   * @param event - The change event object.
   */
  onChange: (event: Event) => void;

  /**
   * Handles the mouse over event on the Radio component.
   */
  onMouseOver: () => void;

  /**
   * Handles the mouse leave event on the Radio component.
   */
  onMouseLeave: () => void;
};
