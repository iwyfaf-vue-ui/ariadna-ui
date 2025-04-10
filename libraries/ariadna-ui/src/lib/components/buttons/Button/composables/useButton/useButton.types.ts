import type { ComputedRef } from 'vue';

/**
 * @description Return type for the `useButton` composable function.
 * Contains reactive properties and methods for button component functionality.
 *
 * @example
 * // Using the composable return values
 * const { isDisabled, componentClasses, clickHandler } = useButton(props, emits);
 *
 * @example
 * // Template usage
 * <button
 *   :class="componentClasses"
 *   :disabled="isDisabled"
 *   @click="clickHandler"
 * >
 *   Click me
 * </button>
 */
export type TUseButtonReturn = {
  /**
   * Reactive computed property indicating if the button is disabled.
   *
   * @description Returns `true` when either the `disabled` or `loading` prop is true.
   */
  isDisabled: ComputedRef<boolean | undefined>;

  /**
   * @description Reactive computed property generating CSS class string based on button props (modifier, size,
   * states, etc.).
   */
  componentClasses: ComputedRef<string>;

  /**
   * Event handler function for button clicks.
   *
   * @description Automatically checks disabled state before emitting the click event.
   * @param {MouseEvent} event - The native mouse event object.
   * @returns {void}
   */
  clickHandler: (event: MouseEvent) => void;
};
