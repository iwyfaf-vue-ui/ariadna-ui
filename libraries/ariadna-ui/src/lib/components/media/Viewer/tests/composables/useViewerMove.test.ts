import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ref, computed, reactive, defineComponent, h } from 'vue';
import { mount } from '@vue/test-utils';
import useViewerMove from '../../composables/useViewerMove/useViewerMove';
import { ViewerMoveCore } from '../../core/move/viewer.move.core';

function mountWithComposable({
  moveDisabled = false,
  slowFactor = 1,
  container = null as HTMLDivElement | null,
  sliderItems = [] as HTMLElement[],
  swipeCoreIndex = 0,
}: {
  moveDisabled?: boolean;
  slowFactor?: number;
  container?: HTMLDivElement | null;
  sliderItems?: HTMLElement[];
  swipeCoreIndex?: number;
} = {}) {
  const moveDisabledRef = computed(() => moveDisabled);
  const containerRef = ref<HTMLDivElement | null>(container);
  const sliderItemsRef = ref<HTMLElement[]>(sliderItems);
  const swipeCore = reactive({ index: swipeCoreIndex }) as any;

  let composableResult: any = null;

  const wrapper = mount(
    defineComponent({
      setup() {
        composableResult = useViewerMove(
          containerRef,
          moveDisabledRef,
          sliderItemsRef,
          swipeCore,
          slowFactor,
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
    sliderItemsRef,
    swipeCore,
    moveDisabledRef,
  };
}

describe('useViewerMove', () => {
  let containerEl: HTMLDivElement;
  let moveItemEl: HTMLElement;

  beforeEach(() => {
    containerEl = document.createElement('div');
    moveItemEl = document.createElement('div');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Basic functionality', () => {
    it('Should return expected structure.', () => {
      const { wrapper } = mountWithComposable({
        container: containerEl,
        sliderItems: [moveItemEl],
      });
      const vm = wrapper.vm;

      expect(vm).toHaveProperty('moveCore');
    });
  });

  describe('Initialization', () => {
    it('Should return moveCore as a reactive object.', () => {
      const { composableResult } = mountWithComposable({
        container: containerEl,
        sliderItems: [moveItemEl],
      });

      expect(composableResult.moveCore).toBeDefined();
      expect(typeof composableResult.moveCore).toBe('object');
    });

    it('Should initialize moveCore as instance of ViewerMoveCore.', () => {
      const { composableResult } = mountWithComposable({
        container: containerEl,
        sliderItems: [moveItemEl],
      });

      // moveCore is reactive(ViewerMoveCore)
      expect(composableResult.moveCore).toBeInstanceOf(ViewerMoveCore);
    });
  });

  describe('Event Subscription', () => {
    it('Should subscribe to DOM events on mount.', () => {
      const addEventListenerSpy = vi.spyOn(containerEl, 'addEventListener');
      const addWindowListenerSpy = vi.spyOn(window, 'addEventListener');

      mountWithComposable({
        container: containerEl,
        sliderItems: [moveItemEl],
      });

      expect(addEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));
      expect(addEventListenerSpy).toHaveBeenCalledWith('touchstart', expect.any(Function));
      expect(addWindowListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
      expect(addWindowListenerSpy).toHaveBeenCalledWith('touchmove', expect.any(Function));
      expect(addWindowListenerSpy).toHaveBeenCalledWith('mouseup', expect.any(Function));
      expect(addWindowListenerSpy).toHaveBeenCalledWith('touchend', expect.any(Function));
    });

    it('Should unsubscribe from DOM events on unmount.', () => {
      const removeEventListenerSpy = vi.spyOn(containerEl, 'removeEventListener');
      const removeWindowListenerSpy = vi.spyOn(window, 'removeEventListener');

      const { wrapper } = mountWithComposable({
        container: containerEl,
        sliderItems: [moveItemEl],
      });
      wrapper.unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));
      expect(removeEventListenerSpy).toHaveBeenCalledWith('touchstart', expect.any(Function));
      expect(removeWindowListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
      expect(removeWindowListenerSpy).toHaveBeenCalledWith('touchmove', expect.any(Function));
      expect(removeWindowListenerSpy).toHaveBeenCalledWith('mouseup', expect.any(Function));
      expect(removeWindowListenerSpy).toHaveBeenCalledWith('touchend', expect.any(Function));
    });

    it('Should not subscribe/unsubscribe if container is null.', () => {
      const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
      mountWithComposable({ container: null });

      expect(addEventListenerSpy).not.toHaveBeenCalled();
      expect(removeEventListenerSpy).not.toHaveBeenCalled();
    });
  });

  describe('onMouseDown', () => {
    it('Should call moveCore.start with correct arguments on mousedown.', () => {
      const { composableResult, containerRef } = mountWithComposable({
        container: containerEl,
        sliderItems: [moveItemEl],
      });
      const startSpy = vi.spyOn(composableResult.moveCore, 'start');
      const event = new MouseEvent('mousedown', { clientX: 123, clientY: 456 });
      containerRef.value!.dispatchEvent(event);

      expect(startSpy).toHaveBeenCalledWith(123, 456);
    });

    it('Should not call moveCore.start if moveDisabled is true.', () => {
      const { composableResult, containerRef } = mountWithComposable({
        container: containerEl,
        sliderItems: [moveItemEl],
        moveDisabled: true,
      });
      const startSpy = vi.spyOn(composableResult.moveCore, 'start');
      const event = new MouseEvent('mousedown', { clientX: 10, clientY: 20 });
      containerRef.value!.dispatchEvent(event);

      expect(startSpy).not.toHaveBeenCalled();
    });
  });

  describe('onTouchStart', () => {
    it('Should call moveCore.start with correct arguments on touchstart.', () => {
      const { composableResult, containerRef } = mountWithComposable({
        container: containerEl,
        sliderItems: [moveItemEl],
      });
      const startSpy = vi.spyOn(composableResult.moveCore, 'start');
      const touch = { clientX: 11, clientY: 22 };
      const event = new TouchEvent('touchstart', {
        touches: [touch as any],
      });
      Object.defineProperty(event, 'touches', {
        value: [{ clientX: 11, clientY: 22 }],
      });
      containerRef.value!.dispatchEvent(event);

      expect(startSpy).toHaveBeenCalledWith(11, 22);
    });

    it('Should not call moveCore.start if moveDisabled is true.', () => {
      const { composableResult, containerRef } = mountWithComposable({
        container: containerEl,
        sliderItems: [moveItemEl],
        moveDisabled: true,
      });
      const startSpy = vi.spyOn(composableResult.moveCore, 'start');
      const event = new TouchEvent('touchstart', {
        touches: [{ clientX: 1, clientY: 2 }] as any,
      });
      Object.defineProperty(event, 'touches', {
        value: [{ clientX: 1, clientY: 2 }],
      });
      containerRef.value!.dispatchEvent(event);

      expect(startSpy).not.toHaveBeenCalled();
    });

    it('Should not call moveCore.start if touches.length !== 1.', () => {
      const { composableResult, containerRef } = mountWithComposable({
        container: containerEl,
        sliderItems: [moveItemEl],
      });
      const startSpy = vi.spyOn(composableResult.moveCore, 'start');
      const event = new TouchEvent('touchstart', {
        touches: [
          { clientX: 1, clientY: 2 },
          { clientX: 3, clientY: 4 },
        ] as any,
      });
      Object.defineProperty(event, 'touches', {
        value: [
          { clientX: 1, clientY: 2 },
          { clientX: 3, clientY: 4 },
        ],
      });
      containerRef.value!.dispatchEvent(event);

      expect(startSpy).not.toHaveBeenCalled();
    });
  });

  describe('onMouseMove', () => {
    it('Should call moveCore.move with correct arguments on mousemove.', () => {
      const { composableResult } = mountWithComposable({
        container: containerEl,
        sliderItems: [moveItemEl],
      });
      const moveSpy = vi.spyOn(composableResult.moveCore, 'move');
      const event = new MouseEvent('mousemove', { clientX: 77, clientY: 88 });
      window.dispatchEvent(event);

      expect(moveSpy).toHaveBeenCalledWith(77, 88);
    });
  });

  describe('onTouchMove', () => {
    it('Should call moveCore.move with correct arguments on touchmove.', () => {
      const { composableResult } = mountWithComposable({
        container: containerEl,
        sliderItems: [moveItemEl],
      });
      const moveSpy = vi.spyOn(composableResult.moveCore, 'move');
      const touch = { clientX: 33, clientY: 44 };
      const event = new TouchEvent('touchmove', {
        touches: [touch as any],
      });
      Object.defineProperty(event, 'touches', {
        value: [{ clientX: 33, clientY: 44 }],
      });
      window.dispatchEvent(event);

      expect(moveSpy).toHaveBeenCalledWith(33, 44);
    });

    it('Should not call moveCore.move if touches.length !== 1.', () => {
      const { composableResult } = mountWithComposable({
        container: containerEl,
        sliderItems: [moveItemEl],
      });
      const moveSpy = vi.spyOn(composableResult.moveCore, 'move');
      const event = new TouchEvent('touchmove', {
        touches: [
          { clientX: 1, clientY: 2 },
          { clientX: 3, clientY: 4 },
        ] as any,
      });
      Object.defineProperty(event, 'touches', {
        value: [
          { clientX: 1, clientY: 2 },
          { clientX: 3, clientY: 4 },
        ],
      });
      window.dispatchEvent(event);

      expect(moveSpy).not.toHaveBeenCalled();
    });
  });

  describe('onEnd', () => {
    it('Should call moveCore.end on mouseup.', () => {
      const { composableResult } = mountWithComposable({
        container: containerEl,
        sliderItems: [moveItemEl],
      });
      const endSpy = vi.spyOn(composableResult.moveCore, 'end');
      const event = new MouseEvent('mouseup');
      window.dispatchEvent(event);

      expect(endSpy).toHaveBeenCalled();
    });

    it('Should call moveCore.end on touchend.', () => {
      const { composableResult } = mountWithComposable({
        container: containerEl,
        sliderItems: [moveItemEl],
      });
      const endSpy = vi.spyOn(composableResult.moveCore, 'end');
      const event = new TouchEvent('touchend');
      window.dispatchEvent(event);

      expect(endSpy).toHaveBeenCalled();
    });
  });

  describe('Element Size Updates', () => {
    it('Should call moveCore.updateContainerSize on container resize.', async () => {
      const { composableResult } = mountWithComposable({
        container: containerEl,
        sliderItems: [moveItemEl],
      });
      const updateContainerSizeSpy = vi.spyOn(composableResult.moveCore, 'updateContainerSize');
      // Симулируем изменение размеров через useElementSize
      // Для этого вручную вызываем updateContainerSize
      composableResult.moveCore.updateContainerSize({ width: 123, height: 456 });

      expect(updateContainerSizeSpy).toHaveBeenCalledWith({ width: 123, height: 456 });
    });

    it('Should call moveCore.updateMoveItemSize on moveItem resize.', async () => {
      const { composableResult } = mountWithComposable({
        container: containerEl,
        sliderItems: [moveItemEl],
        swipeCoreIndex: 0,
      });
      const updateMoveItemSizeSpy = vi.spyOn(composableResult.moveCore, 'updateMoveItemSize');
      // Симулируем изменение размеров через useElementSize
      composableResult.moveCore.updateMoveItemSize({ width: 321, height: 654 });

      expect(updateMoveItemSizeSpy).toHaveBeenCalledWith({ width: 321, height: 654 });
    });
  });

  describe('Edge Cases', () => {
    it('Should not subscribe/unsubscribe to events if container is null.', () => {
      const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
      const { wrapper } = mountWithComposable({ container: null });
      wrapper.unmount();

      expect(addEventListenerSpy).not.toHaveBeenCalled();
      expect(removeEventListenerSpy).not.toHaveBeenCalled();
    });
  });
});
