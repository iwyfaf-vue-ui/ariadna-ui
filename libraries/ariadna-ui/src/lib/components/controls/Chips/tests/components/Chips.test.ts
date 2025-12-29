import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import Chips from '../../Chips.vue';
import InputText from '../../../../controls/InputText/InputText.vue';
import { EChipsPropsDefault } from '../../types/Chips.enums';
import { ChipsSelectorTestData } from '../test-data/Chips.selector.test-data';
import type { TChipsProps } from '../../Chips';

const defaultMock = new ChipsSelectorTestData();

describe('Chips', () => {
  describe('Basic render', () => {
    it('Should render component without errors.', () => {
      const wrapper = mount(Chips, {
        props: {
          ...defaultMock.mockProps,
          modelValue: defaultMock.modelValueProp,
        },
      });

      expect(wrapper.exists()).toBe(true);
    });

    it('Should render with default CSS class and role option.', () => {
      const wrapper = mount(Chips, {
        props: {
          ...defaultMock.mockProps,
          modelValue: defaultMock.modelValueProp,
        },
      });

      expect(wrapper.classes()).toContain(EChipsPropsDefault.CSS_CLASS);
      expect(wrapper.findAll('[role="option"]')).toHaveLength(3);
    });
  });

  describe('Props', () => {
    it('modelValue: Should update input value when prop.modelValue changes.', async () => {
      const wrapper = mount(Chips, {
        props: {
          ...defaultMock.mockProps,
        },
      });

      await wrapper.setProps({ modelValue: defaultMock.modelValueProp });
      expect(wrapper.props('modelValue')).toStrictEqual(defaultMock.modelValueProp);
    });

    it('label: Should render label if label prop is provided.', () => {
      const wrapper = mount(Chips, {
        props: {
          ...defaultMock.mockProps,
          label: defaultMock.labelProp,
        },
      });

      const label = wrapper.find(defaultMock.getSelectorWithDot(defaultMock.labelEl));

      expect(label.exists()).toBe(true);
      expect(label.text()).toBe(defaultMock.labelProp);
    });

    it('id: Should set input id from id prop if provided.', () => {
      const wrapper = mount(Chips, {
        props: {
          ...defaultMock.mockProps,
          id: defaultMock.idProp,
          writable: true,
        },
      });

      const input = wrapper.find('input');
      expect(input.attributes('id')).toBe(defaultMock.idProp);
    });

    it('id: Should set input id from composable if id prop is not provided.', () => {
      const wrapper = mount(Chips, {
        props: {
          ...defaultMock.mockProps,
          writable: true,
        },
      });

      const input = wrapper.find('input');
      expect(input.attributes('id')).toBe('v-0');
    });

    it('placeholder: Should display placeholder if modelValue is null.', () => {
      const wrapper = mount(Chips, {
        props: {
          ...defaultMock.mockProps,
          placeholder: defaultMock.placeholderProp,
          writable: true,
        },
      });

      const input = wrapper.find('input');
      expect(input.attributes('placeholder')).toBe(defaultMock.placeholderProp);
    });

    it('writable: Should render default InputText component when writable is true.', () => {
      const wrapper = mount(Chips, {
        props: {
          ...defaultMock.mockProps,
          writable: true,
        },
      });

      expect(wrapper.findComponent(InputText).exists()).toBe(true);
    });

    it('clearable: Should show clear button when clearable and has values.', () => {
      const wrapper = mount(Chips, {
        props: {
          ...defaultMock.mockProps,
          modelValue: defaultMock.modelValueProp,
          clearable: true,
        },
      });

      expect(wrapper.find(defaultMock.getSelectorWithDot(defaultMock.itemClearEl)).exists()).toBe(
        true,
      );
    });

    it('disabled: Should set input disabled from prop.', () => {
      const wrapper = mount(Chips, {
        props: {
          ...defaultMock.mockProps,
          disabled: true,
        },
      });

      expect(
        wrapper.find(defaultMock.getSelectorWithDot(defaultMock.rootEl)).attributes('tabindex'),
      ).toBeUndefined();
    });

    it('size: Should apply small size modifier class when size="small".', () => {
      const wrapper = mount(Chips, {
        props: {
          ...defaultMock.mockProps,
          size: defaultMock.sizeProp,
        },
      });

      expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.sizeSmallModifier);
    });

    it('size: Should apply medium size modifier class when size="medium".', () => {
      const wrapper = mount(Chips, {
        props: {
          ...defaultMock.mockProps,
          size: (defaultMock.sizeProp = 'medium'),
        },
      });

      expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.sizeMediumModifier);
    });

    it('size: Should apply large size modifier class when size="large".', () => {
      const wrapper = mount(Chips, {
        props: {
          ...defaultMock.mockProps,
          size: (defaultMock.sizeProp = 'large'),
        },
      });

      expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.sizeLargeModifier);
    });

    it('valid: Should add valid class on root if valid prop is true.', () => {
      const wrapper = mount(Chips, {
        props: {
          ...defaultMock.mockProps,
          valid: true,
        },
      });

      expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.validModifier);
    });

    it('invalid: Should add invalid class on root if invalid prop is true.', () => {
      const wrapper = mount(Chips, {
        props: {
          ...defaultMock.mockProps,
          invalid: true,
        },
      });

      expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.invalidModifier);
    });

    it('errors: Should render errors if prop invalid and prop errors provided.', () => {
      const errors = ['Error 1', 'Error 2'];

      const wrapper = mount(Chips, {
        props: {
          ...defaultMock.mockProps,
          invalid: true,
          errors,
        },
      });

      expect(wrapper.findAll(`${defaultMock.errorsEl}-1, ${defaultMock.errorsEl}-2`).length).toBe(
        2,
      );
      expect(wrapper.text()).toContain('Error 1');
      expect(wrapper.text()).toContain('Error 2');
    });

    it('cssClass: Should apply custom root class and generate BEM child classes.', async () => {
      const _defaultMock = new ChipsSelectorTestData(defaultMock.cssClassProp);
      const errors = ['Error 1', 'Error 2'];

      const wrapper = mount(Chips, {
        props: {
          ...defaultMock.mockProps,
          modelValue: defaultMock.modelValueProp,
          label: defaultMock.labelProp,
          size: defaultMock.sizeProp,
          writable: true,
          clearable: true,
          loading: true,
          valid: true,
          invalid: true,
          errors,
          cssClass: defaultMock.cssClassProp,
        },
      });

      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.rootEl)).exists()).toBe(true);
      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.groupEl)).exists()).toBe(
        true,
      );
      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.labelEl)).exists()).toBe(
        true,
      );
      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.listEl)).exists()).toBe(true);
      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.itemEl)).exists()).toBe(true);
      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.itemRemoveEl)).exists()).toBe(
        true,
      );
      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.itemClearEl)).exists()).toBe(
        true,
      );
      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.errorsEl)).exists()).toBe(
        true,
      );
    });

    it('modifier: Should apply modifier class.', async () => {
      const wrapper = mount(Chips, {
        props: {
          ...defaultMock.mockProps,
          modifier: defaultMock.modifierProp,
        },
      });

      expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.primaryModifier);
    });
  });

  describe('Slots', () => {
    it('chip: Should render default options slot.', async () => {
      const wrapper = mount(Chips, {
        props: {
          ...defaultMock.mockProps,
          modelValue: defaultMock.modelValueProp,
        },
      });

      expect(wrapper.find(defaultMock.itemEl).element.innerHTML).toBe(
        (await ChipsSelectorTestData.getChipsChipSlotDefault()).trim(),
      );
    });

    it('chip: Should render custom options slot if provided.', async () => {
      const wrapper = mount(Chips, {
        props: {
          ...defaultMock.mockProps,
          modelValue: defaultMock.modelValueProp,
        },
        slots: {
          chip: '<template #chip="{value}">Custom chip slot {{ value }}</template>',
        },
      });

      expect(wrapper.find(defaultMock.itemEl).element.innerHTML).toBe(
        (await ChipsSelectorTestData.getChipsChipSlotCustom()).trim(),
      );
    });

    it('remove: Should render default options slot.', async () => {
      const wrapper = mount(Chips, {
        props: {
          ...defaultMock.mockProps,
          modelValue: defaultMock.modelValueProp,
        },
      });

      expect(wrapper.find(defaultMock.itemRemoveEl).element.innerHTML).toBe(
        (await ChipsSelectorTestData.getChipsRemoveSlotDefault()).trim(),
      );
    });

    it('remove: Should render custom options slot if provided.', async () => {
      const wrapper = mount(Chips, {
        props: {
          ...defaultMock.mockProps,
          modelValue: defaultMock.modelValueProp,
        },
        slots: {
          remove: await ChipsSelectorTestData.getChipsRemoveSlotCustom(),
        },
      });

      expect(wrapper.find(defaultMock.itemRemoveEl).element.innerHTML).toBe(
        (await ChipsSelectorTestData.getChipsRemoveSlotCustom()).trim(),
      );
    });

    it('clear: Should render default options slot.', async () => {
      const wrapper = mount(Chips, {
        props: {
          ...defaultMock.mockProps,
          modelValue: defaultMock.modelValueProp,
          clearable: true,
        },
      });

      expect(wrapper.find(defaultMock.itemClearEl).element.innerHTML).toBe(
        (await ChipsSelectorTestData.getChipsClearSlotDefault()).trim(),
      );
    });

    it('clear: Should render custom options slot if provided.', async () => {
      const wrapper = mount(Chips, {
        props: {
          ...defaultMock.mockProps,
          modelValue: defaultMock.modelValueProp,
          clearable: true,
        },
        slots: {
          clear: await ChipsSelectorTestData.getChipsClearSlotCustom(),
        },
      });

      expect(wrapper.find(defaultMock.itemClearEl).element.innerHTML).toBe(
        (await ChipsSelectorTestData.getChipsClearSlotCustom()).trim(),
      );
    });

    it('input: Should render default options slot.', async () => {
      const wrapper = mount(Chips, {
        props: {
          ...defaultMock.mockProps,
          modelValue: defaultMock.modelValueProp,
          writable: true,
        },
      });

      expect(wrapper.find(defaultMock.inputEl).element.innerHTML).toBe(
        (await ChipsSelectorTestData.getChipsInputSlotDefault()).trim(),
      );
    });

    it('input: Should render custom options slot if provided.', async () => {
      const wrapper = mount(Chips, {
        props: {
          ...defaultMock.mockProps,
          modelValue: defaultMock.modelValueProp,
          writable: true,
        },
        slots: {
          input: await ChipsSelectorTestData.getChipsInputSlotCustom(),
        },
      });

      expect(wrapper.find(defaultMock.inputEl).element.innerHTML).toBe(
        (await ChipsSelectorTestData.getChipsInputSlotCustom()).trim(),
      );
    });

    it('errors: Should render errors slot if provided.', async () => {
      const errors = ['Custom Error 1', 'Custom Error 2'];

      const wrapper = mount(Chips, {
        props: {
          ...defaultMock.mockProps,
          invalid: true,
          errors,
        },
      });

      await wrapper.setProps({ invalid: true, errors: defaultMock.errorsExample() });

      expect(wrapper.find(defaultMock.errorsEl).element.innerHTML).toBe(
        (await ChipsSelectorTestData.getChipsErrorsSlotDefault()).trim(),
      );
    });

    it('errors: Should render custom errors empty slot.', async () => {
      const errors = ['Custom Error 1', 'Custom Error 2'];

      const wrapper = mount(Chips, {
        props: {
          ...defaultMock.mockProps,
          invalid: true,
          errors,
        },
        slots: {
          errors: await ChipsSelectorTestData.getChipsErrorsSlotCustom(),
        },
      });

      expect(wrapper.find(defaultMock.errorsEl).exists()).toBeTruthy();
      expect(wrapper.find(defaultMock.errorsEl).element.innerHTML).toBe(
        (await ChipsSelectorTestData.getChipsErrorsSlotCustom()).trim(),
      );
    });
  });

  describe('Emits', () => {
    it('update:model-value: Should emit update:modelValue on input.', async () => {
      const wrapper = mount(Chips, {
        props: {
          ...defaultMock.mockProps,
          modelValue: defaultMock.modelValueProp,
          'onUpdate:modelValue': (e: TChipsProps['modelValue']) =>
            wrapper.setProps({ modelValue: e }),
        },
      });

      await wrapper.findAll(`.${defaultMock.className}__item-remove`)[0].trigger('click');

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([['React', 'Angular']]);
    });

    it('add: Should emit add event when new chip.', async () => {
      const wrapper = mount(Chips, {
        props: {
          ...defaultMock.mockProps,
          writable: true,
        },
      });

      await wrapper.find('input').setValue('Angular');
      await wrapper.find('input').trigger('keydown', {
        key: 'Enter',
      });

      expect(wrapper.emitted('add')).toBeTruthy();
      expect(wrapper.emitted('add')?.[0]).toEqual([{ value: 'Angular' }]);
    });

    it('remove: Should emit add event when new chip.', async () => {
      const wrapper = mount(Chips, {
        props: {
          ...defaultMock.mockProps,
          modelValue: defaultMock.modelValueProp,
          writable: true,
        },
      });

      await wrapper.find(defaultMock.rootEl).trigger('keydown', {
        key: 'ArrowRight',
      });
      await wrapper.find('input').trigger('keydown', {
        key: 'Enter',
      });

      expect(wrapper.emitted('remove')).toBeTruthy();
      expect(wrapper.emitted('remove')?.[0]).toEqual([{ idx: 0, value: 'Vue' }]);
    });

    it('clear: Should emit clear event when values is cleared.', async () => {
      const wrapper = mount(Chips, {
        props: {
          ...defaultMock.mockProps,
          modelValue: defaultMock.modelValueProp,
          clearable: true,
        },
      });

      await wrapper.find(defaultMock.itemClearEl).trigger('click');

      expect(wrapper.emitted()).toHaveProperty('clear');
    });

    it('focus: Should emit focus event on input focus.', async () => {
      const wrapper = mount(Chips, {
        props: defaultMock.mockProps,
      });

      await wrapper.trigger('focus');
      expect(wrapper.emitted('focus')).toBeTruthy();
    });

    it('blur: Should emit blur event on input blur.', async () => {
      const wrapper = mount(Chips, {
        props: defaultMock.mockProps,
      });

      await wrapper.trigger('blur');
      expect(wrapper.emitted('blur')).toBeTruthy();
    });
  });

  describe('Accessibility: Aria & Roles', () => {
    it('Should have proper ARIA attributes.', () => {
      const wrapper = mount(Chips, {
        props: {
          ...defaultMock.mockProps,
          modelValue: defaultMock.modelValueProp,
        },
      });

      const list = wrapper.find(defaultMock.listEl);
      expect(list.attributes('role')).toBe('listbox');

      const items = wrapper.findAll('[role="option"]');
      expect(items).toHaveLength(3);
      expect(items[0].attributes('aria-selected')).toBe('false');
    });
  });

  describe('Accessibility: Keyboard Support', () => {
    it('Should be keyboard navigable.', async () => {
      const wrapper = mount(Chips, {
        props: {
          ...defaultMock.mockProps,
          modelValue: defaultMock.modelValueProp,
        },
      });

      await wrapper.trigger('keydown', { key: 'ArrowRight' });
      const firstItem = wrapper.findAll('[role="option"]')[0];
      expect(firstItem.classes()).toContain(defaultMock.itemFocusedModifier);

      await wrapper.trigger('keydown', { key: 'ArrowRight' });
      const secondItem = wrapper.findAll('[role="option"]')[1];
      expect(secondItem.classes()).toContain(defaultMock.itemFocusedModifier);
    });
  });
});
