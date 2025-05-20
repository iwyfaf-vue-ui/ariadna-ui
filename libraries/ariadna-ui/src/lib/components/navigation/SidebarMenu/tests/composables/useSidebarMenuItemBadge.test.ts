import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import type { TSidebarMenuItemBadgeProps } from '../../components/SidebarMenuItemBadge/SidebarMenuItemBadge';
import useSidebarMenuItemBadge from '../../composables/useSidebarMenuItemBadge/useSidebarMenuItemBadge';
import { ESidebarMenuPropsDefault } from '../../types/SidebarMenu.enums';
import { SidebarMenuSelectorTestData } from '../../tests/test-data/SidebarMenu.selector.test-data';

const defaultMock = new SidebarMenuSelectorTestData();

const mockProps: TSidebarMenuItemBadgeProps = {
  badge: '5',
};

vi.mock('@/shared/validators/vue/inject-strict.vue.validator', () => ({
  default: () => ({ cssClass: ESidebarMenuPropsDefault.CSS_CLASS }),
}));

describe('useSidebarMenuItemBadge', () => {
  describe('Basic functionality', () => {
    it('Should return expected structure.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const result = useSidebarMenuItemBadge(mockProps);

          expect(result).toHaveProperty('isBadgeNotComponent');
          expect(result).toHaveProperty('componentClasses');
        },
      });
    });
  });

  describe('isBadgeNotComponent ComputedRef', () => {
    it('Should return true if badge is a string.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { isBadgeNotComponent } = useSidebarMenuItemBadge(mockProps);

          expect(isBadgeNotComponent.value).toBe(true);
        },
      });
    });

    it('Should return true if badge is a number.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const props: TSidebarMenuItemBadgeProps = { badge: 5 };
          const { isBadgeNotComponent } = useSidebarMenuItemBadge(props);

          expect(isBadgeNotComponent.value).toBe(true);
        },
      });
    });

    it('Should return false if badge is a Vue component.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const props: TSidebarMenuItemBadgeProps = { badge: defaultMock.dummyBadgeComponent };
          const { isBadgeNotComponent } = useSidebarMenuItemBadge(props);

          expect(isBadgeNotComponent.value).toBe(false);
        },
      });
    });

    it('Should return false if badge is an object.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const props: TSidebarMenuItemBadgeProps = { badge: { foo: 'bar' } };
          const { isBadgeNotComponent } = useSidebarMenuItemBadge(props);

          expect(isBadgeNotComponent.value).toBe(false);
        },
      });
    });

    it('Should return false if badge is a function.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const props: TSidebarMenuItemBadgeProps = { badge: () => 'Dummy' };
          const { isBadgeNotComponent } = useSidebarMenuItemBadge(props);

          expect(isBadgeNotComponent.value).toBe(false);
        },
      });
    });
  });

  describe('componentClasses computed', () => {
    it('Should return correct componentClasses for string badge.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { componentClasses } = useSidebarMenuItemBadge(mockProps);

          expect(componentClasses.value).toBe(
            defaultMock.getSelectorWithoutDot(defaultMock.badgeEl),
          );
        },
      });
    });

    it('Should return correct componentClasses for number badge.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const props: TSidebarMenuItemBadgeProps = { badge: 10 };
          const { componentClasses } = useSidebarMenuItemBadge(props);

          expect(componentClasses.value).toBe(
            defaultMock.getSelectorWithoutDot(defaultMock.badgeEl),
          );
        },
      });
    });

    it('Should return correct componentClasses for component badge.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const props: TSidebarMenuItemBadgeProps = { badge: defaultMock.dummyBadgeComponent };
          const { componentClasses } = useSidebarMenuItemBadge(props);

          expect(componentClasses.value).toBe(
            defaultMock.getSelectorWithoutDot(defaultMock.badgeEl),
          );
        },
      });
    });

    it('Should return correct componentClasses for undefined badge.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const props: TSidebarMenuItemBadgeProps = { badge: undefined };
          const { componentClasses } = useSidebarMenuItemBadge(props);

          expect(componentClasses.value).toBe(
            defaultMock.getSelectorWithoutDot(defaultMock.badgeEl),
          );
        },
      });
    });
  });
});
