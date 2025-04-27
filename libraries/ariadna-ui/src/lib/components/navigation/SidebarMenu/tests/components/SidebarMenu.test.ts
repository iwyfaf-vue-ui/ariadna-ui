import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import SidebarMenu from '../../SidebarMenu.vue';
import { SidebarMenuSelectorTestData } from '../../tests/test-data/SidebarMenu.selector.test-data';

const defaultMock = new SidebarMenuSelectorTestData();

describe('SidebarMenu.vue: Basic render.', () => {
  const wrapper = mount(SidebarMenu, {
    props: {
      data: [defaultMock.item],
    },
    global: {
      stubs: {
        RouterLink: true, // Shutdown [Vue warn]: Failed to resolve component: RouterLink
      },
    },
  });

  it('Should render component without errors.', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Should apply default root CSS class.', () => {
    expect(wrapper.classes()).toContain(defaultMock.getSelectorWithoutDot(defaultMock.rootEl));
  });
});

describe('SidebarMenu.vue: Props.', () => {
  it('data: Should render items from data prop if data exists.', () => {
    const wrapper = mount(SidebarMenu, {
      props: {
        data: [defaultMock.item],
      },
      global: {
        stubs: {
          RouterLink: true, // Shutdown [Vue warn]: Failed to resolve component: RouterLink
        },
      },
    });

    expect(wrapper.find(defaultMock.itemsEl).exists()).toBe(true);
  });

  it('collapsed: Should apply collapsed prop.', () => {
    const wrapper = mount(SidebarMenu, {
      props: {
        data: [defaultMock.item],
        collapsed: true,
      },
      global: {
        stubs: {
          RouterLink: true, // Shutdown [Vue warn]: Failed to resolve component: RouterLink
        },
      },
    });

    expect(wrapper.props('collapsed')).toBe(true);
    expect(
      wrapper.find(defaultMock.getSelectorWithDot(defaultMock.collapsedModifier)).exists(),
    ).toBe(true);
  });

  it('rememberExpanded: Should apply rememberExpanded prop.', () => {
    const wrapper = mount(SidebarMenu, {
      props: {
        data: [defaultMock.item],
        rememberExpanded: true,
      },
      global: {
        stubs: {
          RouterLink: true, // Shutdown [Vue warn]: Failed to resolve component: RouterLink
        },
      },
    });

    expect(wrapper.props('rememberExpanded')).toBe(true);
  });

  it('cssClass: Should apply custom root class and generate BEM child classes.', async () => {
    const _defaultMock = new SidebarMenuSelectorTestData(defaultMock.cssClassProp);
    const wrapper = mount(SidebarMenu, {
      props: {
        data: [defaultMock.item],
        cssClass: defaultMock.cssClassProp,
      },
      slots: {
        header: await SidebarMenuSelectorTestData.getSidebarMenuSlotHeaderCustom(),
        footer: await SidebarMenuSelectorTestData.getSidebarMenuSlotFooterCustom(),
        dropdownIcon: await SidebarMenuSelectorTestData.getSidebarMenuSlotDropdownIconCustom(),
        actionIcon: await SidebarMenuSelectorTestData.getSidebarMenuSlotActionIconCustom(),
      },
      global: {
        stubs: {
          RouterLink: true, // Shutdown [Vue warn]: Failed to resolve component: RouterLink
        },
      },
    });

    expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.rootEl)).exists()).toBe(true);
    expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.wrapperEl)).exists()).toBe(
      true,
    );
    expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.headerEl)).exists()).toBe(true);
    expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.itemsEl)).exists()).toBe(true);
    expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.itemWrapperEl)).exists()).toBe(
      true,
    );
    expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.itemDropdownEl)).exists()).toBe(
      true,
    );
    expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.footerEl)).exists()).toBe(true);
  });
});

describe('SidebarMenu.vue: Slots.', () => {
  it('header: Should render header slot with custom content.', async () => {
    const wrapper = mount(SidebarMenu, {
      props: {
        data: [defaultMock.item],
      },
      slots: {
        header: await SidebarMenuSelectorTestData.getSidebarMenuSlotHeaderCustom(),
      },
      global: {
        stubs: {
          RouterLink: true, // Shutdown [Vue warn]: Failed to resolve component: RouterLink
        },
      },
    });

    expect(wrapper.find(defaultMock.headerEl).element.innerHTML).toBe(
      await SidebarMenuSelectorTestData.getSidebarMenuSlotHeaderCustom(),
    );
  });

  it('footer: Should render footer slot with custom content.', async () => {
    const wrapper = mount(SidebarMenu, {
      props: {
        data: [defaultMock.item],
      },
      slots: {
        footer: await SidebarMenuSelectorTestData.getSidebarMenuSlotFooterCustom(),
      },
      global: {
        stubs: {
          RouterLink: true, // Shutdown [Vue warn]: Failed to resolve component: RouterLink
        },
      },
    });

    expect(wrapper.find(defaultMock.footerEl).element.innerHTML).toBe(
      await SidebarMenuSelectorTestData.getSidebarMenuSlotFooterCustom(),
    );
  });

  it('dropdownIcon: Should render dropdownIcon slot with custom content.', async () => {
    const wrapper = mount(SidebarMenu, {
      props: {
        data: [defaultMock.item],
      },
      slots: {
        dropdownIcon: await SidebarMenuSelectorTestData.getSidebarMenuSlotDropdownIconCustom(),
      },
      global: {
        stubs: {
          RouterLink: true, // Shutdown [Vue warn]: Failed to resolve component: RouterLink
        },
      },
    });

    expect(wrapper.find(defaultMock.itemDropdownEl).element.innerHTML).toBe(
      await SidebarMenuSelectorTestData.getSidebarMenuSlotDropdownIconCustom(),
    );
  });
});

describe('SidebarMenu.vue: Emits.', () => {
  it('update:collapsed: Should emit update:collapsed when collapsed changes.', async () => {
    const wrapper = mount(SidebarMenu, {
      props: {
        data: [defaultMock.item],
        collapsed: false,
      },
      global: {
        stubs: {
          RouterLink: true, // Shutdown [Vue warn]: Failed to resolve component: RouterLink
        },
      },
    });

    await wrapper.setProps({ collapsed: true });
    expect(wrapper.emitted('update:collapsed')).toBeTruthy();
    expect(wrapper.emitted('update:collapsed')?.[0]).toEqual([true]);
  });
});

describe('SidebarMenu.vue: Accessibility.', () => {
  it('Should have no aria attributes on root.', () => {
    const wrapper = mount(SidebarMenu, {
      props: {
        data: [defaultMock.item],
      },
      global: {
        stubs: {
          RouterLink: true, // Shutdown [Vue warn]: Failed to resolve component: RouterLink
        },
      },
    });

    const attrs = wrapper.attributes();
    const ariaAttrs = Object.keys(attrs).filter((k) => k.startsWith('aria-'));

    expect(ariaAttrs.length).toBe(0);
  });
});
