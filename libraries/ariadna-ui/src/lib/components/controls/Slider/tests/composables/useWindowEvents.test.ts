import { describe, it, expect, vi } from 'vitest';
import type { Ref } from 'vue';
import { defineComponent, h, ref } from 'vue';
import { mount } from '@vue/test-utils';
import useWindowEvents from '../../composables/useWindowEvents/useWindowEvents';
import type { TCurrentActivityType } from '../../types/Slider.types';
import { EThumbPosition } from '../../types/Slider.enums';

// Mock всего модуля 'vue' с переопределением useId.
vi.mock('vue', async () => {
  const actual = await vi.importActual<typeof import('vue')>('vue');
  return {
    ...actual,
    useId: () => 'mocked-id',
  };
});

function mountWithComposable() {
  const currentActivity: Ref<TCurrentActivityType | null, TCurrentActivityType | null> = ref(null);
  const touchActive = ref(false);
  const lastTouchPosition = ref(0);

  const onSliderPointerMove = vi.fn();
  const onThumbPointerMove = vi.fn();
  const onSliderPointerUp = vi.fn();
  const onThumbPointerUp = vi.fn();

  return mount(
    defineComponent({
      setup() {
        const events = useWindowEvents(
          currentActivity,
          touchActive,
          lastTouchPosition,
          onSliderPointerMove,
          onThumbPointerMove,
          onSliderPointerUp,
          onThumbPointerUp,
        );
        return {
          ...events,
          currentActivity,
          touchActive,
          lastTouchPosition,
          onSliderPointerMove,
          onThumbPointerMove,
          onSliderPointerUp,
          onThumbPointerUp,
        };
      },
      render() {
        return h('div');
      },
    }),
  );
}

describe('useWindowEvents', () => {
  describe('onWindowMouseMove', () => {
    it('Should not call pointerMove if touchActive is true.', () => {
      const wrapper = mountWithComposable();
      const vm = wrapper.vm;

      vm.touchActive = true;
      const event = { clientX: 100 } as MouseEvent;

      vm.onWindowMouseMove(event);

      expect(vm.onSliderPointerMove).not.toHaveBeenCalled();
      expect(vm.onThumbPointerMove).not.toHaveBeenCalled();
    });

    it('Should call pointerMove with event.clientX if touchActive is false and currentActivity.thumb is false.', () => {
      const wrapper = mountWithComposable();
      const vm = wrapper.vm;

      vm.touchActive = false;
      vm.currentActivity = { thumb: false, thumbData: null };
      const event = { clientX: 123 } as MouseEvent;

      vm.onWindowMouseMove(event);

      expect(vm.onSliderPointerMove).toHaveBeenCalledWith(123);
      expect(vm.onThumbPointerMove).not.toHaveBeenCalled();
    });

    it('Should call pointerMove with event.clientX if touchActive is false and currentActivity.thumb is true with thumbData.', () => {
      const wrapper = mountWithComposable();
      const vm = wrapper.vm;

      vm.touchActive = false;
      vm.currentActivity = {
        thumb: true,
        thumbData: { direction: EThumbPosition.LEFT, index: 1 },
      };
      const event = { clientX: 200 } as MouseEvent;

      vm.onWindowMouseMove(event);

      expect(vm.onThumbPointerMove).toHaveBeenCalledWith(200, 1, EThumbPosition.LEFT);
      expect(vm.onSliderPointerMove).not.toHaveBeenCalled();
    });

    it('Should not call any move callbacks if currentActivity is null.', () => {
      const wrapper = mountWithComposable();
      const vm = wrapper.vm;

      vm.touchActive = false;
      vm.currentActivity = null;
      const event = { clientX: 50 } as MouseEvent;

      vm.onWindowMouseMove(event);

      expect(vm.onSliderPointerMove).not.toHaveBeenCalled();
      expect(vm.onThumbPointerMove).not.toHaveBeenCalled();
    });

    it('Should not call onThumbPointerMove if thumbData is null even if thumb is true.', () => {
      const wrapper = mountWithComposable();
      const vm = wrapper.vm;

      vm.touchActive = false;
      vm.currentActivity = { thumb: true, thumbData: null };
      const event = { clientX: 75 } as MouseEvent;

      vm.onWindowMouseMove(event);

      expect(vm.onSliderPointerMove).not.toHaveBeenCalled();
      expect(vm.onThumbPointerMove).not.toHaveBeenCalled();
    });
  });

  describe('onWindowTouchMove', () => {
    it('Should set touchActive to true.', () => {
      const wrapper = mountWithComposable();
      const vm = wrapper.vm;

      const event = { touches: [{ clientX: 10 }] } as unknown as TouchEvent;

      vm.onWindowTouchMove(event);

      expect(vm.touchActive).toBe(true);
    });

    it('Should not call pointerMove if event.touches length is not 1.', () => {
      const wrapper = mountWithComposable();
      const vm = wrapper.vm;

      const event = { touches: [{ clientX: 10 }, { clientX: 20 }] } as unknown as TouchEvent;

      vm.onWindowTouchMove(event);

      expect(vm.onSliderPointerMove).not.toHaveBeenCalled();
      expect(vm.onThumbPointerMove).not.toHaveBeenCalled();
    });

    it('Should call pointerMove with touch.clientX if touches length is 1 and currentActivity.thumb is false.', () => {
      const wrapper = mountWithComposable();
      const vm = wrapper.vm;

      vm.currentActivity = { thumb: false, thumbData: null };
      const event = { touches: [{ clientX: 42 }] } as unknown as TouchEvent;

      vm.onWindowTouchMove(event);

      expect(vm.lastTouchPosition).toBe(42);
      expect(vm.onSliderPointerMove).toHaveBeenCalledWith(42);
      expect(vm.onThumbPointerMove).not.toHaveBeenCalled();
    });

    it('Should call pointerMove with touch.clientX if touches length is 1 and currentActivity.thumb is true with thumbData.', () => {
      const wrapper = mountWithComposable();
      const vm = wrapper.vm;

      vm.currentActivity = {
        thumb: true,
        thumbData: { direction: EThumbPosition.RIGHT, index: 3 },
      };
      const event = { touches: [{ clientX: 88 }] } as unknown as TouchEvent;

      vm.onWindowTouchMove(event);

      expect(vm.lastTouchPosition).toBe(88);
      expect(vm.onThumbPointerMove).toHaveBeenCalledWith(88, 3, EThumbPosition.RIGHT);
      expect(vm.onSliderPointerMove).not.toHaveBeenCalled();
    });

    it('Should not call any move callbacks if currentActivity is null.', () => {
      const wrapper = mountWithComposable();
      const vm = wrapper.vm;

      vm.currentActivity = null;
      const event = { touches: [{ clientX: 55 }] } as unknown as TouchEvent;

      vm.onWindowTouchMove(event);

      expect(vm.onSliderPointerMove).not.toHaveBeenCalled();
      expect(vm.onThumbPointerMove).not.toHaveBeenCalled();
    });

    it('Should not call onThumbPointerMove if thumbData is null even if thumb is true.', () => {
      const wrapper = mountWithComposable();
      const vm = wrapper.vm;

      vm.currentActivity = { thumb: true, thumbData: null };
      const event = { touches: [{ clientX: 55 }] } as unknown as TouchEvent;

      vm.onWindowTouchMove(event);

      expect(vm.onSliderPointerMove).not.toHaveBeenCalled();
      expect(vm.onThumbPointerMove).not.toHaveBeenCalled();
    });
  });

  describe('onWindowMouseUp', () => {
    it('Should not call pointerUp if touchActive is true.', () => {
      const wrapper = mountWithComposable();
      const vm = wrapper.vm;

      vm.touchActive = true;
      const event = { clientX: 100 } as MouseEvent;

      vm.onWindowMouseUp(event);

      expect(vm.onSliderPointerUp).not.toHaveBeenCalled();
      expect(vm.onThumbPointerUp).not.toHaveBeenCalled();
    });

    it('Should call pointerUp with event.clientX if touchActive is false and currentActivity.thumb is false.', () => {
      const wrapper = mountWithComposable();
      const vm = wrapper.vm;

      vm.touchActive = false;
      vm.currentActivity = { thumb: false, thumbData: null };
      const event = { clientX: 123 } as MouseEvent;

      vm.onWindowMouseUp(event);

      expect(vm.onSliderPointerUp).toHaveBeenCalledWith(123);
      expect(vm.onThumbPointerUp).not.toHaveBeenCalled();
      expect(vm.currentActivity).toBeNull();
    });

    it('Should call pointerUp with event.clientX if touchActive is false and currentActivity.thumb is true with thumbData.', () => {
      const wrapper = mountWithComposable();
      const vm = wrapper.vm;

      vm.touchActive = false;
      vm.currentActivity = {
        thumb: true,
        thumbData: { direction: EThumbPosition.LEFT, index: 2 },
      };
      const event = { clientX: 200 } as MouseEvent;

      vm.onWindowMouseUp(event);

      expect(vm.onThumbPointerUp).toHaveBeenCalledWith(200, 2, EThumbPosition.LEFT);
      expect(vm.onSliderPointerUp).not.toHaveBeenCalled();
      expect(vm.currentActivity).toBeNull();
    });

    it('Should set currentActivity to null if it was null before.', () => {
      const wrapper = mountWithComposable();
      const vm = wrapper.vm;

      vm.touchActive = false;
      vm.currentActivity = null;
      const event = { clientX: 50 } as MouseEvent;

      vm.onWindowMouseUp(event);

      expect(vm.currentActivity).toBeNull();
      expect(vm.onSliderPointerUp).not.toHaveBeenCalled();
      expect(vm.onThumbPointerUp).not.toHaveBeenCalled();
    });

    it('Should not call onThumbPointerUp if thumbData is null even if thumb is true.', () => {
      const wrapper = mountWithComposable();
      const vm = wrapper.vm;

      vm.touchActive = false;
      vm.currentActivity = { thumb: true, thumbData: null };
      const event = { clientX: 75 } as MouseEvent;

      vm.onWindowMouseUp(event);

      expect(vm.onSliderPointerUp).not.toHaveBeenCalled();
      expect(vm.onThumbPointerUp).not.toHaveBeenCalled();
      expect(vm.currentActivity).toBeNull();
    });
  });

  describe('onWindowTouchEnd', () => {
    it('Should set touchActive to true.', () => {
      const wrapper = mountWithComposable();
      const vm = wrapper.vm;

      const event = { touches: [{ clientX: 10 }] } as unknown as TouchEvent;

      vm.onWindowTouchEnd(event);

      expect(vm.touchActive).toBe(true);
    });

    it('Should not call pointerUp if event.touches length is not 1 and lastTouchPosition is falsy.', () => {
      const wrapper = mountWithComposable();
      const vm = wrapper.vm;

      vm.lastTouchPosition = 0;
      const event = { touches: [] } as unknown as TouchEvent;

      vm.onWindowTouchEnd(event);

      expect(vm.onSliderPointerUp).not.toHaveBeenCalled();
      expect(vm.onThumbPointerUp).not.toHaveBeenCalled();
    });

    it('Should call pointerUp with touch.clientX if event.touches length is 1 and currentActivity.thumb is false.', () => {
      const wrapper = mountWithComposable();
      const vm = wrapper.vm;

      vm.currentActivity = { thumb: false, thumbData: null };
      vm.lastTouchPosition = 0;
      const event = { touches: [{ clientX: 42 }] } as unknown as TouchEvent;

      vm.onWindowTouchEnd(event);

      expect(vm.onSliderPointerUp).toHaveBeenCalledWith(42);
      expect(vm.onThumbPointerUp).not.toHaveBeenCalled();
      expect(vm.currentActivity).toBeNull();
    });

    it('Should call pointerUp with touch.clientX if event.touches length is 1 and currentActivity.thumb is true with thumbData.', () => {
      const wrapper = mountWithComposable();
      const vm = wrapper.vm;

      vm.currentActivity = {
        thumb: true,
        thumbData: { direction: EThumbPosition.RIGHT, index: 3 },
      };
      vm.lastTouchPosition = 0;
      const event = { touches: [{ clientX: 88 }] } as unknown as TouchEvent;

      vm.onWindowTouchEnd(event);

      expect(vm.onThumbPointerUp).toHaveBeenCalledWith(88, 3, EThumbPosition.RIGHT);
      expect(vm.onSliderPointerUp).not.toHaveBeenCalled();
      expect(vm.currentActivity).toBeNull();
    });

    it('Should set currentActivity to null if it was null before.', () => {
      const wrapper = mountWithComposable();
      const vm = wrapper.vm;

      vm.currentActivity = null;
      vm.lastTouchPosition = 0;
      const event = { touches: [{ clientX: 50 }] } as unknown as TouchEvent;

      vm.onWindowTouchEnd(event);

      expect(vm.currentActivity).toBeNull();
      expect(vm.onSliderPointerUp).not.toHaveBeenCalled();
      expect(vm.onThumbPointerUp).not.toHaveBeenCalled();
    });

    it('Should not call onThumbPointerUp if thumbData is null even if thumb is true.', () => {
      const wrapper = mountWithComposable();
      const vm = wrapper.vm;

      vm.currentActivity = { thumb: true, thumbData: null };
      vm.lastTouchPosition = 0;
      const event = { touches: [{ clientX: 75 }] } as unknown as TouchEvent;

      vm.onWindowTouchEnd(event);

      expect(vm.onSliderPointerUp).not.toHaveBeenCalled();
      expect(vm.onThumbPointerUp).not.toHaveBeenCalled();
      expect(vm.currentActivity).toBeNull();
    });
  });
});
