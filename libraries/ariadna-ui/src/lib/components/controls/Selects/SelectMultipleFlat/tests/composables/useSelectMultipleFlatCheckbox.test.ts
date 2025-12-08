import { describe, it, expect, beforeEach } from 'vitest';
import { defineComponent, h, ref, type ModelRef, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import useSelectMultipleFlatCheckbox from '../../composables/useSelectMultipleFlatCheckbox/useSelectMultipleFlatCheckbox';
import { SelectMultipleFlatSelectorTestData } from '../test-data/SelectMultipleFlat.selector.test-data';
import type { TSelectMultipleFlatProps } from '../../SelectMultipleFlat';

const defaultMock = new SelectMultipleFlatSelectorTestData();

function mountWithComposable(vModelValue: any[], props: TSelectMultipleFlatProps) {
  const vModel = ref([...vModelValue]) as unknown as ModelRef<any[], string, any[], any[]>;

  return mount(
    defineComponent({
      setup() {
        const result = useSelectMultipleFlatCheckbox(vModel, props);
        return { ...result, vModel };
      },
      render() {
        return h('div');
      },
    }),
  );
}

describe('useSelectMultipleCheckbox', () => {
  let props: TSelectMultipleFlatProps;
  let options: any[];

  beforeEach(() => {
    props = { ...defaultMock.mockProps };
    options = defaultMock.optionsExample();
    props.options = options;
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

      expect(wrapper.vm.vModel).toStrictEqual(defaultMock.optionsExample());
    });

    it('Should select all option objects if optionValue is not set.', async () => {
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

      expect(wrapper.vm.vModel).toStrictEqual([options[0], options[1], options[2]]);

      // Изменить options (например, удалить одну опцию)
      props.options = [options[0], options[2]];
      // Снова выбрать все (должно выбрать только существующие)
      wrapper.vm.onChangeMultiselectCheckbox(); // очистить
      await nextTick();
      wrapper.vm.onChangeMultiselectCheckbox(); // выбрать новые
      await nextTick();

      expect(wrapper.vm.vModel).toStrictEqual([options[0], options[2]]);
    });
  });
});
