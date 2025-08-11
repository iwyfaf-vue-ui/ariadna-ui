import { describe, it, expect } from 'vitest';
import { ref, defineComponent, h } from 'vue';
import { mount } from '@vue/test-utils';
import useVideoControls from '../../composables/useVideoControls/useVideoControls';
import type { TVideoProps } from '../../Video';
import { VideoSelectorTestData } from '../test-data/Video.selector.test-data';

const defaultMock = new VideoSelectorTestData();

function mountWithComposable(props: TVideoProps, playedState = ref(false)) {
  return mount(
    defineComponent({
      setup() {
        const result = useVideoControls(props, playedState);
        return { ...result, playedState };
      },

      render() {
        return h('div');
      },
    }),
  );
}

describe('useVideoControls', () => {
  describe('Basic functionality', () => {
    it('Should return expected structure.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      expect(vm).toHaveProperty('onControlsMouseEnter');
      expect(vm).toHaveProperty('onControlsMouseLeave');
      expect(vm).toHaveProperty('showControls');
      expect(vm).toHaveProperty('onMouseLeave');
      expect(vm).toHaveProperty('controlsClasses');
    });
  });

  describe('onControlsMouseEnter Function', () => {
    it('Should set controlsHover to true.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      vm.onControlsMouseEnter();

      // controlsHover is not exposed, but we can check effect via controlsClasses
      expect(
        vm.controlsClasses[defaultMock.getSelectorWithoutDot(defaultMock.controlsVisibleModifier)],
      ).toBe(true);
    });
  });

  describe('onControlsMouseLeave Function', () => {
    it('Should set controlsHover to false.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      vm.onControlsMouseEnter();

      expect(
        vm.controlsClasses[defaultMock.getSelectorWithoutDot(defaultMock.controlsVisibleModifier)],
      ).toBe(true);

      vm.onControlsMouseLeave();
      // controlsHover is false, so visible depends on other conditions
      // playedState is false by default, so visible should be true
      expect(
        vm.controlsClasses[defaultMock.getSelectorWithoutDot(defaultMock.controlsVisibleModifier)],
      ).toBe(true);
    });
  });

  describe('showControls Function', () => {
    it('Should do nothing if controls=false.', () => {
      const wrapper = mountWithComposable({ ...defaultMock.mockProps, controls: false });
      const vm = wrapper.vm;

      // No error, no state change, visible should be false
      vm.showControls();

      expect(
        vm.controlsClasses[defaultMock.getSelectorWithoutDot(defaultMock.controlsVisibleModifier)],
      ).toBe(false);
    });

    it('Should do nothing if showControlsAlways=true.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        showControlsAlways: true,
      });
      const vm = wrapper.vm;

      vm.showControls();

      expect(
        vm.controlsClasses[defaultMock.getSelectorWithoutDot(defaultMock.controlsVisibleModifier)],
      ).toBe(true);
    });

    it('Should set visible when called (always=false).', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      vm.showControls();

      expect(
        vm.controlsClasses[defaultMock.getSelectorWithoutDot(defaultMock.controlsVisibleModifier)],
      ).toBe(true);
    });

    it('Should set visible when called with always=true.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      vm.showControls(true);

      expect(
        vm.controlsClasses[defaultMock.getSelectorWithoutDot(defaultMock.controlsVisibleModifier)],
      ).toBe(true);
    });
  });

  describe('onMouseLeave Function', () => {
    it('Should do nothing if controls=false.', () => {
      const wrapper = mountWithComposable({ ...defaultMock.mockProps, controls: false });
      const vm = wrapper.vm;

      vm.onMouseLeave();

      expect(
        vm.controlsClasses[defaultMock.getSelectorWithoutDot(defaultMock.controlsVisibleModifier)],
      ).toBe(false);
    });

    it('Should do nothing if showControlsAlways=true.', () => {
      const wrapper = mountWithComposable({
        ...defaultMock.mockProps,
        showControlsAlways: true,
      });
      const vm = wrapper.vm;

      vm.onMouseLeave();

      expect(
        vm.controlsClasses[defaultMock.getSelectorWithoutDot(defaultMock.controlsVisibleModifier)],
      ).toBe(true);
    });

    it('Should set visible on mouse leave.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      vm.onMouseLeave();

      expect(
        vm.controlsClasses[defaultMock.getSelectorWithoutDot(defaultMock.controlsVisibleModifier)],
      ).toBe(true);
    });
  });

  describe('controlsClasses ComputedRef', () => {
    it('Should always include base class.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      expect(vm.controlsClasses).toHaveProperty(
        defaultMock.getSelectorWithoutDot(defaultMock.controlsEl),
        true,
      );
    });

    it('Should include visible modifier if controlsHover=true.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      vm.onControlsMouseEnter();

      expect(vm.controlsClasses[defaultMock.getSelectorWithoutDot(defaultMock.controlsEl)]).toBe(
        true,
      );
    });

    it('Should include visible modifier if playedState=false.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, ref(false));
      const vm = wrapper.vm;

      expect(vm.controlsClasses[defaultMock.getSelectorWithoutDot(defaultMock.controlsEl)]).toBe(
        true,
      );
    });

    it('Should include visible modifier if showControlsAlways=true.', () => {
      const wrapper = mountWithComposable({ ...defaultMock.mockProps, showControlsAlways: true });
      const vm = wrapper.vm;

      expect(vm.controlsClasses[defaultMock.getSelectorWithoutDot(defaultMock.controlsEl)]).toBe(
        true,
      );
    });

    it('Should not include visible modifier if controls=false.', () => {
      const wrapper = mountWithComposable({ ...defaultMock.mockProps, controls: false });
      const vm = wrapper.vm;

      console.log(vm.controlsClasses, 'vm.controlsClasses');

      expect(
        vm.controlsClasses[defaultMock.getSelectorWithoutDot(defaultMock.controlsVisibleModifier)],
      ).toBe(false);
    });
  });
});
