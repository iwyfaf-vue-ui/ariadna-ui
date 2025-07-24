import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Slider from '../../Slider.vue';
import { SliderSelectorTestData } from '../test-data/Slider.selector.test-data';
import { EThumbPosition } from '../../types/Slider.enums';

const defaultMock = new SliderSelectorTestData();

describe('Slider', () => {
  describe('Basic render', () => {
    const wrapper = mount(Slider, {
      props: defaultMock.mockProps,
    });

    it('Should render component without errors.', () => {
      expect(wrapper.exists()).toBe(true);
    });

    it('Should apply default root CSS class.', () => {
      expect(wrapper.classes()).toContain(defaultMock.getSelectorWithoutDot(defaultMock.rootEl));
    });

    it('Should render track elements according to tracks prop.', () => {
      const tracks = wrapper.findAll(defaultMock.getSelectorWithDot(defaultMock.trackEl));

      expect(tracks.length).toBe(defaultMock.mockProps.tracks.length);
    });

    it('Should render thumbs for tracks with thumb=true.', () => {
      const thumbs = wrapper.findAll(
        defaultMock.getSelectorWithDot(defaultMock.trackAdditionalThumbEl),
      );

      expect(thumbs.length).toBe(defaultMock.mockProps.tracks.filter((t) => t.thumb).length);
    });
  });

  describe('Props', () => {
    it('tracks: Should render track elements according to tracks prop.', () => {
      const tracks = [
        { key: 'track1', thumb: true, label: true, zIndex: 2 },
        { key: 'track2', thumb: false, label: false, zIndex: 1 },
      ];

      const wrapper = mount(Slider, {
        props: {
          ...defaultMock.mockProps,
          modelValue: [50],
          tracks: tracks,
          step: 1,
          points: [0, 50, 100],
        },
      });

      const trackElements = wrapper.findAll(defaultMock.getSelectorWithDot(defaultMock.trackEl));
      expect(trackElements.length).toBe(defaultMock.mockProps.tracks.length);
    });

    it('label: Should render label if label prop is provided.', () => {
      const wrapper = mount(Slider, {
        props: {
          ...defaultMock.mockProps,
          label: defaultMock.labelProp,
        },
      });

      const label = wrapper.find(defaultMock.getSelectorWithDot(defaultMock.labelEl));

      expect(label.exists()).toBe(true);
      expect(label.text()).toBe(defaultMock.labelProp);
    });

    it('id: Should set slider id from composable if id prop is not provided.', () => {
      const wrapper = mount(Slider, {
        props: defaultMock.mockProps,
      });

      expect(
        wrapper.find(defaultMock.getSelectorWithDot(defaultMock.trackEl)).attributes('id'),
      ).toBe('v-0');
    });

    it('id: Should set slider id from id Should emit corrected value rounded to nearest step if modelValue is not multiple of step.prop if provided.', () => {
      const wrapper = mount(Slider, {
        props: {
          ...defaultMock.mockProps,
          id: defaultMock.idProp,
        },
      });

      expect(
        wrapper.find(defaultMock.getSelectorWithDot(defaultMock.trackEl)).attributes('id'),
      ).toBe(defaultMock.idProp);
    });

    it('min: Should emit corrected value equal to min if modelValue is less than min.', () => {
      const wrapper = mount(Slider, {
        props: {
          ...defaultMock.mockProps,
          modelValue: [-10],
          min: 10,
        },
      });

      // При монтировании компонент должен эмитить update:model-value с исправленным значением min
      const emitted = wrapper.emitted('update:model-value');
      expect(emitted).toBeDefined();
      expect(emitted![0]).toEqual([[10]]);
    });

    it('max: Should emit corrected value equal to max if modelValue is greater than max.', () => {
      const wrapper = mount(Slider, {
        props: {
          ...defaultMock.mockProps,
          modelValue: [150],
          min: 100,
        },
      });

      // При монтировании компонент должен эмитить update:model-value с исправленным значением min
      const emitted = wrapper.emitted('update:model-value');
      expect(emitted).toBeDefined();
      expect(emitted![0]).toEqual([[100]]);
    });

    it('steps: Should emit corrected value rounded to nearest step if modelValue is not multiple of step.', () => {
      const wrapper = mount(Slider, {
        props: {
          ...defaultMock.mockProps,
          modelValue: [12],
          step: 5,
        },
      });

      // Ожидаем, что значение округлено к ближайшему шагу (10 или 15)
      // В данном случае 12 ближе к 10, чем к 15
      const emitted = wrapper.emitted('update:model-value');
      expect(emitted).toBeDefined();
      expect(emitted![0]).toEqual([[10]]);
    });

    it('points: Should apply points modifier class when points prop is not empty.', async () => {
      const wrapper = mount(Slider, {
        props: {
          ...defaultMock.mockProps,
          points: [0, 50, 100],
        },
      });

      expect(wrapper.classes()).toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.pointsModifier),
      );
    });

    it('valid: Should add valid class on root if valid prop is true.', () => {
      const wrapper = mount(Slider, {
        props: {
          ...defaultMock.mockProps,
          valid: true,
        },
      });

      expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.validModifier);
    });

    it('invalid: Should add invalid class on root if invalid prop is true.', () => {
      const wrapper = mount(Slider, {
        props: {
          ...defaultMock.mockProps,
          invalid: true,
        },
      });

      expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.invalidModifier);
    });

    it('errors: Should render errors if prop invalid and prop errors provided.', () => {
      const errors = ['Error 1', 'Error 2'];

      const wrapper = mount(Slider, {
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
      const _defaultMock = new SliderSelectorTestData(defaultMock.cssClassProp);
      const errors = ['Error 1', 'Error 2'];

      const wrapper = mount(Slider, {
        props: {
          ...defaultMock.mockProps,
          label: defaultMock.labelProp,
          points: [0, 50, 100],
          disabled: true,
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
      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.trackEl)).exists()).toBe(
        true,
      );
      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.pointsEl)).exists()).toBe(
        true,
      );
      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.pointEl)).exists()).toBe(
        true,
      );
      expect(
        wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.trackAdditionalEl)).exists(),
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
      const wrapper = mount(Slider, {
        props: {
          ...defaultMock.mockProps,
          modifier: defaultMock.modifierProp,
        },
      });

      expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.primaryModifier);
    });
  });

  describe('Slots', () => {
    it('point: Should render default point slot if not provided.', async () => {
      const wrapper = mount(Slider, {
        props: {
          ...defaultMock.mockProps,
          points: [0, 50, 100],
          step: 1,
        },
      });

      expect(wrapper.find(defaultMock.getSelectorWithDot(defaultMock.pointsEl)).exists()).toBe(
        true,
      );
      expect(wrapper.find(defaultMock.pointsEl).html()).toBe(
        await SliderSelectorTestData.getSliderSlotPointDefault(),
      );
    });

    it('point: Should render point slot if provided.', async () => {
      const wrapper = mount(Slider, {
        props: {
          ...defaultMock.mockProps,
          points: [0, 50, 100],
          step: 1,
        },
        slots: {
          point: await SliderSelectorTestData.getSliderSlotPointCustom(),
        },
      });

      expect(wrapper.find(defaultMock.getSelectorWithDot(defaultMock.pointValueEl)).exists()).toBe(
        true,
      );
      expect(wrapper.find(defaultMock.pointValueEl).element.textContent).toBe(
        await SliderSelectorTestData.getSliderSlotPointCustom(),
      );
    });

    it('errors: Should render errors slot if provided.', async () => {
      const errors = ['Custom Error 1', 'Custom Error 2'];

      const wrapper = mount(Slider, {
        props: {
          ...defaultMock.mockProps,
          invalid: true,
          errors,
        },
        slots: {
          errors: await SliderSelectorTestData.getSliderErrorsSlotCustom(),
        },
      });

      expect(wrapper.find('.slot-errors-1').exists()).toBe(true);
      expect(wrapper.find('.slot-errors-1').text()).toBe('Custom Error 1');

      expect(wrapper.find('.slot-errors-2').exists()).toBe(true);
      expect(wrapper.find('.slot-errors-2').text()).toBe('Custom Error 2');
    });
  });

  describe('Emits', () => {
    const wrapper = mount(Slider, {
      props: {
        ...defaultMock.mockProps,
      },
    });

    it('changeStart: Should emit "changeStart" event on thumb mouse down.', async () => {
      const thumb = wrapper.find(
        defaultMock.getSelectorWithDot(defaultMock.trackAdditionalThumbEl),
      );

      await thumb.trigger('mousedown', { clientX: 50 });
      expect(wrapper.emitted('changeStart')).toBeDefined();

      const payload = wrapper.emitted('changeStart')![0][0];
      expect(payload).toHaveProperty('track');
      expect(payload).toHaveProperty('value');
      expect(payload).toHaveProperty('index');
    });

    it('change: Should emit "change" event on thumb pointer move.', async () => {
      // @ts-ignore Симулируем pointer move через вызов метода
      wrapper.vm.onThumbPointerMove(60, 0, EThumbPosition.LEFT);
      expect(wrapper.emitted('change')).toBeDefined();

      const payload = wrapper.emitted('change')![0][0];
      expect(payload).toHaveProperty('track');
      expect(payload).toHaveProperty('value');
      expect(payload).toHaveProperty('index');
    });

    it('changeEnd: Should emit "changeEnd" event on thumb pointer up.', async () => {
      // @ts-ignore Симулируем pointer move через вызов метода
      wrapper.vm.onThumbPointerUp(70, 0, EThumbPosition.LEFT);
      expect(wrapper.emitted('changeEnd')).toBeDefined();

      const payload = wrapper.emitted('changeEnd')![0][0];
      expect(payload).toHaveProperty('track');
      expect(payload).toHaveProperty('value');
      expect(payload).toHaveProperty('index');
    });
  });

  describe('Accessibility', () => {
    it('Should set textarea "id" from composable.', () => {
      const wrapper = mount(Slider, {
        props: {
          ...defaultMock.mockProps,
          label: defaultMock.labelProp,
        },
      });

      const label = wrapper.find(defaultMock.getSelectorWithDot(defaultMock.labelEl));

      expect(label.attributes('for')).toBe('v-0');
    });

    it('Should set label "for" attribute to textarea id.', () => {
      const wrapper = mount(Slider, {
        props: {
          ...defaultMock.mockProps,
          label: defaultMock.labelProp,
        },
      });

      const label = wrapper.find(defaultMock.getSelectorWithDot(defaultMock.labelEl));

      expect(label.attributes('for')).toBe('v-0');
    });
  });
});
