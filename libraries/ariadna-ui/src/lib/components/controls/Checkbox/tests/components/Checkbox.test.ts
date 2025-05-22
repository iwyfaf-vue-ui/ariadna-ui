import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import Checkbox from '../../Checkbox.vue';
import { CheckboxSelectorTestData } from '../test-data/Checkbox.selector.test-data';

const defaultMock = new CheckboxSelectorTestData();

describe('Checkbox.vue', () => {
  describe('Basic render', () => {
    const wrapper = mount(Checkbox, {
      props: {
        modelValue: false,
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

    it('Should apply root and theme modifier CSS classes.', () => {
      const classes = wrapper.classes();

      const expectedClasses = [
        defaultMock.getSelectorWithoutDot(defaultMock.rootEl),
        defaultMock.getSelectorWithoutDot(defaultMock.themeModifier),
        defaultMock.getSelectorWithoutDot(defaultMock.sizeMediumModifier),
      ];

      expect(classes).toEqual(expect.arrayContaining(expectedClasses));
      expect(classes.length).toBe(expectedClasses.length);
    });
  });

  describe('Props', () => {
    it('modelValue: Should update input value when prop.modelValue changes.', async () => {
      const wrapper = mount(Checkbox, {
        props: {
          modelValue: false,
        },
      });

      await wrapper.setProps({ modelValue: defaultMock.modelValueProp });
      expect(wrapper.props('modelValue')).toBe(defaultMock.modelValueProp);

      const inputElement: HTMLInputElement = wrapper.find(
        defaultMock.getSelectorWithDot(defaultMock.inputEl),
      ).element as HTMLInputElement;

      expect(wrapper.props('modelValue')).toEqual(inputElement.checked);
    });

    it('id: Should set input id from id prop if provided.', () => {
      const wrapper = mount(Checkbox, {
        props: {
          modelValue: false,
          id: defaultMock.idProp,
        },
      });

      expect(
        wrapper.find(defaultMock.getSelectorWithDot(defaultMock.inputEl)).attributes('id'),
      ).toBe(defaultMock.idProp);
    });

    it('id: Should set input id from composable if id prop is not provided.', () => {
      const wrapper = mount(Checkbox, {
        props: {
          modelValue: false,
        },
      });

      expect(
        wrapper.find(defaultMock.getSelectorWithDot(defaultMock.inputEl)).attributes('id'),
      ).toBe('v-0');
    });

    it('name: Should set input name from prop.', () => {
      const wrapper = mount(Checkbox, {
        props: {
          modelValue: false,
          name: defaultMock.nameProp,
        },
      });

      expect(
        wrapper.find(defaultMock.getSelectorWithDot(defaultMock.inputEl)).attributes('name'),
      ).toBe(defaultMock.nameProp);
    });

    it('disabled: Should set input disabled from prop.', () => {
      const wrapper = mount(Checkbox, {
        props: {
          modelValue: false,
          disabled: true,
        },
      });

      expect(
        wrapper.find(defaultMock.getSelectorWithDot(defaultMock.inputEl)).attributes('disabled'),
      ).toBeDefined();
    });

    it('size: Should apply small size modifier class when size="small".', () => {
      const wrapper = mount(Checkbox, {
        props: {
          modelValue: false,
          size: 'small',
        },
      });

      expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.sizeSmallModifier);
    });

    it('size: Should apply medium size modifier class when size="medium".', () => {
      const wrapper = mount(Checkbox, {
        props: {
          modelValue: false,
          size: 'medium',
        },
      });

      expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.sizeMediumModifier);
    });

    it('size: Should apply large size modifier class when size="large".', () => {
      const wrapper = mount(Checkbox, {
        props: {
          modelValue: false,
          size: 'large',
        },
      });

      expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.sizeLargeModifier);
    });

    it('position: Should apply right position modifier class when position="right".', () => {
      const wrapper = mount(Checkbox, {
        props: {
          modelValue: false,
          position: defaultMock.positionProp,
        },
      });

      expect(wrapper.find(defaultMock.rootEl).classes()).toContain(
        defaultMock.positionRightModifier,
      );
    });

    it('position: Should apply left position modifier class when position="left".', () => {
      const wrapper = mount(Checkbox, {
        props: {
          modelValue: false,
          position: 'left',
        },
      });

      expect(wrapper.find(defaultMock.rootEl).classes()).toContain(
        defaultMock.positionLeftModifier,
      );
    });

    it('custom: Should apply hidden modifier to input when custom prop is true.', () => {
      const wrapper = mount(Checkbox, {
        props: {
          modelValue: false,
          custom: true,
        },
      });

      expect(wrapper.find(defaultMock.getSelectorWithDot(defaultMock.inputHiddenEl)).exists()).toBe(
        true,
      );
    });

    it('valid: Should add valid class on root if valid prop is true.', () => {
      const wrapper = mount(Checkbox, {
        props: {
          modelValue: false,
          valid: true,
        },
      });

      expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.validModifier);
    });

    it('invalid: Should add invalid class on root if invalid prop is true.', () => {
      const wrapper = mount(Checkbox, {
        props: {
          modelValue: false,
          invalid: true,
        },
      });

      expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.invalidModifier);
    });

    it('errors: Should render errors if prop invalid and prop errors provided.', () => {
      const errors = ['Error 1', 'Error 2'];

      const wrapper = mount(Checkbox, {
        props: {
          modelValue: false,
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
      const _defaultMock = new CheckboxSelectorTestData(defaultMock.cssClassProp);
      const errors = ['Error 1', 'Error 2'];

      const wrapper = mount(Checkbox, {
        props: {
          modelValue: defaultMock.modelValueProp,
          position: defaultMock.positionProp,
          disabled: true,
          custom: true,
          valid: true,
          invalid: true,
          errors,
          cssClass: defaultMock.cssClassProp,
        },
        slots: {
          default: await CheckboxSelectorTestData.getCheckboxDefaultSlotDefault(),
        },
      });

      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.rootEl)).exists()).toBe(true);
      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.labelEl)).exists()).toBe(
        true,
      );
      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.inputEl)).exists()).toBe(
        true,
      );
      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.contentEl)).exists()).toBe(
        true,
      );
      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.errorsEl)).exists()).toBe(
        true,
      );
      expect(
        wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.themeModifier)).exists(),
      ).toBe(true);
      expect(
        wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.positionRightModifier)).exists(),
      ).toBe(true);
      expect(
        wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.disabledModifier)).exists(),
      ).toBe(true);
      expect(
        wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.inputHiddenEl)).exists(),
      ).toBe(true);
      expect(
        wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.validModifier)).exists(),
      ).toBe(true);
      expect(
        wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.invalidModifier)).exists(),
      ).toBe(true);
    });

    it('modifier: Should apply modifier class.', async () => {
      const wrapper = mount(Checkbox, {
        props: {
          modelValue: false,
          modifier: defaultMock.modifierProp,
        },
      });

      expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.primaryModifier);
    });

    it('ariaLabel: Should set aria-label attribute when ariaLabel prop is provided.', () => {
      const wrapper = mount(Checkbox, {
        props: {
          modelValue: false,
          ariaLabel: defaultMock.ariaLabelProp,
        },
      });

      const input = wrapper.find(defaultMock.getSelectorWithDot(defaultMock.inputEl));

      expect(input.attributes('aria-label')).toBe(defaultMock.ariaLabelProp);
    });
  });

  describe('Slots', () => {
    it('default: Should render default slot if provided.', async () => {
      const wrapper = mount(Checkbox, {
        props: {
          modelValue: false,
        },
        slots: {
          default: await CheckboxSelectorTestData.getCheckboxDefaultSlotDefault(),
        },
      });

      expect(wrapper.find(defaultMock.getSelectorWithDot(defaultMock.contentEl)).exists()).toBe(
        true,
      );
      expect(wrapper.find(defaultMock.contentEl).element.innerHTML).toBe(
        await CheckboxSelectorTestData.getCheckboxDefaultSlotDefault(),
      );
    });

    it('default: Should render custom slot if provided.', async () => {
      const wrapper = mount(Checkbox, {
        props: {
          modelValue: false,
        },
        slots: {
          default: await CheckboxSelectorTestData.getCheckboxDefaultSlotCustom(),
        },
      });

      expect(wrapper.find(defaultMock.getSelectorWithDot(defaultMock.contentEl)).exists()).toBe(
        true,
      );
      expect(wrapper.find(defaultMock.contentEl).element.innerHTML).toBe(
        await CheckboxSelectorTestData.getCheckboxDefaultSlotCustom(),
      );
    });

    it('default: Should render custom slot if provided.', async () => {
      const wrapper = mount(Checkbox, {
        props: {
          modelValue: false,
          custom: true,
        },
        slots: {
          custom: await CheckboxSelectorTestData.getCheckboxCustomSlotCustom(),
        },
      });

      expect(wrapper.find(defaultMock.getSelectorWithDot(defaultMock.customEl)).exists()).toBe(
        true,
      );
      expect(wrapper.find(defaultMock.customEl).element.innerHTML).toBe(
        await CheckboxSelectorTestData.getCheckboxCustomSlotCustom(),
      );
    });

    it('errors: Should render errors slot if provided.', async () => {
      const errors = ['Custom Error 1', 'Custom Error 2'];

      const wrapper = mount(Checkbox, {
        props: {
          modelValue: false,
          invalid: true,
          errors,
        },
        slots: {
          errors: await CheckboxSelectorTestData.getCheckboxErrorsSlotCustom(),
        },
      });

      expect(wrapper.find('.slot-errors-1').exists()).toBe(true);
      expect(wrapper.find('.slot-errors-1').text()).toBe('Custom Error 1');

      expect(wrapper.find('.slot-errors-2').exists()).toBe(true);
      expect(wrapper.find('.slot-errors-2').text()).toBe('Custom Error 2');
    });
  });

  describe('Emits', () => {
    const wrapper = mount(Checkbox, {
      props: {
        modelValue: false,
        'onUpdate:modelValue': (e: any) => wrapper.setProps({ modelValue: e }),
      },
    });

    it('update:modelValue: Should emit update:modelValue on input.', async () => {
      const input = wrapper.find(defaultMock.getSelectorWithDot(defaultMock.inputEl));

      await input.setValue(defaultMock.modelValueProp);

      expect(wrapper.emitted()['update:modelValue']).toBeTruthy();
      expect(wrapper.emitted()['update:modelValue'][0]).toEqual([defaultMock.modelValueProp]);
    });

    it('update:modelValue: Should toggle value on space keydown when custom slot is used.', async () => {
      const wrapper = mount(Checkbox, {
        props: {
          modelValue: false,
          custom: true,
        },
        slots: {
          custom: await CheckboxSelectorTestData.getCheckboxCustomSlotCustom(),
        },
      });

      const custom = wrapper.find(defaultMock.customEl);
      expect(wrapper.find(defaultMock.getSelectorWithDot(defaultMock.customEl)).exists()).toBe(
        true,
      );

      await custom.trigger('keydown', { key: 'Space' });

      expect(wrapper.emitted('update:model-value')).toBeTruthy();
      expect(wrapper.emitted('update:model-value')![0]).toEqual([true]);
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
    it('Should set aria-label attribute when ariaLabel prop is provided.', () => {
      const wrapper = mount(Checkbox, {
        props: {
          modelValue: false,
          ariaLabel: defaultMock.ariaLabelProp,
        },
      });

      const input = wrapper.find(defaultMock.getSelectorWithDot(defaultMock.inputEl));

      expect(input.attributes('aria-label')).toBe(defaultMock.ariaLabelProp);
    });

    it('Should associate label with input via id and for attributes.', () => {
      const wrapper = mount(Checkbox, {
        props: {
          modelValue: false,
          id: defaultMock.idProp,
        },
      });

      const input = wrapper.find(defaultMock.inputEl);
      const label = wrapper.find('label');

      expect(input.attributes('id')).toBe(defaultMock.idProp);
      expect(label.attributes('aria-labelledby')).toBeDefined();
    });

    it('Should not be focusable when disabled.', async () => {
      const wrapper = mount(Checkbox, {
        props: {
          modelValue: false,
          disabled: true,
        },
      });
      const input = wrapper.find(defaultMock.inputEl);

      expect(input.attributes('disabled')).toBeDefined();

      await input.trigger('focus');
      expect(wrapper.emitted('focus')).toBeUndefined();
    });
  });

  describe('Edge cases', () => {
    it('Should not throw if no slots are provided.', () => {
      const wrapper = mount(Checkbox, {
        props: {
          modelValue: false,
        },
      });

      expect(wrapper.exists()).toBe(true);
    });
  });
});
