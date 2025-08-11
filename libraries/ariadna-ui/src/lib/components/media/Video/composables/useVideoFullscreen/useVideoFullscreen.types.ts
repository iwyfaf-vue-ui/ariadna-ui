import type { Ref } from 'vue';

/**
 * @description
 * Return type for the `useVideoFullscreen` composable function.
 * Contains reactive properties and methods for Video component functionality.
 */
export type TUseVideoFullscreenReturn = {
  /**
   * Reactive boolean indicating whether fullscreen mode is active.
   */
  fullscreenState: Ref<boolean, boolean>;

  /**
   * Function to activate fullscreen mode locally.
   */
  fullscreenLocal: () => void;

  /**
   * Async function to deactivate fullscreen mode locally.
   * @returns {Promise<void>}
   */
  unFullscreenLocal: () => Promise<void>;

  /**
   * Function to toggle fullscreen mode; may be async.
   * @returns {void | Promise<void>}
   */
  toggleFullscreen: () => void | Promise<void>;
};
