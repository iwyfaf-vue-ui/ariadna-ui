import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ref, computed, defineComponent, h } from 'vue';
import { mount } from '@vue/test-utils';
import useViewerZoom from '../../composables/useViewerZoom/useViewerZoom';
import { EViewerMedia } from '../../types/Viewer.enums';

function mountWithComposable({
  container = null,
  zoomDisabled = false,
  max = 100,
  step = 10,
}: {
  container?: HTMLElement | null;
  zoomDisabled?: boolean;
  max?: number;
  step?: number;
} = {}) {
  const containerRef = ref<HTMLElement | null>(container);
  const zoomDisabledRef = computed(() => zoomDisabled);

  let composableResult: any = null;

  const wrapper = mount(
    defineComponent({
      setup() {
        composableResult = useViewerZoom(containerRef, zoomDisabledRef, max, step);
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
    zoomDisabledRef,
  };
}

describe('useViewerZoom', () => {
  let containerEl: HTMLElement;

  beforeEach(() => {
    containerEl = document.createElement('div');
    Object.defineProperty(containerEl, 'getBoundingClientRect', {
      value: () => ({
        left: 10,
        top: 20,
        width: 200,
        height: 100,
      }),
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('onClickMaxZoom', () => {
    it('Should not zoom for VIDEO.', () => {
      const { composableResult } = mountWithComposable({ container: containerEl });
      const mediaItem = { type: EViewerMedia.VIDEO };
      composableResult.zoomCore.setScale(0);
      composableResult.onClickMaxZoom(
        new MouseEvent('click', { clientX: 50, clientY: 60 }),
        mediaItem,
      );

      expect(composableResult.zoomCore.scale).toBe(0);
    });

    it('Should zoom to max for IMAGE when scale is 0.', () => {
      const { composableResult } = mountWithComposable({ container: containerEl, max: 150 });
      const mediaItem = { type: EViewerMedia.IMAGE };
      composableResult.zoomCore.setScale(0);
      composableResult.onClickMaxZoom(
        new MouseEvent('click', { clientX: 50, clientY: 60 }),
        mediaItem,
      );

      expect(composableResult.zoomCore.scale).toBe(150);
    });

    it('Should reset zoom for IMAGE when scale is not 0.', () => {
      const { composableResult } = mountWithComposable({ container: containerEl });
      const mediaItem = { type: EViewerMedia.IMAGE };
      composableResult.zoomCore.setScale(10);
      composableResult.onClickMaxZoom(
        new MouseEvent('click', { clientX: 70, clientY: 80 }),
        mediaItem,
      );

      expect(composableResult.zoomCore.scale).toBe(0);
    });
  });

  describe('onWheel', () => {
    it('Should do nothing if zoomDisabled.', () => {
      const { composableResult } = mountWithComposable({
        container: containerEl,
        zoomDisabled: true,
      });
      const event = new WheelEvent('wheel', { deltaY: -1, clientX: 40, clientY: 50 });
      composableResult.zoomCore.setScale(0);
      // simulate wheel event
      containerEl.dispatchEvent(event);

      expect(composableResult.zoomCore.scale).toBe(0);
    });

    it('Should zoom in on wheel up.', () => {
      const { composableResult } = mountWithComposable({ container: containerEl, step: 10 });
      const event = new WheelEvent('wheel', { deltaY: -1, clientX: 40, clientY: 50 });
      composableResult.zoomCore.setScale(0);
      containerEl.dispatchEvent(event);

      expect(composableResult.zoomCore.scale).toBe(10);
    });

    it('Should zoom out on wheel down.', () => {
      const { composableResult } = mountWithComposable({ container: containerEl, step: 10 });
      composableResult.zoomCore.setScale(20);
      const event = new WheelEvent('wheel', { deltaY: 1, clientX: 40, clientY: 50 });
      containerEl.dispatchEvent(event);

      expect(composableResult.zoomCore.scale).toBe(10);
    });
  });

  describe('Lifecycle', () => {
    it('Should subscribe/unsubscribe to wheel events.', async () => {
      const addEventListenerSpy = vi.spyOn(containerEl, 'addEventListener');
      const removeEventListenerSpy = vi.spyOn(containerEl, 'removeEventListener');
      const { wrapper } = mountWithComposable({ container: containerEl });
      expect(addEventListenerSpy).toHaveBeenCalledWith('wheel', expect.any(Function));
      wrapper.unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith('wheel', expect.any(Function));
    });

    it('Should not subscribe if container is null.', () => {
      const { wrapper } = mountWithComposable({ container: null });

      // No error should be thrown
      wrapper.unmount();
    });
  });
});
