import { describe, it, expect } from 'vitest';
import { ref, defineComponent, h } from 'vue';
import { mount } from '@vue/test-utils';
import useVideoClasses from '../../composables/useVideoClasses/useVideoClasses';
import type { TVideoProps } from '../../Video';
import { VideoSelectorTestData } from '../test-data/Video.selector.test-data';

const defaultMock = new VideoSelectorTestData();

function mountWithComposable(
  props: TVideoProps,
  {
    focusedAction = ref(false),
    focusedVolume = ref(false),
    focusedFullscreen = ref(false),
    focusedTimeLine = ref(false),
    timeLinePopupVisible = ref(false),
  } = {},
) {
  return mount(
    defineComponent({
      setup() {
        const result = useVideoClasses(
          props,
          focusedAction,
          focusedVolume,
          focusedFullscreen,
          focusedTimeLine,
          timeLinePopupVisible,
        );
        return {
          ...result,
          focusedAction,
          focusedVolume,
          focusedFullscreen,
          focusedTimeLine,
          timeLinePopupVisible,
        };
      },

      render() {
        return h('div');
      },
    }),
  );
}

describe('useVideoClasses', () => {
  describe('Basic functionality', () => {
    it('Should return expected structure.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      expect(vm).toHaveProperty('actionClasses');
      expect(vm).toHaveProperty('volumeClasses');
      expect(vm).toHaveProperty('fullscreenClasses');
      expect(vm).toHaveProperty('timeLineClasses');
      expect(vm).toHaveProperty('timeLinePopupClasses');
    });
  });

  describe('actionClasses ComputedRef', () => {
    it('Should include base class and not focused modifier when not focused.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, { focusedAction: ref(false) });
      const vm = wrapper.vm;

      const expectedClasses = {
        [defaultMock.getSelectorWithoutDot(defaultMock.controlsActionEl)]: true,
        [defaultMock.getSelectorWithoutDot(defaultMock.controlsActionModifier)]: false,
      };

      expect(vm.actionClasses).toBeDefined();
      expect(vm.actionClasses).toEqual(expect.objectContaining(expectedClasses));
    });

    it('Should include focused modifier when focusedAction is true.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, { focusedAction: ref(true) });
      const vm = wrapper.vm;

      const expectedClasses = {
        [defaultMock.getSelectorWithoutDot(defaultMock.controlsActionEl)]: true,
        [defaultMock.getSelectorWithoutDot(defaultMock.controlsActionModifier)]: true,
      };

      expect(vm.actionClasses).toBeDefined();
      expect(vm.actionClasses).toEqual(expect.objectContaining(expectedClasses));
    });
  });

  describe('volumeClasses ComputedRef', () => {
    it('Should include base class and not focused modifier when not focused.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, { focusedVolume: ref(false) });
      const vm = wrapper.vm;

      const expectedClasses = {
        [defaultMock.getSelectorWithoutDot(defaultMock.controlsVolumeEl)]: true,
        [defaultMock.getSelectorWithoutDot(defaultMock.controlsVolumeModifier)]: false,
      };

      expect(vm.volumeClasses).toBeDefined();
      expect(vm.volumeClasses).toEqual(expect.objectContaining(expectedClasses));
    });

    it('Should include focused modifier when focusedVolume is true.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, { focusedVolume: ref(true) });
      const vm = wrapper.vm;

      const expectedClasses = {
        [defaultMock.getSelectorWithoutDot(defaultMock.controlsVolumeEl)]: true,
        [defaultMock.getSelectorWithoutDot(defaultMock.controlsVolumeModifier)]: true,
      };

      expect(vm.volumeClasses).toBeDefined();
      expect(vm.volumeClasses).toEqual(expect.objectContaining(expectedClasses));
    });
  });

  describe('fullscreenClasses ComputedRef', () => {
    it('Should include base class and not focused modifier when not focused.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, { focusedFullscreen: ref(false) });
      const vm = wrapper.vm;

      const expectedClasses = {
        [defaultMock.getSelectorWithoutDot(defaultMock.controlsFullscreenEl)]: true,
        [defaultMock.getSelectorWithoutDot(defaultMock.controlsFullscreenModifier)]: false,
      };

      expect(vm.fullscreenClasses).toBeDefined();
      expect(vm.fullscreenClasses).toEqual(expect.objectContaining(expectedClasses));
    });

    it('Should include focused modifier when focusedFullscreen is true.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, { focusedFullscreen: ref(true) });
      const vm = wrapper.vm;

      const expectedClasses = {
        [defaultMock.getSelectorWithoutDot(defaultMock.controlsFullscreenEl)]: true,
        [defaultMock.getSelectorWithoutDot(defaultMock.controlsFullscreenModifier)]: true,
      };

      expect(vm.fullscreenClasses).toBeDefined();
      expect(vm.fullscreenClasses).toEqual(expect.objectContaining(expectedClasses));
    });
  });

  describe('timeLineClasses ComputedRef', () => {
    it('Should include base class and not focused modifier when not focused.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, { focusedTimeLine: ref(false) });
      const vm = wrapper.vm;

      const expectedClasses = {
        [defaultMock.getSelectorWithoutDot(defaultMock.timelineEl)]: true,
        [defaultMock.getSelectorWithoutDot(defaultMock.timelineModifier)]: false,
      };

      expect(vm.timeLineClasses).toBeDefined();
      expect(vm.timeLineClasses).toEqual(expect.objectContaining(expectedClasses));
    });

    it('Should include focused modifier when focusedTimeLine is true.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, { focusedTimeLine: ref(true) });
      const vm = wrapper.vm;

      const expectedClasses = {
        [defaultMock.getSelectorWithoutDot(defaultMock.timelineEl)]: true,
        [defaultMock.getSelectorWithoutDot(defaultMock.timelineModifier)]: true,
      };

      expect(vm.timeLineClasses).toBeDefined();
      expect(vm.timeLineClasses).toEqual(expect.objectContaining(expectedClasses));
    });
  });

  describe('timeLinePopupClasses', () => {
    it('Should include base class and not visible modifier when not visible.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, {
        timeLinePopupVisible: ref(false),
      });
      const vm = wrapper.vm;

      const expectedClasses = {
        [defaultMock.getSelectorWithoutDot(defaultMock.timelineTimePopupEl)]: true,
        [defaultMock.getSelectorWithoutDot(defaultMock.timelineTimePopupVisibleModifier)]: false,
      };

      expect(vm.timeLinePopupClasses).toBeDefined();
      expect(vm.timeLinePopupClasses).toEqual(expect.objectContaining(expectedClasses));
    });

    it('Should include visible modifier when timeLinePopupVisible is true.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, {
        timeLinePopupVisible: ref(true),
      });
      const vm = wrapper.vm;

      const expectedClasses = {
        [defaultMock.getSelectorWithoutDot(defaultMock.timelineTimePopupEl)]: true,
        [defaultMock.getSelectorWithoutDot(defaultMock.timelineTimePopupVisibleModifier)]: true,
      };

      expect(vm.timeLinePopupClasses).toBeDefined();
      expect(vm.timeLinePopupClasses).toEqual(expect.objectContaining(expectedClasses));
    });
  });
});
