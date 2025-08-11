import type { ComputedRef } from 'vue';

/**
 * @description
 * Return type for the `useVideoClasses` composable function.
 * Contains reactive properties and methods for Video component functionality.
 */
export type TUseVideoClassesReturn = {
  /**
   * Computed object containing CSS classes for the player action controls (e.g., play, pause).
   */
  actionClasses: ComputedRef<{ [p: string]: boolean }>;

  /**
   * Computed object containing CSS classes for the volume control element.
   */
  volumeClasses: ComputedRef<{ [p: string]: boolean }>;

  /**
   * Computed object containing CSS classes for the fullscreen toggle element.
   */
  fullscreenClasses: ComputedRef<{ [p: string]: boolean }>;

  /**
   * Computed object containing CSS classes for the timeline/progress bar element.
   */
  timeLineClasses: ComputedRef<{ [p: string]: boolean }>;

  /**
   * Computed object containing CSS classes for the timeline popup (e.g., tooltip or preview).
   */
  timeLinePopupClasses: ComputedRef<{ [p: string]: boolean }>;
};
