import { describe, it, expect, vi, beforeEach } from 'vitest';
import { h, defineComponent } from 'vue';
import { mount } from '@vue/test-utils';
import useSidebarMenuItemIcon from '../../composables/useSidebarMenuItemIcon/useSidebarMenuItemIcon';
import type { TSidebarMenuItemIconProps } from '../../components/SidebarMenuItemIcon/SidebarMenuItemIcon';
import { ESidebarMenuPropsDefault } from '../../types/SidebarMenu.enums';
import { SidebarMenuSelectorTestData } from '../../tests/test-data/SidebarMenu.selector.test-data';

const defaultMock = new SidebarMenuSelectorTestData();

const mockProps: TSidebarMenuItemIconProps = {
  icon: 'mdi-home',
};

vi.mock('@/shared/validators/vue/inject-strict.vue.validator', () => ({
  default: () => ({ cssClass: ESidebarMenuPropsDefault.CSS_CLASS }),
}));

describe('useSidebarMenuItemIcon.ts: Basic functionality.', () => {
  it('Should return expected structure.', () => {
    mount({
      template: '<div></div>',
      setup() {
        const result = useSidebarMenuItemIcon(mockProps);

        expect(result).toHaveProperty('isIconString');
        expect(result).toHaveProperty('componentClasses');
      },
    });
  });
});

describe('useSidebarMenuItemIcon.ts: isIconString computed.', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Should return isIconString true if icon is string.', () => {
    mount({
      template: '<div></div>',
      setup() {
        const { isIconString } = useSidebarMenuItemIcon(mockProps);

        expect(isIconString.value).toBe(true);
      },
    });
  });

  it('Should return isIconString false if icon is component', () => {
    mount({
      template: '<div></div>',
      setup() {
        const DummyIcon = defineComponent({
          render() {
            return h('span');
          },
        });
        const props: TSidebarMenuItemIconProps = { icon: DummyIcon };
        const { isIconString } = useSidebarMenuItemIcon(props);

        expect(isIconString.value).toBe(false);
      },
    });
  });
});

describe('useSidebarMenuItemIcon.ts: componentClasses computed.', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Should compute correct componentClasses for string icon.', () => {
    mount({
      template: '<div></div>',
      setup() {
        const { componentClasses } = useSidebarMenuItemIcon(mockProps);

        expect(componentClasses.value).toBe(
          `mdi-home ${defaultMock.getSelectorWithoutDot(defaultMock.iconEl)}`,
        );
      },
    });
  });

  it('Should compute correct componentClasses for component icon.', () => {
    mount({
      template: '<div></div>',
      setup() {
        const DummyIcon = defineComponent({
          render() {
            return h('span');
          },
        });
        const props: TSidebarMenuItemIconProps = { icon: DummyIcon };
        const { componentClasses } = useSidebarMenuItemIcon(props);

        expect(componentClasses.value).toBe(defaultMock.getSelectorWithoutDot(defaultMock.iconEl));
      },
    });
  });
});
