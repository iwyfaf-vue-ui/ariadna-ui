import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { ref } from 'vue';
import SidebarMenuScroll from '../../components/SidebarMenuScroll/SidebarMenuScroll.vue';
import { ESidebarMenuPropsDefault } from '../../types/SidebarMenu.enums';
import { SidebarMenuSelectorTestData } from '../../tests/test-data/SidebarMenu.selector.test-data';

const defaultMock = new SidebarMenuSelectorTestData();

vi.mock('@/shared/validators/vue/inject-strict.vue.validator', () => ({
  default: () => ({
    cssClass: ESidebarMenuPropsDefault.CSS_CLASS,
    collapsed: ref(false),
  }),
}));

describe('SidebarMenuScroll.vue', () => {
  describe('Basic render', () => {
    const wrapper = mount(SidebarMenuScroll);

    it('Should mount without errors.', () => {
      expect(wrapper.exists()).toBe(true);
    });

    it('Should render root element with correct class.', () => {
      expect(wrapper.classes()).toContain(defaultMock.getSelectorWithoutDot(defaultMock.scrollEl));
    });
  });

  describe('Slots', () => {
    it('default: Should render default slot content.', async () => {
      const wrapper = mount(SidebarMenuScroll, {
        slots: {
          default: await SidebarMenuSelectorTestData.getSidebarMenuScrollSlotDefaultCustom(),
        },
      });

      expect(wrapper.find(defaultMock.scrollAreaEl).exists()).toBe(true);
      expect(wrapper.find(defaultMock.scrollAreaEl).element.innerHTML).toBe(
        await SidebarMenuSelectorTestData.getSidebarMenuScrollSlotDefaultCustom(),
      );
    });
  });

  describe('Accessibility', () => {
    it('Should have no aria attributes on root.', () => {
      const wrapper = mount(SidebarMenuScroll);

      const attrs = wrapper.attributes();
      const ariaAttrs = Object.keys(attrs).filter((k) => k.startsWith('aria-'));
      expect(ariaAttrs.length).toBe(0);
    });
  });
});
