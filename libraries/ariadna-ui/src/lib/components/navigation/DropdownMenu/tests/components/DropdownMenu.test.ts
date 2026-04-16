import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, h, inject, nextTick } from 'vue';
import DropdownMenu from '../../DropdownMenu.vue';
import type { TDropdownMenuProps, TDropdownMenuItem } from '../../DropdownMenu';
import { DropdownMenuSelectorTestData } from '../test-data/DropdownMenu.selector.test-data';
import {
  DropdownMenuProviderKey,
  type TDropdownMenuProvider,
} from '../../providers/DropdownMenu.provider';

const defaultMock = new DropdownMenuSelectorTestData();

// Stub that captures props and provider for detailed prop assertions
const DropdownMenuListStub = defineComponent({
  name: 'DropdownMenuList',
  props: ['data', 'level'],
  setup() {
    const provider = inject(DropdownMenuProviderKey);
    return { provider };
  },
  render() {
    return h('ul');
  },
});

const globalStubs = { DropdownMenuList: true };

const defaultProps: TDropdownMenuProps = { data: [] };

function mountMenu(props: Partial<TDropdownMenuProps> = {}, slots: Record<string, any> = {}) {
  return mount(DropdownMenu, {
    props: { ...defaultProps, ...props },
    slots: {
      activator: () => h('button', { class: 'activator-btn' }, 'Toggle'),
      ...slots,
    },
    global: { stubs: globalStubs },
  });
}

function mountMenuWithStub(props: Partial<TDropdownMenuProps> = {}) {
  return mount(DropdownMenu, {
    props: { ...defaultProps, ...props },
    slots: { activator: () => h('button', 'Toggle') },
    global: { stubs: { DropdownMenuList: DropdownMenuListStub } },
  });
}

function mountMenuFull(props: Partial<TDropdownMenuProps> = {}, slots: Record<string, any> = {}) {
  return mount(DropdownMenu, {
    props: { ...defaultProps, ...props },
    slots: {
      activator: () => h('button', 'Toggle'),
      ...slots,
    },
    global: {
      stubs: { RouterLink: true },
      config: {
        globalProperties: { $route: { path: '/' } },
      },
    },
  });
}

describe('DropdownMenu.vue', () => {
  describe('Basic render', () => {
    it('Should mount without errors.', () => {
      const wrapper = mountMenu();

      expect(wrapper.exists()).toBe(true);
    });

    it('Should render a root <div> element.', () => {
      const wrapper = mountMenu();

      expect(wrapper.element.tagName).toEqual('DIV');
    });

    it('Should render the activator wrapper <div>.', () => {
      const wrapper = mountMenu();

      expect(wrapper.find(defaultMock.activatorEl).exists()).toBe(true);
    });

    it('Should apply base CSS class to the root element.', () => {
      const wrapper = mountMenu();

      expect(wrapper.classes()).toContain(defaultMock.getSelectorWithoutDot(defaultMock.rootEl));
    });

    it('Should not render DropdownMenuList when menu is closed.', () => {
      const wrapper = mountMenu();

      expect(wrapper.find('dropdown-menu-list-stub').exists()).toBe(false);
    });

    it('Should render DropdownMenuList when menu is open.', async () => {
      const wrapper = mountMenu();

      await wrapper.vm.open();

      expect(wrapper.find('dropdown-menu-list-stub').exists()).toBe(true);
    });
  });

  describe('Props', () => {
    it('data: Should pass the data array to DropdownMenuList when open.', async () => {
      const data = [{ label: 'Item 1' }, { label: 'Item 2' }];
      const wrapper = mountMenuWithStub({ data });

      await wrapper.vm.open();

      expect(wrapper.findComponent(DropdownMenuListStub).props('data')).toStrictEqual(data);
    });

    it('data: Should pass an empty data array to DropdownMenuList when open.', async () => {
      const wrapper = mountMenuWithStub({ data: [] });

      await wrapper.vm.open();

      expect(wrapper.findComponent(DropdownMenuListStub).props('data')).toStrictEqual([]);
    });

    it('data: Should render DropdownMenuList regardless of data length when open.', async () => {
      const wrapper = mountMenuWithStub({ data: [{ label: 'Only item' }] });

      await wrapper.vm.open();

      expect(wrapper.findComponent(DropdownMenuListStub).exists()).toBe(true);
    });

    it('expandMode: Should provide expandMode "click" to children by default.', async () => {
      const wrapper = mountMenuWithStub();

      await wrapper.vm.open();

      const provider = wrapper.findComponent(DropdownMenuListStub).vm
        .provider as TDropdownMenuProvider;
      expect(provider.expandMode).toBe('click');
    });

    it('expandMode: Should provide expandMode "hover" to children when set.', async () => {
      const wrapper = mountMenuWithStub({ expandMode: 'hover' });

      await wrapper.vm.open();

      const provider = wrapper.findComponent(DropdownMenuListStub).vm
        .provider as TDropdownMenuProvider;
      expect(provider.expandMode).toBe('hover');
    });

    it('expandMode: Should provide expandMode "click" when explicitly set to "click".', async () => {
      const wrapper = mountMenuWithStub({ expandMode: 'click' });

      await wrapper.vm.open();

      const provider = wrapper.findComponent(DropdownMenuListStub).vm
        .provider as TDropdownMenuProvider;
      expect(provider.expandMode).toBe('click');
    });

    it('closeOnClickOutside: Should close menu when clicking outside and closeOnClickOutside is true.', async () => {
      const wrapper = mountMenu({ closeOnClickOutside: true });

      wrapper.vm.open();
      await nextTick();
      document.dispatchEvent(new Event('click', { bubbles: true }));
      await nextTick();

      expect(wrapper.find('dropdown-menu-list-stub').exists()).toBe(false);
      expect(wrapper.emitted('hide')).toHaveLength(1);
      wrapper.unmount();
    });

    it('closeOnClickOutside: Should not close menu when clicking outside and closeOnClickOutside is false.', async () => {
      const wrapper = mountMenu({ closeOnClickOutside: false });

      wrapper.vm.open();
      await nextTick();
      document.dispatchEvent(new Event('click', { bubbles: true }));
      await nextTick();

      expect(wrapper.find('dropdown-menu-list-stub').exists()).toBe(true);
      expect(wrapper.emitted('hide')).toBeUndefined();
      wrapper.unmount();
    });

    it('closeOnClickOutside: Should not emit "hide" when clicking outside but menu is already closed.', async () => {
      const wrapper = mountMenu({ closeOnClickOutside: true });

      document.dispatchEvent(new Event('click', { bubbles: true }));
      await nextTick();

      expect(wrapper.emitted('hide')).toBeUndefined();
      wrapper.unmount();
    });

    it('closeOnEscape: Should close menu on Escape key when true.', async () => {
      const wrapper = mountMenu({ closeOnEscape: true });

      wrapper.vm.open();
      await wrapper.trigger('keydown', { key: 'Escape' });

      expect(wrapper.find('dropdown-menu-list-stub').exists()).toBe(false);
      expect(wrapper.emitted('hide')).toHaveLength(1);
    });

    it('closeOnEscape: Should not close menu on Escape key when false.', async () => {
      const wrapper = mountMenu({ closeOnEscape: false });

      wrapper.vm.open();
      await wrapper.trigger('keydown', { key: 'Escape' });

      expect(wrapper.find('dropdown-menu-list-stub').exists()).toBe(true);
      expect(wrapper.emitted('hide')).toBeUndefined();
    });

    it('closeOnEscape: Should not close menu on non-Escape key even when true.', async () => {
      const wrapper = mountMenu({ closeOnEscape: true });

      wrapper.vm.open();
      await wrapper.trigger('keydown', { key: 'Tab' });

      expect(wrapper.find('dropdown-menu-list-stub').exists()).toBe(true);
    });

    it('disabled: Should apply disabled modifier class when true.', () => {
      const wrapper = mountMenu({ disabled: true });

      expect(wrapper.classes()).toContain(defaultMock.disabledModifier);
    });

    it('disabled: Should not apply disabled modifier class when false.', () => {
      const wrapper = mountMenu({ disabled: false });

      expect(wrapper.classes()).not.toContain(defaultMock.disabledModifier);
    });

    it('disabled: Should not open menu when disabled is true.', async () => {
      const wrapper = mountMenu({ disabled: true });

      wrapper.vm.open();

      expect(wrapper.find('dropdown-menu-list-stub').exists()).toBe(false);
    });

    it('disabled: Should not apply open modifier class when disabled.', async () => {
      const wrapper = mountMenu({ disabled: true });

      wrapper.vm.open();

      expect(wrapper.classes()).not.toContain(defaultMock.openModifier);
    });

    it('cssClass: Should apply custom root class and generate BEM child classes.', async () => {
      const customMock = new DropdownMenuSelectorTestData(defaultMock.cssClassProp);
      const wrapper = mountMenu({ cssClass: defaultMock.cssClassProp });

      await wrapper.vm.open();

      expect(wrapper.find(defaultMock.getSelectorWithDot(customMock.rootEl)).exists()).toBe(true);
      expect(wrapper.classes()).toContain(customMock.themeModifier);
      expect(wrapper.classes()).toContain(customMock.openModifier);
      expect(wrapper.find(customMock.activatorEl).exists()).toBe(true);
    });
  });

  describe('Slots', () => {
    it('activator: Should render slot content inside the activator wrapper.', () => {
      const wrapper = mountMenu();

      expect(wrapper.find(defaultMock.activatorEl).find('.activator-btn').exists()).toBe(true);
    });

    it('activator: Should expose opened as false initially.', () => {
      let capturedOpened: boolean | undefined;

      mountMenu(
        {},
        {
          activator: ({ opened }: { opened: boolean }) => {
            capturedOpened = opened;
            return h('button', 'Toggle');
          },
        },
      );

      expect(capturedOpened).toBe(false);
    });

    it('activator: Should expose opened as true when menu is open.', async () => {
      let capturedOpened: boolean | undefined;

      const wrapper = mountMenu(
        {},
        {
          activator: ({ opened }: { opened: boolean }) => {
            capturedOpened = opened;
            return h('button', 'Toggle');
          },
        },
      );

      await wrapper.vm.open();

      expect(capturedOpened).toBe(true);
    });

    it('activator: Should expose open function that opens the menu.', async () => {
      let capturedOpen: (() => void) | undefined;

      const wrapper = mountMenu(
        {},
        {
          activator: ({ open }: { open: () => void }) => {
            capturedOpen = open;
            return h('button', 'Toggle');
          },
        },
      );

      capturedOpen!();
      await nextTick();

      expect(wrapper.find('dropdown-menu-list-stub').exists()).toBe(true);
    });

    it('activator: Should expose close function that closes the menu.', async () => {
      let capturedClose: (() => void) | undefined;

      const wrapper = mountMenu(
        {},
        {
          activator: ({ close }: { close: () => void }) => {
            capturedClose = close;
            return h('button', 'Toggle');
          },
        },
      );

      await wrapper.vm.open();
      capturedClose!();
      await nextTick();

      expect(wrapper.find('dropdown-menu-list-stub').exists()).toBe(false);
    });

    it('activator: Should expose toggle function that toggles the menu.', async () => {
      let capturedToggle: (() => void) | undefined;

      const wrapper = mountMenu(
        {},
        {
          activator: ({ toggle }: { toggle: () => void }) => {
            capturedToggle = toggle;
            return h('button', 'Toggle');
          },
        },
      );

      capturedToggle!();
      await nextTick();
      expect(wrapper.find('dropdown-menu-list-stub').exists()).toBe(true);

      capturedToggle!();
      await nextTick();
      expect(wrapper.find('dropdown-menu-list-stub').exists()).toBe(false);
    });

    it('item: Should render custom item slot content instead of default template.', async () => {
      const wrapper = mountMenuFull(
        { data: [{ label: 'Dashboard' }] },
        {
          item: ({ item }: { item: TDropdownMenuItem }) =>
            h('div', { class: 'custom-item' }, item.label),
        },
      );

      await wrapper.vm.open();

      expect(wrapper.find('.custom-item').exists()).toBe(true);
      expect(wrapper.find('.custom-item').text()).toBe('Dashboard');
      expect(wrapper.find(defaultMock.labelEl).exists()).toBe(false);
    });

    it('item: Should render default template when item slot is not provided.', async () => {
      const wrapper = mountMenuFull({ data: [{ label: 'Dashboard' }] });

      await wrapper.vm.open();

      expect(wrapper.find(defaultMock.labelEl).exists()).toBe(true);
      expect(wrapper.find(defaultMock.labelEl).text()).toBe('Dashboard');
    });

    it('item: Should expose item data to the item slot.', async () => {
      let capturedItem: TDropdownMenuItem | undefined;

      const wrapper = mountMenuFull(
        { data: [{ label: 'Dashboard', icon: 'mdi-home' }] },
        {
          item: ({ item }: { item: TDropdownMenuItem }) => {
            capturedItem = item;
            return h('div', item.label);
          },
        },
      );

      await wrapper.vm.open();

      expect(capturedItem?.label).toBe('Dashboard');
      expect(capturedItem?.icon).toBe('mdi-home');
    });

    it('item: Should expose level 1 to the item slot for root items.', async () => {
      let capturedLevel: number | undefined;

      const wrapper = mountMenuFull(
        { data: [{ label: 'Dashboard' }] },
        {
          item: ({ level }: { item: TDropdownMenuItem; level: number }) => {
            capturedLevel = level;
            return h('div', 'Item');
          },
        },
      );

      await wrapper.vm.open();

      expect(capturedLevel).toBe(1);
    });

    it('item: Should expose close function that closes the menu from item slot.', async () => {
      let capturedClose: (() => void) | undefined;

      const wrapper = mountMenuFull(
        { data: [{ label: 'Dashboard' }] },
        {
          item: ({ close }: { item: TDropdownMenuItem; level: number; close: () => void }) => {
            capturedClose = close;
            return h('div', 'Item');
          },
        },
      );

      await wrapper.vm.open();
      capturedClose!();
      await nextTick();

      expect(wrapper.find(defaultMock.listEl).exists()).toBe(false);
      expect(wrapper.emitted('hide')).toHaveLength(1);
    });
  });

  describe('Emits', () => {
    it('Should emit "show" when menu opens.', async () => {
      const wrapper = mountMenu();

      wrapper.vm.open();

      expect(wrapper.emitted('show')).toHaveLength(1);
    });

    it('Should emit "hide" when menu closes.', async () => {
      const wrapper = mountMenu();

      wrapper.vm.open();
      wrapper.vm.close();

      expect(wrapper.emitted('hide')).toHaveLength(1);
    });

    it('Should not emit "show" when disabled is true.', async () => {
      const wrapper = mountMenu({ disabled: true });

      wrapper.vm.open();

      expect(wrapper.emitted('show')).toBeUndefined();
    });

    it('Should not emit "show" more than once when open is called repeatedly.', async () => {
      const wrapper = mountMenu();

      wrapper.vm.open();
      wrapper.vm.open();

      expect(wrapper.emitted('show')).toHaveLength(1);
    });

    it('Should not emit "hide" when already closed.', () => {
      const wrapper = mountMenu();

      wrapper.vm.close();

      expect(wrapper.emitted('hide')).toBeUndefined();
    });
  });

  describe('Accessibility', () => {
    it('Should apply open modifier class when menu is open.', async () => {
      const wrapper = mountMenu();

      await wrapper.vm.open();

      expect(wrapper.classes()).toContain(defaultMock.openModifier);
    });

    it('Should remove open modifier class when menu is closed.', async () => {
      const wrapper = mountMenu();

      wrapper.vm.open();
      wrapper.vm.close();
      await nextTick();

      expect(wrapper.classes()).not.toContain(defaultMock.openModifier);
    });
  });

  describe('Edge cases', () => {
    it('Should close menu on Escape keydown when closeOnEscape is true.', async () => {
      const wrapper = mountMenu({ closeOnEscape: true });

      wrapper.vm.open();
      await wrapper.trigger('keydown', { key: 'Escape' });

      expect(wrapper.find('dropdown-menu-list-stub').exists()).toBe(false);
      expect(wrapper.emitted('hide')).toHaveLength(1);
    });

    it('Should not close menu on Escape keydown when closeOnEscape is false.', async () => {
      const wrapper = mountMenu({ closeOnEscape: false });

      wrapper.vm.open();
      await wrapper.trigger('keydown', { key: 'Escape' });

      expect(wrapper.find('dropdown-menu-list-stub').exists()).toBe(true);
    });

    it('Should not close menu on non-Escape keydown.', async () => {
      const wrapper = mountMenu({ closeOnEscape: true });

      wrapper.vm.open();
      await wrapper.trigger('keydown', { key: 'Enter' });

      expect(wrapper.find('dropdown-menu-list-stub').exists()).toBe(true);
    });

    it('Exposed open(): Should open the menu programmatically.', async () => {
      const wrapper = mountMenu();

      await wrapper.vm.open();

      expect(wrapper.find('dropdown-menu-list-stub').exists()).toBe(true);
      expect(wrapper.classes()).toContain(defaultMock.openModifier);
    });

    it('Exposed close(): Should close the menu programmatically.', async () => {
      const wrapper = mountMenu();

      wrapper.vm.open();
      wrapper.vm.close();
      await nextTick();

      expect(wrapper.find('dropdown-menu-list-stub').exists()).toBe(false);
      expect(wrapper.classes()).not.toContain(defaultMock.openModifier);
    });

    it('Exposed toggle(): Should open then close the menu on consecutive calls.', async () => {
      const wrapper = mountMenu();

      wrapper.vm.toggle();
      await nextTick();
      expect(wrapper.find('dropdown-menu-list-stub').exists()).toBe(true);

      wrapper.vm.toggle();
      await nextTick();
      expect(wrapper.find('dropdown-menu-list-stub').exists()).toBe(false);
    });

    it('Should apply both open and theme modifiers when open.', async () => {
      const wrapper = mountMenu();

      await wrapper.vm.open();

      expect(wrapper.classes()).toContain(defaultMock.openModifier);
      expect(wrapper.classes()).toContain(defaultMock.themeModifier);
    });

    it('Should always apply theme modifier regardless of open state.', () => {
      const wrapper = mountMenu();

      expect(wrapper.classes()).toContain(defaultMock.themeModifier);
    });
  });
});
