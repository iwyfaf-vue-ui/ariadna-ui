import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import VirtualScroller from '../../VirtualScroller.vue';
import { VirtualScrollerSelectorTestData } from '../../tests/test-data/VirtualScroller.selector.test-data';

const defaultMock = new VirtualScrollerSelectorTestData();

describe('VirtualScroller', () => {
  describe('Basic Render', () => {
    const wrapper = mount(VirtualScroller, {
      props: defaultMock.mockProps,
    });

    it('Should render the component with default props.', () => {
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find(defaultMock.rootEl).exists()).toBe(true);
      expect(wrapper.find(defaultMock.contentEl).exists()).toBe(true);
    });

    it('Should render the correct number of visible items.', () => {
      const items = wrapper.findAll(defaultMock.itemEl);
      expect(items.length).toBe(10);
    });
  });

  describe('Props', () => {
    it('items: Should handle empty items array.', async () => {
      const wrapper = mount(VirtualScroller, {
        props: defaultMock.mockProps,
      });

      await wrapper.setProps({ items: [] });
      const items = wrapper.findAll(defaultMock.itemEl);
      expect(items.length).toBe(0);
    });

    it('itemHeight: Should apply correct item height based on itemHeight prop', () => {
      const wrapper = mount(VirtualScroller, {
        props: defaultMock.mockProps,
      });

      const rootStyle = wrapper.find(defaultMock.rootEl).attributes('style');
      expect(rootStyle).toContain(
        `--ar-virtual-scroller-item-height: ${defaultMock.mockProps.itemHeight}px`,
      );
    });

    it('height: Should apply default height prop.', async () => {
      const wrapper = mount(VirtualScroller, {
        props: defaultMock.mockProps,
      });

      const rootStyle = wrapper.find(defaultMock.rootEl).attributes('style');

      expect(rootStyle).toContain('height: 300px');
    });

    it('height: Should apply custom height prop.', async () => {
      const wrapper = mount(VirtualScroller, {
        props: defaultMock.mockProps,
      });

      await wrapper.setProps({ height: 500 });
      const rootStyle = wrapper.find(defaultMock.rootEl).attributes('style');

      expect(rootStyle).toContain('height: 500px');
    });

    it('overscan: Should render correct number of items based on overscan prop', () => {
      const wrapper = mount(VirtualScroller, {
        props: defaultMock.mockProps,
      });

      // Проверяем, что количество отображаемых элементов равно overscan * 2 + видимые элементы
      const visibleItems = wrapper.findAll('.ar-virtual-scroller__item');
      const expectedCount =
        defaultMock.mockProps.overscan! * 2 + Math.ceil(wrapper.element.clientHeight / 50);
      expect(visibleItems.length).toBe(expectedCount);
    });

    it('cssClass: Should apply custom root class and generate BEM child classes.', async () => {
      const _defaultMock = new VirtualScrollerSelectorTestData(defaultMock.cssClassProp);

      const wrapper = mount(VirtualScroller, {
        props: {
          ...defaultMock.mockProps,
          cssClass: defaultMock.cssClassProp,
        },
      });

      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.rootEl)).exists()).toBe(true);
      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.contentEl)).exists()).toBe(
        true,
      );
      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.itemEl)).exists()).toBe(true);
      expect(
        wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.themeModifier)).exists(),
      ).toBe(true);
    });
  });

  describe('Slots', () => {
    it('default: Should render default Default slot.', async () => {
      const wrapper = mount(VirtualScroller, {
        props: defaultMock.mockProps,
      });

      expect(wrapper.find(defaultMock.getSelectorWithDot(defaultMock.itemEl)).exists()).toBe(true);
      expect(wrapper.find(defaultMock.itemEl).element.innerHTML).toBe(
        await VirtualScrollerSelectorTestData.getVirtualScrollerDefaultSlotDefault(),
      );
    });

    it('default: Should render custom Default slot.', async () => {
      const wrapper = mount(VirtualScroller, {
        props: defaultMock.mockProps,
        slots: {
          default: await VirtualScrollerSelectorTestData.getVirtualScrollerDefaultSlotCustom(),
        },
      });

      expect(wrapper.find(defaultMock.getSelectorWithDot(defaultMock.itemEl)).exists()).toBe(true);
      expect(wrapper.find(defaultMock.itemEl).element.innerHTML).toBe(
        await VirtualScrollerSelectorTestData.getVirtualScrollerDefaultSlotCustom(),
      );
    });
  });
});
