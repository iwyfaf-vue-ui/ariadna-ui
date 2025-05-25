import type { ComputedRef } from 'vue';

/**
 * @description
 * Return type for the `useCheckbox` composable function.
 * Contains reactive properties and methods for Checkbox component functionality.
 */
export type TUseCheckboxReturn = {
  /**
   * Computed unique identifier for the component instance.
   */
  uniqueID: ComputedRef<string>;

  /**
   * Reactive computed property generating CSS class string based on component props (modifier, size, states, etc.).
   */
  componentClasses: ComputedRef<string>;

  /**
   * Toggles the model value of the Radio component.
   */
  toggleModel: () => void;

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

  /**
   * Handler for the start of the expand transition.
   *
   * @param el Element being expanded
   */
  onExpandEnter: (el: Element) => void;

  /**
   * Handler for after the expand transition has completed.
   *
   * @param el Element that finished expanding
   */
  onExpandAfterEnter: (el: Element) => void;

  /**
   * Handler for before the collapse transition starts.
   *
   * @param el Element being collapsed
   */
  onExpandBeforeLeave: (el: Element) => void;
};
