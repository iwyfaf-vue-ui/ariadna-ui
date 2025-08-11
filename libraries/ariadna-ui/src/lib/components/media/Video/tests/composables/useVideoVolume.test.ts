import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { defineComponent, h, shallowRef } from 'vue';
import { mount } from '@vue/test-utils';
import useVideoVolume from '../../composables/useVideoVolume/useVideoVolume';
import type { TVideoEmits, TVideoProps } from '../../Video';
import { VideoSelectorTestData } from '../test-data/Video.selector.test-data';
import type { TSliderTrack } from '@/lib/components/controls/Slider/types/Slider.types';

const defaultMock = new VideoSelectorTestData();

function mountWithComposable(props: TVideoProps, videoTag: Partial<HTMLVideoElement> | null = {}) {
  const emits: TVideoEmits = vi.fn();
  const videoTagRef = shallowRef(videoTag as HTMLVideoElement | null);

  return mount(
    defineComponent({
      setup() {
        const result = useVideoVolume(props, emits, videoTagRef);
        return { ...result, emits, videoTagRef };
      },

      render() {
        return h('div');
      },
    }),
  );
}

describe('useVideoVolume', () => {
  let videoTag: Partial<HTMLVideoElement>;

  beforeEach(() => {
    videoTag = {
      volume: 0.5,
    };

    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Basic functionality', () => {
    it('Should return expected structure.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      expect(vm).toHaveProperty('volumeState');
      expect(vm).toHaveProperty('volumeTracks');
      expect(vm).toHaveProperty('onToggleVolume');
      expect(vm).toHaveProperty('onClickVolume');
      expect(vm).toHaveProperty('onChangeVolume');
    });
  });

  describe('Initialization', () => {
    it('Should initialize volumeState with props.volume if not muted.', () => {
      const wrapper = mountWithComposable({ ...defaultMock.mockProps, volume: 0.7 }, videoTag);
      const vm = wrapper.vm;

      expect(vm.volumeState).toBeDefined();
      expect(vm.volumeState[0]).toEqual(0.7);
    });

    it('Should initialize volumeState with 0 if muted.', () => {
      const wrapper = mountWithComposable(
        { ...defaultMock.mockProps, volume: 0.7, muted: true },
        videoTag,
      );
      const vm = wrapper.vm;

      expect(vm.volumeState).toBeDefined();
      expect(vm.volumeState[0]).toEqual(0);
    });

    it('Should initialize volumeTracks as array with one track.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, videoTag);
      const vm = wrapper.vm;

      expect(vm.volumeTracks).toBeDefined();
      expect(Array.isArray(vm.volumeTracks)).toBe(true);
      expect(vm.volumeTracks.length).toBe(1);
      expect(vm.volumeTracks[0]).toHaveProperty('key', 'volume');
    });
  });

  describe('onToggleVolume', () => {
    it('Should do nothing if videoTagRef.value is null.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, null);
      const vm = wrapper.vm;

      vm.volumeState[0] = 0.3;
      vm.onToggleVolume();

      expect(vm.volumeState[0]).toBe(0.3);
    });

    it('Should update volumeState[0] to videoTagRef.value.volume.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, { volume: 0.8 });
      const vm = wrapper.vm;

      vm.volumeState[0] = 0.2;
      vm.onToggleVolume();

      expect(vm.volumeState[0]).toBe(0.8);
    });
  });

  describe('onClickVolume', () => {
    it('Should do nothing if videoTagRef.value is null.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, null);
      const vm = wrapper.vm;

      vm.volumeState[0] = 0.5;
      vm.onClickVolume();

      // No error, no emit
      expect(vm.emits).not.toHaveBeenCalled();
    });

    it('Should do nothing if props.muted is true.', () => {
      const wrapper = mountWithComposable({ ...defaultMock.mockProps, muted: true }, videoTag);
      const vm = wrapper.vm;

      vm.volumeState[0] = 0.5;
      vm.onClickVolume();

      expect(vm.emits).not.toHaveBeenCalled();
    });

    it('Should set volume to 0 and emit "muted" if volumeState[0] >= 1.', () => {
      const video = { volume: 1 };
      const wrapper = mountWithComposable(defaultMock.mockProps, video);
      const vm = wrapper.vm;

      vm.volumeState[0] = 1;
      vm.onClickVolume();

      expect(vm.videoTagRef?.volume).toBe(0);
      expect(vm.emits).toHaveBeenCalledWith('muted');
    });

    it('Should set volume to 1 if volumeState[0] <= 0.', () => {
      const video = { volume: 0 };
      const wrapper = mountWithComposable(defaultMock.mockProps, video);
      const vm = wrapper.vm;

      vm.volumeState[0] = 0;
      vm.onClickVolume();

      expect(vm.videoTagRef?.volume).toBe(1);
      expect(vm.emits).not.toHaveBeenCalled();
    });

    it('Should set volume to 0 and emit "muted" if volumeState[0] is between 0 and 1.', () => {
      const video = { volume: 0.5 };
      const wrapper = mountWithComposable(defaultMock.mockProps, video);
      const vm = wrapper.vm;

      vm.volumeState[0] = 0.5;
      vm.onClickVolume();

      expect(vm.videoTagRef?.volume).toBe(0);
      expect(vm.emits).toHaveBeenCalledWith('muted');
    });
  });

  describe('onChangeVolume', () => {
    it('Should set videoTagRef.value.volume to provided value (number).', () => {
      const video = { volume: 0.5 };
      const wrapper = mountWithComposable(defaultMock.mockProps, video);
      const vm = wrapper.vm;

      vm.onChangeVolume({
        track: { key: 'volume', label: false, thumb: true, zIndex: 1 } as TSliderTrack,
        value: 0.8,
        index: 0,
      });

      expect(vm.videoTagRef?.volume).toBe(0.8);
    });

    it('Should set videoTagRef.value.volume to provided value (array).', () => {
      const video = { volume: 0.5 };
      const wrapper = mountWithComposable(defaultMock.mockProps, video);
      const vm = wrapper.vm;

      vm.onChangeVolume({
        track: { key: 'volume', label: false, thumb: true, zIndex: 1 } as TSliderTrack,
        value: [0.3],
        index: 0,
      });
      expect(vm.videoTagRef?.volume).toBe(0.3);
    });

    it('Should do nothing if videoTagRef.value is null.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, videoTag);
      const vm = wrapper.vm;

      expect(() =>
        vm.onChangeVolume({
          track: { key: 'volume', label: false, thumb: true, zIndex: 1 } as TSliderTrack,
          value: 0.7,
          index: 0,
        }),
      ).not.toThrow();
    });
  });
});
