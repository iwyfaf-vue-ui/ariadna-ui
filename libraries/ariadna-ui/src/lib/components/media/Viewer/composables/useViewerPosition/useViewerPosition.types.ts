import type { Reactive } from 'vue';
import type { TViewerPositionCore } from '../../core/position/viewer.position.core.types';

/**
 * @description
 * Return type for the `useViewerPosition` composable function.
 * Contains reactive properties and methods for Viewer component functionality.
 */
export type TUseViewerPositionReturn = {
  /**
   * A reactive wrapper around the core position state and logic for the Viewer component.
   */
  positionCore: Reactive<TViewerPositionCore>;
};
