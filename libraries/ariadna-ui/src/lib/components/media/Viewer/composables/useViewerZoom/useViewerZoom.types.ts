import type { Reactive } from 'vue';
import type { TViewerMediaItem } from '../../types/Viewer.types';
import type { TViewerZoomCore } from '../../core/zoom/viewer.zoom.core.types';

/**
 * @description
 * Return type for the `useViewerZoom` composable function.
 * Contains reactive properties and methods for Viewer component functionality.
 */
export type TUseViewerZoomReturn = {
  /**
   * Reactive object containing the core zoom state and logic for the Viewer.
   */
  zoomCore: Reactive<TViewerZoomCore>;

  /**
   *  Handler function to trigger maximum zoom on a media item.
   *
   * @param {TouchEvent | MouseEvent} event - The user interaction event (either TouchEvent or MouseEvent).
   * @param {TViewerMediaItem} mediaItem - The media item to apply the zoom action to.
   */
  onClickMaxZoom: (event: TouchEvent | MouseEvent, mediaItem: TViewerMediaItem) => void;
};
