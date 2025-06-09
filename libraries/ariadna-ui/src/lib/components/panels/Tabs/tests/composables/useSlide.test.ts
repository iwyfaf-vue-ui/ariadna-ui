import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { defineComponent, h, shallowRef } from 'vue';
import { mount } from '@vue/test-utils';
import useSlide from '../../composables/useSlide/useSlide';
import SlideCore from '../../core/slide/slide.core';

function mountWithComposable(containerRef: any, isSlide: boolean = true) {
  return mount(
    defineComponent({
      setup() {
        const slideCore = useSlide(containerRef, isSlide);
        return { slideCore };
      },
      render() {
        return h('div');
      },
    }),
  );
}

describe('useSlide composable', () => {
  let container: HTMLDivElement;
  let containerRef: any;
  let wrapper: ReturnType<typeof mount>;
  let slideCoreInstance: SlideCore;

  beforeEach(() => {
    container = document.createElement('div');
    container.style.paddingLeft = '10px';
    container.style.paddingRight = '20px';

    // Мокаем getComputedStyle для контейнера
    vi.spyOn(window, 'getComputedStyle').mockImplementation((elt) => {
      if (elt === container) {
        return {
          paddingLeft: '10px',
          paddingRight: '20px',
          // Добавьте другие необходимые свойства, если нужно
        } as CSSStyleDeclaration;
      }
      // Для остальных элементов вызываем оригинальный getComputedStyle
      return window.getComputedStyle(elt);
    });

    containerRef = shallowRef(container);
    wrapper = mountWithComposable(containerRef);
    // @ts-ignore
    slideCoreInstance = wrapper.vm.slideCore;
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
    vi.restoreAllMocks();
  });

  describe('Initialization', () => {
    it('Should initialize SlideCore with default container size and paddings.', () => {
      expect(slideCoreInstance).toBeDefined();
      expect(slideCoreInstance.offset).toBe(0);
      expect(slideCoreInstance.isSliding).toBe(false);
      expect(slideCoreInstance['paddings']).toEqual([10, 20]);
    });
  });

  describe('Event listeners', () => {
    it('Should add event listeners on mount.', () => {
      const addEventListenerSpy = vi.spyOn(container, 'addEventListener');
      const windowAddEventListenerSpy = vi.spyOn(window, 'addEventListener');

      wrapper.unmount();
      wrapper = mountWithComposable(containerRef);

      expect(addEventListenerSpy).toHaveBeenCalledWith('touchstart', expect.any(Function), {
        passive: true,
      });
      expect(windowAddEventListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
      expect(windowAddEventListenerSpy).toHaveBeenCalledWith('mouseup', expect.any(Function), {
        passive: true,
        capture: true,
      });
      expect(windowAddEventListenerSpy).toHaveBeenCalledWith('touchmove', expect.any(Function), {
        passive: true,
      });
      expect(windowAddEventListenerSpy).toHaveBeenCalledWith('touchend', expect.any(Function), {
        passive: true,
        capture: true,
      });
    });

    it('Should remove event listeners on unmount.', () => {
      const removeEventListenerSpy = vi.spyOn(container, 'removeEventListener');
      const windowRemoveEventListenerSpy = vi.spyOn(window, 'removeEventListener');

      wrapper.unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith('touchstart', expect.any(Function));
      expect(windowRemoveEventListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
      expect(windowRemoveEventListenerSpy).toHaveBeenCalledWith(
        'mouseup',
        expect.any(Function),
        true,
      );
      expect(windowRemoveEventListenerSpy).toHaveBeenCalledWith('touchmove', expect.any(Function));
      expect(windowRemoveEventListenerSpy).toHaveBeenCalledWith(
        'touchend',
        expect.any(Function),
        true,
      );
    });
  });

  describe('slideStart', () => {
    it('Should start sliding on mousedown and prevent default.', () => {
      slideCoreInstance.updateContainerSize({ width: 100, scrollWidth: 200 }); // Устанавливаем scrollWidth > width

      const event = new MouseEvent('mousedown', { clientX: 100, bubbles: true, cancelable: true });
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

      container.dispatchEvent(event);

      expect(preventDefaultSpy).toHaveBeenCalled();
      expect(slideCoreInstance.isSliding).toBe(true);
      expect(slideCoreInstance['startX']).toBe(100);
    });

    it('Should not start sliding if scrollWidth <= width.', () => {
      slideCoreInstance.updateContainerSize({ width: 100, scrollWidth: 100 });
      const event = new MouseEvent('mousedown', { clientX: 50, bubbles: true, cancelable: true });
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

      container.dispatchEvent(event);

      expect(preventDefaultSpy).toHaveBeenCalled();
      expect(slideCoreInstance.isSliding).toBe(false);
    });

    it('Should start sliding on single touchstart.', () => {
      slideCoreInstance.updateContainerSize({ width: 100, scrollWidth: 200 });
      const touch = new Touch({ identifier: 1, target: container, clientX: 150, clientY: 0 });
      const event = new TouchEvent('touchstart', {
        touches: [touch],
        bubbles: true,
        cancelable: true,
      });

      container.dispatchEvent(event);

      expect(slideCoreInstance.isSliding).toBe(true);
      expect(slideCoreInstance['startX']).toBe(150);
    });

    it('Should not start sliding on multi-touch touchstart.', () => {
      const touch1 = new Touch({ identifier: 1, target: container, clientX: 150, clientY: 0 });
      const touch2 = new Touch({ identifier: 2, target: container, clientX: 160, clientY: 0 });
      const event = new TouchEvent('touchstart', {
        touches: [touch1, touch2],
        bubbles: true,
        cancelable: true,
      });

      container.dispatchEvent(event);

      expect(slideCoreInstance.isSliding).toBe(false);
    });
  });

  describe('slideMove', () => {
    it('Should call slideMove.', () => {
      slideCoreInstance.updateContainerSize({ width: 100, scrollWidth: 200 });

      slideCoreInstance.slideStart(100);
      const event = new MouseEvent('mousemove', { clientX: 90, bubbles: true, cancelable: true });

      window.dispatchEvent(event);

      expect(slideCoreInstance.offset).toBeGreaterThan(0);
    });

    it('Should not call slideMove if not sliding (mouse).', () => {
      const event = new MouseEvent('mousemove', { clientX: 90, bubbles: true, cancelable: true });
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

      window.dispatchEvent(event);

      expect(preventDefaultSpy).not.toHaveBeenCalled();
      expect(slideCoreInstance.offset).toBe(0);
    });

    it('Should call slideMove if sliding (touch).', () => {
      slideCoreInstance.updateContainerSize({ width: 100, scrollWidth: 200 });

      slideCoreInstance.slideStart(100);
      const touch = new Touch({ identifier: 1, target: container, clientX: 80, clientY: 0 });
      const event = new TouchEvent('touchmove', {
        touches: [touch],
        bubbles: true,
        cancelable: true,
      });

      window.dispatchEvent(event);

      expect(slideCoreInstance.offset).toBeGreaterThan(0);
    });

    it('Should not call slideMove on multi-touch touchmove.', () => {
      slideCoreInstance.slideStart(100);
      const touch1 = new Touch({ identifier: 1, target: container, clientX: 80, clientY: 0 });
      const touch2 = new Touch({ identifier: 2, target: container, clientX: 90, clientY: 0 });
      const event = new TouchEvent('touchmove', {
        touches: [touch1, touch2],
        bubbles: true,
        cancelable: true,
      });

      window.dispatchEvent(event);

      expect(slideCoreInstance.offset).toBe(0);
    });
  });

  describe('slideEnd behavior', () => {
    it('Should stop sliding and stop propagation if slide duration > isClickTimeout (mouseup).', () => {
      // Мокаем Date.now для установки clickStart.value в прошлом
      const startTime = Date.now();
      let now = startTime;
      const nowSpy = vi.spyOn(Date, 'now').mockImplementation(() => now);

      slideCoreInstance.updateContainerSize({ width: 100, scrollWidth: 200 }); // Чтобы slideStart сработал
      // Вызов slideStart, который внутри useSlide установит clickStart.value = Date.now()
      slideCoreInstance.slideStart(100);

      // Смещаем время вперёд больше isClickTimeout (100ms)
      now = startTime + 200;

      const stopPropagationSpy = vi.fn();
      const event = new MouseEvent('mouseup', { bubbles: true, cancelable: true });
      Object.defineProperty(event, 'stopPropagation', { value: stopPropagationSpy });

      window.dispatchEvent(event);

      expect(stopPropagationSpy).toHaveBeenCalled();
      expect(slideCoreInstance.isSliding).toBe(false);

      nowSpy.mockRestore();
    });

    it('Should stop sliding and not stop propagation if slide duration <= isClickTimeout (mouseup).', () => {
      slideCoreInstance.slideStart(100);
      const stopPropagationSpy = vi.fn();
      const event = new MouseEvent('mouseup', { bubbles: true, cancelable: true });
      Object.defineProperty(event, 'stopPropagation', { value: stopPropagationSpy });

      window.dispatchEvent(event);

      expect(stopPropagationSpy).not.toHaveBeenCalled();
      expect(slideCoreInstance.isSliding).toBe(false);
    });

    it('Should stop sliding and not stop propagation if slide duration <= isClickTimeout (touchend).', () => {
      slideCoreInstance.slideStart(100);
      const stopPropagationSpy = vi.fn();
      const event = new TouchEvent('touchend', { bubbles: true, cancelable: true });
      Object.defineProperty(event, 'stopPropagation', { value: stopPropagationSpy });

      window.dispatchEvent(event);

      expect(stopPropagationSpy).not.toHaveBeenCalled();
      expect(slideCoreInstance.isSliding).toBe(false);
    });
  });

  describe('Container size update', () => {
    it('Should update container size when useElementSize triggers callback.', () => {
      slideCoreInstance.updateContainerSize({ width: 123, scrollWidth: 456 });

      expect(slideCoreInstance['containerSize']).toEqual({ width: 123, scrollWidth: 456 });
    });
  });
});
