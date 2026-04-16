import { describe, expect, it, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, h } from 'vue';
import DropdownMenuItem from '../../components/DropdownMenuItem/DropdownMenuItem.vue';
import type { TDropdownMenuItem } from '../../types/DropdownMenu.types';
import { DropdownMenuSelectorTestData } from '../test-data/DropdownMenu.selector.test-data';

const defaultMock = new DropdownMenuSelectorTestData();

const mockProvider = vi.hoisted(() => ({
  cssClass: 'ar-dropdown-menu',
  expandMode: 'click' as 'click' | 'hover',
  close: vi.fn(),
  emitItemClick: vi.fn(),
  itemSlot: undefined as any,
}));

vi.mock('@/shared/validators/vue/inject-strict.vue.validator', () => ({
  default: () => mockProvider,
}));

const globalStubs = { RouterLink: true };

function mountItem(item: TDropdownMenuItem, level = 1, withRoute = false) {
  return mount(DropdownMenuItem, {
    props: { item, level },
    global: {
      stubs: globalStubs,
      config: {
        globalProperties: withRoute ? { $route: { path: '/' } } : {},
      },
    },
  });
}

describe('DropdownMenuItem.vue', () => {
  beforeEach(() => {
    mockProvider.expandMode = 'click';
    mockProvider.itemSlot = undefined;
    mockProvider.close = vi.fn();
    mockProvider.emitItemClick = vi.fn();
  });

  describe('Basic render', () => {
    it('Should mount without errors.', () => {
      const wrapper = mountItem({ label: 'Item' });

      expect(wrapper.exists()).toBe(true);
    });

    it('Should render a <li> element for regular item.', () => {
      const wrapper = mountItem({ label: 'Item' });

      expect(wrapper.find('li').element.tagName).toEqual('LI');
    });

    it('Should render label text.', () => {
      const wrapper = mountItem({ label: 'Dashboard' });

      expect(wrapper.find(defaultMock.labelEl).text()).toBe('Dashboard');
    });

    it('Should render separator when item.separator is true.', () => {
      const wrapper = mountItem({ separator: true });

      expect(wrapper.find('li').exists()).toBe(true);
      expect(wrapper.find(defaultMock.separatorEl).exists()).toBe(true);
    });

    it('Should not render <li> when item.hidden is true.', () => {
      const wrapper = mountItem({ label: 'Item', hidden: true });

      expect(wrapper.find('li').exists()).toBe(false);
    });

    it('Should not render separator when item.separator and item.hidden are both true.', () => {
      const wrapper = mountItem({ separator: true, hidden: true });

      expect(wrapper.find('li').exists()).toBe(false);
    });
  });

  describe('Props', () => {
    it('item.label: Should render label in __label span.', () => {
      const wrapper = mountItem({ label: 'Reports' });

      expect(wrapper.find(defaultMock.labelEl).text()).toBe('Reports');
    });

    it('item.icon: Should render icon when provided.', () => {
      const wrapper = mountItem({ label: 'Item', icon: 'mdi-home' });

      expect(wrapper.find(defaultMock.iconEl).exists()).toBe(true);
    });

    it('item.icon: Should not render icon when not provided.', () => {
      const wrapper = mountItem({ label: 'Item' });

      expect(wrapper.find(defaultMock.iconEl).exists()).toBe(false);
    });

    it('item.badge: Should render badge when provided.', () => {
      const wrapper = mountItem({ label: 'Item', badge: 'New' });

      expect(wrapper.find(defaultMock.badgeEl).exists()).toBe(true);
    });

    it('item.badge: Should not render badge when not provided.', () => {
      const wrapper = mountItem({ label: 'Item' });

      expect(wrapper.find(defaultMock.badgeEl).exists()).toBe(false);
    });

    it('item.disabled: Should apply disabled modifier class.', () => {
      const wrapper = mountItem({ label: 'Item', disabled: true });

      expect(wrapper.find('li').classes()).toContain(defaultMock.itemDisabledModifier);
    });

    it('item.disabled: Should not apply disabled modifier when false.', () => {
      const wrapper = mountItem({ label: 'Item', disabled: false });

      expect(wrapper.find('li').classes()).not.toContain(defaultMock.itemDisabledModifier);
    });

    it('item.disabled: Should still render label when item is disabled.', () => {
      const wrapper = mountItem({ label: 'Disabled Item', disabled: true });

      expect(wrapper.find(defaultMock.labelEl).text()).toBe('Disabled Item');
    });

    it('item.disabled: Should apply both disabled and has-children modifiers simultaneously.', () => {
      const wrapper = mountItem({ label: 'Item', disabled: true, children: [{ label: 'Child' }] });
      const liClasses = wrapper.find('li').classes();

      expect(liClasses).toContain(defaultMock.itemDisabledModifier);
      expect(liClasses).toContain(defaultMock.itemHasChildrenModifier);
    });

    it('item.separator: Should apply separator modifier class on <li>.', () => {
      const wrapper = mountItem({ separator: true });

      expect(wrapper.find('li').classes()).toContain(defaultMock.itemSeparatorModifier);
    });

    it('item.separator: Should have role="presentation" on the separator <li>.', () => {
      const wrapper = mountItem({ separator: true });

      expect(wrapper.find('li').attributes('role')).toBe('presentation');
    });

    it('item.separator: Should not render label when separator is true even if label is provided.', () => {
      const wrapper = mountItem({ separator: true, label: 'Ignored' });

      expect(wrapper.find(defaultMock.labelEl).exists()).toBe(false);
    });

    it('item.separator: Should not render icon when separator is true even if icon is provided.', () => {
      const wrapper = mountItem({ separator: true, icon: 'mdi-home' });

      expect(wrapper.find(defaultMock.iconEl).exists()).toBe(false);
    });

    it('item.separator: Should not render badge when separator is true even if badge is provided.', () => {
      const wrapper = mountItem({ separator: true, badge: 'New' });

      expect(wrapper.find(defaultMock.badgeEl).exists()).toBe(false);
    });

    it('item.hidden: Should render <li> when hidden is false.', () => {
      const wrapper = mountItem({ label: 'Item', hidden: false });

      expect(wrapper.find('li').exists()).toBe(true);
    });

    it('item.hidden: Should render <li> when hidden is not provided.', () => {
      const wrapper = mountItem({ label: 'Item' });

      expect(wrapper.find('li').exists()).toBe(true);
    });

    it('item.hidden: Should not render label even if provided when hidden is true.', () => {
      const wrapper = mountItem({ label: 'Hidden Label', hidden: true });

      expect(wrapper.find(defaultMock.labelEl).exists()).toBe(false);
    });

    it('item.hidden: Should not render icon even if provided when hidden is true.', () => {
      const wrapper = mountItem({ label: 'Item', icon: 'mdi-home', hidden: true });

      expect(wrapper.find(defaultMock.iconEl).exists()).toBe(false);
    });

    it('item.hidden: Should not render badge even if provided when hidden is true.', () => {
      const wrapper = mountItem({ label: 'Item', badge: 'New', hidden: true });

      expect(wrapper.find(defaultMock.badgeEl).exists()).toBe(false);
    });

    it('item.hidden: Should not render children sub-menu when item with children is hidden.', () => {
      mockProvider.expandMode = 'click';
      const wrapper = mountItem({ label: 'Item', hidden: true, children: [{ label: 'Child' }] });

      expect(wrapper.find('li').exists()).toBe(false);
      expect(wrapper.find(defaultMock.listEl).exists()).toBe(false);
    });

    it('item.children: Should apply has-children modifier when children are present.', () => {
      const wrapper = mountItem({ label: 'Item', children: [{ label: 'Child' }] });

      expect(wrapper.find('li').classes()).toContain(defaultMock.itemHasChildrenModifier);
    });

    it('item.children: Should render arrow element when item has children.', () => {
      const wrapper = mountItem({ label: 'Item', children: [{ label: 'Child' }] });

      expect(wrapper.find(defaultMock.arrowEl).exists()).toBe(true);
    });

    it('item.children: Should not render arrow element when item has no children.', () => {
      const wrapper = mountItem({ label: 'Item' });

      expect(wrapper.find(defaultMock.arrowEl).exists()).toBe(false);
    });

    it('level: Should apply level-1 class by default.', () => {
      const wrapper = mountItem({ label: 'Item' });

      expect(wrapper.find('li').classes()).toContain(defaultMock.getItemLevelModifier(1));
    });

    it('level: Should apply correct level class for custom level.', () => {
      const wrapper = mountItem({ label: 'Item' }, 3);

      expect(wrapper.find('li').classes()).toContain(defaultMock.getItemLevelModifier(3));
    });
  });

  describe('Slots', () => {
    it('itemSlot: Should render custom slot content instead of default template.', () => {
      const CustomSlot = defineComponent({
        render() {
          return h('div', { class: 'custom-item-slot' }, 'Custom');
        },
      });

      mockProvider.itemSlot = () => [h(CustomSlot)];

      const wrapper = mountItem({ label: 'Item' });

      expect(wrapper.find('.custom-item-slot').exists()).toBe(true);
      expect(wrapper.find(defaultMock.linkEl).exists()).toBe(false);
    });

    it('itemSlot: Should render default template when itemSlot is not provided.', () => {
      mockProvider.itemSlot = undefined;

      const wrapper = mountItem({ label: 'Item', action: vi.fn() });

      expect(wrapper.find(defaultMock.linkEl).exists()).toBe(true);
    });
  });

  describe('Accessibility', () => {
    it('Should have role="menuitem" on interactive element.', () => {
      const wrapper = mountItem({ label: 'Item', action: vi.fn() });

      expect(wrapper.find('[role="menuitem"]').exists()).toBe(true);
    });

    it('Should set aria-disabled="true" when item is disabled.', () => {
      const wrapper = mountItem({ label: 'Item', action: vi.fn(), disabled: true });

      expect(wrapper.find('[aria-disabled="true"]').exists()).toBe(true);
    });

    it('Should not set aria-disabled when item is not disabled.', () => {
      const wrapper = mountItem({ label: 'Item', action: vi.fn(), disabled: false });

      expect(wrapper.find('[aria-disabled]').exists()).toBe(false);
    });

    it('Should set aria-haspopup="menu" when item has children.', () => {
      const wrapper = mountItem({ label: 'Item', children: [{ label: 'Child' }] });

      expect(wrapper.find('[aria-haspopup="menu"]').exists()).toBe(true);
    });

    it('Should not set aria-haspopup when item has no children.', () => {
      const wrapper = mountItem({ label: 'Item' });

      expect(wrapper.find('[aria-haspopup]').exists()).toBe(false);
    });

    it('Should set aria-expanded="false" initially when item has children.', () => {
      const wrapper = mountItem({ label: 'Item', children: [{ label: 'Child' }] });

      expect(wrapper.find('[aria-expanded="false"]').exists()).toBe(true);
    });

    it('Should update aria-expanded to "true" after sub-menu opens.', async () => {
      mockProvider.expandMode = 'click';
      const wrapper = mountItem({ label: 'Item', children: [{ label: 'Child' }] });

      await wrapper.find('button').trigger('click');

      expect(wrapper.find('[aria-expanded="true"]').exists()).toBe(true);
    });
  });

  describe('Edge cases', () => {
    it('Should render <a> with href/target/rel for external URL.', () => {
      const wrapper = mountItem({ label: 'Item', href: 'https://example.com' });
      const link = wrapper.find('a');

      expect(link.attributes('href')).toBe('https://example.com');
      expect(link.attributes('target')).toBe('_blank');
      expect(link.attributes('rel')).toBe('noopener noreferrer');
    });

    it('Should render <a> for internal href when no router is present.', () => {
      const wrapper = mountItem({ label: 'Item', href: '/dashboard' }, 1, false);

      expect(wrapper.find('a').exists()).toBe(true);
    });

    it('Should render RouterLink stub for internal href when router is present.', () => {
      const wrapper = mountItem({ label: 'Item', href: '/dashboard' }, 1, true);

      expect(wrapper.find('router-link-stub').exists()).toBe(true);
    });

    it('Should render <button> for toggle items (with children, expandMode=click).', () => {
      mockProvider.expandMode = 'click';
      const wrapper = mountItem({ label: 'Item', children: [{ label: 'Child' }] });

      expect(wrapper.find('button').exists()).toBe(true);
    });

    it('Should render <div> for plain items (no action, href, or children).', () => {
      const wrapper = mountItem({ label: 'Item' });

      expect(wrapper.find('div').exists()).toBe(true);
    });

    it('Should call action, emitItemClick and close when action item is clicked.', async () => {
      const action = vi.fn();
      const wrapper = mountItem({ label: 'Item', action });

      await wrapper.find('a').trigger('click');

      expect(action).toHaveBeenCalledTimes(1);
      expect(mockProvider.emitItemClick).toHaveBeenCalledTimes(1);
      expect(mockProvider.close).toHaveBeenCalledTimes(1);
    });

    it('Should not call action when disabled item is clicked.', async () => {
      const action = vi.fn();
      const wrapper = mountItem({ label: 'Item', action, disabled: true });

      await wrapper.find('a').trigger('click');

      expect(action).not.toHaveBeenCalled();
    });

    it('item.disabled: Should not open sub-menu on button click when item is disabled.', async () => {
      mockProvider.expandMode = 'click';
      const wrapper = mountItem({ label: 'Item', disabled: true, children: [{ label: 'Child' }] });

      await wrapper.find('button').trigger('click');

      expect(wrapper.find('li').classes()).not.toContain(defaultMock.itemSubOpenModifier);
      expect(wrapper.find(defaultMock.listEl).exists()).toBe(false);
    });

    it('item.disabled: Should not open sub-menu on mouseenter when item is disabled.', async () => {
      mockProvider.expandMode = 'hover';
      const wrapper = mountItem({ label: 'Item', disabled: true, children: [{ label: 'Child' }] });

      await wrapper.find('li').trigger('mouseenter');

      expect(wrapper.find('li').classes()).not.toContain(defaultMock.itemSubOpenModifier);
    });

    it('item.disabled: Should not call emitItemClick or close when disabled href item is clicked.', async () => {
      const wrapper = mountItem({ label: 'Item', href: 'https://example.com', disabled: true });

      await wrapper.find('a').trigger('click');

      expect(mockProvider.emitItemClick).not.toHaveBeenCalled();
      expect(mockProvider.close).not.toHaveBeenCalled();
    });

    it('Should open sub-menu on click in click mode.', async () => {
      mockProvider.expandMode = 'click';
      const wrapper = mountItem({ label: 'Item', children: [{ label: 'Child' }] });

      await wrapper.find('button').trigger('click');

      expect(wrapper.find('li').classes()).toContain(defaultMock.itemSubOpenModifier);
      expect(wrapper.find(defaultMock.listEl).exists()).toBe(true);
    });

    it('Should open sub-menu on mouseenter in hover mode.', async () => {
      mockProvider.expandMode = 'hover';
      const wrapper = mountItem({ label: 'Item', children: [{ label: 'Child' }] });

      await wrapper.find('li').trigger('mouseenter');

      expect(wrapper.find('li').classes()).toContain(defaultMock.itemSubOpenModifier);
    });

    it('Should close sub-menu on mouseleave in hover mode.', async () => {
      mockProvider.expandMode = 'hover';
      const wrapper = mountItem({ label: 'Item', children: [{ label: 'Child' }] });

      await wrapper.find('li').trigger('mouseenter');
      await wrapper.find('li').trigger('mouseleave');

      expect(wrapper.find('li').classes()).not.toContain(defaultMock.itemSubOpenModifier);
    });

    it('Should apply --sub-open modifier and arrow--open class when sub-menu is open.', async () => {
      mockProvider.expandMode = 'click';
      const wrapper = mountItem({ label: 'Item', children: [{ label: 'Child' }] });

      await wrapper.find('button').trigger('click');

      expect(wrapper.find('li').classes()).toContain(defaultMock.itemSubOpenModifier);
      expect(wrapper.find(defaultMock.arrowEl).classes()).toContain(defaultMock.arrowOpenModifier);
    });
  });
});
