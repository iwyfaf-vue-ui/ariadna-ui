import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, h, ref, shallowRef } from 'vue';
import useVirtualScroller from '../../composables/useVirtualScroller/useVirtualScroller';
import type { TVirtualScrollerProps } from '../../VirtualScroller';
import { VirtualScrollerSelectorTestData } from '../../tests/test-data/VirtualScroller.selector.test-data';

const defaultMock = new VirtualScrollerSelectorTestData();

function createFakeScroller({
  clientHeight,
  scrollTop = 0,
}: {
  clientHeight: number;
  scrollTop?: number;
}) {
  return {
    clientHeight,
    scrollTop,
  } as unknown as HTMLDivElement;
}

function mountWithComposable(props: TVirtualScrollerProps<any>) {
  return mount(
    defineComponent({
      setup() {
        const virtualScrollerRef = shallowRef<HTMLDivElement | null>(
          createFakeScroller({ clientHeight: 50, scrollTop: 0 }),
        );
        const state = ref({ start: 0, end: 10 });
        const visibleItemsIndexes = ref({ start: 0, end: 10 });
        const source = shallowRef(props.items);

        const result = useVirtualScroller(
          props,
          virtualScrollerRef,
          source,
          state,
          visibleItemsIndexes,
        );
        return { ...result, virtualScrollerRef, state, visibleItemsIndexes };
      },
      render() {
        return h('div');
      },
    }),
  );
}

describe('useVirtualScroller', () => {
  describe('dataList', () => {
    it('Should return a list of items based on the current state.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      expect(vm.dataList.length).toBe(10);
      expect(vm.dataList[0].data).toBe('Item 1');
      expect(vm.dataList[9].data).toBe('Item 10');
    });
  });

  describe('getViewCapacity', () => {
    it('Should calculate the number of items that can fit in the container.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      expect(vm.getViewCapacity(400)).toBe(10);
      expect(vm.getViewCapacity(200)).toBe(5);
    });
  });

  describe('calculateRange', () => {
    it('Should update the range of visible items based on the scroll position.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      // Mock scroll position
      wrapper.vm.virtualScrollerRef = createFakeScroller({ clientHeight: 280, scrollTop: 100 });
      vm.calculateRange();

      expect(vm.state.start).toBe(0);
      expect(vm.state.end).toBe(15); // 10 (view capacity) + 5 (overscan)
      expect(vm.visibleItemsIndexes.start).toBe(2);
      expect(vm.visibleItemsIndexes.end).toBe(9);
    });
  });

  describe('scrollTo', () => {
    it('Should scroll to the specified item and update the visible range.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      vm.scrollTo(20);

      wrapper.vm.virtualScrollerRef = createFakeScroller({ clientHeight: 250, scrollTop: 1000 });
      expect(vm.state.start).toBe(16);
      expect(vm.state.end).toBe(28);
      expect(vm.visibleItemsIndexes.start).toBe(20);
      expect(vm.visibleItemsIndexes.end).toBe(22);
    });
  });

  describe('rootStyle', () => {
    it('Should return the correct styles for the root element.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const { rootStyle } = wrapper.vm;

      expect(rootStyle).toEqual({
        overflowY: 'auto',
        position: 'relative',
        height: '300px',
        '--ar-virtual-scroller-item-height': '42px',
      });
    });
  });

  describe('contentStyle', () => {
    it('Should return the correct styles for the content element.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const { contentStyle } = wrapper.vm;

      expect(contentStyle).toEqual({
        height: '4200px',
        transform: 'translateY(0px)',
      });
    });
  });

  describe('componentClasses', () => {
    it('Should include base class and theme modifier.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      expect(vm.componentClasses).toContain(defaultMock.themeModifier);
    });
  });
});
