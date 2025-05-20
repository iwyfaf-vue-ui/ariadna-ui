import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import type { Nullable } from '@/types';
import { InputTextSelectorTestData } from '../test-data/InputText.selector.test-data';
import InputText from '../../InputText.vue';

const defaultMock = new InputTextSelectorTestData();

describe('InputText.vue', () => {
  describe('Basic render', () => {
    const wrapper = mount(InputText, {
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
      const wrapper = mount(InputText, {
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
      const wrapper = mount(InputText, {
        props: {
          modelValue: null,
        },
      });

      await wrapper.setProps({ modelValue: defaultMock.modelValueProp });
      expect(wrapper.props('modelValue')).toBe(defaultMock.modelValueProp);

      const inputElement: HTMLInputElement = wrapper.find(
        defaultMock.getSelectorWithDot(defaultMock.inputEl),
      ).element as HTMLInputElement;

      expect(wrapper.props('modelValue')).toEqual(inputElement.value);
    });

    it('label: Should render label if label prop is provided.', () => {
      const wrapper = mount(InputText, {
        props: {
          modelValue: null,
          label: defaultMock.labelProp,
        },
      });

      const label = wrapper.find(defaultMock.getSelectorWithDot(defaultMock.labelEl));

      expect(label.exists()).toBe(true);
      expect(label.text()).toBe(defaultMock.labelProp);
    });

    it('type: Should set input type to "text" by default.', async () => {
      const wrapper = mount(InputText, {
        props: {
          modelValue: null,
        },
      });

      expect(
        wrapper.find(defaultMock.getSelectorWithDot(defaultMock.inputEl)).attributes('type'),
      ).toBe('text');
    });

    it('type: Should set input type to "email" from prop.', async () => {
      const wrapper = mount(InputText, {
        props: {
          modelValue: null,
          type: 'email',
        },
      });

      expect(
        wrapper.find(defaultMock.getSelectorWithDot(defaultMock.inputEl)).attributes('type'),
      ).toBe('email');
    });

    it('type: Should set input type to "tel" from prop.', async () => {
      const wrapper = mount(InputText, {
        props: {
          modelValue: null,
          type: 'tel',
        },
      });

      expect(
        wrapper.find(defaultMock.getSelectorWithDot(defaultMock.inputEl)).attributes('type'),
      ).toBe('tel');
    });

    it('id: Should set input id from id prop if provided.', () => {
      const wrapper = mount(InputText, {
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
      const wrapper = mount(InputText, {
        props: {
          modelValue: null,
        },
      });

      expect(
        wrapper.find(defaultMock.getSelectorWithDot(defaultMock.inputEl)).attributes('id'),
      ).toBe('v-0');
    });

    it('placeholder: Should set input placeholder from props.', () => {
      const wrapper = mount(InputText, {
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
      const wrapper = mount(InputText, {
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
      const wrapper = mount(InputText, {
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

      const wrapperOff = mount(InputText, {
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
      const wrapper = mount(InputText, {
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
      const wrapper = mount(InputText, {
        props: {
          modelValue: null,
          readonly: true,
        },
      });

      expect(
        wrapper.find(defaultMock.getSelectorWithDot(defaultMock.inputEl)).attributes('readonly'),
      ).toBeDefined();
    });

    it('size: Should apply small size modifier class when size="small".', () => {
      const wrapper = mount(InputText, {
        props: {
          modelValue: null,
          size: defaultMock.sizeProp,
        },
      });

      expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.sizeSmallModifier);
    });

    it('size: Should apply medium size modifier class when size="medium".', () => {
      const wrapper = mount(InputText, {
        props: {
          modelValue: null,
          size: (defaultMock.sizeProp = 'medium'),
        },
      });

      expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.sizeMediumModifier);
    });

    it('size: Should apply large size modifier class when size="large".', () => {
      const wrapper = mount(InputText, {
        props: {
          modelValue: null,
          size: (defaultMock.sizeProp = 'large'),
        },
      });

      expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.sizeLargeModifier);
    });

    it('valid: Should add valid class on root if valid prop is true.', () => {
      const wrapper = mount(InputText, {
        props: {
          modelValue: null,
          valid: true,
        },
      });

      expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.validModifier);
    });

    it('invalid: Should add invalid class on root if invalid prop is true.', () => {
      const wrapper = mount(InputText, {
        props: {
          modelValue: null,
          invalid: true,
        },
      });

      expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.invalidModifier);
    });

    it('errors: Should render errors if prop invalid and prop errors provided.', () => {
      const errors = ['Error 1', 'Error 2'];

      const wrapper = mount(InputText, {
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
      const _defaultMock = new InputTextSelectorTestData(defaultMock.cssClassProp);
      const errors = ['Error 1', 'Error 2'];

      const wrapper = mount(InputText, {
        props: {
          modelValue: defaultMock.modelValueProp,
          label: defaultMock.labelProp,
          size: defaultMock.sizeProp,
          disabled: true,
          valid: true,
          invalid: true,
          errors,
          cssClass: defaultMock.cssClassProp,
        },
        slots: {
          placeholder: await InputTextSelectorTestData.getInputTextPlaceholderSlotCustom(),
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
  });

  describe('Slots', () => {
    it('placeholder: Should render placeholder slot if provided.', async () => {
      const wrapper = mount(InputText, {
        props: { modelValue: null },
        slots: {
          placeholder: await InputTextSelectorTestData.getInputTextPlaceholderSlotCustom(),
        },
      });

      expect(wrapper.find(defaultMock.getSelectorWithDot(defaultMock.placeholderEl)).exists()).toBe(
        true,
      );
    });

    it('errors: Should render errors slot if provided.', async () => {
      const errors = ['Custom Error 1', 'Custom Error 2'];

      const wrapper = mount(InputText, {
        props: { modelValue: null, invalid: true, errors },
        slots: {
          errors: await InputTextSelectorTestData.getInputTextErrorsSlotCustom(),
        },
      });

      expect(wrapper.find('.slot-errors-1').exists()).toBe(true);
      expect(wrapper.find('.slot-errors-1').text()).toBe('Custom Error 1');

      expect(wrapper.find('.slot-errors-2').exists()).toBe(true);
      expect(wrapper.find('.slot-errors-2').text()).toBe('Custom Error 2');
    });
  });

  describe('Emits', () => {
    const wrapper = mount(InputText, {
      props: {
        modelValue: null,
        'onUpdate:modelValue': (e: Nullable<string>) => wrapper.setProps({ modelValue: e }),
      },
    });

    it('update:modelValue: Should emit update:modelValue on input.', async () => {
      const input = wrapper.find(defaultMock.getSelectorWithDot(defaultMock.inputEl));

      await input.setValue(defaultMock.modelValueProp);

      expect(wrapper.emitted()['update:modelValue']).toBeTruthy();
      expect(wrapper.emitted()['update:modelValue'][0]).toEqual([defaultMock.modelValueProp]);
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
  });

  describe('Accessibility', () => {
    it('Should set input "id" from composable.', () => {
      const wrapper = mount(InputText, {
        props: {
          modelValue: null,
          label: defaultMock.labelProp,
        },
      });

      const label = wrapper.find(defaultMock.getSelectorWithDot(defaultMock.labelEl));

      expect(label.attributes('for')).toBe('v-0');
    });

    it('Should set label "for" attribute to input id.', () => {
      const wrapper = mount(InputText, {
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
