import { describe, expect, it, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, h, ref } from 'vue';
import type { TSelectSingleGroupProps } from '../../SelectSingleGroup';
import useSelectSingleGroupActions from '../../composables/useSelectSingleGroupActions/useSelectSingleGroupActions';
import { SelectSingleGroupSelectorTestData } from '../test-data/SelectSingleGroup.selector.test-data';

const defaultMock = new SelectSingleGroupSelectorTestData();

function mountWithComposable(
  props: TSelectSingleGroupProps,
  initialModelValue: any = null,
  route = { path: '/' },
) {
  const vModel = ref(initialModelValue);
  const opened = ref(false);
  const calculate = vi.fn();

  return mount(
    defineComponent({
      setup() {
        const result = useSelectSingleGroupActions(props, vModel as any, calculate, opened);
        return { ...result, vModel, opened, calculate };
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

describe('useSelectSingleGroupActions', () => {
  let mockOptions: any[];

  beforeEach(() => {
    mockOptions = [
      {
        groupLabel: 'Group 1',
        items: [
          { label: 'Option 1', value: 1 },
          { label: 'Option 2', value: 2 },
        ],
      },
      {
        groupLabel: 'Group 2',
        items: [
          { label: 'Option 3', value: 3 },
          { label: 'Option 4', value: 4 },
        ],
      },
    ];
  });

  describe('Basic functionality', () => {
    it('Should return expected structure.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        options: mockOptions,
      });
      const vm = wrapper.vm;

      expect(vm).toHaveProperty('selectedLabel');
      expect(vm).toHaveProperty('isSelected');
      expect(vm).toHaveProperty('selectGroupOptionHandler');
      expect(vm).toHaveProperty('toggleDropdownHandler');
      expect(vm).toHaveProperty('closeDropdownHandler');
      expect(vm).toHaveProperty('cleanSelectedData');
      expect(vm).toHaveProperty('onClickItem');
    });
  });

  describe('selectedLabel ComputedRef', () => {
    it('Should return empty string when no value is selected.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        options: mockOptions,
        optionLabel: 'label',
        optionValue: 'value',
        optionGroupChildren: 'items',
      });
      const vm = wrapper.vm;

      expect(vm.selectedLabel).toBe('');
    });

    it('Should return correct label when option is selected with optionValue.', () => {
      const wrapper = mountWithComposable(
        {
          ...defaultMock.mockProps,
          options: mockOptions,
          optionLabel: 'label',
          optionValue: 'value',
          optionGroupChildren: 'items',
        },
        2,
      );
      const vm = wrapper.vm;

      expect(vm.selectedLabel).toBe('Option 2');
    });

    it('Should return empty string when selected value not found in options.', () => {
      const wrapper = mountWithComposable(
        {
          ...defaultMock.mockProps,
          options: mockOptions,
          optionLabel: 'label',
          optionValue: 'value',
          optionGroupChildren: 'items',
        },
        999,
      );
      const vm = wrapper.vm;

      expect(vm.selectedLabel).toBe('');
    });

    it('Should return correct label when option is selected without optionValue.', () => {
      const selectedOption = { label: 'Option 1', value: 1 };
      const wrapper = mountWithComposable(
        {
          ...defaultMock.mockProps,
          options: mockOptions,
          optionLabel: 'label',
          optionValue: null,
          optionGroupChildren: 'items',
        },
        selectedOption,
      );
      const vm = wrapper.vm;

      expect(vm.selectedLabel).toBe('Option 1');
    });

    it('Should return empty string when selected object has no label property.', () => {
      const selectedOption = { value: 1 };
      const wrapper = mountWithComposable(
        {
          ...defaultMock.mockProps,
          options: mockOptions,
          optionLabel: 'label',
          optionValue: null,
          optionGroupChildren: 'items',
        },
        selectedOption,
      );
      const vm = wrapper.vm;

      expect(vm.selectedLabel).toBe('');
    });

    it('Should handle array of selected values without optionValue.', () => {
      const selectedOptions = [
        { label: 'Option 1', value: 1 },
        { label: 'Option 2', value: 2 },
      ];
      const wrapper = mountWithComposable(
        {
          ...defaultMock.mockProps,
          options: mockOptions,
          optionLabel: 'label',
          optionValue: null,
          optionGroupChildren: 'items',
        },
        selectedOptions,
      );
      const vm = wrapper.vm;

      expect(vm.selectedLabel).toBe('Option 1, Option 2');
    });

    it('Should filter out items without label in array selection.', () => {
      const selectedOptions = [
        { label: 'Option 1', value: 1 },
        { value: 2 },
        { label: 'Option 3', value: 3 },
      ];
      const wrapper = mountWithComposable(
        {
          ...defaultMock.mockProps,
          options: mockOptions,
          optionLabel: 'label',
          optionValue: null,
          optionGroupChildren: 'items',
        },
        selectedOptions,
      );
      const vm = wrapper.vm;

      expect(vm.selectedLabel).toBe('Option 1, Option 3');
    });
  });

  describe('isSelected Function', () => {
    it('Should return false when no value is selected.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        options: mockOptions,
        optionLabel: 'label',
        optionValue: 'value',
        optionGroupChildren: 'items',
      });
      const vm = wrapper.vm;

      const option = { label: 'Option 1', value: 1 };
      expect(vm.isSelected(option)).toBe(false);
    });

    it('Should return true when option is selected with optionValue.', () => {
      const wrapper = mountWithComposable(
        {
          ...defaultMock.mockProps,
          options: mockOptions,
          optionLabel: 'label',
          optionValue: 'value',
          optionGroupChildren: 'items',
        },
        2,
      );
      const vm = wrapper.vm;

      const option = { label: 'Option 2', value: 2 };
      expect(vm.isSelected(option)).toBe(true);
    });

    it('Should return false when option is not selected with optionValue.', () => {
      const wrapper = mountWithComposable(
        {
          ...defaultMock.mockProps,
          options: mockOptions,
          optionLabel: 'label',
          optionValue: 'value',
          optionGroupChildren: 'items',
        },
        2,
      );
      const vm = wrapper.vm;

      const option = { label: 'Option 1', value: 1 };
      expect(vm.isSelected(option)).toBe(false);
    });

    it('Should return true when option is selected without optionValue.', () => {
      const selectedOption = { label: 'Option 1', value: 1 };
      const wrapper = mountWithComposable(
        {
          ...defaultMock.mockProps,
          options: mockOptions,
          optionLabel: 'label',
          optionValue: null,
          optionGroupChildren: 'items',
        },
        selectedOption,
      );
      const vm = wrapper.vm;

      expect(vm.isSelected(selectedOption)).toBe(true);
    });

    it('Should return false when option is not selected without optionValue.', () => {
      const selectedOption = { label: 'Option 1', value: 1 };
      const differentOption = { label: 'Option 2', value: 2 };
      const wrapper = mountWithComposable(
        {
          ...defaultMock.mockProps,
          options: mockOptions,
          optionLabel: 'label',
          optionValue: null,
          optionGroupChildren: 'items',
        },
        selectedOption,
      );
      const vm = wrapper.vm;

      expect(vm.isSelected(differentOption)).toBe(false);
    });

    it('Should handle complex object comparison.', () => {
      const selectedOption = { label: 'Option 1', value: 1, nested: { prop: 'value' } };
      const wrapper = mountWithComposable(
        {
          ...defaultMock.mockProps,
          options: mockOptions,
          optionLabel: 'label',
          optionValue: null,
          optionGroupChildren: 'items',
        },
        selectedOption,
      );
      const vm = wrapper.vm;

      const sameOption = { label: 'Option 1', value: 1, nested: { prop: 'value' } };
      expect(vm.isSelected(sameOption)).toBe(true);
    });
  });

  describe('selectGroupOptionHandler Function', () => {
    it('Should select option when using optionValue.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        options: mockOptions,
        optionLabel: 'label',
        optionValue: 'value',
        optionGroupChildren: 'items',
      });
      const vm = wrapper.vm;

      const option = { label: 'Option 1', value: 1 };
      vm.selectGroupOptionHandler(option);

      expect(vm.vModel).toBe(1);
    });

    it('Should select option when not using optionValue.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        options: mockOptions,
        optionLabel: 'label',
        optionValue: null,
        optionGroupChildren: 'items',
      });
      const vm = wrapper.vm;

      const option = { label: 'Option 1', value: 1 };
      vm.selectGroupOptionHandler(option);

      expect(vm.vModel).toEqual(option);
    });

    it('Should deselect option when selecting already selected option with optionValue.', () => {
      const wrapper = mountWithComposable(
        {
          ...defaultMock.mockProps,
          options: mockOptions,
          optionLabel: 'label',
          optionValue: 'value',
          optionGroupChildren: 'items',
        },
        1,
      );
      const vm = wrapper.vm;

      const option = { label: 'Option 1', value: 1 };
      vm.selectGroupOptionHandler(option);

      expect(vm.vModel).toBeNull();
    });

    it('Should deselect option when selecting already selected option without optionValue.', () => {
      const option = { label: 'Option 1', value: 1 };
      const wrapper = mountWithComposable(
        {
          ...defaultMock.mockProps,
          options: mockOptions,
          optionLabel: 'label',
          optionValue: null,
          optionGroupChildren: 'items',
        },
        option,
      );
      const vm = wrapper.vm;

      vm.selectGroupOptionHandler(option);

      expect(vm.vModel).toBeNull();
    });

    it('Should change selection when selecting different option.', () => {
      const wrapper = mountWithComposable(
        {
          ...defaultMock.mockProps,
          options: mockOptions,
          optionLabel: 'label',
          optionValue: 'value',
          optionGroupChildren: 'items',
        },
        1,
      );
      const vm = wrapper.vm;

      const newOption = { label: 'Option 2', value: 2 };
      vm.selectGroupOptionHandler(newOption);

      expect(vm.vModel).toBe(2);
    });
  });

  describe('toggleDropdownHandler Function', () => {
    it('Should toggle opened state from false to true.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        options: mockOptions,
      });
      const vm = wrapper.vm;

      expect(vm.opened).toBe(false);
      vm.toggleDropdownHandler();
      expect(vm.opened).toBe(true);
    });

    it('Should toggle opened state from true to false.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        options: mockOptions,
      });
      const vm = wrapper.vm;

      vm.opened = true;
      vm.toggleDropdownHandler();
      expect(vm.opened).toBe(false);
    });

    it('Should call calculate function when toggling.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        options: mockOptions,
      });
      const vm = wrapper.vm;

      vm.toggleDropdownHandler();
      expect(vm.calculate).toHaveBeenCalledTimes(1);
    });

    it('Should not toggle when disabled is true.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        options: mockOptions,
        disabled: true,
      });
      const vm = wrapper.vm;

      expect(vm.opened).toBe(false);
      vm.toggleDropdownHandler();
      expect(vm.opened).toBe(false);
    });

    it('Should not call calculate when disabled is true.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        options: mockOptions,
        disabled: true,
      });
      const vm = wrapper.vm;

      vm.toggleDropdownHandler();
      expect(vm.calculate).not.toHaveBeenCalled();
    });
  });

  describe('closeDropdownHandler Function', () => {
    it('Should close dropdown when opened.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        options: mockOptions,
      });
      const vm = wrapper.vm;

      vm.opened = true;
      vm.closeDropdownHandler();
      expect(vm.opened).toBe(false);
    });

    it('Should keep dropdown closed when already closed.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        options: mockOptions,
      });
      const vm = wrapper.vm;

      expect(vm.opened).toBe(false);
      vm.closeDropdownHandler();
      expect(vm.opened).toBe(false);
    });

    it('Should not close dropdown when disabled is true.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        options: mockOptions,
        disabled: true,
      });
      const vm = wrapper.vm;

      vm.opened = true;
      vm.closeDropdownHandler();
      expect(vm.opened).toBe(true);
    });
  });

  describe('cleanSelectedData Function', () => {
    it('Should clear selected value.', () => {
      const wrapper = mountWithComposable(
        {
          ...defaultMock.mockProps,
          options: mockOptions,
          optionLabel: 'label',
          optionValue: 'value',
          optionGroupChildren: 'items',
        },
        1,
      );
      const vm = wrapper.vm;

      const event = new Event('click');
      const stopPropagationSpy = vi.spyOn(event, 'stopPropagation');

      vm.cleanSelectedData(event);

      expect(vm.vModel).toBeNull();
      expect(stopPropagationSpy).toHaveBeenCalledTimes(1);
    });

    it('Should stop event propagation.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        options: mockOptions,
      });
      const vm = wrapper.vm;

      const event = new Event('click');
      const stopPropagationSpy = vi.spyOn(event, 'stopPropagation');

      vm.cleanSelectedData(event);

      expect(stopPropagationSpy).toHaveBeenCalledTimes(1);
    });

    it('Should clear value even when already null.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        options: mockOptions,
      });
      const vm = wrapper.vm;

      expect(vm.vModel).toBeNull();

      const event = new Event('click');
      vm.cleanSelectedData(event);

      expect(vm.vModel).toBeNull();
    });
  });

  describe('onClickItem Function', () => {
    it('Should select item and close dropdown.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        options: mockOptions,
        optionLabel: 'label',
        optionValue: 'value',
        optionGroupChildren: 'items',
      });
      const vm = wrapper.vm;

      vm.opened = true;
      const item = { label: 'Option 1', value: 1 };
      vm.onClickItem(item);

      expect(vm.vModel).toBe(1);
      expect(vm.opened).toBe(false);
    });

    it('Should deselect item and close dropdown when clicking selected item.', () => {
      const wrapper = mountWithComposable(
        {
          ...defaultMock.mockProps,
          options: mockOptions,
          optionLabel: 'label',
          optionValue: 'value',
          optionGroupChildren: 'items',
        },
        1,
      );
      const vm = wrapper.vm;

      vm.opened = true;
      const item = { label: 'Option 1', value: 1 };
      vm.onClickItem(item);

      expect(vm.vModel).toBeNull();
      expect(vm.opened).toBe(false);
    });

    it('Should handle item click without optionValue.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        options: mockOptions,
        optionLabel: 'label',
        optionValue: null,
        optionGroupChildren: 'items',
      });
      const vm = wrapper.vm;

      vm.opened = true;
      const item = { label: 'Option 1', value: 1 };
      vm.onClickItem(item);

      expect(vm.vModel).toEqual(item);
      expect(vm.opened).toBe(false);
    });

    it('Should not close dropdown when disabled.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        options: mockOptions,
        optionLabel: 'label',
        optionValue: 'value',
        optionGroupChildren: 'items',
        disabled: true,
      });
      const vm = wrapper.vm;

      vm.opened = true;
      const item = { label: 'Option 1', value: 1 };
      vm.onClickItem(item);

      expect(vm.opened).toBe(true);
    });
  });

  describe('Edge cases', () => {
    it('Should handle empty options array.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        options: [],
        optionLabel: 'label',
        optionValue: 'value',
        optionGroupChildren: 'items',
      });
      const vm = wrapper.vm;

      expect(vm.selectedLabel).toBe('');
    });

    it('Should handle options with missing optionGroupChildren property.', () => {
      const invalidOptions = [
        {
          groupLabel: 'Group 1',
        },
      ];
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        options: invalidOptions,
        optionLabel: 'label',
        optionValue: 'value',
        optionGroupChildren: 'items',
      });
      const vm = wrapper.vm;

      expect(vm.selectedLabel).toBe('');
    });

    it('Should handle option without required properties.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        options: mockOptions,
        optionLabel: 'label',
        optionValue: 'value',
        optionGroupChildren: 'items',
      });
      const vm = wrapper.vm;

      const invalidOption = {};
      vm.selectGroupOptionHandler(invalidOption);

      expect(vm.vModel).toBeUndefined();
    });
  });
});
