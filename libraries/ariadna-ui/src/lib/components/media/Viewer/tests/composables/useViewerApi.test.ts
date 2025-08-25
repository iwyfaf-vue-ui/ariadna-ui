import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ref, defineComponent, h } from 'vue';
import { mount } from '@vue/test-utils';
import useViewerApi from '../../composables/useViewerApi/useViewerApi';
import { ViewerSwipeCore } from '../../core/swipe/viewer.swipe.core';
import { ViewerZoomCore } from '../../core/zoom/viewer.zoom.core';
import type { TViewerGallery, TViewerMediaItem } from '../../types/Viewer.types';

function mountWithComposable(
  options: {
    gallery?: TViewerGallery;
    swipeCore?: any;
    zoomCore?: any;
    srcKey?: string;
    active?: boolean;
    swipeDisable?: boolean;
    showGallery?: boolean;
    mainLoop?: boolean;
    parseGallery?: (gallery: TViewerGallery) => any[];
  } = {},
) {
  const emits = vi.fn();
  const gallery = ref<TViewerGallery>(options.gallery ?? []);
  const swipeCore =
    options.swipeCore ?? new ViewerSwipeCore({ galleryLength: gallery.value.length });
  const zoomCore = options.zoomCore ?? new ViewerZoomCore({ maxScale: 10 });
  const srcKey = ref(options.srcKey ?? 'src');
  const active = ref(options.active ?? false);
  const swipeDisable = ref(options.swipeDisable ?? false);
  const showGallery = ref(options.showGallery ?? true);
  const mainLoop = ref(options.mainLoop ?? false);
  const parseGallery =
    options.parseGallery ??
    ((gallery: TViewerGallery) =>
      gallery.map((item) => ({ ...item, type: (item as any).type ?? 'IMAGE' })));

  let composableResult: any = null;

  const wrapper = mount(
    defineComponent({
      setup() {
        composableResult = useViewerApi(
          emits,
          swipeCore,
          gallery,
          parseGallery,
          srcKey,
          active,
          zoomCore,
          swipeDisable,
          showGallery,
          mainLoop,
        );
        return { ...composableResult, emits };
      },
      render() {
        return h('div');
      },
    }),
  );

  return {
    wrapper,
    composableResult,
    emits,
    gallery,
    swipeCore,
    zoomCore,
    srcKey,
    active,
    swipeDisable,
    showGallery,
    mainLoop,
    parseGallery,
  };
}

describe('useViewerApi', () => {
  let defaultGallery: TViewerGallery;
  let defaultParsedGallery: any[];

  beforeEach(() => {
    defaultGallery = [
      { src: 'img1.jpg', id: 1, type: 'IMAGE' },
      { src: 'img2.jpg', id: 2, type: 'IMAGE' },
      { src: 'vid1.mp4', id: 3, type: 'VIDEO' },
    ];
    defaultParsedGallery = defaultGallery.map((item) => ({ ...item }));
  });

  describe('Basic functionality', () => {
    it('Should return expected structure.', () => {
      const { wrapper } = mountWithComposable({ active: false });

      const vm = wrapper.vm;

      expect(vm).toHaveProperty('open');
      expect(vm).toHaveProperty('close');
      expect(vm).toHaveProperty('setGallery');
      expect(vm).toHaveProperty('setLoop');
      expect(vm).toHaveProperty('setIndex');
      expect(vm).toHaveProperty('setSrcKey');
      expect(vm).toHaveProperty('next');
      expect(vm).toHaveProperty('prev');
      expect(vm).toHaveProperty('setZoom');
      expect(vm).toHaveProperty('setSwipe');
      expect(vm).toHaveProperty('setShowGallery');
      expect(vm).toHaveProperty('openWithGallery');
    });
  });

  describe('open', () => {
    it('Should set active to true and emit "open".', () => {
      const { composableResult, active, emits } = mountWithComposable({ active: false });
      composableResult.open();

      expect(active.value).toBe(true);
      expect(emits).toHaveBeenCalledWith('open');
    });
  });

  describe('close', () => {
    it('Should set active to false and emit "close".', () => {
      const { composableResult, active, emits } = mountWithComposable({ active: true });
      composableResult.close();

      expect(active.value).toBe(false);
      expect(emits).toHaveBeenCalledWith('close');
    });
  });

  describe('setGallery', () => {
    it('Should update gallery with parsed value and update swipeCore options.', () => {
      const { composableResult, gallery, swipeCore } = mountWithComposable({
        gallery: [],
        parseGallery: () => defaultParsedGallery,
      });
      composableResult.setGallery(defaultGallery);

      expect(gallery.value).toStrictEqual(defaultParsedGallery);
      expect(swipeCore['galleryLength']).toBe(defaultGallery.length);
    });

    it('Should handle empty gallery.', () => {
      const { composableResult, gallery, swipeCore } = mountWithComposable({
        gallery: [],
        parseGallery: () => [],
      });
      composableResult.setGallery([]);

      expect(gallery.value).toStrictEqual([]);
      expect(swipeCore['galleryLength']).toBe(0);
    });
  });

  describe('setLoop', () => {
    it('Should update swipeCore loop and mainLoop if provided.', () => {
      const { composableResult, swipeCore, mainLoop } = mountWithComposable({
        mainLoop: false,
      });
      composableResult.setLoop(true);

      expect(swipeCore['loop']).toBe(true);
      expect(mainLoop.value).toBe(true);
    });

    it('Should only update swipeCore if mainLoop is not provided.', () => {
      const { composableResult, swipeCore } = mountWithComposable({});
      composableResult.setLoop(true);

      expect(swipeCore['loop']).toBe(true);
    });
  });

  describe('setIndex', () => {
    it('Should update swipeCore index.', () => {
      const { composableResult, swipeCore } = mountWithComposable({
        gallery: defaultGallery,
      });
      composableResult.setIndex(2);

      expect(swipeCore.index).toBe(2);
    });
  });

  describe('setSrcKey', () => {
    it('Should update srcKey.', () => {
      const { composableResult, srcKey } = mountWithComposable({ srcKey: 'src' });
      composableResult.setSrcKey('url');

      expect(srcKey.value).toBe('url');
    });
  });

  describe('next', () => {
    it('Should call swipeCore.next.', () => {
      const { composableResult, swipeCore } = mountWithComposable({
        gallery: defaultGallery,
      });
      swipeCore.updateIndex(0);
      composableResult.next();

      expect(swipeCore.index).toBe(1);
    });
  });

  describe('prev', () => {
    it('Should call swipeCore.prev.', () => {
      const { composableResult, swipeCore } = mountWithComposable({
        gallery: defaultGallery,
      });
      swipeCore.updateIndex(2);
      composableResult.prev();

      expect(swipeCore.index).toBe(1);
    });
  });

  describe('setZoom', () => {
    it('Should call zoomCore.setScale.', () => {
      const { composableResult, zoomCore } = mountWithComposable({});
      composableResult.setZoom(5);

      expect(zoomCore.scale).toBe(5);
    });
  });

  describe('setSwipe', () => {
    it('Should update swipeDisable.', () => {
      const { composableResult, swipeDisable } = mountWithComposable({ swipeDisable: false });

      composableResult.setSwipe(false);
      expect(swipeDisable.value).toBe(true);

      composableResult.setSwipe(true);
      expect(swipeDisable.value).toBe(false);
    });
  });

  describe('setShowGallery', () => {
    it('Should update showGallery.', () => {
      const { composableResult, showGallery } = mountWithComposable({ showGallery: true });

      composableResult.setShowGallery(false);
      expect(showGallery.value).toBe(false);

      composableResult.setShowGallery(true);
      expect(showGallery.value).toBe(true);
    });
  });

  describe('openWithGallery', () => {
    it('Should set gallery, index, and open viewer for numeric index.', () => {
      const { composableResult, gallery, swipeCore, active } = mountWithComposable({
        gallery: [],
        parseGallery: () => defaultParsedGallery,
      });
      composableResult.openWithGallery(defaultGallery, 1);

      expect(gallery.value).toStrictEqual(defaultParsedGallery);
      expect(swipeCore.index).toBe(1);
      expect(active.value).toBe(true);
    });

    it('Should set gallery, index, and open viewer for callback index.', () => {
      const { composableResult, gallery, swipeCore, active } = mountWithComposable({
        gallery: [],
        parseGallery: () => defaultParsedGallery,
      });
      const cb = (item: TViewerMediaItem) => item.id === 3;
      composableResult.openWithGallery(defaultGallery, cb);

      expect(gallery.value).toStrictEqual(defaultParsedGallery);
      expect(swipeCore.index).toBe(2);
      expect(active.value).toBe(true);
    });

    it('Should default to index 0 if callback not found.', () => {
      const { composableResult, swipeCore } = mountWithComposable({
        gallery: [],
        parseGallery: () => defaultParsedGallery,
      });
      const cb = (item: TViewerMediaItem) => item.id === 999;
      composableResult.openWithGallery(defaultGallery, cb);

      expect(swipeCore.index).toBe(0);
    });

    it('Should handle empty gallery gracefully.', () => {
      const { composableResult, gallery, swipeCore, active } = mountWithComposable({
        gallery: [],
        parseGallery: () => [],
      });
      composableResult.openWithGallery([], 0);

      expect(gallery.value).toStrictEqual([]);
      expect(swipeCore.index).toBe(0);
      expect(active.value).toBe(true);
    });
  });
});
