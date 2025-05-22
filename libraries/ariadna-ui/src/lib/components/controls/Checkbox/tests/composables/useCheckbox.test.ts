import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, h, ref } from 'vue';
import type { ModelRef } from 'vue';
import { CheckboxSelectorTestData } from '../test-data/Checkbox.selector.test-data';
import type { TCheckboxProps } from '../../Checkbox';
import useCheckbox from '../../composables/useCheckbox/useCheckbox';

const defaultMock = new CheckboxSelectorTestData();

function mountWithComposable(props: TCheckboxProps, route = { path: '/' }) {
  const emits = vi.fn();
  const modelRef = ref<boolean | undefined>(false) as ModelRef<
    boolean | undefined,
    string,
    boolean | undefined,
    boolean | undefined
  >;

  return mount(
    defineComponent({
      setup() {
        const result = useCheckbox(props, emits, modelRef);
        return { ...result, emits, modelRef };
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

describe('useCheckbox', () => {
  describe('Basic functionality', () => {
    it('Should return expected structure.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      expect(vm).toHaveProperty('uniqueID');
      expect(vm).toHaveProperty('componentClasses');
      expect(vm).toHaveProperty('toggleModel');
      expect(vm).toHaveProperty('onFocus');
      expect(vm).toHaveProperty('onBlur');
      expect(vm).toHaveProperty('onChange');
      expect(vm).toHaveProperty('onMouseOver');
      expect(vm).toHaveProperty('onMouseLeave');
      expect(vm).toHaveProperty('onExpandEnter');
      expect(vm).toHaveProperty('onExpandAfterEnter');
      expect(vm).toHaveProperty('onExpandBeforeLeave');
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
        position: defaultMock.positionProp,
        disabled: true,
        valid: true,
        invalid: true,
      });
      const vm = wrapper.vm;

      const classes = vm.componentClasses.split(' ');

      const expectedClasses = [
        defaultMock.getSelectorWithoutDot(defaultMock.rootEl),
        defaultMock.getSelectorWithoutDot(defaultMock.themeModifier),
        defaultMock.getSelectorWithoutDot(defaultMock.checkedModifier),
        defaultMock.getSelectorWithoutDot(defaultMock.sizeLargeModifier),
        defaultMock.getSelectorWithoutDot(defaultMock.positionRightModifier),
        defaultMock.getSelectorWithoutDot(defaultMock.disabledModifier),
        defaultMock.getSelectorWithoutDot(defaultMock.validModifier),
        defaultMock.getSelectorWithoutDot(defaultMock.invalidModifier),
      ];

      expect(classes).toEqual(expect.arrayContaining(expectedClasses));
      expect(classes.length).toBe(expectedClasses.length);
    });
  });

  describe('toggleModel', () => {
    it('Should toggle vModel value.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      expect(vm.modelRef).toBe(false);

      vm.toggleModel();
      expect(vm.modelRef).toBe(true);

      vm.toggleModel();
      expect(vm.modelRef).toBe(false);
    });
  });

  describe('onFocus', () => {
    it('Should set focused to true and emit focus event.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      const event = new Event('focus');
      vm.onFocus(event);

      expect(vm.emits).toHaveBeenCalledWith('focus', event);
    });
  });

  describe('onBlur', () => {
    it('Should set focused to false and emit blur event.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      const event = new Event('blur');
      vm.onBlur(event);
      expect(vm.emits).toHaveBeenCalledWith('blur', event);
    });
  });

  describe('onChange', () => {
    it('Should emit change event.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      const event = new Event('change');
      vm.onChange(event);

      expect(vm.emits).toHaveBeenCalledWith('change', event);
    });
  });

  describe('onMouseOver', () => {
    it('Should set hovered to true.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      vm.onMouseOver();

      // hovered is private, but covered by class test
      expect(vm.componentClasses).toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.hoveredModifier),
      );
    });
  });

  describe('onMouseLeave', () => {
    it('Should set hovered to false.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      vm.onMouseLeave();
      // hovered is private, but covered by class test
      expect(vm.componentClasses).not.toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.hoveredModifier),
      );
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

  describe('Edge cases', () => {
    it('Should handle undefined optional props gracefully.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        position: undefined,
        modifier: undefined,
        id: undefined,
        name: undefined,
        ariaLabel: undefined,
      });
      const vm = wrapper.vm;

      expect(vm.componentClasses).toBeDefined();
      expect(vm.uniqueID).toBe('v-0');
    });

    it('Should handle errors array.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        errors: ['Error 1', 'Error 2'],
        invalid: true,
      });
      const vm = wrapper.vm;

      expect(vm.componentClasses).toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.invalidModifier),
      );
    });
  });
});
