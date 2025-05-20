import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { ref, defineComponent, h } from 'vue';
import useSidebarMenuItem from '../../composables/useSidebarMenuItem/useSidebarMenuItem';
import type { TSidebarMenuItemProps } from '../../components/SidebarMenuItem/SidebarMenuItem';
import { ESidebarMenuPropsDefault } from '../../types/SidebarMenu.enums';
import { SidebarMenuSelectorTestData } from '../../tests/test-data/SidebarMenu.selector.test-data';

const defaultMock = new SidebarMenuSelectorTestData();

const mockProps: TSidebarMenuItemProps = {
  item: {
    title: 'Test',
    href: '/test',
  },
  level: 1,
};

vi.mock('@/shared/validators/vue/inject-strict.vue.validator', () => ({
  default: () => ({
    cssClass: ESidebarMenuPropsDefault.CSS_CLASS,
    collapsed: ref(false),
    rememberExpanded: false,
  }),
}));

const mockEvent = { preventDefault: vi.fn(), stopPropagation: vi.fn() } as unknown as MouseEvent;

describe('useSidebarMenuItem', () => {
  describe('Basic functionality', () => {
    it('Should return expected structure.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const result = useSidebarMenuItem(mockProps);

          expect(result).toHaveProperty('cssClass');
          expect(result).toHaveProperty('isOpen');
          expect(result).toHaveProperty('isHover');
          expect(result).toHaveProperty('isHidden');
          expect(result).toHaveProperty('hasChildren');
          expect(result).toHaveProperty('children');
          expect(result).toHaveProperty('componentClasses');
          expect(result).toHaveProperty('isMenuItemActiveComputed');
          expect(result).toHaveProperty('onMouseEnter');
          expect(result).toHaveProperty('onMouseLeave');
          expect(result).toHaveProperty('onToggle');
          expect(result).toHaveProperty('onExpandEnter');
          expect(result).toHaveProperty('onExpandAfterEnter');
          expect(result).toHaveProperty('onExpandBeforeLeave');
        },
      });
    });
  });

  describe('cssClass Inject', () => {
    it('Should return correct cssClass from inject.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { cssClass } = useSidebarMenuItem(mockProps);

          expect(cssClass).toBe(defaultMock.getSelectorWithoutDot(defaultMock.rootEl));
        },
      });
    });
  });

  describe('isOpen Ref', () => {
    it('Should be false by default if item.expand is not set.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { isOpen } = useSidebarMenuItem(mockProps);

          expect(isOpen.value).toBe(false);
        },
      });
    });

    it('Should be true if item.expand is true.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { isOpen } = useSidebarMenuItem({
            ...mockProps,
            item: {
              ...mockProps.item,
              expand: true,
            },
          });

          expect(isOpen.value).toBe(true);
        },
      });
    });

    it('Should be false if item.expand is false', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { isOpen } = useSidebarMenuItem({
            ...mockProps,
            item: {
              ...mockProps.item,
              expand: false,
            },
          });

          expect(isOpen.value).toBe(false);
        },
      });
    });

    it('Should not close isOpen when item.expand changes to false (only opens).', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { isOpen } = useSidebarMenuItem({
            ...mockProps,
            item: {
              ...mockProps.item,
              expand: true,
            },
          });

          expect(isOpen.value).toBe(true);

          mockProps.item.expand = false;
          expect(isOpen.value).toBe(true);
        },
      });
    });
  });

  describe('isHover Ref', () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('Should be false by default.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { isHover } = useSidebarMenuItem(mockProps);

          expect(isHover.value).toBe(false);
        },
      });
    });

    it('Should be true after onMouseEnter.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { onMouseEnter, isHover } = useSidebarMenuItem(mockProps);

          onMouseEnter(mockEvent);

          expect(isHover.value).toBe(true);
        },
      });
    });

    it('Should be false after onMouseLeave.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { onMouseEnter, isHover, onMouseLeave } = useSidebarMenuItem(mockProps);

          onMouseEnter(mockEvent);
          expect(isHover.value).toBe(true);

          onMouseLeave(mockEvent);
          expect(isHover.value).toBe(false);
        },
      });
    });
  });

  describe('isHidden Ref', () => {
    it('Should return false if item.hidden is undefined.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { isHidden } = useSidebarMenuItem(mockProps);

          expect(isHidden.value).toBe(false);
        },
      });
    });

    it('Should return false if item.hidden is false.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { isHidden } = useSidebarMenuItem({
            ...mockProps,
            item: {
              ...mockProps.item,
              hidden: false,
            },
          });

          expect(isHidden.value).toBe(false);
        },
      });
    });

    it('Should return false if item.hidden is true.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { isHidden } = useSidebarMenuItem({
            ...mockProps,
            item: {
              ...mockProps.item,
              hidden: true,
            },
          });

          expect(isHidden.value).toBe(true);
        },
      });
    });
  });

  describe('isMenuItemActiveComputed Ref', () => {
    function mountWithComposable(props: TSidebarMenuItemProps, route = { path: '/' }) {
      return mount(
        defineComponent({
          setup() {
            const result = useSidebarMenuItem(props);
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

    it('Should return false if item is not active.', () => {
      const item = { title: 'Main', href: '/' };
      const wrapper = mountWithComposable(mockProps, { path: '/dashboard' });
      const isActive = wrapper.vm.isMenuItemActiveComputed(item);

      expect(isActive).toBe(false);
    });

    it('Should return true if item is active.', () => {
      const item = { title: 'Dashboard', href: '/dashboard' };
      const wrapper = mountWithComposable(mockProps, { path: '/dashboard' });
      const isActive = wrapper.vm.isMenuItemActiveComputed(item);

      expect(isActive).toBe(true);
    });
  });

  describe('hasChildren ComputedRef', () => {
    it('Should return false if item.children is undefined.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { hasChildren } = useSidebarMenuItem(mockProps);

          expect(hasChildren.value).toBe(false);
        },
      });
    });

    it('Should return false if item.children is null.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { hasChildren } = useSidebarMenuItem({
            ...mockProps,
            item: {
              ...mockProps.item,
              children: null as any,
            },
          });

          expect(hasChildren.value).toBe(false);
        },
      });
    });

    it('Should return false if item.children is empty array.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { hasChildren } = useSidebarMenuItem({
            ...mockProps,
            item: {
              ...mockProps.item,
              children: [],
            },
          });

          expect(hasChildren.value).toBe(false);
        },
      });
    });

    it('Should return true if item.children is non-empty array.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { hasChildren } = useSidebarMenuItem({
            ...mockProps,
            item: {
              ...mockProps.item,
              children: [{ title: 'Child' }],
            },
          });

          expect(hasChildren.value).toBe(true);
        },
      });
    });

    it('Should return false if item.children is not an array (string)', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { hasChildren } = useSidebarMenuItem({
            ...mockProps,
            item: {
              ...mockProps.item,
              children: 'not-an-array' as any,
            },
          });

          expect(hasChildren.value).toBe(false);
        },
      });
    });

    it('Should return false if item.children is not an array (object)', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { hasChildren } = useSidebarMenuItem({
            ...mockProps,
            item: {
              ...mockProps.item,
              children: { foo: 'bar' } as any,
            },
          });

          expect(hasChildren.value).toBe(false);
        },
      });
    });
  });

  describe('children ComputedRef', () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('Should return empty array if item.children is undefined.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { children } = useSidebarMenuItem(mockProps);

          expect(children.value).toEqual([]);
        },
      });
    });

    it('Should return empty array if item.children is null.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { children } = useSidebarMenuItem({
            ...mockProps,
            item: {
              ...mockProps.item,
              children: null as any,
            },
          });

          expect(children.value).toEqual([]);
        },
      });
    });

    it('Should return empty array if item.children is empty array.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { children } = useSidebarMenuItem({
            ...mockProps,
            item: {
              ...mockProps.item,
              children: [],
            },
          });

          expect(children.value).toEqual([]);
        },
      });
    });

    it('Should return array with one element if item.children has one child.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const child = { title: 'Child' };
          const { children } = useSidebarMenuItem({
            ...mockProps,
            item: {
              ...mockProps.item,
              children: [child],
            },
          });

          expect(children.value).toEqual([child]);
        },
      });
    });

    it('Should return empty array if item.children is a string.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { children } = useSidebarMenuItem({
            ...mockProps,
            item: {
              ...mockProps.item,
              children: 'not-an-array' as any,
            },
          });

          expect(children.value).toEqual([]);
        },
      });
    });

    it('Should return empty array if item.children is an object.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { children } = useSidebarMenuItem({
            ...mockProps,
            item: {
              ...mockProps.item,
              children: { foo: 'bar' } as any,
            },
          });

          expect(children.value).toEqual([]);
        },
      });
    });
  });

  describe('componentClasses ComputedRef', () => {
    it('Should return base class for simple item.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { componentClasses } = useSidebarMenuItem(mockProps);

          expect(componentClasses.value).toBe(
            `${defaultMock.getSelectorWithoutDot(defaultMock.itemEl)} ${defaultMock.getSelectorWithoutDot(defaultMock.itemLevelModifier)}1`,
          );
        },
      });
    });

    it('Should add active class if item is active.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { componentClasses } = useSidebarMenuItem({
            ...mockProps,
            active: true,
          });

          expect(componentClasses.value).toBe(
            `${defaultMock.getSelectorWithoutDot(defaultMock.itemEl)} ${defaultMock.getSelectorWithoutDot(defaultMock.itemOpenModifier)} ${defaultMock.getSelectorWithoutDot(defaultMock.itemLevelModifier)}1`,
          );
        },
      });
    });

    it('Should add active class if isOpen is true.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { componentClasses, isOpen } = useSidebarMenuItem({
            ...mockProps,
            item: {
              ...mockProps.item,
            },
          });
          isOpen.value = true;

          expect(componentClasses.value).toContain(
            defaultMock.getSelectorWithoutDot(defaultMock.itemOpenModifier),
          );
        },
      });
    });

    it('Should add disabled class if item is disabled.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { componentClasses } = useSidebarMenuItem({
            ...mockProps,
            item: {
              ...mockProps.item,
              disabled: true,
            },
          });

          expect(componentClasses.value).toBe(
            `${defaultMock.getSelectorWithoutDot(defaultMock.itemEl)} ${defaultMock.getSelectorWithoutDot(defaultMock.itemDisabledModifier)} ${defaultMock.getSelectorWithoutDot(defaultMock.itemLevelModifier)}1`,
          );
        },
      });
    });

    it('Should combine open and disabled.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { componentClasses } = useSidebarMenuItem({
            ...mockProps,
            item: {
              ...mockProps.item,
              disabled: true,
              children: [{ title: 'Child' }],
            },
            active: true,
          });

          expect(componentClasses.value).toContain(
            defaultMock.getSelectorWithoutDot(defaultMock.itemOpenModifier),
          );
          expect(componentClasses.value).toContain(
            defaultMock.getSelectorWithoutDot(defaultMock.itemDisabledModifier),
          );
        },
      });
    });
  });

  describe('onMouseEnter Function', () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('Should set isHover to true after onMouseLeave call.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { isHover, onMouseEnter } = useSidebarMenuItem(mockProps);

          expect(isHover.value).toBe(false);

          onMouseEnter(mockEvent);

          expect(isHover.value).toBe(true);
        },
      });
    });

    it('Should call stopPropagation on event in onMouseEnter.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { onMouseEnter } = useSidebarMenuItem(mockProps);

          onMouseEnter(mockEvent);

          expect(mockEvent.stopPropagation).toHaveBeenCalledTimes(1);
        },
      });
    });
  });

  describe('onMouseLeave Function', () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('Should set isHover to false after onMouseLeave call.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { isHover, onMouseLeave } = useSidebarMenuItem(mockProps);

          isHover.value = true;
          onMouseLeave(mockEvent);

          expect(isHover.value).toBe(false);
        },
      });
    });

    it('Should not throw if called when isHover is already false.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { isHover, onMouseLeave } = useSidebarMenuItem(mockProps);

          isHover.value = false;

          expect(() => onMouseLeave(mockEvent)).not.toThrow();
          expect(isHover.value).toBe(false);
        },
      });
    });
  });

  describe('onToggle Function', () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('Should toggle isOpen from false to true.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { isOpen, onToggle } = useSidebarMenuItem(mockProps);

          isOpen.value = false;
          onToggle(mockEvent);

          expect(isOpen.value).toBe(true);
        },
      });
    });

    it('Should toggle isOpen from true to false.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { isOpen, onToggle } = useSidebarMenuItem(mockProps);

          isOpen.value = true;
          onToggle(mockEvent);

          expect(isOpen.value).toBe(false);
        },
      });
    });

    it('Should not throw if called multiple times.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { onToggle } = useSidebarMenuItem(mockProps);

          expect(() => {
            onToggle(mockEvent);
            onToggle(mockEvent);
            onToggle(mockEvent);
          }).not.toThrow();
        },
      });
    });
  });

  describe('onExpandEnter Function', () => {
    let mockElement: HTMLElement;

    beforeEach(() => {
      mockElement = {
        scrollHeight: 100,
        style: {
          height: '',
        },
      } as unknown as HTMLElement;
    });

    it('Should set maxHeight style if el is provided.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { onExpandEnter } = useSidebarMenuItem(mockProps);
          onExpandEnter(mockElement);

          expect(mockElement.style.height).toBe('100px');
        },
      });
    });

    it('Should throw TypeError if el is null.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { onExpandEnter } = useSidebarMenuItem(mockProps);

          expect(() => {
            onExpandEnter(null as unknown as HTMLElement);
          }).toThrowError(TypeError);
        },
      });
    });
  });

  describe('onExpandEnter Function', () => {
    let mockElement: HTMLElement;

    beforeEach(() => {
      mockElement = {
        scrollHeight: 100,
        style: {
          height: '',
        },
      } as unknown as HTMLElement;
    });

    it('Should set maxHeight style if el is provided.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { onExpandEnter } = useSidebarMenuItem(mockProps);

          onExpandEnter(mockElement);

          expect(mockElement.style.height).toBe('100px');
        },
      });
    });

    it('Should throw TypeError if el is null.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { onExpandEnter } = useSidebarMenuItem(mockProps);

          expect(() => {
            onExpandEnter(null as unknown as HTMLElement);
          }).toThrowError(TypeError);
        },
      });
    });
  });

  describe('onExpandAfterEnter Function', () => {
    let mockElement: HTMLElement;

    beforeEach(() => {
      mockElement = {
        scrollHeight: 100,
        style: {
          height: '',
        },
      } as unknown as HTMLElement;
    });

    it('Should set height to auto if el is provided.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { onExpandAfterEnter } = useSidebarMenuItem(mockProps);

          onExpandAfterEnter(mockElement);

          expect(mockElement.style.height).toBe('auto');
        },
      });
    });

    it('Should throw TypeError if el is null.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { onExpandAfterEnter } = useSidebarMenuItem(mockProps);

          expect(() => {
            onExpandAfterEnter(null as unknown as HTMLElement);
          }).toThrowError(TypeError);
        },
      });
    });
  });

  describe('onExpandBeforeLeave Function', () => {
    let mockElement: HTMLElement;

    beforeEach(() => {
      mockElement = {
        scrollHeight: 100,
        style: {
          height: '',
        },
      } as unknown as HTMLElement;
    });

    it('Should not unset height to empty string if el is provided and collapsed = "false".', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { onExpandBeforeLeave } = useSidebarMenuItem(mockProps);

          onExpandBeforeLeave(mockElement);

          expect(mockElement.style.height).toBe('100px');
        },
      });
    });

    it('Should throw TypeError if el is null.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { onExpandBeforeLeave } = useSidebarMenuItem(mockProps);

          expect(() => {
            onExpandBeforeLeave(null as unknown as HTMLElement);
          }).toThrowError(TypeError);
        },
      });
    });
  });
});
