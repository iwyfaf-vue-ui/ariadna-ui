import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Timeline from '../../Timeline.vue';
import type { TTimelineEvent } from '../../Timeline';
import { TimelineSelectorTestData } from '../test-data/Timeline.selector.test-data';

const defaultMock = new TimelineSelectorTestData();

describe('Timeline.vue', () => {
  describe('Basic render', () => {
    const wrapper = mount(Timeline, {
      props: {
        events: defaultMock.events,
      },
    });

    it('Should mount without errors.', () => {
      expect(wrapper.exists()).toBe(true);
    });

    it('Should render correct number of event elements.', () => {
      const eventEls = wrapper.findAll(defaultMock.eventEl);

      expect(eventEls.length).toBe(defaultMock.events.length);
    });

    it('Should render first and last event with correct modifier classes.', () => {
      const eventEls = wrapper.findAll(defaultMock.eventEl);

      expect(eventEls[0].classes()).toContain(defaultMock.eventFirstModifier);
      expect(eventEls[eventEls.length - 1].classes()).toContain(defaultMock.eventLastModifier);
    });
  });

  describe('Props', () => {
    it('events: Should render no events when events prop is empty and render correct number after update.', async () => {
      const wrapper = mount(Timeline, {
        props: {
          events: [],
        },
      });

      expect(wrapper.findAll(defaultMock.eventEl).length).toBe(0);

      await wrapper.setProps({ events: defaultMock.events });
      expect(wrapper.findAll(defaultMock.eventEl).length).toBe(2);
    });

    it('keyProperty: Should accept valid keyProperty without throwing an error.', async () => {
      const wrapper = mount(Timeline, {
        props: {
          events: defaultMock.events,
        },
      });

      await expect(wrapper.setProps({ keyProperty: 'name' })).resolves.not.toThrow();
    });

    it('keyProperty: Should throw an error when keyProperty does not exist in events.', async () => {
      const wrapper = mount(Timeline, {
        props: {
          events: defaultMock.events,
        },
      });

      await expect(wrapper.setProps({ keyProperty: 'id' })).rejects.toThrowError();
    });

    it('cssClass: Should apply custom root class and generate BEM child classes.', async () => {
      const _defaultMock = new TimelineSelectorTestData(defaultMock.cssClassProp);
      const wrapper = mount(Timeline, {
        props: {
          events: defaultMock.events,
          modifier: defaultMock.modifierProp,
          cssClass: defaultMock.cssClassProp,
        },
        slots: {
          event: await TimelineSelectorTestData.getTimelineEventSlotCustom(),
          separator: await TimelineSelectorTestData.getTimelineSeparatorSlotCustom(),
          opposite: await TimelineSelectorTestData.getTimelineOppositeSlotCustom(),
        },
      });

      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.rootEl)).exists()).toBe(true);
      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.eventEl)).exists()).toBe(
        true,
      );
      expect(
        wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.eventFirstModifier)).exists(),
      ).toBe(true);
      expect(
        wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.eventLastModifier)).exists(),
      ).toBe(true);
      expect(
        wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.eventOppositeEl)).exists(),
      ).toBe(true);
      expect(
        wrapper
          .find(defaultMock.getSelectorWithDot(_defaultMock.eventOppositeRightModifier))
          .exists(),
      ).toBe(true);
      expect(
        wrapper
          .find(defaultMock.getSelectorWithDot(_defaultMock.eventOppositeLeftModifier))
          .exists(),
      ).toBe(true);
      expect(
        wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.eventContentEl)).exists(),
      ).toBe(true);
      expect(
        wrapper
          .find(defaultMock.getSelectorWithDot(_defaultMock.eventContentRightModifier))
          .exists(),
      ).toBe(true);
      expect(
        wrapper
          .find(defaultMock.getSelectorWithDot(_defaultMock.eventContentLeftModifier))
          .exists(),
      ).toBe(true);
      expect(
        wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.eventSeparatorEl)).exists(),
      ).toBe(true);
      expect(
        wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.themeModifier)).exists(),
      ).toBe(true);
      expect(
        wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.primaryModifier)).exists(),
      ).toBe(true);
    });

    it('modifier: Should apply modifier class.', async () => {
      const wrapper = mount(Timeline, {
        props: {
          events: defaultMock.events,
          modifier: defaultMock.modifierProp,
        },
      });

      expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.primaryModifier);
    });
  });

  describe('Slots', () => {
    it('event: Should render custom "event" slot if provided.', async () => {
      const wrapper = mount(Timeline, {
        props: {
          events: defaultMock.events,
        },
        slots: {
          event: await TimelineSelectorTestData.getTimelineEventSlotCustom(),
        },
      });

      expect(
        wrapper.findAll(defaultMock.getSelectorWithDot(defaultMock.eventContentEl))[0].exists(),
      ).toBe(true);
      expect(wrapper.findAll(defaultMock.eventContentEl)[0].element.innerHTML).toBe(
        await TimelineSelectorTestData.getTimelineEventSlotCustom(),
      );
    });

    it('separator: Should render custom "separator" slot if provided.', async () => {
      const wrapper = mount(Timeline, {
        props: {
          events: defaultMock.events,
        },
        slots: {
          separator: await TimelineSelectorTestData.getTimelineSeparatorSlotCustom(),
        },
      });

      expect(
        wrapper.findAll(defaultMock.getSelectorWithDot(defaultMock.eventSeparatorEl))[0].exists(),
      ).toBe(true);
      expect(wrapper.findAll(defaultMock.eventSeparatorEl)[0].element.innerHTML).toBe(
        await TimelineSelectorTestData.getTimelineSeparatorSlotCustom(),
      );
    });

    it('opposite: Should render custom "opposite" slot if provided.', async () => {
      const wrapper = mount(Timeline, {
        props: {
          events: defaultMock.events,
        },
        slots: {
          opposite: await TimelineSelectorTestData.getTimelineOppositeSlotCustom(),
        },
      });

      expect(
        wrapper.findAll(defaultMock.getSelectorWithDot(defaultMock.eventOppositeEl))[0].exists(),
      ).toBe(true);
      expect(wrapper.findAll(defaultMock.eventOppositeEl)[0].element.innerHTML).toBe(
        await TimelineSelectorTestData.getTimelineOppositeSlotCustom(),
      );
    });
  });

  describe('Edge cases', () => {
    it('Should render nothing if events array is empty.', () => {
      const wrapper = mount(Timeline, {
        props: {
          events: [],
        },
      });

      const eventEls = wrapper.findAll(defaultMock.eventEl);

      expect(eventEls.length).toBe(0);
    });

    it('Should handle events with position "left" and "right" correctly.', () => {
      const testEvents: Array<TTimelineEvent> = [
        { position: 'left', name: 'Left Event' },
        { position: 'right', name: 'Right Event' },
      ];
      const wrapper = mount(Timeline, {
        props: {
          events: testEvents,
        },
      });

      const leftContent = wrapper.find(
        defaultMock.getSelectorWithDot(defaultMock.eventContentLeftModifier),
      );
      const rightContent = wrapper.find(
        defaultMock.getSelectorWithDot(defaultMock.eventContentRightModifier),
      );

      expect(leftContent.exists()).toBe(true);
      expect(rightContent.exists()).toBe(true);
    });
  });
});
