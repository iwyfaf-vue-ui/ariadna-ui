import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Card from '../../Card.vue';
import { CardSelectorTestData } from '../test-data/Card.selector.test-data';

const defaultMock = new CardSelectorTestData();

describe('Card.vue', () => {
  describe('Basic render', () => {
    const wrapper = mount(Card, {
      props: {},
    });

    it('Should render component without errors.', () => {
      expect(wrapper.exists()).toBe(true);
    });

    it('Should apply default root CSS class.', () => {
      expect(wrapper.classes()).toContain(defaultMock.getSelectorWithoutDot(defaultMock.rootEl));
    });

    it('Should render as default tag (div).', () => {
      expect(wrapper.element.tagName.toLowerCase()).toBe('div');
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
    it('tag: Should render with default tag.', () => {
      const wrapper = mount(Card, {
        props: {},
      });

      expect(wrapper.element.tagName.toLowerCase()).toBe('div');
    });

    it('tag: Should render with custom tag.', () => {
      const wrapper = mount(Card, {
        props: {
          tag: defaultMock.tagProp,
        },
      });

      expect(wrapper.element.tagName.toLowerCase()).toBe(defaultMock.tagProp);
    });

    it('symbols: Should not collapse content if symbols.all <= symbols.visible.', async () => {
      const wrapper = mount(Card, {
        props: {
          symbols: { all: 2, visible: 2 },
        },
        slots: {
          content: '<div>Content</div>',
        },
      });

      const content = wrapper.find(defaultMock.contentTextEl);

      expect(content.exists()).toBe(true);
      expect((content.element as HTMLElement).style.display).toBe('');
    });

    it('symbols: Should handle symbols prop and collapse content if all > visible.', async () => {
      const wrapper = mount(Card, {
        props: {
          symbols: { all: 5, visible: 3 },
        },
        slots: {
          content: '<div>Content</div>',
        },
      });

      // content is collapsed, so v-show is false
      const content = wrapper.find(defaultMock.contentTextEl);
      expect(content.exists()).toBe(true);

      console.log(content.html());

      // v-show is false, so element is hidden
      expect((content.element as HTMLElement).style.display).toBe('none');
    });

    it('cssClass: Should apply custom root class and generate BEM child classes.', async () => {
      const _defaultMock = new CardSelectorTestData(defaultMock.cssClassProp);

      const wrapper = mount(Card, {
        props: {
          cssClass: defaultMock.cssClassProp,
          modifier: defaultMock.modifierProp,
        },
        slots: {
          picture: await CardSelectorTestData.getCardPictureSlotCustom(),
          contentHeader: await CardSelectorTestData.getCardContentHeaderSlotCustom(),
          content: await CardSelectorTestData.getCardContentSlotCustom(),
          contentFooter: await CardSelectorTestData.getCardContentFooterSlotCustom(),
          footer: await CardSelectorTestData.getCardFooterSlotCustom(),
        },
      });

      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.rootEl)).exists()).toBe(true);
      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.bodyEl)).exists()).toBe(true);
      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.pictureEl)).exists()).toBe(
        true,
      );
      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.contentEl)).exists()).toBe(
        true,
      );
      expect(
        wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.contentTextEl)).exists(),
      ).toBe(true);
      expect(
        wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.contentFooterEl)).exists(),
      ).toBe(true);
      expect(
        wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.contentHeaderEl)).exists(),
      ).toBe(true);
      expect(
        wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.themeModifier)).exists(),
      ).toBe(true);
      expect(
        wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.primaryModifier)).exists(),
      ).toBe(true);
    });

    it('modifier: Should apply modifier class.', async () => {
      const wrapper = mount(Card, {
        props: {
          modifier: defaultMock.modifierProp,
        },
      });

      expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.primaryModifier);
    });
  });

  describe('Slots', () => {
    it('picture: Should render picture slot.', async () => {
      const wrapper = mount(Card, {
        slots: {
          picture: await CardSelectorTestData.getCardPictureSlotCustom(),
        },
      });

      expect(wrapper.find(defaultMock.getSelectorWithDot(defaultMock.pictureEl)).exists()).toBe(
        true,
      );
      expect(wrapper.find(defaultMock.pictureEl).element.innerHTML).toBe(
        await CardSelectorTestData.getCardPictureSlotCustom(),
      );
    });

    it('contentHeader: Should render picture slot.', async () => {
      const wrapper = mount(Card, {
        slots: {
          contentHeader: await CardSelectorTestData.getCardContentHeaderSlotCustom(),
        },
      });

      expect(
        wrapper.find(defaultMock.getSelectorWithDot(defaultMock.contentHeaderEl)).exists(),
      ).toBe(true);
      expect(wrapper.find(defaultMock.contentHeaderEl).element.innerHTML).toBe(
        await CardSelectorTestData.getCardContentHeaderSlotCustom(),
      );
    });

    it('content: Should render picture slot.', async () => {
      const wrapper = mount(Card, {
        slots: {
          content: await CardSelectorTestData.getCardContentSlotCustom(),
        },
      });

      expect(wrapper.find(defaultMock.getSelectorWithDot(defaultMock.contentTextEl)).exists()).toBe(
        true,
      );
      expect(wrapper.find(defaultMock.contentTextEl).element.innerHTML).toBe(
        await CardSelectorTestData.getCardContentSlotCustom(),
      );
    });

    it('contentFooter: Should render picture slot.', async () => {
      const wrapper = mount(Card, {
        slots: {
          contentFooter: await CardSelectorTestData.getCardContentFooterSlotCustom(),
        },
      });

      expect(
        wrapper.find(defaultMock.getSelectorWithDot(defaultMock.contentFooterEl)).exists(),
      ).toBe(true);
      expect(wrapper.find(defaultMock.contentFooterEl).element.innerHTML).toBe(
        await CardSelectorTestData.getCardContentFooterSlotCustom(),
      );
    });

    it('footer: Should render picture slot.', async () => {
      const wrapper = mount(Card, {
        slots: {
          footer: await CardSelectorTestData.getCardFooterSlotCustom(),
        },
      });

      expect(wrapper.find(defaultMock.getSelectorWithDot(defaultMock.footerEl)).exists()).toBe(
        true,
      );
      expect(wrapper.find(defaultMock.footerEl).element.innerHTML).toBe(
        await CardSelectorTestData.getCardFooterSlotCustom(),
      );
    });
  });

  describe('Edge cases', () => {
    it('Should render with empty cssClass.', () => {
      const wrapper = mount(Card, {
        props: {
          cssClass: '',
        },
      });

      expect(wrapper.classes()).toContain('--theme');
    });

    it('Should render with empty modifier.', () => {
      const wrapper = mount(Card, {
        props: {
          modifier: '',
        },
      });

      expect(wrapper.classes()).not.toContain('ar-card--');
    });

    it('Should render with undefined symbols.', () => {
      const wrapper = mount(Card, {
        props: {
          symbols: undefined,
        },
      });

      expect(wrapper.exists()).toBe(true);
    });

    it('Should render with large symbols values.', () => {
      const wrapper = mount(Card, {
        props: {
          symbols: {
            all: 100000,
            visible: 99999,
          },
        },
      });

      expect(wrapper.exists()).toBe(true);
    });

    it('Should render with symbols.all = 0 and symbols.visible = 0.', () => {
      const wrapper = mount(Card, {
        props: {
          symbols: {
            all: 0,
            visible: 0,
          },
        },
      });

      expect(wrapper.exists()).toBe(true);
    });
  });
});
