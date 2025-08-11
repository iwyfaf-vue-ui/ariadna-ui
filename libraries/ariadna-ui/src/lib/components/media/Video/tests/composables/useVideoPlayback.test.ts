import { describe, it, expect, vi, beforeEach } from 'vitest';
import { defineComponent, h, shallowRef } from 'vue';
import { mount } from '@vue/test-utils';
import useVideoPlayback from '../../composables/useVideoPlayback/useVideoPlayback';
import type { TVideoEmits, TVideoProps } from '../../Video';
import { VideoSelectorTestData } from '../test-data/Video.selector.test-data';

const defaultMock = new VideoSelectorTestData();

function mountWithComposable(props: TVideoProps, videoTag: Partial<HTMLVideoElement> | null = {}) {
  const emits: TVideoEmits = vi.fn();
  const videoTagRef = shallowRef(videoTag as HTMLVideoElement | null);

  return mount(
    defineComponent({
      setup() {
        const result = useVideoPlayback(props, emits, videoTagRef);
        return { ...result, emits, videoTagRef };
      },

      render() {
        return h('div');
      },
    }),
  );
}

describe('useVideoPlayback', () => {
  let playMock: ReturnType<typeof vi.fn>;
  let pauseMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    playMock = vi.fn();
    pauseMock = vi.fn();
  });

  describe('Basic functionality', () => {
    it('Should return expected structure.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      expect(vm).toHaveProperty('playedState');
      expect(vm).toHaveProperty('playLocal');
      expect(vm).toHaveProperty('stopLocal');
      expect(vm).toHaveProperty('togglePlay');
      expect(vm).toHaveProperty('onVideoPlay');
      expect(vm).toHaveProperty('onVideoPause');
    });
  });

  describe('playedState', () => {
    it('Should be false by default.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, {
        play: playMock,
        pause: pauseMock,
      });
      const vm = wrapper.vm;

      expect(vm.playedState).toBe(false);
    });
  });

  describe('playLocal', () => {
    it('Should call play() on videoTagRef.value.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, {
        play: playMock,
        pause: pauseMock,
      });
      const vm = wrapper.vm;

      vm.playLocal();

      expect(playMock).toHaveBeenCalledTimes(1);
    });

    it('Should do nothing if videoTagRef.value is null.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, null);
      const vm = wrapper.vm;

      expect(() => vm.playLocal()).not.toThrow();
    });

    it('Should do nothing if videoTagRef.value has no play method.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, {});
      const vm = wrapper.vm;

      expect(() => vm.playLocal()).not.toThrow();
    });
  });

  describe('stopLocal', () => {
    it('Should call pause() on videoTagRef.value.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, {
        play: playMock,
        pause: pauseMock,
      });
      const vm = wrapper.vm;

      vm.stopLocal();

      expect(pauseMock).toHaveBeenCalledTimes(1);
    });

    it('Should do nothing if videoTagRef.value is null.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, null);
      const vm = wrapper.vm;

      expect(() => vm.stopLocal()).not.toThrow();
    });

    it('Should do nothing if videoTagRef.value has no pause method.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, { play: playMock });
      const vm = wrapper.vm;

      expect(() => vm.stopLocal()).not.toThrow();
    });
  });

  describe('togglePlay', () => {
    it('Should do nothing if controls is false.', () => {
      const wrapper = mountWithComposable(
        { ...defaultMock.mockProps, controls: false },
        { play: playMock, pause: pauseMock },
      );
      const vm = wrapper.vm;

      vm.playedState = true;
      vm.togglePlay();

      expect(playMock).not.toHaveBeenCalled();
      expect(pauseMock).not.toHaveBeenCalled();
    });

    it('Should call stopLocal if playedState is true.', () => {
      const play = vi.fn();
      const pause = vi.fn();
      const wrapper = mountWithComposable(defaultMock.mockProps, {
        play,
        pause,
      });
      const vm = wrapper.vm;

      vm.playedState = true;
      vm.togglePlay();

      expect(pause).toHaveBeenCalledTimes(1);
    });

    it('Should call playLocal if playedState is false.', () => {
      const play = vi.fn();
      const pause = vi.fn();
      const wrapper = mountWithComposable(defaultMock.mockProps, {
        play,
        pause,
      });
      const vm = wrapper.vm;

      vm.playedState = false;
      vm.togglePlay();

      expect(play).toHaveBeenCalledTimes(1);
      expect(pause).not.toHaveBeenCalled();
    });
  });

  describe('onVideoPlay', () => {
    it('Should set playedState to true and emit "play".', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, {
        play: playMock,
        pause: pauseMock,
      });
      const vm = wrapper.vm;

      vm.playedState = false;
      vm.onVideoPlay();

      expect(vm.playedState).toBe(true);
      expect(vm.emits).toHaveBeenCalledWith('play');
    });
  });

  describe('onVideoPause', () => {
    it('Should set playedState to false and emit "stop".', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps, {
        play: playMock,
        pause: pauseMock,
      });
      const vm = wrapper.vm;

      vm.playedState = true;
      vm.onVideoPause();

      expect(vm.playedState).toBe(false);
      expect(vm.emits).toHaveBeenCalledWith('stop');
    });
  });
});
