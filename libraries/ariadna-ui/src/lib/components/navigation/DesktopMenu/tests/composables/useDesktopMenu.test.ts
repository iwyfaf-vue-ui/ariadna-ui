import { describe, it, expect, vi } from 'vitest';
import { nextTick, defineComponent, h } from 'vue';
import { mount } from '@vue/test-utils';
import useDesktopMenu from '../../composables/useDesktopMenu/useDesktopMenu';
import type { TDesktopMenuProps } from '../../DesktopMenu';
import type { TSharedMenu } from '@/types/component';
import { DesktopMenuSelectorTestData } from '../test-data/DesktopMenu.selector.test-data';

const defaultMock = new DesktopMenuSelectorTestData();

function mountWithComposable(props: TDesktopMenuProps) {
  const emits = vi.fn();

  return mount(
    defineComponent({
      setup() {
        const result = useDesktopMenu(props, emits);
        return { ...result, emits };
      },
      render() {
        return h('div');
      },
    }),
  );
}

describe('useDesktopMenu', () => {
  describe('mapShowMoreState', () => {
    it('Should be defined and initially empty Map.', () => {
      const wrapper = mountWithComposable({ ...defaultMock.mockProps, data: defaultMock.data });
      const vm = wrapper.vm;

      expect(vm.mapShowMoreState).toBeDefined();
      expect(vm.mapShowMoreState.size).toBe(0);
    });
  });

  describe('activeMenu', () => {
    it('Should be defined and initially set to first menu item after mount.', async () => {
      const wrapper = mountWithComposable({ ...defaultMock.mockProps, data: defaultMock.data });
      const vm = wrapper.vm;

      await nextTick();
      expect(vm.activeMenu).toBeDefined();
      expect(vm.activeMenu).not.toBeNull();
      expect(vm.activeMenu!.name).toBe(defaultMock.data[0].name);
    });

    it('Should update activeMenu when secondLevelVisibleHandler is called with valid menu.', () => {
      const wrapper = mountWithComposable({ ...defaultMock.mockProps, data: defaultMock.data });
      const vm = wrapper.vm;

      vm.secondLevelVisibleHandler(defaultMock.data[1]);
      expect(vm.activeMenu).toStrictEqual(defaultMock.data[1]);
    });

    it('Should not update activeMenu when secondLevelVisibleHandler is called with undefined or menu without children.', () => {
      const wrapper = mountWithComposable({ ...defaultMock.mockProps, data: defaultMock.data });
      const vm = wrapper.vm;

      vm.secondLevelVisibleHandler(undefined as unknown as TSharedMenu);
      expect(vm.activeMenu).toStrictEqual(defaultMock.data[0]);

      const menuWithoutChildren = { ...defaultMock.data[1], children: [] };
      vm.secondLevelVisibleHandler(menuWithoutChildren);
      expect(vm.activeMenu).toStrictEqual(defaultMock.data[0]);
    });
  });

  describe('isDataExist', () => {
    it('Should return true if data array is not empty.', () => {
      const wrapper = mountWithComposable({ ...defaultMock.mockProps, data: defaultMock.data });
      const vm = wrapper.vm;

      expect(vm.isDataExist).toBe(true);
    });

    it('Should return false if data array is empty.', () => {
      const wrapper = mountWithComposable({ ...defaultMock.mockProps, data: [] });
      const vm = wrapper.vm;

      expect(vm.isDataExist).toBe(false);
    });
  });

  describe('componentClasses ComputedRef', () => {
    it('Should generate correct componentClasses for default props.', () => {
      const wrapper = mountWithComposable({ ...defaultMock.mockProps, data: defaultMock.data });
      const vm = wrapper.vm;

      const classes = vm.componentClasses.split(' ');

      console.log(classes, 'classes');

      const expectedClasses = [
        defaultMock.getSelectorWithoutDot(defaultMock.rootEl),
        defaultMock.getSelectorWithoutDot(defaultMock.themeModifier),
      ];

      expect(classes).toEqual(expect.arrayContaining(expectedClasses));
      expect(classes.length).toBe(expectedClasses.length);
    });

    it('Should include loading modifier class when data prop is empty.', () => {
      const wrapper = mountWithComposable({ ...defaultMock.mockProps, data: [] });
      const vm = wrapper.vm;

      expect(vm.componentClasses).toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.loadingModifier),
      );
    });

    it('Should include invalid modifier class when invalid prop is true.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        data: defaultMock.data,
        invalid: true,
      });
      const vm = wrapper.vm;

      expect(vm.componentClasses).toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.invalidModifier),
      );
    });
  });

  describe('isMenuElementHidden', () => {
    it('Should return false if visibleItems prop is 0.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        data: defaultMock.data,
        visibleItems: 0,
      });
      const vm = wrapper.vm;

      const isHidden = vm.isMenuElementHidden(10, defaultMock.data[0].children);
      expect(isHidden).toBe(false);
    });

    it('Should return false if mapShowMoreState for children is true.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        data: defaultMock.data,
      });
      const vm = wrapper.vm;

      vm.mapShowMoreState.set(defaultMock.data[0].children, true);
      const isHidden = vm.isMenuElementHidden(10, defaultMock.data[0].children);
      expect(isHidden).toBe(false);
    });

    it('Should return false if index is less than or equal to visibleItems.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        data: defaultMock.data,
      });
      const vm = wrapper.vm;

      vm.mapShowMoreState.set(defaultMock.data[0].children, false);
      const isHidden = vm.isMenuElementHidden(0, defaultMock.data[0].children);
      expect(isHidden).toBe(false);
    });
  });

  describe('eventType', () => {
    it('Should be "click" if expandMode prop is "click".', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        data: defaultMock.data,
        expandMode: 'click',
      });
      const vm = wrapper.vm;

      expect(vm.eventType).toBe('click');
    });

    it('Should be "mouseover" if expandMode prop is "hover".', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        data: defaultMock.data,
        expandMode: 'hover',
      });
      const vm = wrapper.vm;

      expect(vm.eventType).toBe('mouseover');
    });
  });

  describe('showMoreHandler', () => {
    it('Should set mapShowMoreState to true if undefined or false.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        data: defaultMock.data,
      });
      const vm = wrapper.vm;

      expect(vm.mapShowMoreState.get(defaultMock.data[0].children)).toBeUndefined();

      vm.showMoreHandler(defaultMock.data[0].children);
      expect(vm.mapShowMoreState.get(defaultMock.data[0].children)).toBe(true);
    });

    it('Should toggle mapShowMoreState from true to false.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        data: defaultMock.data,
      });
      const vm = wrapper.vm;

      vm.mapShowMoreState.set(defaultMock.data[0].children, true);
      vm.showMoreHandler(defaultMock.data[0].children);
      expect(vm.mapShowMoreState.get(defaultMock.data[0].children)).toBe(false);
    });
  });

  describe('onOverlayClick', () => {
    it('Should emit "click:overlay" event when called.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        data: defaultMock.data,
      });
      const vm = wrapper.vm;

      wrapper.vm.onOverlayClick();
      expect(vm.emits).toHaveBeenCalledWith('click:overlay');
    });
  });

  describe('Lifecycle emits', () => {
    it('Should emit "mounted" event on mount.', async () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        data: defaultMock.data,
      });
      const vm = wrapper.vm;

      await nextTick();
      expect(vm.emits).toHaveBeenCalledWith('mounted');
    });
  });
});
