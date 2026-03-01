import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, h } from 'vue';
import usePanelCollapse from '../../composables/usePanelCollapse/usePanelCollapse';
import type { TPanelEmits, TPanelProps } from '../../Panel';
import { PanelSelectorTestData } from '../test-data/Panel.selector.test-data';

const defaultMock = new PanelSelectorTestData();

function mountWithComposable(props: TPanelProps, slots: any = {}, route = { path: '/' }) {
  const emits = vi.fn() as unknown as TPanelEmits;

  return mount(
    defineComponent({
      setup() {
        const result = usePanelCollapse(props, emits);
        return { ...result, emits, slots };
      },
      render() {
        return h('div');
      },
    }),
    {
      global: {
        config: {
          globalProperties: {
            $route: route,
          },
        },
      },
    },
  );
}

describe('usePanelCollapse', () => {
  describe('Initialization', () => {
    it('Should initialize isInnerCollapsed as false when collapsed prop is not provided.', async () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        toggleable: true,
      });

      expect(wrapper.vm).toBeDefined();
      expect(wrapper.vm.isInnerCollapsed).toBeDefined();
      expect(wrapper.vm.isInnerCollapsed).toEqual(false);
    });

    it('Should initialize isInnerCollapsed as false when collapsed prop is false.', async () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        collapsed: false,
      });

      expect(wrapper.vm.isInnerCollapsed).toBeDefined();
      expect(wrapper.vm.isInnerCollapsed).toEqual(false);
    });

    it('Should initialize isInnerCollapsed as true when collapsed prop is true.', async () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        collapsed: true,
      });

      expect(wrapper.vm.isInnerCollapsed).toBeDefined();
      expect(wrapper.vm.isInnerCollapsed).toEqual(true);
    });
  });

  describe('collapseHandler', () => {
    it('Should toggle isInnerCollapsed from false to true and emit toggle event with correct payload.', async () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        collapsed: false,
      });

      const vm = wrapper.vm;
      const event = new Event('click');

      expect(vm.collapseHandler).toBeDefined();
      expect(vm.isInnerCollapsed).toEqual(false);

      vm.collapseHandler(event);

      expect(vm.isInnerCollapsed).toEqual(true);
      expect(vm.emits).toBeDefined();
      expect(vm.emits).toHaveBeenCalledTimes(1);
      expect(vm.emits).toHaveBeenCalledWith('toggle', {
        originalEvent: event,
        value: true,
      });
    });

    it('Should toggle isInnerCollapsed from true to false and emit toggle event with correct payload.', async () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        collapsed: true,
      });

      const vm = wrapper.vm;
      const event = new Event('click');

      expect(vm.isInnerCollapsed).toEqual(true);

      vm.collapseHandler(event);

      expect(vm.isInnerCollapsed).toEqual(false);
      expect(vm.emits).toHaveBeenCalledTimes(1);
      expect(vm.emits).toHaveBeenCalledWith('toggle', {
        originalEvent: event,
        value: false,
      });
    });

    it('Should emit toggle event on each call with updated value.', async () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        collapsed: false,
      });

      const vm = wrapper.vm;
      const event1 = new Event('click');
      const event2 = new Event('click');

      vm.collapseHandler(event1);
      vm.collapseHandler(event2);

      expect(vm.emits).toHaveBeenCalledTimes(2);
      expect(vm.emits).toHaveBeenNthCalledWith(1, 'toggle', {
        originalEvent: event1,
        value: true,
      });
      expect(vm.emits).toHaveBeenNthCalledWith(2, 'toggle', {
        originalEvent: event2,
        value: false,
      });
    });
  });

  describe('collapseClasses', () => {
    it('Should return empty string when isInnerCollapsed is false.', async () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        collapsed: false,
      });

      const vm = wrapper.vm;

      expect(vm.collapseClasses).toBeDefined();
      expect(vm.isInnerCollapsed).toEqual(false);
      expect(vm.collapseClasses).toEqual('');
    });

    it('Should return collapsed modifier class when isInnerCollapsed is true.', async () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        collapsed: true,
      });

      const vm = wrapper.vm;

      expect(vm.isInnerCollapsed).toEqual(true);
      expect(vm.collapseClasses).toEqual(
        defaultMock.getSelectorWithoutDot(defaultMock.collapsedModifier),
      );
    });

    it('Should update collapseClasses after collapseHandler toggles state.', async () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        collapsed: false,
      });

      const vm = wrapper.vm;
      const event = new Event('click');

      expect(vm.collapseClasses).toEqual('');

      vm.collapseHandler(event);
      expect(vm.collapseClasses).toEqual(
        defaultMock.getSelectorWithoutDot(defaultMock.collapsedModifier),
      );

      vm.collapseHandler(event);
      expect(vm.collapseClasses).toEqual('');
    });
  });

  describe('Transition handlers', () => {
    it('Should set element height to scrollHeight px on enter.', async () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      const el = document.createElement('div');

      Object.defineProperty(el, 'scrollHeight', {
        value: 123,
        configurable: true,
      });

      expect(vm.onCollapseEnter).toBeDefined();

      vm.onCollapseEnter(el);

      expect((el as HTMLElement).style.height).toEqual('123px');
    });

    it('Should reset element height to empty string after enter.', async () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      const el = document.createElement('div');
      (el as HTMLElement).style.height = '200px';

      expect((el as HTMLElement).style.height).toEqual('200px');

      vm.onCollapseAfterEnter(el);

      expect((el as HTMLElement).style.height).toEqual('');
    });

    it('Should set element height to scrollHeight px before leave.', async () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      const el = document.createElement('div');

      Object.defineProperty(el, 'scrollHeight', {
        value: 77,
        configurable: true,
      });

      vm.onCollapseBeforeLeave(el);

      expect((el as HTMLElement).style.height).toEqual('77px');
    });
  });
});
