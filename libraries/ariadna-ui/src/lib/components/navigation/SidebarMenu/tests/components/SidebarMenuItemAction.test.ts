import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import SidebarMenuItemAction from '../../components/SidebarMenuItemAction/SidebarMenuItemAction.vue';
import { ESidebarMenuPropsDefault } from '../../types/SidebarMenu.enums';
import { SidebarMenuSelectorTestData } from '../../tests/test-data/SidebarMenu.selector.test-data';
import { markRaw } from 'vue';

const defaultMock = new SidebarMenuSelectorTestData();

vi.mock('@/shared/validators/vue/inject-strict.vue.validator', () => ({
  default: () => ({ cssClass: ESidebarMenuPropsDefault.CSS_CLASS }),
}));

describe('SidebarMenuItemAction.vue: Basic render.', () => {
  const wrapper = mount(SidebarMenuItemAction, {
    props: {
      action: vi.fn(),
      actionIcon: 'mdi-action',
    },
  });

  it('Should mount without errors.', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Should render as a span element.', () => {
    expect(wrapper.element.tagName).toEqual('SPAN');
  });

  it('Should render string icon as <i> with correct class.', () => {
    const wrapper = mount(SidebarMenuItemAction, {
      props: {
        action: vi.fn(),
        actionIcon: 'mdi-action',
      },
    });

    expect(wrapper.find('span').classes()).toContain(
      defaultMock.getSelectorWithoutDot(defaultMock.actionEl),
    );
  });

  it('Should render component icon via <component>.', () => {
    const dummyIconComponent = defaultMock.dummyIconComponent();

    const wrapper = mount(SidebarMenuItemAction, {
      props: {
        action: vi.fn(),
        actionIcon: markRaw(dummyIconComponent),
      },
    });

    expect(wrapper.findComponent(dummyIconComponent).exists()).toBe(true);
  });
});

describe('SidebarMenuItemAction.vue: Props.', () => {
  it('action: Should call action prop callback on click.', async () => {
    const action = vi.fn();
    const wrapper = mount(SidebarMenuItemAction, {
      props: {
        action: action,
        actionIcon: 'mdi-action',
      },
    });

    await wrapper.trigger('click');
    expect(action).toHaveBeenCalledTimes(1);
  });

  it('action: Should not throw if action is not a function.', async () => {
    const wrapper = mount(SidebarMenuItemAction, {
      props: { action: undefined, actionIcon: 'mdi-action' },
      global: {
        config: {
          warnHandler: () => {}, // отключаем предупреждение о неправильном формате props
        },
      },
    });

    expect(() => wrapper.trigger('click')).not.toThrow();
  });

  it('actionIcon: Should render string actionIcon as <i> with correct class.', () => {
    const wrapper = mount(SidebarMenuItemAction, {
      props: { action: vi.fn(), actionIcon: 'mdi-action' },
    });

    expect(wrapper.classes()).toContain(defaultMock.getSelectorWithoutDot(defaultMock.actionEl));
  });

  it('actionIcon: Should render component actionIcon via <component>.', () => {
    const dummyIconComponent = defaultMock.dummyIconComponent();

    const wrapper = mount(SidebarMenuItemAction, {
      props: { action: vi.fn(), actionIcon: markRaw(dummyIconComponent) },
    });

    expect(wrapper.findComponent(dummyIconComponent).exists()).toBe(true);
  });
});

describe('SidebarMenuItemAction.vue: Accessibility.', () => {
  it('Should set tabindex=0.', () => {
    const wrapper = mount(SidebarMenuItemAction, {
      props: {
        action: vi.fn(),
        actionIcon: 'mdi-action',
      },
    });

    expect(wrapper.attributes('tabindex')).toBe('0');
  });
});
