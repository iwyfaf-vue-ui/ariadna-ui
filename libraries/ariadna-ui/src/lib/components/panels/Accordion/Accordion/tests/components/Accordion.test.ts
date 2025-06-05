import { describe, it, expect } from 'vitest';
import { defineComponent, h, nextTick, inject } from 'vue';
import { mount } from '@vue/test-utils';
import Accordion from '../../Accordion.vue';
import { AccordionSelectorTestData } from '../test-data/Accordion.selector.test-data';
import { AccordionProviderKey } from '../../providers/Accordion.provider';

const defaultMock = new AccordionSelectorTestData();

describe('Accordion.vue', () => {
  describe('Basic render', () => {
    const wrapper = mount(Accordion, {
      props: {},
    });

    it('Should mount without errors.', () => {
      expect(wrapper.exists()).toBe(true);
    });

    it('Should render root div with correct tabindex anf role.', () => {
      const rootDiv = wrapper.find(defaultMock.rootEl);

      expect(rootDiv.exists()).toBe(true);
      expect(rootDiv.attributes('tabindex')).toBe('-1');
      expect(rootDiv.attributes('role')).toBe('presentation');
    });
  });

  describe('Props', () => {
    // singleMode работает внутри composable и протестирован там
    // it('singleMode: Should provide singleMode prop correctly', async () => {});

    it('opened: Should provide opened prop correctly.', async () => {
      const TestInject = defineComponent({
        setup() {
          const provided = inject(AccordionProviderKey);
          return { provided };
        },
        render() {
          return h('div');
        },
      });

      const wrapper = mount(Accordion, {
        props: { opened: true },
        slots: {
          default: () => h(TestInject),
        },
      });

      await nextTick();

      const injected = wrapper.findComponent(TestInject).vm.provided!;

      expect(injected).toBeDefined();
      expect(injected.opened).toBe(true);
    });

    it('clickableHeader: Should provide clickableHeader prop correctly.', async () => {
      const TestInject = defineComponent({
        setup() {
          const provided = inject(AccordionProviderKey);
          return { provided };
        },
        render() {
          return h('div');
        },
      });

      const wrapper = mount(Accordion, {
        props: { clickableHeader: false },
        slots: {
          default: () => h(TestInject),
        },
      });

      await nextTick();

      const injected = wrapper.findComponent(TestInject).vm.provided!;

      expect(injected).toBeDefined();
      expect(injected.clickableHeader).toBe(false);
    });

    it('disabled: Should provide disabled prop correctly and apply CSS class', async () => {
      const TestInject = defineComponent({
        setup() {
          const provided = inject(AccordionProviderKey);
          return { provided };
        },
        render() {
          return h('div');
        },
      });

      const wrapper = mount(Accordion, {
        props: { disabled: true },
        slots: {
          default: () => h(TestInject),
        },
      });

      await nextTick();

      const injected = wrapper.findComponent(TestInject).vm.provided!;

      expect(injected).toBeDefined();
      expect(injected.disabled).toBe(true);

      const rootDiv = wrapper.find('div');

      expect(rootDiv.classes()).toContain(defaultMock.disabledModifier);
    });

    it('cssClass: Should apply custom root class and generate BEM child classes.', () => {
      const _defaultMock = new AccordionSelectorTestData(defaultMock.cssClassProp);

      const wrapper = mount(Accordion, {
        props: {
          cssClass: defaultMock.cssClassProp,
          modifier: defaultMock.modifierProp,
        },
      });

      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.rootEl)).exists()).toBe(true);
    });

    it('modifier: Should apply modifier class.', async () => {
      const wrapper = mount(Accordion, {
        props: {
          modifier: defaultMock.modifierProp,
        },
      });

      expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.primaryModifier);
    });
  });

  describe('Provide', () => {
    it('Should provide AccordionProviderKey with correct properties and methods.', async () => {
      const TestInject = defineComponent({
        setup() {
          const provided = inject(AccordionProviderKey);
          return { provided };
        },
        render() {
          return h('div');
        },
      });

      const wrapper = mount(Accordion, {
        props: {},
        slots: {
          default: () => h(TestInject),
        },
      });

      await nextTick();

      const injected = wrapper.findComponent(TestInject).vm.provided!;

      expect(injected).toBeDefined();
      expect(injected.accordions).toBeDefined();
      expect(injected.updateAccordion).toBeInstanceOf(Function);
      expect(typeof injected.opened).toBe('boolean');
      expect(typeof injected.clickableHeader).toBe('boolean');
      expect(typeof injected.disabled).toBe('boolean');
      expect(typeof injected.cssClass).toBe('string');
      expect(['string', 'undefined']).toContain(typeof injected.modifier);
    });
  });

  describe('Expose', () => {
    const wrapper = mount(Accordion, {
      props: {},
    });

    it('openAll: Should expose openAll method.', () => {
      expect(wrapper.vm.openAll).toBeDefined();
      expect(typeof wrapper.vm.openAll).toBe('function');
    });

    it('closeAll: Should expose closeAll method.', () => {
      expect(wrapper.vm.closeAll).toBeDefined();
      expect(typeof wrapper.vm.closeAll).toBe('function');
    });

    it('updateBy: Should expose updateBy method.', () => {
      expect(wrapper.vm.updateBy).toBeDefined();
      expect(typeof wrapper.vm.updateBy).toBe('function');
    });
  });
});
