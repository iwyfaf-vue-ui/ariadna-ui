import type { ComputedRef } from 'vue';

/**
 * @description
 * Return type for the `useInputNumber` composable function.
 * Contains reactive properties and methods for InputNumber component functionality.
 */
export type TUseInputNumberReturn = {
  /**
   * Computed unique identifier for the component instance.
   */
  uniqueID: ComputedRef<string>;

  /**
   * Computed object containing event listeners for some events. Each listener is a function that receives the
   * corresponding DOM event.
   */
  listeners: ComputedRef<{
    /**
     * Handler for the blur event.
     *
     * @param {Event} event - The blur event object.
     */
    blur: (event: Event) => void;

    /**
     * Handler for the focus event.
     *
     * @param {Event} event - The focus event object.
     */
    focus: (event: Event) => void;

    /**
     * Handler for the change event.
     *
     * @param {Event} event - The change event object.
     */
    change: (event: Event) => void;

    /**
     * Handler for the mouseover event.
     */
    mouseover: () => void;

    /**
     * Handler for the mouseleave event.
     */
    mouseleave: () => void;
  }>;

  /**
   * Computed placeholder text for the component instance. If a placeholder slot is provided, returns `undefined` to
   * allow the slot content to be used. Otherwise, returns the `placeholder` prop value.
   */
  defaultPlaceholder: ComputedRef<string | undefined>;

  /**
   * Reactive computed property generating CSS class string based on component props (modifier, size, states, etc.).
   */
  componentClasses: ComputedRef<string>;

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
