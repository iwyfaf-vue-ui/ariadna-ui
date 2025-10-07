import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, h } from 'vue';
import useInputPasswordRules from '../../composables/useInputPasswordRules/useInputPasswordRules';
import type { TInputPasswordProps } from '../../InputPassword';
import { InputPasswordSelectorTestData } from '@/lib/components/controls/InputPassword/tests/test-data/InputPassword.selector.test-data';

const defaultMock = new InputPasswordSelectorTestData();

function mountWithComposable(props: TInputPasswordProps) {
  return mount(
    defineComponent({
      setup() {
        const result = useInputPasswordRules(props);
        return { ...result };
      },
      render() {
        return h('div');
      },
    }),
  );
}

describe('useInputPasswordRules', () => {
  describe('Basic functionality', () => {
    it('Should return expected structure.', () => {
      const wrapper = mountWithComposable({ ...defaultMock.mockProps, rules: defaultMock.rules });
      const vm = wrapper.vm;

      expect(vm).toHaveProperty('rulesByDefault');
      expect(vm).toHaveProperty('conditionsComplete');
      expect(vm).toHaveProperty('conditionsNotComplete');
      expect(vm).toHaveProperty('passwordDifficultyPercentage');
    });
  });

  describe('rulesByDefault', () => {
    it('Should contain default validation rules and thresholds', () => {
      const wrapper = mountWithComposable({ modelValue: '' });
      const vm = wrapper.vm;

      expect(typeof vm.rulesByDefault.minLength).toBe('function');
      expect(typeof vm.rulesByDefault.lowerCase).toBe('function');
      expect(typeof vm.rulesByDefault.upperCase).toBe('function');
      expect(typeof vm.rulesByDefault.specialSymbols).toBe('function');
    });
  });

  describe('conditionsComplete', () => {
    it('Should return empty array for empty password', () => {
      const wrapper = mountWithComposable({ ...defaultMock.mockProps, modelValue: '' });
      const vm = wrapper.vm;

      expect(vm.conditionsComplete).toEqual([]);
    });

    it('Should detect all satisfied conditions', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        rules: defaultMock.rules,
        modelValue: 'Password123_',
      });
      const vm = wrapper.vm;

      expect(vm.conditionsComplete).toEqual([
        expect.objectContaining({ message: 'Min 8 chars.' }),
        expect.objectContaining({ message: 'Uppercase required.' }),
        expect.objectContaining({ message: 'Lowercase required.' }),
        expect.objectContaining({ message: 'Special symbol: _.' }),
      ]);
    });
  });

  describe('conditionsNotComplete', () => {
    it('Should detect all unsatisfied conditions', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        rules: defaultMock.rules,
        modelValue: 'lowercaseonly',
      });
      const vm = wrapper.vm;

      expect(vm.conditionsNotComplete).toEqual([
        expect.objectContaining({ message: 'Uppercase required.' }),
        expect.objectContaining({ message: 'Special symbol: _.' }),
      ]);
    });

    it('Should handle partial fulfillment', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        rules: defaultMock.rules,
        modelValue: 'MissingSpecial1',
      });
      const vm = wrapper.vm;

      expect(vm.conditionsNotComplete).toEqual([
        expect.objectContaining({ message: 'Special symbol: _.' }),
      ]);
    });
  });

  describe('passwordDifficultyPercentage', () => {
    it('Should calculate 0% for empty password', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        rules: defaultMock.rules,
        modelValue: '',
      });
      const vm = wrapper.vm;

      expect(vm.passwordDifficultyPercentage).toBe(0);
    });

    it('Should calculate 100% for fully compliant password', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        rules: defaultMock.rules,
        modelValue: 'Password123_',
      });
      const vm = wrapper.vm;

      expect(vm.passwordDifficultyPercentage).toBe(100);
    });

    it('Should calculate 50% when half rules met', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        rules: defaultMock.rules,
        modelValue: 'Foo',
      });
      const vm = wrapper.vm;

      expect(vm.passwordDifficultyPercentage).toBe(50);
    });

    it('Should handle custom rule weights', () => {
      const wrapper = mountWithComposable({
        modelValue: 'WeightedPass',
        rules: [
          { condition: () => true, message: 'First rule', weight: 3 },
          { condition: () => true, message: 'Second rule', weight: 2 },
          { condition: () => false, message: 'Third rule', weight: 1 },
        ],
      });
      const vm = wrapper.vm;

      console.log(vm.conditionsNotComplete, 'vm.passwordDifficultyPercentage');

      // Total weight: 3 (2+1)
      // Achieved weight: 2
      // Expected: (2/3)*100 ≈ 66.67
      expect(vm.passwordDifficultyPercentage).toBeCloseTo(66.67);
    });
  });

  describe('Edge Cases', () => {
    it('Should handle null modelValue', () => {
      const wrapper = mountWithComposable({ ...defaultMock.mockProps, modelValue: null });

      expect(wrapper.vm.conditionsComplete).toEqual([]);
    });
  });
});
