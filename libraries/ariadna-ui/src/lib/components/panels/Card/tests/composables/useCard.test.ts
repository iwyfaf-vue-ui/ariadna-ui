import { describe, it, expect } from 'vitest';
import { defineComponent, h } from 'vue';
import { mount } from '@vue/test-utils';
import useCard from '../../composables/useCard/useCard';
import type { TCardProps } from '../../Card';
import { CardSelectorTestData } from '../test-data/Card.selector.test-data';

const defaultMock = new CardSelectorTestData();

function mountWithComposable(props: TCardProps) {
  return mount(
    defineComponent({
      setup() {
        const result = useCard(props);
        return { ...result };
      },
      render() {
        return h('div');
      },
    }),
  );
}

describe('useCheckbox', () => {
  describe('Basic functionality', () => {
    it('Should return expected structure.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      expect(vm).toHaveProperty('componentClasses');
      expect(vm).toHaveProperty('isContentCollapsed');
      expect(vm).toHaveProperty('toggleCollapsedDefault');
      expect(vm).toHaveProperty('toggleCollapsed');
      expect(vm).toHaveProperty('onCollapseEnter');
      expect(vm).toHaveProperty('onCollapseAfterEnter');
      expect(vm).toHaveProperty('onCollapseBeforeLeave');
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
        modifier: defaultMock.modifierProp,
      });
      const vm = wrapper.vm;

      const classes = vm.componentClasses.split(' ');

      const expectedClasses = [
        defaultMock.getSelectorWithoutDot(defaultMock.rootEl),
        defaultMock.getSelectorWithoutDot(defaultMock.themeModifier),
        defaultMock.getSelectorWithoutDot(defaultMock.primaryModifier),
      ];

      expect(classes).toEqual(expect.arrayContaining(expectedClasses));
      expect(classes.length).toBe(expectedClasses.length);
    });
  });

  describe('isContentCollapsed', () => {
    it('Should be false by default.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      expect(vm.isContentCollapsed).toBe(false);
    });

    it('Should toggle collapsed state.', async () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      expect(vm.isContentCollapsed).toBe(false);

      vm.toggleCollapsed();
      expect(vm.isContentCollapsed).toBe(true);

      vm.toggleCollapsed();
      expect(vm.isContentCollapsed).toBe(false);
    });
  });

  describe('toggleCollapsedDefault', () => {
    it('Should set isContentCollapsed to true if symbols.all > symbols.visible.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        symbols: { all: 5, visible: 3 },
      });
      const vm = wrapper.vm;

      vm.toggleCollapsedDefault();
      expect(vm.isContentCollapsed).toBe(true);
    });

    it('Should set isContentCollapsed to false if symbols.all <= symbols.visible.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        symbols: { all: 2, visible: 2 },
      });
      const vm = wrapper.vm;

      vm.toggleCollapsedDefault();
      expect(vm.isContentCollapsed).toBe(false);
    });

    it('Should do nothing if symbols is undefined.', () => {
      const wrapper = mountWithComposable({ ...defaultMock.mockProps, symbols: undefined });
      const vm = wrapper.vm;

      vm.isContentCollapsed = true;
      vm.toggleCollapsedDefault();
      expect(vm.isContentCollapsed).toBe(true);
    });

    it('Should handle edge case: symbols.all = 0, symbols.visible = 0.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        symbols: { all: 0, visible: 0 },
      });
      const vm = wrapper.vm;

      vm.toggleCollapsedDefault();
      expect(vm.isContentCollapsed).toBe(false);
    });
  });

  describe('onCollapseEnter', () => {
    it('Should set element height to scrollHeight.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      const el = document.createElement('div');
      Object.defineProperty(el, 'offsetHeight', { value: 42, configurable: true });
      Object.defineProperty(el, 'scrollHeight', { value: 100, configurable: true });
      vm.onCollapseEnter(el);

      expect(el.style.height).toBe('100px');
    });
  });

  describe('onCollapseAfterEnter', () => {
    it('Should reset element height style.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      const el = document.createElement('div');
      el.style.height = '100px';
      vm.onCollapseAfterEnter(el);

      expect(el.style.height).toBe('');
    });
  });

  describe('onCollapseBeforeLeave', () => {
    it('Should animate height from scrollHeight to collapsed height.', async () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      const el = document.createElement('div');
      Object.defineProperty(el, 'offsetHeight', { value: 40, configurable: true });
      Object.defineProperty(el, 'scrollHeight', { value: 120, configurable: true });

      // Сначала имитируем enter, чтобы _contentTextCollapsedHeight был установлен
      vm.onCollapseEnter(el);
      expect(el.style.height).toBe('120px');

      // Теперь тестируем beforeLeave
      await vm.onCollapseBeforeLeave(el);
      expect(el.style.height).toBe('40px');
    });
  });

  describe('Edge cases', () => {
    it('Should not throw if modifier is an empty string.', () => {
      const wrapper = mountWithComposable({ ...defaultMock.mockProps, modifier: '' });
      const vm = wrapper.vm;

      const classes = vm.componentClasses.split(' ');

      const expectedClasses = [
        defaultMock.getSelectorWithoutDot(defaultMock.rootEl),
        defaultMock.getSelectorWithoutDot(defaultMock.themeModifier),
      ];

      expect(classes).toEqual(expect.arrayContaining(expectedClasses));
      expect(classes.length).toBe(expectedClasses.length);
    });

    it('Should not throw if cssClass is an empty string.', () => {
      const wrapper = mountWithComposable({ ...defaultMock.mockProps, cssClass: '' });
      const vm = wrapper.vm;

      expect(vm.componentClasses).toBe('--theme');
    });

    it('Should not throw if symbols.all or symbols.visible are large positive numbers.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        symbols: { all: 100000, visible: 99999 },
      });
      const vm = wrapper.vm;

      vm.toggleCollapsedDefault();
      expect(vm.isContentCollapsed).toBe(true);
    });
  });
});
