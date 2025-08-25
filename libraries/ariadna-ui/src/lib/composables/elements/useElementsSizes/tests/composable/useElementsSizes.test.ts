import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ref, defineComponent, h, nextTick, type Ref, type ComputedRef } from 'vue';
import { mount } from '@vue/test-utils';
import useElementsSizes from '../../useElementsSizes';
import type { TUseElementsSizes } from '@/lib/composables/elements/useElementsSizes/types/useElementsSizes.types';

function mountWithComposable(
  elementsRef: Ref<Array<HTMLElement> | null> | ComputedRef<Array<HTMLElement> | null>,
  handler?: (sizes: Array<TUseElementsSizes>) => void,
) {
  return mount(
    defineComponent({
      setup() {
        const result = useElementsSizes(elementsRef, handler);
        return { ...result };
      },

      render() {
        return h('div');
      },
    }),
  );
}

describe('useElementsSizes', () => {
  let el1: HTMLElement;
  let el2: HTMLElement;
  let elementsRef: any;
  let handler: (sizes: Array<TUseElementsSizes>) => void;

  beforeEach(() => {
    el1 = document.createElement('div');
    el2 = document.createElement('div');
    // Устанавливаем начальные размеры
    Object.defineProperties(el1, {
      offsetWidth: { value: 100, configurable: true },
      offsetHeight: { value: 50, configurable: true },
      scrollWidth: { value: 120, configurable: true },
      scrollHeight: { value: 60, configurable: true },
    });
    Object.defineProperties(el2, {
      offsetWidth: { value: 200, configurable: true },
      offsetHeight: { value: 150, configurable: true },
      scrollWidth: { value: 220, configurable: true },
      scrollHeight: { value: 160, configurable: true },
    });
    elementsRef = ref<HTMLElement[]>([el1, el2]);
    handler = vi.fn();
  });

  describe('Initialization', () => {
    it('Should initialize sizes as an empty array if elementsRef is empty.', async () => {
      elementsRef.value = [];
      const wrapper = mountWithComposable(elementsRef, handler);
      const vm = wrapper.vm;

      await nextTick();

      expect(vm).toBeDefined();
      expect(vm.sizes).toEqual([]);
      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler).toHaveBeenCalledWith([]);
    });

    it('Should initialize sizes for a single element.', async () => {
      elementsRef.value = [el1];
      const wrapper = mountWithComposable(elementsRef, handler);
      const vm = wrapper.vm;

      await nextTick();

      expect(vm.sizes).toStrictEqual([
        {
          width: 100,
          height: 50,
          scrollWidth: 120,
          scrollHeight: 60,
        },
      ]);

      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler).toHaveBeenCalledWith([
        {
          width: 100,
          height: 50,
          scrollWidth: 120,
          scrollHeight: 60,
        },
      ]);
    });

    it('Should initialize sizes for multiple elements.', async () => {
      elementsRef.value = [el1, el2];
      const wrapper = mountWithComposable(elementsRef, handler);
      const vm = wrapper.vm;

      await nextTick();

      expect(vm.sizes).toStrictEqual([
        {
          width: 100,
          height: 50,
          scrollWidth: 120,
          scrollHeight: 60,
        },
        {
          width: 200,
          height: 150,
          scrollWidth: 220,
          scrollHeight: 160,
        },
      ]);
      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler).toHaveBeenCalledWith([
        {
          width: 100,
          height: 50,
          scrollWidth: 120,
          scrollHeight: 60,
        },
        {
          width: 200,
          height: 150,
          scrollWidth: 220,
          scrollHeight: 160,
        },
      ]);
    });
  });

  describe('Handler', () => {
    it('Should not call handler if sizes do not change.', async () => {
      mountWithComposable(elementsRef, handler);
      await nextTick();

      // Присваиваем тот же массив (без изменений)
      elementsRef.value = [el1, el2];
      await new Promise((resolve) => setTimeout(resolve, 10));
      await nextTick();

      expect(handler).toHaveBeenCalledTimes(1);
    });
  });

  describe('Unmounting', () => {
    it('Should clean up ResizeObservers on unmount.', async () => {
      const wrapper = mountWithComposable(elementsRef, handler);

      await nextTick();

      // Проверяем, что после размонтирования не возникает ошибок при изменении размеров
      wrapper.unmount();

      // Меняем размеры после размонтирования
      Object.defineProperties(el1, {
        offsetWidth: { value: 500, configurable: true },
        offsetHeight: { value: 550, configurable: true },
        scrollWidth: { value: 520, configurable: true },
        scrollHeight: { value: 560, configurable: true },
      });

      // Не должно быть ошибок и handler не должен вызываться снова
      el1.dispatchEvent(new Event('resize'));
      await new Promise((resolve) => setTimeout(resolve, 10));
      expect(handler).toHaveBeenCalledTimes(1);
    });

    it('Should not throw on repeated mount/unmount.', async () => {
      let wrapper = mountWithComposable(elementsRef, handler);
      const vm = wrapper.vm;

      await nextTick();
      wrapper.unmount();

      // Повторный mount
      wrapper = mountWithComposable(elementsRef, handler);
      await nextTick();

      expect(vm.sizes.length).toBe(2);
      expect(handler).toHaveBeenCalled();
    });
  });
});
