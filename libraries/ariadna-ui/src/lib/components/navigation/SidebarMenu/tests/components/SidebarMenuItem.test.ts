import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { ref, defineComponent, h } from 'vue';
import SidebarMenuItem from '../../components/SidebarMenuItem/SidebarMenuItem.vue';
import { ESidebarMenuPropsDefault } from '../../types/SidebarMenu.enums';
import { SidebarMenuSelectorTestData } from '../../tests/test-data/SidebarMenu.selector.test-data';

const defaultMock = new SidebarMenuSelectorTestData();

vi.mock('@/shared/validators/vue/inject-strict.vue.validator', () => ({
  default: () => ({
    cssClass: ESidebarMenuPropsDefault.CSS_CLASS,
    collapsed: ref(false),
  }),
}));

describe('SidebarMenuItem.vue: Basic render.', () => {
  const wrapper = mount(SidebarMenuItem, {
    props: {
      item: defaultMock.item,
      level: 1,
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

  it('Should apply correct classes for default item.', () => {
    expect(wrapper.classes()).toContain(defaultMock.getSelectorWithoutDot(defaultMock.itemEl));
    expect(wrapper.classes()).toContain(
      defaultMock.getSelectorWithoutDot(defaultMock.itemLevelModifier) + '1',
    );
  });

  it('Should apply correct classes for nested item.', () => {
    const wrapper = mount(SidebarMenuItem, {
      props: {
        item: defaultMock.item,
        level: 2,
      },
      global: {
        stubs: {
          RouterLink: true, // Shutdown [Vue warn]: Failed to resolve component: RouterLink
        },
      },
    });

    expect(wrapper.classes()).toContain(
      defaultMock.getSelectorWithoutDot(defaultMock.itemLevelModifier) + '2',
    );
  });
});

describe('SidebarMenuItem.vue: Props.', () => {
  it('item: Should not render if isHidden is true.', () => {
    const wrapper = mount(SidebarMenuItem, {
      props: {
        item: {
          ...defaultMock.item,
          hidden: true,
        },
        level: 1,
      },
      global: {
        stubs: {
          RouterLink: true, // Shutdown [Vue warn]: Failed to resolve component: RouterLink
        },
      },
    });

    expect(wrapper.html()).toBe('<!--v-if-->');
  });

  it('item: Should render icon if item.icon is provided.', () => {
    const wrapper = mount(SidebarMenuItem, {
      props: {
        item: {
          ...defaultMock.item,
          icon: 'mdi-home',
        },
        level: 1,
      },
      global: {
        stubs: {
          RouterLink: true, // Shutdown [Vue warn]: Failed to resolve component: RouterLink
        },
      },
    });

    expect(wrapper.find(defaultMock.iconEl).exists()).toBe(true);
  });

  it('item: Should render badge if item.badge is provided.', () => {
    const wrapper = mount(SidebarMenuItem, {
      props: {
        item: {
          ...defaultMock.item,
          badge: '5',
        },
        level: 1,
      },
      global: {
        stubs: {
          RouterLink: true, // Shutdown [Vue warn]: Failed to resolve component: RouterLink
        },
      },
    });

    expect(wrapper.find(defaultMock.badgeEl).exists()).toBe(true);
  });

  it('item: Should render children if item.children is provided and item is active.', () => {
    const wrapper = mount(SidebarMenuItem, {
      props: {
        item: {
          ...defaultMock.item,
          children: [{ title: 'Child', href: '/child' }],
          expand: true,
        },
        level: 1,
      },
      global: {
        stubs: {
          RouterLink: true, // Shutdown [Vue warn]: Failed to resolve component: RouterLink
        },
      },
    });

    expect(wrapper.find(defaultMock.itemsSubEl).exists()).toBe(true);
  });

  it('level: Should apply level 1 class by default.', () => {
    const wrapper = mount(SidebarMenuItem, {
      props: {
        item: defaultMock.item,
      },
      global: {
        stubs: {
          RouterLink: true, // Shutdown [Vue warn]: Failed to resolve component: RouterLink
        },
      },
    });

    expect(wrapper.classes()).toContain(
      defaultMock.getSelectorWithoutDot(defaultMock.itemLevelModifier) + '1',
    );
  });

  it('level: Should apply correct class for custom level prop.', () => {
    const wrapper = mount(SidebarMenuItem, {
      props: {
        item: defaultMock.item,
        level: 3,
      },
      global: {
        stubs: {
          RouterLink: true, // Shutdown [Vue warn]: Failed to resolve component: RouterLink
        },
      },
    });

    expect(wrapper.classes()).toContain(
      defaultMock.getSelectorWithoutDot(defaultMock.itemLevelModifier) + '3',
    );
  });

  it('active: Should add open class if active is true.', () => {
    const wrapper = mount(SidebarMenuItem, {
      props: {
        item: defaultMock.item,
        active: true,
      },
      global: {
        stubs: {
          RouterLink: true, // Shutdown [Vue warn]: Failed to resolve component: RouterLink
        },
      },
    });

    expect(wrapper.classes()).toContain(
      defaultMock.getSelectorWithoutDot(defaultMock.itemOpenModifier),
    );
  });

  it('active: Should not add open class if active is false.', () => {
    const wrapper = mount(SidebarMenuItem, {
      props: {
        item: defaultMock.item,
        active: false,
      },
      global: {
        stubs: {
          RouterLink: true, // Shutdown [Vue warn]: Failed to resolve component: RouterLink
        },
      },
    });

    expect(wrapper.classes()).not.toContain(
      defaultMock.getSelectorWithoutDot(defaultMock.itemOpenModifier),
    );
  });
});

describe('SidebarMenuItem.vue: Slots.', () => {
  it('dropdownIcon: Should render custom dropdownIcon slot.', async () => {
    const wrapper = mount(SidebarMenuItem, {
      props: {
        item: {
          ...defaultMock.item,
          children: [{ title: 'Child', href: '/child' }],
        },
        level: 1,
      },
      slots: {
        dropdownIcon: await SidebarMenuSelectorTestData.getSidebarMenuItemSlotDropdownIconCustom(),
      },
      global: {
        stubs: {
          RouterLink: true, // Shutdown [Vue warn]: Failed to resolve component: RouterLink
        },
      },
    });

    expect(wrapper.find(defaultMock.itemDropdownEl).exists()).toBe(true);
    expect(wrapper.find(defaultMock.itemDropdownEl).element.innerHTML).toBe(
      await SidebarMenuSelectorTestData.getSidebarMenuItemSlotDropdownIconCustom(),
    );
  });

  it('actionIcon: Should render actionIcon slot when provided as string.', async () => {
    const wrapper = mount(SidebarMenuItem, {
      props: {
        item: {
          title: 'Test',
          action: () => {},
          actionIcon: await SidebarMenuSelectorTestData.getSidebarMenuItemSlotActionIconCustom(),
        },
        level: 1,
      },
      slots: {
        actionIcon: await SidebarMenuSelectorTestData.getSidebarMenuItemSlotActionIconCustom(),
      },
      global: {
        stubs: {
          RouterLink: true, // Shutdown [Vue warn]: Failed to resolve component: RouterLink
        },
      },
    });

    expect(wrapper.find(defaultMock.actionEl).exists()).toBe(true);
    expect(wrapper.find(defaultMock.actionEl).element.innerHTML).toBe(
      await SidebarMenuSelectorTestData.getSidebarMenuItemSlotActionIconCustom(),
    );
  });

  it('actionIcon: Should render actionIcon slot when provided as component.', async () => {
    const DummyActionIcon = defineComponent({
      name: 'DummyActionIcon',
      render() {
        return h('span', 'component');
      },
    });

    const wrapper = mount(SidebarMenuItem, {
      props: {
        item: {
          title: 'Test',
          action: () => {},
          actionIcon: await SidebarMenuSelectorTestData.getSidebarMenuItemSlotActionIconCustom(),
        },
        level: 1,
      },
      slots: {
        actionIcon: h(DummyActionIcon),
      },
      global: {
        stubs: {
          RouterLink: true, // Shutdown [Vue warn]: Failed to resolve component: RouterLink
        },
      },
    });

    expect(wrapper.find(defaultMock.actionEl).exists()).toBe(true);
    expect(wrapper.find(defaultMock.actionEl).element.innerHTML).toBe(
      await SidebarMenuSelectorTestData.getSidebarMenuItemSlotActionIconCustom(),
    );
  });
});

describe('SidebarMenuItem.vue: Accessibility.', () => {
  it('Should set correct aria attributes for dropdown.', () => {
    const wrapper = mount(SidebarMenuItem, {
      props: {
        item: {
          ...defaultMock.item,
          children: [{ title: 'Child', href: '/child' }],
        },
        level: 1,
      },
      global: {
        stubs: {
          RouterLink: true, // Shutdown [Vue warn]: Failed to resolve component: RouterLink
        },
      },
    });

    const dropdown = wrapper.find(defaultMock.itemDropdownEl);

    expect(dropdown.exists()).toBe(true);
    expect(dropdown.attributes('aria-expanded')).toBeDefined();
  });
});
