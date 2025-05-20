import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, h, type Ref, ref } from 'vue';
import type { TSidebarMenuProps } from '../../SidebarMenu';
import useSidebarMenu from '../../composables/useSidebarMenu/useSidebarMenu';
import { SidebarMenuSelectorTestData } from '../../tests/test-data/SidebarMenu.selector.test-data';

const defaultMock = new SidebarMenuSelectorTestData();

const mockProps: TSidebarMenuProps = {
  data: [],
  cssClass: 'ar-sidebar-menu',
};

function mountWithComposable(
  props: TSidebarMenuProps,
  collapsed: Ref<boolean>,
  route = { path: '/' },
) {
  const emits = vi.fn();

  return mount(
    defineComponent({
      setup() {
        const result = useSidebarMenu(props, collapsed, emits);
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
            $route: route,
          },
        },
      },
    },
  );
}

describe('useSidebarMenu', () => {
  describe('Basic functionality', () => {
    it('Should return expected structure.', () => {
      const collapsed = ref(false);
      const wrapper = mountWithComposable(mockProps, collapsed);
      const vm = wrapper.vm;

      expect(vm).toHaveProperty('componentClasses');
      expect(vm).toHaveProperty('isMenuItemActiveComputed');
    });
  });

  describe('componentClasses ComputedRef', () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('Should generate correct componentClasses for default props.', () => {
      const collapsed = ref(false);
      const wrapper = mountWithComposable(mockProps, collapsed);
      const vm = wrapper.vm;

      expect(vm.componentClasses).toBe(
        `${defaultMock.getSelectorWithoutDot(defaultMock.rootEl)} ${defaultMock.getSelectorWithoutDot(defaultMock.themeModifier)}`,
      );
    });

    it('Should generate correct componentClasses with modifier.', () => {
      const collapsed = ref(false);
      const wrapper = mountWithComposable({ ...mockProps }, collapsed);
      const vm = wrapper.vm;

      expect(vm.componentClasses).toBe(
        `${defaultMock.getSelectorWithoutDot(defaultMock.rootEl)} ${defaultMock.getSelectorWithoutDot(defaultMock.themeModifier)}`,
      );
    });
  });

  describe('isMenuItemActiveComputed ComputedRef', () => {
    it('Should return false if item is not active.', () => {
      const collapsed = ref(false);
      const item = { title: 'Main', href: '/' };
      const wrapper = mountWithComposable(mockProps, collapsed, { path: '/dashboard' });
      const vm = wrapper.vm;

      expect(vm.isMenuItemActiveComputed(item)).toBe(false);
    });

    it('Should return true if item is active.', () => {
      const collapsed = ref(false);
      const item = { title: 'Dashboard', href: '/dashboard' };
      const wrapper = mountWithComposable(mockProps, collapsed, { path: '/dashboard' });
      const vm = wrapper.vm;

      expect(vm.isMenuItemActiveComputed(item)).toBe(true);
    });
  });
});
