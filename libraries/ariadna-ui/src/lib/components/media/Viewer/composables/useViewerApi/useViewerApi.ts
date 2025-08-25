import { type Reactive } from 'vue';
import type { Ref } from 'vue';
import type { TUseViewerApiReturn } from './useViewerApi.types';
import type {
  TViewerApiOpenWithGalleryCallback,
  TViewerGallery,
  TViewerMediaItem,
} from '../../types/Viewer.types';
import type { TViewerSwipeCore } from '../../core/swipe/viewer.swipe.core.types';
import type { EViewerMedia } from '../../types/Viewer.enums';
import type { TViewerZoomCore } from '../../core/zoom/viewer.zoom.core.types';
import type { TViewerEmits } from '../../Viewer';

export default function useViewerApi(
  emits: TViewerEmits,
  swipeCore: Reactive<TViewerSwipeCore>,
  gallery: Ref<Array<TViewerMediaItem>, TViewerGallery | Array<TViewerMediaItem>>,
  parseGallery: (gallery: TViewerGallery) => { [p: string]: any; type: EViewerMedia }[],
  srcKey: Ref<string, string>,
  active: Ref<boolean, boolean>,
  zoomCore: Reactive<TViewerZoomCore>,
  swipeDisable: Ref<boolean, boolean>,
  showGallery: Ref<boolean, boolean>,
  mainLoop?: Ref<boolean, boolean>,
): TUseViewerApiReturn {
  function open() {
    active.value = true;
    emits('open');
  }

  function close() {
    active.value = false;
    emits('close');
  }

  function setGallery(newGallery: TViewerGallery) {
    swipeCore.updateOptions({ galleryLength: newGallery.length });
    gallery.value = parseGallery(newGallery);
  }

  function setIndex(index: number) {
    swipeCore.updateIndex(index);
  }

  function setLoop(loop: boolean) {
    swipeCore.updateOptions({ loop });

    if (mainLoop) {
      mainLoop.value = loop;
    }
  }

  function setSrcKey(newSrcKey: string) {
    srcKey.value = newSrcKey;
  }

  function next() {
    swipeCore.next();
  }

  function prev() {
    swipeCore.prev();
  }

  function setZoom(zoom: number) {
    zoomCore.setScale(zoom);
  }

  function setSwipe(swipe: boolean) {
    swipeDisable.value = !swipe;
  }

  function setShowGallery(show: boolean) {
    showGallery.value = show;
  }

  const openWithGallery = <T extends TViewerMediaItem = TViewerMediaItem>(
    gallery: TViewerGallery,
    index: number | TViewerApiOpenWithGalleryCallback<T>,
  ) => {
    let correctIndex: number;

    if (typeof index === 'number' && Number.isFinite(index)) {
      correctIndex = index;
    } else {
      correctIndex = gallery.findIndex(index as TViewerApiOpenWithGalleryCallback);
    }

    if (correctIndex < 0) {
      correctIndex = 0;
    }

    setGallery(gallery);
    setIndex(correctIndex);
    open();
  };

  return {
    open,
    close,
    setGallery,
    setLoop,
    setIndex,
    setSrcKey,
    next,
    prev,
    setZoom,
    setSwipe,
    setShowGallery,
    openWithGallery,
  };
}
