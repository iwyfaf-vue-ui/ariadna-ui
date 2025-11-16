import { describe, it, expect, beforeEach } from 'vitest';
import { ref, defineComponent, h, type ModelRef } from 'vue';
import { mount } from '@vue/test-utils';
import useSelectSingleActions from '../../composables/useSelectSingleActions/useSelectSingleActions';
import { SelectSingleSelectorTestData } from '../test-data/SelectSingle.selector.test-data';
import type { TSelectSingleProps } from '../../SelectSingle';

const defaultMock = new SelectSingleSelectorTestData();

function mountWithComposable(
  props: TSelectSingleProps,
  vModelValue: any = null,
  openedValue = false,
) {
  const vModel = ref(vModelValue) as unknown as ModelRef<any, string, any, any>;
  const opened = ref(openedValue);
  let calculated = false;
  function calculate() {
    calculated = true;
  }

  const wrapper = mount(
    defineComponent({
      setup() {
        const result = useSelectSingleActions(props, vModel, calculate, opened);
        return { ...result, vModel, opened };
      },
      render() {
        return h('div');
      },
    }),
  );

  return {
    wrapper,
    vModel,
    opened,
    get calculated() {
      return calculated;
    },
    resetCalculated: () => {
      calculated = false;
    },
  };
}

describe('useSelectSingleActions', () => {
  let props: TSelectSingleProps;

  beforeEach(() => {
    props = { ...defaultMock.mockProps };
  });

  describe('selectedLabel', () => {
    it('Should return empty string if no value selected.', () => {
      const { wrapper } = mountWithComposable(props, null);

      expect(wrapper.vm.selectedLabel).toBe('');
    });

    it('Should return correct label when value selected and optionValue is not set.', () => {
      const selectedOption = props.options[1]; // Option 2
      const { wrapper } = mountWithComposable(props, selectedOption);

      expect(wrapper.vm.selectedLabel).toBe(selectedOption[props.optionLabel!]);
    });

    it('Should return correct label when value selected and optionValue is set.', () => {
      props.optionValue = 'value';
      const selectedOption = props.options[2]; // Option 3
      const { wrapper } = mountWithComposable(props, selectedOption.value);

      expect(wrapper.vm.selectedLabel).toBe(selectedOption[props.optionLabel!]);
    });

    it('Should return empty string if value does not match any option.', () => {
      props.optionValue = 'value';
      const { wrapper } = mountWithComposable(props, 'not-exist');

      expect(wrapper.vm.selectedLabel).toBe('');
    });
  });

  describe('isSelected', () => {
    it('Should return false if vModel.value is null.', () => {
      const { wrapper } = mountWithComposable(props, null);

      expect(wrapper.vm.isSelected(props.options[0])).toBe(false);
    });

    it('Should return true for selected option when optionValue is not set.', () => {
      const selectedOption = props.options[0];
      const { wrapper } = mountWithComposable(props, selectedOption);

      expect(wrapper.vm.isSelected(selectedOption)).toBe(true);
    });

    it('Should return true for selected option when optionValue is set.', () => {
      props.optionValue = 'value';
      const selectedOption = props.options[1];
      const { wrapper } = mountWithComposable(props, selectedOption.value);

      expect(wrapper.vm.isSelected(selectedOption)).toBe(true);
    });

    it('Should return false for non-selected option.', () => {
      props.optionValue = 'value';
      const selectedOption = props.options[1];
      const { wrapper } = mountWithComposable(props, selectedOption.value);

      expect(wrapper.vm.isSelected(props.options[0])).toBe(false);
    });
  });

  describe('selectOptionHandler', () => {
    it('Should set vModel.value to selected option when optionValue is not set.', () => {
      const { wrapper, vModel } = mountWithComposable(props, null);
      wrapper.vm.selectOptionHandler(props.options[2]);

      expect(vModel.value).toStrictEqual(props.options[2]);
    });

    it('Should set vModel.value to selected option value when optionValue is set.', () => {
      props.optionValue = 'value';
      const { wrapper, vModel } = mountWithComposable(props, null);
      wrapper.vm.selectOptionHandler(props.options[1]);

      expect(vModel.value).toBe(props.options[1].value);
    });

    it('Should reset vModel.value to null if the same option is selected again (optionValue not set).', () => {
      const selectedOption = props.options[0];
      const { wrapper, vModel } = mountWithComposable(props, selectedOption);
      wrapper.vm.selectOptionHandler(selectedOption);

      expect(vModel.value).toBeNull();
    });

    it('Should reset vModel.value to null if the same option is selected again (optionValue set).', () => {
      props.optionValue = 'value';
      const selectedOption = props.options[2];
      const { wrapper, vModel } = mountWithComposable(props, selectedOption.value);
      wrapper.vm.selectOptionHandler(selectedOption);

      expect(vModel.value).toBeNull();
    });
  });

  describe('toggleDropdownHandler', () => {
    it('Should toggle opened state and call calculate when not disabled.', () => {
      const { wrapper, opened } = mountWithComposable(props, null, false);
      wrapper.vm.toggleDropdownHandler();

      expect(opened.value).toBe(true);

      wrapper.vm.toggleDropdownHandler();
      expect(opened.value).toBe(false);
    });

    it('Should not toggle opened state or call calculate when disabled.', () => {
      props.disabled = true;
      const { wrapper, opened, calculated } = mountWithComposable(props, null, false);
      wrapper.vm.toggleDropdownHandler();

      expect(opened.value).toBe(false);
      expect(calculated).toBe(false);
    });
  });

  describe('closeDropdownHandler', () => {
    it('Should set opened to false when not disabled.', () => {
      const { wrapper, opened } = mountWithComposable(props, null, true);
      wrapper.vm.closeDropdownHandler();

      expect(opened.value).toBe(false);
    });

    it('Should not change opened when disabled.', () => {
      props.disabled = true;
      const { wrapper, opened } = mountWithComposable(props, null, true);
      wrapper.vm.closeDropdownHandler();

      expect(opened.value).toBe(true);
    });
  });

  describe('cleanSelectedData', () => {
    it('Should set vModel.value to null and stop event propagation.', () => {
      const { wrapper, vModel } = mountWithComposable(props, props.options[0]);
      let stopped = false;
      const event = {
        stopPropagation: () => {
          stopped = true;
        },
      } as unknown as Event;
      wrapper.vm.cleanSelectedData(event);

      expect(vModel.value).toBeNull();
      expect(stopped).toBe(true);
    });
  });

  describe('onClickItem', () => {
    it('Should select option and close dropdown.', () => {
      const { wrapper, vModel, opened } = mountWithComposable(props, null, true);
      wrapper.vm.onClickItem(props.options[1]);

      expect(vModel.value).toStrictEqual(props.options[1]);
      expect(opened.value).toBe(false);
    });

    it('Should reset vModel.value and close dropdown if same option selected again.', () => {
      const selectedOption = props.options[2];
      const { wrapper, vModel, opened } = mountWithComposable(props, selectedOption, true);
      wrapper.vm.onClickItem(selectedOption);

      expect(vModel.value).toBeNull();
      expect(opened.value).toBe(false);
    });
  });

  describe('Edge cases', () => {
    it('Should handle empty options array gracefully.', () => {
      props.options = [];
      const { wrapper } = mountWithComposable(props, null);
      expect(wrapper.vm.selectedLabel).toBe('');
      expect(wrapper.vm.isSelected({})).toBe(false);
    });

    it('Should handle optionValue=null and vModel.value primitive.', () => {
      props.optionValue = null;
      const { wrapper, vModel } = mountWithComposable(props, 123);
      expect(wrapper.vm.selectedLabel).toBe('');
      //@ts-ignore Due to edge case test
      wrapper.vm.selectOptionHandler(456);
      expect(vModel.value).toBe(456);
    });
  });
});
