import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import DropdownMenuList from '../../components/DropdownMenuList/DropdownMenuList.vue';
import type { TDropdownMenuItem } from '../../types/DropdownMenu.types';
import { DropdownMenuSelectorTestData } from '../test-data/DropdownMenu.selector.test-data';

const defaultMock = new DropdownMenuSelectorTestData();

const mockInject = vi.hoisted(() => ({ cssClass: 'ar-dropdown-menu' }));

vi.mock('@/shared/validators/vue/inject-strict.vue.validator', () => ({
  default: () => mockInject,
}));

const globalStubs = { DropdownMenuItem: true };

function mountList(data: TDropdownMenuItem[], level?: number) {
  return mount(DropdownMenuList, {
    props: level !== undefined ? { data, level } : { data },
    global: { stubs: globalStubs },
  });
}

describe('DropdownMenuList.vue', () => {
  describe('Basic render', () => {
    it('Should mount without errors.', () => {
      const wrapper = mountList([]);

      expect(wrapper.exists()).toBe(true);
    });

    it('Should render a <ul> element.', () => {
      const wrapper = mountList([]);

      expect(wrapper.element.tagName).toEqual('UL');
    });

    it('Should render one DropdownMenuItem stub for a single item.', () => {
      const wrapper = mountList([{ label: 'Item' }]);

      expect(wrapper.findAll('dropdown-menu-item-stub')).toHaveLength(1);
    });

    it('Should render a DropdownMenuItem stub for each item in data.', () => {
      const data: TDropdownMenuItem[] = [
        { label: 'Item 1' },
        { label: 'Item 2' },
        { label: 'Item 3' },
      ];

      const wrapper = mountList(data);

      expect(wrapper.findAll('dropdown-menu-item-stub')).toHaveLength(3);
    });

    it('Should render no DropdownMenuItem stubs when data is empty.', () => {
      const wrapper = mountList([]);

      expect(wrapper.findAll('dropdown-menu-item-stub')).toHaveLength(0);
    });
  });

  describe('Props', () => {
    it('data: Should render the correct number of items for any data length.', () => {
      const data: TDropdownMenuItem[] = [
        { label: 'A' },
        { label: 'B' },
        { separator: true },
        { label: 'C' },
      ];

      const wrapper = mountList(data);

      expect(wrapper.findAll('dropdown-menu-item-stub')).toHaveLength(4);
    });

    it('level: Should apply level-1 class when level is not provided.', () => {
      const wrapper = mountList([]);

      expect(wrapper.classes()).toContain(defaultMock.getListLevelModifier(1));
    });

    it('level: Should apply level-2 class when level is 2.', () => {
      const wrapper = mountList([], 2);

      expect(wrapper.classes()).toContain(defaultMock.getListLevelModifier(2));
    });

    it('level: Should apply the correct level class for any given level.', () => {
      const wrapper = mountList([], 5);

      expect(wrapper.classes()).toContain(defaultMock.getListLevelModifier(5));
    });

    it('level: Should pass the level prop to each DropdownMenuItem stub.', () => {
      const wrapper = mountList([{ label: 'Item 1' }, { label: 'Item 2' }], 3);
      const stubs = wrapper.findAll('dropdown-menu-item-stub');

      expect(stubs[0].attributes('level')).toBe('3');
      expect(stubs[1].attributes('level')).toBe('3');
    });
  });

  describe('CSS classes', () => {
    it('Should apply the base __list class.', () => {
      const wrapper = mountList([]);

      expect(wrapper.classes()).toContain(defaultMock.getSelectorWithoutDot(defaultMock.listEl));
    });

    it('Should not apply --sub modifier at level 1.', () => {
      const wrapper = mountList([], 1);

      expect(wrapper.classes()).not.toContain(defaultMock.listSubModifier);
    });

    it('Should apply --sub modifier when level is 2.', () => {
      const wrapper = mountList([], 2);

      expect(wrapper.classes()).toContain(defaultMock.listSubModifier);
    });

    it('Should apply --sub modifier when level is greater than 2.', () => {
      const wrapper = mountList([], 4);

      expect(wrapper.classes()).toContain(defaultMock.listSubModifier);
    });

    it('Should apply level modifier matching the provided level.', () => {
      const wrapper = mountList([], 3);

      expect(wrapper.classes()).toContain(defaultMock.getListLevelModifier(3));
    });
  });

  describe('Accessibility', () => {
    it('Should have role="menu" on the <ul>.', () => {
      const wrapper = mountList([]);

      expect(wrapper.attributes('role')).toBe('menu');
    });

    it('Should have aria-orientation="vertical" on the <ul>.', () => {
      const wrapper = mountList([]);

      expect(wrapper.attributes('aria-orientation')).toBe('vertical');
    });
  });

  describe('Edge cases', () => {
    it('Should apply classes derived from a custom injected cssClass.', () => {
      const customMock = new DropdownMenuSelectorTestData('my-menu');
      mockInject.cssClass = 'my-menu';

      const wrapper = mountList([], 1);

      expect(wrapper.classes()).toContain(customMock.getSelectorWithoutDot(customMock.listEl));
      expect(wrapper.classes()).toContain(customMock.getListLevelModifier(1));

      mockInject.cssClass = defaultMock.className;
    });

    it('Should not apply --sub modifier for custom cssClass at level 1.', () => {
      const customMock = new DropdownMenuSelectorTestData('my-menu');
      mockInject.cssClass = 'my-menu';

      const wrapper = mountList([], 1);

      expect(wrapper.classes()).not.toContain(customMock.listSubModifier);

      mockInject.cssClass = defaultMock.className;
    });

    it('Should render mixed data (regular items, separators, hidden items) without errors.', () => {
      const data: TDropdownMenuItem[] = [
        { label: 'Visible' },
        { separator: true },
        { label: 'Hidden', hidden: true },
        { label: 'Disabled', disabled: true },
      ];

      const wrapper = mountList(data);

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.findAll('dropdown-menu-item-stub')).toHaveLength(4);
    });

    it('Should apply both --sub and level modifier simultaneously at level 2.', () => {
      const wrapper = mountList([], 2);
      const classes = wrapper.classes();

      expect(classes).toContain(defaultMock.listSubModifier);
      expect(classes).toContain(defaultMock.getListLevelModifier(2));
    });
  });
});
