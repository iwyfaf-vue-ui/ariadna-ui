import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import type { TDropdownMenuItemBadgeProps } from '../../components/DropdownMenuItemBadge/DropdownMenuItemBadge';
import useDropdownMenuItemBadge from '../../composables/useDropdownMenuItemBadge/useDropdownMenuItemBadge';
import { EDropdownMenuPropsDefault } from '../../types/DropdownMenu.enums';
import { DropdownMenuSelectorTestData } from '../../tests/test-data/DropdownMenu.selector.test-data';

const defaultMock = new DropdownMenuSelectorTestData();

const mockProps: TDropdownMenuItemBadgeProps = {
  badge: '5',
};

vi.mock('@/shared/validators/vue/inject-strict.vue.validator', () => ({
  default: () => ({ cssClass: EDropdownMenuPropsDefault.CSS_CLASS }),
}));

describe('useDropdownMenuItemBadge', () => {
  describe('Basic functionality', () => {
    it('Should return expected structure.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const result = useDropdownMenuItemBadge(mockProps);

          expect(result).toHaveProperty('isBadgeNotComponent');
          expect(result).toHaveProperty('componentClasses');
        },
      });
    });
  });

  describe('isBadgeNotComponent', () => {
    it('Should return true if badge is a string.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { isBadgeNotComponent } = useDropdownMenuItemBadge(mockProps);

          expect(isBadgeNotComponent.value).toBe(true);
        },
      });
    });

    it('Should return true if badge is a number.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const props: TDropdownMenuItemBadgeProps = { badge: 5 };
          const { isBadgeNotComponent } = useDropdownMenuItemBadge(props);

          expect(isBadgeNotComponent.value).toBe(true);
        },
      });
    });

    it('Should return true if badge is an empty string.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const props: TDropdownMenuItemBadgeProps = { badge: '' };
          const { isBadgeNotComponent } = useDropdownMenuItemBadge(props);

          expect(isBadgeNotComponent.value).toBe(true);
        },
      });
    });

    it('Should return true if badge is zero.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const props: TDropdownMenuItemBadgeProps = { badge: 0 };
          const { isBadgeNotComponent } = useDropdownMenuItemBadge(props);

          expect(isBadgeNotComponent.value).toBe(true);
        },
      });
    });

    it('Should return false if badge is a Vue component object.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const props: TDropdownMenuItemBadgeProps = {
            badge: defaultMock.dummyBadgeComponent(),
          };
          const { isBadgeNotComponent } = useDropdownMenuItemBadge(props);

          expect(isBadgeNotComponent.value).toBe(false);
        },
      });
    });

    it('Should return false if badge is a plain object.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const props: TDropdownMenuItemBadgeProps = { badge: { foo: 'bar' } };
          const { isBadgeNotComponent } = useDropdownMenuItemBadge(props);

          expect(isBadgeNotComponent.value).toBe(false);
        },
      });
    });

    it('Should return false if badge is a function.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const props: TDropdownMenuItemBadgeProps = { badge: () => 'Badge' };
          const { isBadgeNotComponent } = useDropdownMenuItemBadge(props);

          expect(isBadgeNotComponent.value).toBe(false);
        },
      });
    });
  });

  describe('componentClasses', () => {
    it('Should return correct BEM class for string badge.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { componentClasses } = useDropdownMenuItemBadge(mockProps);

          expect(componentClasses.value).toBe(
            defaultMock.getSelectorWithoutDot(defaultMock.badgeEl),
          );
        },
      });
    });

    it('Should return correct BEM class for number badge.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const props: TDropdownMenuItemBadgeProps = { badge: 10 };
          const { componentClasses } = useDropdownMenuItemBadge(props);

          expect(componentClasses.value).toBe(
            defaultMock.getSelectorWithoutDot(defaultMock.badgeEl),
          );
        },
      });
    });

    it('Should return correct BEM class for Vue component badge.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const props: TDropdownMenuItemBadgeProps = {
            badge: defaultMock.dummyBadgeComponent(),
          };
          const { componentClasses } = useDropdownMenuItemBadge(props);

          expect(componentClasses.value).toBe(
            defaultMock.getSelectorWithoutDot(defaultMock.badgeEl),
          );
        },
      });
    });

    it('Should return correct BEM class for undefined badge.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const props: TDropdownMenuItemBadgeProps = { badge: undefined };
          const { componentClasses } = useDropdownMenuItemBadge(props);

          expect(componentClasses.value).toBe(
            defaultMock.getSelectorWithoutDot(defaultMock.badgeEl),
          );
        },
      });
    });
  });
});
