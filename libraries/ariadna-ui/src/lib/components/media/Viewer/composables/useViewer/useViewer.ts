import { computed, ref } from 'vue';
import type { ModelRef, Ref, ComputedRef } from 'vue';
import type { TViewerProps } from '../../Viewer';
import type { TUseViewerReturn } from './useViewer.types';
import type { TViewerGallery, TViewerMediaItem } from '../../types/Viewer.types';
import { EViewerMedia } from '../../types/Viewer.enums';
import IframeVideoHelper from '@/lib/utilities/helpers/IframeVideoHelper/IframeVideoHelper';
import isVideoValidator from '@/shared/validators/isVideo/isVideo.validator';
import isImageValidator from '@/shared/validators/isImage/isImage.validator';

export default function useViewer(
  props: TViewerProps,
  iframeVideoHelper: ModelRef<any, string, any, any>,
  srcKey: Ref<string, string>,
  active: Ref<boolean, boolean>,
  gallery: Ref<TViewerMediaItem[], TViewerGallery | TViewerMediaItem[]>,
): TUseViewerReturn {
  const queue = ref<Exclude<TViewerProps['queue'], undefined>>(props.queue!);

  const componentClasses = computed(() => {
    const base = props.cssClass;

    const theme = `${base}--theme`;
    const actived = active.value ? `${base}--active` : undefined;

    return [base, theme, actived].filter(Boolean).join(' ');
  });

  function parseGallery(gallery: TViewerGallery) {
    return gallery
      .map((item: TViewerMediaItem) => {
        let type = EViewerMedia.EMPTY;
        let correctSrc = item[srcKey.value];

        if (isVideoValidator(item[srcKey.value])) {
          type = EViewerMedia.VIDEO;
        }

        if (isImageValidator(item[srcKey.value])) {
          type = EViewerMedia.IMAGE;
        }

        if (iframeVideoHelper.value && IframeVideoHelper.isSupported(item[srcKey.value])) {
          type = EViewerMedia.IFRAME;
          correctSrc = IframeVideoHelper.getIframeUrl(item[srcKey.value]);
        }

        return {
          ...item,
          [srcKey.value]: correctSrc,
          type,
        };
      })
      .filter((item: TViewerMediaItem) => item.type !== EViewerMedia.EMPTY);
  }

  const videoGallery: ComputedRef<TViewerGallery> = computed(() =>
    gallery.value.filter(
      (mediaItem: TViewerMediaItem) =>
        mediaItem.type === EViewerMedia.VIDEO || mediaItem.type === EViewerMedia.IFRAME,
    ),
  );

  const imageGallery: ComputedRef<TViewerGallery> = computed(() =>
    gallery.value.filter((mediaItem: TViewerMediaItem) => mediaItem.type === EViewerMedia.IMAGE),
  );

  const generalGallery: ComputedRef<TViewerGallery> = computed(() =>
    queue.value
      .map((mediaType) => (mediaType === 'VIDEO' ? videoGallery.value : imageGallery.value))
      .flat(1),
  );

  return {
    componentClasses,
    parseGallery,
    videoGallery,
    imageGallery,
    generalGallery,
  };
}
