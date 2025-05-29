import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, h, ref, nextTick } from 'vue';
import useDragViewport from '../../useDragViewport';
import type { TUseDragViewportOptions } from '../../types/useDragViewport.types';

function mountWithComposable(options?: TUseDragViewportOptions, tag: string = 'div') {
  return mount(
    defineComponent({
      setup() {
        const containerRef = ref<HTMLElement | SVGElement | null>(null);
        const targetRef = ref<HTMLElement | SVGElement | null>(null);
        const drag = useDragViewport(containerRef, targetRef, options);
        return { ...drag, containerRef, targetRef };
      },

      render() {
        return h(
          tag,
          { ref: 'containerRef', style: 'width:200px;height:200px;position:relative;' },
          [h(tag, { ref: 'targetRef', style: 'width:100px;height:100px;position:absolute;' })],
        );
      },
    }),
  );
}

describe('useDrag', () => {
  describe('Initialization', () => {
    it('Should initialize with default coordinates and style.', async () => {
      const wrapper = mountWithComposable();
      const vm = wrapper.vm;

      await nextTick();

      expect(vm.x).toBe(0);
      expect(vm.y).toBe(0);
      expect(vm.isDragging).toBe(false);
      expect(vm.style.position).toBe('absolute');
      expect(vm.style.touchAction).toBe('none');
      expect(vm.style.left).toBe(undefined);
      expect(vm.style.top).toBe(undefined);
    });

    it('Should initialize with provided initialPosition.', async () => {
      const wrapper = mountWithComposable({ initialPosition: { x: 42, y: 99 } });
      const vm = wrapper.vm;

      await nextTick();

      expect(vm.x).toBe(42);
      expect(vm.y).toBe(99);
      expect(vm.style.left).toBe('42px');
      expect(vm.style.top).toBe('99px');
    });
  });

  describe('Drag & Drop (HTMLElement)', () => {
    let wrapper: ReturnType<typeof mountWithComposable>;
    let target: HTMLElement;

    beforeEach(async () => {
      wrapper = mountWithComposable();
      await nextTick();

      target = wrapper.vm.targetRef as HTMLElement;
      if (!target) target = wrapper.findAll('div')[1].element as HTMLElement;
    });

    it('Should start dragging on pointerdown and set isDragging to true.', async () => {
      target.dispatchEvent(
        new PointerEvent('pointerdown', { clientX: 10, clientY: 20, bubbles: true }),
      );

      await nextTick();

      expect(wrapper.vm.isDragging).toBe(true);
    });

    // TODO: Should update coordinates on pointermove.
    // it('Should update coordinates on pointermove.', async () => {});

    it('Should stop dragging on pointerup and set isDragging to false.', async () => {
      target.dispatchEvent(
        new PointerEvent('pointerdown', { clientX: 10, clientY: 20, bubbles: true }),
      );
      document.dispatchEvent(
        new PointerEvent('pointermove', { clientX: 30, clientY: 50, bubbles: true }),
      );
      document.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));

      await nextTick();

      expect(wrapper.vm.isDragging).toBe(false);
    });

    it('Should call onDragStart and onDragEnd callbacks.', async () => {
      const onDragStart = vi.fn();
      const onDragEnd = vi.fn();
      const wrapper = mountWithComposable({ onDragStart, onDragEnd });

      await nextTick();

      const target =
        (wrapper.vm.targetRef as HTMLElement) || (wrapper.findAll('div')[1].element as HTMLElement);
      target.dispatchEvent(
        new PointerEvent('pointerdown', { clientX: 1, clientY: 1, bubbles: true }),
      );
      document.dispatchEvent(
        new PointerEvent('pointermove', { clientX: 2, clientY: 2, bubbles: true }),
      );
      document.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));

      await nextTick();

      expect(onDragStart).toHaveBeenCalledTimes(1);
      expect(onDragEnd).toHaveBeenCalledTimes(1);
    });
  });

  describe('Drag & Drop (SVGElement)', () => {
    let wrapper: ReturnType<typeof mountWithComposable>;
    let target: SVGElement;

    beforeEach(async () => {
      wrapper = mountWithComposable(undefined, 'svg');
      await nextTick();
      target = wrapper.vm.targetRef as SVGElement;
      if (!target) target = wrapper.findAll('svg')[1].element as SVGElement;
    });

    it('Should start dragging on pointerdown and set isDragging to true.', async () => {
      target.dispatchEvent(
        new PointerEvent('pointerdown', { clientX: 5, clientY: 5, bubbles: true }),
      );

      await nextTick();

      expect(wrapper.vm.isDragging).toBe(true);
    });

    // TODO: Should update coordinates on pointermove.
    // it('Should update coordinates on pointermove.', async () => {});

    it('Should stop dragging on pointerup and set isDragging to false.', async () => {
      target.dispatchEvent(
        new PointerEvent('pointerdown', { clientX: 5, clientY: 5, bubbles: true }),
      );
      document.dispatchEvent(
        new PointerEvent('pointermove', { clientX: 15, clientY: 25, bubbles: true }),
      );
      document.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));

      await nextTick();

      expect(wrapper.vm.isDragging).toBe(false);
    });
  });

  describe('Viewport boundaries', () => {
    let wrapper: ReturnType<typeof mountWithComposable>;
    let target: HTMLElement;

    beforeEach(async () => {
      // Set window size for boundary tests
      Object.defineProperty(window, 'innerWidth', { value: 200, configurable: true });
      Object.defineProperty(window, 'innerHeight', { value: 200, configurable: true });
      wrapper = mountWithComposable();

      await nextTick();

      target = wrapper.vm.targetRef as HTMLElement;
      if (!target) target = wrapper.findAll('div')[1].element as HTMLElement;
    });

    // TODO: Should not allow dragging beyond right/bottom boundary.
    // it('Should not allow dragging beyond right/bottom boundary.', async () => {});

    it('Should not allow dragging beyond left/top boundary.', async () => {
      target.dispatchEvent(
        new PointerEvent('pointerdown', { clientX: 50, clientY: 50, bubbles: true }),
      );
      document.dispatchEvent(
        new PointerEvent('pointermove', { clientX: -100, clientY: -100, bubbles: true }),
      );

      await nextTick();

      expect(wrapper.vm.x).toBe(0);
      expect(wrapper.vm.y).toBe(0);
    });
  });

  describe('Options: state', () => {
    it('Should remove event listeners when state becomes false.', async () => {
      const addSpy = vi.spyOn(document, 'addEventListener');
      const removeSpy = vi.spyOn(document, 'removeEventListener');

      const state = ref(true);
      const wrapper = mountWithComposable({ state });
      await nextTick();

      // Получаем DOM-элемент через ref или findAll
      let target = wrapper.vm.targetRef;
      if (!target) {
        // Если ref не сработал, ищем второй div (target)
        const allDivs = wrapper.findAll('div');
        if (allDivs.length > 1) {
          target = allDivs[1].element;
        } else if (allDivs.length === 1) {
          target = allDivs[0].element;
        }
      }
      expect(target).toBeDefined();

      // Теперь безопасно вызывать dispatchEvent
      target?.dispatchEvent(
        new PointerEvent('pointerdown', { clientX: 10, clientY: 10, bubbles: true }),
      );
      await nextTick();

      // Проверяем, что слушатели были добавлены
      expect(
        addSpy.mock.calls.some(
          ([event, handler]) => event === 'pointermove' && typeof handler === 'function',
        ),
      ).toBe(true);
      expect(
        addSpy.mock.calls.some(
          ([event, handler]) => event === 'pointerup' && typeof handler === 'function',
        ),
      ).toBe(true);

      // Меняем state на false
      state.value = false;
      await nextTick();

      // Проверяем, что слушатели были удалены
      expect(
        removeSpy.mock.calls.some(
          ([event, handler]) => event === 'pointermove' && typeof handler === 'function',
        ),
      ).toBe(true);
      expect(
        removeSpy.mock.calls.some(
          ([event, handler]) => event === 'pointerup' && typeof handler === 'function',
        ),
      ).toBe(true);

      addSpy.mockRestore();
      removeSpy.mockRestore();
    });
  });

  describe('Options: disabled', () => {
    it('Should not start dragging if disabled is true.', async () => {
      const disabled = ref(true);
      const wrapper = mountWithComposable({ disabled });

      await nextTick();

      const target =
        (wrapper.vm.targetRef as HTMLElement) || (wrapper.findAll('div')[1].element as HTMLElement);
      target.dispatchEvent(
        new PointerEvent('pointerdown', { clientX: 10, clientY: 10, bubbles: true }),
      );

      await nextTick();

      expect(wrapper.vm.isDragging).toBe(false);
    });

    it('Should not update coordinates if disabled is true.', async () => {
      const disabled = ref(true);
      const wrapper = mountWithComposable({ disabled });

      await nextTick();

      const target =
        (wrapper.vm.targetRef as HTMLElement) || (wrapper.findAll('div')[1].element as HTMLElement);
      target.dispatchEvent(
        new PointerEvent('pointerdown', { clientX: 10, clientY: 10, bubbles: true }),
      );
      document.dispatchEvent(
        new PointerEvent('pointermove', { clientX: 30, clientY: 30, bubbles: true }),
      );

      await nextTick();

      expect(wrapper.vm.x).toBe(0);
      expect(wrapper.vm.y).toBe(0);
    });
  });

  describe('initialPosition immutability', () => {
    it('Should not update coordinates if initialPosition changes after mount.', async () => {
      const options = { initialPosition: { x: 10, y: 20 } };
      const wrapper = mountWithComposable(options);

      await nextTick();

      expect(wrapper.vm.x).toBe(10);
      expect(wrapper.vm.y).toBe(20);

      options.initialPosition.x = 99;
      options.initialPosition.y = 88;

      await nextTick();

      expect(wrapper.vm.x).toBe(10);
      expect(wrapper.vm.y).toBe(20);
    });
  });

  describe('Event handlers', () => {
    it('Should remove event listeners on unmount.', async () => {
      const addSpy = vi.spyOn(document, 'addEventListener');
      const removeSpy = vi.spyOn(document, 'removeEventListener');

      const wrapper = mountWithComposable();
      await nextTick();

      const target =
        (wrapper.vm.targetRef as HTMLElement) || (wrapper.findAll('div')[1].element as HTMLElement);
      target.dispatchEvent(
        new PointerEvent('pointerdown', { clientX: 10, clientY: 10, bubbles: true }),
      );
      await nextTick();

      // Проверяем, что слушатели были добавлены
      expect(addSpy).toHaveBeenCalledWith('pointermove', expect.any(Function));
      expect(addSpy).toHaveBeenCalledWith('pointerup', expect.any(Function));

      wrapper.unmount();
      await nextTick();

      // Проверяем, что слушатели были удалены
      expect(removeSpy).toHaveBeenCalledWith('pointermove', expect.any(Function));
      expect(removeSpy).toHaveBeenCalledWith('pointerup', expect.any(Function));

      addSpy.mockRestore();
      removeSpy.mockRestore();
    });
  });
});
