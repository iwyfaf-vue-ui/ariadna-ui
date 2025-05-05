import type { ComputedRef } from 'vue';

/**
 * Return type for the `useSpinner` composable function.
 */
export type TUseSpinnerReturn = {
  /**
   * Reactive computed property generating CSS class string based on component props (modifier, size, states, etc.).
   */
  componentClasses: ComputedRef<string>;
};
