import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ref, nextTick, defineComponent, h } from 'vue';
import { mount } from '@vue/test-utils';
import useViewerPosition from '../../composables/useViewerPosition/useViewerPosition';
import { ViewerPositionCore } from '../../core/position/viewer.position.core';

function mountWithComposable(items: HTMLElement[] = [], container: HTMLDivElement | null = null) {
  const itemsRef = ref(items);
  const containerRef = ref(container);

  let composableResult: any = null;

  const wrapper = mount(
    defineComponent({
      setup() {
        composableResult = useViewerPosition(itemsRef, containerRef);
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
    itemsRef,
    containerRef,
  };
}

describe('useViewerPosition', () => {
  let containerEl: HTMLDivElement;
  let itemEls: HTMLElement[];

  beforeEach(() => {
    containerEl = document.createElement('div');
    // Задаём размеры контейнера через style, чтобы useElementSize мог их считать
    Object.defineProperty(containerEl, 'offsetWidth', { value: 200, configurable: true });
    Object.defineProperty(containerEl, 'offsetHeight', { value: 100, configurable: true });

    itemEls = [document.createElement('div'), document.createElement('div')];
    Object.defineProperty(itemEls[0], 'offsetWidth', { value: 50, configurable: true });
    Object.defineProperty(itemEls[0], 'offsetHeight', { value: 20, configurable: true });
    Object.defineProperty(itemEls[1], 'offsetWidth', { value: 80, configurable: true });
    Object.defineProperty(itemEls[1], 'offsetHeight', { value: 40, configurable: true });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Basic functionality', () => {
    it('Should return expected structure.', () => {
      const { wrapper } = mountWithComposable(itemEls, containerEl);
      const vm = wrapper.vm;

      expect(vm).toHaveProperty('positionCore');
    });

    it('Should initialize positionCore as instance of ViewerPositionCore.', () => {
      const { composableResult } = mountWithComposable(itemEls, containerEl);

      expect(composableResult.positionCore).toBeInstanceOf(ViewerPositionCore);
    });
  });

  describe('Initialization', () => {
    it('Should calculate correct initial coordinates for items.', async () => {
      const { composableResult } = mountWithComposable(itemEls, containerEl);
      await nextTick();

      // x = (containerWidth - itemWidth)/2, y = (containerHeight - itemHeight)/2
      expect(composableResult.positionCore.coords).toStrictEqual([
        { x: 75, y: 40 }, // (200-50)/2, (100-20)/2
        { x: 60, y: 30 }, // (200-80)/2, (100-40)/2
      ]);
    });

    it('Should handle empty items array.', async () => {
      const { composableResult } = mountWithComposable([], containerEl);
      await nextTick();

      expect(composableResult.positionCore.coords).toStrictEqual([]);
    });

    it('Should handle null container gracefully.', async () => {
      const { composableResult } = mountWithComposable(itemEls, null);

      await nextTick();

      // Координаты не должны быть рассчитаны (по умолчанию 0)
      expect(composableResult.positionCore.coords).toStrictEqual([
        { x: -25, y: -10 }, // (0-50)/2, (0-20)/2
        { x: -40, y: -20 }, // (0-80)/2, (0-40)/2
      ]);
    });
  });

  describe('Edge cases', () => {
    it('Should handle items with zero width/height.', async () => {
      const zeroEl = document.createElement('div');
      Object.defineProperty(zeroEl, 'offsetWidth', { value: 0, configurable: true });
      Object.defineProperty(zeroEl, 'offsetHeight', { value: 0, configurable: true });
      const { composableResult } = mountWithComposable([zeroEl], containerEl);
      await nextTick();
      expect(composableResult.positionCore.coords[0]).toStrictEqual({
        x: 100, // (200-0)/2
        y: 50, // (100-0)/2
      });
    });

    it('Should handle items with negative width/height.', async () => {
      const negEl = document.createElement('div');
      Object.defineProperty(negEl, 'offsetWidth', { value: -20, configurable: true });
      Object.defineProperty(negEl, 'offsetHeight', { value: -10, configurable: true });
      const { composableResult } = mountWithComposable([negEl], containerEl);
      await nextTick();
      expect(composableResult.positionCore.coords[0]).toStrictEqual({
        x: 110, // (200-(-20))/2 = (220)/2 = 110
        y: 55, // (100-(-10))/2 = (110)/2 = 55
      });
    });
  });
});
