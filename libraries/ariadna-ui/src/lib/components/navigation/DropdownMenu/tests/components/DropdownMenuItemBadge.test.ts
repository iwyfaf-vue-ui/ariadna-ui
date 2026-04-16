import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, h, markRaw } from 'vue';
import DropdownMenuItemBadge from '../../components/DropdownMenuItemBadge/DropdownMenuItemBadge.vue';
import { DropdownMenuSelectorTestData } from '../test-data/DropdownMenu.selector.test-data';

const defaultMock = new DropdownMenuSelectorTestData();

const mockInject = vi.hoisted(() => ({ cssClass: 'ar-dropdown-menu' }));

vi.mock('@/shared/validators/vue/inject-strict.vue.validator', () => ({
  default: () => mockInject,
}));

const DummyBadgeComponent = defineComponent({
  name: 'DummyBadgeComponent',
  render() {
    return h('span', 'dummy-badge');
  },
});

describe('DropdownMenuItemBadge.vue', () => {
  describe('Basic render', () => {
    it('Should mount without errors.', () => {
      const wrapper = mount(DropdownMenuItemBadge, {
        props: { badge: 'New' },
      });

      expect(wrapper.exists()).toBe(true);
    });

    it('Should render as a <span> element.', () => {
      const wrapper = mount(DropdownMenuItemBadge, {
        props: { badge: 'New' },
      });

      expect(wrapper.element.tagName).toEqual('SPAN');
    });

    it('Should apply the badge BEM class.', () => {
      const wrapper = mount(DropdownMenuItemBadge, {
        props: { badge: 'New' },
      });

      expect(wrapper.classes()).toContain(defaultMock.getSelectorWithoutDot(defaultMock.badgeEl));
    });

    it('Should not render when badge is undefined.', () => {
      const wrapper = mount(DropdownMenuItemBadge, {
        props: { badge: undefined },
      });

      expect(wrapper.find('span').exists()).toBe(false);
    });
  });

  describe('Props', () => {
    it('badge: Should render string value as text.', () => {
      const wrapper = mount(DropdownMenuItemBadge, {
        props: { badge: 'New' },
      });

      expect(wrapper.text()).toBe('New');
    });

    it('badge: Should render number value as text.', () => {
      const wrapper = mount(DropdownMenuItemBadge, {
        props: { badge: 42 },
      });

      expect(wrapper.text()).toBe('42');
    });

    it('badge: Should render zero as text.', () => {
      const wrapper = mount(DropdownMenuItemBadge, {
        props: { badge: 0 },
      });

      expect(wrapper.text()).toBe('0');
    });

    it('badge: Should render Vue component when badge is a component object.', () => {
      const wrapper = mount(DropdownMenuItemBadge, {
        props: { badge: markRaw(DummyBadgeComponent) },
      });

      expect(wrapper.findComponent(DummyBadgeComponent).exists()).toBe(true);
    });

    it('badge: Should render function component.', () => {
      const badgeFn = () => h('span', 'fn-badge');

      const wrapper = mount(DropdownMenuItemBadge, {
        props: { badge: badgeFn },
      });

      expect(wrapper.find('span').text()).toBe('fn-badge');
    });

    it('badge: Should not render when badge is undefined.', () => {
      const wrapper = mount(DropdownMenuItemBadge, {
        props: { badge: undefined },
      });

      expect(wrapper.html()).toBe('<!--v-if-->');
    });
  });

  describe('Accessibility', () => {
    it('Should have no aria attributes.', () => {
      const wrapper = mount(DropdownMenuItemBadge, {
        props: { badge: 'New' },
      });

      const attrs = wrapper.attributes();

      expect(Object.keys(attrs).some((k) => k.startsWith('aria-'))).toBe(false);
    });

    it('Should not have tabindex attribute.', () => {
      const wrapper = mount(DropdownMenuItemBadge, {
        props: { badge: 'New' },
      });

      expect(wrapper.attributes('tabindex')).toBeUndefined();
    });
  });

  describe('Edge cases', () => {
    it('Should render empty string badge.', () => {
      const wrapper = mount(DropdownMenuItemBadge, {
        props: { badge: '' },
      });

      expect(wrapper.find('span').exists()).toBe(true);
      expect(wrapper.text()).toBe('');
    });

    it('Should apply badge class derived from a custom cssClass.', () => {
      const customMock = new DropdownMenuSelectorTestData('my-menu');
      mockInject.cssClass = 'my-menu';

      const wrapper = mount(DropdownMenuItemBadge, {
        props: { badge: 'New' },
      });

      expect(wrapper.classes()).toContain(customMock.getSelectorWithoutDot(customMock.badgeEl));

      mockInject.cssClass = defaultMock.className;
    });
  });
});
