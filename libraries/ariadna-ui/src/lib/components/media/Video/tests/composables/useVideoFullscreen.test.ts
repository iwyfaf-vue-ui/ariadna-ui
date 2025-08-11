import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ref, defineComponent, h } from 'vue';
import { mount } from '@vue/test-utils';
import useVideoFullscreen from '../../composables/useVideoFullscreen/useVideoFullscreen';
import type { TVideoEmits, TVideoProps } from '../../Video';
import { VideoSelectorTestData } from '../test-data/Video.selector.test-data';

const defaultMock = new VideoSelectorTestData();

function mountWithComposable(props: TVideoProps) {
  const emits: TVideoEmits = vi.fn();
  const videoRef = ref(document.createElement('div'));

  return mount(
    defineComponent({
      setup() {
        const result = useVideoFullscreen(props, emits, videoRef);
        return { ...result, emits, videoRef };
      },

      render() {
        return h('div');
      },
    }),
  );
}

describe('useVideoFullscreen', () => {
  let originalRequestFullscreen: any;
  let originalExitFullscreen: any;
  let originalAddEventListener: any;
  let originalRemoveEventListener: any;
  let mockRequestFullscreen: any;
  let mockExitFullscreen: any;
  let mockAddEventListener: any;
  let mockRemoveEventListener: any;

  beforeEach(() => {
    mockRequestFullscreen = vi.fn();
    mockExitFullscreen = vi.fn().mockResolvedValue(undefined);
    mockAddEventListener = vi.fn();
    mockRemoveEventListener = vi.fn();

    originalRequestFullscreen = HTMLDivElement.prototype.requestFullscreen;
    originalExitFullscreen = document.exitFullscreen;
    originalAddEventListener = document.addEventListener;
    originalRemoveEventListener = document.removeEventListener;

    HTMLDivElement.prototype.requestFullscreen = mockRequestFullscreen;
    document.exitFullscreen = mockExitFullscreen;
    document.addEventListener = mockAddEventListener;
    document.removeEventListener = mockRemoveEventListener;
  });

  afterEach(() => {
    HTMLDivElement.prototype.requestFullscreen = originalRequestFullscreen;
    document.exitFullscreen = originalExitFullscreen;
    document.addEventListener = originalAddEventListener;
    document.removeEventListener = originalRemoveEventListener;
    vi.restoreAllMocks();
  });

  describe('Basic functionality', () => {
    it('Should return expected structure.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      expect(vm).toHaveProperty('fullscreenState');
      expect(vm).toHaveProperty('fullscreenLocal');
      expect(vm).toHaveProperty('unFullscreenLocal');
      expect(vm).toHaveProperty('toggleFullscreen');
    });
  });

  describe('fullscreenState', () => {
    it('Should be false by default.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      expect(vm.fullscreenState).toBe(false);
    });
  });

  describe('fullscreenLocal Ref', () => {
    it('Should call requestFullscreen on videoRef.value.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      vm.fullscreenLocal();

      expect(mockRequestFullscreen).toHaveBeenCalledTimes(1);
    });
  });

  describe('unFullscreenLocal Function', () => {
    it('Should call document.exitFullscreen.', async () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      await vm.unFullscreenLocal();

      expect(mockExitFullscreen).toHaveBeenCalledTimes(1);
    });
  });

  describe('toggleFullscreen Function', () => {
    it('Should do nothing if props.controls is false.', () => {
      const wrapper = mountWithComposable({ ...defaultMock.mockProps, controls: false });
      const vm = wrapper.vm;

      vm.toggleFullscreen();

      expect(mockRequestFullscreen).not.toHaveBeenCalled();
      expect(mockExitFullscreen).not.toHaveBeenCalled();
    });

    it('Should call unFullscreenLocal if fullscreenState is true.', async () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      vm.fullscreenState = true;

      await vm.toggleFullscreen();
      expect(mockExitFullscreen).toHaveBeenCalledTimes(1);
      expect(mockRequestFullscreen).not.toHaveBeenCalled();
    });

    it('Should call fullscreenLocal if fullscreenState is false.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      vm.fullscreenState = false;
      vm.toggleFullscreen();

      expect(mockRequestFullscreen).toHaveBeenCalledTimes(1);
      expect(mockExitFullscreen).not.toHaveBeenCalled();
    });
  });

  describe('onFullscreenChange Function', () => {
    it('Should add and remove fullscreenchange event listeners on mount and unmount.', async () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);

      expect(mockAddEventListener).toHaveBeenCalledWith('fullscreenchange', expect.any(Function));

      wrapper.unmount();
      expect(mockRemoveEventListener).toHaveBeenCalledWith(
        'fullscreenchange',
        expect.any(Function),
      );
    });
  });
});
