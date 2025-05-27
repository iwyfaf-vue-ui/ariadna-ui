import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { RatingSelectorTestData } from '../test-data/Rating.selector.test-data';
import Rating from '../../Rating.vue';

const defaultMock = new RatingSelectorTestData();

describe('Rating.vue', () => {
  describe('Basic render', () => {
    const wrapper = mount(Rating, {
      props: {
        modelValue: 0,
      },
    });

    it('Should render component without errors.', () => {
      expect(wrapper.exists()).toBe(true);
    });

    it('Should apply default root CSS class.', () => {
      expect(wrapper.classes()).toContain(defaultMock.getSelectorWithoutDot(defaultMock.rootEl));
    });

    it('Should render label if prop.label is provided.', () => {
      const wrapper = mount(Rating, {
        props: {
          modelValue: 0,
          label: 'Test Label',
        },
      });
      const label = wrapper.find(defaultMock.getSelectorWithDot(defaultMock.labelEl));

      expect(label.exists()).toBe(true);
      expect(label.text()).toBe('Test Label');
    });
  });

  describe('Props', () => {
    it('modelValue: Should update Rating value when prop.modelValue changes.', async () => {
      const wrapper = mount(Rating, {
        props: {
          modelValue: defaultMock.modelValueProp,
        },
      });

      expect(wrapper.find(defaultMock.ratingMaskEl).attributes().style).toBe('width: 20%;');

      await wrapper.setProps({ modelValue: 1 });
      expect(wrapper.find(defaultMock.ratingMaskEl).attributes().style).toBe('width: 100%;');
    });

    it('id: Should set id from id prop if provided.', () => {
      const wrapper = mount(Rating, {
        props: {
          modelValue: 0,
          id: defaultMock.idProp,
        },
      });

      expect(
        wrapper.find(defaultMock.getSelectorWithDot(defaultMock.ratingEl)).attributes('id'),
      ).toBe(defaultMock.idProp);
    });

    it('id: Should set id from composable if id prop is not provided.', () => {
      const wrapper = mount(Rating, {
        props: {
          modelValue: 0,
        },
      });

      expect(
        wrapper.find(defaultMock.getSelectorWithDot(defaultMock.ratingEl)).attributes('id'),
      ).toBe('v-0');
    });

    it('starCount: Should update number of stars when starCount prop changes.', async () => {
      const wrapper = mount(Rating, {
        props: {
          modelValue: 0,
        },
      });

      expect(
        wrapper
          .find(defaultMock.getSelectorWithDot(defaultMock.ratingMaskActiveModifier))
          .findAll('span').length,
      ).toBe(5);

      await wrapper.setProps({ starCount: 3 });
      expect(
        wrapper
          .find(defaultMock.getSelectorWithDot(defaultMock.ratingMaskActiveModifier))
          .findAll('span').length,
      ).toBe(3);
    });

    it('singleMode: Should render only one star in single mode and update to starCount when singleMode is false.', async () => {
      const wrapper = mount(Rating, {
        props: {
          modelValue: 0,
          singleMode: true,
          readonly: true,
        },
      });

      expect(
        wrapper
          .find(defaultMock.getSelectorWithDot(defaultMock.ratingMaskActiveModifier))
          .findAll('span').length,
      ).toBe(1);

      await wrapper.setProps({ singleMode: false, starCount: 3 });
      expect(
        wrapper
          .find(defaultMock.getSelectorWithDot(defaultMock.ratingMaskActiveModifier))
          .findAll('span').length,
      ).toBe(3);
    });

    it('size: Should apply small size modifier class when size="small".', () => {
      const wrapper = mount(Rating, {
        props: {
          modelValue: 0,
          size: defaultMock.sizeProp,
        },
      });

      expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.sizeSmallModifier);
    });

    it('size: Should apply medium size modifier class when size="medium".', () => {
      const wrapper = mount(Rating, {
        props: {
          modelValue: 0,
          size: 'medium',
        },
      });

      expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.sizeMediumModifier);
    });

    it('size: Should apply large size modifier class when size="large".', () => {
      const wrapper = mount(Rating, {
        props: {
          modelValue: 0,
          size: 'large',
        },
      });

      expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.sizeLargeModifier);
    });

    it('showValue: should display the current rating value when showValue is true.', async () => {
      const wrapper = mount(Rating, {
        props: {
          modelValue: 0.5,
          showValue: true,
        },
      });

      expect(wrapper.find(defaultMock.valueEl).exists()).toBeTruthy();
      expect(wrapper.find(defaultMock.valueEl).element.textContent).toBe('2.5/5');
    });

    it('valuePosition: should update group flex-direction style according to valuePosition prop.', async () => {
      const wrapper = mount(Rating, {
        props: {
          modelValue: 0.5,
          showValue: true,
          valuePosition: 'top',
        },
      });

      expect(wrapper.find(defaultMock.valueEl).exists()).toBeTruthy();
      expect(wrapper.find(defaultMock.valueEl).element.textContent).toBe('2.5/5');

      expect(wrapper.find(defaultMock.valueEl).exists()).toBeTruthy();
      expect(wrapper.find(defaultMock.groupEl).attributes().style).toBe(
        'flex-direction: column-reverse;',
      );

      await wrapper.setProps({ valuePosition: 'left' });
      expect(wrapper.find(defaultMock.groupEl).attributes().style).toBe(
        'flex-direction: row-reverse;',
      );

      await wrapper.setProps({ valuePosition: 'right' });
      expect(wrapper.find(defaultMock.groupEl).attributes().style).toBe('flex-direction: row;');

      await wrapper.setProps({ valuePosition: 'bottom' });
      expect(wrapper.find(defaultMock.groupEl).attributes().style).toBe('flex-direction: column;');
    });

    it('reset: should render reset button when reset prop is true.', async () => {
      const wrapper = mount(Rating, {
        props: {
          modelValue: 0,
          reset: true,
        },
      });

      expect(wrapper.find(defaultMock.resetEl).exists()).toBeTruthy();
      expect(wrapper.find(defaultMock.resetEl).element.textContent).toBe('Reset');
    });

    it('disabled: Should set Rating disabled from prop.', () => {
      const wrapper = mount(Rating, {
        props: {
          modelValue: 0,
          disabled: true,
        },
      });

      expect(wrapper.find(defaultMock.rootEl).attributes('tabindex')).toBe('-1');
      expect(wrapper.find(defaultMock.ratingMaskEl).attributes('style')).toBe('width: 0px;');
      expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.disabledModifier);
    });

    it('readonly: Should set Rating readonly from prop.', () => {
      const wrapper = mount(Rating, {
        props: {
          modelValue: 0,
          readonly: true,
        },
      });

      expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.readonlyModifier);
    });

    it('valid: Should add valid class on root if valid prop is true.', () => {
      const wrapper = mount(Rating, {
        props: {
          modelValue: 0,
          valid: true,
        },
      });

      expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.validModifier);
    });

    it('invalid: Should add invalid class on root if invalid prop is true.', () => {
      const wrapper = mount(Rating, {
        props: {
          modelValue: 0,
          invalid: true,
        },
      });

      expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.invalidModifier);
    });

    it('errors: Should render errors if prop invalid and prop errors provided.', () => {
      const errors = ['Error 1', 'Error 2'];

      const wrapper = mount(Rating, {
        props: {
          modelValue: 0,
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
      const _defaultMock = new RatingSelectorTestData(defaultMock.cssClassProp);
      const errors = ['Error 1', 'Error 2'];

      const wrapper = mount(Rating, {
        props: {
          modelValue: defaultMock.modelValueProp,
          label: defaultMock.labelProp,
          size: defaultMock.sizeProp,
          disabled: true,
          readonly: true,
          valid: true,
          invalid: true,
          reset: true,
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
      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.ratingEl)).exists()).toBe(
        true,
      );
      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.ratingMaskEl)).exists()).toBe(
        true,
      );
      expect(
        wrapper
          .find(defaultMock.getSelectorWithDot(_defaultMock.ratingMaskActiveModifier))
          .exists(),
      ).toBe(true);
      expect(
        wrapper
          .find(defaultMock.getSelectorWithDot(_defaultMock.ratingMaskInactiveModifier))
          .exists(),
      ).toBe(true);
      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.errorsEl)).exists()).toBe(
        true,
      );
      expect(
        wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.themeModifier)).exists(),
      ).toBe(true);
      expect(
        wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.sizeSmallModifier)).exists(),
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
      const wrapper = mount(Rating, {
        props: {
          modelValue: 0,
          modifier: defaultMock.modifierProp,
        },
      });

      expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.primaryModifier);
    });
  });

  describe('Slots', () => {
    it('active: Should render default active slot content for given starCount.', async () => {
      const wrapper = mount(Rating, {
        props: {
          modelValue: 0.5,
          starCount: 1,
        },
      });

      expect(
        wrapper
          .find(defaultMock.getSelectorWithDot(defaultMock.ratingMaskActiveModifier))
          .findAll('span').length,
      ).toBe(1);

      expect(
        wrapper.find(defaultMock.getSelectorWithDot(defaultMock.ratingMaskActiveModifier)).element
          .innerHTML,
      ).toBe(await RatingSelectorTestData.getRatingActiveSlotDefault());
    });

    it('active: Should render custom active slot content for given starCount.', async () => {
      const wrapper = mount(Rating, {
        props: {
          modelValue: 0.5,
          starCount: 1,
        },
        slots: {
          active: await RatingSelectorTestData.getRatingActiveSlotCustom(),
        },
      });

      expect(
        wrapper
          .find(defaultMock.getSelectorWithDot(defaultMock.ratingMaskActiveModifier))
          .findAll('span').length,
      ).toBe(1);

      expect(
        wrapper.find(defaultMock.getSelectorWithDot(defaultMock.ratingMaskActiveModifier)).element
          .innerHTML,
      ).toBe(`<span>${await RatingSelectorTestData.getRatingActiveSlotCustom()}</span>`);
    });

    it('inactive: Should render default inactive slot content for given starCount.', async () => {
      const wrapper = mount(Rating, {
        props: {
          modelValue: 0.5,
          starCount: 1,
        },
      });

      expect(
        wrapper
          .find(defaultMock.getSelectorWithDot(defaultMock.ratingMaskInactiveModifier))
          .findAll('span').length,
      ).toBe(1);

      expect(
        wrapper.find(defaultMock.getSelectorWithDot(defaultMock.ratingMaskInactiveModifier)).element
          .innerHTML,
      ).toBe(await RatingSelectorTestData.getRatingInactiveSlotDefault());
    });

    it('inactive: Should render custom inactive slot content for given starCount.', async () => {
      const wrapper = mount(Rating, {
        props: {
          modelValue: 0.5,
          starCount: 1,
        },
        slots: {
          inactive: await RatingSelectorTestData.getRatingInactiveSlotCustom(),
        },
      });

      expect(
        wrapper
          .find(defaultMock.getSelectorWithDot(defaultMock.ratingMaskInactiveModifier))
          .findAll('span').length,
      ).toBe(1);

      expect(
        wrapper.find(defaultMock.getSelectorWithDot(defaultMock.ratingMaskInactiveModifier)).element
          .innerHTML,
      ).toBe(`<span>${await RatingSelectorTestData.getRatingInactiveSlotCustom()}</span>`);
    });

    it('value: Should render default value slot content when showValue is true.', async () => {
      const wrapper = mount(Rating, {
        props: {
          modelValue: 0.5,
          showValue: true,
        },
      });

      expect(wrapper.find(defaultMock.valueEl).element.textContent).toBe(
        await RatingSelectorTestData.getRatingValueSlotDefault(),
      );
    });

    it('value: Should render custom value slot content when showValue is true.', async () => {
      const wrapper = mount(Rating, {
        props: {
          modelValue: 0.5,
          showValue: true,
        },
        slots: {
          value: await RatingSelectorTestData.getRatingValueSlotCustom(),
        },
      });

      expect(wrapper.find(defaultMock.valueEl).element.textContent).toBe('Custom value 2.5 of 5');
    });

    it('reset: Should render default reset slot content when reset is true.', async () => {
      const wrapper = mount(Rating, {
        props: {
          modelValue: 0.5,
          reset: true,
        },
      });

      expect(wrapper.find(defaultMock.resetEl).exists()).toBeTruthy();
      expect(wrapper.find(defaultMock.resetEl).element.textContent).toBe(
        await RatingSelectorTestData.getRatingResetSlotDefault(),
      );
    });

    it('reset: Should render custom reset slot content when reset is true.', async () => {
      const wrapper = mount(Rating, {
        props: {
          modelValue: 0.5,
          reset: true,
        },
        slots: {
          reset: await RatingSelectorTestData.getRatingResetSlotCustom(),
        },
      });

      expect(wrapper.find(defaultMock.resetEl).exists()).toBeTruthy();
      expect(wrapper.find(defaultMock.resetEl).element.textContent).toBe('Сбросить');
    });

    it('errors: Should render errors slot if provided.', async () => {
      const errors = ['Custom Error 1', 'Custom Error 2'];

      const wrapper = mount(Rating, {
        props: {
          modelValue: 0,
          invalid: true,
          errors,
        },
        slots: {
          errors: await RatingSelectorTestData.getRatingErrorsSlotCustom(),
        },
      });

      expect(wrapper.find('.slot-errors-1').exists()).toBe(true);
      expect(wrapper.find('.slot-errors-1').text()).toBe('Custom Error 1');

      expect(wrapper.find('.slot-errors-2').exists()).toBe(true);
      expect(wrapper.find('.slot-errors-2').text()).toBe('Custom Error 2');
    });
  });

  describe('Emits', () => {
    const wrapper = mount(Rating, {
      props: {
        modelValue: 0,
        'onUpdate:modelValue': (e: number) => wrapper.setProps({ modelValue: e }),
      },
    });

    it('update:model-value: Should emit update:model-value on star click.', async () => {
      const wrapper = mount(Rating, {
        props: {
          ...defaultMock.mockProps,
        },
      });

      const ratingDiv = wrapper.find(defaultMock.ratingEl);
      await ratingDiv.trigger('mouseover');
      await ratingDiv.trigger('click');

      expect(wrapper.emitted('update:model-value')).toBeTruthy();
    });

    it('update:model-value: Should emit update:model-value when reset button click.', async () => {
      const wrapper = mount(Rating, {
        props: {
          ...defaultMock.mockProps,
          reset: true,
        },
      });

      const resetBtn = wrapper.find('button');
      await resetBtn.trigger('click');

      expect(wrapper.emitted('update:model-value')).toBeTruthy();
    });

    it('update:model-value: Should not emit update:model-value if readonly.', async () => {
      const wrapper = mount(Rating, {
        props: {
          ...defaultMock.mockProps,
          readonly: true,
        },
      });

      const ratingDiv = wrapper.find(defaultMock.ratingEl);
      await ratingDiv.trigger('click');

      expect(wrapper.emitted('update:model-value')).toBeFalsy();
    });

    it('update:model-value: Should not emit update:model-value if disabled.', async () => {
      const wrapper = mount(Rating, {
        props: {
          ...defaultMock.mockProps,
          disabled: true,
        },
      });

      const ratingDiv = wrapper.find(defaultMock.ratingEl);
      await ratingDiv.trigger('click');

      expect(wrapper.emitted('update:model-value')).toBeFalsy();
    });

    it('focus: Should emit focus event on focus.', async () => {
      const wrapper = mount(Rating, {
        props: {
          ...defaultMock.mockProps,
          disabled: true,
        },
      });

      const ratingDiv = wrapper.find(defaultMock.rootEl);
      await ratingDiv.trigger('focus');

      expect(wrapper.emitted('focus')).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('Should set "id" from composable.', () => {
      const wrapper = mount(Rating, {
        props: {
          modelValue: 0,
          label: defaultMock.labelProp,
        },
      });

      const label = wrapper.find(defaultMock.getSelectorWithDot(defaultMock.labelEl));

      expect(label.attributes('for')).toBe('v-0');
    });

    it('Should set label "for" attribute to "id".', () => {
      const wrapper = mount(Rating, {
        props: {
          modelValue: 0,
          label: defaultMock.labelProp,
        },
      });

      const label = wrapper.find(defaultMock.getSelectorWithDot(defaultMock.labelEl));

      expect(label.attributes('for')).toBe('v-0');
    });

    it('Should set tabindex to -1 if readonly or disabled.', () => {
      const wrapperReadonly = mount(Rating, {
        props: {
          ...defaultMock.mockProps,
          readonly: true,
        },
      });

      expect(wrapperReadonly.find(defaultMock.rootEl).attributes('tabindex')).toBe('-1');

      const wrapperDisabled = mount(Rating, {
        props: {
          ...defaultMock.mockProps,
          disabled: true,
        },
      });

      expect(wrapperDisabled.find(defaultMock.rootEl).attributes('tabindex')).toBe('-1');
    });

    it('Should set tabindex to 0 if interactive.', () => {
      const wrapper = mount(Rating, {
        props: {
          ...defaultMock.mockProps,
          readonly: false,
          disabled: false,
        },
      });

      expect(wrapper.find(defaultMock.rootEl).attributes('tabindex')).toBe('0');
    });
  });
});
