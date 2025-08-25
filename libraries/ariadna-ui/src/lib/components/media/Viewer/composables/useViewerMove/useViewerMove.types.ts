import type { Reactive } from 'vue';
import type { TViewerMoveCore } from '../../core/move/viewer.move.core.types';

/**
 * @description
 * Return type for the `useViewerMove` composable function.
 * Contains reactive properties and methods for Viewer component functionality.
 */
export type TUseViewerMoveReturn = {
  /**
   * A reactive object containing the core movement logic and state for the Viewer component.
   */
  moveCore: Reactive<TViewerMoveCore>;
};
