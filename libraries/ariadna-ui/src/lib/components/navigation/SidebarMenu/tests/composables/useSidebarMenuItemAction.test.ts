import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import type { TSidebarMenuItemActionProps } from '../../components/SidebarMenuItemAction/SidebarMenuItemAction';
import useSidebarMenuItemAction from '../../composables/useSidebarMenuItemAction/useSidebarMenuItemAction';
import { ESidebarMenuPropsDefault } from '../../types/SidebarMenu.enums';
import { SidebarMenuSelectorTestData } from '../../tests/test-data/SidebarMenu.selector.test-data';

const defaultMock = new SidebarMenuSelectorTestData();

const mockProps: TSidebarMenuItemActionProps = {
  action: () => console.log('mocked action'),
  actionIcon: 'mdi-action',
};

vi.mock('@/shared/validators/vue/inject-strict.vue.validator', () => ({
  default: () => ({ cssClass: ESidebarMenuPropsDefault.CSS_CLASS }),
}));

describe('useSidebarMenuItemAction', () => {
  describe('Basic functionality', () => {
    it('Should return expected structure.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const result = useSidebarMenuItemAction(mockProps);

          expect(result).toHaveProperty('isActionString');
          expect(result).toHaveProperty('componentClasses');
        },
      });
    });
  });

  describe('isActionString ComputedRef', () => {
    it('Should return true if actionIcon is a string.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { isActionString } = useSidebarMenuItemAction(mockProps);

          expect(isActionString.value).toBe(true);
        },
      });
    });

    it('Should return false if actionIcon is a component.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { isActionString } = useSidebarMenuItemAction({
            ...mockProps,
            actionIcon: defaultMock.dummyIconComponent(),
          });

          expect(isActionString.value).toBe(false);
        },
      });
    });
  });

  describe('componentClasses ComputedRef', () => {
    it('Should return correct componentClasses for string actionIcon.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { componentClasses } = useSidebarMenuItemAction(mockProps);

          expect(componentClasses.value).toBe(
            defaultMock.getSelectorWithoutDot(defaultMock.actionEl),
          );
        },
      });
    });

    it('Should return correct componentClasses for component actionIcon.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { componentClasses } = useSidebarMenuItemAction({
            ...mockProps,
            actionIcon: defaultMock.dummyIconComponent(),
          });

          expect(componentClasses.value).toBe(
            defaultMock.getSelectorWithoutDot(defaultMock.actionEl),
          );
        },
      });
    });
  });
});
