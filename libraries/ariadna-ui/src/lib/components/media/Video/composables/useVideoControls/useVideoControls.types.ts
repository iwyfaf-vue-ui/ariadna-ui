import type { ComputedRef } from 'vue';

/**
 * @description
 * Return type for the `useVideoControls` composable function.
 * Contains reactive properties and methods for Video component functionality.
 */
export type TUseVideoControlsReturn = {
  /**
   * Handles mouse enter events on the Video controls area.
   */
  onControlsMouseEnter: () => void;

  /**
   * Handles mouse leave events from the Video controls area.
   */
  onControlsMouseLeave: () => void;

  /**
   * Shows the Video controls.
   * @param {boolean} always - If true, the controls will remain visible.
   */
  showControls: (always?: boolean) => void;

  /**
   * Handles mouse leave events from the Video area.
   */
  onMouseLeave: () => void;

  /**
   * Computed classes for the Video controls, useful for dynamic styling based on state.
   */
  controlsClasses: ComputedRef<{ [p: string]: any }>;
};
