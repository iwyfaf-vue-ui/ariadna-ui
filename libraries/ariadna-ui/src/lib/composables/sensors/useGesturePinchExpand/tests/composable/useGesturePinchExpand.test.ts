import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, h, ref, type Ref } from 'vue';
import useGesturePinchExpand from '../../useGesturePinchExpand';
import { EUseGesturePinchExpandType } from '../../types/useGesturePinchExpand.enums';

function mountWithComposable(
  handler: Parameters<typeof useGesturePinchExpand>[0],
  containerRef: Ref<HTMLElement | null>,
  options?: Parameters<typeof useGesturePinchExpand>[2],
) {
  return mount(
    defineComponent({
      setup() {
        useGesturePinchExpand(handler, containerRef, options);
        return {};
      },

      render() {
        return h('div');
      },
    }),
  );
}

describe('useGesturePinchExpand', () => {
  let container: HTMLDivElement;
  let containerRef = ref<HTMLElement | null>(null);
  let handler: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    containerRef = ref(container);
    handler = vi.fn();
  });

  afterEach(() => {
    document.body.innerHTML = '';
    vi.clearAllMocks();
  });

  describe('Event Handling', () => {
    it('Should attach and detach event listeners on the container.', async () => {
      const addSpy = vi.spyOn(container, 'addEventListener');
      const removeSpy = vi.spyOn(container, 'removeEventListener');

      const wrapper = mountWithComposable(handler, containerRef);

      expect(addSpy).toHaveBeenCalledWith('touchstart', expect.any(Function));
      expect(addSpy).toHaveBeenCalledWith('touchmove', expect.any(Function));
      expect(addSpy).toHaveBeenCalledWith('touchend', expect.any(Function));

      wrapper.unmount();

      expect(removeSpy).toHaveBeenCalledWith('touchstart', expect.any(Function));
      expect(removeSpy).toHaveBeenCalledWith('touchmove', expect.any(Function));
      expect(removeSpy).toHaveBeenCalledWith('touchend', expect.any(Function));
    });

    it('Should attach listeners to window if container is null.', async () => {
      const addSpy = vi.spyOn(window, 'addEventListener');
      const removeSpy = vi.spyOn(window, 'removeEventListener');
      const nullRef = ref(null);

      const wrapper = mountWithComposable(handler, nullRef);

      expect(addSpy).toHaveBeenCalledWith('touchstart', expect.any(Function));
      expect(addSpy).toHaveBeenCalledWith('touchmove', expect.any(Function));
      expect(addSpy).toHaveBeenCalledWith('touchend', expect.any(Function));

      wrapper.unmount();

      expect(removeSpy).toHaveBeenCalledWith('touchstart', expect.any(Function));
      expect(removeSpy).toHaveBeenCalledWith('touchmove', expect.any(Function));
      expect(removeSpy).toHaveBeenCalledWith('touchend', expect.any(Function));
    });

    it('Should call handler with type EXPAND when fingers move apart (expand).', async () => {
      mountWithComposable(handler, containerRef);

      // touchstart с двумя пальцами
      const touchStartEvent = new TouchEvent('touchstart', {
        touches: [
          new Touch({ identifier: 1, target: container, clientX: 0, clientY: 0 }),
          new Touch({ identifier: 2, target: container, clientX: 0, clientY: 10 }),
        ],
      });
      container.dispatchEvent(touchStartEvent);

      // touchmove - пальцы раздвигаются
      const touchMoveEvent = new TouchEvent('touchmove', {
        touches: [
          new Touch({ identifier: 1, target: container, clientX: 0, clientY: -10 }),
          new Touch({ identifier: 2, target: container, clientX: 0, clientY: 20 }),
        ],
      });
      container.dispatchEvent(touchMoveEvent);

      expect(handler).toHaveBeenCalledWith(
        expect.objectContaining({
          type: EUseGesturePinchExpandType.EXPAND,
          centerX: 0,
          centerY: 5,
        }),
        expect.any(TouchEvent),
      );
    });

    it('Should call handler with type PINCHING when fingers move closer (pinch).', async () => {
      mountWithComposable(handler, containerRef);

      // touchstart с двумя пальцами
      const touchStartEvent = new TouchEvent('touchstart', {
        touches: [
          new Touch({ identifier: 1, target: container, clientX: 0, clientY: 0 }),
          new Touch({ identifier: 2, target: container, clientX: 0, clientY: 20 }),
        ],
      });
      container.dispatchEvent(touchStartEvent);

      // touchmove - пальцы сближаются
      const touchMoveEvent = new TouchEvent('touchmove', {
        touches: [
          new Touch({ identifier: 1, target: container, clientX: 0, clientY: 5 }),
          new Touch({ identifier: 2, target: container, clientX: 0, clientY: 15 }),
        ],
      });
      container.dispatchEvent(touchMoveEvent);

      expect(handler).toHaveBeenCalledWith(
        expect.objectContaining({
          type: EUseGesturePinchExpandType.PINCHING,
          centerX: 0,
          centerY: 10,
        }),
        expect.any(TouchEvent),
      );
    });

    it('Should not call handler if distance change is less than threshold.', async () => {
      mountWithComposable(handler, containerRef);

      // touchstart с двумя пальцами
      const touchStartEvent = new TouchEvent('touchstart', {
        touches: [
          new Touch({ identifier: 1, target: container, clientX: 0, clientY: 0 }),
          new Touch({ identifier: 2, target: container, clientX: 0, clientY: 10 }),
        ],
      });
      container.dispatchEvent(touchStartEvent);

      // touchmove - пальцы двигаются незначительно (< threshold)
      const touchMoveEvent = new TouchEvent('touchmove', {
        touches: [
          new Touch({ identifier: 1, target: container, clientX: 0, clientY: 1 }),
          new Touch({ identifier: 2, target: container, clientX: 0, clientY: 9 }),
        ],
      });
      container.dispatchEvent(touchMoveEvent);

      expect(handler).not.toHaveBeenCalled();
    });

    it('Should not call handler if less than two fingers are used.', async () => {
      mountWithComposable(handler, containerRef);

      // touchstart с одним пальцем
      const touchStartEvent = new TouchEvent('touchstart', {
        touches: [new Touch({ identifier: 1, target: container, clientX: 0, clientY: 0 })],
      });
      container.dispatchEvent(touchStartEvent);

      // touchmove с одним пальцем
      const touchMoveEvent = new TouchEvent('touchmove', {
        touches: [new Touch({ identifier: 1, target: container, clientX: 0, clientY: 10 })],
      });
      container.dispatchEvent(touchMoveEvent);

      expect(handler).not.toHaveBeenCalled();
    });

    it('Should not call handler if touchend happens before touchmove.', async () => {
      mountWithComposable(handler, containerRef);

      // touchstart с двумя пальцами
      const touchStartEvent = new TouchEvent('touchstart', {
        touches: [
          new Touch({ identifier: 1, target: container, clientX: 0, clientY: 0 }),
          new Touch({ identifier: 2, target: container, clientX: 0, clientY: 10 }),
        ],
      });
      container.dispatchEvent(touchStartEvent);

      // touchend до touchmove
      const touchEndEvent = new TouchEvent('touchend');
      container.dispatchEvent(touchEndEvent);

      // touchmove после touchend (isScaling уже false)
      const touchMoveEvent = new TouchEvent('touchmove', {
        touches: [
          new Touch({ identifier: 1, target: container, clientX: 0, clientY: 5 }),
          new Touch({ identifier: 2, target: container, clientX: 0, clientY: 15 }),
        ],
      });
      container.dispatchEvent(touchMoveEvent);

      expect(handler).not.toHaveBeenCalled();
    });
  });
});
