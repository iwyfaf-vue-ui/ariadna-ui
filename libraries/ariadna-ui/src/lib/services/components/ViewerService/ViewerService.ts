import type { ObjectPlugin } from 'vue';
import viewerEventBus from '@/lib/components/media/Viewer/event-bus/Viewer.event-bus';
import { EViewerApi } from '@/lib/components/media/Viewer/types/Viewer.enums';
import type { TViewerApi } from '@/lib/components/media/Viewer/Viewer';
import type {
  TViewerApiOpenWithGalleryCallback,
  TViewerGallery,
  TViewerMediaItem,
} from '@/lib/components/media/Viewer/types/Viewer.types';
import { ViewerApiProviderKey } from '@/lib/components/media/Viewer/providers/Viewer.provider';

const ViewerService: ObjectPlugin = {
  install(app) {
    let isMounted = false;
    let callQueue: Array<() => void> = [];

    const runOrQueue = (fn: () => void) => {
      if (isMounted) {
        return fn();
      }

      callQueue.push(fn);
    };

    viewerEventBus.on(EViewerApi.ON_MOUNTED, () => {
      isMounted = true;

      callQueue.forEach((fn) => fn());
      callQueue = [];
    });

    viewerEventBus.on(EViewerApi.ON_UNMOUNTED, () => {
      isMounted = false;
      callQueue = [];
    });

    const viewerApi: TViewerApi = {
      created(callback: (...args: unknown[]) => void) {
        const onceCallback = (...args: any[]) => {
          viewerEventBus.off(EViewerApi.ON_CREATED, onceCallback);
          callback(...args);
        };

        viewerEventBus.on(EViewerApi.ON_CREATED, onceCallback);
      },

      mounted(callback: (...args: unknown[]) => void) {
        const onceCallback = (...args: any[]) => {
          viewerEventBus.off(EViewerApi.ON_MOUNTED, onceCallback);
          callback(...args);
        };

        viewerEventBus.on(EViewerApi.ON_MOUNTED, onceCallback);
      },

      unMounted(callback: (...args: unknown[]) => void) {
        const onceCallback = (...args: any[]) => {
          viewerEventBus.off(EViewerApi.ON_UNMOUNTED, onceCallback);
          callback(...args);
        };

        viewerEventBus.on(EViewerApi.ON_UNMOUNTED, onceCallback);
      },

      setGallery(gallery: TViewerGallery) {
        runOrQueue(() => viewerEventBus.emit(EViewerApi.SET_GALLERY, gallery));
      },

      setZoom(zoom: number) {
        runOrQueue(() => viewerEventBus.emit(EViewerApi.SET_ZOOM, zoom));
      },

      setLoop(loop: boolean) {
        runOrQueue(() => viewerEventBus.emit(EViewerApi.SET_LOOP, loop));
      },

      setSwipe(swipe: boolean) {
        runOrQueue(() => viewerEventBus.emit(EViewerApi.SET_SWIPE, swipe));
      },

      setSrcKey(srcKey: string) {
        runOrQueue(() => viewerEventBus.emit(EViewerApi.SET_SRC_KEY, srcKey));
      },

      setShowGallery(show: boolean) {
        runOrQueue(() => viewerEventBus.emit(EViewerApi.SET_SHOW_GALLERY, show));
      },

      next() {
        runOrQueue(() => viewerEventBus.emit(EViewerApi.NEXT, null));
      },

      prev() {
        runOrQueue(() => viewerEventBus.emit(EViewerApi.PREV, null));
      },

      open() {
        runOrQueue(() => viewerEventBus.emit(EViewerApi.OPEN, null));
      },

      goTo(index: number) {
        runOrQueue(() => viewerEventBus.emit(EViewerApi.GO_TO, index));
      },

      openWithGallery<T extends TViewerMediaItem = TViewerMediaItem>(
        gallery: TViewerGallery,
        index: number | TViewerApiOpenWithGalleryCallback<T>,
      ) {
        runOrQueue(() => viewerEventBus.emit(EViewerApi.OPEN_WITH_GALLERY, { gallery, index }));
      },
    };

    app.provide(ViewerApiProviderKey, viewerApi);
  },
};

export default ViewerService;
