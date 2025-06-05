import { describe, it, expect } from 'vitest';
import { h } from 'vue';
import { mount } from '@vue/test-utils';
import { AccordionItemSelectorTestData } from '../test-data/AccordionItem.selector.test-data';
import Accordion from '../../../Accordion/Accordion.vue';
import AccordionItem from '../../AccordionItem.vue';

const defaultMock = new AccordionItemSelectorTestData();

describe('AccordionItem.vue', () => {
  describe('Basic render', () => {
    const wrapper = mount(Accordion, {
      slots: {
        default: AccordionItem,
      },
    });

    it('Should mount without errors.', () => {
      expect(wrapper.exists()).toBe(true);
    });
  });

  describe('Props', () => {
    it('opened: Should toggle active class on click and keyboard events when opened prop is true.', async () => {
      const wrapper = mount(Accordion, {
        slots: {
          default: h(AccordionItem, { opened: true }),
        },
      });

      expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.activeModifier);

      await wrapper.find(defaultMock.headerEl).trigger('click');
      expect(wrapper.find(defaultMock.rootEl).classes()).not.toContain(defaultMock.activeModifier);

      await wrapper.find(defaultMock.headerEl).trigger('keydown.enter');
      expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.activeModifier);

      await wrapper.find(defaultMock.headerEl).trigger('keydown.space');
      expect(wrapper.find(defaultMock.rootEl).classes()).not.toContain(defaultMock.activeModifier);
    });

    it('disabled: Should apply disabled class and prevent toggling when disabled prop is true.', async () => {
      const wrapper = mount(Accordion, {
        slots: {
          default: h(AccordionItem, { disabled: true }),
        },
      });

      expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.disabledModifier);

      await wrapper.find(defaultMock.headerEl).trigger('click');
      expect(wrapper.find(defaultMock.rootEl).classes()).not.toContain(defaultMock.activeModifier);

      await wrapper.find(defaultMock.headerEl).trigger('keydown.enter');
      expect(wrapper.find(defaultMock.rootEl).classes()).not.toContain(defaultMock.activeModifier);

      await wrapper.find(defaultMock.headerEl).trigger('keydown.space');
      expect(wrapper.find(defaultMock.rootEl).classes()).not.toContain(defaultMock.activeModifier);
    });

    it('ariaLabel: Should set aria-label attribute on header element according to ariaLabel prop.', async () => {
      const wrapper = mount(Accordion, {
        slots: {
          default: h(AccordionItem, { ariaLabel: defaultMock.ariaLabelProp }),
        },
      });

      expect(wrapper.find(defaultMock.headerEl).attributes('aria-label')).toBe(
        defaultMock.ariaLabelProp,
      );
    });
  });

  describe('Slots', () => {
    const wrapper = mount(Accordion, {
      slots: {
        default: h(AccordionItem, null, {
          default: 'Accordion 1',
          header: ({ opened }: { opened: boolean }) => `${opened}`,
          activator: ({ opened, toggle }: { opened: boolean; toggle: () => void }) =>
            h(
              'button',
              {
                onClick: (event: Event) => {
                  event.stopPropagation();
                  toggle();
                },
                class: 'test-button',
              },
              opened,
            ),
        }),
      },
    });

    it('default: Should render default slot content correctly.', () => {
      expect(wrapper.find(defaultMock.contentEl).element.textContent).toBe('Accordion 1');
    });

    it('header: Should render header slot with correct opened state and update on click.', async () => {
      expect(wrapper.find(defaultMock.headerEl).element.textContent).toContain('false');

      await wrapper.find(defaultMock.headerEl).trigger('click');

      expect(wrapper.find(defaultMock.headerEl).element.textContent).toContain('true');
    });

    it('activator: Should render activator slot and toggle opened state on button click.', async () => {
      const testButton = wrapper.find('.test-button');

      expect(testButton.element.textContent).toBe('true');

      await wrapper.find(defaultMock.headerEl).trigger('click');
      expect(testButton.element.textContent).toBe('false');

      await testButton.trigger('click');
      expect(testButton.element.textContent).toBe('true');
    });
  });

  describe('Emits', () => {
    let change = false;
    let focus = false;
    let blur = false;

    const wrapper = mount(Accordion, {
      slots: {
        default: h(AccordionItem, {
          onChange: () => (change = true),
          onFocus: () => (focus = true),
          onBlur: () => (blur = true),
        }),
      },
    });

    it('change: Should emit "change" event when clicked on header element.', async () => {
      await wrapper.find(defaultMock.headerEl).trigger('click');

      expect(change).toBeTruthy();
    });

    it('focus: Should emit "focus" event when focused on header element.', async () => {
      await wrapper.find(defaultMock.headerEl).trigger('focus');

      expect(focus).toBeTruthy();
    });

    it('blur: Should emit "blur" event when unfocused on header element.', async () => {
      await wrapper.find(defaultMock.headerEl).trigger('blur');

      expect(blur).toBeTruthy();
    });
  });

  describe('Expose', () => {
    const wrapper = mount(Accordion, {
      slots: {
        default: AccordionItem,
      },
    });

    it('toggle: Should expose toggle method.', () => {
      const accordionItemWrapper = wrapper.findComponent(AccordionItem);

      expect(accordionItemWrapper.exists()).toBe(true);
      expect(accordionItemWrapper.vm.toggle).toBeDefined();
      expect(typeof accordionItemWrapper.vm.toggle).toBe('function');
    });

    it('open: Should expose open method.', () => {
      const accordionItemWrapper = wrapper.findComponent(AccordionItem);

      expect(accordionItemWrapper.exists()).toBe(true);
      expect(accordionItemWrapper.vm.open).toBeDefined();
      expect(typeof accordionItemWrapper.vm.open).toBe('function');
    });

    it('close: Should expose close method.', () => {
      const accordionItemWrapper = wrapper.findComponent(AccordionItem);

      expect(accordionItemWrapper.exists()).toBe(true);
      expect(accordionItemWrapper.vm.close).toBeDefined();
      expect(typeof accordionItemWrapper.vm.close).toBe('function');
    });
  });
});
