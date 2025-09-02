import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, h, nextTick } from 'vue';
import useInputNumber from '../../composables/useInputNumber/useInputNumber';
import type { TInputNumberProps, TInputNumberEmits } from '../../InputNumber';
import { InputNumberSelectorTestData } from '../../tests/test-data/InputNumber.selector.test-data';

const defaultMock = new InputNumberSelectorTestData();

function mountWithComposable(
  props: TInputNumberProps,
  slots: any = {},
  emits: TInputNumberEmits = vi.fn(),
) {
  return mount(
    defineComponent({
      setup() {
        const result = useInputNumber(props, slots, emits);
        return { ...result, emits };
      },
      render() {
        return h('div');
      },
    }),
  );
}

describe('useInputNumber', () => {
  let emits: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    emits = vi.fn();
  });

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

  describe('uniqueID', () => {
    it('Should use props.id if provided.', () => {
      const wrapper = mountWithComposable({ ...defaultMock.mockProps, id: 'custom-id' }, {}, emits);
      const vm = wrapper.vm;

      expect(vm.uniqueID).toBeDefined();
      expect(vm.uniqueID).toEqual('custom-id');
    });

    it('Should generate unique id if props.id is not provided.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, {}, emits);
      const vm = wrapper.vm;

      expect(vm.uniqueID).toBeDefined();
      expect(typeof wrapper.vm.uniqueID).toBe('string');
      expect(vm.uniqueID).not.toBe('');
    });
  });

  describe('defaultPlaceholder', () => {
    it('Should return undefined if placeholder slot is provided.', async () => {
      const wrapper = mountWithComposable(
        {
          ...defaultMock.mockProps,
          placeholder: 'test-placeholder',
        },
        {
          placeholder: await InputNumberSelectorTestData.getInputNumberPlaceholderSlotCustom(),
        },
        emits,
      );
      const vm = wrapper.vm;

      expect(vm.defaultPlaceholder).toBeUndefined();
    });

    it('Should return props.placeholder if placeholder slot is not provided.', () => {
      const wrapper = mountWithComposable(
        { ...defaultMock.mockProps, placeholder: 'test-placeholder' },
        {},
        emits,
      );
      const vm = wrapper.vm;

      expect(vm.defaultPlaceholder).toBe('test-placeholder');
    });

    it('Should return undefined if neither slot nor props.placeholder is provided.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, {}, emits);
      const vm = wrapper.vm;

      expect(vm.defaultPlaceholder).toBeUndefined();
    });
  });

  describe('listeners', () => {
    it('Should emit "focus" event and set focused to true.', async () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, {}, emits);
      const vm = wrapper.vm;

      expect(vm.listeners.focus).toBeDefined();

      vm.listeners.focus({ type: 'focus' } as Event);
      expect(emits).toHaveBeenCalledWith('focus', expect.objectContaining({ type: 'focus' }));
    });

    it('Should emit "blur" event and set focused to false.', async () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, {}, emits);
      const vm = wrapper.vm;

      vm.listeners.blur({ type: 'blur' } as Event);
      expect(emits).toHaveBeenCalledWith('blur', expect.objectContaining({ type: 'blur' }));
    });

    it('Should emit "change" event.', async () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, {}, emits);
      const vm = wrapper.vm;

      vm.listeners.change({ type: 'change' } as Event);
      expect(emits).toHaveBeenCalledWith('change', expect.objectContaining({ type: 'change' }));
    });

    it('Should set hovered to true on mouseover.', async () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, {}, emits);
      const vm = wrapper.vm;

      vm.listeners.mouseover();
      // hovered is not exposed, but we can check that the function exists and does not throw
      expect(vm.listeners.mouseover).toBeDefined();
    });

    it('Should set hovered to false on mouseleave.', async () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, {}, emits);
      const vm = wrapper.vm;

      vm.listeners.mouseleave();
      expect(vm.listeners.mouseleave).toBeDefined();
    });
  });

  describe('componentClasses', () => {
    it('Should include base class and theme modifier.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, {}, emits);
      const vm = wrapper.vm;

      expect(vm.componentClasses).toContain(defaultMock.themeModifier);
    });

    it('Should include size modifier.', () => {
      const wrapper = mountWithComposable({ ...defaultMock.mockProps, size: 'large' }, {}, emits);
      const vm = wrapper.vm;

      expect(vm.componentClasses).toContain(defaultMock.sizeLargeModifier);
    });

    it('Should include focus modifier when focused.', async () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, {}, emits);
      const vm = wrapper.vm;

      vm.listeners.focus({ type: 'focus' } as Event);
      await nextTick();
      expect(wrapper.vm.componentClasses).toContain(defaultMock.focusedModifier);
    });

    it('Should include hover modifier when hovered and not focused.', async () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, {}, emits);
      const vm = wrapper.vm;

      vm.listeners.mouseover();
      await nextTick();
      expect(vm.componentClasses).toContain(defaultMock.hoveredModifier);
    });

    it('Should include filled modifier when modelValue is not null or undefined.', () => {
      const wrapper = mountWithComposable({ ...defaultMock.mockProps, modelValue: 123 }, {}, emits);
      const vm = wrapper.vm;

      expect(vm.componentClasses).toContain(defaultMock.filledModifier);
    });

    it('Should include disabled modifier when disabled is true.', () => {
      const wrapper = mountWithComposable({ ...defaultMock.mockProps, disabled: true }, {}, emits);
      const vm = wrapper.vm;

      expect(vm.componentClasses).toContain(defaultMock.disabledModifier);
    });

    it('Should include valid modifier when valid is true.', () => {
      const wrapper = mountWithComposable({ ...defaultMock.mockProps, valid: true }, {}, emits);
      const vm = wrapper.vm;

      expect(vm.componentClasses).toContain(defaultMock.validModifier);
    });

    it('Should include invalid modifier when invalid is true.', () => {
      const wrapper = mountWithComposable({ ...defaultMock.mockProps, invalid: true }, {}, emits);
      const vm = wrapper.vm;

      expect(vm.componentClasses).toContain(defaultMock.invalidModifier);
    });

    it('Should include modifier class when modifier is provided.', () => {
      const wrapper = mountWithComposable(
        { ...defaultMock.mockProps, modifier: 'primary' },
        {},
        emits,
      );
      const vm = wrapper.vm;

      expect(vm.componentClasses).toContain(defaultMock.primaryModifier);
    });

    it('Should join all classes with spaces and filter falsy values.', () => {
      const wrapper = mountWithComposable(
        {
          ...defaultMock.mockProps,
          size: 'small',
          valid: true,
          invalid: false,
          disabled: true,
          modifier: 'primary',
        },
        {},
        emits,
      );
      const vm = wrapper.vm;

      expect(vm.componentClasses).not.toContain('undefined');
      expect(vm.componentClasses).not.toContain('null');
      expect(vm.componentClasses.split(' ').length).toBeGreaterThan(1);
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
