import type { ComputedRef } from 'vue';

/**
 * @description
 * Return type for the `useViewerClasses` composable function.
 * Contains reactive properties and methods for Viewer component functionality.
 */
export type TUseViewerClassesReturn = {
  /**
   * Computed classes for the slider container element.
   */
  sliderClasses: ComputedRef<{ [p: string]: boolean }>;

  /**
   * Computed classes for the "Next" navigation button.
   */
  nextButtonClasses: ComputedRef<{ [p: string]: boolean }>;

  /**
   * Computed classes for the "Previous" navigation button.
   */
  prevButtonClasses: ComputedRef<{ [p: string]: boolean }>;

  /**
   * Computed classes for the main content area of the Viewer.
   */
  contentClasses: ComputedRef<{ [p: string]: boolean }>;
};
