import type { ComputedRef } from 'vue';

/**
 * @description
 * Return type for the `useTag` composable function.
 * Contains reactive properties and methods for Tag component functionality.
 */
export type TUseTagReturn = {
  /**
   * Reactive computed property generating CSS class string based on component props (modifier, size, states, etc.).
   */
  componentClasses: ComputedRef<string>;
};
