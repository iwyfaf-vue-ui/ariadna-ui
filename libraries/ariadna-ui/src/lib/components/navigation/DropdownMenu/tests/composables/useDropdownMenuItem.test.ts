import { describe, expect, it, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, h } from 'vue';
import useDropdownMenuItem from '../../composables/useDropdownMenuItem/useDropdownMenuItem';
import type { TDropdownMenuItemProps } from '../../components/DropdownMenuItem/DropdownMenuItem';
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

function mountWithComposable(props: TDropdownMenuItemProps, withRoute = true) {
  return mount(
    defineComponent({
      setup() {
        return useDropdownMenuItem(props);
      },
      render() {
        return h('div');
      },
    }),
    {
      global: {
        config: {
          globalProperties: withRoute ? { $route: { path: '/' } } : {},
        },
      },
    },
  );
}

describe('useDropdownMenuItem', () => {
  beforeEach(() => {
    mockProvider.expandMode = 'click';
    mockProvider.itemSlot = undefined;
    mockProvider.close = vi.fn();
    mockProvider.emitItemClick = vi.fn();
  });

  describe('Basic functionality', () => {
    it('Should return all expected properties.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const result = useDropdownMenuItem({ item: { label: 'Item' } });

          expect(result).toHaveProperty('cssClass');
          expect(result).toHaveProperty('isDisabled');
          expect(result).toHaveProperty('hasChildren');
          expect(result).toHaveProperty('isSubOpen');
          expect(result).toHaveProperty('renderType');
          expect(result).toHaveProperty('linkAttrs');
          expect(result).toHaveProperty('componentClasses');
          expect(result).toHaveProperty('linkClasses');
          expect(result).toHaveProperty('clickHandler');
          expect(result).toHaveProperty('hoverHandler');
          expect(result).toHaveProperty('leaveHandler');
          expect(result).toHaveProperty('close');
        },
      });
    });

    it('Should expose cssClass from the provider.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { cssClass } = useDropdownMenuItem({ item: { label: 'Item' } });

          expect(cssClass).toEqual(defaultMock.className);
        },
      });
    });
  });

  describe('isDisabled', () => {
    it('Should return true when item.disabled is true.', () => {
      const wrapper = mountWithComposable({ item: { label: 'Item', disabled: true } });

      expect(wrapper.vm.isDisabled).toBe(true);
    });

    it('Should return false when item.disabled is false.', () => {
      const wrapper = mountWithComposable({ item: { label: 'Item', disabled: false } });

      expect(wrapper.vm.isDisabled).toBe(false);
    });

    it('Should return false when item.disabled is undefined.', () => {
      const wrapper = mountWithComposable({ item: { label: 'Item' } });

      expect(wrapper.vm.isDisabled).toBe(false);
    });
  });

  describe('hasChildren', () => {
    it('Should return true when children array is non-empty.', () => {
      const wrapper = mountWithComposable({
        item: { label: 'Item', children: [{ label: 'Child' }] },
      });

      expect(wrapper.vm.hasChildren).toBe(true);
    });

    it('Should return false when children array is empty.', () => {
      const wrapper = mountWithComposable({ item: { label: 'Item', children: [] } });

      expect(wrapper.vm.hasChildren).toBe(false);
    });

    it('Should return false when children is undefined.', () => {
      const wrapper = mountWithComposable({ item: { label: 'Item' } });

      expect(wrapper.vm.hasChildren).toBe(false);
    });
  });

  describe('renderType', () => {
    it('Should return "action" when item.action is defined.', () => {
      const wrapper = mountWithComposable({
        item: { label: 'Item', action: vi.fn() },
      });

      expect(wrapper.vm.renderType).toEqual('action');
    });

    it('Should return "external" when item.href is an external URL.', () => {
      const wrapper = mountWithComposable({
        item: { label: 'Item', href: 'https://example.com' },
      });

      expect(wrapper.vm.renderType).toEqual('external');
    });

    it('Should return "external" when item.href starts with http://.', () => {
      const wrapper = mountWithComposable({
        item: { label: 'Item', href: 'http://example.com' },
      });

      expect(wrapper.vm.renderType).toEqual('external');
    });

    it('Should return "external" for internal href when no router is present.', () => {
      const wrapper = mountWithComposable({ item: { label: 'Item', href: '/dashboard' } }, false);

      expect(wrapper.vm.renderType).toEqual('external');
    });

    it('Should return "internal" for internal href when router is present.', () => {
      const wrapper = mountWithComposable({ item: { label: 'Item', href: '/dashboard' } }, true);

      expect(wrapper.vm.renderType).toEqual('internal');
    });

    it('Should return "toggle" when item has children.', () => {
      const wrapper = mountWithComposable({
        item: { label: 'Item', children: [{ label: 'Child' }] },
      });

      expect(wrapper.vm.renderType).toEqual('toggle');
    });

    it('Should return "plain" when item has no action, href, or children.', () => {
      const wrapper = mountWithComposable({ item: { label: 'Item' } });

      expect(wrapper.vm.renderType).toEqual('plain');
    });

    it('Should prioritize "action" over href.', () => {
      const wrapper = mountWithComposable({
        item: { label: 'Item', action: vi.fn(), href: '/dashboard' },
      });

      expect(wrapper.vm.renderType).toEqual('action');
    });
  });

  describe('linkAttrs', () => {
    it('Should return href, target and rel for external items.', () => {
      const wrapper = mountWithComposable({
        item: { label: 'Item', href: 'https://example.com' },
      });

      expect(wrapper.vm.linkAttrs).toStrictEqual({
        href: 'https://example.com',
        target: '_blank',
        rel: 'noopener noreferrer',
      });
    });

    it('Should use item.target when provided for external items.', () => {
      const wrapper = mountWithComposable({
        item: { label: 'Item', href: 'https://example.com', target: '_self' },
      });

      expect(wrapper.vm.linkAttrs).toStrictEqual({
        href: 'https://example.com',
        target: '_self',
        rel: 'noopener noreferrer',
      });
    });

    it('Should return empty object for action items.', () => {
      const wrapper = mountWithComposable({
        item: { label: 'Item', action: vi.fn() },
      });

      expect(wrapper.vm.linkAttrs).toStrictEqual({});
    });

    it('Should return empty object for internal items.', () => {
      const wrapper = mountWithComposable({ item: { label: 'Item', href: '/dashboard' } }, true);

      expect(wrapper.vm.linkAttrs).toStrictEqual({});
    });

    it('Should return empty object for plain items.', () => {
      const wrapper = mountWithComposable({ item: { label: 'Item' } });

      expect(wrapper.vm.linkAttrs).toStrictEqual({});
    });
  });

  describe('componentClasses', () => {
    it('Should include base item class.', () => {
      const wrapper = mountWithComposable({ item: { label: 'Item' } });

      expect(wrapper.vm.componentClasses).toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.itemEl),
      );
    });

    it('Should include disabled modifier when item is disabled.', () => {
      const wrapper = mountWithComposable({ item: { label: 'Item', disabled: true } });

      expect(wrapper.vm.componentClasses).toContain(defaultMock.itemDisabledModifier);
    });

    it('Should not include disabled modifier when item is not disabled.', () => {
      const wrapper = mountWithComposable({ item: { label: 'Item', disabled: false } });

      expect(wrapper.vm.componentClasses).not.toContain(defaultMock.itemDisabledModifier);
    });

    it('Should include has-children modifier when item has children.', () => {
      const wrapper = mountWithComposable({
        item: { label: 'Item', children: [{ label: 'Child' }] },
      });

      expect(wrapper.vm.componentClasses).toContain(defaultMock.itemHasChildrenModifier);
    });

    it('Should not include has-children modifier when item has no children.', () => {
      const wrapper = mountWithComposable({ item: { label: 'Item' } });

      expect(wrapper.vm.componentClasses).not.toContain(defaultMock.itemHasChildrenModifier);
    });

    it('Should include level modifier with default level 1.', () => {
      const wrapper = mountWithComposable({ item: { label: 'Item' } });

      expect(wrapper.vm.componentClasses).toContain(defaultMock.getItemLevelModifier(1));
    });

    it('Should include level modifier with provided level.', () => {
      const wrapper = mountWithComposable({ item: { label: 'Item' }, level: 3 });

      expect(wrapper.vm.componentClasses).toContain(defaultMock.getItemLevelModifier(3));
    });

    it('Should include sub-open modifier when isSubOpen is true.', async () => {
      const wrapper = mountWithComposable({
        item: { label: 'Item', children: [{ label: 'Child' }] },
      });

      wrapper.vm.isSubOpen = true;
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.componentClasses).toContain(defaultMock.itemSubOpenModifier);
    });

    it('Should not include sub-open modifier when isSubOpen is false.', () => {
      const wrapper = mountWithComposable({
        item: { label: 'Item', children: [{ label: 'Child' }] },
      });

      expect(wrapper.vm.componentClasses).not.toContain(defaultMock.itemSubOpenModifier);
    });
  });

  describe('linkClasses', () => {
    it('Should return __category class for plain items.', () => {
      const wrapper = mountWithComposable({ item: { label: 'Item' } });

      expect(wrapper.vm.linkClasses).toEqual(
        defaultMock.getSelectorWithoutDot(defaultMock.categoryEl),
      );
    });

    it('Should return __link class for action items.', () => {
      const wrapper = mountWithComposable({ item: { label: 'Item', action: vi.fn() } });

      expect(wrapper.vm.linkClasses).toEqual(defaultMock.getSelectorWithoutDot(defaultMock.linkEl));
    });

    it('Should return __link class for external items.', () => {
      const wrapper = mountWithComposable({
        item: { label: 'Item', href: 'https://example.com' },
      });

      expect(wrapper.vm.linkClasses).toEqual(defaultMock.getSelectorWithoutDot(defaultMock.linkEl));
    });

    it('Should return __link class for internal items.', () => {
      const wrapper = mountWithComposable({ item: { label: 'Item', href: '/dashboard' } }, true);

      expect(wrapper.vm.linkClasses).toEqual(defaultMock.getSelectorWithoutDot(defaultMock.linkEl));
    });

    it('Should return __link class for toggle items.', () => {
      const wrapper = mountWithComposable({
        item: { label: 'Item', children: [{ label: 'Child' }] },
      });

      expect(wrapper.vm.linkClasses).toEqual(defaultMock.getSelectorWithoutDot(defaultMock.linkEl));
    });
  });

  describe('clickHandler', () => {
    it('Should do nothing when item is disabled.', () => {
      const action = vi.fn();
      const wrapper = mountWithComposable({ item: { label: 'Item', action, disabled: true } });

      wrapper.vm.clickHandler();

      expect(action).not.toHaveBeenCalled();
      expect(mockProvider.close).not.toHaveBeenCalled();
      expect(mockProvider.emitItemClick).not.toHaveBeenCalled();
    });

    it('Should toggle isSubOpen when item has children and expandMode is "click".', async () => {
      mockProvider.expandMode = 'click';
      const wrapper = mountWithComposable({
        item: { label: 'Item', children: [{ label: 'Child' }] },
      });

      expect(wrapper.vm.isSubOpen).toBe(false);

      wrapper.vm.clickHandler();
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.isSubOpen).toBe(true);
    });

    it('Should toggle isSubOpen back to false on second click in "click" mode.', async () => {
      mockProvider.expandMode = 'click';
      const wrapper = mountWithComposable({
        item: { label: 'Item', children: [{ label: 'Child' }] },
      });

      wrapper.vm.clickHandler();
      await wrapper.vm.$nextTick();
      wrapper.vm.clickHandler();
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.isSubOpen).toBe(false);
    });

    it('Should not toggle isSubOpen when item has children and expandMode is "hover".', async () => {
      mockProvider.expandMode = 'hover';
      const item = { label: 'Item', children: [{ label: 'Child' }] };
      const wrapper = mountWithComposable({ item });

      wrapper.vm.clickHandler();
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.isSubOpen).toBe(false);
    });

    it('Should call action, emitItemClick and close when item has action.', () => {
      const action = vi.fn();
      const item = { label: 'Item', action };
      const wrapper = mountWithComposable({ item });

      wrapper.vm.clickHandler();

      expect(action).toHaveBeenCalledTimes(1);
      expect(mockProvider.emitItemClick).toHaveBeenCalledWith(item);
      expect(mockProvider.close).toHaveBeenCalledTimes(1);
    });

    it('Should call emitItemClick and close when item has href.', () => {
      const item = { label: 'Item', href: '/dashboard' };
      const wrapper = mountWithComposable({ item });

      wrapper.vm.clickHandler();

      expect(mockProvider.emitItemClick).toHaveBeenCalledWith(item);
      expect(mockProvider.close).toHaveBeenCalledTimes(1);
    });

    it('Should not call emitItemClick or close for plain item.', () => {
      const wrapper = mountWithComposable({ item: { label: 'Item' } });

      wrapper.vm.clickHandler();

      expect(mockProvider.emitItemClick).not.toHaveBeenCalled();
      expect(mockProvider.close).not.toHaveBeenCalled();
    });
  });

  describe('hoverHandler', () => {
    it('Should set isSubOpen to true when expandMode is "hover" and item has children.', async () => {
      mockProvider.expandMode = 'hover';
      const wrapper = mountWithComposable({
        item: { label: 'Item', children: [{ label: 'Child' }] },
      });

      wrapper.vm.hoverHandler();
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.isSubOpen).toBe(true);
    });

    it('Should do nothing when expandMode is "click".', async () => {
      mockProvider.expandMode = 'click';
      const wrapper = mountWithComposable({
        item: { label: 'Item', children: [{ label: 'Child' }] },
      });

      wrapper.vm.hoverHandler();
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.isSubOpen).toBe(false);
    });

    it('Should do nothing when item is disabled.', async () => {
      mockProvider.expandMode = 'hover';
      const wrapper = mountWithComposable({
        item: { label: 'Item', disabled: true, children: [{ label: 'Child' }] },
      });

      wrapper.vm.hoverHandler();
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.isSubOpen).toBe(false);
    });

    it('Should do nothing when item has no children.', async () => {
      mockProvider.expandMode = 'hover';
      const wrapper = mountWithComposable({ item: { label: 'Item' } });

      wrapper.vm.hoverHandler();
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.isSubOpen).toBe(false);
    });
  });

  describe('leaveHandler', () => {
    it('Should set isSubOpen to false when expandMode is "hover" and item has children.', async () => {
      mockProvider.expandMode = 'hover';
      const wrapper = mountWithComposable({
        item: { label: 'Item', children: [{ label: 'Child' }] },
      });

      wrapper.vm.isSubOpen = true;
      await wrapper.vm.$nextTick();

      wrapper.vm.leaveHandler();
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.isSubOpen).toBe(false);
    });

    it('Should do nothing when expandMode is "click".', async () => {
      mockProvider.expandMode = 'click';
      const wrapper = mountWithComposable({
        item: { label: 'Item', children: [{ label: 'Child' }] },
      });

      wrapper.vm.isSubOpen = true;
      await wrapper.vm.$nextTick();

      wrapper.vm.leaveHandler();
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.isSubOpen).toBe(true);
    });

    it('Should do nothing when item has no children.', async () => {
      mockProvider.expandMode = 'hover';
      const wrapper = mountWithComposable({ item: { label: 'Item' } });

      wrapper.vm.isSubOpen = true;
      await wrapper.vm.$nextTick();

      wrapper.vm.leaveHandler();
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.isSubOpen).toBe(true);
    });
  });

  describe('itemSlot', () => {
    it('Should be undefined when provider does not supply itemSlot.', () => {
      mockProvider.itemSlot = undefined;

      mount({
        template: '<div></div>',
        setup() {
          const { itemSlot } = useDropdownMenuItem({ item: { label: 'Item' } });

          expect(itemSlot).toBeUndefined();
        },
      });
    });

    it('Should expose itemSlot function from the provider.', () => {
      const slotFn = vi.fn();
      mockProvider.itemSlot = slotFn;

      mount({
        template: '<div></div>',
        setup() {
          const { itemSlot } = useDropdownMenuItem({ item: { label: 'Item' } });

          expect(itemSlot).toEqual(slotFn);
        },
      });
    });
  });

  describe('close', () => {
    it('Should expose close function from the provider.', () => {
      const wrapper = mountWithComposable({ item: { label: 'Item' } });

      wrapper.vm.close();

      expect(mockProvider.close).toHaveBeenCalledTimes(1);
    });
  });

  describe('Edge cases', () => {
    it('Should handle item with both action and children — action takes precedence in renderType.', () => {
      const wrapper = mountWithComposable({
        item: { label: 'Item', action: vi.fn(), children: [{ label: 'Child' }] },
      });

      expect(wrapper.vm.renderType).toEqual('action');
    });

    it('Should treat item with href and children as action=action, href takes precedence over toggle.', () => {
      const wrapper = mountWithComposable({
        item: { label: 'Item', href: '/path', children: [{ label: 'Child' }] },
      });

      expect(wrapper.vm.renderType).toEqual('internal');
    });

    it('Should not open sub-menu via hoverHandler when disabled, even in hover mode.', async () => {
      mockProvider.expandMode = 'hover';
      const wrapper = mountWithComposable({
        item: {
          label: 'Item',
          disabled: true,
          children: [{ label: 'Child' }],
        },
      });

      wrapper.vm.hoverHandler();
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.isSubOpen).toBe(false);
    });

    it('Should produce correct componentClasses with all modifiers active.', async () => {
      const wrapper = mountWithComposable({
        item: {
          label: 'Item',
          disabled: true,
          children: [{ label: 'Child' }],
        },
        level: 2,
      });

      wrapper.vm.isSubOpen = true;
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.componentClasses).toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.itemEl),
      );
      expect(wrapper.vm.componentClasses).toContain(defaultMock.itemDisabledModifier);
      expect(wrapper.vm.componentClasses).toContain(defaultMock.itemHasChildrenModifier);
      expect(wrapper.vm.componentClasses).toContain(defaultMock.itemSubOpenModifier);
      expect(wrapper.vm.componentClasses).toContain(defaultMock.getItemLevelModifier(2));
    });
  });
});
