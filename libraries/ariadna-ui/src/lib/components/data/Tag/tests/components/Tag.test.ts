import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import Tag from '../../Tag.vue';
import { ETagPropsDefault } from '../../types/Tag.enums';
import { TagSelectorTestData } from '../test-data/Tag.selector.test-data';

const defaultMock = new TagSelectorTestData();

describe('Tag.vue', () => {
  describe('Basic render', () => {
    it('Should mount without errors.', () => {
      const wrapper = mount(Tag);

      expect(wrapper.exists()).toBe(true);
    });

    it('Should render with default props.', () => {
      const wrapper = mount(Tag);

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.element.tagName.toLowerCase()).toBe(ETagPropsDefault.TAG);
      expect(wrapper.classes()).toContain(ETagPropsDefault.CSS_CLASS);
    });

    it('Should have the default CSS class with predefined modifiers.', () => {
      const wrapper = mount(Tag);

      expect(wrapper.classes()).toContain(ETagPropsDefault.CSS_CLASS);
      expect(wrapper.classes()).toContain(defaultMock.themeModifier);
      expect(wrapper.classes()).toContain(defaultMock.sizeMediumModifier);
    });
  });

  describe('Props.', () => {
    it('tag: Should render with custom root element.', () => {
      const wrapper = mount(Tag, {
        props: {
          tag: 'button',
        },
      });

      expect(wrapper.element.tagName.toLowerCase()).toBe('button');
    });

    it('size: Should apply small size modifier class when size="small".', () => {
      const wrapper = mount(Tag, {
        slots: {
          default: 'Test Tag',
        },
        props: {
          size: defaultMock.sizeProp,
        },
      });

      expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.sizeSmallModifier);
    });

    it('size: Should apply medium size modifier class when size="medium".', () => {
      const wrapper = mount(Tag, {
        slots: {
          default: 'Test Tag',
        },
        props: {
          size: (defaultMock.sizeProp = 'medium'),
        },
      });

      expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.sizeMediumModifier);
    });

    it('size: Should apply large size modifier class when size="large".', () => {
      const wrapper = mount(Tag, {
        slots: {
          default: 'Test Tag',
        },
        props: {
          size: (defaultMock.sizeProp = 'large'),
        },
      });

      expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.sizeLargeModifier);
    });

    it('rounded: Should apply rounded prop correctly.', () => {
      const wrapper = mount(Tag, {
        props: {
          rounded: true,
        },
      });

      expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.roundedModifier);
    });

    it('cssClass: Should apply custom root class and generate BEM child classes.', async () => {
      const _defaultMock = new TagSelectorTestData(defaultMock.cssClassProp);

      const wrapper = mount(Tag, {
        slots: {
          default: 'Test Tag',
          icon: await TagSelectorTestData.getTagIconSlotCustom(),
        },
        props: {
          cssClass: defaultMock.cssClassProp,
        },
      });

      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.rootEl)).exists()).toBe(true);
      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.iconEl)).exists()).toBe(true);
      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.labelEl)).exists()).toBe(
        true,
      );
    });

    it('modifier: Should apply modifier class.', async () => {
      const wrapper = mount(Tag, {
        slots: {
          default: 'Test Tag',
        },
        props: {
          modifier: defaultMock.modifierProp,
        },
      });

      expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.primaryModifier);
    });
  });

  describe('Slots.', () => {
    it('default: Should render custom default slot if provided.', async () => {
      const wrapper = mount(Tag, {
        slots: {
          default: await TagSelectorTestData.getTagDefaultSlotCustom(),
        },
      });

      expect(wrapper.find(defaultMock.labelEl).exists()).toBeTruthy();
      expect(wrapper.find(defaultMock.labelEl).element.innerHTML).toBe(
        (await TagSelectorTestData.getTagDefaultSlotCustom()).trim(),
      );
    });

    it('icon: Should render custom icon slot if provided.', async () => {
      const wrapper = mount(Tag, {
        slots: {
          icon: await TagSelectorTestData.getTagIconSlotCustom(),
        },
      });

      expect(wrapper.find(defaultMock.iconEl).exists()).toBeTruthy();
      expect(wrapper.find(defaultMock.iconEl).element.innerHTML).toBe(
        (await TagSelectorTestData.getTagIconSlotCustom()).trim(),
      );
    });
  });
});
