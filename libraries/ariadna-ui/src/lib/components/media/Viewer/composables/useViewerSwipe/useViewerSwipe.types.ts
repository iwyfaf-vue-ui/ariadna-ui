import type { Ref, Reactive } from 'vue';
import type { TViewerSwipeCore } from '../../core/swipe/viewer.swipe.core.types';

/**
 * @description
 * Return type for the `useViewerSwipe` composable function.
 * Contains reactive properties and methods for Viewer component functionality.
 */
export type TUseViewerSwipeReturn = {
  /**
   * A Vue ref that determines if swipe actions are disabled in the viewer.
   */
  swipeDisable: Ref<boolean, boolean>;

  /**
   * A reactive object encapsulating the core swipe logic and state for the viewer.
   */
  swipeCore: Reactive<TViewerSwipeCore>;
};
