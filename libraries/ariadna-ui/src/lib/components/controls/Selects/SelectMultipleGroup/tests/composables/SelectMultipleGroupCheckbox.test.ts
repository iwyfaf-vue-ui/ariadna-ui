import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, h, type ModelRef, ref } from 'vue';
import type { TSelectMultipleGroupProps } from '../../SelectMultipleGroup';
import useSelectMultipleGroupCheckbox from '../../composables/useSelectMultipleGroupCheckbox/useSelectMultipleGroupCheckbox';
import { SelectMultipleGroupSelectorTestData } from '../../tests/test-data/SelectMultipleGroup.selector.test-data';

const defaultMock = new SelectMultipleGroupSelectorTestData();

function mountWithComposable(props: TSelectMultipleGroupProps, modelValue: any[] = []) {
  const emits = vi.fn();
  const vModel = ref(modelValue) as unknown as ModelRef<any, string, any, any>;

  return mount(
    defineComponent({
      setup() {
        const result = useSelectMultipleGroupCheckbox(vModel, props);
        return { ...result, emits, vModel };
      },
      render() {
        return h('div');
      },
    }),
  );
}

describe('useSelectMultipleGroupCheckbox', () => {
  describe('multiselectCheckboxChecked', () => {
    it('Should return false when modelValue is empty.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, []);
      const vm = wrapper.vm;

      expect(vm.multiselectCheckboxChecked).toBe(false);
    });

    it('Should return true when modelValue has items.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, [1, 2]);
      const vm = wrapper.vm;

      expect(vm.multiselectCheckboxChecked).toBe(true);
    });

    it('Should return false when modelValue is explicitly an empty array.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, []);
      const vm = wrapper.vm;

      expect(vm.multiselectCheckboxChecked).toBe(false);
    });
  });

  describe('onChangeMultiselectCheckbox', () => {
    it('Should clear all selected options when some options are selected.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, [1, 2]);
      const vm = wrapper.vm;

      vm.onChangeMultiselectCheckbox();

      expect(vm.vModel).toEqual([]);
    });

    it('Should select all options when no options are selected.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, []);
      const vm = wrapper.vm;

      vm.onChangeMultiselectCheckbox();

      // Based on the mock props, we expect all options to be selected
      // The options structure in mockProps has 2 groups with 2 children each
      expect(vm.vModel).toEqual([
        { label: 'Option 1', value: 1 },
        { label: 'Option 2', value: 2 },
        { label: 'Option 3', value: 3 },
        { label: 'Option 4', value: 4 },
      ]);
    });

    it('Should select all option values when optionValue is provided.', () => {
      const propsWithOptionValue = {
        ...defaultMock.mockProps,
        optionValue: 'value',
      };

      const wrapper = mountWithComposable(propsWithOptionValue, []);
      const vm = wrapper.vm;

      vm.onChangeMultiselectCheckbox();

      // When optionValue is provided, we expect only the values to be selected
      expect(vm.vModel).toEqual([1, 2, 3, 4]);
    });

    it('Should clear all selected options when all options are selected.', () => {
      // Select all options first
      const allValues = [1, 2, 3, 4];
      const propsWithOptionValue = {
        ...defaultMock.mockProps,
        optionValue: 'value',
      };

      const wrapper = mountWithComposable(propsWithOptionValue, allValues);
      const vm = wrapper.vm;

      vm.onChangeMultiselectCheckbox();

      expect(vm.vModel).toEqual([]);
    });
  });
});
