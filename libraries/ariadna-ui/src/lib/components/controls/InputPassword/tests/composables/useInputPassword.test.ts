import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, h } from 'vue';
import type { TInputPasswordProps } from '../../InputPassword';
import useInputPassword from '../../composables/useInputPassword/useInputPassword';
import { InputPasswordSelectorTestData } from '../test-data/InputPassword.selector.test-data';

const defaultMock = new InputPasswordSelectorTestData();

function mountWithComposable(props: TInputPasswordProps, slots: any = {}) {
  const emits = vi.fn();

  return mount(
    defineComponent({
      setup() {
        const result = useInputPassword(props, slots, emits, vi.fn(), vi.fn());
        return { ...result, emits };
      },
      render() {
        return h('div');
      },
    }),
    {
      global: {
        config: {
          globalProperties: {},
        },
      },
    },
  );
}

describe('useInputPassword', () => {
  describe('Basic functionality', () => {
    it('Should return expected structure.', () => {
      const slots = {};
      const wrapper = mountWithComposable(defaultMock.mockProps, slots);
      const vm = wrapper.vm;

      expect(vm).toHaveProperty('showPassword');
      expect(vm).toHaveProperty('uniqueID');
      expect(vm).toHaveProperty('defaultPlaceholder');
      expect(vm).toHaveProperty('inputType');
      expect(vm).toHaveProperty('listeners');
      expect(vm).toHaveProperty('componentClasses');
      expect(vm).toHaveProperty('togglePassword');
      expect(vm).toHaveProperty('onExpandEnter');
      expect(vm).toHaveProperty('onExpandAfterEnter');
      expect(vm).toHaveProperty('onExpandBeforeLeave');
    });
  });

  describe('uniqueID ComputedRef', () => {
    it('Should return useId as uniqueID if props.id not set.', () => {
      const slots = {};
      const wrapper = mountWithComposable(defaultMock.mockProps, slots);
      const vm = wrapper.vm;

      expect(vm.uniqueID).toBe('v-0');
    });
  });

  describe('defaultPlaceholder ComputedRef', () => {
    it('Should return undefined as defaultPlaceholder if slots.placeholder exists.', () => {
      const slots = { placeholder: () => {} };
      const wrapper = mountWithComposable(defaultMock.mockProps, slots);
      const vm = wrapper.vm;

      expect(vm.defaultPlaceholder).toBeUndefined();
    });

    it('Should return undefined as defaultPlaceholder if slots.placeholder does not exist and props.placeholder npt exist.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      expect(vm.defaultPlaceholder).toBeUndefined();
    });

    it('Should return props.placeholder as defaultPlaceholder if slots.placeholder exist.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        placeholder: defaultMock.placeholderProp,
      });
      const vm = wrapper.vm;

      expect(vm.defaultPlaceholder).toBe(defaultMock.placeholderProp);
    });
  });

  describe('inputType ComputedRef', () => {
    it('Should reflect visibility state in inputType.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      expect(vm.inputType).toBe('password');

      vm.togglePassword();
      expect(vm.inputType).toBe('text');
    });
  });

  describe('listeners ComputedRef', () => {
    it('Should contain all event listeners in listeners.', () => {
      const slots = {};
      const wrapper = mountWithComposable(defaultMock.mockProps, slots);
      const vm = wrapper.vm;

      expect(Object.keys(vm.listeners)).toEqual([
        'focus',
        'blur',
        'change',
        'mouseover',
        'mouseleave',
      ]);
    });

    it('Should onBlur set focused to false and emit blur.', () => {
      const slots = {};
      const wrapper = mountWithComposable(defaultMock.mockProps, slots);
      const vm = wrapper.vm;

      vm.listeners.focus({} as Event);
      vm.listeners.blur({ type: 'blur' } as Event);

      expect(vm.emits).toHaveBeenCalledWith('blur', expect.any(Object));
    });

    it('Should onFocus set focused to true and emit focus.', () => {
      const slots = {};
      const wrapper = mountWithComposable(defaultMock.mockProps, slots);
      const vm = wrapper.vm;

      vm.listeners.focus({ type: 'focus' } as Event);
      expect(vm.emits).toHaveBeenCalledWith('focus', expect.any(Object));
    });

    it('Should onChange emit change.', () => {
      const slots = {};
      const wrapper = mountWithComposable(defaultMock.mockProps, slots);
      const vm = wrapper.vm;

      vm.listeners.change({ type: 'change' } as Event);
      expect(vm.emits).toHaveBeenCalledWith('change', expect.any(Object));
    });

    it('Should onMouseOver set hovered to true.', () => {
      const slots = {};
      const wrapper = mountWithComposable(defaultMock.mockProps, slots);
      const vm = wrapper.vm;

      vm.listeners.mouseover();
      // hovered is internal, so we check via componentClasses
      expect(vm.componentClasses.includes(defaultMock.hoveredModifier)).toBe(true);
    });

    it('Should onMouseLeave set hovered to false.', () => {
      const slots = {};
      const wrapper = mountWithComposable(defaultMock.mockProps, slots);
      const vm = wrapper.vm;

      vm.listeners.mouseover();
      vm.listeners.mouseleave();
      // hovered is internal, so we check via componentClasses
      expect(vm.componentClasses.includes(defaultMock.hoveredModifier)).toBe(false);
    });
  });

  describe('togglePassword Function', () => {
    it('Should toggle password visibility state.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      expect(vm.showPassword).toBe(false);

      vm.togglePassword();
      expect(vm.showPassword).toBe(true);

      vm.togglePassword();
      expect(vm.showPassword).toBe(false);
    });
  });

  describe('componentClasses ComputedRef', () => {
    it('Should generate correct componentClasses for default props.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      const classes = vm.componentClasses.split(' ');

      const expectedClasses = [
        defaultMock.getSelectorWithoutDot(defaultMock.rootEl),
        defaultMock.getSelectorWithoutDot(defaultMock.sizeMediumModifier),
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
        disabled: true,
        valid: true,
        invalid: true,
      });
      const vm = wrapper.vm;

      const classes = vm.componentClasses.split(' ');

      const expectedClasses = [
        defaultMock.getSelectorWithoutDot(defaultMock.rootEl),
        defaultMock.getSelectorWithoutDot(defaultMock.themeModifier),
        defaultMock.getSelectorWithoutDot(defaultMock.filledModifier),
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
