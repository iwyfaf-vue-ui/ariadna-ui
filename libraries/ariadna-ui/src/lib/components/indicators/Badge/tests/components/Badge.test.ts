import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { BadgeSelectorTestData } from '../test-data/Badge.selector.test-data';
import Badge from '../../Badge.vue';
import { EBadgePropsDefault } from '../../types/Badge.enums';

const defaultMock = new BadgeSelectorTestData();

describe('Badge.vue', () => {
  describe('Basic render.', () => {
    const wrapper = mount(Badge, {
      slots: {
        default: 'Test Badge',
      },
    });

    it('Should mount without errors.', () => {
      expect(wrapper.exists()).toBe(true);
    });

    it('Should render a span element.', () => {
      expect(wrapper.find(defaultMock.rootEl).exists()).toBe(true);
      expect(wrapper.find(defaultMock.rootEl).element.tagName).toEqual('SPAN');
    });

    it('Should not render span when default slot is empty.', () => {
      const wrapper = mount(Badge);

      expect(wrapper.find(defaultMock.rootEl).exists()).toBe(false);
    });

    it('Should have the default CSS class with predefined modifiers.', () => {
      expect(wrapper.classes()).toContain(EBadgePropsDefault.CSS_CLASS);
      expect(wrapper.classes()).toContain(defaultMock.themeModifier);
      expect(wrapper.classes()).toContain(defaultMock.sizeMediumModifier);
    });
  });

  describe('Props.', () => {
    it('tag: Should render as div element.', () => {
      const wrapper = mount(Badge, {
        props: {
          ...defaultMock.mockProps,
          tag: 'div',
        },
        slots: {
          default: 'Test Badge',
        },
      });

      expect(wrapper.find(defaultMock.rootEl).element.tagName).toEqual('DIV');
    });

    it('size: Should apply small size modifier class when size="small".', () => {
      const wrapper = mount(Badge, {
        props: {
          size: defaultMock.sizeProp,
        },
        slots: {
          default: 'Test Badge',
        },
      });

      expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.sizeSmallModifier);
    });

    it('size: Should apply medium size modifier class when size="medium".', () => {
      const wrapper = mount(Badge, {
        props: {
          size: (defaultMock.sizeProp = 'medium'),
        },
        slots: {
          default: 'Test Badge',
        },
      });

      expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.sizeMediumModifier);
    });

    it('size: Should apply large size modifier class when size="large".', () => {
      const wrapper = mount(Badge, {
        props: {
          size: (defaultMock.sizeProp = 'large'),
        },
        slots: {
          default: 'Test Badge',
        },
      });

      expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.sizeLargeModifier);
    });

    it('rounded: Should apply rounded modifier class when rounded="true".', () => {
      const wrapper = mount(Badge, {
        props: {
          rounded: true,
        },
        slots: {
          default: 'Test Badge',
        },
      });

      expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.roundedModifier);
    });

    it('floating: Should apply floating modifier class when floating="true".', () => {
      const wrapper = mount(Badge, {
        props: {
          floating: true,
        },
        slots: {
          default: 'Test Badge',
        },
      });

      expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.floatingModifier);
    });

    it('cssClass: Should apply custom root class and generate BEM child classes.', () => {
      const _defaultMock = new BadgeSelectorTestData(defaultMock.cssClassProp);

      const wrapper = mount(Badge, {
        props: {
          cssClass: defaultMock.cssClassProp,
        },
        slots: {
          default: 'Test Badge',
        },
      });

      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.rootEl)).exists()).toBe(true);
    });

    it('modifier: Should apply modifier class.', async () => {
      const wrapper = mount(Badge, {
        props: {
          modifier: defaultMock.modifierProp,
        },
        slots: {
          default: 'Test Badge',
        },
      });

      expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.primaryModifier);
    });
  });
});
