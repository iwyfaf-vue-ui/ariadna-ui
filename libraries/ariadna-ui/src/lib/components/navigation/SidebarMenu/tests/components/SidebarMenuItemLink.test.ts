import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import SidebarMenuItemLink from '../../components/SidebarMenuItemLink/SidebarMenuItemLink.vue';
import { ESidebarMenuPropsDefault } from '../../types/SidebarMenu.enums';
import { SidebarMenuSelectorTestData } from '../../tests/test-data/SidebarMenu.selector.test-data';

const defaultMock = new SidebarMenuSelectorTestData();

vi.mock('@/shared/validators/vue/inject-strict.vue.validator', () => ({
  default: () => ({ cssClass: ESidebarMenuPropsDefault.CSS_CLASS }),
}));

describe('SidebarMenuItemIcon.vue: Basic render.', () => {
  const wrapper = mount(SidebarMenuItemLink, {
    props: {
      item: defaultMock.item,
    },
    global: {
      stubs: {
        RouterLink: true, // Shutdown [Vue warn]: Failed to resolve component: RouterLink
      },
    },
  });

  it('Should mount without errors.', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Should render external link when renderType is "external".', () => {
    const wrapper = mount(SidebarMenuItemLink, {
      props: {
        item: defaultMock.item,
      },
      global: {
        stubs: {
          RouterLink: true, // Shutdown [Vue warn]: Failed to resolve component: RouterLink
        },
      },
    });

    expect(wrapper.element.tagName).toBe('A');
    expect(wrapper.attributes('href')).toBe(defaultMock.item.href);
    expect(wrapper.attributes('target')).toBe('_blank');
  });

  it('Should render native link when renderType is "native".', () => {
    const wrapper = mount(SidebarMenuItemLink, {
      props: {
        item: {
          ...defaultMock.item,
          native: true,
        },
      },
      global: {
        stubs: {
          RouterLink: true, // Shutdown [Vue warn]: Failed to resolve component: RouterLink
        },
      },
    });

    expect(wrapper.element.tagName).toBe('A');
    expect(wrapper.attributes('href')).toBe(defaultMock.item.href);
    expect(wrapper.attributes('target')).toBeUndefined();
  });

  it('Should render internal link when renderType is "internal".', () => {
    const href = '/internal';
    const wrapper = mount(SidebarMenuItemLink, {
      props: {
        item: {
          ...defaultMock.item,
          href: href,
        },
      },
      global: {
        stubs: {
          RouterLink: true, // Shutdown [Vue warn]: Failed to resolve component: RouterLink
        },
      },
    });

    expect(wrapper.element.tagName).toBe('A');
    expect(wrapper.attributes('href')).toBe(href);
  });

  it('Should render div when renderType is "text".', () => {
    const href = undefined;
    const wrapper = mount(SidebarMenuItemLink, {
      props: {
        item: {
          ...defaultMock.item,
          href: href,
        },
      },
      global: {
        stubs: {
          RouterLink: true, // Shutdown [Vue warn]: Failed to resolve component: RouterLink
        },
      },
    });

    expect(wrapper.element.tagName).toBe('DIV');
  });
});

describe('SidebarMenuItemLink.vue: Props.', () => {
  it('item: Should apply correct classes from composable.', () => {
    const wrapper = mount(SidebarMenuItemLink, {
      props: {
        item: {
          ...defaultMock.item,
        },
      },
      global: {
        stubs: {
          RouterLink: true, // Shutdown [Vue warn]: Failed to resolve component: RouterLink
        },
      },
    });

    expect(wrapper.classes()).toContain(defaultMock.getSelectorWithoutDot(defaultMock.linkEl));
  });

  it('item: Should pass href and target for external links.', () => {
    const href = 'https://external.com';
    const wrapper = mount(SidebarMenuItemLink, {
      props: {
        item: {
          ...defaultMock.item,
          href: href,
        },
      },
      global: {
        stubs: {
          RouterLink: true, // Shutdown [Vue warn]: Failed to resolve component: RouterLink
        },
      },
    });

    expect(wrapper.attributes('href')).toBe(href);
    expect(wrapper.attributes('target')).toBe('_blank');
  });

  it('item: Should pass href for native links.', () => {
    const href = '/native';
    const wrapper = mount(SidebarMenuItemLink, {
      props: {
        item: {
          ...defaultMock.item,
          href: href,
          native: true,
        },
      },
      global: {
        stubs: {
          RouterLink: true, // Shutdown [Vue warn]: Failed to resolve component: RouterLink
        },
      },
    });

    expect(wrapper.attributes('href')).toBe('/native');
  });
});

describe('SidebarMenuItemLink.vue: Slots.', () => {
  it('default: Should render default slot content.', async () => {
    const wrapper = mount(SidebarMenuItemLink, {
      props: {
        item: {
          ...defaultMock.item,
        },
      },
      slots: {
        default: await SidebarMenuSelectorTestData.getSidebarMenuItemLinkSlotDefaultCustom(),
      },
      global: {
        stubs: {
          RouterLink: true, // Shutdown [Vue warn]: Failed to resolve component: RouterLink
        },
      },
    });

    expect(wrapper.find(defaultMock.linkWeblinkEl).exists()).toBe(true);
    expect(wrapper.find(defaultMock.linkWeblinkEl).element.innerHTML).toBe(
      await SidebarMenuSelectorTestData.getSidebarMenuItemLinkSlotDefaultCustom(),
    );
  });
});

describe('SidebarMenuItemLink.vue: Accessibility.', () => {
  it('Should set rel="noopener noreferrer" and target="_blank" for external links.', () => {
    const wrapper = mount(SidebarMenuItemLink, {
      props: {
        item: {
          ...defaultMock.item,
          href: 'https://external.com',
        },
      },
      global: {
        stubs: {
          RouterLink: true, // Shutdown [Vue warn]: Failed to resolve component: RouterLink
        },
      },
    });

    expect(wrapper.attributes('rel')).toBe('noopener noreferrer');
    expect(wrapper.attributes('target')).toBe('_blank');
  });

  it('Should not set tabindex for div.', () => {
    const wrapper = mount(SidebarMenuItemLink, {
      props: {
        item: {
          ...defaultMock.item,
          href: undefined,
        },
      },
      global: {
        stubs: {
          RouterLink: true, // Shutdown [Vue warn]: Failed to resolve component: RouterLink
        },
      },
    });

    expect(wrapper.attributes('tabindex')).toBeUndefined();
  });
});
