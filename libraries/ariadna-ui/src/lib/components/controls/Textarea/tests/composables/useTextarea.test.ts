import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, h } from 'vue';
import { TextareaSelectorTestData } from '../test-data/Textarea.selector.test-data';
import type { TTextareaProps } from '../../Textarea';
import useTextarea from '../../composables/useTextarea/useTextarea';
import { ETextareaPropsDefault } from '../../types/Textarea.enums';

const defaultMock = new TextareaSelectorTestData();

function mountWithComposable(props: TTextareaProps, slots: any = {}, route = { path: '/' }) {
  const emits = vi.fn();

  return mount(
    defineComponent({
      setup() {
        const result = useTextarea(props, slots, emits);
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

describe('useTextarea', () => {
  describe('Basic functionality', () => {
    it('Should return expected structure.', () => {
      const slots = {};
      const wrapper = mountWithComposable(defaultMock.mockProps, slots);
      const vm = wrapper.vm;

      expect(vm).toHaveProperty('uniqueID');
      expect(vm).toHaveProperty('defaultPlaceholder');
      expect(vm).toHaveProperty('listeners');
      expect(vm).toHaveProperty('componentClasses');
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

  describe('componentClasses computed', () => {
    it('Should generate base class correctly', () => {
      const slots = {};
      const wrapper = mountWithComposable(defaultMock.mockProps, slots);
      const vm = wrapper.vm;

      expect(vm.componentClasses).toContain(ETextareaPropsDefault.CSS_CLASS);
    });

    it('Should include modifier class when provided.', () => {
      const slots = {};
      const wrapper = mountWithComposable(
        {
          ...defaultMock.mockProps,
          modifier: defaultMock.modifierProp,
        },
        slots,
      );
      const vm = wrapper.vm;

      expect(vm.componentClasses).toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.primaryModifier),
      );
    });

    it('Should include disabled class when disabled is true.', () => {
      const props = { ...defaultMock.mockProps, disabled: true };
      const slots = {};
      const wrapper = mountWithComposable(props, slots);
      const vm = wrapper.vm;

      expect(vm.componentClasses).toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.disabledModifier),
      );
    });

    it('Should handle undefined props gracefully.', () => {
      const props = { cssClass: 'btn' } as TTextareaProps;
      const slots = {};
      const wrapper = mountWithComposable(props, slots);
      const vm = wrapper.vm;

      expect(vm.componentClasses).toContain('btn');
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
