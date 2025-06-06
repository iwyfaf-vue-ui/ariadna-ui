import type { ComputedRef } from 'vue';

/**
 * @description
 * Return type for the `useTimeline` composable function.
 * Contains reactive properties and methods for Timeline component functionality.
 */
export type TUseTimelineReturn = {
  /**
   * Reactive computed property generating CSS class string based on component props (modifier, size, states, etc.).
   */
  componentClasses: ComputedRef<string>;
};
