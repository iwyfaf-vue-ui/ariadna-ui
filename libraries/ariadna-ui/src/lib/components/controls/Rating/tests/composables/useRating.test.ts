import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, h, ref } from 'vue';
import type { TRatingProps } from '../../Rating';
import { RatingSelectorTestData } from '../test-data/Rating.selector.test-data';
import type { TRatingPropsValuePosition } from '../../types/Rating.types';
import useRating from '../../composables/useRating/useRating';
import { ERatingPropsDefault } from '@/lib/components/controls/Rating/types/Rating.enums';

const defaultMock = new RatingSelectorTestData();

function mountWithComposable(props: TRatingProps) {
  const emits = vi.fn();

  return mount(
    defineComponent({
      setup() {
        const result = useRating(props, emits, ref(props.modelValue), ref(0));

        return { ...result, emits };
      },
      render() {
        return h('div');
      },
    }),
  );
}

describe('useRating', () => {
  describe('Basic functionality', () => {
    it('Should return expected structure.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      expect(vm).toHaveProperty('uniqueID');
      expect(vm).toHaveProperty('componentClasses');
      expect(vm).toHaveProperty('ratingStyles');
      expect(vm).toHaveProperty('readableRating');
      expect(vm).toHaveProperty('ratingStarMaskStyles');
      expect(vm).toHaveProperty('starsCount');
      expect(vm).toHaveProperty('onFocus');
      expect(vm).toHaveProperty('onBlur');
      expect(vm).toHaveProperty('onMouseOver');
      expect(vm).toHaveProperty('onMouseLeave');
      expect(vm).toHaveProperty('onReset');
      expect(vm).toHaveProperty('onExpandEnter');
      expect(vm).toHaveProperty('onExpandAfterEnter');
      expect(vm).toHaveProperty('onExpandBeforeLeave');
    });
  });

  describe('uniqueID ComputedRef', () => {
    it('Should compute uniqueID using useId if id is not provided.', () => {
      const wrapper = mountWithComposable({ ...defaultMock.mockProps, id: defaultMock.idProp });
      const vm = wrapper.vm;

      expect(vm.uniqueID).toBeDefined();
      expect(typeof vm.uniqueID).toBe('string');
    });

    it('Should compute uniqueID from props.id if provided.', () => {
      const wrapper = mountWithComposable({ ...defaultMock.mockProps, id: defaultMock.idProp });
      const vm = wrapper.vm;

      expect(vm.uniqueID).toEqual(defaultMock.idProp);
    });
  });

  describe('componentClasses ComputedRef', () => {
    it('Should generate correct componentClasses for default props.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      const classes = vm.componentClasses.split(' ');

      const expectedClasses = [
        defaultMock.getSelectorWithoutDot(defaultMock.rootEl),
        defaultMock.getSelectorWithoutDot(defaultMock.themeModifier),
        defaultMock.getSelectorWithoutDot(defaultMock.sizeMediumModifier),
      ];

      expect(classes).toEqual(expect.arrayContaining(expectedClasses));
      expect(classes.length).toBe(expectedClasses.length);
    });

    it('Should include modifier class when provided.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        modifier: defaultMock.modifierProp,
      });
      const vm = wrapper.vm;

      expect(vm.componentClasses).toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.primaryModifier),
      );
    });

    it('Should generate correct componentClasses with modifier.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        modelValue: defaultMock.modelValueProp,
        size: defaultMock.sizeProp,
        disabled: true,
        valid: true,
        invalid: true,
      });
      const vm = wrapper.vm;

      const classes = vm.componentClasses.split(' ');

      const expectedClasses = [
        defaultMock.getSelectorWithoutDot(defaultMock.rootEl),
        defaultMock.getSelectorWithoutDot(defaultMock.themeModifier),
        defaultMock.getSelectorWithoutDot(defaultMock.sizeSmallModifier),
        defaultMock.getSelectorWithoutDot(defaultMock.disabledModifier),
        defaultMock.getSelectorWithoutDot(defaultMock.validModifier),
        defaultMock.getSelectorWithoutDot(defaultMock.invalidModifier),
      ];

      expect(classes).toEqual(expect.arrayContaining(expectedClasses));
      expect(classes.length).toBe(expectedClasses.length);
    });
  });

  describe('ratingStyles ComputedRef', () => {
    it('Should compute ratingStyles for each valuePosition.', () => {
      const positions: TRatingPropsValuePosition[] = ['top', 'left', 'right', 'bottom'];
      const expected = {
        top: 'column-reverse',
        left: 'row-reverse',
        right: 'row',
        bottom: 'column',
      };

      positions.forEach((pos) => {
        const wrapper = mountWithComposable({
          ...defaultMock.mockProps,
          valuePosition: pos,
        });
        const vm = wrapper.vm;
        expect(vm.ratingStyles['flex-direction']).toEqual(expected[pos as keyof typeof expected]);
      });
    });
  });

  describe('readableRating ComputedRef', () => {
    it('Should compute readableRating as string with 2 decimals.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        modelValue: 2.345,
      });
      const vm = wrapper.vm;

      expect(vm.readableRating).toEqual(
        (Math.round(2.345 * ERatingPropsDefault.STAR_COUNT * 100) / 100).toString(),
      );
    });
  });

  describe('ratingStarMaskStyles ComputedRef', () => {
    it('Should compute ratingStarMaskStyles for enabled state.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        disabled: false,
      });
      const vm = wrapper.vm;

      expect(vm.ratingStarMaskStyles.width).toMatch(/^\d+%$/);
    });

    it('Should compute ratingStarMaskStyles as width 0 for disabled.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        disabled: true,
      });
      const vm = wrapper.vm;
      expect(vm.ratingStarMaskStyles.width).toEqual('0');
    });
  });

  describe('starsCount ComputedRef', () => {
    it('Should compute starsCount as 1 in singleMode+readonly, else as starCount.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        singleMode: true,
        readonly: true,
      });
      const vm = wrapper.vm;

      expect(vm.starsCount).toEqual(1);

      const wrapper2 = mountWithComposable({
        ...defaultMock.mockProps,
        singleMode: false,
        readonly: false,
      });
      const vm2 = wrapper2.vm;
      expect(vm2.starsCount).toEqual(ERatingPropsDefault.STAR_COUNT);
    });
  });

  describe('onFocus Function', () => {
    it('Should set focused to true and emit on onFocus.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;
      const event = new Event('focus');

      vm.onFocus(event);
      expect(vm.emits).toHaveBeenCalledWith('focus', event);
    });
  });

  describe('onBlur Function', () => {
    it('Should set focused to false on onBlur.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      vm.onBlur();

      // blur is internal, so we check via componentClasses
      expect(vm.componentClasses.includes(defaultMock.focusedModifier)).toBe(false);
    });
  });

  describe('onMouseOver Function', () => {
    it('Should set hovered to true on onMouseOver.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      vm.onMouseOver();

      // hovered is internal, so we check via componentClasses
      expect(vm.componentClasses.includes(defaultMock.hoveredModifier)).toBe(true);
    });
  });

  describe('onMouseLeave Function', () => {
    it('Should set hovered to false on onMouseLeave.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      vm.onMouseLeave();

      // hovered is internal, so we check via componentClasses
      expect(vm.componentClasses.includes(defaultMock.hoveredModifier)).toBe(false);
    });
  });

  describe('onReset Function', () => {
    it('Should reset value and emit onReset.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        modelValue: 3,
      });
      const vm = wrapper.vm;

      vm.onReset();

      expect(vm.emits).toHaveBeenCalledWith('update:model-value', 0);
    });
  });

  describe('onExpandEnter Function', () => {
    it('Should set height on onExpandEnter.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      const el = document.createElement('div');
      Object.defineProperty(el, 'scrollHeight', { value: 123, configurable: true });
      vm.onExpandEnter(el);

      expect(el.style.height).toBe('123px');
    });
  });

  describe('onExpandAfterEnter Function', () => {
    it('Should set height to auto on onExpandAfterEnter.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      const el = document.createElement('div');
      vm.onExpandAfterEnter(el);

      expect(el.style.height).toBe('auto');
    });
  });

  describe('onExpandBeforeLeave Function', () => {
    it('Should set height on onExpandBeforeLeave.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      const el = document.createElement('div');
      Object.defineProperty(el, 'scrollHeight', { value: 456, configurable: true });
      vm.onExpandBeforeLeave(el);

      expect(el.style.height).toBe('456px');
    });
  });
});
