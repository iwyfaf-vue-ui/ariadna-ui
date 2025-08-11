import { describe, it, expect, vi, beforeEach } from 'vitest';
import { defineComponent, h, shallowRef } from 'vue';
import { mount } from '@vue/test-utils';
import useVideoTimeline from '../../composables/useVideoTimeline/useVideoTimeline';
import type { TVideoEmits, TVideoProps } from '../../Video';
import { VideoSelectorTestData } from '../test-data/Video.selector.test-data';
import type { TSliderTrack } from '@/lib/components/controls/Slider/types/Slider.types';

const defaultMock = new VideoSelectorTestData();

function makeBufferedTimeRanges(ends: number[]): TimeRanges {
  return {
    length: ends.length,
    end: (idx: number) => ends[idx],
    start: () => 0,
  } as TimeRanges;
}
const defaultDuration = 100;
const defaultCurrentTime = 20;

const defaultVideoTag = {
  currentTime: defaultCurrentTime,
  duration: defaultDuration,
  buffered: makeBufferedTimeRanges([50]),
};

function mountWithComposable(
  props: TVideoProps,
  videoTag: Partial<HTMLVideoElement> | null = {},
  playLocal = vi.fn(),
  stopLocal = vi.fn(),
) {
  const emits: TVideoEmits = vi.fn();
  const videoTagRef = shallowRef(videoTag as HTMLVideoElement | null);

  return mount(
    defineComponent({
      setup() {
        const result = useVideoTimeline(props, emits, videoTagRef, playLocal, stopLocal);
        return { ...result, emits, videoTagRef, playLocal, stopLocal };
      },

      render() {
        return h('div');
      },
    }),
  );
}

describe('useVideoTimeline', () => {
  let playLocal: ReturnType<typeof vi.fn>;
  let stopLocal: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    playLocal = vi.fn();
    stopLocal = vi.fn();
  });

  describe('Basic functionality', () => {
    it('Should return expected structure.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      expect(vm).toHaveProperty('timePassed');
      expect(vm).toHaveProperty('timeLineValues');
      expect(vm).toHaveProperty('timeLineTracks');
      expect(vm).toHaveProperty('loading');
      expect(vm).toHaveProperty('clamp');
      expect(vm).toHaveProperty('seek');
      expect(vm).toHaveProperty('fastForward');
      expect(vm).toHaveProperty('fastRewind');
      expect(vm).toHaveProperty('onVideoTimeUpdate');
      expect(vm).toHaveProperty('onVideoProgress');
      expect(vm).toHaveProperty('onVideoWaiting');
      expect(vm).toHaveProperty('onVideoCanPlay');
      expect(vm).toHaveProperty('onChangeTimeLineStart');
      expect(vm).toHaveProperty('onChangeTimeLineEnd');
    });
  });

  describe('clamp Function', () => {
    it('Should return the middle value if within min and max.', () => {
      const wrapper = mountWithComposable(
        defaultMock.mockProps,
        defaultVideoTag,
        playLocal,
        stopLocal,
      );
      const vm = wrapper.vm;

      expect(vm.clamp(0, 5, 10)).toBe(5);
    });

    it('Should return min if middle is less than min.', () => {
      const wrapper = mountWithComposable(
        defaultMock.mockProps,
        defaultVideoTag,
        playLocal,
        stopLocal,
      );
      const vm = wrapper.vm;

      expect(vm.clamp(0, -5, 10)).toBe(0);
    });

    it('Should return max if middle is greater than max.', () => {
      const wrapper = mountWithComposable(
        defaultMock.mockProps,
        defaultVideoTag,
        playLocal,
        stopLocal,
      );
      const vm = wrapper.vm;

      expect(vm.clamp(0, 15, 10)).toBe(10);
    });
  });

  describe('seek Function', () => {
    it('Should set currentTime on videoTagRef.value.', () => {
      const videoTag = { ...defaultVideoTag, currentTime: 0 };
      const wrapper = mountWithComposable(defaultMock.mockProps, videoTag, playLocal, stopLocal);
      const vm = wrapper.vm;

      vm.seek(42);

      expect(vm.videoTagRef?.currentTime).toBe(42);
    });

    it('Should do nothing if videoTagRef.value is null.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, null, playLocal, stopLocal);
      const vm = wrapper.vm;

      expect(() => vm.seek(10)).not.toThrow();
    });
  });

  describe('fastForward Function', () => {
    it('Should set currentTime to clamped value (within duration).', () => {
      const videoTag = { ...defaultVideoTag, currentTime: 90, duration: 100 };
      const wrapper = mountWithComposable(defaultMock.mockProps, videoTag, playLocal, stopLocal);
      const vm = wrapper.vm;

      vm.fastForward();

      expect(vm.videoTagRef?.currentTime).toBe(100);
    });

    it('Should set currentTime to clamped value (not exceeding duration).', () => {
      const videoTag = { ...defaultVideoTag, currentTime: 50, duration: 100 };
      const wrapper = mountWithComposable(defaultMock.mockProps, videoTag, playLocal, stopLocal);
      const vm = wrapper.vm;

      vm.fastForward();
      expect(vm.videoTagRef?.currentTime).toBe(60);
    });

    it('Should do nothing if videoTagRef.value is null.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, null, playLocal, stopLocal);
      const vm = wrapper.vm;

      expect(() => vm.fastForward()).not.toThrow();
    });

    it('Should do nothing if controls is false.', () => {
      const wrapper = mountWithComposable(
        { ...defaultMock.mockProps, controls: false },
        defaultVideoTag,
        playLocal,
        stopLocal,
      );
      const vm = wrapper.vm;

      const seekSpy = vi.spyOn(vm, 'seek');
      vm.fastForward();

      expect(seekSpy).not.toHaveBeenCalled();
    });
  });

  describe('fastRewind Function', () => {
    it('Should set currentTime to clamped value (not less than 0).', () => {
      const videoTag = { ...defaultVideoTag, currentTime: 3, duration: 100 };
      const wrapper = mountWithComposable(defaultMock.mockProps, videoTag, playLocal, stopLocal);
      const vm = wrapper.vm;

      vm.fastRewind();
      expect(vm.videoTagRef?.currentTime).toBe(0);
    });

    it('Should set currentTime to clamped value (within duration).', () => {
      const videoTag = { ...defaultVideoTag, currentTime: 50, duration: 100 };
      const wrapper = mountWithComposable(defaultMock.mockProps, videoTag, playLocal, stopLocal);
      const vm = wrapper.vm;

      vm.fastRewind();
      expect(vm.videoTagRef?.currentTime).toBe(40);
    });

    it('Should do nothing if videoTagRef.value is null.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, null, playLocal, stopLocal);
      const vm = wrapper.vm;

      expect(() => vm.fastRewind()).not.toThrow();
    });

    it('Should do nothing if controls is false.', () => {
      const wrapper = mountWithComposable(
        { ...defaultMock.mockProps, controls: false },
        defaultVideoTag,
        playLocal,
        stopLocal,
      );
      const vm = wrapper.vm;

      const seekSpy = vi.spyOn(vm, 'seek');
      vm.fastRewind();
      expect(seekSpy).not.toHaveBeenCalled();
    });
  });

  describe('onVideoTimeUpdate Function', () => {
    it('Should do nothing if videoTagRef.value is null.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, null, playLocal, stopLocal);
      const vm = wrapper.vm;

      expect(() => vm.onVideoTimeUpdate()).not.toThrow();
    });
  });

  describe('onVideoProgress Function', () => {
    it('Should do nothing if videoTagRef.value is null.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, null, playLocal, stopLocal);
      const vm = wrapper.vm;

      expect(() => vm.onVideoProgress()).not.toThrow();
    });
  });

  describe('onVideoWaiting Function', () => {
    it('Should set loading to true.', () => {
      const wrapper = mountWithComposable(
        defaultMock.mockProps,
        defaultVideoTag,
        playLocal,
        stopLocal,
      );
      const vm = wrapper.vm;

      vm.loading = false;
      vm.onVideoWaiting();
      expect(vm.loading).toBe(true);
    });
  });

  describe('onVideoCanPlay Function', () => {
    it('Should set loading to false.', () => {
      const wrapper = mountWithComposable(
        defaultMock.mockProps,
        defaultVideoTag,
        playLocal,
        stopLocal,
      );
      const vm = wrapper.vm;

      vm.loading = true;
      vm.onVideoCanPlay();
      expect(vm.loading).toBe(false);
    });
  });

  describe('onChangeTimeLineStart', () => {
    it('Should call stopLocal and seek to correct time.', () => {
      const videoTag = { ...defaultVideoTag, duration: 100 };
      const stopLocalMock = vi.fn();
      const wrapper = mountWithComposable(
        defaultMock.mockProps,
        videoTag,
        playLocal,
        stopLocalMock,
      );
      const vm = wrapper.vm;

      const defaultSliderTrack: TSliderTrack = {
        key: 'playing',
        label: false,
        thumb: true,
        zIndex: 3,
      };

      vm.onChangeTimeLineStart({
        track: defaultSliderTrack,
        value: 50,
        index: 0,
      });

      expect(stopLocalMock).toHaveBeenCalled();
      expect(vm.videoTagRef?.currentTime).toBe(50);
    });

    it('Should do nothing if videoTagRef.value is null.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, null, playLocal, stopLocal);
      const vm = wrapper.vm;

      const defaultSliderTrack: TSliderTrack = {
        key: 'playing',
        label: false,
        thumb: true,
        zIndex: 3,
      };

      expect(() =>
        vm.onChangeTimeLineStart({
          track: defaultSliderTrack,
          value: 50,
          index: 0,
        }),
      ).not.toThrow();
    });
  });

  describe('onChangeTimeLineEnd', () => {
    it('Should call playLocal and seek to correct time.', () => {
      const videoTag = { ...defaultVideoTag, duration: 100 };
      const playLocalMock = vi.fn();
      const wrapper = mountWithComposable(
        defaultMock.mockProps,
        videoTag,
        playLocalMock,
        stopLocal,
      );
      const vm = wrapper.vm;

      const defaultSliderTrack: TSliderTrack = {
        key: 'playing',
        label: false,
        thumb: true,
        zIndex: 3,
      };

      vm.onChangeTimeLineEnd({
        track: defaultSliderTrack,
        value: 80,
        index: 0,
      });

      expect(playLocalMock).toHaveBeenCalled();
      expect(vm.videoTagRef?.currentTime).toBe(80);
    });

    it('Should do nothing if videoTagRef.value is null.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, null, playLocal, stopLocal);
      const vm = wrapper.vm;

      const defaultSliderTrack: TSliderTrack = {
        key: 'playing',
        label: false,
        thumb: true,
        zIndex: 3,
      };

      expect(() =>
        vm.onChangeTimeLineEnd({
          track: defaultSliderTrack,
          value: 80,
          index: 0,
        }),
      ).not.toThrow();
    });
  });
});
