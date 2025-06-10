import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import DesktopMenu from '../../DesktopMenu.vue';
import { DesktopMenuSelectorTestData } from '../test-data/DesktopMenu.selector.test-data';

const defaultMock = new DesktopMenuSelectorTestData();

describe('DesktopMenu.vue', () => {
  describe('Basic render', () => {
    const wrapper = mount(DesktopMenu, {
      props: {
        data: [],
      },
    });

    it('Should render component without errors.', () => {
      expect(wrapper.exists()).toBe(true);
    });
  });

  describe('Props', () => {
    it('Should apply default props correctly.', () => {
      const wrapper = mount(DesktopMenu, {
        props: {
          data: [],
        },
      });

      expect(wrapper.props('data')).toEqual([]);
      expect(wrapper.props('expandMode')).toBe('hover');
      expect(wrapper.props('visibleItems')).toBe(0);
      expect(wrapper.props('overlay')).toBe(true);
      expect(wrapper.props('cssClass')).toBe(defaultMock.getSelectorWithoutDot(defaultMock.rootEl));
    });

    it('data: Should handle empty data array without errors.', () => {
      const wrapper = mount(DesktopMenu, {
        props: {
          data: [],
        },
      });

      expect(wrapper.exists()).toBe(true);
    });

    it('data: Should handle not empty data array without errors.', () => {
      const wrapper = mount(DesktopMenu, {
        props: {
          data: defaultMock.data,
        },
      });

      expect(wrapper.exists()).toBe(true);
    });

    it('expandMode: Should apply expandMode prop correctly.', () => {
      const wrapper = mount(DesktopMenu, {
        props: {
          data: [],
          expandMode: 'hover',
        },
      });

      expect(wrapper.props('expandMode')).toBe('hover');
    });

    it('visibleItems: Should apply visibleItems prop correctly.', () => {
      const wrapper = mount(DesktopMenu, {
        props: {
          data: [],
          visibleItems: 5,
        },
      });

      expect(wrapper.props('visibleItems')).toBe(5);
    });

    it('overlay: Should render overlay element based is overlay prop is true.', () => {
      const wrapper = mount(DesktopMenu, {
        props: {
          data: [],
          overlay: true,
        },
      });

      expect(wrapper.find(defaultMock.overlayEl).exists()).toBe(true);
    });

    it('overlay: Should not render overlay element based is overlay prop is false.', () => {
      const wrapper = mount(DesktopMenu, {
        props: {
          data: [],
          overlay: false,
        },
      });

      expect(wrapper.find(defaultMock.overlayEl).exists()).toBe(false);
    });

    it('invalid: should add invalid modifier class when invalid prop is true', () => {
      const wrapper = mount(DesktopMenu, {
        props: {
          data: [],
          invalid: true,
        },
      });

      expect(wrapper.classes()).toContain(defaultMock.invalidModifier);
    });

    it('cssClass: Should apply custom root class and generate BEM child classes.', async () => {
      const _defaultMock = new DesktopMenuSelectorTestData(defaultMock.cssClassProp);

      const wrapper = mount(DesktopMenu, {
        props: {
          data: defaultMock.data,
          invalid: true,
          error: true,
          cssClass: defaultMock.cssClassProp,
        },
        slots: {
          loading: await DesktopMenuSelectorTestData.getDesktopMenuSlotLoadingCustom(),
          error: await DesktopMenuSelectorTestData.getDesktopMenuSlotErrorCustom(),
        },
      });

      function expectElementsToExist(...elements: Array<string>) {
        elements.forEach((element) => {
          expect(wrapper.find(defaultMock.getSelectorWithDot(element)).exists()).toBe(true);
        });
      }

      expectElementsToExist(
        _defaultMock.rootEl,
        _defaultMock.wrapperEl,
        _defaultMock.rubricatorEl,
        _defaultMock.rubricatorItemEl,
        _defaultMock.rubricatorTextEl,
        _defaultMock.errorEl,
        _defaultMock.overlayEl,
        _defaultMock.themeModifier,
        _defaultMock.invalidModifier,
      );
    });
  });

  describe('Slots', () => {
    it('rubricator: Should render rubricator default slot.', async () => {
      const wrapper = mount(DesktopMenu, {
        props: {
          data: defaultMock.data,
        },
      });

      expect(wrapper.find(defaultMock.getSelectorWithDot(defaultMock.rubricatorEl)).exists()).toBe(
        true,
      );
      expect(wrapper.find(defaultMock.rubricatorEl).element.innerHTML).toBe(
        await DesktopMenuSelectorTestData.getDesktopMenuSlotRubricatorDefault(),
      );
    });

    it('rubricator: Should render rubricator custom slot.', async () => {
      const wrapper = mount(DesktopMenu, {
        props: {
          data: defaultMock.data,
        },
        slots: {
          rubricator: await DesktopMenuSelectorTestData.getDesktopMenuSlotRubricatorCustom(),
        },
      });

      expect(wrapper.find(defaultMock.getSelectorWithDot(defaultMock.rubricatorEl)).exists()).toBe(
        true,
      );
      expect(wrapper.find(defaultMock.rubricatorEl).element.innerHTML).toBe(
        await DesktopMenuSelectorTestData.getDesktopMenuSlotRubricatorCustom(),
      );
    });

    it('loading: Should render loading custom slot.', async () => {
      const wrapper = mount(DesktopMenu, {
        props: {
          data: [],
        },
        slots: {
          loading: await DesktopMenuSelectorTestData.getDesktopMenuSlotLoadingCustom(),
        },
      });

      expect(wrapper.find(defaultMock.getSelectorWithDot(defaultMock.loadingEl)).exists()).toBe(
        true,
      );
      expect(wrapper.find(defaultMock.loadingEl).element.innerHTML).toBe(
        await DesktopMenuSelectorTestData.getDesktopMenuSlotLoadingCustom(),
      );
    });

    it('error: Should render loading custom slot.', async () => {
      const wrapper = mount(DesktopMenu, {
        props: {
          data: [],
          invalid: true,
        },
        slots: {
          error: await DesktopMenuSelectorTestData.getDesktopMenuSlotErrorCustom(),
        },
      });

      expect(wrapper.find(defaultMock.getSelectorWithDot(defaultMock.errorEl)).exists()).toBe(true);
      expect(wrapper.find(defaultMock.errorEl).element.innerHTML).toBe(
        await DesktopMenuSelectorTestData.getDesktopMenuSlotErrorCustom(),
      );
    });
  });

  describe('Emits', () => {
    it('Should emit "click:overlay" event when overlay is clicked.', async () => {
      const wrapper = mount(DesktopMenu, {
        props: {
          data: [],
        },
      });

      await wrapper.find(defaultMock.overlayEl).trigger('click');
      expect(wrapper.emitted('click:overlay')).toBeTruthy();
      expect(wrapper.emitted('click:overlay')![0]).toEqual([]);
    });

    it('Should emit "mounted" event on component mount.', () => {
      const wrapper = mount(DesktopMenu, {
        props: {
          data: [],
        },
      });

      expect(wrapper.emitted('mounted')).toBeTruthy();
      expect(wrapper.emitted('mounted')![0]).toEqual([]);
    });
  });
});
