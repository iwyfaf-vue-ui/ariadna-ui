import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import type { Nullable } from '@/types';
import { TextareaSelectorTestData } from '../test-data/Textarea.selector.test-data';
import { ETextareaPropsDefault } from '../../types/Textarea.enums';
import Textarea from '../../Textarea.vue';

const defaultMock = new TextareaSelectorTestData();

describe('Textarea', () => {
  describe('Basic render', () => {
    const wrapper = mount(Textarea, {
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

    it('Should render textarea element.', () => {
      expect(wrapper.find('textarea').exists()).toBe(true);
      expect(wrapper.find(defaultMock.getSelectorWithDot(defaultMock.textareaEl)).exists()).toBe(
        true,
      );
    });

    it('Should render label if prop.label is provided.', () => {
      const wrapper = mount(Textarea, {
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
    it('modelValue: Should update textarea value when prop.modelValue changes.', async () => {
      const wrapper = mount(Textarea, {
        props: {
          modelValue: null,
        },
      });

      await wrapper.setProps({ modelValue: defaultMock.modelValueProp });
      expect(wrapper.props('modelValue')).toBe(defaultMock.modelValueProp);

      const textareaElement: HTMLTextAreaElement = wrapper.find(
        defaultMock.getSelectorWithDot(defaultMock.textareaEl),
      ).element as HTMLTextAreaElement;

      expect(wrapper.props('modelValue')).toEqual(textareaElement.value);
    });

    it('label: Should render label if label prop is provided.', () => {
      const wrapper = mount(Textarea, {
        props: {
          modelValue: null,
          label: defaultMock.labelProp,
        },
      });

      const label = wrapper.find(defaultMock.getSelectorWithDot(defaultMock.labelEl));

      expect(label.exists()).toBe(true);
      expect(label.text()).toBe(defaultMock.labelProp);
    });

    it('id: Should set textarea id from composable if id prop is not provided.', () => {
      const wrapper = mount(Textarea, {
        props: {
          modelValue: null,
        },
      });

      expect(
        wrapper.find(defaultMock.getSelectorWithDot(defaultMock.textareaEl)).attributes('id'),
      ).toBe('v-0');
    });

    it('id: Should set textarea id from id prop if provided.', () => {
      const wrapper = mount(Textarea, {
        props: {
          modelValue: null,
          id: defaultMock.idProp,
        },
      });

      expect(
        wrapper.find(defaultMock.getSelectorWithDot(defaultMock.textareaEl)).attributes('id'),
      ).toBe(defaultMock.idProp);
    });

    it('placeholder: Should set textarea placeholder from props.', () => {
      const wrapper = mount(Textarea, {
        props: {
          modelValue: null,
          placeholder: defaultMock.placeholderProp,
        },
      });

      expect(
        wrapper
          .find(defaultMock.getSelectorWithDot(defaultMock.textareaEl))
          .attributes('placeholder'),
      ).toBe(defaultMock.placeholderProp);
    });

    it('name: Should set textarea name from prop.', () => {
      const wrapper = mount(Textarea, {
        props: {
          modelValue: null,
          name: defaultMock.nameProp,
        },
      });

      expect(
        wrapper.find(defaultMock.getSelectorWithDot(defaultMock.textareaEl)).attributes('name'),
      ).toBe(defaultMock.nameProp);
    });

    it('rows: Should set textarea rows by default if rows prop is not provided.', () => {
      const wrapper = mount(Textarea, {
        props: {
          modelValue: null,
        },
      });

      expect(
        wrapper.find(defaultMock.getSelectorWithDot(defaultMock.textareaEl)).attributes('rows'),
      ).toBe(ETextareaPropsDefault.ROWS);
    });

    it('rows: Should set textarea rows from rows prop if provided.', () => {
      const wrapper = mount(Textarea, {
        props: {
          modelValue: null,
          rows: defaultMock.rowsProp,
        },
      });

      expect(
        wrapper.find(defaultMock.getSelectorWithDot(defaultMock.textareaEl)).attributes('rows'),
      ).toBe(defaultMock.rowsProp);
    });

    it('cols: Should set textarea cols by default if cols prop is not provided.', () => {
      const wrapper = mount(Textarea, {
        props: {
          modelValue: null,
        },
      });

      expect(
        wrapper.find(defaultMock.getSelectorWithDot(defaultMock.textareaEl)).attributes('cols'),
      ).toBe(ETextareaPropsDefault.COLS);
    });

    it('cols: Should set textarea cols from cols prop if provided.', () => {
      const wrapper = mount(Textarea, {
        props: {
          modelValue: null,
          cols: defaultMock.colsProp,
        },
      });

      expect(
        wrapper.find(defaultMock.getSelectorWithDot(defaultMock.textareaEl)).attributes('cols'),
      ).toBe(defaultMock.colsProp);
    });

    it('autocomplete: Should set textarea autocomplete from prop.', () => {
      const wrapper = mount(Textarea, {
        props: {
          modelValue: null,
          autocomplete: true,
        },
      });

      expect(
        wrapper
          .find(defaultMock.getSelectorWithDot(defaultMock.textareaEl))
          .attributes('autocomplete'),
      ).toBe('on');

      const wrapperOff = mount(Textarea, {
        props: {
          modelValue: null,
          autocomplete: false,
        },
      });

      expect(
        wrapperOff
          .find(defaultMock.getSelectorWithDot(defaultMock.textareaEl))
          .attributes('autocomplete'),
      ).toBe('off');
    });

    it('spellcheck: Should set textarea spellcheck from prop.', () => {
      const wrapper = mount(Textarea, {
        props: {
          modelValue: null,
        },
      });

      expect(
        wrapper
          .find(defaultMock.getSelectorWithDot(defaultMock.textareaEl))
          .attributes('spellcheck'),
      ).toBe('true');

      const wrapperOff = mount(Textarea, {
        props: {
          modelValue: null,
          spellcheck: false,
        },
      });

      expect(
        wrapperOff
          .find(defaultMock.getSelectorWithDot(defaultMock.textareaEl))
          .attributes('spellcheck'),
      ).toBe('false');
    });

    it('disabled: Should set textarea disabled from prop.', () => {
      const wrapper = mount(Textarea, {
        props: {
          modelValue: null,
          disabled: true,
        },
      });

      expect(
        wrapper.find(defaultMock.getSelectorWithDot(defaultMock.textareaEl)).attributes('disabled'),
      ).toBeDefined();
    });

    it('readonly: Should set textarea readonly from prop.', () => {
      const wrapper = mount(Textarea, {
        props: {
          modelValue: null,
          readonly: true,
        },
      });

      expect(
        wrapper.find(defaultMock.getSelectorWithDot(defaultMock.textareaEl)).attributes('readonly'),
      ).toBeDefined();
    });

    it('valid: Should add valid class on root if valid prop is true.', () => {
      const wrapper = mount(Textarea, {
        props: {
          modelValue: null,
          valid: true,
        },
      });

      expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.validModifier);
    });

    it('invalid: Should add invalid class on root if invalid prop is true.', () => {
      const wrapper = mount(Textarea, {
        props: {
          modelValue: null,
          invalid: true,
        },
      });

      expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.invalidModifier);
    });

    it('errors: Should render errors if prop invalid and prop errors provided.', () => {
      const errors = ['Error 1', 'Error 2'];

      const wrapper = mount(Textarea, {
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
      const _defaultMock = new TextareaSelectorTestData(defaultMock.cssClassProp);
      const errors = ['Error 1', 'Error 2'];

      const wrapper = mount(Textarea, {
        props: {
          modelValue: defaultMock.modelValueProp,
          label: defaultMock.labelProp,
          disabled: true,
          valid: true,
          invalid: true,
          errors,
          cssClass: defaultMock.cssClassProp,
        },
        slots: {
          placeholder: await TextareaSelectorTestData.getTextareaPlaceholderSlotCustom(),
        },
      });

      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.rootEl)).exists()).toBe(true);
      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.groupEl)).exists()).toBe(
        true,
      );
      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.labelEl)).exists()).toBe(
        true,
      );
      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.textareaEl)).exists()).toBe(
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
      const wrapper = mount(Textarea, {
        props: {
          modelValue: null,
          modifier: defaultMock.modifierProp,
        },
      });

      expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.primaryModifier);
    });
  });

  describe('Slots', () => {
    it('placeholder: Should render placeholder slot if provided.', async () => {
      const wrapper = mount(Textarea, {
        props: { modelValue: null },
        slots: {
          placeholder: await TextareaSelectorTestData.getTextareaPlaceholderSlotCustom(),
        },
      });

      expect(wrapper.find(defaultMock.getSelectorWithDot(defaultMock.placeholderEl)).exists()).toBe(
        true,
      );
    });

    it('errors: Should render errors slot if provided.', async () => {
      const errors = ['Custom Error 1', 'Custom Error 2'];

      const wrapper = mount(Textarea, {
        props: { modelValue: null, invalid: true, errors },
        slots: {
          errors: await TextareaSelectorTestData.getTextareaErrorsSlotCustom(),
        },
      });

      expect(wrapper.find('.slot-errors-1').exists()).toBe(true);
      expect(wrapper.find('.slot-errors-1').text()).toBe('Custom Error 1');

      expect(wrapper.find('.slot-errors-2').exists()).toBe(true);
      expect(wrapper.find('.slot-errors-2').text()).toBe('Custom Error 2');
    });
  });

  describe('Emits', () => {
    const wrapper = mount(Textarea, {
      props: {
        modelValue: null,
        'onUpdate:modelValue': (e: Nullable<string>) => wrapper.setProps({ modelValue: e }),
      },
    });

    it('update:modelValue: Should emit update:modelValue on textarea.', async () => {
      const textarea = wrapper.find(defaultMock.getSelectorWithDot(defaultMock.textareaEl));

      await textarea.setValue(defaultMock.modelValueProp);

      expect(wrapper.emitted()['update:modelValue']).toBeTruthy();
      expect(wrapper.emitted()['update:modelValue'][0]).toEqual([defaultMock.modelValueProp]);
    });

    it('focus: Should emit focus event on textarea focus.', async () => {
      const textarea = wrapper.find(defaultMock.getSelectorWithDot(defaultMock.textareaEl));

      await textarea.trigger('focus');

      expect(wrapper.emitted('focus')).toBeTruthy();
      expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.focusedModifier);
    });

    it('blur: Should emit blur event on textarea blur.', async () => {
      const textarea = wrapper.find(defaultMock.getSelectorWithDot(defaultMock.textareaEl));

      await textarea.trigger('focus');

      expect(wrapper.emitted('focus')).toBeTruthy();
      expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.focusedModifier);

      await textarea.trigger('blur');

      expect(wrapper.emitted('blur')).toBeTruthy();
      expect(wrapper.find(defaultMock.rootEl).classes()).not.toContain(defaultMock.focusedModifier);
    });

    it('change: Should emit change event on textarea change.', async () => {
      const textarea = wrapper.find(defaultMock.getSelectorWithDot(defaultMock.textareaEl));

      await textarea.trigger('change');

      expect(wrapper.emitted('change')).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('Should set textarea "id" from composable.', () => {
      const wrapper = mount(Textarea, {
        props: {
          modelValue: null,
          label: defaultMock.labelProp,
        },
      });

      const label = wrapper.find(defaultMock.getSelectorWithDot(defaultMock.labelEl));

      expect(label.attributes('for')).toBe('v-0');
    });

    it('Should set label "for" attribute to textarea id.', () => {
      const wrapper = mount(Textarea, {
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
