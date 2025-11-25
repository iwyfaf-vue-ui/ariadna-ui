import { describe, it, expect, vi, beforeEach } from 'vitest';
import { defineComponent, h, ref, nextTick, type ModelRef } from 'vue';
import { mount } from '@vue/test-utils';
import useSelectMultipleActions from '../../composables/useSelectMultipleActions/useSelectMultipleActions';
import { SelectMultipleSelectorTestData } from '../test-data/SelectMultiple.selector.test-data';
import type { TSelectMultipleProps } from '../../SelectMultiple';

const defaultMock = new SelectMultipleSelectorTestData();

function mountWithComposable(
  props: TSelectMultipleProps,
  vModelValue: any[] = [],
  openedValue = false,
  calculate = vi.fn(),
) {
  const vModel = ref([...vModelValue]) as unknown as ModelRef<any, string, any, any>;
  const opened = ref(openedValue);

  return mount(
    defineComponent({
      setup() {
        const result = useSelectMultipleActions(props, vModel, calculate, opened);
        return { ...result, vModel, opened };
      },
      render() {
        return h('div');
      },
    }),
  );
}

describe('useSelectMultipleActions', () => {
  let props: TSelectMultipleProps;
  let options: any[];

  beforeEach(() => {
    props = { ...defaultMock.mockProps };
    options = defaultMock.optionsExample();
    props.options = options;
    props.optionLabel = 'label';
    props.optionValue = 'value';
    props.maxSelectedLabels = undefined;
    props.selectedItemsLabel = undefined;
    props.disabled = false;
  });

  describe('selectedOptions', () => {
    it('Should return selected options based on vModel and optionValue.', () => {
      const vModelValue = [1, 2];
      const wrapper = mountWithComposable(props, vModelValue);

      expect(wrapper.vm.selectedOptions).toStrictEqual([options[0], options[1]]);
    });

    it('Should return empty array if vModel is empty.', () => {
      const wrapper = mountWithComposable(props, []);

      expect(wrapper.vm.selectedOptions).toStrictEqual([]);
    });

    it('Should return vModel as is if optionValue is not set.', () => {
      props.optionValue = null;
      const vModelValue = [{ label: 'Option 1', value: 1 }];
      const wrapper = mountWithComposable(props, vModelValue);

      expect(wrapper.vm.selectedOptions).toStrictEqual(vModelValue);
    });
  });

  describe('generatedLabel', () => {
    it('Should return empty string if nothing selected.', () => {
      const wrapper = mountWithComposable(props, []);

      expect(wrapper.vm.generatedLabel).toBe('');
    });

    it('Should join labels of selected options if below maxSelectedLabels.', () => {
      const vModelValue = [1, 2];
      const wrapper = mountWithComposable(props, vModelValue);

      expect(wrapper.vm.generatedLabel).toBe('Option 1, Option 2');
    });

    it('Should use selectedItemsLabel if selected count exceeds maxSelectedLabels.', () => {
      props.maxSelectedLabels = 1;
      props.selectedItemsLabel = 'Выбрано {0} элементов';
      const vModelValue = [1, 2, 3];
      const wrapper = mountWithComposable(props, vModelValue);

      expect(wrapper.vm.generatedLabel).toBe('Выбрано 3 элементов');
    });

    it('Should fallback to default label if selectedItemsLabel is not set.', () => {
      props.maxSelectedLabels = 1;
      props.selectedItemsLabel = undefined;
      const vModelValue = [1, 2, 3];
      const wrapper = mountWithComposable(props, vModelValue);

      expect(wrapper.vm.generatedLabel).toBe('3 items selected');
    });
  });

  describe('showGeneratedLabel', () => {
    it('Should return true if maxSelectedLabels is not set.', () => {
      props.maxSelectedLabels = undefined;
      const wrapper = mountWithComposable(props, [1, 2]);

      expect(wrapper.vm.showGeneratedLabel).toBe(true);
    });

    it('Should return true if selected count is less than maxSelectedLabels.', () => {
      props.maxSelectedLabels = 3;
      const wrapper = mountWithComposable(props, [1, 2]);

      expect(wrapper.vm.showGeneratedLabel).toBe(true);
    });

    it('Should return false if selected count is equal to or more than maxSelectedLabels.', () => {
      props.maxSelectedLabels = 2;
      const wrapper = mountWithComposable(props, [1, 2, 3]);

      expect(wrapper.vm.showGeneratedLabel).toBe(false);
    });
  });

  describe('hideCleanButton', () => {
    it('Should be true if nothing selected.', () => {
      const wrapper = mountWithComposable(props, []);

      expect(wrapper.vm.hideCleanButton).toBe(true);
    });

    it('Should be false if something selected.', () => {
      const wrapper = mountWithComposable(props, [1]);

      expect(wrapper.vm.hideCleanButton).toBe(false);
    });
  });

  describe('removeLabel', () => {
    it('Should remove option from vModel.', async () => {
      const vModelValue = [1, 2, 3];
      const wrapper = mountWithComposable(props, vModelValue);

      await nextTick();
      wrapper.vm.removeLabel(options[1]);

      await nextTick();
      expect(wrapper.vm.vModel).toStrictEqual([1, 3]);
    });

    it('Should remove object from vModel if optionValue is not set.', async () => {
      props.optionValue = null;
      const obj1 = { label: 'A', value: 1 };
      const obj2 = { label: 'B', value: 2 };
      const vModelValue = [obj1, obj2];
      const wrapper = mountWithComposable(props, vModelValue);

      await nextTick();
      wrapper.vm.removeLabel(obj1);

      await nextTick();
      expect(wrapper.vm.vModel).toStrictEqual([obj2]);
    });
  });

  describe('selectOptionHandler', () => {
    it('Should add option to vModel if not selected.', async () => {
      const wrapper = mountWithComposable(props, []);

      await nextTick();
      wrapper.vm.selectOptionHandler(options[0]);

      await nextTick();
      expect(wrapper.vm.vModel).toStrictEqual([1]);
    });

    it('Should remove option from vModel if already selected.', async () => {
      const wrapper = mountWithComposable(props, [1]);

      await nextTick();
      wrapper.vm.selectOptionHandler(options[0]);

      await nextTick();
      expect(wrapper.vm.vModel).toStrictEqual([]);
    });
  });

  describe('cleanSelectedData', () => {
    it('Should clear vModel and stop event propagation.', async () => {
      const wrapper = mountWithComposable(props, [1, 2]);
      const event = { stopPropagation: vi.fn() } as unknown as Event;
      wrapper.vm.cleanSelectedData(event);

      await nextTick();
      expect(wrapper.vm.vModel).toStrictEqual([]);
      expect(event.stopPropagation).toHaveBeenCalled();
    });
  });

  describe('toggleDropdownHandler', () => {
    it('Should toggle opened and call calculate if not disabled.', async () => {
      const calculate = vi.fn();
      const wrapper = mountWithComposable(props, [], false, calculate);
      wrapper.vm.toggleDropdownHandler();

      await nextTick();
      expect(wrapper.vm.opened).toBe(true);
      expect(calculate).toHaveBeenCalled();
    });

    it('Should do nothing if disabled.', async () => {
      props.disabled = true;
      const calculate = vi.fn();
      const wrapper = mountWithComposable(props, [], false, calculate);
      wrapper.vm.toggleDropdownHandler();

      await nextTick();
      expect(wrapper.vm.opened).toBe(false);
      expect(calculate).not.toHaveBeenCalled();
    });
  });

  describe('closeDropdownHandler', () => {
    it('Should close dropdown if not disabled.', async () => {
      const wrapper = mountWithComposable(props, [], true);
      wrapper.vm.closeDropdownHandler();

      await nextTick();
      expect(wrapper.vm.opened).toBe(false);
    });

    it('Should do nothing if disabled.', async () => {
      props.disabled = true;
      const wrapper = mountWithComposable(props, [], true);
      wrapper.vm.closeDropdownHandler();

      await nextTick();
      expect(wrapper.vm.opened).toBe(true);
    });
  });

  describe('onClickItem', () => {
    it('Should call selectOptionHandler with item.', async () => {
      const wrapper = mountWithComposable(props, []);
      expect(wrapper.vm.vModel).toStrictEqual([]);

      wrapper.vm.onClickItem(options[0]);
      expect(wrapper.vm.vModel).toStrictEqual([options[0][props.optionValue as string]]);
    });
  });

  describe('isSelected', () => {
    it('Should return true if option is selected.', () => {
      const wrapper = mountWithComposable(props, [1]);

      expect(wrapper.vm.isSelected(options[0])).toBe(true);
    });

    it('Should return false if option is not selected.', () => {
      const wrapper = mountWithComposable(props, [2]);

      expect(wrapper.vm.isSelected(options[0])).toBe(false);
    });

    it('Should work with objects if optionValue is not set.', () => {
      props.optionValue = null;
      const obj = { label: 'A', value: 1 };
      const wrapper = mountWithComposable(props, [obj]);

      expect(wrapper.vm.isSelected(obj)).toBe(true);
      expect(wrapper.vm.isSelected({ label: 'B', value: 2 })).toBe(false);
    });
  });
});
