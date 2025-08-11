import { describe, it, expect, beforeEach } from 'vitest';
import { ref, defineComponent, h, shallowRef } from 'vue';
import { mount } from '@vue/test-utils';
import useVideoTimelinePopup from '../../composables/useVideoTimelinePopup/useVideoTimelinePopup';

function mountWithComposable({
  timeLineValues,
  clamp,
  timeLineRef,
  timeLinePopupRef,
  videoTagRef,
}: any) {
  return mount(
    defineComponent({
      setup() {
        const result = useVideoTimelinePopup(
          timeLineValues,
          clamp,
          timeLineRef,
          timeLinePopupRef,
          videoTagRef,
        );
        return { ...result, timeLineValues, clamp, timeLineRef, timeLinePopupRef, videoTagRef };
      },

      render() {
        return h('div');
      },
    }),
  );
}

describe('useVideoTimelinePopup', () => {
  let timeLineValues: ReturnType<typeof ref>;
  let clamp: (min: number, middle: number, max: number) => number;
  let timeLineRef: ReturnType<typeof shallowRef>;
  let timeLinePopupRef: ReturnType<typeof shallowRef>;
  let videoTagRef: ReturnType<typeof shallowRef>;

  beforeEach(() => {
    timeLineValues = ref([0, 0, 0]);
    clamp = (min, middle, max) => Math.max(min, Math.min(middle, max));
    timeLineRef = shallowRef({
      getBoundingClientRect: () => ({ left: 100 }),
      offsetWidth: 200,
    } as unknown as HTMLDivElement);
    timeLinePopupRef = shallowRef({
      offsetWidth: 40,
    } as unknown as HTMLSpanElement);
    videoTagRef = shallowRef({
      duration: 100,
    } as unknown as HTMLVideoElement);
  });

  describe('Structure', () => {
    it('Should return expected structure.', () => {
      const wrapper = mountWithComposable({
        timeLineValues,
        clamp,
        timeLineRef,
        timeLinePopupRef,
        videoTagRef,
      });
      const vm = wrapper.vm;

      expect(vm).toHaveProperty('timeLinePopupLeft');
      expect(vm).toHaveProperty('timeLinePopupTime');
      expect(vm).toHaveProperty('timeLinePopupVisible');
      expect(vm).toHaveProperty('onTimeLineMouseEnter');
      expect(vm).toHaveProperty('onTimeLineMouseLeave');
      expect(vm).toHaveProperty('onTimeLineMouseMove');
    });
  });

  describe('onTimeLineMouseEnter', () => {
    it('Should set timeLinePopupVisible to true.', () => {
      const wrapper = mountWithComposable({
        timeLineValues,
        clamp,
        timeLineRef,
        timeLinePopupRef,
        videoTagRef,
      });
      const vm = wrapper.vm;

      vm.timeLinePopupVisible = false;
      vm.onTimeLineMouseEnter();

      expect(vm.timeLinePopupVisible).toBe(true);
    });
  });

  describe('onTimeLineMouseLeave', () => {
    it('Should set timeLinePopupVisible to false.', () => {
      const wrapper = mountWithComposable({
        timeLineValues,
        clamp,
        timeLineRef,
        timeLinePopupRef,
        videoTagRef,
      });
      const vm = wrapper.vm;

      vm.timeLinePopupVisible = true;
      vm.onTimeLineMouseLeave();

      expect(vm.timeLinePopupVisible).toBe(false);
    });
  });

  describe('onTimeLineMouseMove', () => {
    it('Should do nothing if timeLinePopupRef is null.', () => {
      timeLinePopupRef = shallowRef(null);
      const wrapper = mountWithComposable({
        timeLineValues,
        clamp,
        timeLineRef,
        timeLinePopupRef,
        videoTagRef,
      });
      const vm = wrapper.vm;

      vm.timeLinePopupLeft = 0;
      vm.timeLinePopupTime = 0;
      vm.timeLineValues[2] = 0;

      vm.onTimeLineMouseMove(new MouseEvent('mousemove', { clientX: 150 }));

      expect(vm.timeLinePopupLeft).toBe(0);
      expect(vm.timeLinePopupTime).toBe(0);
      expect(vm.timeLineValues[2]).toBe(0);
    });

    it('Should do nothing if timeLineRef is null.', () => {
      timeLineRef = shallowRef(null);
      const wrapper = mountWithComposable({
        timeLineValues,
        clamp,
        timeLineRef,
        timeLinePopupRef,
        videoTagRef,
      });
      const vm = wrapper.vm;

      vm.timeLinePopupLeft = 0;
      vm.timeLinePopupTime = 0;
      vm.timeLineValues[2] = 0;

      vm.onTimeLineMouseMove(new MouseEvent('mousemove', { clientX: 150 }));

      expect(vm.timeLinePopupLeft).toBe(0);
      expect(vm.timeLinePopupTime).toBe(0);
      expect(vm.timeLineValues[2]).toBe(0);
    });

    it('Should do nothing if videoTagRef is null.', () => {
      videoTagRef = shallowRef(null);
      const wrapper = mountWithComposable({
        timeLineValues,
        clamp,
        timeLineRef,
        timeLinePopupRef,
        videoTagRef,
      });
      const vm = wrapper.vm;

      vm.timeLinePopupLeft = 0;
      vm.timeLinePopupTime = 0;
      vm.timeLineValues[2] = 0;

      vm.onTimeLineMouseMove(new MouseEvent('mousemove', { clientX: 150 }));

      expect(vm.timeLinePopupLeft).toBe(0);
      expect(vm.timeLinePopupTime).toBe(0);
      expect(vm.timeLineValues[2]).toBe(0);
    });

    it('Should correctly calculate popup position and time.', () => {
      const wrapper = mountWithComposable({
        timeLineValues,
        clamp,
        timeLineRef,
        timeLinePopupRef,
        videoTagRef,
      });
      const vm = wrapper.vm;

      // clientX = 200, left = 100, offsetWidth = 200, popup offsetWidth = 40
      // startPosition = 100
      // endPosition = 200 - 40 = 160
      // popupLeft = clamp(0, 200 - 100 - 20, 160) = clamp(0, 80, 160) = 80
      // currentPositionForTimeLine = clamp(0, 200 - 100, 200) = clamp(0, 100, 200) = 100
      // popupTime = (100 / 200) * 100 = 50
      // timeLineValues[2] = (50 / 100) * 100 = 50

      vm.onTimeLineMouseMove(new MouseEvent('mousemove', { clientX: 200 }));

      expect(vm.timeLinePopupLeft).toBe(80);
      expect(vm.timeLinePopupTime).toBe(50);
      expect(vm.timeLineValues[2]).toBe(50);
    });

    it('Should clamp popup position and time at min and max.', () => {
      const wrapper = mountWithComposable({
        timeLineValues,
        clamp,
        timeLineRef,
        timeLinePopupRef,
        videoTagRef,
      });
      const vm = wrapper.vm;

      // clientX = 50 (before timeline)
      vm.onTimeLineMouseMove(new MouseEvent('mousemove', { clientX: 50 }));
      expect(vm.timeLinePopupLeft).toBe(0);
      expect(vm.timeLinePopupTime).toBe(0);
      expect(vm.timeLineValues[2]).toBe(0);

      // clientX = 400 (after timeline)
      vm.onTimeLineMouseMove(new MouseEvent('mousemove', { clientX: 400 }));
      // left = 100, offsetWidth = 200, popup offsetWidth = 40
      // popupLeft = clamp(0, 400 - 100 - 20, 160) = clamp(0, 280, 160) = 160
      // currentPositionForTimeLine = clamp(0, 400 - 100, 200) = clamp(0, 300, 200) = 200
      // popupTime = (200 / 200) * 100 = 100
      // timeLineValues[2] = (100 / 100) * 100 = 100
      expect(vm.timeLinePopupLeft).toBe(160);
      expect(vm.timeLinePopupTime).toBe(100);
      expect(vm.timeLineValues[2]).toBe(100);
    });
  });
});
