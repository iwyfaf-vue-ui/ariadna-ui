import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, h } from 'vue';
import type { TSelectSingleProps } from '../../SelectSingle';
import useSelectSingle from '../../composables/useSelectSingle/useSelectSingle';
import { SelectSingleSelectorTestData } from '../../tests/test-data/SelectSingle.selector.test-data';

const defaultMock = new SelectSingleSelectorTestData();

function mountWithComposable(props: TSelectSingleProps, route = { path: '/' }) {
  const emits = vi.fn();

  return mount(
    defineComponent({
      setup() {
        const result = useSelectSingle(props, emits);
        return { ...result, emits };
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

describe('useInputText', () => {
  describe('Basic functionality', () => {
    it('Should return expected structure.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      expect(vm).toHaveProperty('opened');
      expect(vm).toHaveProperty('uniqueID');
      expect(vm).toHaveProperty('listeners');
      expect(vm).toHaveProperty('componentClasses');
      expect(vm).toHaveProperty('onExpandEnter');
      expect(vm).toHaveProperty('onExpandAfterEnter');
      expect(vm).toHaveProperty('onExpandBeforeLeave');
    });
  });

  describe('uniqueID ComputedRef', () => {
    it('Should return useId as uniqueID if props.id not set.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      expect(vm.uniqueID).toBe('v-0');
    });
  });

  describe('listeners ComputedRef', () => {
    it('Should contain all event listeners in listeners.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      expect(Object.keys(vm.listeners)).toEqual(['focus', 'blur', 'mouseover', 'mouseleave']);
    });

    it('Should onBlur set focused to false and emit blur.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      vm.listeners.focus({} as Event);
      vm.listeners.blur({ type: 'blur' } as Event);

      expect(vm.emits).toHaveBeenCalledWith('blur', expect.any(Object));
    });

    it('Should onFocus set focused to true and emit focus.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      vm.listeners.focus({ type: 'focus' } as Event);
      expect(vm.emits).toHaveBeenCalledWith('focus', expect.any(Object));
    });

    it('Should onMouseOver set hovered to true.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      vm.listeners.mouseover();
      // hovered is internal, so we check via componentClasses
      expect(vm.componentClasses.includes(defaultMock.hoveredModifier)).toBe(true);
    });

    it('Should onMouseLeave set hovered to false.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      vm.listeners.mouseover();
      vm.listeners.mouseleave();
      // hovered is internal, so we check via componentClasses
      expect(vm.componentClasses.includes(defaultMock.hoveredModifier)).toBe(false);
    });
  });

  describe('componentClasses ComputedRef', () => {
    it('Should generate correct componentClasses for default props.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      const classes = vm.componentClasses.split(' ');

      const expectedClasses = [
        defaultMock.getSelectorWithoutDot(defaultMock.rootEl),
        defaultMock.getSelectorWithoutDot(defaultMock.themeModifier),
        defaultMock.getSelectorWithoutDot(defaultMock.sizeMediumModifier),
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

    it('Should generate correct componentClasses with modifier.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        modelValue: defaultMock.modelValueProp,
        size: defaultMock.sizeProp,
        disabled: true,
        valid: true,
        invalid: true,
      });
      const vm = wrapper.vm;

      const classes = vm.componentClasses.split(' ');

      const expectedClasses = [
        defaultMock.getSelectorWithoutDot(defaultMock.rootEl),
        defaultMock.getSelectorWithoutDot(defaultMock.themeModifier),
        defaultMock.getSelectorWithoutDot(defaultMock.selectedModifier),
        defaultMock.getSelectorWithoutDot(defaultMock.sizeSmallModifier),
        defaultMock.getSelectorWithoutDot(defaultMock.disabledModifier),
        defaultMock.getSelectorWithoutDot(defaultMock.validModifier),
        defaultMock.getSelectorWithoutDot(defaultMock.invalidModifier),
      ];

      expect(classes).toEqual(expect.arrayContaining(expectedClasses));
      expect(classes.length).toBe(expectedClasses.length);
    });
  });

  describe('onExpandEnter Function', () => {
    it('Should set height on onExpandEnter.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      const el = document.createElement('div');
      Object.defineProperty(el, 'scrollHeight', { value: 123, configurable: true });
      vm.onExpandEnter(el);

      expect(el.style.height).toBe('123px');
    });
  });

  describe('onExpandAfterEnter Function', () => {
    it('Should set height to auto on onExpandAfterEnter.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      const el = document.createElement('div');
      vm.onExpandAfterEnter(el);

      expect(el.style.height).toBe('auto');
    });
  });

  describe('onExpandBeforeLeave Function', () => {
    it('Should set height on onExpandBeforeLeave.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      const el = document.createElement('div');
      Object.defineProperty(el, 'scrollHeight', { value: 456, configurable: true });
      vm.onExpandBeforeLeave(el);

      expect(el.style.height).toBe('456px');
    });
  });
});
