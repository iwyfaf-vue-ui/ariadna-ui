import type { ComputedRef } from 'vue';

/**
 * @description
 * Return type for the `useButton` composable function.
 * Contains reactive properties and methods for button component functionality.
 */
export type TUseButtonReturn = {
  /**
   * Reactive computed property indicating if the button is disabled. Returns `true` when either the `disabled` or
   * `loading` prop is true.
   */
  isDisabled: ComputedRef<boolean | undefined>;

  /**
   * Reactive computed property generating CSS class string based on component props (modifier, size, states, etc.).
   */
  componentClasses: ComputedRef<string>;

  /**
   * Event handler function for button clicks. Automatically checks disabled state before emitting the click event.
   *
   * @param {MouseEvent} event - The native mouse event object.
   * @returns {void}
   */
  clickHandler: (event: MouseEvent) => void;
};
