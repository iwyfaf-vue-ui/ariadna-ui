import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, h, markRaw } from 'vue';
import DropdownMenuItemIcon from '../../components/DropdownMenuItemIcon/DropdownMenuItemIcon.vue';
import { DropdownMenuSelectorTestData } from '../test-data/DropdownMenu.selector.test-data';

const defaultMock = new DropdownMenuSelectorTestData();

const mockInject = vi.hoisted(() => ({ cssClass: 'ar-dropdown-menu' }));

vi.mock('@/shared/validators/vue/inject-strict.vue.validator', () => ({
  default: () => mockInject,
}));

const DummyIconComponent = defineComponent({
  name: 'DummyIconComponent',
  render() {
    return h('i', { class: 'dummy-icon' });
  },
});

describe('DropdownMenuItemIcon.vue', () => {
  describe('Basic render', () => {
    it('Should mount without errors.', () => {
      const wrapper = mount(DropdownMenuItemIcon, {
        props: { icon: 'mdi-home' },
      });

      expect(wrapper.exists()).toBe(true);
    });

    it('Should render as a <span> element.', () => {
      const wrapper = mount(DropdownMenuItemIcon, {
        props: { icon: 'mdi-home' },
      });

      expect(wrapper.element.tagName).toEqual('SPAN');
    });

    it('Should apply the icon BEM class.', () => {
      const wrapper = mount(DropdownMenuItemIcon, {
        props: { icon: 'mdi-home' },
      });

      expect(wrapper.classes()).toContain(defaultMock.getSelectorWithoutDot(defaultMock.iconEl));
    });
  });

  describe('Props', () => {
    it('icon: Should render <i> with the icon CSS class when icon is a string.', () => {
      const wrapper = mount(DropdownMenuItemIcon, {
        props: { icon: 'mdi-home' },
      });

      expect(wrapper.find('i.mdi-home').exists()).toBe(true);
    });

    it('icon: Should render <i> with multiple CSS classes when icon is a compound string.', () => {
      const wrapper = mount(DropdownMenuItemIcon, {
        props: { icon: 'pi pi-home' },
      });

      const iconEl = wrapper.find('i');

      expect(iconEl.exists()).toBe(true);
      expect(iconEl.classes()).toContain('pi');
      expect(iconEl.classes()).toContain('pi-home');
    });

    it('icon: Should render Vue component when icon is a component object.', () => {
      const wrapper = mount(DropdownMenuItemIcon, {
        props: { icon: markRaw(DummyIconComponent) },
      });

      expect(wrapper.findComponent(DummyIconComponent).exists()).toBe(true);
    });

    it('icon: Should render function component.', () => {
      const iconFn = () => h('i', { class: 'fn-icon' });

      const wrapper = mount(DropdownMenuItemIcon, {
        props: { icon: iconFn },
      });

      expect(wrapper.find('i.fn-icon').exists()).toBe(true);
    });

    it('icon: Should render <i> with empty class when icon is an empty string.', () => {
      const wrapper = mount(DropdownMenuItemIcon, {
        props: { icon: '' },
      });

      expect(wrapper.find('i').exists()).toBe(true);
    });
  });

  describe('Accessibility', () => {
    it('Should have aria-hidden="true" on root element.', () => {
      const wrapper = mount(DropdownMenuItemIcon, {
        props: { icon: 'mdi-home' },
      });

      expect(wrapper.attributes('aria-hidden')).toBe('true');
    });

    it('Should not have tabindex attribute.', () => {
      const wrapper = mount(DropdownMenuItemIcon, {
        props: { icon: 'mdi-home' },
      });

      expect(wrapper.attributes('tabindex')).toBeUndefined();
    });

    it('Should not have role attribute.', () => {
      const wrapper = mount(DropdownMenuItemIcon, {
        props: { icon: 'mdi-home' },
      });

      expect(wrapper.attributes('role')).toBeUndefined();
    });
  });

  describe('Edge cases', () => {
    it('Should not render <i> when icon is a component — uses <component> instead.', () => {
      const wrapper = mount(DropdownMenuItemIcon, {
        props: { icon: markRaw(DummyIconComponent) },
      });

      expect(wrapper.find('i.dummy-icon').exists()).toBe(true);
      expect(wrapper.findAll('i')).toHaveLength(1);
    });

    it('Should apply icon class derived from a custom cssClass.', () => {
      const customMock = new DropdownMenuSelectorTestData('my-menu');
      mockInject.cssClass = 'my-menu';

      const wrapper = mount(DropdownMenuItemIcon, {
        props: { icon: 'mdi-home' },
      });

      expect(wrapper.classes()).toContain(customMock.getSelectorWithoutDot(customMock.iconEl));

      mockInject.cssClass = defaultMock.className;
    });
  });
});
