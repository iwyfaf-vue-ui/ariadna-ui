import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, h, type ModelRef, ref } from 'vue';
import type { TSelectSingleFlatProps } from '../../SelectSingleFlat';
import useSelectSingleFlatActions from '../../composables/useSelectSingleFlatActions/useSelectSingleFlatActions';
import { SelectSingleFlatSelectorTestData } from '../../tests/test-data/SelectSingleFlat.selector.test-data';

const defaultMock = new SelectSingleFlatSelectorTestData();

function mountWithComposable(
  props: TSelectSingleFlatProps,
  modelValue: any = null,
  route = { path: '/' },
) {
  const emits = vi.fn();
  const vModel = ref(modelValue) as unknown as ModelRef<any, string, any, any>;
  const calculate = vi.fn();
  const opened = ref(false);

  return mount(
    defineComponent({
      setup() {
        const result = useSelectSingleFlatActions(props, vModel, calculate, opened);
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

describe('useSelectSingleFlatActions', () => {
  describe('selectedLabel', () => {
    it('Should return empty string when no value is selected.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      expect(vm.selectedLabel).toBe('');
    });

    it('Should return string representation of selected option.', () => {
      const options = defaultMock.optionsExample();
      const wrapper = mountWithComposable({ ...defaultMock.mockProps, options }, options[0]);
      const vm = wrapper.vm;

      expect(vm.selectedLabel).toBe(options[0].toString());
    });

    it('Should return empty string when selected option is not found.', () => {
      const options = defaultMock.optionsExample();
      const wrapper = mountWithComposable(
        { ...defaultMock.mockProps, options },
        'non-existent-option',
      );
      const vm = wrapper.vm;

      expect(vm.selectedLabel).toBe('');
    });
  });

  describe('isSelected', () => {
    it('Should return false when no value is selected.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;
      const option = defaultMock.optionsExample()[0];

      expect(vm.isSelected(option)).toBe(false);
    });

    it('Should return true when option matches selected value.', () => {
      const options = defaultMock.optionsExample();
      const wrapper = mountWithComposable({ ...defaultMock.mockProps, options }, options[0]);
      const vm = wrapper.vm;

      expect(vm.isSelected(options[0])).toBe(true);
    });

    it('Should return false when option does not match selected value.', () => {
      const options = defaultMock.optionsExample();
      const wrapper = mountWithComposable({ ...defaultMock.mockProps, options }, options[0]);
      const vm = wrapper.vm;

      expect(vm.isSelected(options[1])).toBe(false);
    });
  });

  describe('selectOptionHandler', () => {
    it('Should set option as selected when no option is currently selected.', () => {
      const options = defaultMock.optionsExample();
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      vm.selectOptionHandler(options[0]);

      expect(vm.vModel).toEqual(options[0]);
    });

    it('Should deselect option when same option is selected again.', () => {
      const options = defaultMock.optionsExample();
      const wrapper = mountWithComposable({ ...defaultMock.mockProps, options }, options[0]);
      const vm = wrapper.vm;

      vm.selectOptionHandler(options[0]);

      expect(vm.vModel).toBeNull();
    });

    it('Should replace selected option with new option.', () => {
      const options = defaultMock.optionsExample();
      const wrapper = mountWithComposable({ ...defaultMock.mockProps, options }, options[0]);
      const vm = wrapper.vm;

      vm.selectOptionHandler(options[1]);

      expect(vm.vModel).toEqual(options[1]);
    });
  });

  describe('toggleDropdownHandler', () => {
    it('Should not toggle dropdown when component is disabled.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        disabled: true,
      });
      const vm = wrapper.vm;

      vm.toggleDropdownHandler();

      expect(vm.opened).toBe(false);
      expect(vm.calculate).not.toHaveBeenCalled();
    });

    it('Should open dropdown when it is closed.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      vm.toggleDropdownHandler();

      expect(vm.opened).toBe(true);
      expect(vm.calculate).toHaveBeenCalled();
    });

    it('Should close dropdown when it is opened.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;
      vm.opened = true;

      vm.toggleDropdownHandler();

      expect(vm.opened).toBe(false);
      expect(vm.calculate).toHaveBeenCalled();
    });
  });

  describe('closeDropdownHandler', () => {
    it('Should not close dropdown when component is disabled.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        disabled: true,
      });
      const vm = wrapper.vm;
      vm.opened = true;

      vm.closeDropdownHandler();

      expect(vm.opened).toBe(true);
    });

    it('Should close dropdown when it is opened.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;
      vm.opened = true;

      vm.closeDropdownHandler();

      expect(vm.opened).toBe(false);
    });

    it('Should keep dropdown closed when it is already closed.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      vm.closeDropdownHandler();

      expect(vm.opened).toBe(false);
    });
  });

  describe('cleanSelectedData', () => {
    it('Should stop event propagation and clear selected value.', () => {
      const options = defaultMock.optionsExample();
      const wrapper = mountWithComposable({ ...defaultMock.mockProps, options }, options[0]);
      const vm = wrapper.vm;
      const event = {
        stopPropagation: vi.fn(),
      };

      vm.cleanSelectedData(event as unknown as Event);

      expect(event.stopPropagation).toHaveBeenCalled();
      expect(vm.vModel).toBeNull();
    });

    it('Should stop event propagation even when no value is selected.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;
      const event = {
        stopPropagation: vi.fn(),
      };

      vm.cleanSelectedData(event as unknown as Event);

      expect(event.stopPropagation).toHaveBeenCalled();
      expect(vm.vModel).toBeNull();
    });
  });

  describe('onClickItem', () => {
    it('Should select item and close dropdown.', () => {
      const options = defaultMock.optionsExample();
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;
      vm.opened = true;

      vm.onClickItem(options[0]);

      expect(vm.vModel).toEqual(options[0]);
      expect(vm.opened).toBe(false);
    });

    it('Should work correctly with complex objects.', () => {
      const complexOptions = ['Complex Option 1', 'Complex Option 2'];
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        options: complexOptions,
      });
      const vm = wrapper.vm;
      vm.opened = true;

      vm.onClickItem(complexOptions[1]);

      expect(vm.vModel).toEqual(complexOptions[1]);
      expect(vm.opened).toBe(false);
    });
  });
});
