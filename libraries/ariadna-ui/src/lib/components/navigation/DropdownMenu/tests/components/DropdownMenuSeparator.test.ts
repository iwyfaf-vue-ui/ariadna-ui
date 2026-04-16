import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import DropdownMenuSeparator from '../../components/DropdownMenuSeparator/DropdownMenuSeparator.vue';
import { DropdownMenuSelectorTestData } from '../test-data/DropdownMenu.selector.test-data';

const defaultMock = new DropdownMenuSelectorTestData();

const mockInject = vi.hoisted(() => ({ cssClass: 'ar-dropdown-menu' }));

vi.mock('@/shared/validators/vue/inject-strict.vue.validator', () => ({
  default: () => mockInject,
}));

describe('DropdownMenuSeparator.vue', () => {
  describe('Basic render', () => {
    it('Should mount without errors.', () => {
      const wrapper = mount(DropdownMenuSeparator);

      expect(wrapper.exists()).toBe(true);
    });

    it('Should render as an <hr> element.', () => {
      const wrapper = mount(DropdownMenuSeparator);

      expect(wrapper.element.tagName).toEqual('HR');
    });

    it('Should apply the separator BEM class from injected cssClass.', () => {
      const wrapper = mount(DropdownMenuSeparator);

      expect(wrapper.classes()).toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.separatorEl),
      );
    });
  });

  describe('Accessibility', () => {
    it('Should have role="separator".', () => {
      const wrapper = mount(DropdownMenuSeparator);

      expect(wrapper.attributes('role')).toEqual('separator');
    });

    it('Should have aria-orientation="horizontal".', () => {
      const wrapper = mount(DropdownMenuSeparator);

      expect(wrapper.attributes('aria-orientation')).toEqual('horizontal');
    });
  });

  describe('Edge cases', () => {
    it('Should apply separator class derived from a custom cssClass.', () => {
      const customMock = new DropdownMenuSelectorTestData('my-menu');
      mockInject.cssClass = 'my-menu';

      const wrapper = mount(DropdownMenuSeparator);

      expect(wrapper.classes()).toContain(customMock.getSelectorWithoutDot(customMock.separatorEl));

      mockInject.cssClass = defaultMock.className;
    });
  });
});
