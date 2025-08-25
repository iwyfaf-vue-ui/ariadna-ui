import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ref, computed, defineComponent, h } from 'vue';
import { mount } from '@vue/test-utils';
import useViewerSwipe from '../../composables/useViewerSwipe/useViewerSwipe';
import { ViewerSwipeCore } from '../../core/swipe/viewer.swipe.core';

function mountWithComposable({
  container = null,
  swipeDisable = false,
  verge = 10,
  loop = false,
  generalGallery = [],
}: {
  container?: HTMLDivElement | null;
  swipeDisable?: boolean;
  verge?: number;
  loop?: boolean;
  generalGallery?: Array<{}>;
} = {}) {
  const containerRef = ref(container);
  const swipeDisableRef = computed(() => swipeDisable);
  const generalGalleryRef = computed(() => generalGallery);

  let composableResult: any = null;

  const wrapper = mount(
    defineComponent({
      setup() {
        composableResult = useViewerSwipe(
          containerRef,
          swipeDisableRef,
          verge,
          loop,
          generalGalleryRef,
        );
        return { ...composableResult };
      },
      render() {
        return h('div');
      },
    }),
  );

  return {
    wrapper,
    composableResult,
    containerRef,
    swipeDisableRef,
    generalGalleryRef,
  };
}

describe('useViewerSwipe', () => {
  let containerEl: HTMLDivElement;

  beforeEach(() => {
    containerEl = document.createElement('div');
    Object.defineProperty(containerEl, 'offsetWidth', { value: 200, configurable: true });
    Object.defineProperty(containerEl, 'offsetHeight', { value: 100, configurable: true });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Basic functionality', () => {
    it('Should return expected structure.', () => {
      const { wrapper } = mountWithComposable({
        container: containerEl,
        verge: 15,
        loop: true,
        generalGallery: [],
      });
      const vm = wrapper.vm;

      expect(vm).toHaveProperty('swipeDisable');
      expect(vm).toHaveProperty('swipeCore');
    });
  });

  describe('Init', () => {
    it('Should initialize swipeCore with correct options.', () => {
      const { composableResult } = mountWithComposable({
        container: containerEl,
        verge: 15,
        loop: true,
        generalGallery: [{}, {}, {}],
      });

      expect(composableResult.swipeCore).toBeInstanceOf(ViewerSwipeCore);
      expect(composableResult.swipeCore['verge']).toBe(15);
      expect(composableResult.swipeCore['loop']).toBe(true);
      expect(composableResult.swipeCore['galleryLength']).toBe(3);
    });

    it('Should not subscribe to events if container is null.', () => {
      const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
      mountWithComposable({ container: null });

      expect(addEventListenerSpy).not.toHaveBeenCalled();
    });
  });

  describe('Event handlers', () => {
    it('Should call swipeCore.swipeStart on mousedown if swipeDisable is false.', () => {
      const { composableResult, containerRef } = mountWithComposable({
        container: containerEl,
        swipeDisable: false,
      });
      const spy = vi.spyOn(composableResult.swipeCore, 'swipeStart');
      const event = new MouseEvent('mousedown', { clientX: 123 });
      containerRef.value!.dispatchEvent(event);

      expect(spy).toHaveBeenCalledWith(123);
    });

    it('Should not call swipeCore.swipeStart on mousedown if swipeDisable is true.', () => {
      const { composableResult, containerRef } = mountWithComposable({
        container: containerEl,
        swipeDisable: true,
      });
      const spy = vi.spyOn(composableResult.swipeCore, 'swipeStart');
      const event = new MouseEvent('mousedown', { clientX: 123 });
      containerRef.value!.dispatchEvent(event);

      expect(spy).not.toHaveBeenCalled();
    });

    it('Should not call swipeCore.swipeStart on touchstart if swipeDisable is true.', () => {
      const { composableResult, containerRef } = mountWithComposable({
        container: containerEl,
        swipeDisable: true,
      });
      const spy = vi.spyOn(composableResult.swipeCore, 'swipeStart');
      const touch = { clientX: 55 };
      const event = new TouchEvent('touchstart', { touches: [touch as any] });
      Object.defineProperty(event, 'touches', { value: [touch] });
      containerRef.value!.dispatchEvent(event);

      expect(spy).not.toHaveBeenCalled();
    });

    it('Should not call swipeCore.swipeStart on touchstart if touches.length !== 1.', () => {
      const { composableResult, containerRef } = mountWithComposable({
        container: containerEl,
        swipeDisable: false,
      });
      const spy = vi.spyOn(composableResult.swipeCore, 'swipeStart');
      const event = new TouchEvent('touchstart', {
        touches: [{ clientX: 1 }, { clientX: 2 }] as any,
      });
      Object.defineProperty(event, 'touches', {
        value: [{ clientX: 1 }, { clientX: 2 }],
      });
      containerRef.value!.dispatchEvent(event);

      expect(spy).not.toHaveBeenCalled();
    });

    it('Should call swipeCore.swipe on mousemove if swipeDisable is false.', () => {
      const { composableResult } = mountWithComposable({
        container: containerEl,
        swipeDisable: false,
      });
      const spy = vi.spyOn(composableResult.swipeCore, 'swipe');
      const event = new MouseEvent('mousemove', { clientX: 77 });
      window.dispatchEvent(event);

      expect(spy).toHaveBeenCalledWith(77);
    });

    it('Should not call swipeCore.swipe on mousemove if swipeDisable is true.', () => {
      const { composableResult } = mountWithComposable({
        container: containerEl,
        swipeDisable: true,
      });
      const spy = vi.spyOn(composableResult.swipeCore, 'swipe');
      const event = new MouseEvent('mousemove', { clientX: 77 });
      window.dispatchEvent(event);

      expect(spy).not.toHaveBeenCalled();
    });

    it('Should not call swipeCore.swipe on touchmove if touches.length !== 1.', () => {
      const { composableResult } = mountWithComposable({
        container: containerEl,
        swipeDisable: false,
      });
      const spy = vi.spyOn(composableResult.swipeCore, 'swipe');
      const event = new TouchEvent('touchmove', {
        touches: [{ clientX: 1 }, { clientX: 2 }] as any,
      });
      Object.defineProperty(event, 'touches', {
        value: [{ clientX: 1 }, { clientX: 2 }],
      });
      window.dispatchEvent(event);

      expect(spy).not.toHaveBeenCalled();
    });

    it('Should call swipeCore.swipeEnd on mouseup.', () => {
      const { composableResult } = mountWithComposable({
        container: containerEl,
      });
      const spy = vi.spyOn(composableResult.swipeCore, 'swipeEnd');
      const event = new MouseEvent('mouseup');
      window.dispatchEvent(event);

      expect(spy).toHaveBeenCalled();
    });

    it('Should call swipeCore.swipeEnd on touchend.', () => {
      const { composableResult } = mountWithComposable({
        container: containerEl,
      });
      const spy = vi.spyOn(composableResult.swipeCore, 'swipeEnd');
      const event = new TouchEvent('touchend');
      window.dispatchEvent(event);

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('Lifecycle', () => {
    it('Should subscribe to events on mount and unsubscribe on unmount.', () => {
      const addEventListenerSpy = vi.spyOn(containerEl, 'addEventListener');
      const removeEventListenerSpy = vi.spyOn(containerEl, 'removeEventListener');
      const addWindowListenerSpy = vi.spyOn(window, 'addEventListener');
      const removeWindowListenerSpy = vi.spyOn(window, 'removeEventListener');

      const { wrapper } = mountWithComposable({ container: containerEl });
      expect(addEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));
      expect(addEventListenerSpy).toHaveBeenCalledWith('touchstart', expect.any(Function));
      expect(addWindowListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
      expect(addWindowListenerSpy).toHaveBeenCalledWith('mouseup', expect.any(Function));
      expect(addWindowListenerSpy).toHaveBeenCalledWith('touchmove', expect.any(Function));
      expect(addWindowListenerSpy).toHaveBeenCalledWith('touchend', expect.any(Function));

      wrapper.unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));
      expect(removeEventListenerSpy).toHaveBeenCalledWith('touchstart', expect.any(Function));
      expect(removeWindowListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
      expect(removeWindowListenerSpy).toHaveBeenCalledWith('mouseup', expect.any(Function));
      expect(removeWindowListenerSpy).toHaveBeenCalledWith('touchmove', expect.any(Function));
      expect(removeWindowListenerSpy).toHaveBeenCalledWith('touchend', expect.any(Function));
    });

    it('Should not subscribe/unsubscribe if container is null.', () => {
      const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
      const { wrapper } = mountWithComposable({ container: null });
      wrapper.unmount();

      expect(addEventListenerSpy).not.toHaveBeenCalled();
      expect(removeEventListenerSpy).not.toHaveBeenCalled();
    });

    it('Should handle repeated mount/unmount cycles gracefully.', () => {
      const addEventListenerSpy = vi.spyOn(containerEl, 'addEventListener');
      const removeEventListenerSpy = vi.spyOn(containerEl, 'removeEventListener');
      const { wrapper } = mountWithComposable({ container: containerEl });
      wrapper.unmount();
      // Повторный mount/unmount
      const { wrapper: wrapper2 } = mountWithComposable({ container: containerEl });
      wrapper2.unmount();

      expect(addEventListenerSpy).toHaveBeenCalled();
      expect(removeEventListenerSpy).toHaveBeenCalled();
    });
  });

  describe('Edge cases', () => {
    it('Should handle empty generalGallery.', () => {
      const { composableResult } = mountWithComposable({
        container: containerEl,
        generalGallery: [],
      });

      expect(composableResult.swipeCore['galleryLength']).toBe(0);
    });
  });
});
