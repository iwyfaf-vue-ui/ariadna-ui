import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, h, markRaw } from 'vue';
import SidebarMenuItemIcon from '../../components/SidebarMenuItemIcon/SidebarMenuItemIcon.vue';
import { ESidebarMenuPropsDefault } from '../../types/SidebarMenu.enums';
import { SidebarMenuSelectorTestData } from '../../tests/test-data/SidebarMenu.selector.test-data';

const defaultMock = new SidebarMenuSelectorTestData();

vi.mock('@/shared/validators/vue/inject-strict.vue.validator', () => ({
  default: () => ({ cssClass: ESidebarMenuPropsDefault.CSS_CLASS }),
}));

const DummyIconComponent = defineComponent({
  name: 'DummyIconComponent',
  render() {
    return h('span', 'dummy');
  },
});

describe('SidebarMenuItemIcon.vue: Basic render.', () => {
  const wrapper = mount(SidebarMenuItemIcon, {
    props: {
      icon: 'mdi-icon',
    },
  });

  it('Should mount without errors.', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Should render as a span element.', () => {
    expect(wrapper.element.tagName).toEqual('SPAN');
  });

  it('Should render component with default props.', () => {
    let warningMessage = '';

    const wrapper = mount(SidebarMenuItemIcon, {
      global: {
        config: {
          warnHandler: (msg) => {
            warningMessage = msg;
          },
        },
      },
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.classes()).toContain(defaultMock.getSelectorWithoutDot(defaultMock.iconEl));
    expect(warningMessage).toContain('Missing required prop: "icon"');
  });
});

describe('SidebarMenuItemIcon.vue: Props.', () => {
  it('icon: Should render icon when "icon" prop is provided.', () => {
    const wrapper = mount(SidebarMenuItemIcon, {
      props: { icon: 'mdi-home' },
    });

    expect(wrapper.find('.mdi-home').exists()).toBe(true);
  });

  it('icon: Should render Vue component badge.', () => {
    const wrapper = mount(SidebarMenuItemIcon, {
      props: { icon: markRaw(DummyIconComponent) },
    });

    expect(wrapper.findComponent(DummyIconComponent).exists()).toBe(true);
  });

  it('icon: Should render function badge as component.', () => {
    const badgeFn = () => h('span', 'fn');

    const wrapper = mount(SidebarMenuItemIcon, {
      props: { icon: badgeFn },
    });
    expect(wrapper.find('span').text()).toBe('fn');
  });
});

describe('SidebarMenuItemIcon.vue: Accessibility.', () => {
  it('Should set aria-hidden="true" on root element.', () => {
    const wrapper = mount(SidebarMenuItemIcon, {
      props: { icon: 'mdi-home' },
    });

    expect(wrapper.attributes('aria-hidden')).toBe('true');
  });
});
