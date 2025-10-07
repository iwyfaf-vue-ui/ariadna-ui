import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, h, shallowRef } from 'vue';
import useInputPasswordMeterPanel from '../../composables/useInputPasswordMeterPanel/useInputPasswordMeterPanel';
import type { TInputPasswordProps } from '../../InputPassword';
import { InputPasswordSelectorTestData } from '../test-data/InputPassword.selector.test-data';

const defaultMock = new InputPasswordSelectorTestData();

function mountWithComposable(props: TInputPasswordProps) {
  const inputPasswordRef = shallowRef<HTMLDivElement | null>(null);
  const meterPanelRef = shallowRef<HTMLDivElement | null>(null);

  return mount(
    defineComponent({
      setup() {
        const result = useInputPasswordMeterPanel(props, inputPasswordRef, meterPanelRef);
        return { ...result };
      },
      render() {
        return h('div');
      },
    }),
  );
}

describe('useInputPasswordMeterPanel', () => {
  describe('Basic functionality', () => {
    it('Should return expected structure.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      expect(vm).toHaveProperty('openMeterPanel');
      expect(vm).toHaveProperty('closeMeterPanel');
      expect(vm).toHaveProperty('meterPanelClasses');
    });
  });

  describe('openMeterPanel', () => {
    it('Should open the meter panel.', () => {
      const wrapper = mountWithComposable({ ...defaultMock.mockProps, modelValue: 'abc' });
      const vm = wrapper.vm;

      vm.openMeterPanel();

      expect(vm.meterPanelClasses).toHaveProperty(defaultMock.meterPanelModifier, true);
    });
  });

  describe('handleKeydown', () => {
    it('Should close meter panel when Escape key is pressed.', () => {
      const wrapper = mountWithComposable({ ...defaultMock.mockProps, modelValue: 'abc' });
      const vm = wrapper.vm;

      vm.openMeterPanel();
      expect(vm.meterPanelClasses).toHaveProperty(defaultMock.meterPanelModifier, true);

      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      window.dispatchEvent(event);

      expect(vm.meterPanelClasses).toHaveProperty(defaultMock.meterPanelModifier, false);
    });

    it('Should not close meter panel when other key is pressed.', () => {
      const wrapper = mountWithComposable({ ...defaultMock.mockProps, modelValue: 'abc' });
      const vm = wrapper.vm;

      vm.openMeterPanel();
      expect(vm.meterPanelClasses).toHaveProperty(defaultMock.meterPanelModifier, true);

      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      window.dispatchEvent(event);

      expect(vm.meterPanelClasses).toHaveProperty(defaultMock.meterPanelModifier, true);
    });
  });

  describe('meterPanelClasses', () => {
    it('Should return correct classes when panel is closed.', () => {
      const wrapper = mountWithComposable({ ...defaultMock.mockProps, modelValue: 'abc' });
      const vm = wrapper.vm;

      expect(vm.meterPanelClasses).toHaveProperty(defaultMock.meterPanelModifier, false);
    });

    it('Should return correct classes when panel is open.', () => {
      const wrapper = mountWithComposable({ ...defaultMock.mockProps, modelValue: 'abc' });
      const vm = wrapper.vm;

      vm.openMeterPanel();

      expect(vm.meterPanelClasses).toHaveProperty(defaultMock.meterPanelModifier, true);
    });
  });
});
