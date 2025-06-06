import { defineComponent, h } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import useTimeline from '../../composables/useTimeline/useTimeline';
import type { TTimelineEvent, TTimelineProps } from '../../Timeline';
import { ETimelineErrors, ETimelineConfig } from '../../types/Timeline.enums';
import { ELibraryConfig } from '@/types/internal';
import { TimelineSelectorTestData } from '../test-data/Timeline.selector.test-data';

const defaultMock = new TimelineSelectorTestData();

function mountWithComposable<Data extends TTimelineEvent>(props: TTimelineProps<Data>) {
  return mount(
    defineComponent({
      setup() {
        const result = useTimeline<Data>(props);
        return { ...result };
      },
      render() {
        return h('div');
      },
    }),
  );
}

describe('useTimeline', () => {
  describe('Basic functionality', () => {
    it('Should return expected structure.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      expect(vm).toHaveProperty('componentClasses');
    });

    it('Should initialize with default states and computed properties.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      expect(vm.componentClasses).toBeDefined();
      expect(typeof vm.componentClasses).toBe('string');
    });
  });

  describe('componentClasses ComputedRef', () => {
    it('Should generate correct componentClasses for default props.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      const classes = vm.componentClasses.split(' ');

      const expectedClasses = [
        defaultMock.getSelectorWithoutDot(defaultMock.rootEl),
        defaultMock.getSelectorWithoutDot(defaultMock.themeModifier),
      ];

      expect(classes).toEqual(expect.arrayContaining(expectedClasses));
      expect(classes.length).toBe(expectedClasses.length);
    });

    it('Should include modifier class when provided.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        modifier: defaultMock.modifierProp,
      });
      const vm = wrapper.vm;

      expect(vm.componentClasses).toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.primaryModifier),
      );
    });

    it('Should generate correct componentClasses with modifier.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        modifier: defaultMock.modifierProp,
      });
      const vm = wrapper.vm;

      const classes = vm.componentClasses.split(' ');

      const expectedClasses = [
        defaultMock.getSelectorWithoutDot(defaultMock.rootEl),
        defaultMock.getSelectorWithoutDot(defaultMock.themeModifier),
        defaultMock.getSelectorWithoutDot(defaultMock.primaryModifier),
      ];

      expect(classes).toEqual(expect.arrayContaining(expectedClasses));
      expect(classes.length).toBe(expectedClasses.length);
    });
  });

  describe('keyProperty validation', () => {
    it('Should not throw error if all events have the keyProperty.', () => {
      expect(() => {
        mountWithComposable(defaultMock.mockProps);
      }).not.toThrow();
    });

    it('Should throw error if any event is missing the keyProperty.', () => {
      const events: Array<TTimelineEvent> = [
        { position: 'left', name: 'Event A' },
        { position: 'right' }, // missing 'name'
      ];

      expect(() => {
        mountWithComposable({ ...defaultMock.mockProps, events: events });
      }).toThrowError(
        `${ELibraryConfig.NAME}(${ETimelineConfig.NAME}): ${ETimelineErrors.KEY_PROPERTY_ERROR} (name)`,
      );
    });

    it('Should throw error if keyProperty is a custom property and missing in event.', () => {
      const events: Array<
        TTimelineEvent & {
          id?: number;
        }
      > = [
        { position: 'left', id: 1 },
        { position: 'right', id: 2 },
        { position: 'left' }, // missing 'id'
      ];

      expect(() => {
        mountWithComposable({ ...defaultMock.mockProps, events: events, keyProperty: 'id' });
      }).toThrowError(
        `${ELibraryConfig.NAME}(${ETimelineConfig.NAME}): ${ETimelineErrors.KEY_PROPERTY_ERROR} (id)`,
      );
    });
  });
});
