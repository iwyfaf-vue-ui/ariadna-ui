import type { ComputedRef, Ref } from 'vue';

/**
 * @description
 * Return type for the `useAccordionItem` composable function.
 * Contains reactive properties and methods for AccordionItem component functionality.
 */
export type TUseAccordionItemReturn = {
  /**
   * Unique identifier for the accordion item.
   */

  id: string;
  /**
   * Reactive computed property generating CSS class string based on component props (modifier, size, states, etc.).
   */
  componentClasses: ComputedRef<string>;

  /**
   * Reactive computed property indicating whether the accordion item is disabled.
   */
  disabledState: ComputedRef<boolean | undefined>;

  /**
   * Reactive reference tracking whether the accordion item is currently opened.
   */
  openedState: Ref<boolean, boolean>;

  /**
   * Updates the accordion wrapper state by id.
   *
   * @param {string} id - The unique identifier of the accordion item to update.
   * @param {boolean} value - The new open state to set.
   */
  updateAccordionWrapper: (id: string, value: boolean) => void;

  /**
   * Toggles the open/close state of the accordion item.
   */
  toggle: () => void;

  /**
   * Opens the accordion item.
   */
  open: () => void;

  /**
   * Closes the accordion item.
   */
  close: () => void;

  /**
   * Handler for mouse over event on the accordion item.
   */
  onMouseOver: () => void;

  /**
   * Handler for mouse leave event on the accordion item.
   */
  onMouseLeave: () => void;

  /**
   * Handler for key down event specifically for Escape key.
   */
  onKeyDownEcsHandler: () => void;

  /**
   * Handler for key up or down events.
   *
   * @param {KeyboardEvent} event - Keyboard event triggered by user interaction.
   */
  onKeyUpOrDownHandler: (event: KeyboardEvent) => void;

  /**
   * Handler for blur event on the accordion item.
   *
   * @param {Event} event - The blur event object.
   */
  onBlur: (event: Event) => void;

  /**
   * Handler for focus event on the accordion item.
   *
   * @param {Event} event - The focus event object.
   */
  onFocus: (event: Event) => void;

  /**
   * Handler called when the expand animation starts entering.
   *
   * @param {Element} ell - The DOM element being expanded.
   */
  onExpandEnter: (el: Element) => void;

  /**
   * Handler called after the expand animation has entered.
   *
   * @param {Element} el - The DOM element that finished expanding.
   */
  onExpandAfterEnter: (el: Element) => void;

  /**
   * Handler called before the expand animation starts leaving.
   *
   * @param {Element} el - The DOM element being collapsed.
   */
  onExpandBeforeLeave: (el: Element) => void;
};
