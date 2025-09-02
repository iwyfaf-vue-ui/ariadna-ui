import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import InputNumber from '../../InputNumber.vue';
import { InputNumberSelectorTestData } from '../test-data/InputNumber.selector.test-data';
import type { Nullable } from '@/types';

const defaultMock = new InputNumberSelectorTestData();

describe('InputNumber.vue', () => {
  describe('Basic render', () => {
    const wrapper = mount(InputNumber, {
      props: {
        modelValue: null,
      },
    });

    it('Should render component without errors.', () => {
      expect(wrapper.exists()).toBe(true);
    });

    it('Should apply default root CSS class.', () => {
      expect(wrapper.classes()).toContain(defaultMock.getSelectorWithoutDot(defaultMock.rootEl));
    });

    it('Should render input element.', () => {
      expect(wrapper.find('input').exists()).toBe(true);
      expect(wrapper.find(defaultMock.getSelectorWithDot(defaultMock.inputEl)).exists()).toBe(true);
    });

    it('Should render label if prop.label is provided.', () => {
      const wrapper = mount(InputNumber, {
        props: {
          modelValue: null,
          label: 'Test Label',
        },
      });
      const label = wrapper.find(defaultMock.getSelectorWithDot(defaultMock.labelEl));

      expect(label.exists()).toBe(true);
      expect(label.text()).toBe('Test Label');
    });
  });

  describe('Props', () => {
    it('modelValue: Should update input value when prop.modelValue changes.', async () => {
      const wrapper = mount(InputNumber, {
        props: {
          modelValue: null,
        },
      });

      await wrapper.setProps({ modelValue: defaultMock.modelValueProp });
      expect(wrapper.props('modelValue')).toBe(defaultMock.modelValueProp);

      const inputElement: HTMLInputElement = wrapper.find(
        defaultMock.getSelectorWithDot(defaultMock.inputEl),
      ).element as HTMLInputElement;

      expect(wrapper.props('modelValue')).toEqual(Number(inputElement.value));
    });

    it('label: Should render label if label prop is provided.', () => {
      const wrapper = mount(InputNumber, {
        props: {
          modelValue: null,
          label: defaultMock.labelProp,
        },
      });

      const label = wrapper.find(defaultMock.getSelectorWithDot(defaultMock.labelEl));

      expect(label.exists()).toBe(true);
      expect(label.text()).toBe(defaultMock.labelProp);
    });

    it('id: Should set input id from id prop if provided.', () => {
      const wrapper = mount(InputNumber, {
        props: {
          modelValue: null,
          id: defaultMock.idProp,
        },
      });

      expect(
        wrapper.find(defaultMock.getSelectorWithDot(defaultMock.inputEl)).attributes('id'),
      ).toBe(defaultMock.idProp);
    });

    it('id: Should set input id from composable if id prop is not provided.', () => {
      const wrapper = mount(InputNumber, {
        props: {
          modelValue: null,
        },
      });

      expect(
        wrapper.find(defaultMock.getSelectorWithDot(defaultMock.inputEl)).attributes('id'),
      ).toBe('v-0');
    });

    it('placeholder: Should set input placeholder from props.', () => {
      const wrapper = mount(InputNumber, {
        props: {
          modelValue: null,
          placeholder: defaultMock.placeholderProp,
        },
      });

      expect(
        wrapper.find(defaultMock.getSelectorWithDot(defaultMock.inputEl)).attributes('placeholder'),
      ).toBe(defaultMock.placeholderProp);
    });

    it('name: Should set input name from prop.', () => {
      const wrapper = mount(InputNumber, {
        props: {
          modelValue: null,
          name: defaultMock.nameProp,
        },
      });

      expect(
        wrapper.find(defaultMock.getSelectorWithDot(defaultMock.inputEl)).attributes('name'),
      ).toBe(defaultMock.nameProp);
    });

    it('autocomplete: Should set input autocomplete from prop.', () => {
      const wrapper = mount(InputNumber, {
        props: {
          modelValue: null,
          autocomplete: true,
        },
      });

      expect(
        wrapper
          .find(defaultMock.getSelectorWithDot(defaultMock.inputEl))
          .attributes('autocomplete'),
      ).toBe('on');

      const wrapperOff = mount(InputNumber, {
        props: {
          modelValue: null,
          autocomplete: false,
        },
      });

      expect(
        wrapperOff
          .find(defaultMock.getSelectorWithDot(defaultMock.inputEl))
          .attributes('autocomplete'),
      ).toBe('off');
    });

    it('disabled: Should set input disabled from prop.', () => {
      const wrapper = mount(InputNumber, {
        props: {
          modelValue: null,
          disabled: true,
        },
      });

      expect(
        wrapper.find(defaultMock.getSelectorWithDot(defaultMock.inputEl)).attributes('disabled'),
      ).toBeDefined();
    });

    it('readonly: Should set input readonly from prop.', () => {
      const wrapper = mount(InputNumber, {
        props: {
          modelValue: null,
          readonly: true,
        },
      });

      expect(
        wrapper.find(defaultMock.getSelectorWithDot(defaultMock.inputEl)).attributes('readonly'),
      ).toBeDefined();
    });

    it('controls: Should not render increment and decrement controls when controls prop is false.', () => {
      const wrapper = mount(InputNumber, {
        props: {
          modelValue: null,
        },
      });

      expect(
        wrapper.find(defaultMock.getSelectorWithDot(defaultMock.incrementControlEl)).exists(),
      ).toBe(false);
      expect(
        wrapper.find(defaultMock.getSelectorWithDot(defaultMock.decrementControlEl)).exists(),
      ).toBe(false);
    });

    it('controls: Should render increment and decrement controls when controls prop is true.', () => {
      const wrapper = mount(InputNumber, {
        props: {
          modelValue: null,
          controls: true,
        },
      });

      expect(
        wrapper.find(defaultMock.getSelectorWithDot(defaultMock.incrementControlEl)).exists(),
      ).toBe(true);
      expect(
        wrapper.find(defaultMock.getSelectorWithDot(defaultMock.decrementControlEl)).exists(),
      ).toBe(true);
    });

    it('size: Should apply small size modifier class when size="small".', () => {
      const wrapper = mount(InputNumber, {
        props: {
          modelValue: null,
          size: defaultMock.sizeProp,
        },
      });

      expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.sizeSmallModifier);
    });

    it('size: Should apply medium size modifier class when size="medium".', () => {
      const wrapper = mount(InputNumber, {
        props: {
          modelValue: null,
          size: (defaultMock.sizeProp = 'medium'),
        },
      });

      expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.sizeMediumModifier);
    });

    it('size: Should apply large size modifier class when size="large".', () => {
      const wrapper = mount(InputNumber, {
        props: {
          modelValue: null,
          size: (defaultMock.sizeProp = 'large'),
        },
      });

      expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.sizeLargeModifier);
    });

    it('min: Should set aria-valuemin attribute on input.', () => {
      const wrapper = mount(InputNumber, {
        props: {
          modelValue: null,
          min: 3,
        },
      });

      expect(
        wrapper
          .find(defaultMock.getSelectorWithDot(defaultMock.inputEl))
          .attributes('aria-valuemin'),
      ).toBe('3');
    });

    it('min: Should not decrement below min using decrement control.', async () => {
      const wrapper = mount(InputNumber, {
        props: {
          modelValue: null,
          min: 5,
          controls: true,
        },
      });

      await wrapper.setProps({ modelValue: 3 });
      const decControl = wrapper.find(
        defaultMock.getSelectorWithDot(defaultMock.decrementControlEl),
      );
      await decControl.trigger('mousedown');

      await wrapper.vm.$nextTick();
      const inputElement: HTMLInputElement = wrapper.find(
        defaultMock.getSelectorWithDot(defaultMock.inputEl),
      ).element as HTMLInputElement;

      expect(Number(inputElement.value)).toBe(5);
    });

    it('min: Should update aria-valuemin when min prop changes.', async () => {
      const wrapper = mount(InputNumber, {
        props: {
          modelValue: null,
          min: 5,
          controls: true,
        },
      });
      await wrapper.setProps({ min: 10 });
      const input = wrapper.find(defaultMock.getSelectorWithDot(defaultMock.inputEl));

      expect(input.attributes('aria-valuemin')).toBe('10');
    });

    it('max: Should set aria-valuemax attribute on input.', () => {
      const wrapper = mount(InputNumber, {
        props: {
          modelValue: null,
          max: 50,
        },
      });

      expect(
        wrapper
          .find(defaultMock.getSelectorWithDot(defaultMock.inputEl))
          .attributes('aria-valuemax'),
      ).toBe('50');
    });

    it('max: Should not increment higher max using increment control.', async () => {
      const wrapper = mount(InputNumber, {
        props: {
          modelValue: null,
          max: 50,
          controls: true,
        },
      });

      await wrapper.setProps({ modelValue: 100 });
      const incControl = wrapper.find(
        defaultMock.getSelectorWithDot(defaultMock.incrementControlEl),
      );
      await incControl.trigger('mousedown');

      await wrapper.vm.$nextTick();
      const inputElement: HTMLInputElement = wrapper.find(
        defaultMock.getSelectorWithDot(defaultMock.inputEl),
      ).element as HTMLInputElement;

      expect(Number(inputElement.value)).toBe(50);
    });

    it('max: Should update aria-valuemax when min prop changes.', async () => {
      const wrapper = mount(InputNumber, {
        props: {
          modelValue: null,
          max: 50,
          controls: true,
        },
      });
      await wrapper.setProps({ max: 100 });
      const input = wrapper.find(defaultMock.getSelectorWithDot(defaultMock.inputEl));

      expect(input.attributes('aria-valuemax')).toBe('100');
    });

    it('step: Should increment value by step when increment control is used.', async () => {
      const wrapper = mount(InputNumber, {
        props: {
          modelValue: 10,
          step: 2,
          controls: true,
        },
      });

      const incControl = wrapper.find(
        defaultMock.getSelectorWithDot(defaultMock.incrementControlEl),
      );
      await incControl.trigger('mousedown');
      await wrapper.vm.$nextTick();
      const inputElement: HTMLInputElement = wrapper.find(
        defaultMock.getSelectorWithDot(defaultMock.inputEl),
      ).element as HTMLInputElement;

      expect(Number(inputElement.value)).toBe(12);
    });

    it('step: Should decrement value by step when decrement control is used.', async () => {
      const wrapper = mount(InputNumber, {
        props: {
          modelValue: 10,
          step: 2,
          controls: true,
        },
      });

      const decControl = wrapper.find(
        defaultMock.getSelectorWithDot(defaultMock.decrementControlEl),
      );
      await decControl.trigger('mousedown');
      await wrapper.vm.$nextTick();
      const inputElement: HTMLInputElement = wrapper.find(
        defaultMock.getSelectorWithDot(defaultMock.inputEl),
      ).element as HTMLInputElement;

      expect(Number(inputElement.value)).toBe(8);
    });

    it('step: Should support decimal step values.', async () => {
      const wrapper = mount(InputNumber, {
        props: {
          modelValue: 1,
          step: 0.5,
          controls: true,
        },
      });

      const incControl = wrapper.find(
        defaultMock.getSelectorWithDot(defaultMock.incrementControlEl),
      );
      await incControl.trigger('mousedown');
      await wrapper.vm.$nextTick();
      const inputElement: HTMLInputElement = wrapper.find(
        defaultMock.getSelectorWithDot(defaultMock.inputEl),
      ).element as HTMLInputElement;
      expect(Number(inputElement.value)).toBeCloseTo(1.5, 5);

      const decControl = wrapper.find(
        defaultMock.getSelectorWithDot(defaultMock.decrementControlEl),
      );
      await decControl.trigger('mousedown');
      await wrapper.vm.$nextTick();
      expect(Number(inputElement.value)).toBeCloseTo(1, 5);
    });

    it('empty: Should display empty text when modelValue is null.', async () => {
      const wrapper = mount(InputNumber, {
        props: {
          modelValue: null,
          empty: 'No value',
        },
      });

      const inputElement: HTMLInputElement = wrapper.find(
        defaultMock.getSelectorWithDot(defaultMock.inputEl),
      ).element as HTMLInputElement;
      expect(inputElement.value).toBe('No value');
    });

    it('prefix: Should display prefix before the value in the input.', () => {
      const wrapper = mount(InputNumber, {
        props: {
          modelValue: 123,
          prefix: '$',
        },
      });

      const inputElement: HTMLInputElement = wrapper.find(
        defaultMock.getSelectorWithDot(defaultMock.inputEl),
      ).element as HTMLInputElement;

      expect(inputElement.value.startsWith('$')).toBe(true);
      expect(inputElement.value).toContain('123');
    });

    it('prefix: Should update prefix dynamically.', async () => {
      const wrapper = mount(InputNumber, {
        props: {
          modelValue: 123,
          prefix: '$',
        },
      });

      await wrapper.setProps({ prefix: '€' });
      const inputElement: HTMLInputElement = wrapper.find(
        defaultMock.getSelectorWithDot(defaultMock.inputEl),
      ).element as HTMLInputElement;

      expect(inputElement.value.startsWith('€')).toBe(true);
      expect(inputElement.value).toContain('123');
    });

    it('prefix: Should not display prefix if prop is not provided.', async () => {
      const wrapper = mount(InputNumber, {
        props: {
          modelValue: 123,
          prefix: '$',
        },
      });

      await wrapper.setProps({ prefix: undefined });
      const inputElement: HTMLInputElement = wrapper.find(
        defaultMock.getSelectorWithDot(defaultMock.inputEl),
      ).element as HTMLInputElement;

      expect(inputElement.value.startsWith('$')).toBe(false);
      expect(inputElement.value).toBe('123');
    });

    it('suffix: Should display suffix after the value in the input.', () => {
      const wrapper = mount(InputNumber, {
        props: {
          modelValue: 123,
          suffix: '₽',
        },
      });

      const inputElement: HTMLInputElement = wrapper.find(
        defaultMock.getSelectorWithDot(defaultMock.inputEl),
      ).element as HTMLInputElement;

      expect(inputElement.value.endsWith('₽')).toBe(true);
      expect(inputElement.value).toContain('123');
    });

    it('suffix: Should update suffix dynamically.', async () => {
      const wrapper = mount(InputNumber, {
        props: {
          modelValue: 123,
          suffix: '₽',
        },
      });

      await wrapper.setProps({ suffix: '$' });
      const inputElement: HTMLInputElement = wrapper.find(
        defaultMock.getSelectorWithDot(defaultMock.inputEl),
      ).element as HTMLInputElement;

      expect(inputElement.value.endsWith('$')).toBe(true);
      expect(inputElement.value).toContain('123');
    });

    it('suffix: Should not display suffix if not provided.', async () => {
      const wrapper = mount(InputNumber, {
        props: {
          modelValue: 123,
          suffix: '₽',
        },
      });

      await wrapper.setProps({ suffix: undefined });
      const inputElement: HTMLInputElement = wrapper.find(
        defaultMock.getSelectorWithDot(defaultMock.inputEl),
      ).element as HTMLInputElement;

      expect(inputElement.value.endsWith('₽')).toBe(false);
      expect(inputElement.value).toBe('123');
    });

    it('locale: Should format value according to ru-RU locale.', () => {
      const wrapper = mount(InputNumber, {
        props: {
          modelValue: 1234567,
          locale: 'ru-RU',
        },
      });

      const inputElement: HTMLInputElement = wrapper.find(
        defaultMock.getSelectorWithDot(defaultMock.inputEl),
      ).element as HTMLInputElement;

      // В ru-RU разделитель тысяч — неразрывный пробел (\u00A0)
      expect(inputElement.value).toBe('1\u00A0234\u00A0567');
    });

    it('locale: Should format value according to en-US locale.', () => {
      const wrapper = mount(InputNumber, {
        props: {
          modelValue: 1234567,
          locale: 'en-US',
        },
      });

      const inputElement: HTMLInputElement = wrapper.find(
        defaultMock.getSelectorWithDot(defaultMock.inputEl),
      ).element as HTMLInputElement;

      expect(inputElement.value).toBe('1,234,567');
    });

    it('locale: Should update formatting when locale prop changes.', async () => {
      const wrapper = mount(InputNumber, {
        props: {
          modelValue: 1234567,
          locale: 'en-US',
        },
      });

      const inputElement: HTMLInputElement = wrapper.find(
        defaultMock.getSelectorWithDot(defaultMock.inputEl),
      ).element as HTMLInputElement;

      expect(inputElement.value).toBe('1,234,567');

      await wrapper.setProps({ locale: 'ru-RU' });
      expect(inputElement.value).toBe('1\u00A0234\u00A0567');
    });

    it('locale: Should not format value if locale prop is not provided.', () => {
      const wrapper = mount(InputNumber, {
        props: {
          modelValue: 1234567,
        },
      });

      const inputElement: HTMLInputElement = wrapper.find(
        defaultMock.getSelectorWithDot(defaultMock.inputEl),
      ).element as HTMLInputElement;

      expect(inputElement.value).toBe('1234567');
    });

    it('masked: Should display formatted value when masked=true', () => {
      const wrapper = mount(InputNumber, {
        props: {
          modelValue: 1234567,
          masked: true,
          locale: 'en-US',
        },
      });

      const inputElement: HTMLInputElement = wrapper.find(
        defaultMock.getSelectorWithDot(defaultMock.inputEl),
      ).element as HTMLInputElement;

      // Ожидаем форматированное значение с разделителями тысяч
      expect(inputElement.value).toBe('1,234,567');
    });

    it('valid: Should add valid class on root if valid prop is true.', () => {
      const wrapper = mount(InputNumber, {
        props: {
          modelValue: null,
          valid: true,
        },
      });

      expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.validModifier);
    });

    it('invalid: Should add invalid class on root if invalid prop is true.', () => {
      const wrapper = mount(InputNumber, {
        props: {
          modelValue: null,
          invalid: true,
        },
      });

      expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.invalidModifier);
    });

    it('errors: Should render errors if prop invalid and prop errors provided.', () => {
      const errors = ['Error 1', 'Error 2'];

      const wrapper = mount(InputNumber, {
        props: {
          modelValue: null,
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
      const _defaultMock = new InputNumberSelectorTestData(defaultMock.cssClassProp);
      const errors = ['Error 1', 'Error 2'];

      const wrapper = mount(InputNumber, {
        props: {
          modelValue: defaultMock.modelValueProp,
          addonBefore: defaultMock.addonBeforeEl,
          addonAfter: defaultMock.addonAfterEl,
          label: defaultMock.labelProp,
          size: defaultMock.sizeProp,
          disabled: true,
          valid: true,
          invalid: true,
          controls: true,
          errors,
          cssClass: defaultMock.cssClassProp,
        },
        slots: {
          placeholder: await InputNumberSelectorTestData.getInputNumberPlaceholderSlotCustom(),
        },
      });

      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.rootEl)).exists()).toBe(true);
      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.groupEl)).exists()).toBe(
        true,
      );
      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.labelEl)).exists()).toBe(
        true,
      );
      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.inputEl)).exists()).toBe(
        true,
      );
      expect(
        wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.decrementControlEl)).exists(),
      ).toBe(true);
      expect(
        wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.incrementControlEl)).exists(),
      ).toBe(true);
      expect(
        wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.addonBeforeEl)).exists(),
      ).toBe(true);
      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.addonAfterEl)).exists()).toBe(
        true,
      );
      expect(
        wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.placeholderEl)).exists(),
      ).toBe(true);
      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.errorsEl)).exists()).toBe(
        true,
      );
      expect(
        wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.themeModifier)).exists(),
      ).toBe(true);
      expect(
        wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.sizeLargeModifier)).exists(),
      ).toBe(true);
      expect(
        wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.disabledModifier)).exists(),
      ).toBe(true);
      expect(
        wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.validModifier)).exists(),
      ).toBe(true);
      expect(
        wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.invalidModifier)).exists(),
      ).toBe(true);
    });

    it('modifier: Should apply modifier class.', async () => {
      const wrapper = mount(InputNumber, {
        props: {
          modelValue: null,
          modifier: defaultMock.modifierProp,
        },
      });

      expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.primaryModifier);
    });
  });

  describe('Slots', () => {
    it('placeholder: Should render custom placeholder slot if provided.', async () => {
      const wrapper = mount(InputNumber, {
        props: {
          modelValue: null,
        },
        slots: {
          placeholder: await InputNumberSelectorTestData.getInputNumberPlaceholderSlotCustom(),
        },
      });

      expect(wrapper.find(defaultMock.getSelectorWithDot(defaultMock.placeholderEl)).exists()).toBe(
        true,
      );
    });

    it('decrementControl: Should render default decrementControl slot.', async () => {
      const wrapper = mount(InputNumber, {
        props: {
          modelValue: null,
          controls: true,
        },
      });

      expect(
        wrapper.find(defaultMock.getSelectorWithDot(defaultMock.decrementControlEl)).exists(),
      ).toBe(true);
      expect(wrapper.find(defaultMock.decrementControlEl).element.innerHTML).toBe(
        await InputNumberSelectorTestData.getInputNumberDecrementControlSlotDefault(),
      );
    });

    it('decrementControl: Should render custom decrementControl slot if provided.', async () => {
      const wrapper = mount(InputNumber, {
        props: {
          modelValue: null,
          controls: true,
        },
        slots: {
          decrementControl:
            await InputNumberSelectorTestData.getInputNumberDecrementControlSlotCustom(),
        },
      });

      expect(
        wrapper.find(defaultMock.getSelectorWithDot(defaultMock.decrementControlEl)).exists(),
      ).toBe(true);
      expect(wrapper.find(defaultMock.decrementControlEl).element.innerHTML).toBe(
        await InputNumberSelectorTestData.getInputNumberDecrementControlSlotCustom(),
      );
    });

    it('incrementControl: Should render default incrementControl slot.', async () => {
      const wrapper = mount(InputNumber, {
        props: {
          modelValue: null,
          controls: true,
        },
      });

      expect(
        wrapper.find(defaultMock.getSelectorWithDot(defaultMock.incrementControlEl)).exists(),
      ).toBe(true);
      expect(wrapper.find(defaultMock.incrementControlEl).element.innerHTML).toBe(
        await InputNumberSelectorTestData.getInputNumberIncrementControlSlotDefault(),
      );
    });

    it('incrementControl: Should render custom incrementControl slot if provided.', async () => {
      const wrapper = mount(InputNumber, {
        props: {
          modelValue: null,
          controls: true,
        },
        slots: {
          incrementControl:
            await InputNumberSelectorTestData.getInputNumberIncrementControlSlotCustom(),
        },
      });

      expect(
        wrapper.find(defaultMock.getSelectorWithDot(defaultMock.incrementControlEl)).exists(),
      ).toBe(true);
      expect(wrapper.find(defaultMock.incrementControlEl).element.innerHTML).toBe(
        await InputNumberSelectorTestData.getInputNumberIncrementControlSlotCustom(),
      );
    });

    it('addonBefore: Should render default addonBefore slot.', async () => {
      const wrapper = mount(InputNumber, {
        props: {
          modelValue: null,
          addonBefore: defaultMock.addonBefore,
        },
      });

      expect(wrapper.find(defaultMock.getSelectorWithDot(defaultMock.addonBeforeEl)).exists()).toBe(
        true,
      );
      expect(wrapper.find(defaultMock.addonBeforeEl).element.innerHTML).toBe(
        await InputNumberSelectorTestData.getInputNumberAddonBeforeSlotDefault(),
      );
    });

    it('addonBefore: Should render custom addonBefore slot if provided.', async () => {
      const wrapper = mount(InputNumber, {
        props: {
          modelValue: null,
          addonBefore: defaultMock.addonBefore,
        },
        slots: {
          addonBefore: await InputNumberSelectorTestData.getInputNumberAddonBeforeSlotCustom(),
        },
      });

      expect(wrapper.find(defaultMock.getSelectorWithDot(defaultMock.addonBeforeEl)).exists()).toBe(
        true,
      );
      expect(wrapper.find(defaultMock.addonBeforeEl).element.innerHTML).toBe(
        await InputNumberSelectorTestData.getInputNumberAddonBeforeSlotCustom(),
      );
    });

    it('addonAfter: Should render default addonAfter slot.', async () => {
      const wrapper = mount(InputNumber, {
        props: {
          modelValue: null,
          addonAfter: defaultMock.addonAfter,
        },
      });

      expect(wrapper.find(defaultMock.getSelectorWithDot(defaultMock.addonAfterEl)).exists()).toBe(
        true,
      );
      expect(wrapper.find(defaultMock.addonAfterEl).element.innerHTML).toBe(
        await InputNumberSelectorTestData.getInputNumberAddonAfterSlotDefault(),
      );
    });

    it('addonAfter: Should render custom addonAfter slot if provided.', async () => {
      const wrapper = mount(InputNumber, {
        props: {
          modelValue: null,
          addonAfter: defaultMock.addonAfter,
        },
        slots: {
          addonAfter: await InputNumberSelectorTestData.getInputNumberAddonAfterSlotCustom(),
        },
      });

      expect(wrapper.find(defaultMock.getSelectorWithDot(defaultMock.addonAfterEl)).exists()).toBe(
        true,
      );
      expect(wrapper.find(defaultMock.addonAfterEl).element.innerHTML).toBe(
        await InputNumberSelectorTestData.getInputNumberAddonAfterSlotCustom(),
      );
    });

    it('errors: Should render errors slot if provided.', async () => {
      const errors = ['Custom Error 1', 'Custom Error 2'];

      const wrapper = mount(InputNumber, {
        props: {
          modelValue: null,
          invalid: true,
          errors,
        },
        slots: {
          errors: await InputNumberSelectorTestData.getInputNumberErrorsSlotCustom(),
        },
      });

      expect(wrapper.find('.slot-errors-1').exists()).toBe(true);
      expect(wrapper.find('.slot-errors-1').text()).toBe('Custom Error 1');

      expect(wrapper.find('.slot-errors-2').exists()).toBe(true);
      expect(wrapper.find('.slot-errors-2').text()).toBe('Custom Error 2');
    });
  });

  describe('Emits', () => {
    const wrapper = mount(InputNumber, {
      props: {
        modelValue: null,
        'onUpdate:modelValue': (e: Nullable<number>) => wrapper.setProps({ modelValue: e }),
        controls: true,
      },
    });

    it('update:modelValue: Should emit update:modelValue on input.', async () => {
      const input = wrapper.find(defaultMock.getSelectorWithDot(defaultMock.inputEl));

      await input.setValue(defaultMock.modelValueProp);

      expect(wrapper.emitted()['update:model-value']).toBeTruthy();
      expect(wrapper.emitted()['update:model-value'][0]).toEqual([defaultMock.modelValueProp]);
    });

    it('focus: Should emit focus event on input focus.', async () => {
      const input = wrapper.find(defaultMock.getSelectorWithDot(defaultMock.inputEl));

      await input.trigger('focus');

      expect(wrapper.emitted('focus')).toBeTruthy();
      expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.focusedModifier);
    });

    it('blur: Should emit blur event on input blur.', async () => {
      const input = wrapper.find(defaultMock.getSelectorWithDot(defaultMock.inputEl));

      await input.trigger('focus');

      expect(wrapper.emitted('focus')).toBeTruthy();
      expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.focusedModifier);

      await input.trigger('blur');

      expect(wrapper.emitted('blur')).toBeTruthy();
      expect(wrapper.find(defaultMock.rootEl).classes()).not.toContain(defaultMock.focusedModifier);
    });

    it('change: Should emit change event on input change.', async () => {
      const input = wrapper.find(defaultMock.getSelectorWithDot(defaultMock.inputEl));

      await input.trigger('change');

      expect(wrapper.emitted('change')).toBeTruthy();
    });

    it('Should emit step on increment/decrement.', async () => {
      const incControl = wrapper.find(
        defaultMock.getSelectorWithDot(defaultMock.incrementControlEl),
      );
      const decControl = wrapper.find(
        defaultMock.getSelectorWithDot(defaultMock.decrementControlEl),
      );
      await incControl.trigger('mousedown');
      await decControl.trigger('mousedown');

      expect(wrapper.emitted('step')).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('Should set input "id" from composable.', () => {
      const wrapper = mount(InputNumber, {
        props: {
          modelValue: null,
          label: defaultMock.labelProp,
        },
      });

      const label = wrapper.find(defaultMock.getSelectorWithDot(defaultMock.labelEl));

      expect(label.attributes('for')).toBe('v-0');
    });

    it('Should set label "for" attribute to input id.', () => {
      const wrapper = mount(InputNumber, {
        props: {
          modelValue: null,
          label: defaultMock.labelProp,
        },
      });

      const label = wrapper.find(defaultMock.getSelectorWithDot(defaultMock.labelEl));

      expect(label.attributes('for')).toBe('v-0');
    });
  });
});
