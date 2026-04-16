import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import type { TDropdownMenuItemIconProps } from '../../components/DropdownMenuItemIcon/DropdownMenuItemIcon';
import useDropdownMenuItemIcon from '../../composables/useDropdownMenuItemIcon/useDropdownMenuItemIcon';
import { EDropdownMenuPropsDefault } from '../../types/DropdownMenu.enums';
import { DropdownMenuSelectorTestData } from '../../tests/test-data/DropdownMenu.selector.test-data';

const defaultMock = new DropdownMenuSelectorTestData();

const mockProps: TDropdownMenuItemIconProps = {
  icon: 'mdi-home',
};

vi.mock('@/shared/validators/vue/inject-strict.vue.validator', () => ({
  default: () => ({ cssClass: EDropdownMenuPropsDefault.CSS_CLASS }),
}));

describe('useDropdownMenuItemIcon', () => {
  describe('Basic functionality', () => {
    it('Should return expected structure.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const result = useDropdownMenuItemIcon(mockProps);

          expect(result).toHaveProperty('isIconString');
          expect(result).toHaveProperty('componentClasses');
        },
      });
    });
  });

  describe('isIconString', () => {
    it('Should return true if icon is a string.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { isIconString } = useDropdownMenuItemIcon(mockProps);

          expect(isIconString.value).toBe(true);
        },
      });
    });

    it('Should return true if icon is an empty string.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const props: TDropdownMenuItemIconProps = { icon: '' };
          const { isIconString } = useDropdownMenuItemIcon(props);

          expect(isIconString.value).toBe(true);
        },
      });
    });

    it('Should return false if icon is a Vue component object.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const props: TDropdownMenuItemIconProps = {
            icon: defaultMock.dummyIconComponent(),
          };
          const { isIconString } = useDropdownMenuItemIcon(props);

          expect(isIconString.value).toBe(false);
        },
      });
    });

    it('Should return false if icon is a plain object.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const props: TDropdownMenuItemIconProps = { icon: { template: '<i />' } };
          const { isIconString } = useDropdownMenuItemIcon(props);

          expect(isIconString.value).toBe(false);
        },
      });
    });

    it('Should return false if icon is a function.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const props: TDropdownMenuItemIconProps = { icon: () => ({}) };
          const { isIconString } = useDropdownMenuItemIcon(props);

          expect(isIconString.value).toBe(false);
        },
      });
    });

    it('Should return false if icon is undefined.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const props: TDropdownMenuItemIconProps = { icon: undefined };
          const { isIconString } = useDropdownMenuItemIcon(props);

          expect(isIconString.value).toBe(false);
        },
      });
    });
  });

  describe('componentClasses', () => {
    it('Should return correct BEM class for string icon.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const { componentClasses } = useDropdownMenuItemIcon(mockProps);

          expect(componentClasses.value).toBe(
            defaultMock.getSelectorWithoutDot(defaultMock.iconEl),
          );
        },
      });
    });

    it('Should return correct BEM class for Vue component icon.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const props: TDropdownMenuItemIconProps = {
            icon: defaultMock.dummyIconComponent(),
          };
          const { componentClasses } = useDropdownMenuItemIcon(props);

          expect(componentClasses.value).toBe(
            defaultMock.getSelectorWithoutDot(defaultMock.iconEl),
          );
        },
      });
    });

    it('Should return correct BEM class for undefined icon.', () => {
      mount({
        template: '<div></div>',
        setup() {
          const props: TDropdownMenuItemIconProps = { icon: undefined };
          const { componentClasses } = useDropdownMenuItemIcon(props);

          expect(componentClasses.value).toBe(
            defaultMock.getSelectorWithoutDot(defaultMock.iconEl),
          );
        },
      });
    });
  });
});
