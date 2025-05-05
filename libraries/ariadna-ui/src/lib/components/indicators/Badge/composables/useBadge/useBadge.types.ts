import type { ComputedRef } from 'vue';

/**
 * Return type for the `useBadge` composable function.
 */
export type TUseBadgeReturn = {
  /**
   * Reactive computed property generating CSS class string based on component props (modifier, size, states, etc.).
   */
  componentClasses: ComputedRef<string>;
};
