import { describe, it, expect, beforeEach } from 'vitest';
import { defineComponent, h, ref, type ModelRef, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import useSelectMultipleCheckbox from '../../composables/useSelectMultipleCheckbox/useSelectMultipleCheckbox';
import { SelectMultipleSelectorTestData } from '../test-data/SelectMultiple.selector.test-data';
import type { TSelectMultipleProps } from '../../SelectMultiple';

const defaultMock = new SelectMultipleSelectorTestData();

function mountWithComposable(vModelValue: any[], props: TSelectMultipleProps) {
  const vModel = ref([...vModelValue]) as unknown as ModelRef<any[], string, any[], any[]>;

  return mount(
    defineComponent({
      setup() {
        const result = useSelectMultipleCheckbox(vModel, props);
        return { ...result, vModel };
      },
      render() {
        return h('div');
      },
    }),
  );
}

describe('useSelectMultipleCheckbox', () => {
  let props: TSelectMultipleProps;
  let options: any[];

  beforeEach(() => {
    props = { ...defaultMock.mockProps };
    options = defaultMock.optionsExample();
    props.options = options;
    props.optionLabel = 'label';
    props.optionValue = 'value';
  });

  describe('Structure', () => {
    it('Should return expected structure.', () => {
      const wrapper = mountWithComposable([], props);
      const vm = wrapper.vm;

      expect(vm).toHaveProperty('multiselectCheckboxChecked');
      expect(vm).toHaveProperty('onChangeMultiselectCheckbox');
    });
  });

  describe('multiselectCheckboxChecked', () => {
    it('Should be false if vModel is empty.', () => {
      const wrapper = mountWithComposable([], props);

      expect(wrapper.vm.multiselectCheckboxChecked).toBe(false);
    });

    it('Should be true if vModel has items.', () => {
      const wrapper = mountWithComposable([1], props);

      expect(wrapper.vm.multiselectCheckboxChecked).toBe(true);
    });
  });

  describe('onChangeMultiselectCheckbox', () => {
    it('Should clear vModel if something selected.', async () => {
      const wrapper = mountWithComposable([1, 2], props);

      wrapper.vm.onChangeMultiselectCheckbox();
      await nextTick();

      expect(wrapper.vm.vModel).toStrictEqual([]);
    });

    it('Should select all option values if nothing selected and optionValue is set.', async () => {
      const wrapper = mountWithComposable([], props);

      wrapper.vm.onChangeMultiselectCheckbox();
      await nextTick();

      // options: [{label, value:1}, {label, value:2}, {label, value:3}]
      expect(wrapper.vm.vModel).toStrictEqual([1, 2, 3]);
    });

    it('Should select all option objects if optionValue is not set.', async () => {
      props.optionValue = null;
      const wrapper = mountWithComposable([], props);

      wrapper.vm.onChangeMultiselectCheckbox();
      await nextTick();

      expect(wrapper.vm.vModel).toStrictEqual(options);
    });

    it('Should clear vModel if already all selected.', async () => {
      const wrapper = mountWithComposable([1, 2, 3], props);

      wrapper.vm.onChangeMultiselectCheckbox();
      await nextTick();

      expect(wrapper.vm.vModel).toStrictEqual([]);
    });

    it('Should work with empty options array (select all = []).', async () => {
      props.options = [];
      const wrapper = mountWithComposable([], props);

      wrapper.vm.onChangeMultiselectCheckbox();
      await nextTick();

      expect(wrapper.vm.vModel).toStrictEqual([]);
    });
  });

  describe('Reactivity to options change', () => {
    it('Should update vModel when options change after select all.', async () => {
      const wrapper = mountWithComposable([], props);

      // Выбрать все
      wrapper.vm.onChangeMultiselectCheckbox();
      await nextTick();

      expect(wrapper.vm.vModel).toStrictEqual([1, 2, 3]);

      // Изменить options (например, удалить одну опцию)
      props.options = [options[0], options[2]];
      // Снова выбрать все (должно выбрать только существующие)
      wrapper.vm.onChangeMultiselectCheckbox(); // очистить
      await nextTick();
      wrapper.vm.onChangeMultiselectCheckbox(); // выбрать новые
      await nextTick();

      expect(wrapper.vm.vModel).toStrictEqual([1, 3]);
    });
  });
});
