import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import Panel from '../../Panel.vue';
import type { TPanelToggleEvent } from '../../Panel';
import { PanelSelectorTestData } from '../test-data/Panel.selector.test-data';
import Button from '@/lib/components/buttons/Button/Button.vue';

const defaultMock = new PanelSelectorTestData();

describe('Panel.vue', () => {
  describe('Basic render', () => {
    const wrapper = mount(Panel, {
      props: {},
    });

    it('Should render component without errors.', () => {
      expect(wrapper.exists()).toBe(true);
    });

    it('Should apply default root CSS class.', () => {
      expect(wrapper.classes()).toContain(defaultMock.getSelectorWithoutDot(defaultMock.rootEl));
    });

    it('Should render header element.', () => {
      expect(wrapper.find('div').exists()).toBe(true);
      expect(wrapper.find(defaultMock.getSelectorWithDot(defaultMock.rootEl)).exists()).toBe(true);
    });
  });

  describe('Props', () => {
    it('header: Should render header text from prop when header slot is not provided.', async () => {
      const wrapper = mount(Panel, {
        props: {
          header: defaultMock.headerProp,
        },
      });

      const header = wrapper.find(defaultMock.headerEl);

      expect(header.exists()).toBe(true);
      expect(header.text()).toContain(defaultMock.headerProp);
    });

    it('toggleable: Should not render header container when header prop/slot are absent and toggleable is false.', async () => {
      const wrapper = mount(Panel, {
        props: {
          toggleable: false,
        },
      });

      expect(wrapper.find(defaultMock.headerEl).exists()).toBe(false);
    });

    it('toggleable: Should render header container when toggleable is true even if header prop/slot are absent.', async () => {
      const wrapper = mount(Panel, {
        props: {
          toggleable: true,
        },
      });

      expect(wrapper.find(defaultMock.headerEl).exists()).toBe(true);
    });

    it('collapsed: Should apply collapsed modifier class when collapsed is true.', async () => {
      const wrapper = mount(Panel, {
        props: {
          toggleable: true,
          collapsed: true,
        },
      });

      expect(wrapper.classes()).toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.collapsedModifier),
      );
    });

    it('cssClass: Should apply custom root class and generate BEM child classes.', async () => {
      const _defaultMock = new PanelSelectorTestData(defaultMock.cssClassProp);

      const wrapper = mount(Panel, {
        props: {
          toggleable: true,
          collapsed: true,
          cssClass: defaultMock.cssClassProp,
          modifier: defaultMock.modifierProp,
        },
        slots: {
          default: await PanelSelectorTestData.getPanelDefaultSlotCustom(),
          header: await PanelSelectorTestData.getPanelHeaderSlotCustom(),
          icons: await PanelSelectorTestData.getPanelIconsSlotCustom(),
          toggleButton: await PanelSelectorTestData.getPanelToggleButtonSlotCustom(),
          toggleIcon: await PanelSelectorTestData.getPanelToggleIconSlotCustom(),
          footer: await PanelSelectorTestData.getPanelFooterSlotCustom(),
        },
      });

      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.rootEl)).exists()).toBe(true);
      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.headerEl)).exists()).toBe(
        true,
      );
      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.iconsEl)).exists()).toBe(
        true,
      );
      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.expanderEl)).exists()).toBe(
        true,
      );
      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.innerEl)).exists()).toBe(
        true,
      );
      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.contentEl)).exists()).toBe(
        true,
      );
      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.footerEl)).exists()).toBe(
        true,
      );
      expect(
        wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.themeModifier)).exists(),
      ).toBe(true);
      expect(
        wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.primaryModifier)).exists(),
      ).toBe(true);
      expect(
        wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.collapsedModifier)).exists(),
      ).toBe(true);
    });

    it('modifier: Should apply modifier class.', async () => {
      const wrapper = mount(Panel, {
        props: {
          modifier: defaultMock.modifierProp,
        },
      });

      expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.primaryModifier);
    });
  });

  describe('Slots', () => {
    it('default: Should render default slot if provided.', async () => {
      const wrapper = mount(Panel, {
        slots: {
          default: await PanelSelectorTestData.getPanelDefaultSlotCustom(),
        },
      });

      expect(wrapper.find(defaultMock.getSelectorWithDot(defaultMock.contentEl)).exists()).toBe(
        true,
      );
      expect(wrapper.find(defaultMock.contentEl).element.innerHTML).toBe(
        (await PanelSelectorTestData.getPanelDefaultSlotCustom()).trim(),
      );
    });

    it('header: Should render header slot if provided.', async () => {
      const wrapper = mount(Panel, {
        slots: {
          header: await PanelSelectorTestData.getPanelHeaderSlotCustom(),
        },
      });

      expect(wrapper.find(defaultMock.getSelectorWithDot(defaultMock.headerEl)).exists()).toBe(
        true,
      );
      expect(wrapper.find(defaultMock.headerEl).element.innerHTML).toContain(
        (await PanelSelectorTestData.getPanelHeaderSlotCustom()).trim(),
      );
    });

    it('icons: Should render icons slot if provided.', async () => {
      const wrapper = mount(Panel, {
        slots: {
          header: await PanelSelectorTestData.getPanelHeaderSlotCustom(),
          icons: await PanelSelectorTestData.getPanelIconsSlotCustom(),
        },
      });

      expect(wrapper.find(defaultMock.getSelectorWithDot(defaultMock.iconsEl)).exists()).toBe(true);
      expect(wrapper.find(defaultMock.iconsEl).element.innerHTML).toBe(
        (await PanelSelectorTestData.getPanelIconsSlotCustom()).trim(),
      );
    });

    it('toggleButton: Should render default toggleButton slot.', async () => {
      const wrapper = mount(Panel, {
        props: {
          toggleable: true,
        },
        slots: {
          header: await PanelSelectorTestData.getPanelHeaderSlotCustom(),
        },
      });

      const button = wrapper
        .find(defaultMock.getSelectorWithDot(defaultMock.expanderEl))
        .findComponent(Button);
      expect(button.exists()).toBe(true);

      expect(wrapper.find(defaultMock.getSelectorWithDot(defaultMock.expanderEl)).exists()).toBe(
        true,
      );
      expect(wrapper.find(defaultMock.expanderEl).element.innerHTML).toBe(
        (await PanelSelectorTestData.getPanelToggleButtonSlotDefault()).trim(),
      );
    });

    it('toggleButton: Should render toggleButton slot if provided.', async () => {
      const wrapper = mount(Panel, {
        props: {
          toggleable: true,
        },
        slots: {
          header: await PanelSelectorTestData.getPanelHeaderSlotCustom(),
          toggleButton: await PanelSelectorTestData.getPanelToggleButtonSlotCustom(),
        },
      });

      expect(wrapper.find(defaultMock.getSelectorWithDot(defaultMock.expanderEl)).exists()).toBe(
        true,
      );
      expect(wrapper.find(defaultMock.expanderEl).element.innerHTML).toBe(
        (await PanelSelectorTestData.getPanelToggleButtonSlotCustom()).trim(),
      );
    });

    it('toggleIcon: Should render default toggleIcon slot.', async () => {
      const wrapper = mount(Panel, {
        props: {
          toggleable: true,
        },
        slots: {
          header: await PanelSelectorTestData.getPanelHeaderSlotCustom(),
        },
      });

      const button = wrapper
        .find(defaultMock.getSelectorWithDot(defaultMock.expanderEl))
        .findComponent(Button);
      expect(button.exists()).toBe(true);

      expect(wrapper.find(defaultMock.getSelectorWithDot(defaultMock.expanderEl)).exists()).toBe(
        true,
      );
      expect(wrapper.find(defaultMock.expanderEl).element.innerHTML).toBe(
        (await PanelSelectorTestData.getPanelToggleIconSlotDefault()).trim(),
      );
    });

    it('toggleIcon: Should render toggleIcon slot if provided.', async () => {
      const wrapper = mount(Panel, {
        props: {
          toggleable: true,
        },
        slots: {
          header: await PanelSelectorTestData.getPanelHeaderSlotCustom(),
          toggleIcon: await PanelSelectorTestData.getPanelToggleIconSlotCustom(),
        },
      });

      expect(wrapper.find(defaultMock.getSelectorWithDot(defaultMock.expanderEl)).exists()).toBe(
        true,
      );
      expect(wrapper.find(defaultMock.expanderEl).element.innerHTML).toContain(
        (await PanelSelectorTestData.getPanelToggleIconSlotCustom()).trim(),
      );
    });

    it('footer: Should render footer slot if provided.', async () => {
      const wrapper = mount(Panel, {
        slots: {
          footer: await PanelSelectorTestData.getPanelFooterSlotCustom(),
        },
      });

      expect(wrapper.find(defaultMock.getSelectorWithDot(defaultMock.footerEl)).exists()).toBe(
        true,
      );
      expect(wrapper.find(defaultMock.footerEl).element.innerHTML).toContain(
        (await PanelSelectorTestData.getPanelFooterSlotCustom()).trim(),
      );
    });
  });

  describe('Emits', () => {
    it('toggle: Should emit "toggle" with correct payload when clicking default toggle button.', async () => {
      const wrapper = mount(Panel, {
        props: {
          toggleable: true,
          collapsed: false,
        },
      });

      const button = wrapper
        .find(defaultMock.getSelectorWithDot(defaultMock.expanderEl))
        .findComponent(Button);
      expect(button.exists()).toBe(true);

      await button.trigger('click');

      const events = wrapper.emitted('toggle');
      expect(events).toBeDefined();
      expect(events!.length).toEqual(1);

      const payload = events![0][0] as TPanelToggleEvent;
      expect(payload).toBeDefined();
      expect(payload.value).toEqual(true);
      expect(payload.originalEvent).toBeDefined();
    });

    it('Should emit "toggle" with false when clicking twice starting from collapsed=false.', async () => {
      const wrapper = mount(Panel, {
        props: {
          toggleable: true,
          collapsed: false,
        },
      });

      const button = wrapper
        .find(defaultMock.getSelectorWithDot(defaultMock.expanderEl))
        .findComponent(Button);
      expect(button.exists()).toBe(true);

      await button.trigger('click');
      await button.trigger('click');

      const events = wrapper.emitted('toggle');
      expect(events).toBeDefined();
      expect(events!.length).toEqual(2);

      const payload1 = events![0][0] as TPanelToggleEvent;
      const payload2 = events![1][0] as TPanelToggleEvent;

      expect(payload1.value).toEqual(true);
      expect(payload2.value).toEqual(false);
    });

    it('Should not emit "toggle" when toggleable is false.', async () => {
      const wrapper = mount(Panel, {
        props: {
          toggleable: false,
        },
      });

      expect(wrapper.find(defaultMock.expanderEl).exists()).toBe(false);
      expect(wrapper.find('button').exists()).toBe(false);

      expect(wrapper.emitted('toggle')).toBeUndefined();
    });
  });

  describe('Accessibility', () => {
    it('Should set aria-label to "Collapse" when expanded.', async () => {
      const wrapper = mount(Panel, {
        props: {
          toggleable: true,
          collapsed: false,
        },
      });

      const button = wrapper
        .find(defaultMock.getSelectorWithDot(defaultMock.expanderEl))
        .findComponent(Button);
      expect(button.exists()).toBe(true);
      expect(button.attributes('aria-label')).toEqual('Collapse');
    });

    it('Should set aria-label to "Expand" when collapsed.', async () => {
      const wrapper = mount(Panel, {
        props: {
          toggleable: true,
          collapsed: true,
        },
      });

      const button = wrapper
        .find(defaultMock.getSelectorWithDot(defaultMock.expanderEl))
        .findComponent(Button);
      expect(button.exists()).toBe(true);
      expect(button.attributes('aria-label')).toEqual('Expand');
    });

    it('Should update aria-label after toggling.', async () => {
      const wrapper = mount(Panel, {
        props: {
          toggleable: true,
          collapsed: false,
        },
      });

      const button = wrapper
        .find(defaultMock.getSelectorWithDot(defaultMock.expanderEl))
        .findComponent(Button);
      expect(button.exists()).toBe(true);

      expect(button.attributes('aria-label')).toEqual('Collapse');

      await button.trigger('click');
      await nextTick();

      expect(button.attributes('aria-label')).toEqual('Expand');
    });
  });

  describe('Expose', () => {
    it('toggle: Should expose "toggle" method.', async () => {
      const wrapper = mount(Panel, {
        props: {
          toggleable: true,
          collapsed: false,
        },
      });

      expect(wrapper.vm).toBeDefined();
      expect(wrapper.vm.toggle).toBeDefined();
      expect(typeof wrapper.vm.toggle).toEqual('function');
    });

    it('toggle: Should toggle collapsed class and emit "toggle" when calling exposed "toggle".', async () => {
      const wrapper = mount(Panel, {
        props: {
          toggleable: true,
          collapsed: false,
        },
      });

      expect(wrapper.classes()).not.toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.collapsedModifier),
      );

      const event = new Event('click');
      wrapper.vm.toggle(event);
      await nextTick();

      expect(wrapper.classes()).toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.collapsedModifier),
      );

      const events = wrapper.emitted('toggle');
      expect(events).toBeDefined();
      expect(events!.length).toEqual(1);

      const payload = events![0][0] as TPanelToggleEvent;
      expect(payload).toBeDefined();
      expect(payload.value).toEqual(true);
      expect(payload.originalEvent).toBeDefined();
    });
  });
});
