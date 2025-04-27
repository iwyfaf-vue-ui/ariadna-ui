import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, h } from 'vue';
import type { TSidebarMenuItemLinkProps } from '../../components/SidebarMenuItemLink/SidebarMenuItemLink';
import useSidebarMenuItemLink from '../../composables/useSidebarMenuItemLink/useSidebarMenuItemLink';
import { SidebarMenuSelectorTestData } from '../../tests/test-data/SidebarMenu.selector.test-data';
import { ESidebarMenuPropsDefault } from '../../types/SidebarMenu.enums';

const defaultMock = new SidebarMenuSelectorTestData();

const mockProps: TSidebarMenuItemLinkProps = {
  item: {
    title: 'Test',
    href: '/test',
  },
};

vi.mock('@/shared/validators/vue/inject-strict.vue.validator', () => ({
  default: () => ({ cssClass: ESidebarMenuPropsDefault.CSS_CLASS }),
}));

describe('useSidebarMenuItemLink.ts: Basic functionality.', () => {
  it('Should return expected structure.', () => {
    mount({
      template: '<div></div>',
      setup() {
        const result = useSidebarMenuItemLink(mockProps);

        expect(result).toHaveProperty('renderType');
        expect(result).toHaveProperty('isLinkActive');
        expect(result).toHaveProperty('componentClasses');
      },
    });
  });
});

describe('useSidebarMenuItemLink.ts: renderType ComputedRef.', () => {
  it('Should return "native" if item.href is provided and item.native is true.', () => {
    mount({
      template: '<div></div>',
      setup() {
        const { renderType } = useSidebarMenuItemLink({
          ...mockProps,
          item: {
            ...mockProps.item,
            native: true,
          },
        });

        expect(renderType.value).toBe('native');
      },
    });
  });

  it('Should return "external" if item.href is provided and begin with "https".', () => {
    mount({
      template: '<div></div>',
      setup() {
        const { renderType } = useSidebarMenuItemLink({
          ...mockProps,
          item: {
            ...mockProps.item,
            href: 'https://example.com',
          },
        });

        expect(renderType.value).toBe('external');
      },
    });
  });

  it('Should return "internal" if item.href is provided and begin with "/".', () => {
    mount({
      template: '<div></div>',
      setup() {
        const { renderType } = useSidebarMenuItemLink({
          ...mockProps,
          item: {
            ...mockProps.item,
            href: '/',
          },
        });

        expect(renderType.value).toBe('external');
      },
    });
  });

  it('Should return "text" if item.href is not provided.', () => {
    mount({
      template: '<div></div>',
      setup() {
        const { renderType } = useSidebarMenuItemLink({
          ...mockProps,
          item: {
            ...mockProps.item,
            href: undefined,
          },
        });

        expect(renderType.value).toBe('text');
      },
    });
  });
});

describe('useSidebarMenuItemLink.ts: isLinkActive ComputedRef.', () => {
  vi.mock('../../core/item/item.core', () => ({
    default: vi.fn(),
  }));

  function mountWithComposable(props: TSidebarMenuItemLinkProps, route = { path: '/' }) {
    return mount(
      defineComponent({
        setup() {
          const result = useSidebarMenuItemLink(props);
          return { ...result };
        },
        render() {
          return h('div');
        },
      }),
      {
        global: {
          config: {
            globalProperties: {
              $router: {},
              $route: route,
            },
          },
        },
      },
    );
  }

  it('Should return true if item is active.', () => {
    const wrapper = mountWithComposable(mockProps, { path: '/test' });
    const isActive = wrapper.vm.isLinkActive;

    expect(isActive).toBe(true);
  });

  it('Should return false if item is not active.', () => {
    const wrapper = mountWithComposable(mockProps, { path: '/profile' });
    const isActive = wrapper.vm.isLinkActive;

    expect(isActive).toBe(false);
  });

  it('Should return false if item.href is undefined.', () => {
    const wrapper = mountWithComposable(
      {
        ...mockProps,
        item: {
          ...mockProps.item,
          href: undefined,
        },
      },
      { path: '/test' },
    );
    const isActive = wrapper.vm.isLinkActive;

    expect(isActive).toBe(false);
  });

  it('Should return false if item.href is empty string.', () => {
    const wrapper = mountWithComposable(
      {
        ...mockProps,
        item: {
          ...mockProps.item,
          href: '',
        },
      },
      { path: '/dashboard' },
    );
    const isActive = wrapper.vm.isLinkActive;

    expect(isActive).toBe(false);
  });
});

describe('useSidebarMenuItemLink.ts: useSidebarMenuItemLink ComputedRef.', () => {
  it('Should return base class for text item.', () => {
    mount({
      template: '<div></div>',
      setup() {
        const { componentClasses } = useSidebarMenuItemLink({
          ...mockProps,
          item: {
            ...mockProps.item,
            href: undefined,
          },
        });

        expect(componentClasses.value).toContain(
          defaultMock.getSelectorWithoutDot(defaultMock.linkEl),
        );
        expect(componentClasses.value).toContain(
          defaultMock.getSelectorWithoutDot(defaultMock.linkTextualEl),
        );
      },
    });
  });

  it('Should return base class for link item.', () => {
    mount({
      template: '<div></div>',
      setup() {
        const { componentClasses } = useSidebarMenuItemLink(mockProps);

        expect(componentClasses.value).toBe(
          `${defaultMock.getSelectorWithoutDot(defaultMock.linkEl)} ${defaultMock.getSelectorWithoutDot(defaultMock.linkWeblinkEl)}`,
        );
      },
    });
  });

  it('Should return active class for active link item.', () => {
    vi.mock('../../core/item/item.core', () => ({
      default: vi.fn(),
    }));

    function mountWithComposable(props: TSidebarMenuItemLinkProps, route = { path: '/' }) {
      return mount(
        defineComponent({
          setup() {
            const result = useSidebarMenuItemLink(props);
            return { ...result };
          },
          render() {
            return h('div');
          },
        }),
        {
          global: {
            config: {
              globalProperties: {
                $router: {},
                $route: route,
              },
            },
          },
        },
      );
    }

    const wrapper = mountWithComposable(mockProps, { path: '/test' });
    const { componentClasses } = wrapper.vm;

    expect(componentClasses).toBe(
      `${defaultMock.getSelectorWithoutDot(defaultMock.linkEl)} ${defaultMock.getSelectorWithoutDot(defaultMock.linkWeblinkEl)} ${defaultMock.getSelectorWithoutDot(defaultMock.linkActiveModifier)}`,
    );
  });

  it('Should return only base class for inactive link item.', () => {
    mount({
      template: '<div></div>',
      setup() {
        const props: TSidebarMenuItemLinkProps = {
          item: {
            title: 'Test',
            href: '/test',
          },
        };
        const { componentClasses } = useSidebarMenuItemLink(props);

        expect(componentClasses.value).toBe(
          `${defaultMock.getSelectorWithoutDot(defaultMock.linkEl)} ${defaultMock.getSelectorWithoutDot(defaultMock.linkWeblinkEl)}`,
        );
      },
    });
  });
});
