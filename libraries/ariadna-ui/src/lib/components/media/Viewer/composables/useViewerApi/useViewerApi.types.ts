import type {
  TViewerApiOpenWithGalleryCallback,
  TViewerGallery,
  TViewerMediaItem,
} from '../../types/Viewer.types';

/**
 * @description
 * Return type for the `useViewerApi` composable function.
 * Contains reactive properties and methods for Viewer component functionality.
 */
export type TUseViewerApiReturn = {
  open: () => void;
  close: () => void;
  setGallery: (newGallery: TViewerGallery) => void;
  setLoop: (loop: boolean) => void;
  setIndex: (index: number) => void;
  setSrcKey: (newSrcKey: string) => void;
  next: () => void;
  prev: () => void;
  setZoom: (zoom: number) => void;
  setSwipe: (swipe: boolean) => void;
  setShowGallery: (show: boolean) => void;
  openWithGallery<T extends TViewerMediaItem = TViewerMediaItem>(
    gallery: TViewerGallery,
    index: number | TViewerApiOpenWithGalleryCallback<T>,
  ): void;
};
