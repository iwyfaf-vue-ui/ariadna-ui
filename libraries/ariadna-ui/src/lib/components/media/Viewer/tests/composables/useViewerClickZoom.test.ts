import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, h } from 'vue';
import useViewerClickZoom from '../../composables/useViewerClickZoom/useViewerClickZoom';

describe('useViewerClickZoom', () => {
  // Хелпер для монтирования composable
  function mountWithComposable() {
    return mount(
      defineComponent({
        setup() {
          useViewerClickZoom();
          return {};
        },
        render() {
          return h('div');
        },
      }),
    );
  }

  let addEventListenerSpy: ReturnType<typeof vi.spyOn>;
  let removeEventListenerSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
  });

  afterEach(() => {
    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });

  describe('Event subscription', () => {
    it('Should subscribe to pointer events on window when mounted.', () => {
      const wrapper = mountWithComposable();

      expect(addEventListenerSpy).toHaveBeenCalledWith('pointerdown', expect.any(Function), true);
      expect(addEventListenerSpy).toHaveBeenCalledWith('pointermove', expect.any(Function), true);
      expect(addEventListenerSpy).toHaveBeenCalledWith('pointerup', expect.any(Function), true);
      wrapper.unmount();
    });

    it('Should unsubscribe from pointer events on window when unmounted.', () => {
      const wrapper = mountWithComposable();
      wrapper.unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'pointerdown',
        expect.any(Function),
        true,
      );
      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'pointermove',
        expect.any(Function),
        true,
      );
      expect(removeEventListenerSpy).toHaveBeenCalledWith('pointerup', expect.any(Function), true);
    });
  });

  describe('Pointer event side-effects', () => {
    let pointerDownHandler: (e: PointerEvent) => void;
    let pointerMoveHandler: (e: PointerEvent) => void;
    let pointerUpHandler: (e: PointerEvent) => void;

    beforeEach(() => {
      mountWithComposable();
      // Получаем последние зарегистрированные обработчики
      const calls = addEventListenerSpy.mock.calls;
      const downCall = calls.find((c) => c[0] === 'pointerdown');
      const moveCall = calls.find((c) => c[0] === 'pointermove');

      const upCall = calls.find((c) => c[0] === 'pointerup');
      if (!downCall || !moveCall || !upCall) {
        throw new Error('Pointer event handlers were not registered on window.');
      }

      pointerDownHandler = downCall[1] as (e: PointerEvent) => void;
      pointerMoveHandler = moveCall[1] as (e: PointerEvent) => void;
      pointerUpHandler = upCall[1] as (e: PointerEvent) => void;
    });

    it('Should not call stopPropagation on pointerup if pointer was not moved beyond threshold.', () => {
      const eventDown = { clientX: 10, clientY: 10 } as PointerEvent;
      const eventUp = {
        stopPropagation: vi.fn(),
        clientX: 12,
        clientY: 12,
      } as unknown as PointerEvent;

      pointerDownHandler(eventDown);
      // Меньше порога (threshold = 5)
      pointerMoveHandler({ clientX: 13, clientY: 12 } as PointerEvent);
      pointerUpHandler(eventUp);

      expect(eventUp.stopPropagation).not.toHaveBeenCalled();
    });

    it('Should call stopPropagation on pointerup if pointer was moved beyond threshold (X axis).', () => {
      const eventDown = { clientX: 10, clientY: 10 } as PointerEvent;
      const eventUp = {
        stopPropagation: vi.fn(),
        clientX: 20,
        clientY: 10,
      } as unknown as PointerEvent;

      pointerDownHandler(eventDown);
      // Превышаем порог по X
      pointerMoveHandler({ clientX: 16, clientY: 10 } as PointerEvent);
      pointerUpHandler(eventUp);

      expect(eventUp.stopPropagation).toHaveBeenCalledTimes(1);
    });

    it('Should call stopPropagation on pointerup if pointer was moved beyond threshold (Y axis).', () => {
      const eventDown = { clientX: 10, clientY: 10 } as PointerEvent;
      const eventUp = {
        stopPropagation: vi.fn(),
        clientX: 10,
        clientY: 20,
      } as unknown as PointerEvent;

      pointerDownHandler(eventDown);
      // Превышаем порог по Y
      pointerMoveHandler({ clientX: 10, clientY: 16 } as PointerEvent);
      pointerUpHandler(eventUp);

      expect(eventUp.stopPropagation).toHaveBeenCalledTimes(1);
    });

    it('Should not call stopPropagation on pointerup if pointermove was not called.', () => {
      const eventDown = { clientX: 10, clientY: 10 } as PointerEvent;
      const eventUp = {
        stopPropagation: vi.fn(),
        clientX: 10,
        clientY: 10,
      } as unknown as PointerEvent;

      pointerDownHandler(eventDown);
      // pointerMove не вызывается
      pointerUpHandler(eventUp);

      expect(eventUp.stopPropagation).not.toHaveBeenCalled();
    });

    it('Should activate drag only if movement exceeds threshold.', () => {
      const eventDown = { clientX: 0, clientY: 0 } as PointerEvent;
      const eventUp = {
        stopPropagation: vi.fn(),
        clientX: 0,
        clientY: 0,
      } as unknown as PointerEvent;

      pointerDownHandler(eventDown);
      // Ровно порог — не должно активировать drag
      pointerMoveHandler({ clientX: 5, clientY: 0 } as PointerEvent);
      pointerUpHandler(eventUp);

      expect(eventUp.stopPropagation).not.toHaveBeenCalled();

      // Превышаем порог
      pointerMoveHandler({ clientX: 6, clientY: 0 } as PointerEvent);
      pointerUpHandler(eventUp);

      expect(eventUp.stopPropagation).toHaveBeenCalledTimes(1);
    });
  });
});
