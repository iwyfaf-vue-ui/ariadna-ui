import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, h, markRaw } from 'vue';
import SidebarMenuItemBadge from '../../components/SidebarMenuItemBadge/SidebarMenuItemBadge.vue';
import { ESidebarMenuPropsDefault } from '../../types/SidebarMenu.enums';

vi.mock('@/shared/validators/vue/inject-strict.vue.validator', () => ({
  default: () => ({ cssClass: ESidebarMenuPropsDefault.CSS_CLASS }),
}));

const DummyBadgeComponent = defineComponent({
  name: 'DummyBadgeComponent',
  render() {
    return h('span', 'dummy');
  },
});

describe('SidebarMenuItemBadge.vue', () => {
  describe('Basic render', () => {
    const wrapper = mount(SidebarMenuItemBadge, {
      props: {
        badge: 'mdi-badge',
      },
    });

    it('Should mount without errors.', () => {
      expect(wrapper.exists()).toBe(true);
    });

    it('Should render as a span element.', () => {
      expect(wrapper.element.tagName).toEqual('SPAN');
    });
  });

  describe('Props', () => {
    it('badge: Should render string badge.', () => {
      const wrapper = mount(SidebarMenuItemBadge, {
        props: { badge: 'test' },
      });

      expect(wrapper.text()).toBe('test');
    });

    it('badge: Should render number badge.', () => {
      const wrapper = mount(SidebarMenuItemBadge, {
        props: { badge: 42 },
      });

      expect(wrapper.text()).toBe('42');
    });

    it('badge: Should render Vue component badge.', () => {
      const wrapper = mount(SidebarMenuItemBadge, {
        props: { badge: markRaw(DummyBadgeComponent) },
      });

      expect(wrapper.findComponent(DummyBadgeComponent).exists()).toBe(true);
    });

    it('badge: Should render function badge as component.', () => {
      const badgeFn = () => h('span', 'fn');

      const wrapper = mount(SidebarMenuItemBadge, {
        props: { badge: badgeFn },
      });
      expect(wrapper.find('span').text()).toBe('fn');
    });
  });

  describe('Accessibility', () => {
    it('Should have no aria attributes.', () => {
      const wrapper = mount(SidebarMenuItemBadge, {
        props: { badge: 'a11y' },
      });
      const attrs = wrapper.attributes();

      expect(Object.keys(attrs).some((k) => k.startsWith('aria-'))).toBe(false);
    });

    it('Should not have tabindex attribute.', () => {
      const wrapper = mount(SidebarMenuItemBadge, {
        props: { badge: 'tab' },
      });

      expect(wrapper.attributes('tabindex')).toBeUndefined();
    });
  });
});
