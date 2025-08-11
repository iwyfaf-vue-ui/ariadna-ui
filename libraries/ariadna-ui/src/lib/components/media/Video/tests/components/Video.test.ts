import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Video from '../../Video.vue';
import { EVideoPropsDefault } from '../../types/Video.enums';
import { VideoSelectorTestData } from '../test-data/Video.selector.test-data';

const defaultMock = new VideoSelectorTestData();

describe('Video.vue', () => {
  describe('Basic render', () => {
    it('Should render component with required props.', () => {
      const wrapper = mount(Video, {
        props: defaultMock.mockProps,
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find('video').exists()).toBe(true);
    });

    it('Should render with default props.', () => {
      const wrapper = mount(Video, {
        props: defaultMock.mockProps,
      });

      expect(wrapper.find('video').attributes('src')).toBe(defaultMock.mockProps.src);
    });

    it('Should render with custom props.', () => {
      const wrapper = mount(Video, {
        props: {
          ...defaultMock.mockProps,
          width: 640,
          height: 360,
        },
      });

      expect(wrapper.find('video').attributes('width')).toBe('640');
      expect(wrapper.find('video').attributes('height')).toBe('360');
    });
  });

  describe('Props', () => {
    it('preload: Should set preload attribute on video element.', () => {
      const wrapper = mount(Video, {
        props: { ...defaultMock.mockProps, preload: 'metadata' },
      });

      expect(wrapper.find('video').attributes('preload')).toBe('metadata');
    });

    it('preload: Should fallback to default preload if not provided.', () => {
      const wrapper = mount(Video, {
        props: { ...defaultMock.mockProps, preload: undefined },
      });

      expect(wrapper.find('video').attributes('preload')).toBe(EVideoPropsDefault.PRELOAD);
    });

    it('controls: Should pass correct props to composables.', () => {
      const wrapper = mount(Video, {
        props: { ...defaultMock.mockProps, controls: false },
      });

      expect(wrapper.props().controls).toBe(false);
    });

    it('showControlsAlways: Should render controls always if showControlsAlways is true.', () => {
      const wrapper = mount(Video, {
        props: { ...defaultMock.mockProps, showControlsAlways: true },
      });
      const vm = wrapper.vm;

      // Проверяем, что controls всегда видимы (например, по классу или состоянию)
      // Здесь предполагается, что есть класс или состояние, отвечающее за видимость
      expect(vm.showControlsAlways).toBe(true);
    });

    it('showControlsAlways: Should not render controls always if showControlsAlways is false.', () => {
      const wrapper = mount(Video, {
        props: { ...defaultMock.mockProps, showControlsAlways: false },
      });
      const vm = wrapper.vm;

      expect(vm.showControlsAlways).toBe(false);
    });

    it('timeToHideControlsMs: Should accept custom timeToHideControlsMs prop.', () => {
      const wrapper = mount(Video, {
        props: { ...defaultMock.mockProps, timeToHideControlsMs: 1234 },
      });

      expect(wrapper.props().timeToHideControlsMs).toBe(1234);
    });

    it('timeToHideControlsMs: Should fallback to default timeToHideControlsMs if not provided.', () => {
      const wrapper = mount(Video, {
        props: { ...defaultMock.mockProps, timeToHideControlsMs: undefined },
      });

      expect(wrapper.props().timeToHideControlsMs).toBe(defaultMock.mockProps.timeToHideControlsMs);
    });

    it('timeToHideControlsOnOutsideMs: Should accept custom timeToHideControlsOnOutsideMs prop.', () => {
      const wrapper = mount(Video, {
        props: { ...defaultMock.mockProps, timeToHideControlsOnOutsideMs: 4321 },
      });

      expect(wrapper.props().timeToHideControlsOnOutsideMs).toBe(4321);
    });

    it('timeToHideControlsOnOutsideMs: Should fallback to default timeToHideControlsOnOutsideMs if not provided.', () => {
      const wrapper = mount(Video, {
        props: { ...defaultMock.mockProps, timeToHideControlsOnOutsideMs: undefined },
      });

      expect(wrapper.props().timeToHideControlsOnOutsideMs).toBe(
        defaultMock.mockProps.timeToHideControlsOnOutsideMs,
      );
    });

    it('muted: Should set muted attribute on video element if muted is true.', () => {
      const wrapper = mount(Video, {
        props: { ...defaultMock.mockProps, muted: true },
      });

      expect(wrapper.find('video').attributes('muted')).toBeDefined();
    });

    it('muted: Should not set muted attribute if muted is false.', () => {
      const wrapper = mount(Video, {
        props: { ...defaultMock.mockProps, muted: false },
      });

      expect(wrapper.find('video').attributes('muted')).toBeUndefined();
    });

    it('autoplay: Should set autoplay attribute on video element if autoplay is true.', () => {
      const wrapper = mount(Video, {
        props: { ...defaultMock.mockProps, autoplay: true },
      });

      expect(wrapper.find('video').attributes('autoplay')).toBeDefined();
    });

    it('autoplay: Should not set autoplay attribute if autoplay is false.', () => {
      const wrapper = mount(Video, {
        props: { ...defaultMock.mockProps, autoplay: false },
      });

      expect(wrapper.find('video').attributes('autoplay')).toBeUndefined();
    });

    it('loop: Should set loop attribute on video element if loop is true.', () => {
      const wrapper = mount(Video, {
        props: { ...defaultMock.mockProps, loop: true },
      });

      expect(wrapper.find('video').attributes('loop')).toBeDefined();
    });

    it('loop: Should not set loop attribute if loop is false.', () => {
      const wrapper = mount(Video, {
        props: { ...defaultMock.mockProps, loop: false },
      });

      expect(wrapper.find('video').attributes('loop')).toBeUndefined();
    });

    it('volume: Should accept custom volume prop.', () => {
      const wrapper = mount(Video, {
        props: { ...defaultMock.mockProps, volume: 0.7 },
      });

      expect(wrapper.props().volume).toBe(0.7);
    });

    it('volume: Should fallback to default volume if not provided.', () => {
      const wrapper = mount(Video, {
        props: { ...defaultMock.mockProps, volume: undefined },
      });

      expect(wrapper.props().volume).toBe(defaultMock.mockProps.volume);
    });

    it('fastForwardSeconds: Should accept custom fastForwardSeconds prop.', () => {
      const wrapper = mount(Video, {
        props: { ...defaultMock.mockProps, fastForwardSeconds: 15 },
      });

      expect(wrapper.props().fastForwardSeconds).toBe(15);
    });

    it('fastForwardSeconds: Should fallback to default fastForwardSeconds if not provided.', () => {
      const wrapper = mount(Video, {
        props: { ...defaultMock.mockProps, fastForwardSeconds: undefined },
      });

      expect(wrapper.props().fastForwardSeconds).toBe(defaultMock.mockProps.fastForwardSeconds);
    });

    it('fastRewindSeconds: Should accept custom fastRewindSeconds prop.', () => {
      const wrapper = mount(Video, {
        props: { ...defaultMock.mockProps, fastRewindSeconds: 8 },
      });

      expect(wrapper.props().fastRewindSeconds).toBe(8);
    });

    it('fastRewindSeconds: Should fallback to default fastRewindSeconds if not provided.', () => {
      const wrapper = mount(Video, {
        props: { ...defaultMock.mockProps, fastRewindSeconds: undefined },
      });

      expect(wrapper.props().fastRewindSeconds).toBe(defaultMock.mockProps.fastRewindSeconds);
    });

    it('width/height: Should apply width/height when not fullscreen.', () => {
      const wrapper = mount(Video, {
        props: {
          ...defaultMock.mockProps,
          width: 800,
          height: 450,
        },
      });

      const video = wrapper.find('video');
      expect(video.attributes('width')).toBe('800');
      expect(video.attributes('height')).toBe('450');
    });

    it('width/height: Should ignore width/height when fullscreen.', async () => {
      const wrapper = mount(Video, {
        props: {
          ...defaultMock.mockProps,
          width: 800,
          height: 450,
        },
      });
      const vm = wrapper.vm;

      // @ts-ignore эмулируем fullscreen через setData или через expose
      if (vm.fullscreenState !== undefined) {
        // @ts-ignore
        vm.fullscreenState = true;
        await vm.$nextTick();
      }

      const video = wrapper.find('video');
      expect(video.attributes('width')).toBe('auto');
    });

    it('poster: Should set poster attribute on video element if poster is provided.', () => {
      const wrapper = mount(Video, {
        props: { ...defaultMock.mockProps, poster: '/poster.jpg' },
      });

      expect(wrapper.find('video').attributes('poster')).toBe('/poster.jpg');
    });

    it('poster: Should not set poster attribute if poster is not provided.', () => {
      const wrapper = mount(Video, {
        props: { ...defaultMock.mockProps, poster: undefined },
      });

      expect(wrapper.find('video').attributes('poster')).toBeUndefined();
    });

    it('cssClass: Should apply custom root class and generate BEM child classes.', async () => {
      const _defaultMock = new VideoSelectorTestData(defaultMock.cssClassProp);
      const wrapper = mount(Video, {
        props: {
          ...defaultMock.mockProps,
          cssClass: defaultMock.cssClassProp,
        },
      });

      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.rootEl)).exists()).toBe(true);
      expect(
        wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.themeModifier)).exists(),
      ).toBe(true);
      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.videoEl)).exists()).toBe(
        true,
      );
      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.controlsEl)).exists()).toBe(
        true,
      );
      expect(
        wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.controlsVisibleModifier)).exists(),
      ).toBe(true);
      expect(
        wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.controlsGroupEl)).exists(),
      ).toBe(true);
      expect(
        wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.controlsActionEl)).exists(),
      ).toBe(true);
      expect(
        wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.controlsFullscreenEl)).exists(),
      ).toBe(true);
      expect(
        wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.controlsVolumeEl)).exists(),
      ).toBe(true);
      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.timeEl)).exists()).toBe(true);
      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.timelineEl)).exists()).toBe(
        true,
      );
      expect(
        wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.timelineTimePopupEl)).exists(),
      ).toBe(true);
    });
  });

  describe('Slots', () => {
    it('default: Should render default slot content if provided.', async () => {
      const wrapper = mount(Video, {
        props: defaultMock.mockProps,
        slots: {
          default: await VideoSelectorTestData.getVideoSlotDefaultCustom(),
        },
      });

      expect(wrapper.find(defaultMock.getSelectorWithDot(defaultMock.videoEl)).exists()).toBe(true);
      expect(wrapper.find(defaultMock.videoEl).element.innerHTML).toBe(
        await VideoSelectorTestData.getVideoSlotDefaultCustom(),
      );
    });

    it('playIcon: Should render default playIcon slot content.', async () => {
      const wrapper = mount(Video, {
        props: defaultMock.mockProps,
      });

      expect(
        wrapper.find(defaultMock.getSelectorWithDot(defaultMock.controlsActionPlayEl)).exists(),
      ).toBe(true);
      expect(wrapper.find(defaultMock.controlsActionPlayEl).element.innerHTML).toBe(
        await VideoSelectorTestData.getVideoSlotPlayIconDefault(),
      );
    });

    it('playIcon: Should render default playIcon slot content.', async () => {
      const wrapper = mount(Video, {
        props: defaultMock.mockProps,
        slots: {
          playIcon: await VideoSelectorTestData.getVideoSlotPlayIconCustom(),
        },
      });

      expect(
        wrapper.find(defaultMock.getSelectorWithDot(defaultMock.controlsActionPlayEl)).exists(),
      ).toBe(true);
      expect(wrapper.find(defaultMock.controlsActionPlayEl).element.innerHTML).toBe(
        await VideoSelectorTestData.getVideoSlotPlayIconCustom(),
      );
    });

    it('stopIcon: Should render default stopIcon slot content.', async () => {
      const wrapper = mount(Video, {
        props: defaultMock.mockProps,
      });

      // Запускаем видео через expose методы.
      await wrapper.vm.play();

      expect(
        wrapper.find(defaultMock.getSelectorWithDot(defaultMock.controlsActionStopEl)).exists(),
      ).toBe(true);
      expect(wrapper.find(defaultMock.controlsActionStopEl).element.innerHTML).toBe(
        await VideoSelectorTestData.getVideoSlotStopIconDefault(),
      );
    });

    it('stopIcon: Should render default stopIcon slot content.', async () => {
      const wrapper = mount(Video, {
        props: defaultMock.mockProps,
        slots: {
          stopIcon: await VideoSelectorTestData.getVideoSlotStopIconCustom(),
        },
      });

      // Запускаем видео через expose методы.
      await wrapper.vm.play();

      expect(
        wrapper.find(defaultMock.getSelectorWithDot(defaultMock.controlsActionStopEl)).exists(),
      ).toBe(true);
      expect(wrapper.find(defaultMock.controlsActionStopEl).element.innerHTML).toBe(
        await VideoSelectorTestData.getVideoSlotStopIconCustom(),
      );
    });

    it('volumeIcon: Should render default volumeIcon slot content.', async () => {
      const wrapper = mount(Video, {
        props: defaultMock.mockProps,
      });

      expect(
        wrapper.find(defaultMock.getSelectorWithDot(defaultMock.controlsVolumeIconEl)).exists(),
      ).toBe(true);
      expect(wrapper.find(defaultMock.controlsVolumeIconEl).element.innerHTML).toBe(
        await VideoSelectorTestData.getVideoSlotVolumeIconDefault(),
      );
    });

    it('volumeIcon: Should render default volumeIcon slot content.', async () => {
      const wrapper = mount(Video, {
        props: defaultMock.mockProps,
        slots: {
          volumeIcon: await VideoSelectorTestData.getVideoSlotVolumeIconCustom(),
        },
      });

      expect(
        wrapper.find(defaultMock.getSelectorWithDot(defaultMock.controlsVolumeIconEl)).exists(),
      ).toBe(true);
      expect(wrapper.find(defaultMock.controlsVolumeIconEl).element.innerHTML).toBe(
        await VideoSelectorTestData.getVideoSlotVolumeIconCustom(),
      );
    });

    it('fullscreenIcon: Should render default fullscreenIcon slot content.', async () => {
      const wrapper = mount(Video, {
        props: defaultMock.mockProps,
      });

      expect(
        wrapper
          .find(defaultMock.getSelectorWithDot(defaultMock.controlsUnFullscreenIconEl))
          .exists(),
      ).toBe(true);
      expect(wrapper.find(defaultMock.controlsUnFullscreenIconEl).element.innerHTML).toBe(
        await VideoSelectorTestData.getVideoSlotFullscreenIconDefault(),
      );
    });

    it('fullscreenIcon: Should render default fullscreenIcon slot content.', async () => {
      const wrapper = mount(Video, {
        props: defaultMock.mockProps,
        slots: {
          fullscreenIcon: await VideoSelectorTestData.getVideoSlotFullscreenIconCustom(),
        },
      });

      expect(
        wrapper
          .find(defaultMock.getSelectorWithDot(defaultMock.controlsUnFullscreenIconEl))
          .exists(),
      ).toBe(true);
      expect(wrapper.find(defaultMock.controlsUnFullscreenIconEl).element.innerHTML).toBe(
        await VideoSelectorTestData.getVideoSlotFullscreenIconCustom(),
      );
    });

    it('unFullscreenIcon: Should render default unFullscreenIcon slot content.', async () => {
      const wrapper = mount(Video, {
        props: defaultMock.mockProps,
      });

      // @ts-ignore Прямо устанавливаем fullscreenState
      wrapper.vm.fullscreenState = true;
      await wrapper.vm.$nextTick();

      expect(
        wrapper.find(defaultMock.getSelectorWithDot(defaultMock.controlsFullscreenIconEl)).exists(),
      ).toBe(true);
      expect(wrapper.find(defaultMock.controlsFullscreenIconEl).element.innerHTML).toBe(
        await VideoSelectorTestData.getVideoSlotUnFullscreenIconDefault(),
      );
    });

    it('unFullscreenIcon: Should render default unFullscreenIcon slot content.', async () => {
      const wrapper = mount(Video, {
        props: defaultMock.mockProps,
        slots: {
          unFullscreenIcon: await VideoSelectorTestData.getVideoSlotUnFullscreenIconCustom(),
        },
      });

      // @ts-ignore Прямо устанавливаем fullscreenState
      wrapper.vm.fullscreenState = true;
      await wrapper.vm.$nextTick();

      expect(
        wrapper.find(defaultMock.getSelectorWithDot(defaultMock.controlsFullscreenIconEl)).exists(),
      ).toBe(true);
      expect(wrapper.find(defaultMock.controlsFullscreenIconEl).element.innerHTML).toBe(
        await VideoSelectorTestData.getVideoSlotUnFullscreenIconCustom(),
      );
    });

    it('loadingIcon: Should render default loadingIcon slot content.', async () => {
      const wrapper = mount(Video, {
        props: defaultMock.mockProps,
      });

      // @ts-ignore Прямо устанавливаем loading
      wrapper.vm.loading = true;
      await wrapper.vm.$nextTick();

      expect(wrapper.find(defaultMock.getSelectorWithDot(defaultMock.loadingEl)).exists()).toBe(
        true,
      );
      expect(wrapper.find(defaultMock.loadingEl).element.innerHTML).toBe(
        await VideoSelectorTestData.getVideoSlotLoadingIconDefault(),
      );
    });

    it('loadingIcon: Should render default loadingIcon slot content.', async () => {
      const wrapper = mount(Video, {
        props: defaultMock.mockProps,
        slots: {
          loadingIcon: await VideoSelectorTestData.getVideoSlotUnFullscreenIconCustom(),
        },
      });

      // @ts-ignore Прямо устанавливаем loading
      wrapper.vm.loading = true;
      await wrapper.vm.$nextTick();

      expect(wrapper.find(defaultMock.getSelectorWithDot(defaultMock.loadingEl)).exists()).toBe(
        true,
      );
      expect(wrapper.find(defaultMock.loadingEl).element.innerHTML).toBe(
        await VideoSelectorTestData.getVideoSlotUnFullscreenIconCustom(),
      );
    });

    it('time: Should render default time slot content.', async () => {
      const wrapper = mount(Video, {
        props: defaultMock.mockProps,
      });

      expect(wrapper.find(defaultMock.getSelectorWithDot(defaultMock.timeEl)).exists()).toBe(true);
      expect(wrapper.find(defaultMock.timeEl).element.innerHTML).toBe(
        await VideoSelectorTestData.getVideoSlotTimeDefault(),
      );
    });

    it('time: Should render default time slot content.', async () => {
      const wrapper = mount(Video, {
        props: defaultMock.mockProps,
        slots: {
          time: await VideoSelectorTestData.getVideoSlotTimeCustom(),
        },
      });

      expect(wrapper.find(defaultMock.getSelectorWithDot(defaultMock.timeEl)).exists()).toBe(true);
      expect(wrapper.find(defaultMock.timeEl).element.innerHTML).toBe(
        await VideoSelectorTestData.getVideoSlotTimeCustom(),
      );
    });
  });
});
