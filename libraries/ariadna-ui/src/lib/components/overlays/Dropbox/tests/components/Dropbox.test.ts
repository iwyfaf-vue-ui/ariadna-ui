import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import Dropbox from '../../Dropbox.vue';
import { DropboxSelectorTestData } from '../test-data/Dropbox.selector.test-data';

const defaultMock = new DropboxSelectorTestData();

describe('Checkbox.vue', () => {
  describe('Basic render', () => {
    const wrapper = mount(Dropbox, {
      props: {
        modelValue: false,
      },
    });

    it('Should render component without errors.', () => {
      expect(wrapper.exists()).toBe(true);
    });

    it('Should apply default root CSS class.', () => {
      expect(wrapper.classes()).toContain(defaultMock.getSelectorWithoutDot(defaultMock.rootEl));
    });

    it('Should render activator slot if provided.', async () => {
      const wrapper = mount(Dropbox, {
        props: {
          modelValue: false,
        },
        slots: {
          default: await DropboxSelectorTestData.getDropboxDefaultSlotCustom(),
          activator: await DropboxSelectorTestData.getDropboxActivatorSlotCustom(),
        },
      });

      expect(wrapper.find(defaultMock.activatorEl).exists()).toBe(true);
      expect(wrapper.find(defaultMock.activatorEl).text()).toBe(
        await DropboxSelectorTestData.getDropboxActivatorSlotCustom(),
      );
    });

    it('Should not render activator slot if not provided.', async () => {
      const wrapper = mount(Dropbox, {
        props: {
          modelValue: false,
        },
        // @ts-ignore Из-за required слота activator
        slots: {
          default: await DropboxSelectorTestData.getDropboxDefaultSlotCustom(),
        },
      });

      expect(wrapper.find(defaultMock.activatorEl).exists()).toBe(false);
    });

    it('Should render content element.', async () => {
      expect(wrapper.find(defaultMock.contentEl).exists()).toBe(true);
    });

    it('Should apply root and theme modifier CSS classes.', () => {
      const classes = wrapper.classes();

      const expectedClasses = [
        defaultMock.getSelectorWithoutDot(defaultMock.rootEl),
        defaultMock.getSelectorWithoutDot(defaultMock.themeModifier),
      ];

      expect(classes).toEqual(expect.arrayContaining(expectedClasses));
      expect(classes.length).toBe(expectedClasses.length);
    });
  });

  describe('Props', () => {
    it('modelValue: Should update modelValue.', async () => {
      const wrapper = mount(Dropbox, {
        props: {
          modelValue: false,
        },
      });

      await wrapper.setProps({ modelValue: true });

      expect(wrapper.classes()).toContain(defaultMock.openedModifier);
    });

    it('disableAutoPosition: Should render content with auto positioning class when disableAutoPosition is false.', async () => {
      const wrapper = mount(Dropbox, {
        props: {
          modelValue: false,
        },
        slots: {
          default: await DropboxSelectorTestData.getDropboxDefaultSlotCustom(),
          activator: await DropboxSelectorTestData.getDropboxActivatorSlotCustom(),
        },
      });

      expect(wrapper.find(`${defaultMock.contentEl}--horizontal--`).exists()).toBe(true);
    });

    it('disableAutoPosition: Should not render content with auto positioning class when disableAutoPosition is true.', async () => {
      const wrapper = mount(Dropbox, {
        props: {
          modelValue: false,
          disableAutoPosition: true,
        },
        slots: {
          default: await DropboxSelectorTestData.getDropboxDefaultSlotCustom(),
          activator: await DropboxSelectorTestData.getDropboxActivatorSlotCustom(),
        },
      });

      expect(wrapper.find(`${defaultMock.contentEl}--horizontal--`).exists()).toBe(false);
    });

    it('closeOnClickOutside: Should not close Dropbox when clicking outside if closeOnClickOutside is false.', async () => {
      const wrapper = mount(Dropbox, {
        props: {
          modelValue: false,
          closeOnClickOutside: false,
        },
        attachTo: document.body,
        slots: {
          default: await DropboxSelectorTestData.getDropboxDefaultSlotCustom(),
          activator: await DropboxSelectorTestData.getDropboxActivatorSlotCustom(),
        },
      });

      await wrapper.vm.$nextTick();

      // Create and dispatch a real MouseEvent on document.body
      const event = new MouseEvent('click', { bubbles: true, cancelable: true });
      document.body.dispatchEvent(event);

      await wrapper.vm.$nextTick();

      expect(wrapper.emitted('hide')).toBeFalsy();

      wrapper.unmount();
    });

    it('closeOnClickOutside: Should close Dropbox when clicking outside if closeOnClickOutside is true.', async () => {
      const wrapper = mount(Dropbox, {
        props: {
          modelValue: true,
          closeOnClickOutside: true,
        },
        attachTo: document.body,
        slots: {
          default: await DropboxSelectorTestData.getDropboxDefaultSlotCustom(),
          activator: await DropboxSelectorTestData.getDropboxActivatorSlotCustom(),
        },
      });

      await wrapper.vm.$nextTick();

      // Create and dispatch a real MouseEvent on document.body
      const event = new MouseEvent('click', { bubbles: true, cancelable: true });
      document.body.dispatchEvent(event);

      await wrapper.vm.$nextTick();

      expect(wrapper.emitted('hide')).toBeTruthy();

      wrapper.unmount();
    });

    it('closeOnEscape: Should not close Dropbox when pressing Escape if closeOnEscape is false.', async () => {
      const wrapper = mount(Dropbox, {
        props: {
          modelValue: true,
          closeOnEscape: false,
        },
        slots: {
          default: await DropboxSelectorTestData.getDropboxDefaultSlotCustom(),
          activator: await DropboxSelectorTestData.getDropboxActivatorSlotCustom(),
        },
      });

      const content = wrapper.find(defaultMock.contentEl);

      await content.trigger('keydown', { key: 'Escape' });

      expect(wrapper.props().modelValue).toBe(true);
      expect(wrapper.emitted('hide')).toBeFalsy();
    });

    it('cssClass: Should apply custom root class and generate BEM child classes.', async () => {
      const _defaultMock = new DropboxSelectorTestData(defaultMock.cssClassProp);

      const wrapper = mount(Dropbox, {
        props: {
          modelValue: true,
          cssClass: defaultMock.cssClassProp,
          modifier: defaultMock.modifierProp,
        },
        slots: {
          default: await DropboxSelectorTestData.getDropboxDefaultSlotCustom(),
          activator: await DropboxSelectorTestData.getDropboxActivatorSlotCustom(),
          header: await DropboxSelectorTestData.getDropboxHeaderSlotCustom(),
        },
      });

      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.rootEl)).exists()).toBe(true);
      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.activatorEl)).exists()).toBe(
        true,
      );
      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.contentEl)).exists()).toBe(
        true,
      );
      expect(
        wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.contentHeaderEl)).exists(),
      ).toBe(true);
      expect(
        wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.contentMainEl)).exists(),
      ).toBe(true);
      expect(
        wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.themeModifier)).exists(),
      ).toBe(true);
      expect(
        wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.primaryModifier)).exists(),
      ).toBe(true);
      expect(
        wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.openedModifier)).exists(),
      ).toBe(true);
    });

    it('modifier: Should apply modifier class.', async () => {
      const wrapper = mount(Dropbox, {
        props: {
          modelValue: false,
          modifier: defaultMock.modifierProp,
        },
        slots: {
          default: await DropboxSelectorTestData.getDropboxDefaultSlotCustom(),
          activator: await DropboxSelectorTestData.getDropboxActivatorSlotCustom(),
        },
      });

      expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.primaryModifier);
    });
  });

  describe('Slots', () => {
    it('default: Should render custom slot if provided.', async () => {
      const wrapper = mount(Dropbox, {
        props: {
          modelValue: false,
        },
        slots: {
          default: await DropboxSelectorTestData.getDropboxDefaultSlotCustom(),
          activator: await DropboxSelectorTestData.getDropboxActivatorSlotCustom(),
        },
      });

      expect(wrapper.find(defaultMock.getSelectorWithDot(defaultMock.contentMainEl)).exists()).toBe(
        true,
      );
      expect(wrapper.find(defaultMock.contentMainEl).element.innerHTML).toBe(
        await DropboxSelectorTestData.getDropboxDefaultSlotCustom(),
      );
    });

    it('activator: Should render activator slot if provided.', async () => {
      const wrapper = mount(Dropbox, {
        props: {
          modelValue: false,
        },
        slots: {
          default: await DropboxSelectorTestData.getDropboxDefaultSlotCustom(),
          activator: await DropboxSelectorTestData.getDropboxActivatorSlotCustom(),
        },
      });

      expect(wrapper.find(defaultMock.getSelectorWithDot(defaultMock.activatorEl)).exists()).toBe(
        true,
      );
      expect(wrapper.find(defaultMock.activatorEl).element.innerHTML).toBe(
        await DropboxSelectorTestData.getDropboxActivatorSlotCustom(),
      );
    });

    it('header: Should render activator slot if provided.', async () => {
      const wrapper = mount(Dropbox, {
        props: {
          modelValue: false,
        },
        slots: {
          default: await DropboxSelectorTestData.getDropboxDefaultSlotCustom(),
          activator: await DropboxSelectorTestData.getDropboxActivatorSlotCustom(),
          header: await DropboxSelectorTestData.getDropboxHeaderSlotCustom(),
        },
      });

      expect(
        wrapper.find(defaultMock.getSelectorWithDot(defaultMock.contentHeaderEl)).exists(),
      ).toBe(true);
      expect(wrapper.find(defaultMock.contentHeaderEl).element.innerHTML).toBe(
        await DropboxSelectorTestData.getDropboxHeaderSlotCustom(),
      );
    });
  });

  describe('Emits', async () => {
    const wrapper = mount(Dropbox, {
      props: {
        modelValue: false,
        'onUpdate:modelValue': (e: boolean) => wrapper.setProps({ modelValue: e }),
      },
      slots: {
        default: await DropboxSelectorTestData.getDropboxDefaultSlotCustom(),
        activator: await DropboxSelectorTestData.getDropboxActivatorSlotCustom(),
      },
    });

    it('update:modelValue: Should emit "update:model-value" when toggled.', async () => {
      await wrapper.vm.toggle();

      expect(wrapper.emitted()['update:modelValue']).toBeTruthy();
      expect(wrapper.emitted()['update:modelValue'][0]).toEqual([defaultMock.modelValueProp]);
    });

    it('show: Should emit "show" event when opened.', async () => {
      await wrapper.vm.open();
      expect(wrapper.emitted('show')).toBeTruthy();
    });

    it('hide: Should emit "hide" event when closed.', async () => {
      await wrapper.vm.close();
      expect(wrapper.emitted('hide')).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('Should set tabindex="0" on content element.', async () => {
      const wrapper = mount(Dropbox, {
        props: {
          modelValue: false,
        },
        slots: {
          default: await DropboxSelectorTestData.getDropboxDefaultSlotCustom(),
          activator: await DropboxSelectorTestData.getDropboxActivatorSlotCustom(),
        },
      });

      const content = wrapper.find(defaultMock.contentEl);

      expect(content.attributes('tabindex')).toBe('0');
    });

    it('Should handle Escape keydown to close if closeOnEscape is true.', async () => {
      const wrapper = mount(Dropbox, {
        props: {
          modelValue: true,
        },
        slots: {
          default: await DropboxSelectorTestData.getDropboxDefaultSlotCustom(),
          activator: await DropboxSelectorTestData.getDropboxActivatorSlotCustom(),
        },
      });

      const content = wrapper.find(defaultMock.contentEl);
      await content.trigger('keydown', { key: 'Escape' });

      expect(wrapper.emitted('hide')).toBeTruthy();
    });

    it('Should not close on Escape if closeOnEscape is false.', async () => {
      const wrapper = mount(Dropbox, {
        props: {
          modelValue: true,
          closeOnEscape: false,
        },
        slots: {
          default: await DropboxSelectorTestData.getDropboxDefaultSlotCustom(),
          activator: await DropboxSelectorTestData.getDropboxActivatorSlotCustom(),
        },
      });

      const content = wrapper.find(defaultMock.contentEl);
      await content.trigger('keydown', { key: 'Escape' });

      expect(wrapper.emitted('hide')).toBeFalsy();
    });

    it('Should have no aria attributes by default.', async () => {
      const wrapper = mount(Dropbox, {
        props: {
          modelValue: true,
          closeOnEscape: false,
        },
        slots: {
          default: await DropboxSelectorTestData.getDropboxDefaultSlotCustom(),
          activator: await DropboxSelectorTestData.getDropboxActivatorSlotCustom(),
        },
      });

      const root = wrapper.find(defaultMock.rootEl);
      const content = wrapper.find(defaultMock.contentEl);

      expect(content.attributes('aria-expanded')).toBeUndefined();
      expect(content.attributes('aria-hidden')).toBeUndefined();
      expect(root.attributes('aria-expanded')).toBeUndefined();
      expect(root.attributes('aria-hidden')).toBeUndefined();
    });
  });
});
