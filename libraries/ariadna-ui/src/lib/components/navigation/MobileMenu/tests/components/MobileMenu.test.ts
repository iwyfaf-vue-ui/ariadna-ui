import { describe, it, expect } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import MobileMenu from '../../MobileMenu.vue';
import { MobileMenuSelectorTestData } from '../test-data/MobileMenu.selector.test-data';

const defaultMock = new MobileMenuSelectorTestData();

describe('MobileMenu.vue', () => {
  describe('Basic render', () => {
    const wrapper = mount(MobileMenu, {
      props: {
        menu: defaultMock.menus,
      },
    });

    it('Should render component without errors.', () => {
      expect(wrapper.exists()).toBe(true);
    });
  });

  describe('Props', () => {
    it('animationTime: Should apply default animationTime if not provided.', async () => {
      const wrapper = mount(MobileMenu, {
        props: {
          menu: defaultMock.menus,
        },
      });

      expect(wrapper.props('animationTime')).toBe(300);
    });

    it('cssClass: Should apply custom root class and generate BEM child classes.', async () => {
      const _defaultMock = new MobileMenuSelectorTestData(defaultMock.cssClassProp);

      const wrapper: VueWrapper<any> = mount(MobileMenu, {
        props: {
          menu: defaultMock.menus,
          cssClass: defaultMock.cssClassProp,
        },
      });

      const navbarItemElement = wrapper.findAll(_defaultMock.navbarItemEl);
      await navbarItemElement[0].trigger('click');

      function expectElementsToExist(...elements: Array<string>) {
        elements.forEach((element) => {
          expect(wrapper.find(defaultMock.getSelectorWithDot(element)).exists()).toBe(true);
        });
      }

      expectElementsToExist(
        _defaultMock.rootEl,
        _defaultMock.overlayEl,
        _defaultMock.navbarEl,
        _defaultMock.navbarItemEl,
        _defaultMock.menuEl,
        _defaultMock.pageEl,
        _defaultMock.headerEl,
        _defaultMock.headerBackEl,
        _defaultMock.openedModifier,
        _defaultMock.themeModifier,
      );
    });

    it('ariaLabel: Should set aria-label attribute on nav element.', () => {
      const wrapper = mount(MobileMenu, {
        props: {
          menu: defaultMock.menus,
          ariaLabel: defaultMock.ariaLabelProp,
        },
      });

      expect(wrapper.find(defaultMock.rootEl).attributes('aria-label')).toBe(
        defaultMock.ariaLabelProp,
      );
    });
  });

  describe('Slots', () => {
    it('navbarItem: Should render navbarItem default slot.', async () => {
      const wrapper = mount(MobileMenu, {
        props: {
          menu: defaultMock.menus,
        },
      });

      const navbarItems = wrapper.findAll(defaultMock.getSelectorWithDot(defaultMock.navbarItemEl));

      expect(navbarItems.length).toBe(defaultMock.menus.length);
      expect(navbarItems[0].exists()).toBe(true);
      expect(navbarItems[0].element.innerHTML).toBe(
        await MobileMenuSelectorTestData.getMobileMenuSlotNavbarItemDefault(),
      );
    });

    it('navbarItem: Should render navbarItem custom slot.', async () => {
      const wrapper = mount(MobileMenu, {
        props: {
          menu: defaultMock.menus,
        },
        slots: {
          navbarItem: await MobileMenuSelectorTestData.getMobileMenuSlotNavbarItemCustom(),
        },
      });

      const navbarItems = wrapper.findAll(defaultMock.getSelectorWithDot(defaultMock.navbarItemEl));

      expect(navbarItems.length).toBe(defaultMock.menus.length);
      expect(navbarItems[0].exists()).toBe(true);
      expect(navbarItems[0].element.innerHTML).toBe(
        await MobileMenuSelectorTestData.getMobileMenuSlotNavbarItemCustom(),
      );
    });

    it('allContent: Should render allContent default slot.', async () => {
      const wrapper = mount(MobileMenu, {
        props: {
          menu: defaultMock.menus,
        },
      });

      const navbarItemElement = wrapper.findAll(defaultMock.navbarItemEl);
      await navbarItemElement[0].trigger('click');

      const pageElement = wrapper.find(defaultMock.getSelectorWithDot(defaultMock.pageEl));

      expect(pageElement.exists()).toBe(true);
      expect(pageElement.element.innerHTML).toBe(
        await MobileMenuSelectorTestData.getMobileMenuSlotAllContentDefault(),
      );
    });

    it('allContent: Should render allContent default slot.', async () => {
      const wrapper = mount(MobileMenu, {
        props: {
          menu: defaultMock.menus,
        },
        slots: {
          allContent: await MobileMenuSelectorTestData.getMobileMenuSlotAllContentCustom(),
        },
      });

      const navbarItemElement = wrapper.findAll(defaultMock.navbarItemEl);
      await navbarItemElement[0].trigger('click');

      const pageElement = wrapper.find(defaultMock.getSelectorWithDot(defaultMock.pageEl));

      expect(pageElement.exists()).toBe(true);
      expect(pageElement.element.innerHTML).toBe(
        await MobileMenuSelectorTestData.getMobileMenuSlotAllContentCustom(),
      );
    });
  });

  describe('Emits', () => {
    it('Should emit "open" event when menu is opened.', async () => {
      const wrapper = mount(MobileMenu, {
        props: {
          menu: defaultMock.menus,
        },
      });

      const navbarItemElement = wrapper.findAll(defaultMock.navbarItemEl);
      await navbarItemElement[0].trigger('click');

      expect(wrapper.emitted('open')).toBeTruthy();
    });

    it('Should emit "close" event when menu is closed.', async () => {
      const wrapper = mount(MobileMenu, {
        props: {
          menu: defaultMock.menus,
        },
      });

      const navbarItemElement = wrapper.findAll(defaultMock.navbarItemEl);
      await navbarItemElement[0].trigger('click');
      await navbarItemElement[0].trigger('click');

      expect(wrapper.emitted('close')).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('Should have aria-label attribute if provided.', () => {
      const wrapper = mount(MobileMenu, {
        props: {
          menu: defaultMock.menus,
          ariaLabel: defaultMock.ariaLabelProp,
        },
      });

      expect(wrapper.find(defaultMock.rootEl).attributes('aria-label')).toBe(
        defaultMock.ariaLabelProp,
      );
    });
  });
});
