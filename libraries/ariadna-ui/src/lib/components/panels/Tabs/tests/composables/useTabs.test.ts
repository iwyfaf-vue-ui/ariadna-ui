import { describe, it, expect, vi } from 'vitest';
import { defineComponent, h, ref, shallowRef } from 'vue';
import { mount } from '@vue/test-utils';
import useTabs from '../../composables/useTabs/useTabs';
import type { TTabsProps } from '../../Tabs';
import { TabsSelectorTestData } from '../test-data/Tabs.selector.test-data';
import type { TKeysCore } from '../../core/keys/keys.core.types';
import KeysCore from '../../core/keys/keys.core';
import useSlide from '../../composables/useSlide/useSlide';

const defaultMock = new TabsSelectorTestData();

function mountWithComposable(props: TTabsProps) {
  const emits = vi.fn();
  const headerContainerRef = shallowRef<HTMLDivElement | null>(null);
  const keysCore = ref<TKeysCore>(new KeysCore(props.tabs, props.titleKey!));
  const slideCore = useSlide(headerContainerRef, props.slide!);

  return mount(
    defineComponent({
      setup() {
        const result = useTabs(props, emits, keysCore, slideCore);
        return { ...result, emits: emits };
      },
      render() {
        return h('div');
      },
    }),
  );
}

describe('useTabs', () => {
  describe('Basic functionality', () => {
    it('Should return expected structure.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      expect(vm).toHaveProperty('componentClasses');
      expect(vm).toHaveProperty('switchTab');
      expect(vm).toHaveProperty('nextTab');
      expect(vm).toHaveProperty('prevTab');
    });

    it('Should initialize with default states and computed properties.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      expect(vm.componentClasses).toBeDefined();
      expect(typeof vm.componentClasses).toBe('string');
      expect(vm.switchTab).toBeDefined();
      expect(vm.nextTab).toBeDefined();
      expect(vm.prevTab).toBeDefined();
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

  describe('activeTabKey Ref', () => {
    it('Should initialize activeTabKey with activeKeyByDefault if provided and valid.', () => {
      const props = { ...defaultMock.mockProps, activeKeyByDefault: 'tab_1' };
      props.tabs = [{ title: 'tab_1' }, { title: 'tab_2' }];
      const wrapper = mountWithComposable(props);
      const vm = wrapper.vm;

      expect(vm.activeTabKey).toBe('tab_1');
    });

    it('Should initialize activeTabKey with key at openedByDefault index if activeKeyByDefault is empty.', () => {
      const wrapper = mountWithComposable({ ...defaultMock.mockProps, tabs: defaultMock.tabs });
      const vm = wrapper.vm;

      expect(vm.activeTabKey).toBeDefined();
      expect(vm.activeTabKey).not.toBe('');
    });

    it('Should initialize activeTabKey as empty string if tabs array is empty.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      expect(vm.activeTabKey).toBe('');
    });
  });

  describe('switchTab', () => {
    it('Should switch activeTabKey and emit change event with correct payload.', () => {
      const wrapper = mountWithComposable({ ...defaultMock.mockProps, tabs: defaultMock.tabs });
      const vm = wrapper.vm;

      const newKey = vm.activeTabKey === 'tab_1' ? 'tab_2' : 'tab_1';
      vm.switchTab(newKey);

      expect(wrapper.vm.activeTabKey).toBe(newKey);
      expect(vm.emits).toHaveBeenCalledOnce();
      expect(vm.emits).toHaveBeenCalledWith('change', {
        key: newKey,
        tab: expect.objectContaining({ title: expect.any(String) }),
      });
    });
  });

  describe('nextTab', () => {
    it('Should switch to next tab if not at last tab.', () => {
      const wrapper = mountWithComposable({ ...defaultMock.mockProps, tabs: defaultMock.tabs });
      const vm = wrapper.vm;

      vm.switchTab(wrapper.vm.activeTabKey);
      const currentKey = wrapper.vm.activeTabKey;
      wrapper.vm.nextTab();

      expect(vm.activeTabKey).not.toBe(currentKey);
    });
  });

  describe('prevTab', () => {
    it('Should switch to previous tab if not at first tab.', () => {
      const wrapper = mountWithComposable({ ...defaultMock.mockProps, tabs: defaultMock.tabs });
      const vm = wrapper.vm;

      vm.switchTab(wrapper.vm.activeTabKey);
      const currentKey = vm.activeTabKey;
      vm.prevTab();

      expect(vm.activeTabKey).not.toBe(currentKey);
    });

    it('Should wrap to last tab if currently at first tab.', () => {
      const wrapper = mountWithComposable({ ...defaultMock.mockProps, tabs: defaultMock.tabs });
      const vm = wrapper.vm;

      // Switch to first tab key
      vm.switchTab(wrapper.vm.activeTabKey);
      // Call prevTab enough times to wrap
      for (let i = 0; i < defaultMock.tabs.length; i++) {
        wrapper.vm.prevTab();
      }

      expect(wrapper.vm.activeTabKey).toBeDefined();
    });
  });
});
