import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, h } from 'vue';
import type { THeaderProps } from '../../Header';
import { EHeaderPropsDefault } from '../../types/Header.enums';
import useHeader from '../../composables/useHeader/useHeader';
import { HeaderSelectorTestData } from '../test-data/Header.selector.test-data';

const defaultMock = new HeaderSelectorTestData();

function mountWithComposable(props: THeaderProps, route = { path: '/' }) {
  return mount(
    defineComponent({
      setup() {
        const result = useHeader(props);
        return { ...result };
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

describe('useHeader', () => {
  describe('Basic functionality', () => {
    it('Should return expected structure.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      expect(vm).toHaveProperty('listeners');
      expect(vm).toHaveProperty('componentClasses');
      expect(vm.listeners).toHaveProperty('mouseover');
      expect(vm.listeners).toHaveProperty('mouseleave');
      expect(typeof vm.listeners.mouseover).toBe('function');
      expect(typeof vm.listeners.mouseleave).toBe('function');
      expect(typeof vm.componentClasses).toBe('string');
    });
  });

  describe('componentClasses ComputedRef', () => {
    it('Should generate base and theme classes correctly for default props.', () => {
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

    it('Should include modifier class when provided.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        modifier: defaultMock.modifierProp,
      });
      const vm = wrapper.vm;

      expect(vm.componentClasses).toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.primaryModifier),
      );
    });

    it('Should include hovered class when mouseover is triggered.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      expect(vm.componentClasses).not.toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.hoveredModifier),
      );

      vm.listeners.mouseover();

      expect(vm.componentClasses).toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.hoveredModifier),
      );
    });

    it('Should remove hovered class when mouseleave is triggered after mouseover.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      vm.listeners.mouseover();
      expect(vm.componentClasses).toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.hoveredModifier),
      );

      vm.listeners.mouseleave();
      expect(vm.componentClasses).not.toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.hoveredModifier),
      );
    });

    it('Should combine base, theme, hovered and modifier classes correctly.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        modifier: 'secondary',
      });
      const vm = wrapper.vm;

      vm.listeners.mouseover();

      const classes = vm.componentClasses.split(' ');

      const expectedClasses = [
        EHeaderPropsDefault.CSS_CLASS,
        defaultMock.getSelectorWithoutDot(defaultMock.rootEl),
        defaultMock.getSelectorWithoutDot(defaultMock.themeModifier),
        `${EHeaderPropsDefault.CSS_CLASS}--secondary`,
      ];

      expect(classes).toEqual(expect.arrayContaining(expectedClasses));
      expect(classes.length).toBe(expectedClasses.length);
    });
  });

  describe('listeners ComputedRef', () => {
    it('Should contain all event listeners in listeners.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      expect(Object.keys(vm.listeners)).toEqual(['mouseover', 'mouseleave']);
    });

    it('Should expose mouseover and mouseleave handlers.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      expect(vm.listeners.mouseover).toBeDefined();
      expect(vm.listeners.mouseleave).toBeDefined();
      expect(typeof vm.listeners.mouseover).toBe('function');
      expect(typeof vm.listeners.mouseleave).toBe('function');
    });

    it('Should toggle hovered state via listeners and affect componentClasses.', () => {
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
  });
});
