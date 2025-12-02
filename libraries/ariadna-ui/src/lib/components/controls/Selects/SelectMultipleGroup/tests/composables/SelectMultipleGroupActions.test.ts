import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, h, type ModelRef, ref } from 'vue';
import type { TSelectMultipleGroupProps } from '../../SelectMultipleGroup';
import useSelectMultipleGroupActions from '../../composables/useSelectMultipleGroupActions/useSelectMultipleGroupActions';
import { SelectMultipleGroupSelectorTestData } from '../../tests/test-data/SelectMultipleGroup.selector.test-data';

const defaultMock = new SelectMultipleGroupSelectorTestData();

function mountWithComposable(
  props: TSelectMultipleGroupProps,
  modelValue: any[] = [],
  route = { path: '/' },
) {
  const emits = vi.fn();
  const vModel = ref(modelValue) as unknown as ModelRef<any, string, any, any>;
  const calculate = vi.fn();
  const opened = ref(false);

  return mount(
    defineComponent({
      setup() {
        const result = useSelectMultipleGroupActions(props, vModel, calculate, opened);
        return { ...result, emits, vModel, calculate, opened };
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

describe('useSelectMultipleGroupActions', () => {
  describe('selectedOptions', () => {
    it('Should return empty array when modelValue is empty.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, []);
      const vm = wrapper.vm;

      expect(vm.selectedOptions).toEqual([]);
    });

    it('Should return selected options when optionValue is not provided.', () => {
      const modelValue = [
        { label: 'Option 1', value: 1 },
        { label: 'Option 2', value: 2 },
      ];
      const wrapper = mountWithComposable(defaultMock.mockProps, modelValue);
      const vm = wrapper.vm;

      expect(vm.selectedOptions).toEqual(modelValue);
    });

    it('Should return selected options when optionValue is provided.', () => {
      const modelValue = [1, 2]; // Just the values
      const wrapper = mountWithComposable(
        {
          ...defaultMock.mockProps,
          optionValue: 'value',
        },
        modelValue,
      );
      const vm = wrapper.vm;

      // Should find the full objects from the options based on the values
      expect(vm.selectedOptions).toEqual([
        { label: 'Option 1', value: 1 },
        { label: 'Option 2', value: 2 },
      ]);
    });
  });

  describe('generatedLabel', () => {
    it('Should return empty string when no options are selected.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, []);
      const vm = wrapper.vm;

      expect(vm.generatedLabel).toBe('');
    });

    it('Should return concatenated labels when options are selected.', () => {
      const modelValue = [
        { label: 'Option 1', value: 1 },
        { label: 'Option 2', value: 2 },
      ];
      const wrapper = mountWithComposable(defaultMock.mockProps, modelValue);
      const vm = wrapper.vm;

      expect(vm.generatedLabel).toBe('Option 1, Option 2');
    });

    it('Should return custom label when selectedItemsLabel is provided and maxSelectedLabels is exceeded.', () => {
      const modelValue = [
        { label: 'Option 1', value: 1 },
        { label: 'Option 2', value: 2 },
      ];
      const wrapper = mountWithComposable(
        {
          ...defaultMock.mockProps,
          maxSelectedLabels: 1,
          selectedItemsLabel: '{0} items selected',
        },
        modelValue,
      );
      const vm = wrapper.vm;

      expect(vm.generatedLabel).toBe('2 items selected');
    });

    it('Should return default label when maxSelectedLabels is exceeded but selectedItemsLabel is not provided.', () => {
      const modelValue = [
        { label: 'Option 1', value: 1 },
        { label: 'Option 2', value: 2 },
      ];
      const wrapper = mountWithComposable(
        {
          ...defaultMock.mockProps,
          maxSelectedLabels: 1,
        },
        modelValue,
      );
      const vm = wrapper.vm;

      expect(vm.generatedLabel).toBe('2 items selected');
    });
  });

  describe('hideCleanButton', () => {
    it('Should return true when no options are selected.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, []);
      const vm = wrapper.vm;

      expect(vm.hideCleanButton).toBe(true);
    });

    it('Should return false when options are selected.', () => {
      const modelValue = [{ label: 'Option 1', value: 1 }];
      const wrapper = mountWithComposable(defaultMock.mockProps, modelValue);
      const vm = wrapper.vm;

      expect(vm.hideCleanButton).toBe(false);
    });
  });

  describe('removeLabel', () => {
    it('Should remove option from modelValue when optionValue is not provided.', () => {
      const modelValue = [
        { label: 'Option 1', value: 1 },
        { label: 'Option 2', value: 2 },
      ];
      const wrapper = mountWithComposable(defaultMock.mockProps, modelValue);
      const vm = wrapper.vm;

      vm.removeLabel({ label: 'Option 1', value: 1 });

      expect(vm.vModel).toEqual([{ label: 'Option 2', value: 2 }]);
    });

    it('Should remove option from modelValue when optionValue is provided.', () => {
      const modelValue = [1, 2];
      const wrapper = mountWithComposable(
        {
          ...defaultMock.mockProps,
          optionValue: 'value',
        },
        modelValue,
      );
      const vm = wrapper.vm;

      vm.removeLabel({ label: 'Option 1', value: 1 });

      expect(vm.vModel).toEqual([2]);
    });
  });

  describe('selectGroupOptionHandler', () => {
    it('Should add option to modelValue when it is not already selected.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, []);
      const vm = wrapper.vm;

      vm.selectGroupOptionHandler({ label: 'Option 1', value: 1 });

      expect(vm.vModel).toEqual([{ label: 'Option 1', value: 1 }]);
    });

    it('Should remove option from modelValue when it is already selected.', () => {
      const modelValue = [{ label: 'Option 1', value: 1 }];
      const wrapper = mountWithComposable(defaultMock.mockProps, modelValue);
      const vm = wrapper.vm;

      vm.selectGroupOptionHandler({ label: 'Option 1', value: 1 });

      expect(vm.vModel).toEqual([]);
    });

    it('Should add option value to modelValue when optionValue is provided.', () => {
      const wrapper = mountWithComposable(
        {
          ...defaultMock.mockProps,
          optionValue: 'value',
        },
        [],
      );
      const vm = wrapper.vm;

      vm.selectGroupOptionHandler({ label: 'Option 1', value: 1 });

      expect(vm.vModel).toEqual([1]);
    });
  });

  describe('cleanSelectedData', () => {
    it('Should clear all selected options.', () => {
      const modelValue = [
        { label: 'Option 1', value: 1 },
        { label: 'Option 2', value: 2 },
      ];
      const wrapper = mountWithComposable(defaultMock.mockProps, modelValue);
      const vm = wrapper.vm;

      const event = new Event('click');
      vm.cleanSelectedData(event);

      expect(vm.vModel).toEqual([]);
    });

    it('Should stop event propagation when cleaning selected data.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, [{ label: 'Option 1', value: 1 }]);
      const vm = wrapper.vm;

      const event = new Event('click');
      const stopPropagationSpy = vi.spyOn(event, 'stopPropagation');

      vm.cleanSelectedData(event);

      expect(stopPropagationSpy).toHaveBeenCalled();
    });
  });

  describe('toggleDropdownHandler', () => {
    it('Should toggle dropdown state when component is not disabled.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, []);
      const vm = wrapper.vm;

      expect(vm.opened).toBe(false);

      vm.toggleDropdownHandler();

      expect(vm.opened).toBe(true);
      expect(vm.calculate).toHaveBeenCalled();
    });

    it('Should not toggle dropdown state when component is disabled.', () => {
      const wrapper = mountWithComposable(
        {
          ...defaultMock.mockProps,
          disabled: true,
        },
        [],
      );
      const vm = wrapper.vm;

      vm.toggleDropdownHandler();

      expect(vm.opened).toBe(false);
      expect(vm.calculate).not.toHaveBeenCalled();
    });
  });

  describe('closeDropdownHandler', () => {
    it('Should close dropdown when component is not disabled.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, []);
      const vm = wrapper.vm;
      vm.opened = true;

      vm.closeDropdownHandler();

      expect(vm.opened).toBe(false);
    });

    it('Should not close dropdown when component is disabled.', () => {
      const wrapper = mountWithComposable(
        {
          ...defaultMock.mockProps,
          disabled: true,
        },
        [],
      );
      const vm = wrapper.vm;
      vm.opened = true;

      vm.closeDropdownHandler();

      expect(vm.opened).toBe(true);
    });
  });

  describe('onClickItem', () => {
    it('Should call selectGroupOptionHandler with the clicked item.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, []);
      const vm = wrapper.vm;

      const item = { label: 'Option 1', value: 1 };
      vm.onClickItem(item);

      expect(vm.vModel).toEqual([item]);
    });
  });

  describe('selectedOptionsMap', () => {
    it('Should return a map with all options and their selection status.', () => {
      const modelValue = [1, 3]; // Selected values
      const propsWithOptionValue = {
        ...defaultMock.mockProps,
        optionValue: 'value',
        options: [
          {
            label: 'Group 1',
            children: [
              { label: 'Option 1', value: 1 },
              { label: 'Option 2', value: 2 },
            ],
          },
          {
            label: 'Group 2',
            children: [
              { label: 'Option 3', value: 3 },
              { label: 'Option 4', value: 4 },
            ],
          },
        ],
      };
      const wrapper = mountWithComposable(propsWithOptionValue, modelValue);
      const vm = wrapper.vm;

      const map = vm.selectedOptionsMap;

      // Check that the map has all options
      const allOptions = propsWithOptionValue.options.flatMap((group) => group.children);
      expect(map.size).toBe(allOptions.length);

      // Check specific selections
      expect(map.get(propsWithOptionValue.options[0].children[0])).toBe(true);
      expect(map.get(propsWithOptionValue.options[0].children[1])).toBe(false);
      expect(map.get(propsWithOptionValue.options[1].children[0])).toBe(true);
      expect(map.get(propsWithOptionValue.options[1].children[1])).toBe(false);
    });
  });
});
