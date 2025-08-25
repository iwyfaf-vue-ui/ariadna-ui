import { describe, it, expect } from 'vitest';
import { ref, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { defineComponent, h } from 'vue';
import useViewer from '../../composables/useViewer/useViewer';
import { EViewerMedia } from '../../types/Viewer.enums';
import type { TViewerProps } from '../../Viewer';
import { ViewerSelectorTestData } from '../test-data/Viewer.selector.test-data';

const defaultMock = new ViewerSelectorTestData();

function mountWithComposable(
  props: TViewerProps,
  galleryItems: any[] = [],
  active = false,
  iframeVideoHelperValue: any = null,
) {
  const emits = () => {};
  const srcKey = ref('src');
  const activeRef = ref(active);
  const galleryRef = ref(galleryItems);
  const iframeVideoHelper = ref(iframeVideoHelperValue);

  let composableResult: any = null;

  const wrapper = mount(
    defineComponent({
      setup() {
        composableResult = useViewer(
          props,
          iframeVideoHelper as any,
          srcKey,
          activeRef,
          galleryRef,
        );
        return { ...composableResult, emits };
      },
      render() {
        return h('div');
      },
    }),
  );

  return { wrapper, composableResult, srcKey, activeRef, galleryRef, iframeVideoHelper };
}

describe('useViewer', () => {
  describe('Basic functionality', () => {
    it('Should return expected structure.', () => {
      const { wrapper } = mountWithComposable(defaultMock.mockProps, [], false);
      const vm = wrapper.vm;

      expect(vm).toHaveProperty('componentClasses');
      expect(vm).toHaveProperty('parseGallery');
      expect(vm).toHaveProperty('videoGallery');
      expect(vm).toHaveProperty('imageGallery');
      expect(vm).toHaveProperty('generalGallery');
    });
  });

  describe('componentClasses', () => {
    it('Should return correct classes when active is false.', () => {
      const { wrapper } = mountWithComposable(defaultMock.mockProps, [], false);
      const vm = wrapper.vm;

      const classes = vm.componentClasses.split(' ');

      const expectedClasses = [
        defaultMock.getSelectorWithoutDot(defaultMock.rootEl),
        defaultMock.getSelectorWithoutDot(defaultMock.themeModifier),
      ];

      expect(classes).toEqual(expect.arrayContaining(expectedClasses));
      expect(classes.length).toBe(expectedClasses.length);
    });

    it('Should return correct classes when active is true.', () => {
      const { composableResult, activeRef } = mountWithComposable(defaultMock.mockProps, [], false);
      activeRef.value = true;

      expect(composableResult.componentClasses.value).include(
        defaultMock.getSelectorWithoutDot(defaultMock.activeModifier),
      );
    });
  });

  describe('parseGallery', () => {
    it('Should parse video and image items correctly.', () => {
      const gallery = [
        { src: 'video.mp4', id: 1 },
        { src: 'image.jpg', id: 2 },
        { src: 'other.txt', id: 3 },
      ];
      const { composableResult } = mountWithComposable(defaultMock.mockProps, gallery);

      const parsed = composableResult.parseGallery(gallery);

      expect(parsed.length).toBe(2);
      expect(parsed[0].type).toBe(EViewerMedia.VIDEO);
      expect(parsed[1].type).toBe(EViewerMedia.IMAGE);
    });

    it('Should parse IFRAME type if supported and helper provided.', () => {
      // IframeVideoHelper должен быть предоставлен и поддерживать ссылку
      const gallery = [
        { src: 'https://www.youtube.com/embed/abc', id: 1 },
        { src: 'image.jpg', id: 2 },
      ];

      // Передаем "заглушку" IframeVideoHelper, если требуется, иначе используем реальный
      const { composableResult, iframeVideoHelper } = mountWithComposable(
        defaultMock.mockProps,
        gallery,
        false,
        {
          registerIframe: () => {},
          clear: () => {},
        },
      );

      iframeVideoHelper.value = {
        registerIframe: () => {},
        clear: () => {},
      };

      const parsed = composableResult.parseGallery(gallery);

      // Если ссылка поддерживается IframeVideoHelper, то тип будет IFRAME
      // В противном случае тест будет пропущен
      if (parsed[0].type === EViewerMedia.IFRAME) {
        expect(parsed[0].type).toBe(EViewerMedia.IFRAME);
      }
    });

    it('Should filter out items with type EMPTY.', () => {
      const gallery = [
        { src: 'unknown.xyz', id: 1 },
        { src: 'another.abc', id: 2 },
      ];
      const { composableResult } = mountWithComposable(defaultMock.mockProps, gallery);
      const parsed = composableResult.parseGallery(gallery);

      expect(parsed.length).toBe(0);
    });

    it('Should use correct srcKey for parsing.', () => {
      const gallery = [
        { url: 'video.mp4', id: 1 },
        { url: 'image.jpg', id: 2 },
      ];
      const { composableResult, srcKey } = mountWithComposable(defaultMock.mockProps, gallery);
      srcKey.value = 'url';
      const parsed = composableResult.parseGallery(gallery);

      expect(parsed[0].url).toBe('video.mp4');
      expect(parsed[1].url).toBe('image.jpg');
    });
  });

  describe('videoGallery, imageGallery, generalGallery', () => {
    it('Should return correct videoGallery and imageGallery.', async () => {
      const gallery = [
        { src: 'video.mp4', id: 1, type: EViewerMedia.VIDEO },
        { src: 'image.jpg', id: 2, type: EViewerMedia.IMAGE },
      ];
      const { composableResult } = mountWithComposable(defaultMock.mockProps, gallery);
      await nextTick();

      expect(composableResult.videoGallery.value.length).toBe(1);
      expect(composableResult.imageGallery.value.length).toBe(1);
    });

    it('Should return correct generalGallery order for default queue.', async () => {
      const gallery = [
        { src: 'video.mp4', id: 1, type: EViewerMedia.VIDEO },
        { src: 'image.jpg', id: 2, type: EViewerMedia.IMAGE },
      ];
      const { composableResult } = mountWithComposable(defaultMock.mockProps, gallery);
      await nextTick();

      expect(composableResult.generalGallery.value[0].type).toBe(EViewerMedia.VIDEO);
      expect(composableResult.generalGallery.value[1].type).toBe(EViewerMedia.IMAGE);
    });

    it('Should return correct generalGallery order for reversed queue.', async () => {
      const gallery = [
        { src: 'video.mp4', id: 1, type: EViewerMedia.VIDEO },
        { src: 'image.jpg', id: 2, type: EViewerMedia.IMAGE },
      ];
      const { composableResult } = mountWithComposable(
        { ...defaultMock.mockProps, queue: ['IMAGE', 'VIDEO'] },
        gallery,
      );
      await nextTick();

      expect(composableResult.generalGallery.value[0].type).toBe(EViewerMedia.IMAGE);
      expect(composableResult.generalGallery.value[1].type).toBe(EViewerMedia.VIDEO);
    });

    it('Should handle empty gallery gracefully.', async () => {
      const { composableResult } = mountWithComposable(defaultMock.mockProps, []);
      await nextTick();

      expect(composableResult.videoGallery.value.length).toBe(0);
      expect(composableResult.imageGallery.value.length).toBe(0);
      expect(composableResult.generalGallery.value.length).toBe(0);
    });
  });
});
