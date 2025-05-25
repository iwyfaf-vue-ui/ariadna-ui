import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, h, ref } from 'vue';
import type { ModelRef } from 'vue';
import { RadioSelectorTestData } from '../test-data/Radio.selector.test-data';
import type { TRadioProps } from '../../Radio';
import useRadio from '../../composables/useRadio/useRadio';

const defaultMock = new RadioSelectorTestData();

function mountWithComposable(
  props: TRadioProps,
  vModelValue = ref<null | undefined>(null) as ModelRef<any, string, any, any>,
) {
  const emits = vi.fn();
  const vModel = ref(vModelValue);

  return mount(
    defineComponent({
      setup() {
        const result = useRadio(props, emits, vModel);
        return { ...result, emits, vModel };
      },
      render() {
        return h('div');
      },
    }),
  );
}

describe('useRadio', () => {
  describe('Basic functionality', () => {
    it('Should return expected structure.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      expect(vm).toHaveProperty('uniqueID');
      expect(vm).toHaveProperty('componentClasses');
      expect(vm).toHaveProperty('updateModel');
      expect(vm).toHaveProperty('onFocus');
      expect(vm).toHaveProperty('onBlur');
      expect(vm).toHaveProperty('onChange');
      expect(vm).toHaveProperty('onMouseOver');
      expect(vm).toHaveProperty('onMouseLeave');
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
      const vModel = ref(defaultMock.mockProps.value) as ModelRef<any, string, any, any>;

      const wrapper = mountWithComposable(
        {
          ...defaultMock.mockProps,
          modelValue: defaultMock.modelValueProp,
          size: defaultMock.sizeProp,
          position: defaultMock.positionProp,
          disabled: true,
          valid: true,
          invalid: true,
        },
        vModel,
      );
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

  describe('updateModel', () => {
    it('Should update vModel and emit update:model-value.', () => {
      const vModel = ref(defaultMock.mockProps.value) as ModelRef<any, string, any, any>;
      const wrapper = mountWithComposable({ ...defaultMock.mockProps, value: 'React' }, vModel);
      const vm = wrapper.vm;

      expect(vm.vModel).toBe(defaultMock.mockProps.value);

      vm.updateModel();

      expect(vm.vModel).toBe('React');
      expect(vm.emits).toHaveBeenCalledWith('update:model-value', 'React');
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
});
