import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, h } from 'vue';
import usePanel from '../../composables/usePanel/usePanel';
import type { TPanelProps } from '../../Panel';
import { PanelSelectorTestData } from '../test-data/Panel.selector.test-data';

const defaultMock = new PanelSelectorTestData();

function mountWithComposable(props: TPanelProps, slots: any = {}, route = { path: '/' }) {
  const emits = vi.fn();

  return mount(
    defineComponent({
      setup() {
        const result = usePanel(props);
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

describe('usePanel', () => {
  describe('Basic functionality', () => {
    it('Should return expected structure.', async () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      expect(vm).toBeDefined();
      expect(vm.listeners).toBeDefined();
      expect(vm.componentClasses).toBeDefined();
      expect(vm.listeners.mouseover).toBeDefined();
      expect(vm.listeners.mouseleave).toBeDefined();
      expect(typeof vm.listeners.mouseover).toEqual('function');
      expect(typeof vm.listeners.mouseleave).toEqual('function');
      expect(typeof vm.componentClasses).toEqual('string');
    });

    it('Should expose only mouseover and mouseleave listeners.', async () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      expect(Object.keys(vm.listeners)).toStrictEqual(['mouseover', 'mouseleave']);
    });
  });

  describe('componentClasses ComputedRef', () => {
    it('Should generate base and theme classes correctly when no modifier and not hovered.', async () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      const classes = vm.componentClasses.split(' ');

      const expectedClasses = [
        defaultMock.getSelectorWithoutDot(defaultMock.rootEl),
        defaultMock.getSelectorWithoutDot(defaultMock.themeModifier),
      ];

      expect(classes).toEqual(expect.arrayContaining(expectedClasses));
      expect(classes.length).toBe(expectedClasses.length);
    });

    it('Should include modifier class when modifier is provided.', async () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        modifier: 'primary',
      });
      const vm = wrapper.vm;

      expect(vm.componentClasses).toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.primaryModifier),
      );
    });

    it('Should not include modifier class when modifier is an empty string.', async () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        modifier: '',
      });
      const vm = wrapper.vm;

      const classes = vm.componentClasses.split(' ');

      const expectedClasses = [
        defaultMock.getSelectorWithoutDot(defaultMock.rootEl),
        defaultMock.getSelectorWithoutDot(defaultMock.themeModifier),
      ];

      expect(classes).toEqual(expect.arrayContaining(expectedClasses));
      expect(classes.length).toBe(expectedClasses.length);
    });

    it('Should include hovered class after mouseover is triggered.', async () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      expect(vm.componentClasses).not.toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.hoveredModifier),
      );

      vm.listeners.mouseover();
      expect(vm.componentClasses).toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.hoveredModifier),
      );

      vm.listeners.mouseleave();
      expect(vm.componentClasses).not.toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.hoveredModifier),
      );
    });

    it('Should remove hovered class after mouseleave is triggered following mouseover.', async () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      vm.listeners.mouseover();
      expect(vm.componentClasses).toContain(defaultMock.getSelectorWithoutDot(defaultMock.rootEl));
      expect(vm.componentClasses).toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.hoveredModifier),
      );

      vm.listeners.mouseleave();
      expect(vm.componentClasses).toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.themeModifier),
      );
    });

    it('Should combine base, theme, hovered and modifier classes correctly.', async () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        modifier: defaultMock.modifierProp,
      });
      const vm = wrapper.vm;

      vm.listeners.mouseover();

      expect(vm.componentClasses).toContain(defaultMock.getSelectorWithoutDot(defaultMock.rootEl));
      expect(vm.componentClasses).toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.hoveredModifier),
      );
      expect(vm.componentClasses).toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.primaryModifier),
      );
    });
  });

  describe('listeners ComputedRef', () => {
    it('Should toggle hovered state via listeners and affect componentClasses.', async () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        modifier: defaultMock.modifierProp,
      });
      const vm = wrapper.vm;

      expect(vm.componentClasses).toContain(defaultMock.getSelectorWithoutDot(defaultMock.rootEl));
      expect(vm.componentClasses).toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.primaryModifier),
      );

      vm.listeners.mouseover();
      expect(vm.componentClasses).toContain(defaultMock.getSelectorWithoutDot(defaultMock.rootEl));
      expect(vm.componentClasses).toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.hoveredModifier),
      );
      expect(vm.componentClasses).toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.primaryModifier),
      );

      vm.listeners.mouseleave();
      expect(vm.componentClasses).toContain(defaultMock.getSelectorWithoutDot(defaultMock.rootEl));
      expect(vm.componentClasses).not.toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.hoveredModifier),
      );
      expect(vm.componentClasses).toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.primaryModifier),
      );
    });
  });
});
