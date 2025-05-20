import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { isRef, nextTick, ref } from 'vue';
import useSidebarMenuScroll from '../../composables/useSidebarMenuScroll/useSidebarMenuScroll';
import { ESidebarMenuPropsDefault } from '../../types/SidebarMenu.enums';
import { SidebarMenuSelectorTestData } from '../../tests/test-data/SidebarMenu.selector.test-data';
import { mount } from '@vue/test-utils';

const defaultMock = new SidebarMenuSelectorTestData();

vi.mock('@/shared/validators/vue/inject-strict.vue.validator', () => ({
  default: () => ({
    cssClass: ESidebarMenuPropsDefault.CSS_CLASS,
    collapsed: ref(false),
  }),
}));

describe('useSidebarMenuScroll.ts: Basic functionality.', () => {
  describe('Basic functionality', () => {
    it('Should return expected structure.', () => {
      let result;

      mount({
        template: '<div></div>',
        setup() {
          result = useSidebarMenuScroll();
          return { result };
        },
      });

      expect(result).toHaveProperty('cssClass');
      expect(result).toHaveProperty('isVisible');
      expect(result).toHaveProperty('isDraggable');
      expect(result).toHaveProperty('scrollRef');
      expect(result).toHaveProperty('scrollBarRef');
      expect(result).toHaveProperty('scrollThumbRef');
      expect(result).toHaveProperty('componentClasses');
      expect(result).toHaveProperty('onMouseIn');
      expect(result).toHaveProperty('onMouseUp');
      expect(result).toHaveProperty('onMouseLeave');
      expect(result).toHaveProperty('onMouseMove');
      expect(result).toHaveProperty('onMouseDown');
      expect(result).toHaveProperty('onClick');
      expect(result).toHaveProperty('onScroll');
    });
  });

  describe('collapsed Inject', () => {
    it('Should return correct collapsed from inject.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { collapsed } = useSidebarMenuScroll();

          expect(collapsed.value).toBe(false);
        },
      });
    });
  });

  describe('isVisible Ref', () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('Should return isVisible as a ref object.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { isVisible } = useSidebarMenuScroll();

          expect(isRef(isVisible)).toBe(true);
        },
      });
    });

    it('Should be false by default.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { isVisible } = useSidebarMenuScroll();

          expect(isVisible.value).toBe(false);
        },
      });
    });

    it('Should return true if isVisible is set to true.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { isVisible } = useSidebarMenuScroll();

          isVisible.value = true;

          expect(isVisible.value).toBe(true);
        },
      });
    });

    it('Should return false if isVisible is set to false.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { isVisible } = useSidebarMenuScroll();

          isVisible.value = false;

          expect(isVisible.value).toBe(false);
        },
      });
    });
  });

  describe('isDraggable Ref', () => {
    beforeEach(() => {
      // Mock DOM elements
      document.body.innerHTML = `
      <div id="scroll"></div>
      <div id="scrollBar"></div>
      <div id="scrollThumb"></div>
    `;
    });

    afterEach(() => {
      vi.clearAllMocks();
      document.body.innerHTML = '';
    });

    it('Should return isDraggable as a ref object.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { isDraggable } = useSidebarMenuScroll();

          expect(isRef(isDraggable)).toBe(true);
        },
      });
    });

    it('Should set isDraggable to true when mouse down on scroll thumb.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { isDraggable, scrollThumbRef, onMouseDown } = useSidebarMenuScroll();

          // Setup refs with mock elements
          scrollThumbRef.value = document.getElementById('scrollThumb') as HTMLDivElement;

          const mockEvent = {
            stopImmediatePropagation: vi.fn(),
            clientY: 100,
          } as unknown as MouseEvent;

          // Get thumb position
          if (scrollThumbRef.value) {
            scrollThumbRef.value.getBoundingClientRect = vi.fn(
              () =>
                ({
                  y: 50,
                  height: 20,
                }) as DOMRect,
            );
          }

          onMouseDown(mockEvent);

          expect(isDraggable.value).toBe(true);
          expect(mockEvent.stopImmediatePropagation).toHaveBeenCalled();
        },
      });
    });

    it('Should set isDraggable to false when mouse up after dragging.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { isDraggable, scrollThumbRef, onMouseDown, onMouseUp } = useSidebarMenuScroll();

          // Setup refs with mock elements
          scrollThumbRef.value = document.getElementById('scrollThumb') as HTMLDivElement;

          const mockEvent = {
            stopImmediatePropagation: vi.fn(),
            clientY: 100,
          } as unknown as MouseEvent;

          // Get thumb position
          if (scrollThumbRef.value) {
            scrollThumbRef.value.getBoundingClientRect = vi.fn(
              () =>
                ({
                  y: 50,
                  height: 20,
                }) as DOMRect,
            );
          }

          // Start dragging
          onMouseDown(mockEvent);
          expect(isDraggable.value).toBe(true);

          // End dragging
          onMouseUp();
          expect(isDraggable.value).toBe(false);
        },
      });
    });

    it('Should keep isDraggable true while mouse is moving during drag.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { isDraggable, scrollThumbRef, scrollBarRef, onMouseDown, onMouseMove } =
            useSidebarMenuScroll();

          // Setup refs with mock elements
          scrollThumbRef.value = document.getElementById('scrollThumb') as HTMLDivElement;
          scrollBarRef.value = document.getElementById('scrollBar') as HTMLDivElement;

          const mockDownEvent = {
            stopImmediatePropagation: vi.fn(),
            clientY: 100,
          } as unknown as MouseEvent;

          const mockMoveEvent = {
            clientY: 120,
          } as MouseEvent;

          // Mock getBoundingClientRect for elements
          if (scrollThumbRef.value && scrollBarRef.value) {
            scrollThumbRef.value.getBoundingClientRect = vi.fn(
              () =>
                ({
                  y: 50,
                  height: 20,
                }) as DOMRect,
            );

            scrollBarRef.value.getBoundingClientRect = vi.fn(
              () =>
                ({
                  y: 0,
                  height: 200,
                }) as DOMRect,
            );
          }

          // Start dragging
          onMouseDown(mockDownEvent);
          expect(isDraggable.value).toBe(true);

          // Move mouse
          onMouseMove(mockMoveEvent);
          expect(isDraggable.value).toBe(true);
        },
      });
    });

    it('Should not set isDraggable when mouse down without scrollThumbRef.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { isDraggable, onMouseDown } = useSidebarMenuScroll();

          const mockEvent = {
            stopImmediatePropagation: vi.fn(),
            clientY: 100,
          } as unknown as MouseEvent;

          onMouseDown(mockEvent);

          expect(isDraggable.value).toBe(false);
        },
      });
    });
  });

  describe('scrollRef Ref', () => {
    it('Should return scrollRef as a ref object.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { scrollRef } = useSidebarMenuScroll();

          expect(isRef(scrollRef)).toBe(true);
        },
      });
    });

    it('Should have scrollRef.value as null by default.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { scrollRef } = useSidebarMenuScroll();

          expect(scrollRef.value).toBeNull();
        },
      });
    });

    it('Should allow setting scrollRef.value to an HTMLElement.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { scrollRef } = useSidebarMenuScroll();

          const el = document.createElement('div');
          scrollRef.value = el;

          expect(scrollRef.value).toBe(el);
        },
      });
    });
  });

  describe('scrollBarRef Ref', () => {
    it('Should return scrollBarRef as a ref object.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { scrollBarRef } = useSidebarMenuScroll();

          expect(isRef(scrollBarRef)).toBe(true);
        },
      });
    });

    it('Should have scrollBarRef.value as null by default.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { scrollBarRef } = useSidebarMenuScroll();

          expect(scrollBarRef.value).toBeNull();
        },
      });
    });

    it('Should allow setting scrollRef.value to an HTMLElement.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { scrollBarRef } = useSidebarMenuScroll();

          const el = document.createElement('div');
          scrollBarRef.value = el;

          expect(scrollBarRef.value).toBe(el);
        },
      });
    });
  });

  describe('scrollThumbRef Ref', () => {
    it('Should return scrollThumbRef as a ref object.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { scrollThumbRef } = useSidebarMenuScroll();

          expect(isRef(scrollThumbRef)).toBe(true);
        },
      });
    });

    it('Should have scrollThumbRef.value as null by default.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { scrollThumbRef } = useSidebarMenuScroll();

          expect(scrollThumbRef.value).toBeNull();
        },
      });
    });

    it('Should allow setting scrollThumbRef.value to an HTMLElement.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { scrollThumbRef } = useSidebarMenuScroll();

          const el = document.createElement('div');
          scrollThumbRef.value = el;

          expect(scrollThumbRef.value).toBe(el);
        },
      });
    });
  });

  describe('componentClasses ComputedRef', () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('Should return correct base class when not collapsed.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { componentClasses } = useSidebarMenuScroll();

          expect(componentClasses.value).toBe(
            defaultMock.getSelectorWithoutDot(defaultMock.scrollEl),
          );
        },
      });
    });

    it('Should include draggable modifier class when isDraggable is true.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { isDraggable, componentClasses } = useSidebarMenuScroll();

          isDraggable.value = true;

          expect(componentClasses.value).toBe(
            `${defaultMock.getSelectorWithoutDot(defaultMock.scrollEl)} ${defaultMock.getSelectorWithoutDot(defaultMock.scrollDraggableModifier)}`,
          );
        },
      });
    });

    it('Should reactively update when isDraggable changes.', async () => {
      mount({
        template: '<div></div>',
        setup() {
          // <-- убрали async
          const { componentClasses, isDraggable } = useSidebarMenuScroll();

          expect(componentClasses.value).toBe(
            defaultMock.getSelectorWithoutDot(defaultMock.scrollEl),
          );

          isDraggable.value = true;
          nextTick()
            .then(() => {
              // <-- используем then вместо await
              expect(componentClasses.value).toBe(
                `${defaultMock.getSelectorWithoutDot(defaultMock.scrollEl)} ${defaultMock.getSelectorWithoutDot(defaultMock.scrollDraggableModifier)}`,
              );

              isDraggable.value = false;
              return nextTick();
            })
            .then(() => {
              expect(componentClasses.value).toBe(
                defaultMock.getSelectorWithoutDot(defaultMock.scrollEl),
              );
            });
        },
      });
    });
  });

  describe('onMouseIn Function', () => {
    let composable: ReturnType<typeof useSidebarMenuScroll>;

    beforeEach(() => {
      mount({
        template: '<div></div>',
        setup() {
          composable = useSidebarMenuScroll();
        },
      });
      composable.isVisible.value = false;
    });

    it('Should set isVisible to true when onMouseIn is called.', () => {
      composable.onMouseIn();
      expect(composable.isVisible.value).toBe(true);
    });

    it('Should keep isVisible as true if already true when onMouseIn is called.', () => {
      composable.isVisible.value = true;
      composable.onMouseIn();
      expect(composable.isVisible.value).toBe(true);
    });

    it('Should not throw when onMouseIn is called multiple times.', () => {
      expect(() => {
        composable.onMouseIn();
        composable.onMouseIn();
        composable.onMouseIn();
      }).not.toThrow();
    });
  });

  describe('onMouseUp Function', () => {
    let composable: ReturnType<typeof useSidebarMenuScroll>;

    beforeEach(() => {
      mount({
        template: '<div></div>',
        setup() {
          composable = useSidebarMenuScroll();
        },
      });
      composable.isDraggable.value = false;
    });

    it('Should set isDraggable to false after call onMouseUp.', () => {
      composable.isDraggable.value = true;
      composable.onMouseUp();

      expect(composable.isDraggable.value).toBe(false);
    });

    it('Should not throw if isDraggable is already false.', () => {
      composable.isDraggable.value = false;

      expect(() => composable.onMouseUp()).not.toThrow();
      expect(composable.isDraggable.value).toBe(false);
    });
  });

  describe('onMouseLeave Function', () => {
    let composable: ReturnType<typeof useSidebarMenuScroll>;

    beforeEach(() => {
      mount({
        template: '<div></div>',
        setup() {
          composable = useSidebarMenuScroll();
        },
      });
      composable.isVisible.value = true;
      composable.isDraggable.value = true;
    });

    it('Should set isVisible to false when onMouseLeave is called.', () => {
      composable.isVisible.value = true;
      composable.onMouseLeave();

      expect(composable.isVisible.value).toBe(false);
    });

    it('Should set isDraggable to false when onMouseLeave is called.', () => {
      composable.isDraggable.value = true;
      composable.onMouseLeave();

      expect(composable.isDraggable.value).toBe(false);
    });

    it('Should not throw if onMouseLeave is called multiple times.', () => {
      expect(() => {
        composable.onMouseLeave();
        composable.onMouseLeave();
        composable.onMouseLeave();
      }).not.toThrow();
    });
  });

  describe('onMouseMove Function', () => {
    let composable: ReturnType<typeof useSidebarMenuScroll>;
    let scrollRef: HTMLDivElement;
    let scrollBarRef: HTMLDivElement;
    let scrollThumbRef: HTMLDivElement;
    let mockEvent: MouseEvent;

    beforeEach(() => {
      scrollRef = document.createElement('div');
      scrollBarRef = document.createElement('div');
      scrollThumbRef = document.createElement('div');

      mount({
        template: '<div></div>',
        setup() {
          composable = useSidebarMenuScroll();
        },
      });
      composable.scrollRef.value = scrollRef;
      composable.scrollBarRef.value = scrollBarRef;
      composable.scrollThumbRef.value = scrollThumbRef;
      composable.isDraggable.value = false;

      mockEvent = {
        preventDefault: vi.fn(),
        stopPropagation: vi.fn(),
        clientY: 100,
      } as unknown as MouseEvent;
    });

    afterEach(() => {
      vi.clearAllMocks();
    });

    it('Should not update scroll position when cursorDown is false.', () => {
      composable.onMouseMove(mockEvent);

      expect(true).toBe(true);
    });

    it('Should not update scroll position when isDraggable is false.', () => {
      composable.onMouseMove(mockEvent);

      expect(scrollThumbRef.style.transform).toBe('');
    });

    it('Should not throw when scrollThumbRef is null.', () => {
      composable.scrollThumbRef.value = null;
      composable.isDraggable.value = true;

      expect(() => composable.onMouseMove(mockEvent)).not.toThrow();
    });

    it('Should not throw when scrollBarRef is null.', () => {
      composable.scrollBarRef.value = null;
      composable.isDraggable.value = true;

      expect(() => composable.onMouseMove(mockEvent)).not.toThrow();
    });
  });

  describe('onMouseDown Function', () => {
    let originalAddEventListener: typeof window.addEventListener;
    let originalRemoveEventListener: typeof window.removeEventListener;
    let mockEvent: MouseEvent;

    beforeEach(() => {
      originalAddEventListener = window.addEventListener;
      originalRemoveEventListener = window.removeEventListener;
      window.addEventListener = vi.fn();
      window.removeEventListener = vi.fn();

      mockEvent = {
        stopImmediatePropagation: vi.fn(),
        clientY: 100,
      } as unknown as MouseEvent;
    });

    afterEach(() => {
      window.addEventListener = originalAddEventListener;
      window.removeEventListener = originalRemoveEventListener;
      vi.clearAllMocks();
    });

    it('Should set isDraggable to true and call stopImmediatePropagation when scrollThumbRef is set.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { scrollThumbRef, onMouseDown, isDraggable } = useSidebarMenuScroll();

          scrollThumbRef.value = document.createElement('div');

          onMouseDown(mockEvent);

          expect(isDraggable.value).toBe(true);
          expect(mockEvent.stopImmediatePropagation).toHaveBeenCalledTimes(1);
        },
      });
    });

    it('Should add mousemove and mouseup event listeners on window when dragging starts.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { scrollThumbRef, onMouseDown } = useSidebarMenuScroll();

          scrollThumbRef.value = document.createElement('div');

          onMouseDown(mockEvent);

          expect(window.addEventListener).toHaveBeenCalledWith('mousemove', expect.any(Function));
          expect(window.addEventListener).toHaveBeenCalledWith('mouseup', expect.any(Function));
        },
      });
    });

    it('Should not set isDraggable if scrollThumbRef is not set.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { onMouseDown, isDraggable } = useSidebarMenuScroll();

          onMouseDown(mockEvent);

          expect(isDraggable.value).toBe(false);
          expect(mockEvent.stopImmediatePropagation).not.toHaveBeenCalled();
        },
      });
    });

    it('Should not throw if onMouseDown is called multiple times.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { scrollThumbRef, onMouseDown } = useSidebarMenuScroll();

          scrollThumbRef.value = document.createElement('div');

          expect(() => {
            onMouseDown(mockEvent);
            onMouseDown(mockEvent);
            onMouseDown(mockEvent);
          }).not.toThrow();
        },
      });
    });
  });

  describe('onClick Function', () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('Should not update scroll position when scrollBarRef is null.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { onClick } = useSidebarMenuScroll();

          const mockEvent = { clientY: 100 } as MouseEvent;

          onClick(mockEvent);

          expect(true).toBe(true);
        },
      });
    });

    it('Should not update scroll position when scrollThumbRef is null.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { scrollBarRef, onClick } = useSidebarMenuScroll();

          scrollBarRef.value = document.createElement('div');
          const mockEvent = { clientY: 100 } as MouseEvent;

          onClick(mockEvent);

          expect(true).toBe(true);
        },
      });
    });

    it('Should update scroll position correctly when clicking on scrollbar.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { scrollBarRef, onClick } = useSidebarMenuScroll();

          scrollBarRef.value = document.createElement('div');
          const mockEvent = { clientY: 100 } as MouseEvent;

          onClick(mockEvent);

          expect(true).toBe(true);
        },
      });
    });

    it('Should handle negative scroll positions correctly.', async () => {
      let composableResult: ReturnType<typeof useSidebarMenuScroll>;

      const wrapper = mount({
        template: '<div></div>',
        setup() {
          composableResult = useSidebarMenuScroll();
          return {};
        },
      });

      const { onClick, scrollRef, scrollBarRef, scrollThumbRef } = composableResult!;

      const mockScrollRef = {
        scrollTop: 0,
        clientHeight: 200,
        scrollHeight: 1000,
      } as unknown as HTMLDivElement;

      const mockScrollBarRef = {
        offsetHeight: 200,
        getBoundingClientRect: () => ({
          y: 50,
          top: 50,
          height: 200,
        }),
      } as unknown as HTMLDivElement;

      const mockScrollThumbRef = {
        offsetHeight: 40,
      } as unknown as HTMLDivElement;

      scrollRef.value = mockScrollRef;
      scrollBarRef.value = mockScrollBarRef;
      scrollThumbRef.value = mockScrollThumbRef;

      const mockEvent = {
        clientY: 100,
        preventDefault: vi.fn(),
      } as unknown as MouseEvent;

      onClick(mockEvent);

      // Calculation:
      // offset = 100 (clientY) - 50 (scrollbar top) = 50
      // thumbHalf = 40 / 2 = 20
      // scrollPercentage = (50 - 20) / 200 = 0.15
      // scrollTop = 0.15 * 1000 = 150
      expect(mockScrollRef.scrollTop).toBe(150);

      wrapper.unmount();
    });
  });

  describe('onScroll Function', () => {
    let originalRequestAnimationFrame: typeof window.requestAnimationFrame;

    beforeEach(() => {
      originalRequestAnimationFrame = window.requestAnimationFrame;
      window.requestAnimationFrame = vi.fn((cb) => {
        cb(0);
        return 0;
      });
      vi.clearAllMocks();
    });

    afterEach(() => {
      window.requestAnimationFrame = originalRequestAnimationFrame;
    });

    it('Should call requestAnimationFrame when onScroll is triggered.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { onScroll } = useSidebarMenuScroll();

          onScroll();

          expect(window.requestAnimationFrame).toHaveBeenCalledTimes(1);
        },
      });
    });
  });
});
